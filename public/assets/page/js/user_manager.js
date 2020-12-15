var loadData = function () {
    var url = APP_CONFIG.GetAll;
    pTable = $('#userManagerTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        processing: true,
        serverSide: true,
        filter: false,
        order: [[3, 'asc']],
        sort: false,
        bInfo: true,
        bAutoWidth: true,
        scrollX: true,
        scrollCollapse: true,
        ajax:
        {
            "url": url,
            "type": "POST",
            "headers": { Authorization: getCookie('_tk') },
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": function (d) {
                return JSON.stringify(d);
            }
        },
        columns:
            [
                {
                    "data": "id",
                    "sClass": "left",
                    "bSearchable": false,
                    "bSortable": false,
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "image_url", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "user_name", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "code", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "full_name", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "email", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "phone", "sClass": "left", "bSearchable": true, "bSortable": true },
                {
                    "data": "sex", "sClass": "left", "bSearchable": true, "bSortable": true, "mRender": function (data, type, full, meta) {
                        return full.sex == 1 ? 'Nam' : 'Nữ';
                    }
                },
                {
                    "data": "birthdate", "sClass": "left", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return moment(data).format("DD/MM/YYYY");
                    }
                },
                { "data": "title_description", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "position_description", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "data_type", "sClass": "left", "bSearchable": true, "bSortable": true },
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (full.is_active)
                            return '<button id="btnEdit" title="Sửa" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-pencil" ></i ></button>\
                                <button id="btnDelete" title="Xóa" class="btn btn-danger btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-trash-o"></i></button>\
                                <button id="btnActive" title="Hủy kích hoạt" class="btn btn-success btn-xs" data-isActive="' + full.is_active + '" data-id="' + full.id + '"><i class="fa fa-check-circle"></i></button>\
                                <button id="btnResetPass" title="Đặt lại mật khẩu" class="btn btn-warning btn-xs" data-id="' + full.id + '"><i class="fa fa-undo"></i></button>'
                        return '<button id="btnEdit" title="Sửa" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-pencil" ></i ></button>\
                                <button id="btnDelete" title="Xóa" class="btn btn-danger btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-trash-o"></i></button>\
                                <button id="btnActive" title="Kích hoạt" class="btn btn-success btn-xs" data-isActive="' + full.is_active + '" data-id="' + full.id + '" > <i class="fa fa-circle"></i></button > \
                                <button id="btnResetPass" title="Đặt lại mật khẩu" class="btn btn-warning btn-xs" data-id="' + full.id + '"><i class="fa fa-undo"></i></button>'
                    }
                }


            ],
        buttons: []
    });
};

$(document).ready(function () {
    loadData();
    loadTitleService();
    loadPositionService();
    loadRoles();
});

$(document).on('click', '#btnEdit', function () {

    var url = APP_CONFIG.GetById + "?id=" + $(this).attr('data-id');
    LoadAjaxAuth('GET', url, {}, getCookie('_tk'), function (d, s) {
        var result = d.result;
        $('#userManagerModal input[name="id"]').val(result.id);
        $('#dataType').val(result.data_type);
        $('#userManagerModal input[name="email"]').val(result.email);
        $('#userManagerModal input[name="phone"]').val(result.phone);
        $('#userManagerModal input[name="user_name"]').val(result.user_name);
        $('#userManagerModal input[name="code"]').val(result.code);
        $('#userManagerModal select[name="sex"]').val(result.sex);
        var birthdate = new Date(result.birthdate);
        var birthdateValue = birthdate.toISOString().substr(0, 10);
        $('#userManagerModal input[name="birthdate"]').val(birthdateValue);
        $('#userManagerModal select[name="title"]').val(result.title);
        $('#userManagerModal select[name="position"]').val(result.position);
        $('#userManagerModal input[name="full_name"]').val(result.full_name);
        $('#userManagerModal input[name="is_active"]').prop('checked', result.is_active);
        $('#userManagerModal').modal({ backdrop: 'static', keyboard: false });
    });
});
$(document).on('click', '#btnAdd', function () {
    $('#userManagerModal').modal({ backdrop: 'static', keyboard: false });
    resetValidation();
    clearData("#userManagerModal");
});

$(document).on('click', '#btnActive', function () {
    LoadAjaxAuth('POST', APP_CONFIG.ChangeActive, {
        Id: $(this).attr('data-id'),
        IsActive: $(this).attr('data-isActive')
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            pTable.ajax.reload(null, false);
        }
    });
});

$(document).on('click', '#btnDelete', function () {
    var id = $(this).attr('data-id');
    $('#confirm-delete input[name="id"]').val(id);
    $('#confirm-delete').modal({ backdrop: 'static', keyboard: false });
});

$(document).on('click', '#btnResetPass', function () {
    var id = $(this).attr('data-id');
    $('#confirm-reset input[name="id"]').val(id);
    $('#confirm-reset').modal({ backdrop: 'static', keyboard: false });
});

