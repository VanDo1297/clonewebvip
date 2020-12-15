var oTable;
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
                d.Name = $('input[name="Name"]').val();
                d.Object_Id = $('.card select[name="Object"]').val();
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
                { "data": "object_name", "bSearchable": false, "bSortable": true },
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
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>';
                        //<a class="btn btn-success btn-sm btn--icon-text btnAddDoctor" data-id="' + full.id + '"><i class="zmdi zmdi-account-add zmdi-hc-fw"></i> Thêm bác sĩ</a>
                    }
                }

            ],
        buttons: []
    });
};

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

var loadType= function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetType, {}, getCookie('_tk'), function (d, s) {
        var sel = $('select[name="ClinicType"], .modal select[name="ClinicType"]');
        sel.empty();
        sel.append('<option value=""> Loại phòng</option>');
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
        }
    });
};
var loadSelectExamination = function () {
    LoadAjaxAuth('POST',
        APP_CONFIG.GetAllExamination,
        {},
        getCookie('_tk'),
        function (d, s) {
            var sel = $('.modal select[name="Examination"]');
            sel.html('');
            sel.append('<option value="" selected>Dịch vụ khám bệnh</option>');
            for (var i = 0; i < d.length; i++) {
                var item = d[i];
                sel.append('<option value="' + item.id.trim() + '"> ' + item.id + '.' + item.name + '</option>');
            }
        });
};
var loadObject1 = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetObject, {}, getCookie('_tk'), function (d, s) {
        var sel = $('#objectList');
        sel.empty();
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            sel.append('<label class="custom-control custom-checkbox">'+
                '<input type = "checkbox" id="objectCheckbox" name = "'+item.name.trim()+'" class= "custom-control-input" value = "'+item.id+'"/>'+
                             '<span class="custom-control-indicator"></span>\
                             <span class="custom-control-description">'+item.name+'</span>\
                        </label >');
        }
    });
};

$('.btnScheduleFilter').click(function () {
    loadScheduleTable($('#modal-Schedule input[name="ClinicId"]').val(), $('#modal-Schedule select[name="Year"]').val());
});
$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="Id"]').prop('disabled', true);
    $('#objectList #objectCheckbox').prop('checked',false);
    LoadAjaxAuth('POST', APP_CONFIG.GetById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.result.data.clinic;
        $('#modal-default input[name="id"]').val(r.id);
        $('#modal-default input[name="Id"]').val(r.id);

        $('#modal-default input[name="Id"]').prop('readonly');
        $('#modal-default input[name="Name"]').val(r.name);
        $('#modal-default input[name="DisplayName"]').val(r.display_Name);
        $('#modal-default input[name="ShortName"]').val(r.short_Name);
        $('#modal-default select[name="ClinicType"]').val(r.clinic_Type_Id).trigger('change');
        $('#modal-default select[name="Examination"]').val(r.service_Id).trigger('change');

        for (var i = 0; i < d.result.data.object.length; i++) {
            var item = d.result.data.object
          
            $('#objectList input[name="' + item[i].trim() + '"]').prop('checked', true);
        };


        var object = "";
        var id = $('#modal-default input[name="id"]').val();

        $('#modal-default select[name="Object"]').val(r.object_Id).trigger('change');

        $('#modal-default input[name="IsActive"]').prop('checked', r.is_Active);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
});
$(document).ready(function () {
    loadObject();
    loadData();
    loadObject1();
    loadType();
    loadSelectExamination();
    $(".select2").select2();
    $('.btnFilter').click(function () { oTable.draw(); });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#modal-default input[name="Id"]').prop('disabled', false);
        $('#objectList #objectCheckbox').prop('checked', false);

        $('#modal-default input[name="id"]').val('');
        $('#modal-default input[name="Id"]').val('');
        $('#modal-default input[name="Name"]').val('');
        $('#modal-default input[name="DisplayName"]').val('');
        $('#modal-default input[name="ShortName"]').val('');
        $('#modal-default input[name="IsActive"]').prop('checked', true);
        setFirstSelect('#modal-default select[name="Object"]');
        setFirstSelect('#modal-default select[name="Examination"]');
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });

    $('.btnSync').click(function () {
        LoadAjaxAuth('POST',
            APP_CONFIG.Sync,
            {
            }
            , getCookie('_tk'), function (d, s) {
                if (d.hasError === true)
                    setAlert(d.errors, 'Lỗi: ', '');
                else {
                    setAlert('Thành công', 'Đồng bộ dữ liệu');
                    oTable.draw();
                }
            });
    });

    //-----------------------------------
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    /*
    $('#modal-default .btnCloseModal').click(function () { $('#modal-default').modal('hide'); });
    $('#modal-Schedule .btnCloseModal').click(function () { $('#modal-Schedule').modal('hide'); });
    $('#modal-addSchedule .btnCloseModal').click(function () { $('#modal-addSchedule').modal('hide'); });
    $('#modal-Schedule-Detail .btnCloseModal').click(function () { $('#modal-Schedule-Detail').modal('hide'); });
    $('#new-event .btnCloseModal').click(function () { $('#new-event').modal('hide'); });
  
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    */
    //-----------------------------------
    $('.btnSaveModal').click(function () {
        var object = "";
        var id = $('#modal-default input[name="id"]').val();
        $('#objectCheckbox:checked').each(function () {
                object = object+$(this).val() + ',';
        });

        LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddRow : APP_CONFIG.UpdateRow, {
            Name: $('#modal-default input[name="Name"]').val(),
            Display_Name: $('#modal-default input[name="DisplayName"]').val(),
            Id: $('#modal-default input[name="Id"]').val(),
            Short_Name: $('#modal-default input[name="ShortName"]').val(),
            Is_Active: $('#modal-default input[name="IsActive"]').prop('checked') ? 1 : 0,
            Object_Id: object,
            Clinic_Type_Id: $('#modal-default select[name="ClinicType"]').val(),
            Service_Id: $('#modal-default select[name="Examination"]').val(),
        }, getCookie('_tk'), function (d, s) {
            if (d.hasError === true)
                setAlert(d.errors, 'Lỗi: ', '');
            else {
                $('#modal-default').modal('hide');
                oTable.draw();
            }
        });
    });

    //$('select[name="DepartmentType"],  .modal select[name="DepartmentId"]').change(function () {
    //    var selectedDepartment = $(this).children("option:selected").val();
    //    loadSelectSpecialty(selectedDepartment, this.getAttribute('name'));
    //});
});

