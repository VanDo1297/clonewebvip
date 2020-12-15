import React from "react";
import Inputs from "../../Inputs";

function ModalInfoUse({
  onChangeValue,
  values,
  dataInfoPatientByCode,
  handleBlur,
  errors,
  codes,
  isOpenModalPopUpEdit
}) {
  return (
    <div className="content__info">
      <div className="row">
        <Inputs
          errors={errors.fullName}
          name="fullName"
          type="text"
          id="fullName"
          placeholder="Nhập họ và tên"
          handleBlur={handleBlur}
          handleChange={onChangeValue}
          // handleBlur={onBlur}
          value={values.fullName || ""}
          title="Họ và tên"
          // errors={errors.fullName}
          disabled={
            Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
              ? "disabled"
              :Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 && isOpenModalPopUpEdit === true ? "" : "disabled"
          }
        />
        <div className="col-md-6">
          <label
            style={{
              fontWeight: "600",
              display: "block",
            }}
          >
            Giới tính
          </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="1"
              onChange={onChangeValue}
              value="1"
              checked={values.gender === "1"}
              disabled={
            Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
              ? "disabled"
              :Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 && isOpenModalPopUpEdit === true ? "" : "disabled"
          }
            />{" "}
            <label className="form-check-label mr-5" htmlFor="gender">
              Nam{" "}
            </label>{" "}
          </div>{" "}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="0"
              onChange={onChangeValue}
              value="0"
              checked={values.gender === "0"}
              disabled={
            Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
              ? "disabled"
              :Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 && isOpenModalPopUpEdit === true ? "" : "disabled"
          }
            />{" "}
            <label className="form-check-label" htmlFor="gender">
              Nữ{" "}
            </label>{" "}
          </div>{" "}
          {/* 
          {errors.sex && (
            <div className="text-left errors">
              <span> {errors.sex} </span>{" "}
            </div>
          )}
           */}
        </div>
      </div>
      <div className="row">
      </div>
    </div>
  );
}
export default React.memo(ModalInfoUse);
