import React, { useMemo, useCallback, memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BasicInput = memo(
  ({
    prepend = false,
    prependInner = false,
    label = '',
    appendInner = false,
    append = false,
    clearable = false,
    hideDetails = false,
    hint = '',
    loading = false,
    disabled = false,
    readonly = false,
    placeholder = '',
    type = 'text',
    persistentDetails = false,
    value = '',
    rules = [],
    hideSpinButtons = false,
    className = '',
    style = {},
    onChange,
    onFocus,
    onBlur,
    onInput,
    onChangeEvent,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onClick,
    onDoubleClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onCopy,
    onCut,
    onPaste,
    onCompositionStart,
    onCompositionUpdate,
    onCompositionEnd,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onParentDragEnter,
    onParentDragOver,
    onParentDragLeave,
    onParentDrop,
    onPrependClick,
    onPrependInnerClick,
    onClearClick,
    onAppendClick,
    onAppendInnerClick,
    onValidate,
    ref, // React 19: ref as regular prop
    // React 19: Enhanced validation with async support
    asyncValidation,
    // Custom SVG icons from parent
    prependIcon,
    prependInnerIcon,
    appendIcon,
    appendInnerIcon,
    // Custom input field support
    customInputField,
    customDetailsRightContent,
    children,
    ...props
  }) => {
    // =============================================================================
    // REFS AND STATE
    // =============================================================================
    const inputRef = useRef(null);
    const [internalValue, setInternalValue] = useState(() => value);
    const [internalType, setInternalType] = useState(type);
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // =============================================================================
    // EFFECTS
    // =============================================================================
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    useEffect(() => {
      setInternalType(type);
    }, [type]);

    // =============================================================================
    // VALIDATION FUNCTIONS
    // =============================================================================
    const getDefaultErrorMessage = useCallback((rule, condition) => {
      switch (rule) {
        case 'required':
          return 'This field is required';
        case 'minLength':
          return `This field must be at least ${condition} characters long`;
        case 'maxLength':
          return `This field must be no more than ${condition} characters long`;
        case 'email':
          return 'Invalid email address';
        case 'number':
          return 'Invalid number';
        case 'tel':
          return 'Invalid phone number (must be 10 digits)';
        case 'url':
          return 'Invalid URL';
        default:
          return 'Field is invalid';
      }
    }, []);

    const handleStringRule = useCallback((rule, value, condition) => {
      switch (rule) {
        case 'required':
          if (value === null || value === undefined || value === '') {
            return false;
          }

          switch (typeof value) {
            case 'string':
              return value.trim().length > 0;
            case 'object':
              if (Array.isArray(value)) {
                return value.length > 0;
              }
              if (value instanceof File) {
                return value.size > 0;
              }
              return Object.keys(value).length > 0;
            default:
              return true;
          }

        case 'minLength':
          return value.length >= condition;

        case 'maxLength':
          return value.length <= condition;

        case 'email': {
          const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return emailPattern.test(value);
        }

        case 'number': {
          const numValue = Number(value);
          return (
            !isNaN(numValue) &&
            (typeof value === 'string'
              ? value.trim().length > 0
              : value !== null && value !== undefined && value !== '')
          );
        }

        case 'minValue': {
          const minValue = condition;
          const minNumValue = Number(value);
          return !isNaN(minNumValue) && minNumValue >= minValue;
        }

        case 'maxValue': {
          const maxValue = condition;
          const maxNumValue = Number(value);
          return !isNaN(maxNumValue) && maxNumValue <= maxValue;
        }

        case 'phone': {
          const phonePattern = /^[0-9]{10}$/;
          return phonePattern.test(value);
        }

        case 'url': {
          const urlPattern =
            /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/[-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/;
          return urlPattern.test(value);
        }

        default:
          return true;
      }
    }, []);

    // React 19: Modern async validation with use() hook
    const validateAsync = useCallback(async () => {
      if (asyncValidation) {
        try {
          const result = await asyncValidation(internalValue);
          if (!result.valid) {
            setError(true);
            setErrorMessage(result.message || 'Validation failed');
            onValidate?.(false, internalValue, result.message || 'Validation failed');
            return false;
          }
          setError(false);
          setErrorMessage('');
          onValidate?.(true, internalValue, '');
          return true;
        } catch (error) {
          setError(true);
          setErrorMessage(error.message || 'Validation error');
          onValidate?.(false, internalValue, error.message || 'Validation error');
          return false;
        }
      }
      return null; // No async validation
    }, [asyncValidation, internalValue, onValidate]);

    const validate = useCallback(async () => {
      // React 19: Check for async validation first
      if (asyncValidation) {
        const asyncResult = await validateAsync();
        if (asyncResult !== null) {
          return; // Async validation handled it
        }
      }

      setError(false);
      setErrorMessage('');

      if (
        internalValue === '' ||
        internalValue === null ||
        internalValue === undefined ||
        (Array.isArray(internalValue) && internalValue.length === 0)
      ) {
        const requiredRule = rules.find(rule => rule.rule === 'required');
        if (requiredRule && !handleStringRule('required', internalValue)) {
          setError(true);
          setErrorMessage(getDefaultErrorMessage('required'));
          onValidate?.(false, internalValue, getDefaultErrorMessage('required'));
          return;
        }
      } else {
        if (type === 'email' && !handleStringRule('email', internalValue)) {
          setError(true);
          setErrorMessage(getDefaultErrorMessage('email'));
          onValidate?.(false, internalValue, getDefaultErrorMessage('email'));
          return;
        }

        if (type === 'number' && !handleStringRule('number', internalValue)) {
          setError(true);
          setErrorMessage(getDefaultErrorMessage('number'));
          onValidate?.(false, internalValue, getDefaultErrorMessage('number'));
          return;
        }

        if (type === 'tel' && !handleStringRule('phone', internalValue)) {
          setError(true);
          setErrorMessage(getDefaultErrorMessage('tel'));
          onValidate?.(false, internalValue, getDefaultErrorMessage('tel'));
          return;
        }

        if (type === 'url' && !handleStringRule('url', internalValue)) {
          setError(true);
          setErrorMessage(getDefaultErrorMessage('url'));
          onValidate?.(false, internalValue, getDefaultErrorMessage('url'));
          return;
        }

        for (const { rule, message, condition } of rules) {
          let result;

          try {
            if (typeof rule === 'function') {
              result = rule(internalValue);
            } else if (typeof rule === 'string') {
              result = handleStringRule(rule, internalValue, condition);
            } else if (rule instanceof RegExp) {
              result = rule.test(internalValue);
            } else {
              throw new Error(`Invalid rule type: ${typeof rule}`);
            }

            if (result !== true) {
              setError(true);
              setErrorMessage(message || getDefaultErrorMessage(rule, condition));
              break;
            }
          } catch (e) {
            console.error('Validation error:', e.message);
            setError(true);
            setErrorMessage(`Invalid rule: ${e.message}`);
            onValidate?.(false, internalValue, `Invalid rule: ${e.message}`);
            return;
          }
        }
      }

      onValidate?.(true, internalValue, '');
    }, [
      internalValue,
      rules,
      type,
      handleStringRule,
      getDefaultErrorMessage,
      onValidate,
      asyncValidation,
      validateAsync,
    ]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handlePrependClick = useCallback(
      e => {
        onPrependClick?.(e);
      },
      [onPrependClick]
    );

    const handlePrependInnerClick = useCallback(
      e => {
        onPrependInnerClick?.(e);
      },
      [onPrependInnerClick]
    );

    const handleClearClick = useCallback(
      e => {
        setInternalValue('');
        onChange?.('');
        onClearClick?.(e);
        validate();
      },
      [onChange, onClearClick, validate]
    );

    const handleAppendInnerClick = useCallback(
      e => {
        onAppendInnerClick?.(e);
      },
      [onAppendInnerClick]
    );

    const handleAppendClick = useCallback(
      e => {
        onAppendClick?.(e);
      },
      [onAppendClick]
    );

    const changeInternalType = useCallback(newType => {
      setInternalType(newType);
    }, []);

    const setInternalValueDirect = useCallback(newValue => {
      setInternalValue(newValue);
    }, []);

    const triggerEvent = useCallback(
      (eventName, payload) => {
        switch (eventName) {
          case 'focus':
            setFocused(true);
            break;
          case 'blur':
            setFocused(false);
            validate();
            break;
          case 'input':
            setInternalValue(payload.target.value);
            onChange?.(payload.target.value);
            onInput?.(payload);
            validate();
            break;
          default:
            break;
        }
      },
      [onChange, onInput, validate]
    );

    // =============================================================================
    // React 19: Direct ref assignment (no useImperativeHandle needed)
    // =============================================================================
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref({
            validate,
            setInternalValue: setInternalValueDirect,
            focus: () => inputRef.current?.focus(),
            blur: () => inputRef.current?.blur(),
          });
        } else if (ref.current !== undefined) {
          ref.current = {
            validate,
            setInternalValue: setInternalValueDirect,
            focus: () => inputRef.current?.focus(),
            blur: () => inputRef.current?.blur(),
          };
        }
      }
    }, [ref, validate, setInternalValueDirect]);

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['basic-input-wrapper'];
      if (disabled) classes.push('disabled');
      if (readonly) classes.push('readonly');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [disabled, readonly, className]);

    const labelClass = useMemo(() => {
      const classes = ['label'];
      if (focused || internalValue) classes.push('floating');
      if (prependInner) classes.push('has-inner-prepend');
      if (!focused && !internalValue && prependInner) classes.push('un-floating');
      return classes.join(' ');
    }, [focused, internalValue, prependInner]);

    const inputClass = useMemo(() => {
      const classes = ['input-field'];
      if (hideSpinButtons) classes.push('hideSpinButtons');
      return classes.join(' ');
    }, [hideSpinButtons]);

    const clearWrapperClass = useMemo(() => {
      const classes = ['clear-wrapper'];
      if (internalValue) classes.push('has-value');
      return classes.join(' ');
    }, [internalValue]);

    const messageClass = useMemo(() => {
      const classes = ['message'];
      if (hint && !error) classes.push('hint');
      if (error) classes.push('error');
      if (persistentDetails) classes.push('persistentDetails');
      if (focused) classes.push('focused');
      return classes.join(' ');
    }, [hint, error, persistentDetails, focused]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderPrepend = useMemo(() => {
      if (!prepend) return null;
      return (
        <div className="prepend-wrapper">
          {prependIcon ? (
            <div onClick={handlePrependClick}>{prependIcon}</div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handlePrependClick}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                  fill="#1C274C"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75C11.8011 17.75 11.6103 17.671 11.4697 17.5303L8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697C9.26256 13.6768 9.73744 13.6768 10.0303 13.9697L11.25 15.1893V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V15.1893L13.9697 13.9697C14.2626 13.6768 14.7374 13.6768 15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303L12.5303 17.5303Z"
                  fill="#1C274C"
                ></path>
              </g>
            </svg>
          )}
        </div>
      );
    }, [prepend, handlePrependClick, prependIcon]);

    const renderPrependInner = useMemo(() => {
      if (!prependInner) return null;
      return (
        <div className="prepend-inner-wrapper">
          {prependInnerIcon ? (
            <div onClick={handlePrependInnerClick}>{prependInnerIcon}</div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handlePrependInnerClick}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                  fill="#1C274C"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75C11.8011 17.75 11.6103 17.671 11.4697 17.5303L8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697C9.26256 13.6768 9.73744 13.6768 10.0303 13.9697L11.25 15.1893V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V15.1893L13.9697 13.9697C14.2626 13.6768 14.7374 13.6768 15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303L12.5303 17.5303Z"
                  fill="#1C274C"
                ></path>
              </g>
            </svg>
          )}
        </div>
      );
    }, [prependInner, handlePrependInnerClick, prependInnerIcon]);

    const renderClearButton = useMemo(() => {
      if (!clearable) return null;
      return (
        <div className={clearWrapperClass} onClick={handleClearClick}>
          <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#000000"
                fillRule="evenodd"
                d="M8,16 C12.4183,16 16,12.4183 16,8 C16,3.58172 12.4183,0 8,0 C3.58172,0 0,3.58172 0,8 C0,12.4183 3.58172,16 8,16 Z M4.29289,4.29289 C4.68342,3.90237 5.31658,3.90237 5.70711,4.29289 L8,6.58579 L10.2929,4.29289 C10.6834,3.90237 11.3166,3.90237 11.7071,4.29289 C12.0976,4.68342 12.0976,5.31658 11.7071,5.70711 L9.41421,8 L11.7071,10.2929 C12.0976,10.6834 12.0976,11.3166 11.7071,11.7071 C11.3166,12.0976 10.6834,12.0976 10.2929,11.7071 L8,9.41421 L5.70711,11.7071 C5.31658,12.0976 4.68342,12.0976 4.29289,11.7071 C3.90237,11.3166 3.90237,10.6834 4.29289,10.2929 L6.58579,8 L4.29289,5.70711 C3.90237,5.31658 3.90237,4.68342 4.29289,4.29289 Z"
              ></path>
            </g>
          </svg>
        </div>
      );
    }, [clearable, clearWrapperClass, handleClearClick]);

    const renderAppendInner = useMemo(() => {
      if (!appendInner && !loading) return null;

      // If both loading and appendInner are true, show both
      if (loading && appendInner) {
        return (
          <div className="append-inner-wrapper">
            <div className="loader-container">
              <svg className="default-loader" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
              </svg>
            </div>
            <div className="append-button-container">
              {appendInnerIcon ? (
                <div onClick={handleAppendInnerClick}>{appendInnerIcon}</div>
              ) : type === 'password' ? (
                internalType === 'password' ? (
                  <svg
                    onClick={() => changeInternalType('text')}
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20.9994 3L17.6094 6.39"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.38 17.62L3 21"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    onClick={() => changeInternalType('password')}
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                )
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleAppendInnerClick}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                      fill="#1C274C"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75C11.8011 17.75 11.6103 17.671 11.4697 17.5303L8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697C9.26256 13.6768 9.73744 13.6768 10.0303 13.9697L11.25 15.1893V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V15.1893L13.9697 13.9697C14.2626 13.6768 14.7374 13.6768 15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303L12.5303 17.5303Z"
                      fill="#1C274C"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
          </div>
        );
      }

      // If only loading (no appendInner)
      if (loading) {
        return (
          <div className="append-inner-wrapper">
            <svg className="default-loader" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
            </svg>
          </div>
        );
      }

      if (type === 'password') {
        return (
          <div className="append-inner-wrapper">
            {internalType === 'password' ? (
              <svg
                onClick={() => changeInternalType('text')}
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M20.9994 3L17.6094 6.39"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M6.38 17.62L3 21"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                onClick={() => changeInternalType('password')}
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            )}
          </div>
        );
      }

      return (
        <div className="append-inner-wrapper">
          {appendInnerIcon ? (
            <div onClick={handleAppendInnerClick}>{appendInnerIcon}</div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleAppendInnerClick}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                  fill="#1C274C"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75C11.8011 17.75 11.6103 17.671 11.4697 17.5303L8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697C9.26256 13.6768 9.73744 13.6768 10.0303 13.9697L11.25 15.1893V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V15.1893L13.9697 13.9697C14.2626 13.6768 14.7374 13.6768 15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303L12.5303 17.5303Z"
                  fill="#1C274C"
                ></path>
              </g>
            </svg>
          )}
        </div>
      );
    }, [appendInner, loading, type, internalType, changeInternalType, handleAppendInnerClick, appendInnerIcon]);

    const renderAppend = useMemo(() => {
      if (!append) return null;
      return (
        <div className="append-wrapper">
          {appendIcon ? (
            <div onClick={handleAppendClick}>{appendIcon}</div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleAppendClick}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                  fill="#1C274C"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75C11.8011 17.75 11.6103 17.671 11.4697 17.5303L8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697C9.26256 13.6768 9.73744 13.6768 10.0303 13.9697L11.25 15.1893V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V15.1893L13.9697 13.9697C14.2626 13.6768 14.7374 13.6768 15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303L12.5303 17.5303Z"
                  fill="#1C274C"
                ></path>
              </g>
            </svg>
          )}
        </div>
      );
    }, [append, handleAppendClick, appendIcon]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <div className={containerClass} style={style} {...props}>
        {renderPrepend}
        <div
          className="input-wrapper"
          onDragEnter={e => {
            e.preventDefault();
            onParentDragEnter?.(e);
          }}
          onDragOver={e => {
            e.preventDefault();
            onParentDragOver?.(e);
          }}
          onDragLeave={e => {
            e.preventDefault();
            onParentDragLeave?.(e);
          }}
          onDrop={e => {
            e.preventDefault();
            onParentDrop?.(e);
          }}
        >
          {renderPrependInner}
          <div className="input-field-wrapper" tabIndex="-1">
            {label && <label className={labelClass}>{label}</label>}
            {customInputField ? (
              customInputField({
                inputRef,
                inputClass,
                internalType,
                readonly,
                disabled,
                placeholder,
                internalValue,
                triggerEvent,
                onChangeEvent,
                onFocus,
                onBlur,
                onKeyDown,
                onClick,
                onDoubleClick,
                onMouseDown,
                onMouseUp,
                onMouseEnter,
                onMouseLeave,
                onKeyUp,
                onKeyPress,
                onCopy,
                onCut,
                onPaste,
                onCompositionStart,
                onCompositionUpdate,
                onCompositionEnd,
                onDragEnter,
                onDragOver,
                onDragLeave,
                onDrop,
                renderClearButton,
              })
            ) : (
              <input
                ref={inputRef}
                className={inputClass}
                type={internalType}
                readOnly={readonly}
                disabled={disabled}
                placeholder={placeholder}
                value={internalValue}
                onInput={e => triggerEvent('input', e)}
                onChange={e => onChangeEvent?.(e)}
                onFocus={e => {
                  triggerEvent('focus', e);
                  onFocus?.(e);
                }}
                onBlur={e => {
                  triggerEvent('blur', e);
                  onBlur?.(e);
                }}
                onKeyDown={onKeyDown}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onKeyUp={onKeyUp}
                onKeyPress={onKeyPress}
                onCopy={onCopy}
                onCut={onCut}
                onPaste={onPaste}
                onCompositionStart={onCompositionStart}
                onCompositionUpdate={onCompositionUpdate}
                onCompositionEnd={onCompositionEnd}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              />
            )}
            {!customInputField && renderClearButton}
          </div>
          {renderAppendInner}
        </div>
        {renderAppend}
        {!hideDetails && (
          <div className="details-wrapper">
            <div className={messageClass}>{error ? errorMessage : hint}</div>
            {customDetailsRightContent && (
              <div className="details-right-content">
                {customDetailsRightContent({
                  internalValue,
                  hint,
                  error,
                  errorMessage,
                  persistentDetails,
                  focused,
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicInput.propTypes = {
  prepend: PropTypes.bool,
  prependInner: PropTypes.bool,
  label: PropTypes.string,
  appendInner: PropTypes.bool,
  append: PropTypes.bool,
  clearable: PropTypes.bool,
  hideDetails: PropTypes.bool,
  hint: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  persistentDetails: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]),
  rules: PropTypes.array,
  hideSpinButtons: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInput: PropTypes.func,
  onChangeEvent: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onCopy: PropTypes.func,
  onCut: PropTypes.func,
  onPaste: PropTypes.func,
  onCompositionStart: PropTypes.func,
  onCompositionUpdate: PropTypes.func,
  onCompositionEnd: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
  onParentDragEnter: PropTypes.func,
  onParentDragOver: PropTypes.func,
  onParentDragLeave: PropTypes.func,
  onParentDrop: PropTypes.func,
  onParentPaste: PropTypes.func,
  onPrependClick: PropTypes.func,
  onPrependInnerClick: PropTypes.func,
  onClearClick: PropTypes.func,
  onAppendClick: PropTypes.func,
  onAppendInnerClick: PropTypes.func,
  onValidate: PropTypes.func,
};

BasicInput.displayName = 'BasicInput';

export default BasicInput;
