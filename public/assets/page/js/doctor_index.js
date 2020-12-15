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
                d.Department_Id = $('select[name="DepartmentType"]').val();
                d.Degree = $('select[name="DegreeType"]').val();
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
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (full.avatar != null) {
                            return '<img id="imgProfile" class="img-thumbnail" src="' + full.avatar + '" style="width:50;height:50px;" />';
                        }
                        else {
                            return '';
                        }
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
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a></br>\
                                <a class="btn btn-warning btn-sm btn--icon-text btnAddAccount" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Thêm tài khoản</a></br>\
                                <a class="btn btn-success btn-sm btn--icon-text btnDetail" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Lịch nghỉ</a></br>\
                                <a class="btn btn-info btn-sm btn--icon-text btnHistory" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Công tác</a></br>\
                                <a class="btn btn-danger btn-sm btn--icon-text btnRole" data-id="' + full.id + '" > <i class="zmdi zmdi-edit zmdi-hc-fw"></i> Quyền truy cập</a >';
                    }
                }

            ],
        buttons: []
    });
};

var oTable1;
 function loadHistoryData() {
    var url = APP_CONFIG.GetAllHistory;
    oTable1 = $('#HistoryTable').DataTable({
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
                d.Is_Active = $('select[name="HistoryIsActive"]').val();
                d.Start_Time = $('#startDate').val();
                d.Doctor_Id = $('#modal-History #DoctorId').val();
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
                { "data": "doctor_name", "bSearchable": false, "bSortable": true },
                { "data": "start_time", "bSearchable": false, "bSortable": true },
                { "data": "end_time", "bSearchable": false, "bSortable": true },
                { "data": "title", "bSearchable": false, "bSortable": true },
                {
                    "data": "is_active",
                    "bSearchable": false,
                    "bSortable": true,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (data == 1)
                            return '<span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i> Đang thực hiện</span>';
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
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnEditHistory" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>';
                    }
                }

            ],
        buttons: []
    });
};

$(document).on('click', '.btnHistory', function () {
    $('#modal-History #startDate').val('');
    $('#modal-History #DoctorId').val($(this).attr('data-id'));
    loadHistoryData();
    $('#HistoryTable').DataTable().ajax.reload();
    $('#modal-History').modal({ backdrop: 'static', keyboard: false });
});

var loadSel = function () {
    LoadAjaxAuth('POST',
        APP_CONFIG.GetSel,
        {},
        getCookie('_tk'), function (d, s) {
            var sel = $('select[name="DepartmentType"], .modal select[name="DepartmentId"]');
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
            var sel = $('select[name="DegreeType"], .modal select[name="Degree"]');
            sel.html('');
            sel.append('<option value="" selected>Học hàm</option>');
            for (var i = 0; i < d.length; i++) {
                var item = d[i];
                sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
            }
        });
};


var loadRole = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetAllRole, {}, getCookie('_tk'), function (d, s) {
        var sel = $('#roleList');
        sel.empty();
        for (var i = 0; i < d.data.length; i++) {
            var item = d.data[i];
            sel.append('<li><label class="custom-control custom-checkbox">' +
                '<input type = "checkbox" id="roleCheckbox" name = "' + item.id.trim() + '" class= "custom-control-input" value = "' + item.id + '"/>' +
                '<span class="custom-control-indicator"></span>\
                             <span class="custom-control-description">'+ item.name + '</span>\
                        </label ><li><br/>');
        }
    });
};

$(document).on('click', '.btnRole', function () {
    $('#roleList #roleCheckbox').prop('checked', false);
    $('#modal-role input[name="id"]').val($(this).attr('data-id'));
    LoadAjaxAuth('POST', APP_CONFIG.GetAllDoctorRole,
        {
            doctorId: $(this).attr('data-id')
        }
        , getCookie('_tk'),
        function (d, s) {
            for (var i = 0; i < d.result.data.length; i++) {
                var item = d.result.data

                $('#roleList input[name="' + item[i].sys_Type_Id.trim() + '"]').prop('checked', true);
            };
        
        });
    $('#modal-role').modal('show');
});