//$(document).on('click', '.btnAddDoctor', function () {
//    var id = $(this).attr('data-id');
//    $('#modal-Doctor input[name="ClinicId"]').val(id);
//    LoadAjaxAuth('POST', APP_CONFIG.Employees, {
//        Id: $(this).attr('data-id')
//    }, getCookie('_tk'), function (d, s) {
//        loadDoctor(id, d);
//    });
//});
//$(document).on('click', '.btnSchedule', function () {
//    var id = $(this).attr('data-id');
//    $('#modal-Schedule input[name="ClinicId"]').val(id);
//    loadScheduleTable(id, $('#modal-Schedule select[name="Year"]').val());
//});

//var createCalendar = function (d) {
//    var date = new Date();
//    var m = date.getMonth();
//    var y = date.getFullYear();
//    if ($.isFunction($('.calendar').fullCalendar))
//        $('.calendar').fullCalendar('destroy');

//    var arrEvent = [];
//    for (var i = 0; i < d.length; i++) {
//        arrEvent.push({
//            id: d[i].id,
//            title: d[i].employeename,
//            start: new Date(d[i].start_date),
//            allDay: true,
//            description: '',
//            json: JSON.stringify(d[i])
//        });
//    }
//    $('.calendar').fullCalendar({
//        header: { right: '', center: '', left: '' },
//        buttonIcons: { prev: 'calendar__prev', next: 'calendar__next' },
//        theme: false,
//        selectable: true,
//        selectHelper: true,
//        editable: true,
//        events: arrEvent,

//        dayClick: function (date) {

//            var isoDate = moment(date).toISOString();
//            LoadAjaxAuth('POST', APP_CONFIG.GetEmployeeOther, {
//                ClinicScheduleId: $('#modal-Schedule-Detail input[name="ClinicScheduleId"]').val(),
//                Date: isoDate
//            }, getCookie('_tk'), function (d, s) {
//                var lst = d.data;
//                loadDoctor($('#modal-Schedule-Detail input[name="ClinicScheduleId"]').val(), lst);
//            });

