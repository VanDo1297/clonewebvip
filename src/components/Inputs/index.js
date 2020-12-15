import React from "react";

const Inputs = React.memo(
  ({
    id,
    name,
    placeholder,
    handleBlur,
    handleChange,
    title,
    type,
    errors,
    value,
    disabled,
    text,
    onKeyPress,
    maxLength,
    inputRef,
    max,
  }) => {
    return (
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor={name} ref={inputRef}>
            {title}{" "}
            <i>
              <small>{text}</small>
            </i>
          </label>
          <input
          // ref={inputRef}
            id={id}
            type={type}
            className="form-control"
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value && value !== undefined ? value: ""}
            disabled={disabled}
            onKeyPress={onKeyPress}
            maxLength={maxLength}
            max={max}
          />
        </div>
        {disabled ? "":
          errors && (
          <div className="text-left errors">
            <span>{errors}</span>
          </div>
        )}
      </div>
    );
  }
);

export default Inputs;