$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="Code"]').prop('disabled', true);
    var id = $(this).attr('data-id');
    LoadAjaxAuth('POST', APP_CONFIG.GetById,
        {
            Id: id
        }
        , getCookie('_tk'),
        function (d, s) {
            var r = d.result.data;
            var bd = r.birthday.split(' ');
            var img = r.avatar == null ? '/Media/DoctorImg/doctor-default.jpg' : r.avatar;
            $('#modal-default input[name="Id"]').val(r.id);
            $('#modal-default input[name="Code"]').val(r.id);
            $('#modal-default select[name="Gender"]').val(r.gender).trigger('change');
            $('#modal-default input[name="Birthday"]').val(bd[0]);
            $('#modal-default input[name="Phone"]').val(r.phone);
            $('#modal-default input[name="DegreeShort"]').val(r.degree_Short);
            $('#modal-default select[name="Degree"]').val(r.degree_Id).trigger('change');
            $('#modal-default select[name="DepartmentId"]').val(r.department_Id).trigger('change');
            $('#modal-default input[name="Name"]').val(r.name);
            $('#DoctorImage').attr('src', img);
            $('#DoctorImageUrl').val('');
            $('#modal-default input[name="IsActive"]').prop('checked', r.is_Active);
            $('#modal-default').modal({ backdrop: 'static', keyboard: false });
        });
});

$(document).on('click', '.btnAddAccount', function () {
    $('#modal-account input[name="id"]').val($(this).attr('data-id'));
    $('#modal-account input[name="password"]').val('');
    $('#modal-account input[name="confirmPassword"]').val('');
    $('#modal-account').modal('show');
});

$(document).on('click', '.btnChangePassword', function () {
    $('#modal-changepwd #flag').val('1');
    $('#modal-account').modal('hide');
    $('#modal-changepwd input[name="oldPassword"]').val('');
    $('#modal-changepwd input[name="newPassword"]').val('');
    $('#modal-changepwd input[name="confirmPassword"]').val('');
    $('#modal-changepwd').modal('show');
});

$(document).on('click', '.btnEditHistory', function () {
    var id = $(this).attr('data-id');
    console.log(id);
    LoadAjaxAuth('POST', APP_CONFIG.GetByHistoryId,
        {
            Id: id
        }
        , getCookie('_tk'),
        function (d, s) {
            var r = d.result.data;
            $('#modal-second input[name="HistoryId"]').val(r.id);

            $('#modal-second input[name="Title"]').val(r.title);
            $('#modal-second input[name="StartDate"]').val(r.start_Time);
            $('#modal-second input[name="EndDate"]').val(r.end_Time);

            $('#modal-second input[name="IsActive"]').prop('checked', r.is_Active);
            $('#modal-second').modal({ backdrop: 'static', keyboard: false });

        });
});

