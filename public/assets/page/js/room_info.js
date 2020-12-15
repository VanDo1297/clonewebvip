
var loadObject = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetObject, {}, getCookie('_tk'), function (d, s) {
        var sel = $('select[name="Object"], .modal select[name="Object"]');
        sel.empty();
        sel.append('<option value=""> Đối tượng</option>');
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
        }
    });
};

function  loadServiceRoomInfo(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllServiceRoomInfoPatient, {
        Id: $(a).val()
    }, getCookie('_tk'), function (d, s) {
        $.ajax({
            url: '/Room/GetInfoView',
            type: 'POST',
            data: { model: JSON.stringify(d.data) },
            cache: false,
            success: function (response) {
                $('#contain').html(response);
            }
        });
    });
};

function refreshList(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllServiceRoomInfoPatient, {
        Id: $(a).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.data.patient;
        $('#PatientList').empty();
        if (r.length === 0) {
            
        }
        else
        {
            for (var i = 0; i < r.length; i++) {
                if (r[i].status != "FINISH" || r[i].status == "CANCEL" || r[i].status == "ROLLBACK") {
                    if (r[i].status == null || r[i].status == '' || r[i].status.length === 0) {
                        var bd = r[i].birthday.split(' ');
                        $('#PatientList').append('<div class="col-sm-2" >\
                                             <div class= "user" >\
                                                    <div class= "user__info" data-toggle="dropdown" >\
                                                        <div>\
                                                            <div>STT: '+ r[i].number + '</div>\
                                                            <div>ID: '+ r[i].id + '</div>\
                                                            <div>BN: '+ r[i].full_name + '</div>\
                                                            <div>NS: '+ bd[0] + '</div>\
                                                            <div><small>'+ r[i].address + '</small></div>\
                                                        </div>\
                                                    </div >\
                                                     <div class="dropdown-menu">\
                                                           <span class="dropdown-item" onclick="infoPatient(this)" id="infoPatient" data-info="'+ r[i].id + '">Thông tin bệnh nhân</span>\
                                                            <span class= "dropdown-item" onclick="updateStatus(this,0)" id = "start" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].service_info_patient_id + '" > Gọi bệnh nhân</span >\
                                                            <span class="dropdown-item" onclick="updateStatus(this,1)" id="finish" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].service_info_patient_id + '" > Hoàn thành</span>\
                                                            <span class="dropdown-item" onclick="loadListService(this)" id="listService" data-info="'+ r[i].id + '" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].service_info_patient_id +'" > Danh sách cận lâm sàng</span>\
                                                     </div>\
                                               </div >\
                                            </div>');  
                    }
                    else  {
                        var bd = r[i].birthday.split(' ');
                        $('#PatientList').append('<div class="col-sm-2" >\
                                                <div class= "user" style = "background-color:rgba(42,174,77,0.4);" >\
                                                        <div class= "user__info" data-toggle="dropdown" >\
                                                            <div>\
                                                                <div>STT: '+ r[i].number + '</div>\
                                                                <div>ID: '+ r[i].id + '</div>\
                                                                <div>BN: '+ r[i].full_name + '</div>\
                                                                <div>NS: '+ bd[0] + '</div>\
                                                                <div><small>'+ r[i].address + '</small></div>\
                                                            </div>\
                                                        </div >\
                                                         <div class="dropdown-menu">\
                                                                <span class="dropdown-item" onclick="infoPatient(this)" id="infoPatient" data-info="'+ r[i].id + '">Thông tin bệnh nhân</span>\
                                                                <span class= "dropdown-item" onclick="updateStatus(this,0)" id = "start" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].service_info_patient_id + '" > Gọi bệnh nhân</span >\
                                                                <span class="dropdown-item" onclick="updateStatus(this,1)" id="finish" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].service_info_patient_id + '" > Hoàn thành</span>\
                                                                <span class="dropdown-item" onclick="loadListService(this)" id="listService" data-info="'+ r[i].id + '" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].service_info_patient_id +'" > Danh sách cân lâm sàng</span>\
                                                         </div>\
                                                   </div>\
                                            </div>');

                    }

                }
            };
        }

    });
};

function infoPatient(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetPatientInfo, {
        Id: $(a).attr('data-info')
    }, getCookie('_tk'), function (d, s) {
        var rs = d.result.data;
        var bd = rs.birthday.split('T');
        $('#modal-patient #id').val(rs.id);
        $('#modal-patient #name').val(rs.full_name);
        $('#modal-patient #gender').val(rs.gender);
        $('#modal-patient #birthday').val(bd[0]);
        $('#modal-patient #phone').val(rs.phone);
        $('#modal-patient #address').val(rs.address);
        $('#modal-patient #homeTown').val(rs.home_town);
        $('#modal-patient #identity').val(rs.card_id);
        $('#modal-patient #objectId').val(rs.object_id);
        $('#modal-patient #healthInsurance').val(rs.heath_insurance_code);
        $('#modal-patient #email').val(rs.email);
        $('#modal-patient').modal('show');
    });
};



