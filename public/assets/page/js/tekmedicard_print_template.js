
function createRechargeTemplate(data) {

    return `<body>
               <div style="color:black; width:80mm; padding:0px; margin:auto">
        <div>
            <center >
            <div>
                <div class="logo"><img style="height: 60px; width: 60px;float: left;" lt=""src="../../img/logo-choray.png" >
                    <div class="header" style="margin-left: 25%;">
                        <h4 style="text-align: left;"><b>CHO RAY HOSPITAL</b></h6>
                        <h4 style="margin-top: -15px;text-align: left;"><b>BỆNH VIỆN CHỢ RẪY</b></h5>
                    </div>
                </div>
            </div>
            
                <h3 class="mt-1 title" style="margin-top: 10%;"><b>BIÊN NHẬN NẠP TIỀN</b></h3>
                <p class="date"style="font-size:12px">${data.date}</p>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <span style="font-size: 0.5rem;">-----------------------------------------------</span>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <table>
                    <tr>
                        <div id="info"></div>
                        <input id="barcodeValue" style="display: none;" value="001583687423" />
                    </tr>
                </table>
            </center>
        </div>
        <div class="row ml-1 mt-1">
            <table style="table-layout: auto !important;">
                <tr>
                    <td style="width: 45%;">
                        <span style="font-size: 1rem;">Nhân viên:</span>
                    </td>
                    <td style="width: 100%;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.employeeName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Mã số BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientCode}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Tên BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Giới tính:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.gender}</span>
                        <span style="font-size: 1rem; margin-left: 10px;">Tuổi:</span>
                        <span style="font-size: 1rem; margin-left: 10px; font-weight: bolder;">${data.age}</span>
                    </td>
                </tr>
            </table>
            <div>
                <p class="shift-title">Số tiền:</p>
                <center><p class="large-content" style="font-size: 35px;font-weight: 600; margin-top:-15px">${data.money}<span style="font-size: 12px;">&nbsp;&nbsp;(VNĐ)</span></p></center>
            </div>
            <p class="footer" style="font-size: 10px; margin-top:-20px">Bệnh nhân vui lòng giữ phiếu cho đến khi kết thúc khám tại bệnh viện</p>
            <center><p style="margin-top:-10px">-----------------------------------------------</p></center>
        </div>
        
        <script src="js/js-barcode.js"></script>
        <script src="js/print.js"></script>
    </body>`
}

function createReturnTemplate(data) {

    return `<body>
    <div style="color:black; width:80mm; padding:0px; margin:auto">
        <div>
            <center >
            <div>
                <div class="logo"><img style="height: 60px; width: 60px;float: left;" lt=""src="../../img/logo-choray.png" >
                    <div class="header" style="margin-left: 25%;">
                        <h4 style="text-align: left;"><b>CHO RAY HOSPITAL</b></h6>
                        <h4 style="margin-top: -15px;text-align: left;"><b>BỆNH VIỆN CHỢ RẪY</b></h5>
                    </div>
                </div>
            </div>
            
                <h3 class="mt-1 title" style="margin-top: 10%;"><b>BIÊN NHẬN TRẢ THẺ</b></h3>
                <p class="date"style="font-size:12px">${data.date}</p>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <span style="font-size: 0.5rem;">-----------------------------------------------</span>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <table>
                    <tr>
                        <div id="info"></div>
                        <input id="barcodeValue" style="display: none;" value="001583687423" />
                    </tr>
                </table>
            </center>
        </div>
        <div class="row ml-1 mt-1">
            <table style="table-layout: auto !important;">
                <tr>
                    <td style="width: 45%;">
                        <span style="font-size: 1rem;">Nhân viên:</span>
                    </td>
                    <td style="width: 100%;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.employeeName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Mã số BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientCode}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Tên BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Giới tính:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.gender}</span>
                        <span style="font-size: 1rem; margin-left: 10px;">Tuổi:</span>
                        <span style="font-size: 1rem; margin-left: 10px; font-weight: bolder;">${data.age}</span>
                    </td>
                </tr>
            </table>
            <div>
                <p class="shift-title">Số tiền hoàn trả bệnh nhân:</p>
                <center><p class="large-content" style="font-size: 35px; font-weight: 600;margin-top:-15px">${data.money}<span style="font-size: 12px;">&nbsp;&nbsp;(VNĐ)</span></p></center>
            </div>
            <p class="footer" style="font-size: 10px;margin-top:-20px">Bệnh nhân vui lòng giữ phiếu cho đến khi kết thúc khám tại bệnh viện</p>
            <center><p style="margin-top:-10px">-----------------------------------------------</p></center>
        </div>
        
        <script src="js/js-barcode.js"></script>
        <script src="js/print.js"></script>
</body>`
}

