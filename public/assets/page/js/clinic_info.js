var oTable;
var loadDoctor = function () {
    var url = APP_CONFIG.GetDoctorHasSchedule;
    oTable = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100]],
        dom: 'Bfrtip',
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        bProcessing: true,
        bServerSide: true,
        bFilter: false,
        bSort: true,
        order: [[2, "desc"]],
        bInfo: true,
        bAutoWidth: true,
        ajax:
        {
            "url": url,
            "type": "POST",
            "headers": { Authorization: getCookie('_tk') },

            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": function (d) {
                d.Is_Active = $('#modal-doctor select[name="IsActive"]').val();
                d.Name = $('#modal-doctor input[name="Name"]').val();
                d.Department_Id = $('#modal-doctor select[name="DepartmentType"]').val();
                d.Degree = $('#modal-doctor select[name="DegreeType"]').val();
                return JSON.stringify(d);
            }
        },
        columns:
            [
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "name", "bSearchable": false, "bSortable": true },
                { "data": "id", "bSearchable": false, "bSortable": true },
                { "data": "department_name", "bSearchable": false, "bSortable": true },
                { "data": "degree", "bSearchable": false, "bSortable": true },
                { "data": "degree_short", "bSearchable": false, "bSortable": true },

                {
                    "data": "is_active",
                    "bSearchable": false,
                    "bSortable": true,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (data === 1)
                            return '<span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i></span>';
                        else
                            return '';
                    }
                },

                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chuyển ca</a></br>\
                                <a class="btn btn-warning btn-sm btn--icon-text btnAddAccount" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Khám thêm</a>';
                    }
                }

            ],
        buttons: []
    });
};

var loadSecondTable = function (id, d) {
    var tbl = $('#SecondTable tbody');
    tbl.empty();

    for (var i = 0; i < d.length; i++) {
        tbl.append('<tr>\
                        <td>'+ (i + 1) + '</td>\
                        <td></td>\
                        <td><p>'+ d[i].ten + '</p>\
                            <div class="listview__attrs">\
                                <span>'+ d[i].chuyenKhoa + '</span>\
                                <span>'+ d[i].chuyenMon + '</span>\
                            </div>\
                        </td>\
                        <td>'+ d[i].gioiTinh + '</td>\
                        <td>'+ d[i].namSinh + '</td>\
                        <td><label class="custom-control custom-checkbox">\
                                <input type="checkbox" class="custom-control-input"  name="chkDoctor" data-id="'+ d[i].id + '" />\
                                <span class="custom-control-indicator">\
                                </span>\
                            </label>\
                        </td>\
                    </tr>');
    }
    $('#modal-Doctor').modal({ backdrop: 'static', keyboard: false });
};

