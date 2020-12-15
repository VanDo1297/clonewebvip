
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
        Doctor_Id: "0006"//To Do: (Phu Nguyen) $.cookie('_id').val()  
    }, getCookie('_tk'), function (d, s) {
     
        var list = $('#PatientList');
        var r = d.data;
        list.empty();
        $('#ClinicName').html(r.name);
        $('#ClinicName').attr('data-id', r.id);

        for (var i = 0; i < r.patient.length; i++) {
            var bd = r.patient[i].birthday.split(' ');
            if (r.patient[i].status != "FINISH") {
                if (r.patient[i].type != "SECOND") {
                    if (r.patient[i].status == null || r.patient[i].status == '') {
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '"  >\
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
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" style = "background-color:rgba(42,174,77,0.4);" >\
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
                else {
                    if (r.patient[i].status == null || r.patient[i].status == '') {
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" style = "background-color:rgba(255,215,0,0.4);" >\
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
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" style = "background-color:rgba(42,174,77,0.4);" >\
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
    });
};
var loadSecondShifts = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllSecondShift, {
        Doctor_Id: "0006"//To Do: (Phu Nguyen) $.cookie('_id').val()  
    }, getCookie('_tk'), function (d, s) {

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
    });
};


var refreshList = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetPatientClinic, {
        Doctor_Id: "0006"//To Do: (Phu Nguyen) $.cookie('_id').val()
    }, getCookie('_tk'), function (d, s) {

        var list = $('#PatientList');
        var r = d.data;
        list.empty();
        for (var i = 0; i < r.patient.length; i++) {
            var bd = r.patient[i].birthday.split(' ');
            if (r.patient[i].status != "FINISH") {
                if (r.patient[i].type != "SECOND") {
                    if (r.patient[i].status == null || r.patient[i].status == '') {
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" >\
                                <div>\
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
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" style = "background-color:rgba(42,174,77,0.4);" >\
                                <div>\
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
                else {
                    if (r.patient[i].status == null || r.patient[i].status == '') {
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '" data-id="' + r.patient[i].id + '" style = "background-color:rgba(255,215,0,0.4);" >\
                                <div>\
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
                        list.append('<div class="user__info info" data-toggle="dropdown" onclick="loadInfo(this)" id ="Patient" data-shift ="' + r.patient[i].shift_id + '"  data-id="' + r.patient[i].id + '" style = "background-color:rgba(42,174,77,0.4);" >\
                                <div>\
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
    });
};

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

function loadInfo(a) {

    $('#btnPatientInfo').attr('data-id', $(a).attr('data-id'));
    $('#btnListService').attr('data-id', $(a).attr('data-id'));
    $('#btnListPharmacy').attr('data-id', $(a).attr('data-id'));

    LoadAjaxAuth('POST', APP_CONFIG.GetPatientInfo, {
        Id: $(a).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        $('#Detail').empty();
        var r = d.result.data;
        var bd = r.birthday.split(' ');
        var idDate = r.id_date.split(' ');
        $('#Detail').append(' <div class="image">\
                                <img class= "img-responsive" src = "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png" alt = "Chưa có ảnh" runat = "server" />\
                                    </div >\
                                <div class="wrapper">\
                                    <div class="show-info">\
                                        <div class="image-transparent">\
                                        </div>\
                                        <div class="detail">\
                                            <div>Mã bệnh nhân: <i id="Id">'+ (r.id === null ? '' : r.id) + '</i></div>\
                                            <div>Họ Tên: <i id="FullName">'+ (r.full_name === null ? '' : r.full_name) + '</i></div>\
                                            <div>TekmediUid: <i id="TekmediUid">'+ (r.tekmedi_uid === null ? '' : r.tekmedi_uid) + '</i></div>\
                                            <div>Năm sinh: <i id="Birthday">'+ (bd[0] === null ? '' : bd[0]) + '</i></div>\
                                            <div>Địa chỉ: <i id="Address">'+ (r.address === null ? '' : r.address) + '</i></div>\
                                            <div>Giới tính: <i id="Gender">'+ (r.gender === null ? '' : r.gender) +'</i></div>\
                                            <div>Nguyên quán: <i id="HomeTown">'+ (r.home_town === null ? '' : r.home_town) +'</i></div>\
                                            <div>Số CMND: <i id="CardId">'+ (r.card_id === null ? '' : r.card_id) + '</i></div>\
                                            <div>Nơi cấp: <i id="IdPlace">'+ (r.id_place === null ? '' : r.id_place) +'</i></div>\
                                            <div>Ngày cấp: <i id="IdDate">'+ (idDate[0] === null ? '' : idDate[0]) + '</i></div>\
                                            <div>Số điện thoại: <i id="Phone">'+ (r.phone === null ? '' : r.phone) + '</i></div>\
                                            <div>Số bảo hiểm y tế: <i id="HeathInsuranceCode">'+ (r.heath_insurance_code === null ? '' : r.heath_insurance_code) + '</i></div>\
                                            <div>HSD bảo hiểm y tế: <i id="HeathInsuranceExpiredTime">'+ (r.heath_insurance_expired_time === null ? '' : r.heath_insurance_expired_time) +'</i></div>\
                                            <div class="row pr-2 mt-3 pb-3 btn-custom" style="float: right">\
                                                <input id="ShiftId" hidden/>\
                                                <button type="button" class="btn btn-primary btn-call mr-3" id="Start"  >Gọi bệnh nhân</button>\
                                                <button type="button" class="btn btn-warning btn-changeDoctor mr-3"  id="changeDoctor" >Khám thêm</button>\
                                                <button type="button" class="btn btn-success btn-finish" id="Finish"  >Hoàn thành</button>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>');
        
            $('#ShiftId').val($(a).attr('data-shift'));
           
         });
    
};

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
        patientId: $(a).attr('data-id')
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
                    $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].serviceName + '</td >\
                                            <td> '+ rs[i].serviceId + '</td >\
                                            <td> '+ rs[i].serviceRoomId + '</td >\
                                            <td> '+ rs[i].serviceRoomName + '</td >\
                                            <td>\
                                            </td>\
                                      </tr>');
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
            $('#Detail tbody').append('<tr>\
                                            <td>'+ (i + 1) + '</td>\
                                            <td> '+ rs[i].pharmacyId + '</td >\
                                            <td> '+ rs[i].pharmacyName + '</td >\
                                            <td>\
                                                <a class="btn btn-warning btn-sm btn--icon-text btnCancelPharmacy" data-id="' + rs[i].id + '" ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Hủy đơn thuốc</a>\
                                            </td>\
                                      </tr>');
        }
    });
};

function registerSecondShift(a) {
    $('#modal-default #id').val($(a).attr('data-shift'));
    $('#modal-default').modal('show');
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


$(document).on('click', '#Start', function () {
    LoadAjaxAuth('POST', APP_CONFIG.UpdateStatus, {
        ShiftId: $('#ShiftId').val(),
        Status: "0"
    }, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#Detail').empty();
            refreshList();
        }
    });
});

$(document).on('click', '#Finish', function () {
    LoadAjaxAuth('POST', APP_CONFIG.UpdateStatus, {
        ShiftId: $('#ShiftId').val(),
        Status: "1"
    }, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#Detail').empty();
            refreshList();
        }
       
    });
});

$(document).on('click', '#btnRefresh', function () {
    refreshList();
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
    loadSecondShifts();
    $('#modal-default .btnSaveModal').click(function () {
        LoadAjaxAuth('POST', APP_CONFIG.RegisterSecondShift, {
            SecondShiftId: $('#modal-default #id').val(),
            PatientId: $('#modal-default #CardNumber').val(),
            ExaminationRegisterId:
        }, getCookie('_tk'), function (d, s) {

            var r = d.result.data;

            if (d.result.data === true) {
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
    });
});