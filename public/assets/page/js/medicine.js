var pTable;
var loadData = function () {
    var url = APP_CONFIG.GetTable;
    pTable = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: true,
        sort: true,
        bInfo: true,
        bAutoWidth: true,
        ajax:
        {
            "url": url,
            "type": "GET",
            "headers": { Authorization: getCookie('_tk') },
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "dataSrc": "result",
        },
        columns:
            [
                {
                    "title": "#",
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "title": "Mã", "data": "code", "bSearchable": true, "bSortable": true },
                { "title": "Tên", "data": "name", "bSearchable": true, "bSortable": true },
                { "title": "Phạm vi sử dụng", "data": "usageScope", "bSearchable": true, "bSortable": true },
                { "title": "Loại vật tư", "data": "type", "bSearchable": true, "bSortable": true},
                { "title": "Loại", "data": "dataType", "bSearchable": true, "bSortable": true },
                {
                    "title": "Chức năng",
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (full.isActive)
                            return '<button id="btnEdit" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-pencil" ></i ></button>\
                                <button id="btnDelete" class="btn btn-danger btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-trash-o"></i></button>\
                                <button id="btnActive" class="btn btn-success btn-xs" data-isActive="' + full.isActive + '" data-id="' + full.id + '"><i class="fa fa-check-circle"></i></button>'
                        return '<button id="btnEdit" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-pencil" ></i ></button>\
                                <button id="btnDelete" class="btn btn-danger btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-trash-o"></i></button>\
                                <button id="btnActive" class="btn btn-success btn-xs" data-isActive="' + full.isActive + '" data-id="' + full.id + '" > <i class="fa fa-circle"></i></button > '
                    }
                }
            ],
        buttons: []
    });
};

$(document).ready(function () {
    loadData();
});

$(document).on('click', '#btnEdit', function () {
    resetValidation();
    clearData("#pharmacy-modal");

    var url = APP_CONFIG.GetById + "?id=" + $(this).attr('data-id');
    LoadAjaxAuth('GET', url, { }, getCookie('_tk'), function (d, s) {
        var result = d.result;
        $('#medicine-modal input[name="id"]').val(result.id);
        $('#medicine-modal input[name="code"]').val(result.code);
        $('#medicine-modal input[name="name"]').val(result.name);
        $('#medicine-modal input[name="usageScope"]').val(result.usageScope);
        $('#medicine-modal input[name="type"]').val(result.type);
        $('#dataType').val(result.data_Type);
        $('#medicine-modal input[name="is_Active"]').prop('checked', result.is_Active);
        $('#medicine-modal').modal({ backdrop: 'static', keyboard: false });
    });
});
$(document).on('click', '#btnAdd', function () {
    $('#medicine-modal').modal({ backdrop: 'static', keyboard: false });
    resetValidation();
    clearData("#medicine-modal");
});

$(document).on('click', '#btnActive', function () {
    var url = APP_CONFIG.ChangeActive + "?id=" + $(this).attr('data-id') + "&isActive=" + $(this).attr('data-isActive');
    LoadAjaxAuth('PUT', url, { }, getCookie('_tk'), function (d, s) {
        if (d.success === false)
            setAlert(d.errors, 'Lỗi: ', '');
        else {
            $('#confirm-delete').modal('hide');
            pTable.ajax.reload(null, false);
        }
    });
});

$(document).on('click', '#btnDelete', function () {
    var id = $(this).attr('data-id');
    $('#confirm-delete input[name="id"]').val(id);
    $('#confirm-delete').modal({ backdrop: 'static', keyboard: false });
});

$('#btnSaveModal').click(function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        var url = APP_CONFIG.CheckCodeUnique + "?id=" + $('#medicine-modal input[name="id"]').val() + "&code=" + $('#medicine-modal input[name="code"]').val();
        LoadAjaxAuth('GET', url, { }, getCookie('_tk'), function (d, s) {
            if (d.success === false)
                setAlert(d.message, 'Lỗi: ', '');
            else {
                if (!d.result) {
                    var id = $('#medicine-modal input[name="id"]').val();
                    LoadAjaxAuth(id === null || id === undefined || id.length === 0 ? 'POST' : 'PUT',
                        id === null || id === undefined || id.length === 0 ? APP_CONFIG.Add : APP_CONFIG.Update + "?id=" + id, {
                        Code: $('#medicine-modal input[name="code"]').val(),
                        Name: $('#medicine-modal input[name="name"]').val(),
                        UsageScope: $('#medicine-modal input[name="usageScope"]').val(),
                        Type: $('#medicine-modal input[name="type"]').val(),
                        DataType: $("#dataType :selected").val(),
                        IsActive: $('#medicine-modal input[name="isActive"]').prop('checked')
                    }, getCookie('_tk'), function (d, s) {
                        if (d.success === false)
                            setAlert(d.message, 'Lỗi: ', '');
                        else {
                            resetValidation();
                            pTable.ajax.reload(null, false);
                        }
                    });
                }
                else {
                    $("#validationCode").html("Mã thuốc-vật tư đã tồn tại trong hệ thống");
                    $("#validationCode").removeClass('invalid-feedback');
                    $("#validationCode").addClass("error-validation");
                    $("#code").addClass("error-field");
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
    LoadAjaxAuth('DELETE', url, { }, getCookie('_tk'), function (d, s) {
        if (d.success === false)
            setAlert(d.errors, 'Lỗi: ', '');
        else {
            $('#confirm-delete').modal('hide');
            pTable.ajax.reload(null, false);
        }
    });
});

function clearData(modalName) {
    $(modalName)
        .find("input,textarea,select")
        .val('')
        .end()
    $("#validationForm").removeClass('was-validated');
    $('#dataType').val('TEK');
    $('#medicine-modal input[name="isActive"]').prop('checked', true);
}

function resetValidation() {
    $("#validationCode").addClass('invalid-feedback');
    $("#validationForm").removeClass('was-validated');
    $("#validationCode").removeClass("error-validation");
    $("#code").removeClass("error-field");
    $('#medicine-modal').modal('hide');
    $("#validationCode").html("Vui lòng nhập mã thuốc-vật tư");
}