import React from 'react'

export default function Header() {
    return (
          <div className="page-header navbar navbar-fixed-top">
            <div className="page-header-inner ">
              <div className="page-logo">
              </div>
              <ul className="nav navbar-nav navbar-left in">
                <li>
                  <a className="menu-toggler sidebar-toggler">
                    <i className="icon-menu"></i>
                  </a>
                </li>
              </ul>
              {/* <form className="search-form-opened" action="#" method="GET">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    // name="query"
                    autoComplete="off"
                    // _vkenabled="true"
                  />
                  <span className="input-group-btn">
                    <a className="btn submit">
                      <i className="icon-magnifier"></i>
                    </a>
                  </span>
                </div>
              </form> */}
              {/* <a
                className="menu-toggler responsive-toggler"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span></span>
              </a> */}
              <div className="top-menu">
                <ul className="nav navbar-nav pull-right">
                  <li className="dropdown dropdown-user">
                    <a
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      data-hover="dropdown"
                      data-close-others="true"
                    >
                      <span
                        className="username username-hide-on-mobile"
                        // id="full_name"
                      >
                        {/* Phạm Tuân */}
                      </span>
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-default">
                      <li>
                        <a href="/tek.btc/SysUser/UserProfile">
                          <i className="icon-user"></i> Hồ sơ
                        </a>
                      </li>
                      <li>
                        <a href="/tek.btc">
                          <i className="icon-logout"></i> Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-custom"></div>
          </div>
      );
}