var loadPage = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetPatientClinic, {
        Doctor_Id: getCookie('_id')

    }, getCookie('_tk'), function (d, s) {
        if (d.data != null) {
            var list = $('#PatientList');
            var r = d.data;
            list.empty();
            $('#ClinicName').html(r.name);
            $('#ClinicName').attr('data-id', r.id);

            if (r.autoStatus == "Unhold") {
                $('#btnHold').removeClass('btnUnhold').addClass('btnHold');
                $('#btnHold').empty();
                $('#btnHold').append('<i class="zmdi zmdi-pause-circle" id="HoldIcon"></i>Tắt tự động gọi bệnh nhân');

            }
            else {
                $('#btnHold').removeClass('btnHold').addClass('btnUnhold');
                $('#btnHold').empty();
                $('#btnHold').append('<i class="zmdi zmdi-play-circle" id="HoldIcon"></i> Bật tự động gọi bệnh nhân');
            }
            for (var i = 0; i < r.patient.length; i++) {
                var bd = r.patient[i].birthday.split(' ');
                if (r.patient[i].status != "FINISH") {
                    if (r.patient[i].type != "SECOND") {
                        if (r.patient[i].status == null || r.patient[i].status == '') {
                            list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="PRIMARY"  >\
                                <div>\
                                    <div>KHÁM CHỮA BỆNH</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                        }
                        else {
                            if (r.patient[i].status == "START") {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="PRIMARY" style = "background-color:rgba(42,174,77,0.4);" >\
                                <div>\
                                    <div>KHÁM CHỮA BỆNH</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            } else {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="PRIMARY" style = "background-color:rgba(34, 192, 206, 0.9);" >\
                                <div>\
                                    <div>KHÁM CHỮA BỆNH</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            }

                        }
                    }
                    else {
                        if (r.patient[i].status == null || r.patient[i].status == '') {
                            list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="SECOND" style = "background-color:rgba(255,215,0,0.4);" >\
                                <div>\
                                    <div>ĐỌC KẾT QUẢ</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                        }
                        else {
                            if (r.patient[i].status == "START") {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="SECOND" style = "background-color:rgba(42,174,77,0.4);" >\
                                <div>\
                                    <div>ĐỌC KẾT QUẢ</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            }
                            else {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="SECOND" style = "background-color:rgba(34, 192, 206, 0.9);" >\
                                <div>\
                                    <div>ĐỌC KẾT QUẢ</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            }

                        }
                    }

                }

            }
        }
    });
}; // load danh sách ca bác sĩ
var loadSecondShifts = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllSecondShift, {
        Doctor_Id: getCookie('_id')
    }, getCookie('_tk'), function (d, s) {
        if (d.data != null) {
            var list = $('#PatientList');
            var r = d.data;
            list.empty();

            for (var i = 0; i < r.length; i++) {

                list.append('<div class="user__info info" data-toggle="dropdown" onclick="registerSecondShift(this)" id ="Shift" data-shift ="' + r[i].id + '"   >\
                                <div>\
                                    <div>CA ĐỌC KẾT QUẢ TRỐNG</div>\
                                    <div>Bắt đầu: '+ r[i].start_time + '</div>\
                                </div>\
                         </div>');


            }
        }
    });
};

var refreshList = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetPatientClinic, {
        Doctor_Id: getCookie('_id')
    }, getCookie('_tk'), function (d, s) {
        if (d.data != null) {
            var list = $('#PatientList');
            var r = d.data;
            list.empty();
            for (var i = 0; i < r.patient.length; i++) {
                var bd = r.patient[i].birthday.split(' ');
                if (r.patient[i].status != "FINISH") {
                    if (r.patient[i].type != "SECOND") {
                        if (r.patient[i].status == null || r.patient[i].status == '') {
                            list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="PRIMARY"  >\
                                <div>\
                                    <div>KHÁM CHỮA BỆNH</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                        }
                        else {
                            if (r.patient[i].status == "START") {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="PRIMARY" style = "background-color:rgba(42,174,77,0.4);" >\
                                <div>\
                                    <div>KHÁM CHỮA BỆNH</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            } else {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="PRIMARY" style = "background-color:rgba(34, 192, 206, 0.9);" >\
                                <div>\
                                    <div>KHÁM CHỮA BỆNH</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            }

                        }
                    }
                    else {
                        if (r.patient[i].status == null || r.patient[i].status == '') {
                            list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="SECOND" style = "background-color:rgba(255,215,0,0.4);" >\
                                <div>\
                                    <div>ĐỌC KẾT QUẢ</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                        }
                        else {
                            if (r.patient[i].status == "START") {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="SECOND" style = "background-color:rgba(42,174,77,0.4);" >\
                                <div>\
                                    <div>ĐỌC KẾT QUẢ</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            }
                            else {
                                list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" data-type="SECOND" style = "background-color:rgba(34, 192, 206, 0.9);" >\
                                <div>\
                                    <div>ĐỌC KẾT QUẢ</div>\
                                    <div>Bắt đầu: '+ r.patient[i].start_time + '</div>\
                                    <div>STT: '+ r.patient[i].number + '</div>\
                                    <div>ID: '+ r.patient[i].id + '</div>\
                                    <div>BN: '+ r.patient[i].full_name + '</div>\
                                    <div>NS: '+ bd[0] + '</div>\
                                    <div><small>'+ r.patient[i].address + '</small></div>\
                                </div>\
                         </div>');
                            }

                        }
                    }

                }
            }
        }
       
    });
}; // load lại danh sách ca của bác sĩ

