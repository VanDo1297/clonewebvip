import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Container.css";
import ModalPopUp from "../../components/ModalPopUp/ModalPopUp";
import {
    getCode,
    getLocation,
} from "../../actions/webVIPSearchAtion";
import {getPatient} from '../../actions/refactor/index';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormUser from "../../components/ModalPopUp/FormUser";
import moment from "moment";
import ButtonActive from "../../components/ButtonActive";
import ButtonEdit from "../../components/ButtonEdit";
import { LINK_EXPORT, SUCCESS_CODE, VALUE_EMPTY } from "../../constants/constantsVariable";
import Panigations from "../../components/Panigations";
import { postDeactive, setMessageSuccessDeActive } from "../../actions/webVIPDeactiveAction";
import ButtonRegisted from "../../components/ButtonRegisted";
import { postExportAll } from "../../actions/webVIPExportAction";

const ItemPerPages =  10;

function Container() {

    // connect with store
    const { dataPatient, loading , total} = useSelector(
        (state) => state.reducer
    );
    const { codes } = useSelector(
        (state) => state.webVIPReducer
    );
    const { dataExport, loadingExport } = useSelector(
        (state) => state.webVIPExportReducer
    );
    const dispatch = useDispatch();

    // Global state
    const [isCollapse, setCollapse] = useState(false);
    const [isCloseCard, setCloseCard] = useState(false);

    // Global effect
    useEffect(() => {
        dispatch(getLocation())
        fetchData({});
    }, [])

    // Global func
    const fetchData=(criteria)=>{
        const state = {
            name: criteria.name || searchText.name,
            vip: criteria.vip || selectedVip, 
            code: criteria.code || searchText.code,
            start: criteria.start || 0
        }
        dispatch(getPatient(state))
    }

    const handleChangeCollapse = () => {
        setCollapse(!isCollapse);
    };

    const handleCloseCard = () => {
        setCloseCard(true)
    };

    const handlePress =(e)=>{
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    const handleSearch =()=>{
       fetchData({start: 0});
    }

    const handleExport = () => {
        const dataExports = {
            patient_code: searchText.code ? searchText.code : "",
            patient_name: searchText.name ? searchText.name : "",
            vip_type: selectedVip && selectedVip !== VALUE_EMPTY ? selectedVip : ""
        }
        dispatch(postExportAll(dataExports));
    };

    useEffect(() => {
        if (dataExport && dataExport.file_path) {
          window.open(
            LINK_EXPORT + dataExport.file_path,
            "_blank"
          );
        }
      }, [dataExport]);

    // Pagination
    const [activePage, setActivePage]= useState(0);
    const handlePageChange =(pageNumber)=>{
        const selectedPage = pageNumber.selected;
        setActivePage(selectedPage);
        fetchData({
            start: selectedPage * ItemPerPages
        });
    }

    //#region Filter by VIP
    const [selectedVip, setSelectedVip] = useState('')
    const onChangeVip =(e)=>{
        setSelectedVip(e.target.value)
    }
    //#endregion

    //#region  Search Text
    const [searchText, setSearchText]= useState({})
    const onChangeSearchText =(e)=>{
        setSearchText({
            ...searchText,
            [e.target.name] : e.target.value
        })
    }
    //#endregion

    //#region Switch
    const [isChecked, setIsChecked] = useState('')

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
                dispatch(getPatient({code: codes}))
            },
            });
        }
    }, [isChecked])

      //#endregion


    return (
        <div className={`card card-topline-red ${isCloseCard ? 'hidden': ''}`}>

            {/* Card header: Show red line and collapse controls */}
            <div className="card-head">
                <div className="tools">
                    <p onClick={handleChangeCollapse} className={`t-collapse pointer btn-color mb-0 fa ${isCollapse ? 'fa-chevron-down' :'fa-chevron-up' }`} />
                    <p onClick={handleCloseCard} className="t-close pointer btn-color mb-0 fa fa-times"/>
                </div>
            </div>

             {/* Card body: Show main controls :  Filter, Create, Export: TODO */}
            <div className="card-body"
                 style={{ display: isCollapse ? "none" : "" }}>
                
                <div className="controls">
                    <div className="vip-control">
                        <label htmlFor="">Lọc VIP</label>
                        <select className="form-control form-control-sm" 
                                style={{ padding: 0, marginTop: "0px" }} 
                                onChange={onChangeVip} 
                                onKeyPress={handlePress} 
                                value={selectedVip}
                        >
                            <option value="" defaultValue>All</option>
                            <option value="0">Chưa có VIP</option>
                            <option value="1">VIP 1</option>
                            <option value="2">VIP 2</option>
                            <option value="3">VIP 3</option>
                        </select>
                    </div>

                    <div className="search-text">
                        <div className="search-item p-relative form">
                            <input
                                type="text"
                                name="code"
                                onChange={onChangeSearchText}
                                value={searchText.code}
                                onKeyPress={handlePress}
                                required
                            />
                            <label  htmlFor="name"  className="label-name-input">
                                <span className="content-label-name">
                                    Mã thẻ/Mã bệnh nhân
                                </span>
                            </label>
                        </div>
                        <div className="search-item p-relative form">
                            <input
                                type="text"
                                name="name"
                                onChange={onChangeSearchText}
                                value={searchText.name}
                                onKeyPress={handlePress}
                                required
                            />
                            <label  htmlFor="name"  className="label-name-input">
                                <span className="content-label-name">
                                    Tên bệnh nhân
                                </span>
                            </label>
                        </div>
                        <button
                            className="btn-search btn-base"
                            onClick={handleSearch}
                            disabled={loadingExport ? true : false}
                            >
                                <i className="fas fa-search" style={{ fontSize: "16px",color:"#ffffff" }}></i> Tìm kiếm
                        </button>

                        <button
                            className="btn-create btn-primary btn-base"
                            disabled={loadingExport ? true : false}
                            >
                                <i className="fas fa-file-signature mr-1"></i>  Đăng ký thẻ
                        </button>
                    </div>

                    <button className="btn btn-success btn-loc btn-loc2" onClick={handleExport}>
                        <i className="fas fa-file-export"></i>Export
                        {loadingExport ? (
                            <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginLeft: "5px" }}
                            />
                        ) : null}
                    </button>
                    
                </div>

                <div className="dataTables_scroll">
                    <div className="dataTables_scrollHead"
                        style={{
                        overflow: "hidden",
                        position: "relative",
                        border: "0px",
                        width: "100%",
                        }}
                    >
                        <div className="dataTables_scrollBody table-responsive p-relative w-100">
                            <table className="table  order-column full-width nowrap dataTable no-footer ml-0 w-100">
                                <thead className="thead-light">
                                <tr role="row">
                                    <th className="sorting_disabled"
                                        style={{
                                            width: "5%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        #
                                    </th>
                                    <th  className="sorting_disabled"
                                        style={{
                                            width: "10%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Mã thẻ
                                    </th>
                                    <th className="sorting_disabled "
                                        style={{
                                            width: "10%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Mã bệnh nhân
                                    </th>
                                    <th className="sorting_disabled "
                                        style={{
                                            width: "10%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Họ và tên
                                    </th>
                                    <th className="sorting_disabled"
                                        style={{
                                            width: "5%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Giới tính
                                    </th>
                                    <th className="sorting_disabled"
                                        style={{
                                            width: "15%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Ngày sinh
                                    </th>
                                    <th className="sorting_disabled"
                                        style={{
                                            width: "10%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Tỉnh/Thành phố
                                    </th>
                                    <th className="sorting_disabled"
                                        style={{
                                            width: "10%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Quận/Huyện
                                    </th>
                                    <th className="sorting_disabled"
                                        style={{
                                            width: "10%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Xã/Phường
                                    </th>
                                    <th className="sorting_disabled "
                                        style={{
                                            width: "7%",
                                            textAlign: "center",
                                        }}
                                        rowSpan="1"
                                        colSpan="1"
                                    >
                                        Hiệu lực
                                    </th>
                                    <th className="sorting_disabled "
                                        style={{
                                            width: "8%",
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
                            ) : dataPatient && Object.entries(dataPatient).length > 0 ? (
                                dataPatient.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: "center" }}>
                                    {index + 1 } {/* adding start */}
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
                                    {dataPatient && Object.entries(dataPatient).length > 0 ? (
                                        item.vip_expired_date === null && item.vip_type === 0 ? (
                                        <div>
                                            <ButtonEdit disabled={loadingExport ? true : false} />
                                            <ButtonRegisted  disabled={loadingExport ? true : false} />
                                        </div>
                                        ) : (
                                            <div>
                                            <ButtonEdit  disabled={loadingExport ? true : false} />
                                            <ButtonActive
                                                handleClickActive={() => { handleClickActive(item.id, item.code) }}
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

                <Panigations 
                    length={ItemPerPages}
                    activePage={activePage}
                    pageRangeDisplayed={3}
                    handlePageChange={handlePageChange}
                    total={total}
                />
            </div>
        </div>
    );
}
export default React.memo(Container);