function createLostTemplate(data) {

    return `<body>
    <div style="color:black; width:80mm; padding:0px; margin:auto">
        <div>
            <center >
            <div>
                <div class="logo"><img style="height: 60px; width: 60px;float: left;" lt=""src="../../img/logo-choray.png" >
                    <div class="header" style="margin-left: 25%;">
                        <h4 style="text-align: left;"><b>CHO RAY HOSPITAL</b></h6>
                        <h4 style="margin-top: -15px;text-align: left;"><b>BỆNH VIỆN CHỢ RẪY</b></h5>
                    </div>
                </div>
            </div>
            
                <h3 class="mt-1 title" style="margin-top: 10%;"><b>BIÊN NHẬN TRẢ THẺ</b></h3>
                <p class="date"style="font-size:12px">${data.date}</p>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <span style="font-size: 0.5rem;">-----------------------------------------------</span>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <table>
                    <tr>
                        <div id="info"></div>
                        <input id="barcodeValue" style="display: none;" value="001583687423" />
                    </tr>
                </table>
            </center>
        </div>
        <div class="row ml-1 mt-1">
            <table style="table-layout: auto !important;">
                <tr>
                    <td style="width: 45%;">
                        <span style="font-size: 1rem;">Nhân viên:</span>
                    </td>
                    <td style="width: 100%;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.employeeName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Mã số BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientCode}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Tên BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Giới tính:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.gender}</span>
                        <span style="font-size: 1rem; margin-left: 10px;">Tuổi:</span>
                        <span style="font-size: 1rem; margin-left: 10px; font-weight: bolder;">${data.age}</span>
                    </td>
                </tr>
            </table>
            <div>
                <p class="shift-title">Số tiền hoàn trả bệnh nhân:</p>
                <center><p class="large-content" style="font-size: 35px; font-weight: 600;margin-top:-15px">${data.money}<span style="font-size: 12px;">&nbsp;&nbsp;(VNĐ)</span></p></center>
            </div>
            <p class="footer" style="font-size: 10px;margin-top:-20px">Bệnh nhân vui lòng giữ phiếu cho đến khi kết thúc khám tại bệnh viện</p>
            <center><p style="margin-top:-10px">-----------------------------------------------</p></center>
        </div>
        
        <script src="js/js-barcode.js"></script>
        <script src="js/print.js"></script>
</body>`
}