$('#btnPatientInfo').click(function () {
    loadInfo(this);
});
$('#btnListService').click(function () {
    loadService(this);
});
$('#btnListPharmacy').click(function () {
    loadPharmacy(this);
});

$('#btnResultShift').click(function () {
    loadSecondShifts();
});

function loadInfo(a){

    $('#btnPatientInfo').attr('data-id', $(a).attr('data-id'));
    $('#btnListService').attr('data-id', $(a).attr('data-id'));
    $('#btnListPharmacy').attr('data-id', $(a).attr('data-id'));
    $('#btnPatientInfo').attr('data-type', $(a).attr('data-type'));
    $('#btnListService').attr('data-type', $(a).attr('data-type'));
    $('#btnListPharmacy').attr('data-type', $(a).attr('data-type'));
    $('#btnListService').attr('data-shift', $(a).attr('data-shift'));
    $('#btnListPharmacy').attr('data-shift', $(a).attr('data-shift'));

    LoadAjaxAuth('POST', APP_CONFIG.GetPatientInfo, {
        Id: $(a).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        $('#Detail').empty();
        var r = d.result.data;
        var bd = r.birthday == null ? '' : r.birthday.split(' ')[0];
        var idDate = r.id_date == null ? '' : r.id_date.split(' ')[0];
        if ($(a).attr('data-type') == "PRIMARY") {
            $('#Detail').append(' <div class="image">\
                                <img class= "img-responsive" src = "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png" alt = "Chưa có ảnh"  />\
                                    </div >\
                                <div class="wrapper">\
                                    <div class="show-info">\
                                        <div class="image-transparent">\
                                        </div>\
                                        <div class="detail">\
                                            <div>Mã bệnh nhân: <i id="Id">'+ (r.id === null ? '' : r.id) + '</i></div>\
                                            <div>Họ Tên: <i id="FullName">'+ (r.full_name === null ? '' : r.full_name) + '</i></div>\
                                            <div>TekmediUid: <i id="TekmediUid">'+ (r.tekmedi_uid === null ? '' : r.tekmedi_uid) + '</i></div>\
                                            <div>Năm sinh: <i id="Birthday">'+ (bd[0] === null ? '' : bd) + '</i></div>\
                                            <div>Địa chỉ: <i id="Address">'+ (r.address === null ? '' : r.address) + '</i></div>\
                                            <div>Giới tính: <i id="Gender">'+ (r.gender === null ? '' : (r.gender == "1" ? "Nữ" : "Nam")) + '</i></div>\
                                            <div>Số CMND: <i id="CardId">'+ (r.card_id === null ? '' : r.card_id) + '</i></div>\
                                            <div>Nơi cấp: <i id="IdPlace">'+ (r.id_place === null ? '' : r.id_place) + '</i></div>\
                                            <div>Ngày cấp: <i id="IdDate">'+ (idDate[0] === null ? '' : idDate) + '</i></div>\
                                            <div>Số điện thoại: <i id="Phone">'+ (r.phone === null ? '' : r.phone) + '</i></div>\
                                            <div>Số bảo hiểm y tế: <i id="HeathInsuranceCode">'+ (r.heath_insurance_code === null ? '' : r.heath_insurance_code) + '</i></div>\
                                            <div>HSD bảo hiểm y tế: <i id="HeathInsuranceExpiredTime">'+ (r.heath_insurance_expired_time === null ? '' : r.heath_insurance_expired_time) + '</i></div>\
                                            <div class="row pr-2 mt-3 pb-3 btn-custom" style="float: right">\
                                                <input id="ShiftId" hidden/>\
                                                <button type="button" class="btn btn-primary btn-call mr-3" id="Start"  >Gọi bệnh nhân</button>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>');

        } else {
            $('#Detail').append(' <div class="image">\
                                <img class= "img-responsive" src = "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png" alt = "Chưa có ảnh"  />\
                                    </div >\
                                <div class="wrapper">\
                                    <div class="show-info">\
                                        <div class="image-transparent">\
                                        </div>\
                                        <div class="detail">\
                                            <div>Mã bệnh nhân: <i id="Id">'+ (r.id === null ? '' : r.id) + '</i></div>\
                                            <div>Họ Tên: <i id="FullName">'+ (r.full_name === null ? '' : r.full_name) + '</i></div>\
                                            <div>TekmediUid: <i id="TekmediUid">'+ (r.tekmedi_uid === null ? '' : r.tekmedi_uid) + '</i></div>\
                                            <div>Năm sinh: <i id="Birthday">'+ (bd[0] === null ? '' : bd) + '</i></div>\
                                            <div>Địa chỉ: <i id="Address">'+ (r.address === null ? '' : r.address) + '</i></div>\
                                            <div>Giới tính: <i id="Gender">'+ (r.gender === null ? '' : r.gender) + '</i></div>\
                                            <div>Nguyên quán: <i id="HomeTown">'+ (r.home_town === null ? '' : r.home_town) + '</i></div>\
                                            <div>Số CMND: <i id="CardId">'+ (r.card_id === null ? '' : r.card_id) + '</i></div>\
                                            <div>Nơi cấp: <i id="IdPlace">'+ (r.id_place === null ? '' : r.id_place) + '</i></div>\
                                            <div>Ngày cấp: <i id="IdDate">'+ (idDate[0] === null ? '' : idDate) + '</i></div>\
                                            <div>Số điện thoại: <i id="Phone">'+ (r.phone === null ? '' : r.phone) + '</i></div>\
                                            <div>Số bảo hiểm y tế: <i id="HeathInsuranceCode">'+ (r.heath_insurance_code === null ? '' : r.heath_insurance_code) + '</i></div>\
                                            <div>HSD bảo hiểm y tế: <i id="HeathInsuranceExpiredTime">'+ (r.heath_insurance_expired_time === null ? '' : r.heath_insurance_expired_time) + '</i></div>\
                                            <div class="row pr-2 mt-3 pb-3 btn-custom" style="float: right">\
                                                <input id="ShiftId" hidden/>\
                                                <button type="button" class="btn btn-primary btn-call mr-3" id="Start"  >Gọi bệnh nhân</button>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>');

        }
      
            $('#ShiftId').val($(a).attr('data-shift'));
           
    });
    
};

