import React, { useMemo, useCallback, memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BasicInput from './BasicInput';

const BasicFileInput = memo(
  ({
    label = '',
    maxFiles,
    maxSize,
    multiple = false,
    value = null,
    chip = false,
    persistentDetails = true,
    accept,
    hideDetails = false,
    hint = '',
    loading = false,
    disabled = false,
    readonly = false,
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
    const fileInputRef = useRef(null);
    const basicInputRef = useRef(null);
    const [internalValue, setInternalValue] = useState(() => value);
    const [isDragging, setIsDragging] = useState(false);
    const [totalFileSizes, setTotalFileSizes] = useState(0);

    // =============================================================================
    // UTILITY FUNCTIONS
    // =============================================================================
    const formatFileSize = useCallback(bytes => {
      if (bytes === 0) return '0 B';
      const units = ['B', 'kB', 'mB', 'gB', 'tB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${(bytes / Math.pow(1024, i)).toFixed(i <= 1 ? i : 2)} ${units[i]}`;
    }, []);

    const calculateTotalSize = useCallback(files => {
      const fileArray = Array.isArray(files) ? files : [files];
      return fileArray.reduce((total, file) => total + (file?.size || 0), 0);
    }, []);

    // =============================================================================
    // EFFECTS
    // =============================================================================
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    useEffect(() => {
      setTotalFileSizes(calculateTotalSize(internalValue));
    }, [internalValue, calculateTotalSize]);

    // =============================================================================
    // VALIDATION RULES
    // =============================================================================
    const validationRules = useMemo(() => {
      const rules = [];

      if (maxFiles) {
        rules.push({
          rule: value => {
            if (!value) return true;
            const files = Array.isArray(value) ? value : [value];
            return files.length <= maxFiles;
          },
          message: `Maximum ${maxFiles} files allowed`,
        });
      }

      if (maxSize) {
        rules.push({
          rule: value => {
            const files = Array.isArray(value) ? value : [value];
            return calculateTotalSize(files) <= maxSize;
          },
          message: `Total file size must not exceed ${formatFileSize(maxSize)}`,
        });
      }

      if (accept) {
        rules.push({
          rule: value => {
            if (!value) return true;
            const files = Array.isArray(value) ? value : [value];
            const acceptedTypes = accept.split(',').map(type => type.trim());

            return files.every(file => {
              const fileExtension = `.${file.name.split('.').pop().toLowerCase()}`;
              const fileType = file.type.toLowerCase();

              return acceptedTypes.some(type => {
                if (type.includes('*')) {
                  const [category] = type.split('/');
                  return fileType.startsWith(`${category}/`);
                }
                return type.startsWith('.') ? type === fileExtension : type === fileType;
              });
            });
          },
          message: `Only ${accept} files are allowed`,
        });
      }

      return rules;
    }, [maxFiles, maxSize, accept, calculateTotalSize, formatFileSize]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const triggerFileInput = useCallback(() => {
      fileInputRef.current?.focus();
      fileInputRef.current?.click();
      if (!multiple || !chip) {
        setInternalValue(null);
        onChange?.(null);
        onInput?.(null);
        basicInputRef.current?.validate();
        setTotalFileSizes(0);
        basicInputRef.current?.setInternalValue(null);
      }
    }, [multiple, chip, onChange, onInput]);

    const updateFileValue = useCallback(
      files => {
        const isMultipleInput = multiple;
        let newValue;

        if (!isMultipleInput) {
          newValue = files[0] || null;
          setInternalValue(newValue);
        } else {
          const currentValue = Array.isArray(internalValue) ? internalValue : [];

          const newFiles = files.filter(newFile => {
            return !currentValue.some(
              existingFile =>
                existingFile.name === newFile.name &&
                existingFile.size === newFile.size &&
                existingFile.type === newFile.type
            );
          });

          newValue = chip ? [...currentValue, ...newFiles] : newFiles;
          setInternalValue(newValue);
        }

        onChange?.(newValue);
        onInput?.(newValue);
        basicInputRef.current?.setInternalValue(newValue);
        setTotalFileSizes(calculateTotalSize(newValue));
        basicInputRef.current?.validate();
      },
      [multiple, chip, internalValue, onChange, onInput, calculateTotalSize]
    );

    const handleInput = useCallback(
      e => {
        const files = Array.from(e.target.files);
        updateFileValue(files);
      },
      [updateFileValue]
    );

    const handleDrop = useCallback(
      e => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        updateFileValue(files);
      },
      [updateFileValue]
    );

    const handleRemoveFile = useCallback(
      file => {
        const currentValue = Array.isArray(internalValue) ? internalValue : [];
        const newValue = currentValue.filter(f => f !== file);
        setInternalValue(newValue);
        onChange?.(newValue);
        onInput?.(newValue);
        basicInputRef.current?.validate();
        basicInputRef.current?.setInternalValue(newValue);
        setTotalFileSizes(calculateTotalSize(newValue));
      },
      [internalValue, onChange, onInput, calculateTotalSize]
    );

    const handleClearClick = useCallback(() => {
      setInternalValue(null);
      onChange?.(null);
      onInput?.(null);
      basicInputRef.current?.validate();
      basicInputRef.current?.setInternalValue(null);
      setTotalFileSizes(0);
    }, [onChange, onInput]);

    const handleDragEnter = useCallback(e => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragOver = useCallback(e => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(e => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handlePaste = useCallback(
      e => {
        const items = e.clipboardData?.items;
        if (!items) return;

        const files = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file) {
              files.push(file);
            }
          }
        }

        if (files.length > 0) {
          updateFileValue(files);
        }
      },
      [updateFileValue]
    );

    // =============================================================================
    // CUSTOM INPUT FIELD RENDERER
    // =============================================================================
    const customInputField = useCallback(
      ({ inputClass, readonly, disabled, triggerEvent, ...inputProps }) => {
        return (
          <>
            <input
              ref={fileInputRef}
              type="file"
              className={inputClass}
              readOnly={readonly}
              disabled={disabled}
              multiple={multiple}
              accept={accept}
              style={{
                position: 'absolute',
                width: 0,
                height: 0,
                opacity: 0,
                cursor: 'pointer',
              }}
              onInput={handleInput}
              onChange={e => triggerEvent('change', e)}
              onFocus={e => triggerEvent('focus', e)}
              onBlur={e => triggerEvent('blur', e)}
              onKeyDown={e => triggerEvent('keydown', e)}
              onKeyUp={e => triggerEvent('keyup', e)}
              onKeyPress={e => triggerEvent('keypress', e)}
              onClick={e => triggerEvent('click', e)}
              onDoubleClick={e => triggerEvent('dblclick', e)}
              onMouseDown={e => triggerEvent('mousedown', e)}
              onMouseUp={e => triggerEvent('mouseup', e)}
              onMouseEnter={e => triggerEvent('mouseenter', e)}
              onMouseLeave={e => triggerEvent('mouseleave', e)}
              onCompositionStart={e => triggerEvent('compositionstart', e)}
              onCompositionUpdate={e => triggerEvent('compositionupdate', e)}
              onCompositionEnd={e => triggerEvent('compositionend', e)}
              onDragEnter={e => triggerEvent('dragenter', e)}
              onDragOver={e => triggerEvent('dragover', e)}
              onDragLeave={e => triggerEvent('dragleave', e)}
              onDrop={e => triggerEvent('drop', e)}
              {...inputProps}
            />
            {!(multiple ? Array.isArray(internalValue) && internalValue.length > 0 : internalValue) ? (
              <div
                className="file-input-placeholder"
                onClick={triggerFileInput}
                style={{
                  padding: '1rem 0',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  minHeight: '3.25rem',
                }}
              />
            ) : (
              <div
                className="file-input-selected-files"
                onClick={triggerFileInput}
                style={{
                  padding: '1rem 0',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {chip ? (
                  multiple ? (
                    Array.isArray(internalValue) ? (
                      internalValue.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="file-chip"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#f1f1f1',
                            borderRadius: '9999px',
                            fontSize: '0.875rem',
                            color: '#333',
                            border: '1px solid #ccc',
                          }}
                        >
                          <span
                            className="file-name"
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '150px',
                            }}
                          >
                            {file.name}
                          </span>
                          <button
                            className="remove-btn"
                            onClick={e => {
                              e.stopPropagation();
                              handleRemoveFile(file);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '1rem',
                              lineHeight: 1,
                              cursor: 'pointer',
                              color: '#666',
                              transition: 'color 0.2s',
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))
                    ) : null
                  ) : (
                    <div
                      className="file-chip"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#f1f1f1',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        color: '#333',
                        border: '1px solid #ccc',
                      }}
                    >
                      <span
                        className="file-name"
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '150px',
                        }}
                      >
                        {internalValue?.name}
                      </span>
                      <button
                        className="remove-btn"
                        onClick={e => {
                          e.stopPropagation();
                          handleRemoveFile(internalValue);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1rem',
                          lineHeight: 1,
                          cursor: 'pointer',
                          color: '#666',
                          transition: 'color 0.2s',
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  )
                ) : multiple ? (
                  Array.isArray(internalValue) ? (
                    internalValue.map(file => file.name).join(', ')
                  ) : (
                    ''
                  )
                ) : (
                  internalValue?.name || ''
                )}
              </div>
            )}
          </>
        );
      },
      [multiple, internalValue, chip, handleInput, triggerFileInput, handleRemoveFile, accept]
    );

    // =============================================================================
    // CUSTOM DETAILS RIGHT CONTENT
    // =============================================================================
    const customDetailsRightContent = useCallback(
      ({ internalValue, persistentDetails, focused }) => {
        return (
          <div
            className="details-right-content"
            style={{
              display: 'flex',
              gap: '0.5rem',
              color: '#666',
              fontWeight: 300,
              fontSize: '0.75rem',
              flexShrink: 0,
              opacity: focused || persistentDetails ? 1 : 0,
              visibility: focused || persistentDetails ? 'visible' : 'hidden',
              minHeight: '0.875rem',
              minWidth: '0.0625rem',
              position: 'relative',
              transform: focused || persistentDetails ? 'translateY(0)' : 'translateY(-100%)',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {Array.isArray(internalValue) && internalValue.length > 0 && (
              <span style={{ whiteSpace: 'nowrap' }}>{internalValue.length} files</span>
            )}
            {totalFileSizes > 0 && (
              <span style={{ whiteSpace: 'nowrap' }}>({formatFileSize(totalFileSizes)} in total)</span>
            )}
          </div>
        );
      },
      [totalFileSizes, formatFileSize]
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
          <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
        </svg>
      ),
      []
    );

    const defaultPrependInnerIcon = useMemo(
      () => (
        <svg
          className="prepend-inner-svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          <path d="M20,8 C18.896,8 18,7.104 18,6 L18,2 L24,8 L20,8 Z M18,0 L18,0.028 C17.872,0.028 4,0 4,0 C1.791,0 0,1.791 0,4 L0,28 C0,30.209 1.791,32 4,32 L22,32 C24.209,32 26,30.209 26,28 L26,10 L26,8 L18,0 Z" />
        </svg>
      ),
      []
    );

    const defaultAppendInnerIcon = useMemo(
      () => (
        <svg
          className="append-inner-svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path>
          </g>
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
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
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
        className={`file-input-wrapper ${className} ${isDragging ? 'is-dragging' : ''}`}
        style={style}
        label={label || (multiple ? 'Upload your files' : 'Upload your file')}
        value={
          Array.isArray(internalValue)
            ? internalValue.length > 0
              ? internalValue
              : ''
            : internalValue
              ? internalValue
              : ''
        }
        rules={validationRules}
        persistentDetails={persistentDetails}
        hideDetails={hideDetails}
        hint={hint}
        loading={loading}
        disabled={disabled}
        readonly={readonly}
        clearable={true}
        prepend={true}
        prependInner={true}
        appendInner={true}
        append={true}
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
        onPaste={onPaste || handlePaste}
        onCompositionStart={onCompositionStart}
        onCompositionUpdate={onCompositionUpdate}
        onCompositionEnd={onCompositionEnd}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onParentDragEnter={onParentDragEnter || handleDragEnter}
        onParentDragOver={onParentDragOver || handleDragOver}
        onParentDragLeave={onParentDragLeave || handleDragLeave}
        onParentDrop={onParentDrop || handleDrop}
        onPrependClick={triggerFileInput}
        onPrependInnerClick={triggerFileInput}
        onClearClick={handleClearClick}
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
BasicFileInput.propTypes = {
  label: PropTypes.string,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  chip: PropTypes.bool,
  persistentDetails: PropTypes.bool,
  accept: PropTypes.string,
  hideDetails: PropTypes.bool,
  hint: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
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

BasicFileInput.displayName = 'BasicFileInput';

export default BasicFileInput;