//            $('#new-event').modal('show');
//            //$('.new-event__title').val('');
//            $('.new-event__start').val(isoDate);
//            $('.new-event__end').val(isoDate);
//        },

//        viewRender: function (view) {
//            var calendarDate = $('.calendar').fullCalendar('getDate');
//            var calendarMonth = calendarDate.month();

//            //Set data attribute for header. This is used to switch header images using css
//            $('.calendar .fc-toolbar').attr('data-calendar-month', calendarMonth);

//            //Set title in page header
//            $('.content__title--calendar > h1').html(view.title);
//        },

//        eventClick: function (event, element) {
//            $('#edit-event').modal('show');
//            $('.edit-event__id').val(event.id);
//            $('.edit-event__title').val(event.title);
//            //$('.edit-event__description').val(event.description);
//        }
//    });
//}
//Add new Event
//$('body').on('click', '.new-event__add', function () {
//    var employeeEle = $('input[name="chkDoctor"]:checked');
//    var name = employeeEle.attr('data-name');
//    if (employeeEle.length === 1) {
//        LoadAjaxAuth('POST', APP_CONFIG.AddClinicEmployee, {
//            ClinicScheduleId: $('#modal-Schedule-Detail input[name="ClinicScheduleId"]').val(),
//            EmployeeId: employeeEle.attr('data-id'),
//            StartDate: $('.new-event__start').val(),
//            EndDate: $('.new-event__start').val()
//        }, getCookie('_tk'), function (d, s) {


//            if (d.hasError === false) {
//                $('.calendar').fullCalendar('renderEvent', {
//                    id: d.data, // employeeEle.attr('data-id'),
//                    title: name,
//                    start: $('.new-event__start').val(),
//                    end: $('.new-event__end').val(),
//                    allDay: true,
//                    className: $('.event-tag input:checked').val()
//                }, true);
//                employeeEle.closest('tr').remove();

//            }
//            else {
//                swal({
//                    title: 'Không thể thêm!',
//                    text: d.errors,
//                    type: 'error',
//                    buttonsStyling: false,
//                    cancelButtonClass: 'btn btn-light',
//                    background: 'rgba(0,0,0,0.096)'
//                });
//            }
//        });
//    }




//});

//Calendar views switch
//$('body').on('click', '[data-calendar-view]', function (e) {
//    e.preventDefault();

//    $('[data-calendar-view]').removeClass('actions__item--active');
//    $(this).addClass('actions__item--active');
//    var calendarView = $(this).attr('data-calendar-view');
//    $('.calendar').fullCalendar('changeView', calendarView);
//});


//Calendar Next
//$('body').on('click', '.actions__calender-next', function (e) {
//    e.preventDefault();
//    $('.calendar').fullCalendar('next');
//});


//Calendar Prev
//$('body').on('click', '.actions__calender-prev', function (e) {
//    e.preventDefault();
//    $('.calendar').fullCalendar('prev');
//});

//Update/Delete an Event
//$('body').on('click', '[data-calendar]', function () {
//    var calendarAction = $(this).data('calendar');
//    var employeeId = $('.edit-event__id').val();
//    var currentTitle = $('.edit-event__title').val();
//    //var currentDesc = $('.edit-event__description').val();
//    var currentEvent = $('.calendar').fullCalendar('clientEvents', employeeId);

//    ////Update
//    //if (calendarAction === 'update') {
//    //    if (currentTitle !== '') {
//    //        currentEvent[0].title = currentTitle;
//    //        //currentEvent[0].description = currentDesc;

//    //        $('.calendar').fullCalendar('updateEvent', currentEvent[0]);
//    //        $('#edit-event').modal('hide');
//    //    }
//    //    else {
//    //        $('.edit-event__title').closest('.form-group').addClass('has-error');
//    //        $('.edit-event__title').focus();
//    //    }
//    //}

//    //Delete
//    if (calendarAction === 'delete') {
//        $('#edit-event').modal('hide');
//        setTimeout(function () {
//            swal({
//                title: 'Chắc chắn?',
//                text: "Bạn muốn xóa bác sĩ này!!",
//                type: 'warning',
//                showCancelButton: true,
//                buttonsStyling: false,
//                confirmButtonClass: 'btn btn-danger',
//                confirmButtonText: 'Yes, delete it!',
//                cancelButtonClass: 'btn btn-light',
//                background: 'rgba(0,0,0,0.096)'
//            }).then(function () {