$(document).ready(function () {
    loadSel();
    loadSelectDegree();
    loadData();
    loadRole();

    $(".select2").select2();

    $('.btnFilter').click(function () { oTable.draw(); });
    $('.btnHistoryFilter').click(function () {
        oTable1.draw();
        $('#modal-History #startDate').val('');
        
    });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#modal-default input[name="Id"]').val('');
        $('#modal-default input[name="Code"]').prop('disabled', false);
        $('#modal-default input[name="Code"]').val('');
        $('#modal-default input[type="text"]').val('');
        $('#modal-default select[name="Gender"]').val('').trigger('change');
        $('#modal-default input[name="Birthday"]').val('');
        $('#modal-default input[name="Phone"]').val('');
        setFirstSelect('#modal-default select[name="Degree"]');
        setFirstSelect('#modal-default select[name="DegreeShort"]');
        setFirstSelect('#modal-default select[name="DepartmentId"]');   
        $('#DoctorImage').attr('src', '/Media/DoctorImg/doctor-default.jpg');
        $('#DoctorImageUrl').val('');   
        $('#modal-default input[name="IsActive"]').prop('checked', true);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });

    $('.btnAddExcel').click(function () {
        $('#modal-add').modal({ backdrop: 'static', keyboard: false });
    });

    $('.btnAddHistory').click(function () {
        $('#modal-second input[name="HistoryId"]').prop('disabled', false);
        $('#modal-second input[name="HistoryId"]').val('');
        $('#modal-second input[name="Title"]').val('');
        $('#modal-second input[name="StartDate"]').val('');
        $('#modal-second input[name="EndDate"]').val('');
        $('#modal-second input[name="IsActive"]').prop('checked', true);
        $('#modal-second').modal({ backdrop: 'static', keyboard: false });
    });

    //$('.btnSync').click(function () {
    //    LoadAjaxAuth('POST',
    //        APP_CONFIG.Sync,
    //        {
    //        }
    //        , getCookie('_tk'), function (d, s) {
    //            if (d.hasError === true)
    //                setAlert(d.errors, 'Lỗi: ', '');
    //            else {
    //                setAlert('Thành công', 'Đông bộ dữ liệu');
    //                oTable.draw();
    //            }
    //        });
    //});

    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    })
    $('.btnSaveModal').click(function () {
        var fileExtension = ['jpg', 'jpge', 'png'];
        var filename = $('#DoctorImageUrl').val();
        var picture;
        if (filename.length == 0) {
            picture = null;
        } else {
            var extension = filename.replace(/^.*\./, '');
            if ($.inArray(extension, fileExtension) == -1) {
                setAlert('Chỉ chập nhận file ảnh .jpg, .jpge, .png', 'Lỗi: ');
                return false;
            }
            picture = $('#modal-default #DoctorImage').attr('src');
        }

        var id = $('#modal-default input[name="Id"]').val();
        var code = $('#modal-default input[name="Code"]').val();
        var name = $('#modal-default input[name="Name"]').val();
        var isActive = $('#modal-default input[name="IsActive"]').prop('checked') ? 1 : 0;       
        var departmentId = $('#modal-default select[name="DepartmentId"]').val();
        var degree = $('#modal-default select[name="Degree"]').val();
        var degreeshort = $('#modal-default input[name="DegreeShort"]').val();
        var gender = $('#modal-default select[name="Gender"]').val();
        var birthday = $('#modal-default input[name="Birthday"]').val();
        var phone = $('#modal-default input[name="Phone"]').val();
  
        LoadAjaxAuth('POST',
            id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddRow : APP_CONFIG.UpdateRow,
            {
                Degree_Id: degree,
                Degree_Short: degreeshort,               
                Is_Active: isActive,
                Name: name,
                Id: code,
                Department_Id: departmentId,
                Phone: phone,
                Birthday: birthday,
                Gender: gender,
                Picture: picture
            }
            , getCookie('_tk'), function (d, s) {
                if (d.result.hasError === true)
                    setAlert(d.result.errors, 'Lỗi: ', '');
                else {
                    $('#modal-default').modal('hide');
                    $('#modal-default #DoctorImage').attr('src', '');
                    $('#imgProfile').attr('src', '');
                    oTable.draw();
                }
            });
    });

    $('.btnSaveAccount').click(function () {
        var doctorId = $('#modal-account input[name="id"]').val();
 
        LoadAjaxAuth('POST',
           APP_CONFIG.AddAccount,
            {
                Id: doctorId,
                oldPassword: null,
                newPassword: $('#modal-account #password').val(),
                confirmPassword: $('#modal-account #confirmPassword').val(),
            }
            , getCookie('_tk'), function (d, s) {
                if (d.result.hasError === true)
                    setAlert(d.result.errors, 'Lỗi: ', '');
                else {
                    $('#modal-account').modal('hide');
                    setAlert('Thành công', 'Thêm tài khoản');
                    oTable.draw();
                }
            });
    });

    $('.btnSavePassword').click(function () {
        var doctorId = $('#modal-account input[name="id"]').val();
        var flag = $('#modal-changepwd #flag').val();
        if (flag == '1') {
            LoadAjaxAuth('POST',
                APP_CONFIG.AddAccount,
                {
                    Id: doctorId,
                    oldPassword: $('#modal-changepwd #oldPassword').val(),
                    newPassword: $('#modal-changepwd #newPassword').val(),
                    confirmPassword: $('#modal-changepwd #confirmPassword1').val(),
                }
                , getCookie('_tk'), function (d, s) {
                    if (d.result.hasError === true)
                        setAlert(d.result.errors, 'Lỗi: ', '');
                    else {
                        $('#modal-changepwd').modal('hide');
                        setAlert('Thành công: ', 'Thêm tài khoản');
                        oTable.draw();
                    }
                });
        }

    });

    $('.btnSaveRole').click(function () {
        var role = "";
        var id = $('#modal-role input[name="id"]').val();
        $('#roleCheckbox:checked').each(function () {
            role = role + $(this).val() + ',';
        });

        LoadAjaxAuth('POST',APP_CONFIG.AddRole, {
            doctorId: $('#modal-role input[name="id"]').val(),
            roleId: role
        }, getCookie('_tk'), function (d, s) {
            if (d.result.hasError === true)
                setAlert(d.result.errors, 'Lỗi: ', '');
            else {
                setAlert('Thành công', 'Cấp quyền ');
                $('#modal-default').modal('hide');
                oTable.draw();
            }
        });
    });

    $('.btnSaveHistoryModal').click(function () {
        var id = $('#modal-second input[name="HistoryId"]').val();
        var doctorId = $('#modal-History input[name="DoctorId"]').val();
        var isActive = $('#modal-second input[name="IsActive"]').prop('checked') ? 1 : 0;
        var startTime = $('#modal-second input[name="StartDate"]').val();
        var endTime = $('#modal-second input[name="EndDate"]').val();
        var title = $('#modal-second input[name="Title"]').val();

        LoadAjaxAuth('POST',
            id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddHistoryRow : APP_CONFIG.UpdateHistoryRow,
            {
                Id: id,
                Doctor_Id: doctorId,
                Is_Active: isActive,
                Title: title,
                Start_Time: startTime,
                End_Time: endTime
            }
            , getCookie('_tk'), function (d, s) {
                if (d.hasError === true)
                    setAlert(d.errors, 'Lỗi: ', '');
                else {
                    $('#modal-second').modal('hide');
                    $('#modal-History #startDate').val('');
                    
                    oTable1.draw();
                }
            });
    });

    $('#btnUpload').on('click', function () {
        var fileExtension = ['xls', 'xlsx'];
        var filename = $('#fUpload').val();
        if (filename.length == 0) {
            alert("Xin chọn file.");
            return false;
        }
        else {
            var extension = filename.replace(/^.*\./, '');
            if ($.inArray(extension, fileExtension) == -1) {
                setAlert('Chỉ chập nhận file excel.', 'Lỗi: ');
                return false;
            }
        }
        var fdata = new FormData();
        var fileUpload = $("#fUpload").get(0);
        var files = fileUpload.files;
        fdata.append('formFile', files[0]);
        $.ajax({
            type: "POST",
            url: '/Doctor/Import',

            data: fdata,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.hasErrors == true)
                    alert('Some error occured while uploading');
                else {
                    $('#modal-add').modal('hide');
                    oTable.draw();
                }
            },
        });

    });

    $('#fUpload').bind('change', function () {
        $('#File').val($('#fUpload').val());
    });

});

 //====== Create 13/06/2019 By Phu - START ======//