function createLostTemplateRenew(data) {

    return `<body>
    <div style="color:black; width:80mm; padding:0px; margin:auto">
        <div>
            <center >
            <div>
                <div class="logo"><img style="height: 60px; width: 60px;float: left;" lt=""src="../../img/logo-choray.png" >
                    <div class="header" style="margin-left: 25%;">
                        <h4 style="text-align: left;"><b>CHO RAY HOSPITAL</b></h6>
                        <h4 style="margin-top: -15px;text-align: left;"><b>BỆNH VIỆN CHỢ RẪY</b></h5>
                    </div>
                </div>
            </div>
            
                <h3 class="mt-1 title" style="margin-top: 10%;"><b>BIÊN NHẬN PHÍ PHÁT THẺ MỚI</b></h3>
                <p class="date"style="font-size:12px">${data.date}</p>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <span style="font-size: 0.5rem;">-----------------------------------------------</span>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <table>
                    <tr>
                        <div id="info"></div>
                        <input id="barcodeValue" style="display: none;" value="001583687423" />
                    </tr>
                </table>
            </center>
        </div>
        <div class="row ml-1 mt-1">
            <table style="table-layout: auto !important;">
                <tr>
                    <td style="width: 45%;">
                        <span style="font-size: 1rem;">Nhân viên:</span>
                    </td>
                    <td style="width: 100%;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.employeeName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Mã số BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientCode}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Tên BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Giới tính:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.gender}</span>
                        <span style="font-size: 1rem; margin-left: 10px;">Tuổi:</span>
                        <span style="font-size: 1rem; margin-left: 10px; font-weight: bolder;">${data.age}</span>
                    </td>
                </tr>
            </table>
            <div>
                <p class="shift-title">Số tiền hoàn trả bệnh nhân:</p>
                <center><p class="large-content" style="font-size: 35px;font-weight: 600; margin-top:-15px">${data.money}<span style="font-size: 12px;"> &nbsp;&nbsp;(VNĐ)</span></p></center>
            </div>
            <p class="footer" style="font-size: 10px;margin-top:-20px">Bệnh nhân vui lòng giữ phiếu cho đến khi kết thúc khám tại bệnh viện</p>
            <center><p style="margin-top:-10px">-----------------------------------------------</p></center>
        </div>
        <!-- <div style="margin-top: 20px;">
            <div class="large-content-box">
               <center> <span style="padding: 5px; border: 3px solid; text-transform: uppercase;text-align: center;">Ưu tiên</span></center>
            </div>
        </div> -->
        <script src="js/js-barcode.js"></script>
        <script src="js/print.js"></script>
</body>`
}

function createWithdrawTemplate(data) {

    return `<body>
               <div style="color:black; width:80mm; padding:0px; margin:auto">
        <div>
            <center >
            <div>
                <div class="logo"><img style="height: 60px; width: 60px;float: left;" lt=""src="../../img/logo-choray.png" >
                    <div class="header" style="margin-left: 25%;">
                        <h4 style="text-align: left;"><b>CHO RAY HOSPITAL</b></h6>
                        <h4 style="margin-top: -15px;text-align: left;"><b>BỆNH VIỆN CHỢ RẪY</b></h5>
                    </div>
                </div>
            </div>
            
                <h3 class="mt-1 title" style="margin-top: 10%;"><b>BIÊN NHẬN RÚT TIỀN</b></h3>
                <p class="date"style="font-size:12px">${data.date}</p>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <span style="font-size: 0.5rem;">-----------------------------------------------</span>
            </center>
        </div>
        <div style="margin-top: 30px;">
            <center style="margin-top:-25px">
                <table>
                    <tr>
                        <div id="info"></div>
                        <input id="barcodeValue" style="display: none;" value="001583687423" />
                    </tr>
                </table>
            </center>
        </div>
        <div class="row ml-1 mt-1">
            <table style="table-layout: auto !important;">
                <tr>
                    <td style="width: 45%;">
                        <span style="font-size: 1rem;">Nhân viên:</span>
                    </td>
                    <td style="width: 100%;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.employeeName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Mã số BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientCode}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Tên BN:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.patientName}</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: auto;">
                        <span style="font-size: 1rem;">Giới tính:</span>
                    </td>
                    <td style="width: auto;">
                        <span style="font-size: 1rem; font-weight: bolder;">${data.gender}</span>
                        <span style="font-size: 1rem; margin-left: 10px;">Tuổi:</span>
                        <span style="font-size: 1rem; margin-left: 10px; font-weight: bolder;">${data.age}</span>
                    </td>
                </tr>
            </table>
            <div>
                <p class="shift-title">Số tiền:</p>
                <center><p class="large-content" style="font-size: 35px;font-weight: 600; margin-top:-15px">${data.money}<span style="font-size: 12px;">&nbsp;&nbsp;(VNĐ)</span></p></center>
            </div>
            <p class="footer" style="font-size: 10px; margin-top:-20px">Bệnh nhân vui lòng giữ phiếu cho đến khi kết thúc khám tại bệnh viện</p>
            <center><p style="margin-top:-10px">-----------------------------------------------</p></center>
        </div>
        
        <script src="js/js-barcode.js"></script>
        <script src="js/print.js"></script>
    </body>`
}