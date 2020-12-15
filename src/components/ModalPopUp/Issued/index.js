import React from "react";

export default function Issued({ onBlur, handleChange, errors, values, disabled }) {
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="issued">Nơi cấp</label>
        <input
          type="text"
          name="issued"
          id="issued"
          onBlur={onBlur}
          onChange={handleChange}
          value={values.issued || ''}
          placeholder="Nhập nơi cấp"
          className="form-control"
          disabled={disabled}
        />
      </div>
      {disabled ? "":errors.issued && (
        <div className="text-left errors">
          <span>{errors.issued}</span>
        </div>
      )}
    </div>
  );
}
