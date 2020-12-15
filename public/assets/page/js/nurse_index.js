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
                {
                    "data": "is_active",
                    "bSearchable": false,
                    "bSortable": true,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (data == 1)
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
                                <a class="btn btn-info btn-sm btn--icon-text btnSupportDoctor" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Hỗ trợ bác sĩ</a></br>\
                                <a class="btn btn-warning btn-sm btn--icon-text btnAddAccount" data-id="' + full.id + '" > <i class="zmdi zmdi-edit zmdi-hc-fw"></i> Thêm tài khoản</a ></br >\
                                <a class="btn btn-danger btn-sm btn--icon-text btnRole" data-id="' + full.id + '" > <i class="zmdi zmdi-edit zmdi-hc-fw"></i> Quyền truy cập</a >';
                    }
                }

            ],
        buttons: []
    });
};

var oTable1;
var loadData1 = function (a) {
    var url = APP_CONFIG.GetAllDoctorSupported;
     oTable1 = $('#DoctorTable').DataTable({
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
                d.Is_Active = $('#modal-doctorsupport select[name="IsActive"]').val();
                d.Name = $('#modal-doctorsupport input[name="Name"]').val();
                d.Department_Id = $('#modal-doctorsupport select[name="DepartmentType"]').val();
                d.Degree = $('#modal-doctorsupport select[name="DegreeType"]').val();
                d.Nurse_Id = $('#nurseId').val();
                d.Status = a;
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
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnAddSupport" data-id="' + full.id + '" onclick = "cancelDoctorSupport(this)"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Hủy</a></br>';
                    }
                }

            ],
        buttons: []
    });
};


var oTable2;
var loadData2 = function (a) {
    var url = APP_CONFIG.GetAllDoctorSupported;
    oTable2 = $('#DoctorNotSupportTable').DataTable({
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
                d.Is_Active = $('#modal-doctornotsupport select[name="IsActive"]').val();
                d.Name = $('#modal-doctornotsupport input[name="Name"]').val();
                d.Department_Id = $('#modal-doctornotsupport select[name="DepartmentType"]').val();
                d.Degree = $('#modal-doctornotsupport select[name="DegreeType"]').val();
                d.Nurse_Id = $('#nurseId').val();
                d.Status = a;
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
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnAddNotSupport" data-id="'+full.id+'" onclick="addDoctorSupport(this)"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chọn</a></br>';
                    }
                }

            ],
        buttons: []
    });
};

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
                sel.append('<option value="' + item.trim() + '"> ' + item + '</option>');
            }
        });
};

$(document).on('click', '.btnSupportDoctor', function () {
    $('#modal-doctorsupport #nurseId').val($(this).attr('data-id'));
    loadData1(true);
    oTable1.draw();
    $('#modal-doctorsupport').modal({ backdrop: 'static', keyboard: false });
});

function closeDoctorNotSupportModal() {
    loadData1(true);
    oTable1.draw();
    $('#modal-doctornotsupport').modal('hide');
    $('#modal-doctorsupport').modal({ backdrop: 'static', keyboard: false });

}
function addDoctorSupport(a) {
    console.log($(a).attr('data-id'));
    LoadAjaxAuth('POST', APP_CONFIG.AddDoctorSupport, {
        NurseId: $('#modal-doctorsupport #nurseId').val(),
        DoctorId: $(a).attr('data-id'),
        Status: true
    }, getCookie('_tk'), function (d, s) {
        oTable2.draw();
    });
}
function cancelDoctorSupport(a) {
    LoadAjaxAuth('POST', APP_CONFIG.AddDoctorSupport, {
        NurseId: $('#modal-doctorsupport #nurseId').val(),
        DoctorId: $(a).attr('data-id'),
        Status: false
    }, getCookie('_tk'), function (d, s) {
        oTable1.draw();
    });
}
// Thêm dịch vụ button
$(document).on('click', '.btnListDoctorNotSupported', function () {
    loadData2(false);
    oTable2.draw();
    $('#modal-doctorsupport').modal('hide');
    $('#modal-doctornotsupport').modal('show');
});


