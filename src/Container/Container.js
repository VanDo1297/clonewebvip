import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Container.css";
import ModalPopUp from "../components/ModalPopUp/ModalPopUp";
import {
  getCardCode,
  getCode,
  getLocation,
  getNameAndCode,
  getPatientAll, getPatientCode, getPatientCodeAndVIPCODE, getPatientCodeVIP, getPatientName, getPatientNameAndVIP, getPatientNoStart, getPatientOnlyName, getPatientOnlyNameAndVIP, getPatientOnlyVIP, setMessageError, setMessageSuccessSearch
} from "../actions/webVIPSearchAtion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { exportFile, getCardPatientCode } from "../actions/dangKyAction";
import FormUser from "../components/ModalPopUp/FormUser";
import moment from "moment";
import ButtonActive from "../components/ButtonActive";
import ButtonEdit from "../components/ButtonEdit";
import { LINK_EXPORT, SUCCESS_CODE, VALUE_EMPTY } from "../constants/constantsVariable";
import Panigations from "../components/Panigations";
import { postDeactive, setMessageSuccessDeActive } from "../actions/webVIPDeactiveAction";
import ButtonRegisted from "../components/ButtonRegisted";
import { postExportAll } from "../actions/webVIPExportAction";
import { object } from "prop-types";
function Container() {
  const [isStyle, setIsStyle] = useState(false);
  const [isStyleClose, setIsStyleClose] = useState(false);
  const [isOpenModalPopUpEdit, setIsOpenModalPopUpEdit] = useState(false);
  const [isOpenModalPopUpFormUser, setIsOpenModalPopUpFormUser] = useState(false);
  const [searchCardCode, setSearchCardCode] = useState("");
  const [start, setStart] = useState(0)
  const preStart = useRef(start)
  const [length, setLength] = useState(10)
  const [activePage, setActivePage] = useState(0)
  const { dataPatientAll, loading, messageErrorSearchCardCode, messageSuccessSearchCardCode, dataPatientCode, dataCardPatient, total, messageSuccessSearchPatientCode, messageSuccessSearchName, dataNameAndCode, messageSuccessNameAndCode, codes } = useSelector(
    (state) => state.webVIPReducer
  );
  const { dataExport, loadingExport } = useSelector(
    (state) => state.webVIPExportReducer
  );
  const { dataPatienDeActive } = useSelector(
    (state) => state.webVIPDeActiveReducer
  );

  const { loadingInfo, dataInfoPatientByCode, codeRegisSuccess } = useSelector(
    (state) => state.webVIPUserReducer
  );
  const preTotal = useRef(total)
  const [isChecked, setIsChecked] = useState('')
  const [code, setCode] = useState('')
  const { messageSuccessDeActive } = useSelector((state) => state.webVIPDeActiveReducer)
  const [searchNamePatient, setSearchNamePatient] = useState("");
  const [selected, setSelected] = useState("")
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const handleChangeStyle = () => {
    setIsStyle(!isStyle);
  };
  const handleStyleClose = () => {
    setIsStyleClose(!isStyleClose);
  };


  // useEffect(() =>{
  //   if(codeRegisSuccess && codeRegisSuccess !== VALUE_EMPTY){
  //     setSearchCardCode(codeRegisSuccess)
  //   }
  // },[codeRegisSuccess])
  //Get Data Patient All
  const onChangeInputSearchNamePatient = (e) => {
    setSearchNamePatient(e.target.value)
  }
  const onChangeInputSearchCode = (e) => {
    setSearchCardCode(e.target.value)
  }
  const onChangeSelected = (e) => {
    setSelected(e.target.value)
  }
  const handlePageChange = (pageNumber) => {
    const selectedPage = pageNumber.selected;
    const index = selectedPage * length;
    setActivePage(selectedPage);
    setStart(index);
  }
  useEffect(() => {
    preStart.current = start;
  }, [start])
  useEffect(() => {
    preTotal.current = total;
  }, [total])
  //Search 
  useEffect(() => {
    dispatch(getLocation())
  }, [])
  //Auto Lọc theo VIP
  const handleSearch = () => {
    if (searchCardCode && searchCardCode !== VALUE_EMPTY && searchNamePatient === VALUE_EMPTY && selected === VALUE_EMPTY || searchCardCode && searchCardCode !== VALUE_EMPTY && searchNamePatient === VALUE_EMPTY) {
      setActivePage(0)
      setStart(0)
      dispatch(getCardCode(searchCardCode))
    }
    else if (searchNamePatient && searchNamePatient !== VALUE_EMPTY && searchCardCode === VALUE_EMPTY && selected === VALUE_EMPTY) {
      setActivePage(0)
      setStart(0)
      dispatch(getPatientName(start, length, searchNamePatient))
    }else if(searchNamePatient && searchNamePatient !== VALUE_EMPTY && searchCardCode === VALUE_EMPTY && selected !== VALUE_EMPTY){
      setActivePage(0)
      setStart(0)
      dispatch(getPatientNameAndVIP(start, length, searchNamePatient,selected))
    }
    else if (searchCardCode === VALUE_EMPTY && searchNamePatient === VALUE_EMPTY && selected !== VALUE_EMPTY || searchCardCode === VALUE_EMPTY && searchNamePatient === VALUE_EMPTY && selected === VALUE_EMPTY) {
      setActivePage(0)
      setStart(0)
      dispatch(getPatientCodeVIP(start, length, selected))
    } else if (searchCardCode !== VALUE_EMPTY && searchNamePatient !== VALUE_EMPTY && selected !== VALUE_EMPTY || searchCardCode !== VALUE_EMPTY && searchNamePatient !== VALUE_EMPTY && selected === VALUE_EMPTY) {
      setActivePage(0)
      setStart(0)
      dispatch(getNameAndCode(searchCardCode, searchNamePatient))
    }
    else {
      dispatch(getPatientAll(start, length))
    }
  }
  const handlePress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const searchEnterCard = (e) => {
    if (e.key === "Enter") {
      dispatch(getCardCode(searchCardCode))
    }
  };
  useEffect(() => {
    if (messageErrorSearchCardCode !== VALUE_EMPTY && selected === VALUE_EMPTY) {
      dispatch(getPatientCode(searchCardCode))
      dispatch(setMessageError())
    } else if (messageErrorSearchCardCode !== VALUE_EMPTY) {
      dispatch(getPatientCode(searchCardCode))
      dispatch(setMessageError())
    }
  }, [messageErrorSearchCardCode, selected])
  useEffect(() => {
    if (dataCardPatient && Object.entries(dataCardPatient).length > 0) {
      dispatch(getPatientCode(dataCardPatient.code))
    }
  }, [dataCardPatient])

  // Thay đổi khi next page
  useEffect(() => {
    if (searchCardCode === VALUE_EMPTY && searchNamePatient === VALUE_EMPTY && selected === VALUE_EMPTY) {
      if (start !== preStart && preStart !== 0) {
        dispatch(getPatientAll(start, length))
      }
    } else if (searchCardCode === VALUE_EMPTY && searchNamePatient !== VALUE_EMPTY && selected === VALUE_EMPTY) {
      if (start !== preStart) {
        dispatch(getPatientName(start, length, searchNamePatient))
      }
    } else if (searchCardCode === VALUE_EMPTY && searchNamePatient === VALUE_EMPTY && selected !== VALUE_EMPTY) {
      if (start !== preStart) {
        dispatch(getPatientCodeVIP(start, length, selected))
      }
    } else if (searchCardCode === VALUE_EMPTY && searchNamePatient !== VALUE_EMPTY && selected !== VALUE_EMPTY) {
      if (start !== preStart) {
        dispatch(getPatientNameAndVIP(start, length, searchNamePatient, selected))
      }
    }
  }, [start, preStart])
  useEffect(() => {
    if (searchCardCode !== VALUE_EMPTY && searchNamePatient === VALUE_EMPTY && selected === VALUE_EMPTY) {
      if (messageSuccessSearchCardCode === SUCCESS_CODE) {
        setStart(0)
        setActivePage(0)
        dispatch(getCardCode(searchCardCode))
      }
    }
    else if (searchCardCode === VALUE_EMPTY && searchNamePatient !== VALUE_EMPTY && selected !== VALUE_EMPTY) {
      if (total !== preTotal) {
        setStart(0)
        setActivePage(0)
        dispatch(getPatientOnlyNameAndVIP(searchNamePatient, selected))
      }
    }
  }, [total, preTotal])
  useEffect(() => {
    if (messageSuccessSearchCardCode && messageSuccessSearchCardCode === SUCCESS_CODE) {
      setActivePage(0);
      setStart(0)
    }
  }, [messageSuccessSearchCardCode])
  useEffect(() => {
    if (messageSuccessSearchPatientCode && messageSuccessSearchPatientCode === SUCCESS_CODE && dataPatientCode[0] && 1 < Object.entries(dataPatientCode[0]).length > 0) {
      if (dataPatientCode[0].vip_type === 0) {
        setSelected("0")
        setStart(0)
        setActivePage(0)
      } else if (dataPatientCode[0].vip_type !== 0 && dataPatientCode[0].vip_type === 1) {
        setSelected("1")
        setStart(0)
        setActivePage(0)
      } else if (dataPatientCode[0].vip_type !== 0 && dataPatientCode[0].vip_type !== 1 && dataPatientCode[0].vip_type === 2) {
        setSelected("2")
        setStart(0)
        setActivePage(0)
      } else {
        setSelected("3")
        setStart(0)
        setActivePage(0)
      }
    }
  }, [messageSuccessSearchPatientCode, dataPatientCode])

  useEffect(() => {
    if (messageSuccessNameAndCode && messageSuccessNameAndCode === SUCCESS_CODE && dataNameAndCode[0] && 1 < Object.entries(dataNameAndCode[0]).length > 0) {
      if (dataNameAndCode[0].vip_type === 0) {
        setSelected("0")
        setStart(0)
        setActivePage(0)
      } else if (dataNameAndCode[0].vip_type !== 0 && dataNameAndCode[0].vip_type === 1) {
        setSelected("1")
        setStart(0)
        setActivePage(0)
      } else if (dataNameAndCode[0].vip_type !== 0 && dataNameAndCode[0].vip_type !== 1 && dataNameAndCode[0].vip_type === 2) {
        setSelected("2")
        setStart(0)
        setActivePage(0)
      } else {
        setSelected("3")
        setStart(0)
        setActivePage(0)
      }
    } else {
      setSelected("")
      setStart(0)
      setActivePage(0)
    }
  }, [messageSuccessNameAndCode, dataNameAndCode])
  useEffect(() =>{
    if(codeRegisSuccess && codeRegisSuccess !== VALUE_EMPTY){
      dispatch(getPatientCode(codeRegisSuccess))
    }
  },[codeRegisSuccess])
  const handleClickActive = (id, code) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    dispatch(getCode(code))
    swalWithBootstrapButtons
      .fire({
        title: "Bạn có muốn hủy chức năng VIP của bệnh nhân?",
        allowOutsideClick: false,
        icon: "warning",
        confirmButtonText: "Có",
        reverseButtons: true,
        cancelButtonText: "Không",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setIsChecked(id)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
  useEffect(() => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (!!isChecked) {
      swalWithBootstrapButtons.fire({
        title: "Hủy thành công!",
        allowOutsideClick: false,
        icon: "success",
        preConfirm: () => {
          dispatch(postDeactive(isChecked))
          setTimeout(() => {
            dispatch(getPatientCode(codes))
          }, 200)


        },
      });
    }
  }, [isChecked])
  useEffect(() =>{
    if(isOpenModalPopUpEdit || isOpenModalPopUpFormUser){
      setIsChecked("")
    }
  },[isOpenModalPopUpEdit,isOpenModalPopUpFormUser])
  //Export
  const dataExports = {
    patient_code: searchCardCode && Object.entries(searchCardCode).length > 0 ? searchCardCode : "",
    patient_name: searchNamePatient && Object.entries(searchNamePatient).length > 0 ? searchNamePatient : "",
    vip_type: selected && selected !== VALUE_EMPTY ? selected : ""
  }
  const handleExport = () => {
    dispatch(postExportAll(dataExports));
  };
  useEffect(() => {
    if (dataExport && dataExport.file_path) {
      window.open(
        LINK_EXPORT + dataExport.file_path,
        "_blank"
      );
    }
  }, [dataExport, dataExport.file_path]);
  //FormUser
  const openModalFormUser = () => {
    setIsOpenModalPopUpFormUser(true)
  }
  const openModalFormUserFollowID = (code) => {
    dispatch(getCode(code))
    setIsOpenModalPopUpFormUser(true)
  }
  const openModalFormUserEdit = (code) => {
    dispatch(getCode(code))
    openModalEdit()
    setIsOpenModalPopUpFormUser(true)
  }
  const closeModalFormUser = () => {
    setIsOpenModalPopUpFormUser(false)
    setIsOpenModalPopUpEdit(false)
  }
  const openModalEdit = () => {
    setIsOpenModalPopUpEdit(true);
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="tabbable-line">
          <div className="tab-content">
            <div
              className="tab-pane active fontawesome-demo"
              id="tab1"
              style={{ display: isStyleClose ? "none" : "" }}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-topline-red">
                    <div className="card-head">
                      <header></header>
                      <div className="tools">
                        <a
                          className={
                            isStyle
                              ? "t-collapse btn-color fa fa-chevron-down"
                              : "t-collapse btn-color fa fa-chevron-up"
                          }
                          onClick={handleChangeStyle}
                        ></a>
                        <a
                          className="t-close btn-color fa fa-times"
                          onClick={handleStyleClose}
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card-body"
                      style={{ display: isStyle ? "none" : "" }}
                    >
                      <div className="table-scrollable">
                        <div
                          className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer "
                          id="MainTable_wrapper"
                        >
                          <div className="row">
                            <div className="col-sm-12 col-md-0 col-lg-1">
                              <label htmlFor="">Lọc VIP</label>
                              <select className="form-control form-control-sm" style={{ padding: 0, marginTop: "0px" }} onChange={onChangeSelected} onKeyPress={handlePress} value={selected}>
                                <option value="" defaultValue>All</option>
                                <option value="0">Chưa có VIP</option>
                                <option value="1">VIP 1</option>
                                <option value="2">VIP 2</option>
                                <option value="3">VIP 3</option>
                              </select>
                            </div>
                            <div className="col-sm-12 col-md-0 col-lg-2">
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-2">
                              <div className="form">
                                <input
                                  type="text"
                                  name="maThe"
                                  onChange={onChangeInputSearchCode}
                                  value={searchCardCode}
                                  // onFocus={handleBlur}
                                  onKeyPress={searchEnterCard}
                                  required
                                />
                                <label
                                  htmlFor="name"
                                  className="label-name-input"
                                >
                                  <span className="content-label-name">
                                    Mã thẻ/Mã bệnh nhân
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-2">
                              <div className="form">
                                <input
                                  type="text"
                                  name="search"
                                  required
                                  onChange={onChangeInputSearchNamePatient}
                                  value={searchNamePatient}
                                  onKeyPress={handlePress}
                                // onFocus={handleBlur}
                                />
                                <label
                                  htmlFor="name"
                                  className="label-name-input"
                                >
                                  <span className="content-label-name">
                                    Tên bệnh nhân
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div
                              className="col-xs-6 col-sm-12 col-md-2 col-lg-1"
                              style={{ padding: "0" }}
                            >
                              <button
                                className="btn btn-loc btn-loc1"
                                onClick={() => {
                                  handleSearch();
                                }}
                                disabled={loadingExport ? true : false}
                              >
                              <i className="fas fa-search" style={{ fontSize: "16px",color:"#ffffff" }}></i> Tìm kiếm
                              </button>
                            </div>
                            <div
                              className="col-xs-6 col-sm-12 col-md-2 col-lg-2"
                              style={{ padding: "0" }}
                            >
                              <button
                                className="btn btn-primary btn-loc btn-loc2"
                                onClick={() => { openModalFormUser() }} disabled={loadingExport ? true : false}
                              >
                                <i className="fas fa-file-signature mr-1"></i>  Đăng ký thẻ
                              </button>
                            </div>
                            <div
                              className="col-xs-6 col-sm-12 col-md-2 col-lg-1"
                              style={{ padding: "0" }}
                            >
                              <button
                                className="btn btn-success btn-loc btn-loc2"
                                onClick={handleExport}
                              >
                                <i className="fas fa-file-export"></i>Export
                                {loadingExport ? (
                                  <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginLeft: "5px" }}
                                  />
                                ) : null}
                              </button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12" style={{ padding: 0 }}>
                              <div className="dataTables_scroll">
                                <div
                                  className="dataTables_scrollHead"
                                  style={{
                                    overflow: "hidden",
                                    position: "relative",
                                    border: "0px",
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    className="dataTables_scrollBody table-responsive"
                                    style={{
                                      position: "relative",
                                      // overflowY: "auto",
                                      width: "100%",
                                    }}
                                  >
                                    <table
                                      className="table  order-column full-width nowrap dataTable no-footer"
                                      style={{
                                        marginLeft: "0px",
                                        width: "100%",
                                      }}
                                    >
                                      <thead className="thead-light">
                                        <tr role="row">
                                          <th
                                            className="sorting_disabled "
                                            style={{
                                              width: "50px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            #
                                          </th>
                                          <th
                                            className="sorting_disabled "
                                            style={{
                                              width: "100px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Mã thẻ
                                          </th>
                                          <th
                                            className="sorting_disabled "
                                            style={{
                                              width: "100px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Mã bệnh nhân
                                          </th>
                                          <th
                                            className="sorting_disabled "
                                            style={{
                                              width: "100px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Họ và tên
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            style={{
                                              width: "50px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Giới tính
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            style={{
                                              width: "20px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Ngày sinh
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            style={{
                                              width: "20px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Tỉnh/Thành phố
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            style={{
                                              width: "20px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Quận/Huyện
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            style={{
                                              width: "20px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Xã/Phường
                                          </th>
                                          <th
                                            className="sorting_disabled "
                                            style={{
                                              width: "50px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Hiệu lực
                                          </th>
                                          <th
                                            className="sorting_disabled "
                                            style={{
                                              width: "50px",
                                              textAlign: "center",
                                            }}
                                            rowSpan="1"
                                            colSpan="1"
                                          >
                                            Chức năng
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="table-light">
                                        {loading ? (
                                          <tr>
                                            <td colSpan={12}>
                                              <p
                                                id="MainTable_processing"
                                                className="dataTables_processing card"
                                                style={{
                                                  textAlign: "center",
                                                  height: "50px",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  background: "#6c757d",
                                                  opacity: 0.25,
                                                  color: "white",
                                                }}
                                              >
                                                Processing...
                                              </p>
                                            </td>
                                          </tr>
                                        ) : dataPatientAll && Object.entries(dataPatientAll).length > 0 ? (
                                          dataPatientAll.map((item, index) => (
                                            <tr key={index}>
                                              <td style={{ textAlign: "center" }}>
                                                {index + 1 + start}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.tekmedi_card_number ? item.tekmedi_card_number : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.code ? item.code : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.full_name ? item.full_name.trim() : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.gender ? item.gender : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.birthday ?  moment(item.birthday.substring(0, item.birthday.indexOf("T"))).format("DD-MM-YYYY").toString() : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.province_name ? item.province_name : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.district_name ? item.district_name : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.ward_name ? item.ward_name : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {item.vip_expired_date === null && item.vip_type === 0 ? "Không có hiệu lực" : item.vip_expired_date === null && item.vip_type !== 0 ? "Vô thời hạn" : item.vip_type !== 0 && item.vip_expired_date !== null ? moment(item.vip_expired_date.substring(0, item.vip_expired_date.indexOf("T"))).format("DD-MM-YYYY").toString() : null}
                                              </td>
                                              <td style={{ textAlign: "center" }}>
                                                {dataPatientAll && Object.entries(dataPatientAll).length > 0 ? (
                                                  item.vip_expired_date === null && item.vip_type === 0 ? (
                                                    <div>
                                                      <ButtonEdit onClick={() => { openModalFormUserEdit(item.code) }} disabled={loadingExport ? true : false} />
                                                      <ButtonRegisted onClick={() => { openModalFormUserFollowID(item.code) }} disabled={loadingExport ? true : false} />
                                                    </div>
                                                  ) : (
                                                      <div>
                                                        <ButtonEdit onClick={() => { openModalFormUserEdit(item.code) }} disabled={loadingExport ? true : false} />
                                                        <ButtonActive
                                                            handleClickActive={() => { handleClickActive(item.id, item.code) }
                                                            }
                                                            defaultChecked={isChecked !== item.id} disabled={loadingExport ? true : false}
                                                          />
                                                      </div>
                                                    )
                                                )
                                                  : null}
                                              </td>
                                            </tr>
                                          ))
                                        ) : (
                                              <tr>
                                                <td colSpan={5}></td>
                                                <td colSpan={1} style={{ textAlign: "center" }}>Không tìm thấy thông tin bệnh nhân</td>
                                                <td colSpan={5}></td>
                                              </tr>
                                            )
                                        }
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Panigations length={length}
                              activePage={activePage}
                              pageRangeDisplayed={3}
                              handlePageChange={handlePageChange}
                              total={total}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpenModalPopUpFormUser && (
          <FormUser closeModalFormUser={closeModalFormUser} isOpenModalPopUpEdit={isOpenModalPopUpEdit} isOpenModalPopUpFormUser={isOpenModalPopUpFormUser} />
        )}
      </div>
    </div>
  );
}
export default React.memo(Container);