//<button type="button" class="btn btn-warning btn-changeDoctor mr-3" id="AddIndication" >Khám thêm</button>\
//<button type="button" class="btn btn-info btn-end mr-3" id="End" >Thực hiện cận lâm sàng</button>\
//<button type="button" class="btn btn-success btn-finish" id="Finish"  >Hoàn thành</button>\

function loadService(a) {
    $('#Detail').empty();
    $('#Detail').append('<div class="table-responsive ">\
                            <table class="table table-bordered table-striped table-hover" id="PatientTable">\
                                <thead class="thead-inverse">\
                                    <tr>\
                                        <th width="30">#</th>\
                                        <th width="120">Tên dịch vụ</th>\
                                        <th width="120">Mã</th>\
                                        <th width="120">Mã phòng</th>\
                                        <th width="120">Tên phòng</th>\
                                        <th width="120">Chức năng</th>\
                                    </tr>\
                                </thead>\
                                <tbody></tbody>\
                            </table>\
                        </div >');
    LoadAjaxAuth('POST', APP_CONFIG.GetAllServiceOfPatient, {
        patientId: $(a).attr('data-id'),
        shiftId: $(a).attr('data-shift')
    }, getCookie('_tk'), function (d, s) {
        var rs = d.data;
        for (var i = 0; i < rs.length; i++) {
            if (rs[i].status == "CANCEL") {
                $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].serviceName + '</td >\
                                            <td> '+ rs[i].serviceId + '</td >\
                                            <td> '+ rs[i].serviceRoomId + '</td >\
                                            <td> '+ rs[i].serviceRoomName + '</td >\
                                            <td>\
                                                <a class="btn btn-warning btn-sm btn--icon-text btnCancelService" onclick = "cancelService(this)" data-id="' + rs[i].id + '" ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Hủy dịch vụ</a>\
                                            </td>\
                                      </tr>');
            }
            else {
                if (rs[i].status == "ROLLBACK") {
                    $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].serviceName + '</td >\
                                            <td> '+ rs[i].serviceId + '</td >\
                                            <td> '+ rs[i].serviceRoomId + '</td >\
                                            <td> '+ rs[i].serviceRoomName + '</td >\
                                            <td>\
                                                <a class="btn btn-danger btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đã hủy</a>\
                                            </td>\
                                      </tr>');
                } else {
                    if (rs[i].isResult == 1) {
                        $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].serviceName + '</td >\
                                            <td> '+ rs[i].serviceId + '</td >\
                                            <td> '+ rs[i].serviceRoomId + '</td >\
                                            <td> '+ rs[i].serviceRoomName + '</td >\
                                            <td>\
                                                <span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i>Đã có kết quả</span>\
                                            </td>\
                                      </tr>');
                    }
                    else {
                        $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].serviceName + '</td >\
                                            <td> '+ rs[i].serviceId + '</td >\
                                            <td> '+ rs[i].serviceRoomId + '</td >\
                                            <td> '+ rs[i].serviceRoomName + '</td >\
                                            <td>\
                                                <span class="badge badge-warning"><i class="zmdi zmdi-check zmdi-hc-fw"></i>Chưa có kết quả</span>\
                                            </td>\
                                      </tr>');
                    }
                  
                }
               
            }
            
        }
    });
};