$('#btnSaveModal').click(function () {
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        var id = $('#userManagerModal input[name="id"]').val() == "" ? '00000000-0000-0000-0000-000000000000' : $('#userManagerModal input[name="id"]').val();
        LoadAjaxAuth('POST', APP_CONFIG.CheckUserNameUnique, {
            Id: id,
            UserName: $('#userManagerModal input[name="user_name"]').val()
        }, getCookie('_tk'), function (data, status) {
            if (status == 'success') {
                if (!data.result) {
                    LoadAjaxAuth('POST', APP_CONFIG.CheckCodeUnique, {
                        Id: id,
                        Code: $('#userManagerModal input[name="code"]').val()
                    }, getCookie('_tk'), function (data, status) {
                        if (status == 'success') {
                            if (!data.result) {
                                LoadAjaxAuth(id === '00000000-0000-0000-0000-000000000000' ? 'POST' : 'PUT',
                                    id === '00000000-0000-0000-0000-000000000000' ? APP_CONFIG.Add : APP_CONFIG.Update + "?id=" + id, {
                                    Id: id,
                                    Type: $('#userManagerModal input[name="type"]').val(),
                                    Email: $('#userManagerModal input[name="email"]').val(),
                                    Phone: $('#userManagerModal input[name="phone"]').val(),
                                    User_Name: $('#userManagerModal input[name="user_name"]').val(),
                                    Code: $('#userManagerModal input[name="code"]').val(),
                                    Sex: $('#userManagerModal select[name="sex"]').val(),
                                    Birthdate: $('#userManagerModal input[name="birthdate"]').val(),
                                    Title: $('#userManagerModal select[name="title"]').val(),
                                    Position: $('#userManagerModal select[name="position"]').val(),
                                    Full_Name: $('#userManagerModal input[name="full_name"]').val(),
                                    Data_Type: $("#dataType :selected").val(),
                                    Is_Active: $('#userManagerModal input[name="is_active"]').prop('checked'),
                                }, getCookie('_tk'), function (data, status) {
                                    if (status == 'success') {
                                        resetValidation();
                                        pTable.ajax.reload(null, false);
                                    }
                                });
                            }
                            else {
                                $("#validationCode").html("Mã nhân viên đã tồn tại trong hệ thống");
                                $("#validationCode").removeClass('invalid-feedback');
                                $("#validationCode").addClass("error-validation");
                                $("#code").addClass("error-field");
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    });
                }
                else {
                    $("#validationUserName").html("Tên đăng nhập đã tồn tại trong hệ thống");
                    $("#validationUserName").removeClass('invalid-feedback');
                    $("#validationUserName").addClass("error-validation");
                    $("#user_name").addClass("error-field");
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            form.classList.add('was-validated');
        });
    });
});

$('#btnDeleteModal').click(function () {
    var url = APP_CONFIG.Delete + "?id=" + $('#confirm-delete input[name="id"]').val();
    LoadAjaxAuth('DELETE', url, {}, getCookie('_tk'), function (d, s) {
        if (d.success) {
            toastr.success("Xóa thành công");
            pTable.ajax.reload(null, false);
        }
        else {
            var result = d.responseJSON;
            toastr.error(result.message);
        }

        $('#confirm-delete').modal('hide');
    });
});

$('#btnResetModal').click(function () {
    var url = APP_CONFIG.ResetDefaultPassword + $('#confirm-reset input[name="id"]').val();
    LoadAjaxAuth('POST', url, {}, getCookie('_tk'), function (d, s) {
        if (d.success) {
            toastr.success("Đặt lại mật khẩu thành công");
            pTable.ajax.reload(null, false);
        }
        else {
            var result = d.responseJSON;
            toastr.error(result.message);
        }

        $('#confirm-reset').modal('hide');
    });
});

function clearData(modalName) {
    $(modalName)
        .find("input,textarea,select")
        .val('')
        .end()
    $("#validationForm").removeClass('was-validated');
    $('#dataType').val('TEK');
    $('#userManagerModal input[name="isActive"]').prop('checked', true);
}

function resetValidation() {
    $("#validationUserName").addClass('invalid-feedback');
    $("#validationCode").addClass('invalid-feedback');
    $("#validationForm").removeClass('was-validated');
    $("#validationUserName").removeClass("error-validation");
    $("#validationCode").removeClass("error-validation");
    $("#user_name").removeClass("error-field");
    $("#code").removeClass("error-field");
    $('#userManagerModal').modal('hide');
    $("#validationUserName").html("Vui lòng nhập tên đăng nhập");
    $("#validationCode").html("Vui lòng nhập mã nhân viên");
}

var loadTitleService = function () {
    LoadAjaxAuth('GET',
        APP_CONFIG.GetTitleService, {},
        getCookie('_tk'), function (d, s) {
            var gService = $('select[name="title"], .modal select[name="Id"]');
            gService.html('');
            gService.append('<option value=""> Vui lòng chọn ...</option>');

            var data = d.result.data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                gService.append('<option value="' + item.id + '"> ' + item.description + '</option>');
            }
        });
};

var loadPositionService = function () {
    LoadAjaxAuth('GET',
        APP_CONFIG.GetPositionService, { },
        getCookie('_tk'), function (d, s) {
            var gService = $('select[name="position"], .modal select[name="Id"]');
            gService.html('');
            gService.append('<option value=""> Vui lòng chọn ...</option>');

            var data = d.result.data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                gService.append('<option value="' + item.id + '"> ' + item.description + '</option>');
            }
        });
};