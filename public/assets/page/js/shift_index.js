var oTable;
var d = new Date();
function addZero(t) {
    return t < 10 ? '0' + t : t;
}
function getFormatedDate() {
    return d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate())
}
var loadData = function () {
    var url = APP_CONFIG.GetTable;
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
                d.Is_Active = $('select[name="IsActive"]').val();
                d.Doctor = $('input[name="name"]').val();
                d.Department_Id = $('select[name="departmentId"]').val();
                d.Date = $('input[name="date"]').val();
                d.End_Time = $('input[name="endTime"]').val();
                d.Start_Time = $('input[name="startTime"]').val();
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
                { "data": "patient_name", "bSearchable": false, "bSortable": true },
                { "data": "patient_id", "bSearchable": false, "bSortable": true },

                //{ "data": "date", "bSearchable": false, "bSortable": true },
                { "data": "doctor_name", "bSearchable": false, "bSortable": true },
                { "data": "doctor_id", "bSearchable": false, "bSortable": true },
                { "data": "start_time", "bSearchable": false, "bSortable": true },
                { "data": "end_time", "bSearchable": false, "bSortable": true },
                {
                    "data": "payment_status",
                    "bSearchable": false,
                    "bSortable": true,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (data == 1)
                            return '<span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i></span>';
                        else
                            return '<span class="badge badge-warning">Đã hủy</span>';
                    }
                },

                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (full.date === getFormatedDate()) {
                            if (full.is_active == 0) {
                                return '';
                            }
                            return '<a class="btn btn-warning btn-sm btn--icon-text btnCancel" onclick="Cancel(this)"  data-id="' + full.id + '"  data-date = "' + full.date + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Huỷ ca</a>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnChangeDoctor"  data-id="' + full.id + '" data-date = "' + full.date + '" data-start = "' + full.start_time + '" onclick="ChangeDoctor(this)"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Đổi bác sĩ</a>';

                        }
                        else if (full.date > getFormatedDate()) {
                            return '<a class="btn btn-warning btn-sm btn--icon-text btnCancel" onclick="Cancel(this)"  data-id="' + full.id + '"  data-date = "' + full.date + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Huỷ ca</a>';
                        } else {
                            return '';
                        }
                    }
                }

            ],
        buttons: []
    });
};

var $sked1;
var loadDepartment = function () {
    LoadAjaxAuth('POST', APP_CONFIG.LoadDepartment, {}, getCookie('_tk'), function (d, s) {
        var sel = $('select[name="departmentId"]');
        sel.html('');
        sel.append('<option value=""> Chuyên khoa</option>');
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
        }
    });
};