$(document).on('click', '.btnDetail', function () {
    var id = $(this).attr('data-id');
    $('#modal-EmployeeLeave input[name="EmployeeLeaveId"]').val(id);  // EmployeeId
    LoadAjaxAuth('POST', APP_CONFIG.GetDetail, {
        Doctor_Id: $(this).attr('data-id'),
        Year: $('#modal-EmployeeLeave select[name="Year"]').val()
    }, getCookie('_tk'), function (d,i) {
        loadDoctorLeaveTable(d);
    });
});

var loadDoctorLeaveTable = function (d) {
    //LoadAjaxAuth('POST', APP_CONFIG.GetDetail, {
        //Id: id,
        //Year: year
    //}, getCookie('_tk'), function (d, s) {
        //console.log(id, d);
        var tbl = $('#EmployeeLeaveTable tbody');
        tbl.empty();
        var rs = d.result.data;
    for (var i = 0; i < rs.length; i++) {
        if (rs[i].is_Active == 1) {
            tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].title + '</td>\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].start_Time.replace('T', ' ') + '</span> </td >\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].end_Time.replace('T', ' ') + '</span>\
                            </td>\
                            <td>\
                                <span class= "badge badge-success" > <i class="zmdi zmdi-check zmdi-hc-fw"></i></span >\
                            </td>\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEmployeeLeaveEdit" data-id="' + rs[i].id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>\
                            </td>\
                        </tr>');
        }
        else {
            tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].title + '</td>\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].start_Time.replace('T', ' ') + '</span> </td >\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].end_Time.replace('T', ' ') + '</span>\
                            </td>\
                            <td>\
                            </td>\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEmployeeLeaveEdit" data-id="' + rs[i].id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>\
                            </td>\
                        </tr>');
        }
    }
        $('#modal-EmployeeLeave').modal({ backdrop: 'static', keyboard: false });
};

