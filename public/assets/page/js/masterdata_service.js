﻿var listValueTypecode = "DV";
var dropdownlistcode = "NDV";
var listValueTypeId = "";
var loadData = function () {
    pTable = $('#serviceTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: true,
        sort: true,
        order: [[2, 'asc']],
        bInfo: true,
        bAutoWidth: true,
        ajax: {
            "url": APP_CONFIG.GetListValues + listValueTypecode,
            "type": "GET",
            "dataSrc": function (data) {
                return data.result.data;
            }
        },
        columns:
            [
                {
                    "data": "id",
                    "sClass": "left",
                    "bSearchable": true,
                    "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "code", "sClass": "left", "bSearchable": true, "bSortable": true, "width": "100px" },
                { "data": "description", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "type", "sClass": "left", "bSearchable": true, "bSortable": true, "width": "50px" },
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (full.is_active)
                            return '<button id="btnEdit" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-pencil" ></i ></button>\
                                <button id="btnDelete" class="btn btn-danger btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-trash-o"></i></button>\
                                <button id="btnActive" class="btn btn-success btn-xs" data-isActive="' + full.is_active + '" data-id="' + full.id + '"><i class="fa fa-check-circle"></i></button>'
                        return '<button id="btnEdit" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-pencil" ></i ></button>\
                                <button id="btnDelete" class="btn btn-danger btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-trash-o"></i></button>\
                                <button id="btnActive" class="btn btn-success btn-xs" data-isActive="' + full.is_active + '" data-id="' + full.id + '" > <i class="fa fa-circle"></i></button > '
                    },
                    "width": "150px"
                }


            ],
        buttons: []
    });
};

$(document).ready(function () {
    loadData();
    getListValueByCode(listValueTypecode);
    loadGroupService();
});

$(document).on('click', '#btnEdit', function () {
    resetValidation();
    LoadAjaxAuth('GET', APP_CONFIG.GetbyId + $(this).attr('data-id'), {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            $('#serviceModal input[name="id"]').val(result.id);
            $('#serviceModal input[name="code"]').val(result.code);
            $('#serviceModal input[name="description"]').val(result.description);
            $('#serviceModal select[name="GroupService"]').val(result.list_value_id);
            $('#serviceModal input[name="is_Active"]').prop('checked', result.is_active);
            $('#serviceModal input[name="is_System"]').prop('checked', result.is_system);
            $('#serviceModal').modal({ backdrop: 'static', keyboard: false });
        }
    });
});
$(document).on('click', '#btnAdd', function () {
    $('#serviceModal').modal({ backdrop: 'static', keyboard: false });
    resetValidation();
    clearData("#serviceModal");
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
        LoadAjaxAuth('POST', APP_CONFIG.CheckCodeUnique, {
            Id: $('#serviceModal input[name="id"]').val() == "" ? "1b287f11-f09d-4b55-9614-6ba2d0fd184f" : $('#serviceModal input[name="id"]').val(),
            Code: $('#serviceModal input[name="code"]').val()
        }, getCookie('_tk'), function (data, status) {
            if (status == 'success') {
                if (!data.result) {
                    var id = $('#serviceModal input[name="id"]').val();
                    if (id === null || id === undefined || id.length === 0) {
                        LoadAjaxAuth('POST', APP_CONFIG.Add, {
                            Code: $('#serviceModal input[name="code"]').val(),
                            Description: $('#serviceModal input[name="description"]').val(),
                            DisplayOrder: 0,
                            ListValueId: $('#serviceModal select[name="GroupService"]').val(),
                            IsActive: $('#serviceModal input[name="is_Active"]').prop('checked'),
                            IsSystem: $('#serviceModal input[name="is_System"]').prop('checked'),
                            ListValueTypeId: listValueTypeId,
                            Type: "TEK",
                        }, getCookie('_tk'), function (data, status) {
                            if (status == 'success') {
                                resetValidation();
                                loadData();
                                pTable.ajax.reload(null, false);
                            }
                        });
                    }
                    else {
                        LoadAjaxAuth('PUT', APP_CONFIG.Update, {
                            Id: id,
                            Code: $('#serviceModal input[name="code"]').val(),
                            Description: $('#serviceModal input[name="description"]').val(),
                            DisplayOrder: 0,
                            ListValueId: $('#serviceModal select[name="GroupService"]').val(),
                            IsActive: $('#serviceModal input[name="is_Active"]').prop('checked'),
                            IsSystem: $('#serviceModal input[name="is_System"]').prop('checked'),
                        }, getCookie('_tk'), function (data, status) {
                            if (status == 'success') {
                                resetValidation();
                                loadData();
                                pTable.ajax.reload(null, false);
                            }
                        });
                    }
                }
                else {
                    $("#validationCode").html("Mã dịch vụ đã tồn tại trong hệ thống");
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
    LoadAjaxAuth('DELETE', APP_CONFIG.Delete + $('#confirm-delete input[name="id"]').val(), {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            $('#confirm-delete').modal('hide');
            pTable.ajax.reload(null, false);
        }
    });
});

function clearData(modalName) {
    $(modalName)
        .find("input,textarea,select")
        .val('')
        .end();
    $('#serviceModal input[name="is_Active"]').prop('checked', true);
    $('#serviceModal input[name="is_System"]').prop('checked', true);
    $("#validationForm").removeClass('was-validated');
}

function resetValidation() {
    $("#validationCode").addClass('invalid-feedback');
    $("#validationForm").removeClass('was-validated');
    $("#validationCode").removeClass("error-validation");
    $("#code").removeClass("error-field");
    $('#serviceModal').modal('hide');
    $("#validationCode").html("Vui lòng nhập mã dịch vụ");
}

var loadGroupService = function () {
    LoadAjaxAuth('GET', APP_CONFIG.GetListValuesActivated + dropdownlistcode, {
    },
        getCookie('_tk'), function (data, status) {
            if (status == 'success') {
                var items = data.result.data;
                var gService = $('select[name="GroupService"], .modal select[name="Id"]');
                gService.html('');
                gService.append('<option value=""> Vui lòng chọn ...</option>');
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    gService.append('<option value="' + item.id + '"> ' + item.description + '</option>');
                }
            }
        });
};

function getListValueByCode(code) {
    LoadAjaxAuth('GET', APP_CONFIG.GetListValueByCode + code, {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            listValueTypeId = result.id;
        }
    });
};