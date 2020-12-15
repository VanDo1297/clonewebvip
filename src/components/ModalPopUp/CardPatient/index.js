import React from 'react'
import Inputs from '../../Inputs'

export default function CardPatient(
  cardPatient_code,
  handleBlurCardPatient,
  handleCardPatientCode,
  handlePressEnter,
  text,
  disabled,
  errors,
  nameId) {
    return (
      <div className="col-md-4">
    <div className="form-group">
      <label htmlFor="cardPatient_code">
      Mã thẻ
        <i>
          <small></small>
        </i>
      </label>
      <input
        id={nameId +  "" + "cardPatient_code"}
        type="text"
        className="form-control"
        name="cardPatient_code"
        placeholder="Nhập mã thẻ"
        onChange={handleCardPatientCode}
        onBlur={handleBlurCardPatient}
        value={cardPatient_code}
        // disabled={disabled}
        // onKeyPress={handlePressEnter}
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
    )
}
