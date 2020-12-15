import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";
function ModalAddress({
  defaultValueProvince,
  setDefaultValueProvince,
  defaultValueDistrict,
  setDefaultValueDistrict,
  defaultValueWard,
  setDefaultValueWard,
  codes,
  isOpenModalPopUpEdit
}) {
  const { location } = useSelector((state) => state.webVIPReducer);
  const { dataInfoPatientByCode } = useSelector((state) => state.webVIPUserReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    //Trường hợp defaulValueProvince rỗng
    if (defaultValueProvince === null && Object.entries(location).length > 0) {
      setDefaultValueProvince(location[64]);
    } else if (
      defaultValueProvince !== null &&
      Object.entries(location).length > 0 &&
      Object.entries(dataInfoPatientByCode).length === 0
    ) {
      setDefaultValueDistrict(
        defaultValueProvince && defaultValueProvince.districts[0]
      );
    } else if (
      dataInfoPatientByCode &&
      Object.entries(dataInfoPatientByCode).length > 0 &&
      defaultValueProvince !== null &&
      dataInfoPatientByCode.province_code !== defaultValueProvince.provinceCode
    ) {
      setDefaultValueDistrict(
        defaultValueProvince.districts && defaultValueProvince.districts[0]
      );
    }
  }, [defaultValueProvince, location, dataInfoPatientByCode]);

  useEffect(() => {
    if (defaultValueDistrict === null && Object.entries(location).length > 0) {
      setDefaultValueDistrict(
        location[64] && location[64].districts && location[64].districts[0]
      );
    } else if (
      defaultValueDistrict !== null &&
      Object.entries(location).length > 0 &&
      dataInfoPatientByCode &&
      Object.entries(dataInfoPatientByCode).length === 0
    ) {
      setDefaultValueWard(
        defaultValueDistrict.wards && defaultValueDistrict.wards[0]
      );
    } else if (
      defaultValueDistrict !== null &&
      dataInfoPatientByCode &&
      Object.entries(dataInfoPatientByCode).length > 0 &&
      dataInfoPatientByCode.district_code !== defaultValueDistrict.districtCode
    ) {
      setDefaultValueWard(
        defaultValueDistrict.wards && defaultValueDistrict.wards[0]
      );
    }
  }, [defaultValueDistrict, location, dataInfoPatientByCode]);

  useEffect(() => {
    if (defaultValueWard === null && Object.entries(location).length > 0) {
      setDefaultValueWard(
        location[64] &&
        location[64].districts &&
        location[64].districts[0] &&
        location[64].districts[0].wards &&
        location[64].districts[0].wards[0]
      );
    }
  }, [defaultValueWard, location]);
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#555",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ccc",
        },
        "&:hover fieldset": {
          borderColor: "#ccc",
        },
        "&.Mui-focused fieldset": {
          border: "1px solid",
          borderColor: "#8cbbec",
        },
        "& .MuiAutocomplete-popper": {
          top: "-5px",
        },
        "& .MuiAutocomplete-input": {
          color: "#000",
        },
      },
    },
  })(TextField);
  const listdata =
    defaultValueProvince && defaultValueProvince.provinceCode
      ? defaultValueProvince.districts || []
      : [];
  const listWard =
    defaultValueDistrict && defaultValueDistrict.districtCode
      ? defaultValueDistrict.wards || []
      : [];

  return (
    <div className="content">
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="province">Tỉnh/Thành phố</label>
            <Autocomplete
              disabled={
                Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
                  ? true
                  : Object.entries(codes).length > 0 && Object.entries(dataInfoPatientByCode).length > 0 && isOpenModalPopUpEdit ? false : true
              }
              value={defaultValueProvince || "."}
              id="province combo-box-demo"
              onChange={(event, value) => {
                if (value && value.provinceName) {
                  setDefaultValueProvince(value);
                }
              }}
              options={location}
              getOptionSelected={(option, value) => {
                if (!value) return false;
                return option.provinceName === value.provinceName;
              }}
              getOptionLabel={
                (option) =>
                  typeof option === "string" && option
                    ? option
                    : option.provinceName
                // option.provinceName ? option.provinceName : null
              }
              style={{ width: "100%" }}
              renderInput={(params) => (
                <CssTextField
                  style={{ background: "white" }}
                  {...params}
                  placeholder="Nhập thành phố"
                  variant="outlined"
                  name="province"
                />
              )}
            // disabled={messageSuccessPatient === SUCCESS_CODE ? true: false}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="district">Quận/Huyện</label>
            <Autocomplete
              disabled={
                Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
                  ? true
                  : Object.entries(codes).length > 0 && Object.entries(dataInfoPatientByCode).length > 0 && isOpenModalPopUpEdit ? false : true
              }
              value={defaultValueDistrict || "."}
              id="district combo-box-demo"
              onChange={(event, value) => {
                if (value && value.districtName) {
                  setDefaultValueDistrict(value);
                }
              }}
              options={listdata}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.districtName
              }
              getOptionSelected={(option, value) => {
                if (!value) return false;
                return option.districtName === value.districtName;
              }}
              style={{ width: "100%" }}
              noOptionsText="Không có lựa chọn nào. Vui lòng nhập lại!"
              renderInput={(params) => (
                <CssTextField
                  style={{ background: "white" }}
                  {...params}
                  variant="outlined"
                  placeholder="Nhập quận/huyện"
                  name="district"
                />
              )}
            // disabled={messageSuccessPatient === SUCCESS_CODE ? true: false}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="ward">Phường/Xã/Thị trấn</label>
            <Autocomplete
              disabled={
                Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
                  ? true
                  : Object.entries(codes).length > 0 && Object.entries(dataInfoPatientByCode).length > 0 && isOpenModalPopUpEdit ? false : true
              }
              value={defaultValueWard || "."}
              id="ward combo-box-demo"
              onChange={(event, value) => {
                if (value && value.wardName) {
                  setDefaultValueWard(value);
                }
              }}
              options={listWard}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.wardName
              }
              getOptionSelected={(option, value) => {
                if (!value) return false;

                return option.wardName === value.wardName;
              }}
              style={{ width: "100%" }}
              noOptionsText="Không có lựa chọn nào. Vui lòng nhập lại!"
              renderInput={(params) => (
                <CssTextField
                  style={{ background: "white" }}
                  {...params}
                  variant="outlined"
                  placeholder="Nhập xã/phường"
                  name="ward"
                // onBlur={handleBlur}
                />
              )}
            // disabled={messageSuccessPatient === SUCCESS_CODE ? true: false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(ModalAddress);