function Cancel(d) {
    Swal.fire({
        title: 'Hủy ca khám',
        text: "Bạn chắc chắn muôn hủy ca khám này",
        type: 'warning',
        background: '#020303',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Không hủy',
        confirmButtonText: 'Hủy ca'
    }).then((result) => {
        if (result.value) {
            LoadAjaxAuth('POST', APP_CONFIG.Cancel, {
                ShiftId: $(d).attr('data-id'),
                Date: $(d).attr('data-date'),
                Ip: $('#Ip').val(),
                Device: "WEB"
            }, getCookie('_tk'), function (d, s) {
                if (d.result.data === false)
                    Swal.fire({
                        type: 'error',
                        title: d.result.errors,
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                else {
                    oTable.draw();
                    Swal.fire({
                        type: 'success',
                        title: 'Hủy ca thành công',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                }
            });
        }
    });
};

function ChangeDoctor(d) {
    $('#date').val($(d).attr('data-date'));
    LoadAjaxAuth('POST', APP_CONFIG.ListDoctor, {
        Shift_Id: $(d).attr('data-id'),
    }, getCookie('_tk'), function (d, s) {
        if (d.result.hasError == true) {
            var sel = $('select[name="doctorList"]');
            sel.html('');
            sel.append('<option value=""> Danh sách bác sĩ cùng khoa</option>');
            setAlert(d.result.errors, 'Lỗi: ', '');
        } else {
            var sel = $('select[name="doctorList"]');
            sel.html('');
            sel.append('<option value=""> Danh sách bác sĩ cùng khoa</option>');
            for (var i = 0; i < d.result.data.length; i++) {
                var item = d.result.data[i];
                sel.append('<option value="' + item.schedule_Id + '"> ' + item.name + '</option>');
            }
        }
        
    });
    $('#shiftList tbody').html('');
    $('#startTime').val($(d).attr('data-start'));
    $('#shiftIdOld').val($(d).attr('data-id'));
    $('#modal-default').modal('show');
};

$('#doctorList').on('change', function () {
    var selectVal = $("#doctorList option:selected").val();
    LoadAjaxAuth('POST', APP_CONFIG.ListShift, {
        Schedule_Id: selectVal,
        Date: $('#date').val(),
        Start_Time: $('#startTime').val()
    }, getCookie('_tk'), function (d) {
        loadShiftDoctorTable(d);
    });
  
});

//$('#btnCall').click(function () {
//    $.ajax({
//        type: 'POST',
//        headers: {
//            Authorization: getCookie('_tk')
//        }
//        , dataType: "json"
//        , contentType: "application/json; charset=utf-8"
//        , url: 'https://api.bvtn.org.vn/api/ins_hsoft_dangky/?ip=192.168.1.215&idbv=79025&mabn=19000001&ngay=17/04/2019'
//        , data: {}
//        , cache: !1
//        , success: function (data) {
//            console.log(data);
//        }
//        , error: alert('lỗi')
//    });
//});

var loadShiftDoctorTable = function (d) {
    var tbl = $('#shiftList tbody');
    tbl.empty();
    var rs = d.result.data;
    for (var i = 0; i < rs.length; i++) {
            tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].clinic_Name + '</td>\
                            <td>'+ rs[i].clinic_Id + '</td>\
                            <td>'+ rs[i].date + '</td>\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].start_Time.replace('T00:00:00', '') + '</span> </td >\
                             <td>\
                                <span class="badge badge-primary">'+ rs[i].end_Time.replace('T00:00:00', '') + '</span> </td >\
                            <td>\
                                <span class="badge badge-warning">Trống</span>\
                            </td>\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnChangeShift" onclick="ChangeShift(this)" data-id="' + rs[i].shift_Id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chọn</a>\
                            </td>\
                        </tr>');
    }
};

function ChangeShift(d) {
    Swal.fire({
        title: 'Đổi bác sĩ',
        text: "Bạn chắc chắn muốn đổi bệnh nhân đến ca của bác sĩ này",
        type: 'warning',
        background: '#020303',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Xác nhận'
    }).then((result) => {
        if (result.value) {
            LoadAjaxAuth('POST', APP_CONFIG.ChangeDoctor, {
                Shift_Id_Old: $('#shiftIdOld').val(),
                Shift_Id_New: $(d).attr('data-id')
            }, getCookie('_tk'), function (d, s) {
                if (d.result.hasError === true)
                    Swal.fire({
                        type: 'error',
                        title: d.result.errors,
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                else {
                    Swal.fire({
                        type: 'success',
                        title: 'Đổi ca thành công',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#020303'
                    });
                    $('#modal-default').modal('hide');
                    oTable.draw(); 
                }
            });
        }
    });
};

$(document).ready(function () {
    loadData();
    loadDepartment();
    $('.btnFilter').click(function () {
         oTable.draw(); 
    });
    
});

//function today(hours, minutes) {
//    var date = new Date();
//    date.setUTCHours(hours, minutes, 0, 0);
//    return date;
//}
//function setHour(time, hours, minutes) {
//    var date = new Date(time);
//    date.setUTCHours(hours, minutes, 0, 0);
//    return date;
//}
//function setUTCHour(time) {
//    var date = new Date(time);
//    date.setUTCHours(date.getHours(), date.getMinutes(), 0);
//    return date;
//}
//function yesterday(hours, minutes) {
//    var date = today(hours, minutes);
//    date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
//    return date;
//}
//function tomorrow(hours, minutes) {
//    var date = today(hours, minutes);
//    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
//    return date;
//}

//var createShift = function (clinics, shifts) {
//    for (var i = 0; i < clinics.length; i++) {
//        clinics[i].ids = clinics[i].id;
//        clinics[i].id = clinics[i].id + '__' + clinics[i].doctor_id;
//    }
//    var events = [];

//    for (var i = 0; i < shifts.length; i++) {
//        events.push({
//            name: 'BN' + i,
//            location: shifts[i].clinic_id + '__' + shifts[i].doctor_id,
//            start: setUTCHour(shifts[i].start_time),
//            end: setUTCHour(shifts[i].end_time),
//            disabled: shifts[i].sts === 'SECOND'
//        });
//    }
//    $sked1 = $.skedTape({
//        caption: 'Phòng khám',
//        start: setHour($('input[name="datetime"]').val(), 7,0),
//        end: setHour($('input[name="datetime"]').val(), 17, 0),
//        showEventTime: true,
//        showEventDuration: true,
//        scrollWithYWheel: true,
//        locations: clinics.slice(),
//        events: events.slice(),
//        maxTimeGapHi: 1 * 60 * 1000, // 1 minute
//        minGapTimeBetween: 1 * 60 * 1000,
//        snapToMins: 5,
//        maxZoom: 10,
//        zoom: 10,
//        editMode: false,
//        formatters: {
//            date: function (date) {
//                return $.fn.skedTape.format.date(date, 'l', '.');
//            },
//            duration: function (ms, opts) {
//                return $.fn.skedTape.format.duration(ms, {
//                    hrs: 'h.',
//                    min: 'min.'
//                });
//            }
//        },
//        postRenderLocation: function ($el, location, canAdd) {
//            this.constructor.prototype.postRenderLocation($el, location, canAdd);
//            $el.prepend('<i class="fas fa-thumbtack text-muted"/> ');
//        }
//    });
//    $('#sked1').empty();
//    $sked1.appendTo('#sked1').skedTape('render');
//};