import React, { useMemo, useCallback, memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BasicInput from './BasicInput';

const BasicTextarea = memo(
  ({
    rows = 3,
    noResize = false,
    autoGrow = false,
    maxlength,
    minRows = 1,
    counter = false,
    label = '',
    persistentDetails = true,
    hideDetails = false,
    hint = '',
    loading = false,
    disabled = false,
    readonly = false,
    placeholder = '',
    value = '',
    rules = [],
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
    // Custom SVG icons from parent
    prependIcon,
    prependInnerIcon,
    appendIcon,
    appendInnerIcon,
    ...props
  }) => {
    // =============================================================================
    // REFS AND STATE
    // =============================================================================
    const textareaRef = useRef(null);
    const basicInputRef = useRef(null);
    const [internalValue, setInternalValue] = useState(() => value);

    // =============================================================================
    // EFFECTS
    // =============================================================================
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    // =============================================================================
    // AUTO RESIZE FUNCTIONALITY
    // =============================================================================
    const autoResize = useCallback(() => {
      if (autoGrow && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [autoGrow]);

    // =============================================================================
    // VALIDATION RULES
    // =============================================================================
    const validationRules = useMemo(() => {
      const baseRules = [...rules];

      if (maxlength) {
        baseRules.push({
          rule: value => {
            if (!value) return true;
            return value.length <= maxlength;
          },
          message: `Maximum ${maxlength} characters allowed`,
        });
      }

      return baseRules;
    }, [rules, maxlength]);

    // =============================================================================
    // CUSTOM INPUT FIELD RENDERER
    // =============================================================================
    const customInputField = useCallback(
      ({ inputClass, readonly, disabled, placeholder, internalValue, triggerEvent, ...inputProps }) => {
        return (
          <textarea
            ref={textareaRef}
            className={`text-area-field ${noResize ? 'no-resize' : ''}`}
            readOnly={readonly}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows || minRows}
            maxLength={maxlength}
            value={internalValue}
            onInput={e => {
              triggerEvent('input', e);
              autoResize();
            }}
            onChange={e => triggerEvent('change', e)}
            onFocus={e => triggerEvent('focus', e)}
            onBlur={e => triggerEvent('blur', e)}
            onKeyDown={e => triggerEvent('keydown', e)}
            onClick={e => triggerEvent('click', e)}
            onDoubleClick={e => triggerEvent('dblclick', e)}
            onMouseDown={e => triggerEvent('mousedown', e)}
            onMouseUp={e => triggerEvent('mouseup', e)}
            onMouseEnter={e => triggerEvent('mouseenter', e)}
            onMouseLeave={e => triggerEvent('mouseleave', e)}
            onKeyUp={e => triggerEvent('keyup', e)}
            onKeyPress={e => triggerEvent('keypress', e)}
            onCopy={e => triggerEvent('copy', e)}
            onCut={e => triggerEvent('cut', e)}
            onPaste={e => triggerEvent('paste', e)}
            onCompositionStart={e => triggerEvent('compositionstart', e)}
            onCompositionUpdate={e => triggerEvent('compositionupdate', e)}
            onCompositionEnd={e => triggerEvent('compositionend', e)}
            onDragEnter={e => triggerEvent('dragenter', e)}
            onDragOver={e => triggerEvent('dragover', e)}
            onDragLeave={e => triggerEvent('dragleave', e)}
            onDrop={e => triggerEvent('drop', e)}
            {...inputProps}
          />
        );
      },
      [noResize, rows, minRows, maxlength, autoResize]
    );

    // =============================================================================
    // CUSTOM DETAILS RIGHT CONTENT
    // =============================================================================
    const customDetailsRightContent = useCallback(
      ({ internalValue, persistentDetails, focused }) => {
        if (!counter) return null;

        return (
          <span className="char-counter" style={{ 
            opacity: focused || persistentDetails ? 1 : 0,
            visibility: focused || persistentDetails ? 'visible' : 'hidden',
            fontSize: '0.75rem',
            minHeight: '0.875rem',
            minWidth: '0.0625rem',
            position: 'relative',
            transform: focused || persistentDetails ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'all 0.2s ease-in-out'
          }}>
            {internalValue?.length || 0}
            {maxlength && ` / ${maxlength}`}
          </span>
        );
      },
      [counter, maxlength]
    );

    // =============================================================================
    // CUSTOM ICONS
    // =============================================================================
    const defaultPrependIcon = useMemo(
      () => (
        <svg
          className="prepend-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="14,2 14,8 20,8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="13" x2="8" y2="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="17" x2="8" y2="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="10,9 9,9 8,9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      []
    );

    const defaultPrependInnerIcon = useMemo(
      () => (
        <svg
          className="prepend-inner-svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      ),
      []
    );

    const defaultAppendInnerIcon = useMemo(
      () => (
        <svg
          className="append-inner-svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
        </svg>
      ),
      []
    );

    const defaultAppendIcon = useMemo(
      () => (
        <svg
          className="append-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      ),
      []
    );

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <BasicInput
        ref={basicInputRef}
        className={`default-text-area-wrapper ${className}`}
        style={style}
        label={label}
        value={internalValue}
        rules={validationRules}
        persistentDetails={persistentDetails}
        hideDetails={hideDetails}
        hint={hint}
        loading={loading}
        disabled={disabled}
        readonly={readonly}
        clearable={false}
        prepend={false}
        prependInner={false}
        appendInner={false}
        append={false}
        customInputField={customInputField}
        customDetailsRightContent={customDetailsRightContent}
        prependIcon={prependIcon || defaultPrependIcon}
        prependInnerIcon={prependInnerIcon || defaultPrependInnerIcon}
        appendIcon={appendIcon || defaultAppendIcon}
        appendInnerIcon={appendInnerIcon || defaultAppendInnerIcon}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        onChangeEvent={onChangeEvent}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
        onParentDragEnter={onParentDragEnter}
        onParentDragOver={onParentDragOver}
        onParentDragLeave={onParentDragLeave}
        onParentDrop={onParentDrop}
        onPrependClick={onPrependClick}
        onPrependInnerClick={onPrependInnerClick}
        onClearClick={onClearClick}
        onAppendClick={onAppendClick}
        onAppendInnerClick={onAppendInnerClick}
        onValidate={onValidate}
        {...props}
      />
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicTextarea.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.number,
  noResize: PropTypes.bool,
  autoGrow: PropTypes.bool,
  maxlength: PropTypes.number,
  minRows: PropTypes.number,
  counter: PropTypes.bool,
  persistentDetails: PropTypes.bool,
  hideDetails: PropTypes.bool,
  hint: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rules: PropTypes.array,
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
  onPrependClick: PropTypes.func,
  onPrependInnerClick: PropTypes.func,
  onClearClick: PropTypes.func,
  onAppendClick: PropTypes.func,
  onAppendInnerClick: PropTypes.func,
  onValidate: PropTypes.func,
  prependIcon: PropTypes.node,
  prependInnerIcon: PropTypes.node,
  appendIcon: PropTypes.node,
  appendInnerIcon: PropTypes.node,
};

BasicTextarea.displayName = 'BasicTextarea';

export default BasicTextarea;
