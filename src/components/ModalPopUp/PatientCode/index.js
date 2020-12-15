import React from "react";
import Inputs from "../../Inputs";

export default function PatientCode({
  value,
  handleBlurPatientCode,
  handleChangePatientCode,
  handlePressEnter,
  text,
  disabled,
  errors,
  nameId
}) {
  return (
    <div className="col-md-4">
    <div className="form-group">
      <label htmlFor="patient_code">
      Mã bệnh nhân
        <i>
          <small></small>
        </i>
      </label>
      <input
        id={nameId +  "" + "patient_code"}
        type="text"
        className="form-control"
        name="patient_code"
        placeholder="Nhập mã bệnh nhân"
        onChange={handleChangePatientCode}
        onBlur={handleBlurPatientCode}
        value={value && value !== undefined ? value: ""}
        disabled={disabled}
        onKeyPress={handlePressEnter}
        // maxLength={maxLength}
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