//                LoadAjaxAuth('POST', APP_CONFIG.RemoveClinicEmployee, {
//                    Id: $('.edit-event__id').val()
//                }, getCookie('_tk'), function (d, s) {

//                    if (d.success === false) {
//                        swal({
//                            title: 'Không thể xóa!',
//                            text: 'Vui lòng kiểm tra ca khám, xem có bệnh nhân nào dk ko!',
//                            type: 'error',
//                            buttonsStyling: false,
//                            cancelButtonClass: 'btn btn-light',
//                            background: 'rgba(0,0,0,0.096)'
//                        });
//                    }
//                    else {
//                        $('.calendar').fullCalendar('removeEvents', employeeId);
//                        swal({
//                            title: 'Đã xóa!',
//                            text: 'Danh sách của bạn đã xóa.',
//                            type: 'success',
//                            buttonsStyling: false,
//                            cancelButtonClass: 'btn btn-light',
//                            background: 'rgba(0,0,0,0.096)'
//                        });
//                    }


//                });


//            });
//        }, 200);
//    }
//});
//$(document).on('click', '.btnScheduleDetail', function () {
//    var id = $(this).attr('data-id');
//    $('#modal-Schedule-Detail input[name="ClinicScheduleId"]').val(id);

//    LoadAjaxAuth('POST', APP_CONFIG.GetEmployeeByClinicScheduleId, {
//        ClinicScheduleId: id
//    }, getCookie('_tk'), function (d, s) {
//        createCalendar(d.data);
//        $('#modal-Schedule-Detail').modal({ backdrop: 'static', keyboard: false });
//    });




//});

//$('.btnScheduleAdd').click(function () {
//    $('#modal-addSchedule input[name="Id"]').val('');
//    $('#modal-addSchedule input[type="text"]').val('');

//    $('#modal-addSchedule input[name="Monday"]').prop('checked', true);
//    $('#modal-addSchedule input[name="Tuesday"]').prop('checked', true);
//    $('#modal-addSchedule input[name="Wednesday"]').prop('checked', true);
//    $('#modal-addSchedule input[name="Thursday"]').prop('checked', true);
//    $('#modal-addSchedule input[name="Friday"]').prop('checked', true);
//    $('#modal-addSchedule input[name="Saturday"]').prop('checked', true);

//    $('#modal-addSchedule input[name="IsActive"]').prop('checked', true);


//    $('#modal-addSchedule input[name="StartWork"]').val('');
//    $('#modal-addSchedule input[name="EndWork"]').val('');

//    $('#modal-addSchedule input[name="PrimaryTime"]').val('');
//    $('#modal-addSchedule input[name="SecondTime"]').val('');

//    $('#modal-addSchedule input[name="Fee"]').val('');
//    $('#modal-addSchedule').modal({ backdrop: 'static', keyboard: false });
//});
//$(document).on('click', '.btnScheduleEdit', function () {
//    var id = $(this).attr('data-id');
//    LoadAjaxAuth('POST', APP_CONFIG.GetClinicScheduleId, {
//        Id: id
//    }, getCookie('_tk'), function (d, s) {
//        var item = d.data;
//        $('#modal-addSchedule input[name="Id"]').val(item.id);
//        $('#modal-addSchedule input[name="ClinicId"]').val(item.clinic_Id);
//        $('#modal-addSchedule input[name="Name"]').val(item.name);

//        $('#modal-addSchedule input[name="StartTime"]').val(item.start_Time.replace('T00:00:00', ''));
//        $('#modal-addSchedule input[name="EndTime"]').val(item.end_Time.replace('T00:00:00', ''));

//        $('#modal-addSchedule input[name="Monday"]').prop('checked', item.monday);
//        $('#modal-addSchedule input[name="Tuesday"]').prop('checked', item.tuesday);
//        $('#modal-addSchedule input[name="Wednesday"]').prop('checked', item.wednesday);
//        $('#modal-addSchedule input[name="Thursday"]').prop('checked', item.thursday);
//        $('#modal-addSchedule input[name="Friday"]').prop('checked', item.friday);
//        $('#modal-addSchedule input[name="Saturday"]').prop('checked', item.saturday);