function loadPharmacy(a) {
    $('#Detail').empty();
    $('#Detail').append('<div class="table-responsive ">\
                            <table class="table table-bordered table-striped table-hover" id="PatientTable">\
                                <thead class="thead-inverse">\
                                    <tr>\
                                        <th width="30">#</th>\
                                        <th width="120">Mã quầy thuốc</th>\
                                        <th width="120">Tên quầy thuốc</th>\
                                        <th width="120">Chức năng</th>\
                                    </tr>\
                                </thead>\
                                <tbody></tbody>\
                            </table>\
                        </div >');

    LoadAjaxAuth('POST', APP_CONFIG.GetPharmacyOfPatient, {
        patientId: $(a).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var rs = d.data;
        for (var i = 0; i < rs.length; i++) {
            if (rs[i].status == "ROLLBACK") {
                $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].pharmacyId + '</td >\
                                            <td> '+ rs[i].pharmacyName + '</td >\
                                            <td>\
                                                <a class="btn btn-danger btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đã hủy</a>\
                                            </td>\
                                      </tr>');
            }
            else {
                if (rs[i].status == "START") {
                    $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].pharmacyId + '</td >\
                                            <td> '+ rs[i].pharmacyName + '</td >\
                                            <td>\
                                                <a class="btn btn-danger btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đã có thuốc</a>\
                                            </td>\
                                      </tr>');
                } else if (rs[i].status == "END") {
                    $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].pharmacyId + '</td >\
                                            <td> '+ rs[i].pharmacyName + '</td >\
                                            <td>\
                                                <a class="btn btn-danger btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Bệnh nhân được gọi lấy thuốc</a>\
                                            </td>\
                                      </tr>');
                }
                else {
                    $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].pharmacyId + '</td >\
                                            <td> '+ rs[i].pharmacyName + '</td >\
                                            <td>\
                                                <a class="btn btn-warning btn-sm btn--icon-text btnCancelPharmacy" onclick = "cancelPharmacy(this)" data-id="' + rs[i].id + '" ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Hủy đơn thuốc</a>\
                                            </td>\
                                      </tr>');
                }
            }
       
        }
    });
};