$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="Id"]').prop('disabled', true);
    LoadAjaxAuth('POST', APP_CONFIG.GetById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.result.data;
        var bd = r.birthday.split('T');
        var img = r.avatar == null ? '/Media/NurseImg/nurse-default.png' : r.avatar;
        $('#modal-default input[name="id"]').val(r.id);
        $('#modal-default input[name="Id"]').val(r.id).prop('disabled',true);
        $('#modal-default input[name="Name"]').val(r.name);
        $('#modal-default select[name="Gender"]').val(r.gender).trigger('change');
        $('#modal-default input[name="Birthday"]').val(bd[0]);
        $('#modal-default input[name="Phone"]').val(r.phone);
        $('#NurseImage').attr('src', img);
        $('#NurseImageUrl').val('');
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
    $('#modal-account').modal('hide');
    $('#modal-changepwd input[name="oldPassword"]').val('');
    $('#modal-changepwd input[name="newPassword"]').val('');
    $('#modal-changepwd input[name="confirmPassword"]').val('');
    $('#modal-changepwd').modal('show');
});

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
    LoadAjaxAuth('POST', APP_CONFIG.GetAllNurseRole,
        {
            nurseId: $(this).attr('data-id')
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

$(document).ready(function () {
    loadData();
    loadRole();
    loadSel();
    $(".select2").select2();
    $('.btnFilter').click(function () { oTable.draw(); });
    $('.btnListDoctorSupportedFilter').click(function () { oTable1.draw(); });
    $('.btnListDoctorNotSupportFilter').click(function () { oTable2.draw(); });
    $('.btnAddExcel').click(function () {
        $('#modal-add').modal({ backdrop: 'static', keyboard: false });
    });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#modal-default input[name="id"]').val('');
        $('#modal-default input[name="Id"]').val('').prop('disabled', false);
        $('#modal-default input[name="Name"]').val('');
        $('#modal-default select[name="Gender"]').val('').trigger('change');
        $('#modal-default input[name="Birthday"]').val('');
        $('#modal-default input[name="Phone"]').val('');
        $('#NurseImage').attr('src', '/Media/NurseImg/nurse-default.png');
        $('#NurseImageUrl').val('');   
        $('#modal-default input[name="IsActive"]').prop('checked', true);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    $('.btnSaveModal').click(function () {
        var fileExtension = ['jpg', 'jpge', 'png'];
        var filename = $('#NurseImageUrl').val();
        var picture;
        if (filename.length == 0) {
            picture = null;
        } else {
            var extension = filename.replace(/^.*\./, '');
            if ($.inArray(extension, fileExtension) == -1) {
                setAlert('Chỉ chập nhận file ảnh .jpg, .jpge, .png', 'Lỗi: ');
                return false;
            }
            picture = $('#modal-default #NurseImage').attr('src');
        }

        var id = $('#modal-default input[name="id"]').val();
        LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddRow : APP_CONFIG.UpdateRow, {
            Name: $('#modal-default input[name="Name"]').val(),
            Gender: $('#modal-default select[name="Gender"]').val(),
            Birthday: $('#modal-default input[name="Birthday"]').val(),
            Phone: $('#modal-default input[name="Phone"]').val(),
            Id: $('#modal-default input[name="Id"]').val(),
            Is_Active: $('input[name="IsActive"]').prop('checked') ? 1 : 0,
            Picture: picture
        }, getCookie('_tk'), function (d, s) {
            if (d.hasError === true)
                setAlert(d.errors, 'Lỗi: ', '');
            else {
                $('#modal-default').modal('hide');
                oTable.draw();
            }
        });
    });

    $('.btnSaveAccount').click(function () {
        var nurseId = $('#modal-account input[name="id"]').val();

        LoadAjaxAuth('POST',
            APP_CONFIG.AddAccount,
            {
                Id: nurseId,
                oldPassword: null,
                newPassword: $('#modal-account #password').val(),
                confirmPassword: $('#modal-account #confirmPassword').val(),
            }
            , getCookie('_tk'), function (d, s) {
                if (d.result.hasError === true)
                    setAlert(d.result.errors, 'Lỗi: ', '');
                else {
                    $('#modal-account').modal('hide');
                    setAlert('Thành công: ', 'Thêm tài khoản');
                    oTable.draw();
                }
            });
    });

    $('.btnSavePassword').click(function () {
        var nurseId = $('#modal-account input[name="id"]').val();
            LoadAjaxAuth('POST',
                APP_CONFIG.AddAccount,
                {
                    Id: nurseId,
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
        
       
    });

    $('.btnSaveRole').click(function () {
        var role = "";
        var id = $('#modal-role input[name="id"]').val();
        $('#roleCheckbox:checked').each(function () {
            role = role + $(this).val() + ',';
        });

        LoadAjaxAuth('POST', APP_CONFIG.AddRole, {
            nurseId: $('#modal-role input[name="id"]').val(),
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
                alert("Chỉ chập nhận file excel.");
                return false;
            }
        }
        var fdata = new FormData();
        var fileUpload = $("#fUpload").get(0);
        var files = fileUpload.files;
        fdata.append('formFile', files[0]);
        $.ajax({
            type: "POST",
            url: '/Nurse/Import',

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