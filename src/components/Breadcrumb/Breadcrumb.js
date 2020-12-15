import React from 'react';
import './Breadcrumb.css';
function Breadcrumb() {
    return (
        <div className="page-bar">
            <div className="page-title-breadcrumb">
                <ol className="breadcrumb page-breadcrumb pull-left">
                    <li>
                        <i className="fa fa-home"></i>
                        <a className="parent-item" href="index.html">Trang chủ</a>
                        <i className="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a className="parent-item">Thẻ</a>
                        <i className="fa fa-angle-right"></i>
                    </li>
                    <li className="active" style={{cursor:"pointer",fontSize:"14px",color:"#888",fontWeight:500}}>
                      Quản lý thẻ VIP
                    </li>
                </ol>
            </div>
        </div>
    )
}
export default React.memo(Breadcrumb)