function loadExaminationNotResult() {
    $('#examTable tbody').empty();

    LoadAjaxAuth('POST', APP_CONFIG.GetAllExamNotYetReadResult, {
        CardNumber: $('#CardNumber').val()
    }, getCookie('_tk'), function (d, s) {
        var rs = d.data;
        for (var i = 0; i < rs.length; i++) {
            if (rs[i].hasResult == 1) { 
                $('#examTable tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].fullName + '</td >\
                                            <td> '+ rs[i].patientId + '</td >\
                                            <td> '+ rs[i].date + '</td >\
                                            <td> '+ rs[i].doctorName + '</td >\
                                            <td> '+ rs[i].examName + '</td >\
                                            <td><span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i>Có kết quả</span></td >\
                                            <td>\
                                                <a class="btn btn-warning btn-sm btn--icon-text btnSaveModal" onclick = "confirmRegisterSecondShift(this)" data-id="' + rs[i].id + '" data-patient="' + rs[i].patientId + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chọn</a>\
                                            </td>\
                                      </tr>');
            }
            else {
                $('#examTable tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].fullName + '</td >\
                                            <td> '+ rs[i].patientId + '</td >\
                                            <td> '+ rs[i].date + '</td >\
                                            <td> '+ rs[i].doctorName + '</td >\
                                            <td> '+ rs[i].examName + '</td >\
                                            <td><span class="badge badge-warning"><i class="zmdi zmdi-check zmdi-hc-fw"></i>Chưa có kết quả</span></td >\
                                            <td>\
                                                <a class="btn btn-primary btn-sm btn--icon-text btnSaveModal" onclick = "confirmRegisterSecondShift(this)" data-id="' + rs[i].id + '" data-patient="' + rs[i].patientId + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chọn</a>\
                                            </td>\
                                      </tr>');
            }
           

        }
        $('#modal-default').modal('hide');
        $('#modal-examList').modal('show');
    });
}

function registerSecondShift(a) {
    $('#secondShiftId').val($(a).attr('data-shift'));
    $('#modal-default').modal('show');
}

function confirmRegisterSecondShift(a) {
  
        LoadAjaxAuth('POST', APP_CONFIG.RegisterSecondShift, {
            SecondShiftId: $('#secondShiftId').val(),
            PatientId: $(a).attr('data-patient'),
            ExaminationRegisterId: $(a).attr('data-id')
        }, getCookie('_tk'), function (d, s) {

                var r = d.data;

                if (d.data === true) {
                    Swal.fire({
                        type: 'success',
                        title: 'Đăng ký thành công',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: d.result.errors,
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                }

            });

}

function cancelService(a) {

    let RequestData = {
            "Id": $(a).attr('data-id')
    };

    Swal.fire({
        title: 'Xác nhận',
        text: "Bạn chắc chắn muốn hủy dịch vụ này",
        type: 'warning',
        background: '#020303',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
            LoadAjaxAuth('POST', APP_CONFIG.CancelService, {
                RequestData
            }, getCookie('_tk'), function (d, s) {

                if (d.result.data === true) {
                    Swal.fire({
                        type: 'success',
                        title: 'Hủy thành công',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                    loadService($('#btnListService'));
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: d.result.errors,
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                }

            });
        }

    });
   
}

function cancelPharmacy(a) {

    let RequestData = {
        "Id": $(a).attr('data-id')
    };

    Swal.fire({
        title: 'Xác nhận',
        text: "Bạn chắc chắn muốn hủy đơn thuốc này",
        type: 'warning',
        background: '#020303',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
            LoadAjaxAuth('POST', APP_CONFIG.CancelPharmacy, {
                RequestData
            }, getCookie('_tk'), function (d, s) {

                if (d.result.data === true) {
                    Swal.fire({
                        type: 'success',
                        title: 'Hủy thành công',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                    loadService($('#btnListService'));
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: d.result.errors,
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                }

            });
        }

    });

}

var loadSel = function () {
    LoadAjaxAuth('POST',
        APP_CONFIG.GetSel,
        {},
        getCookie('_tk'), function (d, s) {
            var sel = $('#modal-doctor select[name="DepartmentType"]');
            sel.html('');
            sel.append('<option value=""> Chuyên khoa</option>');
            for (var i = 0; i < d.length; i++) {
                var item = d[i];
                sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
            }
        });
};

var loadSelectDegree = function () {
    LoadAjaxAuth('POST',
        APP_CONFIG.GetSelectAcademicDegree,
        {},
        getCookie('_tk'),
        function (d, s) {
            var sel = $('#modal-doctor select[name="DegreeType"]');
            sel.html('');
            sel.append('<option value="" selected>Học hàm</option>');
            for (var i = 0; i < d.length; i++) {
                var item = d[i];
                sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
            }
        });
};

$(document).on('click', '#Start', function () {
    LoadAjaxAuth('POST', APP_CONFIG.Fcm, {
        Id: $('#ShiftId').val(),
        DoctorId: getCookie('_id'),
        Status: 0
    }, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#Detail').empty();
            refreshList();
        }
    });
});

//$(document).on('click', '#Finish', function () {
//    LoadAjaxAuth('POST', APP_CONFIG.UpdateStatus, {
//        ShiftId: $('#ShiftId').val(),
//        Status: "2"
//    }, getCookie('_tk'), function (d, s) {
//        if (d.hasError === true) {
//            setAlert(d.errors, 'Lỗi: ', '');
//        } else {
//            $('#Detail').empty();
//            refreshList();
//        }

//    });
//});

//$(document).on('click', '#End', function () {
//    LoadAjaxAuth('POST', APP_CONFIG.UpdateStatus, {
//        ShiftId: $('#ShiftId').val(),
//        Status: "1"
//    }, getCookie('_tk'), function (d, s) {
//        if (d.hasError === true) {
//            setAlert(d.errors, 'Lỗi: ', '');
//        } else {
//            $('#Detail').empty();
//            refreshList();
//        }
       
//    });
//});

$(document).on('click', '#btnRefresh', function () {
    refreshList();
});

//$(document).on('click', '#AddIndication', function () {
//    loadDoctor();
//    oTable.draw();
//    loadSel();
//    loadSelectDegree();
//    $('#modal-doctor').modal('show');
//});

$(document).on('click', '.btnHold', function () {
    LoadAjaxAuth('POST', APP_CONFIG.Fcm, {
        Id: $('#ClinicName').attr('data-id'),
        DoctorId: getCookie('_id'),
        Status: 1
    }, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#btnHold').removeClass('btnHold').addClass('btnUnhold');
            $('#btnHold').empty();
            $('#btnHold').append('<i class="zmdi zmdi-play-circle" id="HoldIcon"></i> Bật tự động gọi bệnh nhân');
            //$('#HoldIcon').removeClass('zmdi-pause-circle').addClass('zmdi-play-circle');
        }

    });
});
$(document).on('click', '.btnUnhold', function () {
    LoadAjaxAuth('POST', APP_CONFIG.Fcm, {
        Id: $('#ClinicName').attr('data-id'),
        Status: 2,
        DoctorId: getCookie('_id'),
    }, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#btnHold').removeClass('btnUnhold').addClass('btnHold');
            $('#btnHold').empty();
            $('#btnHold').append('<i class="zmdi zmdi-pause-circle" id="HoldIcon"></i>Tắt tự động gọi bệnh nhân');
            //$('#HoldIcon').removeClass('zmdi-play-circle').addClass('zmdi-pause-circle');
        }

    });
});

$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="Code"]').prop('disabled', true);
    LoadAjaxAuth('POST', APP_CONFIG.GetById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.result.data;
        $('#modal-default input[name="Id"]').val(r.id);
        $('#modal-default input[name="Code"]').val(r.code);
        $('#modal-default input[name="Name"]').val(r.name);
        $('#modal-default select[name="ExaminationTypeId"]').val(r.examination_Type_Id).trigger('change');
        $('#modal-default select[name="RoomGroupId"]').val(r.room_Group_Id).trigger('change');
        $('#modal-default input[name="IsActive"]').prop('checked', r.is_Active);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
});


$(document).ready(function () {
    loadPage();
    setInterval(refreshList,120000)
    $('.btnFind').click(function () {
        loadExaminationNotResult();
    });

    $('.btnDoctorFilter').click(function () {
        oTable.draw();
    });

});