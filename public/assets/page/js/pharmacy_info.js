
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


var loadPharmacyInfo = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllPharmacyInfoPatient, {
        ObjectId: $('#Object').val(),
        Is_Active: $('#IsActive').val()
    }, getCookie('_tk'), function (d, s) {
        $.ajax({
            url: '/Pharmacy/GetInfoView',
            type: 'POST',
            data: { model: JSON.stringify(d.data)},
            cache: false,
            success: function (response) {
                $('#contain').html(response);
            }
        });
    });
};

function refreshList(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllPharmacyPatient, {
        Pharmacy_Id: $(a).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.data;
        var id = $(a).attr('data-id');
        $('#' + id).html('');
        if (r.length == 0) {
            //$('#' + id).html('');
            //$('#' + id).html('<div class="row">\
            //                    < div class= "col-sm-2" >\
            //                        < div class= "user" >\
            //                            <div class= "user__info" data-toggle="dropdown" >\
            //                                <div>\
            //                                    <div>STT: </div>\
            //                                    <div>ID: </div>\
            //                                    <div>BN: </div>\
            //                                    <div>NS: </div>\
            //                                    <div><small></small>--</div>\
            //                                    <div class="clearfix">TT: </div>\
            //                                </div>\
            //                            </div >\
            //                             <div class="dropdown-menu">\
            //                                   <span class="dropdown-item"  id="infoPatient" >Thông tin bệnh nhân</span>\
            //                                    <span class= "dropdown-item" id = "start"> Lấy thuốc</span >\
            //                                    <span class="dropdown-item"  id="end">Nhận thuốc</span>\
            //                                    <span class="dropdown-item"  id="finish">Đã có thuốc</span>\
            //                                    <span class="dropdown-item"  id="finish">Hủy đơn thuốc</span>\
            //                             </div>\
            //                       </div >\
            //                    </div >\
            //                 </div>');
               
        } else {

            for (var i = 0; i < r.length; i++) {
                if (r[i].status != "FINISH") {
                    if (r[i].status === null || r[i].status == '') {
                        var bd = r[i].birthday.split(' ');
                        $('#' + id).html('<div class= "row" >\
                                            <div class="col-sm-2" >\
                                             <div class= "user" >\
                                                    <div class= "user__info" data-toggle="dropdown" >\
                                                        <div>\
                                                            <div>STT: '+ r[i].number + '</div>\
                                                            <div>ID: '+ r[i].id + '</div>\
                                                            <div>BN: '+ r[i].full_name + '</div>\
                                                            <div>NS: '+ bd[0] + '</div>\
                                                            <div><small>'+ r[i].address + '</small></div>\
                                                            <div class="clearfix">TT: '+ r[i].total_price + ' VND</div>\
                                                        </div>\
                                                    </div >\
                                                     <div class="dropdown-menu">\
                                                           <span class="dropdown-item" onclick="infoPatient(this)" id="infoPatient" data-id1="'+ r[i].id + '">Thông tin bệnh nhân</span>\
                                                            <span class= "dropdown-item" onclick="updateStatus(this,0)" id = "start" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Đã có thuốc</span >\
                                                            <span class="dropdown-item" onclick="updateStatus(this,1)" id="end" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Gọi lấy thuốc</span>\
                                                            <span class="dropdown-item" onclick="updateStatus(this,2)" id="finish" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Đã nhận thuốc</span>\
                                                     </div>\
                                               </div >\
                                            </div>\
                                        </div>');

                    }
                    else {
                        if (r[i].status == "START") {
                            var bd = r[i].birthday.split(' ');
                            $('#' + id).html('<div class= "row" >\
                                            <div class="col-sm-2" >\
                                                <div class= "user" style = "background-color:rgba(42,174,77,0.4);" >\
                                                        <div class= "user__info" data-toggle="dropdown" >\
                                                            <div>\
                                                                <div>STT: '+ r[i].number + '</div>\
                                                                <div>ID: '+ r[i].id + '</div>\
                                                                <div>BN: '+ r[i].full_name + '</div>\
                                                                <div>NS: '+ bd[0] + '</div>\
                                                                <div><small>'+ r[i].address + '</small></div>\
                                                                <div class="clearfix">TT: '+ r[i].total_price + ' VND</div>\
                                                            </div>\
                                                        </div >\
                                                         <div class="dropdown-menu">\
                                                                <span class="dropdown-item" onclick="infoPatient(this)" id="infoPatient" data-id1="'+ r[i].id + '">Thông tin bệnh nhân</span>\
                                                                <span class= "dropdown-item" onclick="updateStatus(this,0)" id = "start" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Đã có thuốc</span >\
                                                                <span class="dropdown-item" onclick="updateStatus(this,1)" id="end" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Gọi lấy thuốc</span>\
                                                                <span class="dropdown-item" onclick="updateStatus(this,2)" id="finish" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Đã nhận thuốc</span>\
                                                         </div>\
                                                   </div>\
                                            </div>\
                                          </div> ');
                        }
                        else {
                            var bd = r[i].birthday.split(' ');
                            $('#' + id).html('<div class= "row" >\
                                            <div class="col-sm-2" >\
                                                <div class= "user" style="background-color:rgba(255, 216, 0,0.4)" >\
                                                        <div class= "user__info" data-toggle="dropdown" >\
                                                            <div>\
                                                                <div>STT: '+ r[i].number + '</div>\
                                                                <div>ID: '+ r[i].id + '</div>\
                                                                <div>BN: '+ r[i].full_name + '</div>\
                                                                <div>NS: '+ bd[0] + '</div>\
                                                                <div><small>'+ r[i].address + '</small></div>\
                                                                <div class="clearfix">TT: '+ r[i].total_price + ' VND</div>\
                                                            </div>\
                                                        </div >\
                                                         <div class="dropdown-menu">\
                                                                <span class="dropdown-item" onclick="infoPatient(this)" id="infoPatient" data-id1="'+ r[i].id + '">Thông tin bệnh nhân</span>\
                                                                <span class= "dropdown-item" onclick="updateStatus(this,0)" id = "start" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Đã có thuốc</span >\
                                                                <span class="dropdown-item" onclick="updateStatus(this,1)" id="end" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Gọi lấy thuốc</span>\
                                                                <span class="dropdown-item" onclick="updateStatus(this,2)" id="finish" data-id="'+ $(a).attr('data-id') + '" data-id1="' + r[i].pharmacy_patient_id + '" >Đã nhận thuốc</span>\
                                                         </div>\
                                                   </div>\
                                            </div>\
                                          </div> ');
                        }
                        
                            
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
        $('#modal-patient #name').val(rs.full_Name);
        $('#modal-patient #gender').val(rs.gender);
        $('#modal-patient #birthday').val(bd[0]);
        $('#modal-patient #phone').val(rs.phone);
        $('#modal-patient #address').val(rs.address);
        $('#modal-patient #homeTown').val(rs.home_Town);
        $('#modal-patient #identity').val(rs.card_Id);
        $('#modal-patient #objectId').val(rs.object_Id);
        $('#modal-patient #healthInsurance').val(rs.heath_Insurance_Code);
        $('#modal-patient #email').val(rs.email);
        $('#modal-patient').modal('show');
    });
};

function notNumber(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllPharmacyPatientNotNumber, {
        Pharmacy_Id: $(a).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var tbl = $('#PatientTable tbody');
        tbl.empty();
        var rs = d.data;
        for (var i = 0; i < rs.length; i++) {
            var bd = rs[i].birthday.split(' ');
                tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].full_name + '</td>\
                            <td> '+ rs[i].id + '</td >\
                            <td> '+ bd[0]+ '</td >\
                            <td> '+ rs[i].address + '</td >\
                            <td> '+ rs[i].total_price + '</td >\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEmployeeLeaveEdit" data-id="' + rs[i].id + '" hidden><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>\
                            </td>\
                        </tr>');
        }
        $('#modal-default').modal('show');
    });
};

function finishList(a) {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllPatientFinish, {
        Pharmacy_Id: $(a).attr('data-id')
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
                                <a class="btn btn-primary btn-sm btn--icon-text btnEmployeeLeaveEdit" data-id="' + rs[i].id + '" hidden ><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>\
                            </td>\
                        </tr>');
            }
        }
        $('#modal-default').modal('show');
    });
};

function updateStatus(a,b) {
    LoadAjaxAuth('POST', APP_CONFIG.UpdateStatus, {
        Pharmacy_Patient_Id: $(a).attr('data-id1'),
        Status: b
    }, getCookie('_tk'), function (d, s) {
        var r = d;
        if (r.errorCode === -1) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            refreshList(a);
        }
    });
};



$(document).ready(function () {
    loadObject();
    loadPharmacyInfo();
    
    //$(".select2").select2();
    $('.btnFilter').click(function () { loadPharmacyInfo(); });

});