//        $('#modal-addSchedule input[name="IsActive"]').prop('checked', item.is_Active);


//        $('#modal-addSchedule input[name="StartWork"]').val(item.start_Work.replace('T00:00:00', ''));
//        $('#modal-addSchedule input[name="EndWork"]').val(item.end_Work.replace('T00:00:00', ''));

//        $('#modal-addSchedule input[name="PrimaryTime"]').val(item.primary_Time);
//        $('#modal-addSchedule input[name="SecondTime"]').val(item.second_Time);

//        $('#modal-addSchedule input[name="Fee"]').val(item.fee);



//        $('#modal-addSchedule').modal({ backdrop: 'static', keyboard: false });
//    });

//});

//$('.btnSaveSchedule').click(function () {
//    var id = $('#modal-addSchedule input[name="Id"]').val();
//    LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddSchedules : APP_CONFIG.UpdateSchedules, {
//        Id: id,
//        ClinicId: $('#modal-Schedule input[name="ClinicId"]').val(),
//        Name: $('#modal-addSchedule input[name="Name"]').val(),

//        StartTime: $('#modal-addSchedule input[name="StartTime"]').val(),
//        EndTime: $('#modal-addSchedule input[name="EndTime"]').val(),

//        Monday: $('#modal-addSchedule input[name="Monday"]:checked').length === 1,
//        Tuesday: $('#modal-addSchedule input[name="Tuesday"]:checked').length === 1,
//        Wednesday: $('#modal-addSchedule input[name="Wednesday"]:checked').length === 1,
//        Thursday: $('#modal-addSchedule input[name="Thursday"]:checked').length === 1,
//        Friday: $('#modal-addSchedule input[name="Friday"]:checked').length === 1,
//        Saturday: $('#modal-addSchedule input[name="Saturday"]:checked').length === 1,

//        IsActive: $('#modal-addSchedule input[name="IsActive"]:checked').length === 1,

//        Priority: 0,

//        StartWork: $('#modal-addSchedule input[name="StartWork"]').val(),
//        EndWork: $('#modal-addSchedule input[name="EndWork"]').val(),

//        PrimaryTime: $('#modal-addSchedule input[name="PrimaryTime"]').val(),
//        SecondTime: $('#modal-addSchedule input[name="SecondTime"]').val(),

//        Fee: $('#modal-addSchedule input[name="Fee"]').val()
//    }, getCookie('_tk'), function (d, s) {

//        if (d.hasError === true)
//            setAlert(d.errors, 'Lỗi: ', '');
//        else {
//            $('#modal-addSchedule').modal('hide');
//            loadScheduleTable($('#modal-Schedule input[name="ClinicId"]').val(), $('#modal-Schedule select[name="Year"]').val());
//        }

//    });

//});

//$(document).on('click', '.btnSaveDoctorModal', function () {
//    var id = $('#modal-Doctor input[name="ClinicId"]').val();
//    var obj = {
//        ClinicId: id,
//        Employees: []
//    };
//    arr = $('#SecondTable tbody input[name="chkDoctor"]:checked');
//    for (var i = 0; i < arr.length; i++) {
//        obj.Employees.push({
//            EmployeeId: $(arr[i]).attr('data-id'),
//            StartDate: '2019-04-04',
//            EndDate: '2019-04-14'
//        });
//    }
//    if (obj.Employees.length > 0)
//        LoadAjaxAuth('POST', APP_CONFIG.AddEmployee, obj, getCookie('_tk'), function (d, s) {
//            $('#modal-Doctor').modal('hide');
//            oTable.draw();
//        });
//});
//$(document).on('click', '.btnRemoveDoctor', function () {
//    if (confirm('Bạn muốn gỡ bác sĩ này ra khỏi phòng này ?')) {
//        LoadAjaxAuth('POST', APP_CONFIG.RemoveEmployee, {
//            EmployeeId: $(this).attr('data-id'),
//            ClinicId: $(this).attr('data-master')
//        }, getCookie('_tk'), function (d, s) {
//            oTable.draw();
//        });
//    }
//});

//====== Create 14/06/2019 by Phu - START ======//