$('.btnEmployeeLeaveFilter').click(function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetDetail, {
        Doctor_Id: $('#modal-EmployeeLeave input[name="EmployeeLeaveId"]').val(), 
        Year: $('#modal-EmployeeLeave select[name="Year"]').val()
    }, getCookie('_tk'), function (d) {
        loadDoctorLeaveTable1(d);
    });
});

var loadDoctorLeaveTable1 = function (d) {
    //LoadAjaxAuth('POST', APP_CONFIG.GetDetail, {
    //Id: id,
    //Year: year
    //}, getCookie('_tk'), function (d, s) {
    //console.log(id, d);
    var tbl = $('#EmployeeLeaveTable tbody');
    tbl.empty();
    var rs = d.result.data;
    for (var i = 0; i < rs.length; i++) {
        if (rs[i].is_Active == 1) {
            tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].title + '</td>\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].start_Time.replace('T00:00:00', '') + '</span> </td >\
                            <td>\
                            <td>\
                                <span class="badge badge-warning">Chưa thực hiện</span>\
                            </td>\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEmployeeLeaveEdit" data-id="' + rs[i].id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>\
                            </td>\
                        </tr>');
        }
        else {
            tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].title + '</td>\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].start_Time.replace('T00:00:00', '') + '</span> </td >\
                            <td>\
                                <span class="badge badge-primary">'+ rs[i].end_Time.replace('T00:00:00', '') + '</span>\
                            </td>\
                            <td>\
                                <span class="badge badge-success">Đã thực hiện</span>\
                            </td>\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEmployeeLeaveEdit" data-id="' + rs[i].id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>\
                            </td>\
                        </tr>');
        }   
    }
};
$(document).on('click', '.btnAddEmployeeLeave', function () {

    $('#modal-EmployeeLeave').modal('hide');

    var doctor_Id = $('#modal-EmployeeLeave input[name="EmployeeLeaveId"]').val();


    $('#modal-UpdateEmployeeLeave input[name="Id"]').val('');
    $('#modal-UpdateEmployeeLeave #hidden').addClass('hidden');
    $('#modal-UpdateEmployeeLeave #reason').removeClass('col-sm-6 m-b-10').addClass('col-sm-12 m-b-10');
    $('#modal-UpdateEmployeeLeave input[name="title"]').val('');
    $('#modal-UpdateEmployeeLeave input[name="EmployeeId"]').val(doctor_Id);
    $('#modal-UpdateEmployeeLeave input[name="StartTime"]').val('');
    $('#modal-UpdateEmployeeLeave input[name="EndTime"]').val('');
    $('#modal-UpdateEmployeeLeave input[name="StartWork"]').val('');
    $('#modal-UpdateEmployeeLeave input[name="EndWork"]').val('');
    $('#modal-UpdateEmployeeLeave input[name="IsActive"]').prop('checked', true);


    $('#modal-UpdateEmployeeLeave').modal({ backdrop: 'static', keyboard: false });
});
$(document).on('click', '.btnEmployeeLeaveEdit', function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetDetailById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d, s) {

        $('#modal-EmployeeLeave').modal('hide');

        var r = d.result.data;
        var sw = r.start_Time.split('T');
        var ew = r.end_Time.split('T');
        $('#modal-UpdateEmployeeLeave input[name="Id"]').val(r.id);
        $('#modal-UpdateEmployeeLeave input[name="name"]').val(r.name);
        $('#modal-UpdateEmployeeLeave input[name="title"]').val(r.title);
        $('#modal-UpdateEmployeeLeave input[name="EmployeeId"]').val(r.doctor_Id);
        $('#modal-UpdateEmployeeLeave input[name="StartTime"]').val(r.start_Time.split('T', 1));
        $('#modal-UpdateEmployeeLeave input[name="EndTime"]').val(r.end_Time.split('T', 1));
        $('#modal-UpdateEmployeeLeave input[name="StartWork"]').val(sw[1]);
        $('#modal-UpdateEmployeeLeave input[name="EndWork"]').val(ew[1]);
        $('#modal-UpdateEmployeeLeave input[name="IsActive"]').prop('checked', r.is_Active);

        $('#modal-UpdateEmployeeLeave').modal({ backdrop: 'static', keyboard: false });
    });

 
});

