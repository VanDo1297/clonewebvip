import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCode,
  getCardCode, getCardCodeFormUser, getPatientCodeInfo, resetData, setMessageError,
} from "../../../actions/webVIPSearchAtion";
import { validations } from "../../../selectors/Validation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalInfoUse from "../ModalInfoUse";
import ModalAddress from "../ModalAddress";
import Button from "@material-ui/core/Button";
import "./FormUser.scss";
import moment from "moment";
import { SUCCESS_CODE, VALUE_EMPTY } from "../../../constants/constantsVariable";
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// KeyboardTimePicker
import 'date-fns';
import { getCodeRegisSuccess, getInfoPatientByCard, getInfoPatientByCode, postRegisPatient, postUpdatePatient, resetCodeFormUser, resetDataUer, setMessageErrorUser, setMessageSuccessUser } from "../../../actions/webVIPUserAction";
function FormUser({ closeModalFormUser, isOpenModalPopUpEdit, isOpenModalPopUpFormUser }) {
  const dispatch = useDispatch();
  const { messageErrorSearchCardCode, loadingSearch, messageErrorSearchPatienCode, codes, messageSuccessSearchPatientCode, dataPatientCodeInfo, location } = useSelector(
    (state) => state.webVIPReducer
  );
  const { messageSuccessRegis, messgaeSuccessUpdate, messageErrorByCard, messageErrorByCode, dataInfoPatientByCode, dataInfoPatientByCard, loadingInfo, messageSuccessByCard } = useSelector(
    (state) => state.webVIPUserReducer
  );
  const MySwal = withReactContent(Swal);
  const today = new Date();
  const max = moment(today).format("YYYY-MM-DD").toString();
  const setYear = moment(today)
    .add(-20, "years")
    .format("YYYY-MM-DD")
    .toString();
  const [date, setDate] = useState(new Date());
  const [code, setCode] = useState("");
  const [birtDate, setBirtDate] = useState(setYear)
  const [effectiveDate, setEffectiveDate] = useState(max)
  const [isCheckEffective, setIsCheckEffective] = useState(false)
  const [selectedVIP, setSelectedVIP] = useState("0")
  const [values, setValues] = useState({
    fullName: "",
    gender: "1",
    phoneNumber: "",
    street: "",
  })
  const [errors, setErrors] = useState({
    fullName: "",
    gender: "1",
    phoneNumber: "",
    street: "",
  })
  useEffect(() => {
    if (codes && Object.entries(codes).length > 0) {
      setCode(codes)
      dispatch(getInfoPatientByCode(codes))
    }
  }, [codes])
  
  const splitString = values.fullName.split(" ");
  const firt_name = splitString.slice(-1).join(" ");
  const last_name = splitString.slice(0, -1).join(" ");
  const [defaultValueProvince, setDefaultValueProvince] = useState(null);
  const [defaultValueDistrict, setDefaultValueDistrict] = useState(null);
  const [defaultValueWard, setDefaultValueWard] = useState(null);
  const province =
    (defaultValueProvince && defaultValueProvince.provinceCode) ||
    defaultValueProvince;
  const state =
    (defaultValueDistrict && defaultValueDistrict.districtCode) ||
    defaultValueDistrict;
  const ward =
    (defaultValueWard && defaultValueWard.wardCode) || defaultValueWard;
  const onChangeValue = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }
  const handlur = (e) => {
    const { name, value } = e.target;
    const error = validations(name, value)
    setErrors({
      ...errors,
      [name]: error
    })
  }
  const onChangeBirthDate = (e) => {
    setBirtDate(e)
  }
  useEffect(() => {
    if (birtDate === null) {
      setBirtDate(setYear)
    }
  }, [birtDate])
  useEffect(() => {
    if (effectiveDate === null) {
      setEffectiveDate(max)
    }
  })
  const onChangeEffectiveDate = (e) => {
    setEffectiveDate(e)
  }
  //Tìm kiếm bệnh nhân theo mã thẻ or mã bệnh nhân
  const inputRef = useRef();
  const onChangeCode = (e) => {
    setCode(e.target.value)
  }
  const onBlurCode = () => {
    if (code !== VALUE_EMPTY && isOpenModalPopUpFormUser === true) {
      if (!/^[0-9_.]+$/.test(code) && Object.entries(code).length > 0) {
        MySwal.fire({
          icon: "warning",
          text: "Vui lòng chỉ nhập số!",
        });
      }
      if (/^[0-9_.]+$/.test(code) && Object.entries(code).length > 0) {
        dispatch(getInfoPatientByCard(code))
        inputRef.current.focus();
      }
    }
  }
  const onKeyPressEnterCode = (e) => {
    if (e.key === "Enter") {
      onBlurCode()
    }
  }
  const onChangeIsCheck = () => {
    setIsCheckEffective(!isCheckEffective)
  }
  const onChangeSelectVIP = (e) => {
    setSelectedVIP(e.target.value)
  }
  useEffect(() => {
    if (messageSuccessByCard && messageSuccessByCard === SUCCESS_CODE && dataInfoPatientByCard && Object.entries(dataInfoPatientByCard).length > 0) {
      dispatch(getInfoPatientByCode(dataInfoPatientByCard.code))
    }
  }, [messageSuccessByCard, dataInfoPatientByCard])
  useEffect(() => {
    if (messageErrorByCard && messageErrorByCard !== VALUE_EMPTY) {
      dispatch(getInfoPatientByCode(code))
    }
  }, [messageErrorByCard])
  useEffect(() => {
    if (messageErrorByCode && messageErrorByCode !== VALUE_EMPTY) {
      MySwal.fire({
        allowOutsideClick: false,
        icon: "error",
        text:
          "Không tìm thấy thông tin bệnh nhân. Vui lòng nhập lại mã thẻ Tekmedi hoặc mã bệnh nhân!",
        preConfirm: () => {
          dispatch(setMessageErrorUser())
          setCode("")
        },
      });
    }
  }, [messageErrorByCode])
  useEffect(() =>{
    if(isOpenModalPopUpEdit || isOpenModalPopUpFormUser){
      dispatch(resetCodeFormUser())
    }
  },[isOpenModalPopUpEdit,isOpenModalPopUpFormUser])
  //dataPatientCodeInfo Có
  useEffect(() => {
    if (dataInfoPatientByCode && Object.entries(dataInfoPatientByCode).length > 0) {
      const birthday = dataInfoPatientByCode.birthday &&
        dataInfoPatientByCode.birthday !== null ? dataInfoPatientByCode.birthday  : setYear;
      setValues({
        fullName:
          dataInfoPatientByCode.full_name !== null
            ? dataInfoPatientByCode.full_name.trim()
                : null,
        gender: dataInfoPatientByCode.gender_code !== null ? dataInfoPatientByCode.gender_code : null,
        phoneNumber: "",
        street: dataInfoPatientByCode.street !== null ? dataInfoPatientByCode.street.trim() : null,

      })
      setBirtDate(birthday)
      // setEffectiveDate(subEffectDate)
      setSelectedVIP(dataInfoPatientByCode.vip_type ? dataInfoPatientByCode.vip_type.toString() : "0")
      let province = location.filter(
        (item) => item.provinceCode === dataInfoPatientByCode.province_code
      )[0];
      let district =
        province &&
        province.districts.filter(
          (item) => item.districtCode === dataInfoPatientByCode.district_code
        )[0];
      let ward =
        district &&
        district.wards.filter(
          (item) => item.wardCode === dataInfoPatientByCode.ward_code
        )[0]
      setDefaultValueProvince(province);
      setDefaultValueDistrict(district);
      setDefaultValueWard(ward);
      setEffectiveDate(dataInfoPatientByCode.vip_expired_date !== null && !isOpenModalPopUpEdit ? dataInfoPatientByCode.vip_expired_date:dataInfoPatientByCode.vip_expired_date !== null && isOpenModalPopUpEdit ? dataInfoPatientByCode.vip_expired_date: max)
    }
  }, [dataInfoPatientByCode])
  //Data Registered
  useEffect(() =>{
    if(isOpenModalPopUpEdit && selectedVIP !== "0" &&  dataInfoPatientByCode.vip_expired_date !== null){
      setIsCheckEffective(true)
    }
  },[isOpenModalPopUpEdit,selectedVIP,dataInfoPatientByCode])
  const vip = selectedVIP !== VALUE_EMPTY ? parseInt(selectedVIP) : 0
  const vip_expired_date = isCheckEffective ? effectiveDate :""
  const dataRegistered = {
    patient_code: dataInfoPatientByCode && dataInfoPatientByCode.code ? dataInfoPatientByCode.code.trim() : "",
    tekmedi_card_number: dataInfoPatientByCode && dataInfoPatientByCode.tekmedi_cardNumber ? dataInfoPatientByCode.tekmedi_cardNumber : null,
    first_name: firt_name,
    last_name: last_name,
    ward_code: ward,
    gender:values.gender,
    district_code: state,
    province_code: province,
    phone: values.phoneNumber,
    birthday: moment(birtDate).format("YYYY-MM-DD"),
    street: values.street,
    vip_expired_date:vip_expired_date,
    vip_type: vip
  }
  const id = dataInfoPatientByCode && dataInfoPatientByCode.id ? dataInfoPatientByCode.id : "";
  const handleSubmit = () => {
    if (code === VALUE_EMPTY) {
      MySwal.fire({
        allowOutsideClick: false,
        icon: "error",
        text:
          "Vui lòng nhập mã bệnh nhân hoặc mã thẻ Tekmedi!",
        preConfirm: () => {
        },
      });
    }
   
    let hasError = false;
    let obj = {};
    for (let key in values) {
      const error = validations(key, values[key]);
      if (error) {
        obj[key] = error;
      }
    }
    if (Object.entries(obj).length !== 0) {
      setErrors({ ...obj });
      hasError = true;
    }
    if (hasError) return;
    if (dataInfoPatientByCode.vip_type && dataInfoPatientByCode.vip_type !== 0 && !isOpenModalPopUpEdit) {
      MySwal.fire({
        allowOutsideClick: false,
        icon: "error",
        text:
          "Bệnh nhân đã đăng ký VIP. Vui lòng kiểm tra thông tin bệnh nhân",
        preConfirm: () => {
          dispatch(setMessageSuccessUser())
          dispatch(setMessageErrorUser())
          handleClose()
          setCode("")
        },
      });
    }
    else if(selectedVIP === "0"){
      MySwal.fire({
        allowOutsideClick: false,
        icon: "error",
        text:
          "Bạn Chưa chọn loại VIP!",
        preConfirm: () => {
        },
      });
    }
    else {
      if (isOpenModalPopUpEdit) {
        dispatch(postUpdatePatient(id, dataRegistered))
      } else {
        dispatch(postRegisPatient(dataRegistered))
      }
    }
  }
  useEffect(() => {
    if (messageSuccessRegis && messageSuccessRegis === SUCCESS_CODE) {
      MySwal.fire({
        allowOutsideClick: false,
        icon: "success",
        text:
          "Đăng ký thành công!",
        preConfirm: () => {
          dispatch(getCodeRegisSuccess(dataInfoPatientByCode.code))
          dispatch(setMessageSuccessUser())
          handleClose();
          closeModalFormUser()
        },
      });
    }
  }, [messageSuccessRegis])
  useEffect(() => {
    if (messgaeSuccessUpdate && messgaeSuccessUpdate === SUCCESS_CODE) {
      MySwal.fire({
        allowOutsideClick: false,
        icon: "success",
        text:
          "Cập nhập thành công!",
        preConfirm: () => {
          dispatch(getCodeRegisSuccess(dataInfoPatientByCode.code))
          dispatch(setMessageSuccessUser())
          handleClose();
          closeModalFormUser()
        },
      });
    }
  }, [messgaeSuccessUpdate])
  //handleClose
  const handleClose = () => {
    setCode("")
    dispatch(setMessageSuccessUser())
    dispatch(setMessageErrorUser())
    dispatch(resetDataUer());
    dispatch(clearCode())
    setValues({
      fullName: "",
      gender: "1",
      phoneNumber: "",
      street: ""
    })
    setBirtDate(setYear)
    setEffectiveDate(max)
    setIsCheckEffective(false)
    setSelectedVIP("0")
    setDefaultValueProvince(null)
    setDefaultValueDistrict(null)
    setDefaultValueWard(null)
  }
  return (
    <div>
      <div
        className="modal fade my-custom-scrollbar"
        id="modelId1"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId1"
        aria-hidden="true"
        style={{ opacity: 1, display: "block", overflow: "auto" }}
      >
        <div
          className="modal-dialog "
          role="document"
          style={{ marginTop: "240px" }}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="link-hospital-content">
                <div className="container w-70">
                  <div className="container__title text-center content__title">
                    <h5 className="modal-icons jss4 jss5">
                      <i className="fas fa-pencil-alt"></i>
                    </h5>
                    <h4 className="text-center content__title">
                      NHẬP THÔNG TIN
                    </h4>
                    <div className="content__horizontalLine"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-check-label" htmlFor="">
                          Tên bệnh viện
                        </label>
                        <input
                          type="text"
                          name=""
                          id=""
                          value="Bệnh viện Chợ Rẫy"
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6 inputcontainer">
                      <div className="form-group">
                        <label>
                          Mã thẻ/Mã bệnh nhân
                            <i>
                            <small></small>
                          </i>
                        </label>
                        <input
                          id="code"
                          type="text"
                          className="form-control"
                          name="code"
                          placeholder="Nhập mã thẻ/Mã bệnh nhân"
                          onChange={onChangeCode}
                          value={code}
                          onBlur={() => { onBlurCode() }
                          }
                          disabled={
                            Object.entries(dataInfoPatientByCode).length > 0
                              ? "disabled"
                              : ""
                          }
                          onKeyPress={onKeyPressEnterCode}
                        //    disabled={
                        //     cardPatient &&
                        //       Object.entries(cardPatient).length === 0
                        //       ? ""
                        //       : "disabled"
                        //   }
                        />
                        {loadingInfo ? (
                          <div className="icon-container">
                            <i className="loader"></i>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <ModalInfoUse codes={codes} inputRef={inputRef} onChangeValue={onChangeValue} values={values} dataInfoPatientByCode={dataInfoPatientByCode} handleBlur={handlur} errors={errors} isOpenModalPopUpEdit={isOpenModalPopUpEdit} />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-check-label" htmlFor="" ref={inputRef} style={{ display: "block" }}>
                          Ngày sinh
                        </label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <KeyboardDatePicker
                            className="birth edit"
                            variant="inline"
                            inputVariant="outlined"
                            disabled={
                              Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
                                ? true
                                : Object.entries(codes).length > 0 && Object.entries(dataInfoPatientByCode).length > 0 && isOpenModalPopUpEdit ? false : true
                            }
                            format="dd/MM/yyyy"
                            value={birtDate}
                            onChange={onChangeBirthDate}
                            autoOk={true}
                            orientation="landscape"
                            maxDate={new Date()}
                            invalidDateMessage=""
                            maxDateMessage="Ngày sinh không được vượt quá ngày hiện tại"
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input
                          // pattern="^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$"
                          placeholder="Nhập số điện thoại"
                          value={values.phoneNumber}
                          onChange={onChangeValue}
                          onBlur={handlur}
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          className="form-control"
                          disabled={
                            Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0
                              ? ""
                              : Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 ? "" : "disabled"
                          }
                        />
                      </div>
                      {Object.entries(dataInfoPatientByCode).length > 0 ?
                        errors.phoneNumber && (
                          <div className="text-left errors">
                            <span>{errors.phoneNumber}</span>
                          </div>
                        ) : null}
                    </div>
                  </div>
                  <ModalAddress
                    defaultValueProvince={defaultValueProvince}
                    setDefaultValueProvince={setDefaultValueProvince}
                    defaultValueDistrict={defaultValueDistrict}
                    setDefaultValueDistrict={setDefaultValueDistrict}
                    defaultValueWard={defaultValueWard}
                    setDefaultValueWard={setDefaultValueWard}
                    dataInfoPatientByCode={dataInfoPatientByCode}
                    codes={codes}
                    isOpenModalPopUpEdit={isOpenModalPopUpEdit}
                  />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-check-label" htmlFor="street">
                          Địa chỉ
                        </label>
                        <input
                          placeholder="Nhập địa chỉ"
                          className="form-control"
                          type="text"
                          name="street"
                          id="street"
                          onChange={onChangeValue}
                          value={values.street||""}
                          disabled={
                            Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0 && !isOpenModalPopUpEdit
                              ? "disabled"
                              : Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 && isOpenModalPopUpEdit ? "" : "disabled"
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Chọn loại VIP</label>
                        <select onChange={onChangeSelectVIP} name="selectedVIP" id="selectedVIP" className="form-control" value={selectedVIP}
                          disabled={
                            Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length === 0
                              ? ""
                              : Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 && isOpenModalPopUpEdit ? "disabled" : Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 && !isOpenModalPopUpEdit ? "" : "disabled"
                          }
                        >
                          <option value="0">Chưa có VIP</option>
                          <option value="1">VIP 1</option>
                          <option value="2">VIP 2</option>
                          <option value="3">VIP 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label
                          className="form-check-label"
                          htmlFor=""
                          style={{ display: "block" }}
                        > 
                          Hiệu lực
                        </label>
                        <input type="checkbox" name="isCheckEffective" id="isCheckEffective" onChange={() => onChangeIsCheck()} value={isCheckEffective} style={{ marginTop: "8px", marginLeft: "12px" }} checked={isCheckEffective}
                          disabled={
                               Object.entries(dataInfoPatientByCode).length > 0 && Object.entries(codes).length > 0 && isOpenModalPopUpEdit ?  "disabled" : Object.entries(dataInfoPatientByCode).length > 0  && !isOpenModalPopUpEdit && selectedVIP !== "0" ? false : true
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label
                          className="form-check-label"
                          htmlFor=""
                          style={{ display: "block" }}
                        >Ngày hiệu lực</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <KeyboardDatePicker
                            disabled={isCheckEffective && isCheckEffective === true && !isOpenModalPopUpEdit  ? false : isCheckEffective && isCheckEffective === true && isOpenModalPopUpEdit ? true:true}
                            variant="inline"
                            inputVariant="outlined"
                            className="fix edit"
                            invalidDateMessage=""
                            id="effectiveDate"
                            format="dd/MM/yyyy"
                            value={effectiveDate}
                            onChange={onChangeEffectiveDate}
                            autoOk={true}
                            maxDateMessage="Ngày hiệu lực không được vượt quá ngày hiện tại"
                            minDateMessage=""
                            orientation="landscape"
                            minDate={new Date()}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button
                    //   disabled={loading}
                    variant="contained"
                    color={isOpenModalPopUpEdit ? "secondary" : "primary"}
                    onClick={handleSubmit}
                  >
                    {isOpenModalPopUpEdit ? <i className="fa fa-refresh mr-1" aria-hidden="true"></i> : <i className="fas fa-file-signature mr-1"></i>} {isOpenModalPopUpEdit ? "Cập nhập" : "Đăng ký"}
                  </Button>
                  <button
                    id="closess"
                    type="button"
                    onClick={() => {
                      handleClose();
                      closeModalFormUser();
                    }}
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    style={{ margin: 0, borderRadius: "5px" }}
                  >
                    <i className="fas fa-times-circle"></i>Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FormUser);