function finishList(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllPatientFinish, {
        ServiceRoom_Id: $(a).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var tbl = $('#PatientTable tbody');
        tbl.empty();
        var rs = d.data;
        for (var i = 0; i < rs.length; i++) {
            if (rs[i].status == "FINISH") {
                var bd = rs[i].birthday.split(' ');
                tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].full_name + '</td>\
                            <td> '+ rs[i].id + '</td >\
                            <td> '+ bd[0] + '</td >\
                            <td> '+ rs[i].address + '</td >\
                            <td> '+ rs[i].total_price + '</td >\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEmployeeLeaveEdit" data-id="' + rs[i].id + '" hidden><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>\
                            </td>\
                        </tr>');
            }
        }
        $('#modal-default').modal('show');
    });
};

function updateStatus(a, b) {
    LoadAjaxAuth('POST', APP_CONFIG.UpdateStatus, {
        Service_Info_Patient_Id: $(a).attr('data-id1'),
        Status: b
    }, getCookie('_tk'), function (d, s) {
        var r = d;
        if (r.errorCode == -1) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#modal-listservice').modal('hide');
            refreshList(a);
        }
    });
};

function loadListService(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetListService, {
        ServiceRoomId: $(a).attr('data-id'),
        PatientId: $(a).attr('data-info')
    }, getCookie('_tk'), function (d, s) {
        var tbl = $('#ServiceTable tbody');
        tbl.empty();
        var rs = d.data;
        for (var i = 0; i < rs.length; i++) {
            if (rs[i].status == "ROLLBACK") {
                tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].name + '</td>\
                            <td>'+ rs[i].serviceId + '</td>\
                            <td> '+ rs[i].price + ' VND</td >\
                            <td><a class="btn btn-danger btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đã hoàn tiền</a>\</td >\
                            <td>\
                            </td>\
                        </tr>');
            }
            else if (rs[i].status == "CANCEL")
            {
                tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].name + '</td>\
                            <td>'+ rs[i].serviceId + '</td>\
                            <td> '+ rs[i].price + ' VND</td >\
                            <td><a class="btn btn-danger btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đã hủy</a>\</td >\
                            <td>\
                            </td>\
                        </tr>');
            }
            else if (rs[i].status == "FINISH") {
                tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].name + '</td>\
                            <td>'+ rs[i].serviceId + '</td>\
                            <td> '+ rs[i].price + ' VND</td >\
                            <td><a class="btn btn-primary btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đã thực hiện</a>\</td >\
                            <td>\
                            </td>\
                        </tr>');
            }
            else if (rs[i].status == null)
            {
                tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].name + '</td>\
                            <td>'+ rs[i].serviceId + '</td>\
                            <td> '+ rs[i].price + ' VND</td >\
                            <td><a class="btn btn-success btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chưa thực hiện</a>\</td >\
                            <td>\
                                <a class="btn btn-warning btn-sm btn--icon-text" onclick="updateStatus(this,2)" data-id1="' + rs[i].id + '" ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Hủy dịch vụ</a>\
                            </td>\
                        </tr>');
            }
            else {
                tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].name + '</td>\
                            <td>'+ rs[i].serviceId + '</td>\
                            <td> '+ rs[i].price + ' VND</td >\
                            <td><a class="btn btn-info btn-sm btn--icon-text "  ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đang thực hiện</a>\</td >\
                            <td>\
                                <a class="btn btn-warning btn-sm btn--icon-text" onclick="updateStatus(this,2)" data-id1="' + rs[i].id + '" ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Hủy dịch vụ</a>\
                            </td>\
                        </tr>');
            }
        }
        $('#modal-listservice').modal('show');
    });
}

$(document).ready(function () {
    loadObject();
    setInterval(refreshList, 60000,'#refresh')
    $('#Object').change(function () {
        LoadAjaxAuth('POST', APP_CONFIG.GetAll, {
            Name: null,
            ObjectId: $(this).val(),
            IsActive: "-1"
        }, getCookie('_tk'), function (d, s) {
            var sel = $('select[name="ServiceRoom"]');
            sel.empty();
            sel.append('<option value=""> Phòng cận lâm sàng</option>');
            for (var i = 0; i < d.result.data.length; i++) {
                var item = d.result.data[i];
                sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
            }
        });
    });
    $('#ServiceRoom').change(function () {
        loadServiceRoomInfo(this);
    });
});