////Giải quyết vấn đề  Modal đầu không scroll khi modal 2 tắt
//$('body').on('hidden.bs.modal', '.modal', function (e) {
//    if ($('.modal').is(':visible')) { // check if first modal open 
//        $('body').addClass('modal-open'); // re-add class 'modal-open' to the body because it was removed when we close the second modal
//        $('.modal').focus(); // Focus first modal to activate scrollbar
//    }
//});
//// end

$('#modal-UpdateEmployeeLeave #Close').click(function () {

    $('#modal-EmployeeLeave').modal('show');
   
});
$('.btnSaveEmployeeLeave').click(function () {
    var id = $('#modal-UpdateEmployeeLeave input[name="Id"]').val();
    LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddRowEmployeeLeave : APP_CONFIG.UpdateRowEmployeeLeave, {
        Id: id,
        Title: $('#modal-UpdateEmployeeLeave input[name="title"]').val(),
        Doctor_Id: $('#modal-UpdateEmployeeLeave input[name="EmployeeId"]').val(),
        Start_Time: $('#modal-UpdateEmployeeLeave input[name="StartTime"]').val()+' '+ $('#modal-UpdateEmployeeLeave input[name="StartWork"]').val(),
        End_Time: $('#modal-UpdateEmployeeLeave input[name="EndTime"]').val() + ' ' + $('#modal-UpdateEmployeeLeave input[name="EndWork"]').val(),
        Is_Active: $('#modal-UpdateEmployeeLeave input[name="IsActive"]').prop('checked') ? 1: 0,

    }, getCookie('_tk'), function (d, s) {
        var r = d.result;
        if (r.hasError == true) {
            setAlert(r.errors, 'Lỗi: ', '');
        }  
        else {
            $('#modal-UpdateEmployeeLeave').modal('hide');

            LoadAjaxAuth('POST', APP_CONFIG.GetDetail, {
                Doctor_Id: $('#modal-EmployeeLeave input[name="EmployeeLeaveId"]').val(),
                Year: $('#modal-EmployeeLeave select[name="Year"]').val()
            }, getCookie('_tk'), function (response) {
                loadDoctorLeaveTable(response);
            });
        }
    });
});
 //====== Create 13/06/2019 By Phu - END ======//
