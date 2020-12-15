var pTable;
var loadData = function () {
    var url = APP_CONFIG.GetTable;
    pTable = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        processing: true,
        serverSide: true,
        filter: true,
        sort: false,
        bInfo: false,
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
                    "title": "#",
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "tekmedi_card_number", "sClass": "left" },
                { "data": "tekmedi_uid", "sClass": "left" },
                { "data": "code", "bSearchable": true, "bSortable": true },
                { "data": "full_name", "bSearchable": true, "bSortable": true },
                {                     
                    "data": "gender", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data == 1 ? "Nam" : "Nữ";
                    } 
                },
                { 
                    "data": "birthday", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        if (full.birthday_year_only){
                            return data ? moment(data).format('YYYY') : "";
                        }
                        else{
                            return data ? moment(data).format('L') : "";
                        }
                    }
                },
                { "data": "province_name", "bSearchable": true, "bSortable": true },
                { "data": "district_name", "bSearchable": true, "bSortable": true },
                { "data": "ward_name", "bSearchable": true, "bSortable": true },
                { "data": "ic_number", "bSearchable": true, "bSortable": true },
                { 
                    "data": "ic_issued_date",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
                { "data": "ic_issued_place", "bSearchable": true, "bSortable": true },
                { "data": "phone", "bSearchable": true, "bSortable": true },
                { 
                    "data": "top_up_amount", 
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });;
                    } 
                },
                { 
                    "data": "payment_amount",
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });;
                    }
                },
                { 
                    "data": "balance",
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });;
                    }
                },
                { "data": "health_insurance_number", "bSearchable": true, "bSortable": true },
                { "data": "health_insurance_first_place_code", "bSearchable": true, "bSortable": true },
                { "data": "health_insurance_first_place", "bSearchable": true, "bSortable": true },
                { 
                    "data": "health_insurance_issued_date",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
                { 
                    "data": "health_insurance_expired_date",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
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
                    }
                }
            ],
        buttons: []
    });
};

async function getLocations() {
    LoadAjaxAuth('GET', APP_CONFIG.GetLocations, {}, getCookie('_tk'), function (d, s) {
        if (s === 'success') {
            APP_CONFIG.Locations = d.result;
            populateProvincesSelect($(".province_select"));
        }
    })
}

function populateProvincesSelect($select = $("select.province_select"), data = APP_CONFIG.Locations) {
    
    populateSelect($select, 'Chọn tỉnh', data.map(c => ({
        'value': c.provinceCode,
        'text': c.provinceName
    })));
}

function populateDistrictsSelect($select = $("select.district_select"),  provinceCode , data = APP_CONFIG.Locations,) {
    const province = data.find(d=>d.provinceCode === provinceCode);
    if(province === undefined){
        data = [];
    }else{
        data = province.districts;
    }
    populateSelect($select, 'Chọn quận', data.map(c => ({
        'value': c.districtCode,
        'text': c.districtName
    })));
}

function populateBlocksSelect($select = $("select.block_select"),  provinceCode,districtCode,data = APP_CONFIG.Locations,) {
    const province = data.find(d=>d.provinceCode === provinceCode);
    if(province === undefined){
        data = [];
    }else{
        const district = province.districts.find(d=>d.districtCode === districtCode);
        if(district === undefined){
            data = [];
        }else{
            data = district.wards;
        }
    }
    populateSelect($select, 'Chọn phường xã', data.map(c => ({
        'value': c.wardCode,
        'text': c.wardName
    })));
}

$(document).ready(init);

function init() {
    loadData();
    getLocations();

    $(".province_select").on('change', function () {
       const province = $(this).val();
       APP_CONFIG.SelectedProvince = province;
       populateDistrictsSelect($("select.district_select"), province);
       populateBlocksSelect($("select.block_select"));
    });

    $(".district_select").on('change', function () {
       const district = $(this).val();
       const province = APP_CONFIG.SelectedProvince;
       populateBlocksSelect($("select.block_select"), province, district);
    });
}

$(document).on('click', '#btnEdit', function () {
    $('#patient-modal input[name="tekmedi_card_number"]').prop('readonly', true);
    $('#patient-modal input[name="tekmedi_uid"]').prop('readonly', true);
    $('#patient-modal input[name="code"]').prop('readonly', true);
    resetValidation();
    LoadAjaxAuth('GET', APP_CONFIG.GetById + '?id=' + $(this).attr('data-id'), {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            $('#patient-modal input[name="id"]').val(result.id);
            $('#patient-modal input[name="tekmedi_card_number"]').val(result.tekmedi_card_number);
            $('#patient-modal input[name="tekmedi_uid"]').val(result.tekmedi_uid);
            $('#patient-modal input[name="code"]').val(result.code);
            $('#patient-modal input[name="last_name"]').val(result.last_name);
            $('#patient-modal input[name="first_name"]').val(result.first_name);
            $('#patient-modal select[name="gender"]').val(result.gender);
            $('#patient-modal input[name="birthday"]').val(moment(result.birthday).format('YYYY-MM-DD'));
            $('#patient-modal input[name="birthday_year_only"]').prop('checked', result.birthday_year_only);
            $('#patient-modal select[name="province_code"]').val(result.province_id);
            populateDistrictsSelect($("select.district_select"), result.province_id);
            $('#patient-modal select[name="district_code"]').val(result.district_id);
            populateBlocksSelect($("select.block_select"), result.province_id, result.district_id);
            $('#patient-modal select[name="ward_code"]').val(result.ward_id);
            $('#patient-modal input[name="ic_number"]').val(result.ic_number);
            $('#patient-modal input[name="ic_issued_date"]').val(moment(result.ic_issued_date).format('YYYY-MM-DD'));
            $('#patient-modal input[name="ic_issued_place"]').val(result.ic_issued_place);
            $('#patient-modal input[name="phone"]').val(result.phone);
            $('#patient-modal input[name="health_insurance_number"]').val(result.health_insurance_number);
            $('#patient-modal input[name="health_insurance_first_place_code"]').val(result.health_insurance_first_place_code);
            $('#patient-modal input[name="health_insurance_first_place"]').val(result.health_insurance_first_place);
            $('#patient-modal input[name="health_insurance_issued_date"]').val(moment(result.health_insurance_issued_date).format('YYYY-MM-DD'));
            $('#patient-modal input[name="health_insurance_expired_date"]').val(moment(result.health_insurance_expired_date).format('YYYY-MM-DD'));
            $('#patient-modal input[name="is_active"]').prop('checked', result.is_active);
            $('#patient-modal').modal({ backdrop: 'static', keyboard: false });
        }
    });
});
$(document).on('click', '#btnAdd', function () {
    $('#patient-modal input[name="tekmedi_card_number"]').prop('readonly', true);
    $('#patient-modal input[name="tekmedi_uid"]').prop('readonly', false);
    $('#patient-modal input[name="code"]').prop('readonly', false);
    $('#patient-modal').modal({ backdrop: 'static', keyboard: false });
    resetValidation();
    clearData("#patient-modal");
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
            Id: $('#patient-modal input[name="id"]').val() == "" ? '00000000-0000-0000-0000-000000000000' : $('#patient-modal input[name="id"]').val(),
            Code: $('#patient-modal input[name="code"]').val()
        }, getCookie('_tk'), function (data, status) {
            if (status == 'success') {
                if (!data.result) {
                    var id = $('#patient-modal input[name="id"]').val();
                    if (id === null || id === undefined || id.length === 0) {
                        LoadAjaxAuth('POST', APP_CONFIG.Add, {
                            tekmedi_uid: $('#patient-modal input[name="tekmedi_uid"]').val(),
                            code: $('#patient-modal input[name="code"]').val(),
                            last_name: $('#patient-modal input[name="last_name"]').val(),
                            first_name: $('#patient-modal input[name="first_name"]').val(),
                            gender: $('#patient-modal select[name="gender"]').val(),
                            birthday: $('#patient-modal input[name="birthday"]').val(),
                            birthday_year_only: $('#patient-modal input[name="birthday_year_only"]').prop('checked'),
                            province_id: $('#patient-modal select[name="province_code"]').val(),
                            district_id: $('#patient-modal select[name="district_code"]').val(),
                            ward_id: $('#patient-modal select[name="ward_code"]').val(),
                            ic_number: $('#patient-modal input[name="ic_number"]').val(),
                            ic_issued_date: $('#patient-modal input[name="ic_issued_date"]').val(),
                            ic_issued_place: $('#patient-modal input[name="ic_issued_place"]').val(),
                            phone: $('#patient-modal input[name="phone"]').val(),
                            health_insurance_number: $('#patient-modal input[name="health_insurance_number"]').val(),
                            health_insurance_first_place_code: $('#patient-modal input[name="health_insurance_first_place_code"]').val(),
                            health_insurance_first_place: $('#patient-modal input[name="health_insurance_first_place"]').val(),
                            health_insurance_issued_date: $('#patient-modal input[name="health_insurance_issued_date"]').val(),
                            health_insurance_expired_date: $('#patient-modal input[name="health_insurance_expired_date"]').val(),
                            is_active: $('#patient-modal input[name="is_active"]').prop('checked')
                        }, getCookie('_tk'), function (data, status) {
                            if (status == 'success') {
                                resetValidation();
                                pTable.ajax.reload(null, false);
                            }
                        });
                    }
                    else {
                        LoadAjaxAuth('PUT', APP_CONFIG.Update + id, {
                            last_name: $('#patient-modal input[name="last_name"]').val(),
                            first_name: $('#patient-modal input[name="first_name"]').val(),
                            gender: $('#patient-modal select[name="gender"]').val(),
                            birthday: $('#patient-modal input[name="birthday"]').val(),
                            birthday_year_only: $('#patient-modal input[name="birthday_year_only"]').prop('checked'),
                            province_id: $('#patient-modal select[name="province_code"]').val(),
                            district_id: $('#patient-modal select[name="district_code"]').val(),
                            ward_id: $('#patient-modal select[name="ward_code"]').val(),
                            ic_number: $('#patient-modal input[name="ic_number"]').val(),
                            ic_issued_date: $('#patient-modal input[name="ic_issued_date"]').val(),
                            ic_issued_place: $('#patient-modal input[name="ic_issued_place"]').val(),
                            phone: $('#patient-modal input[name="phone"]').val(),
                            health_insurance_number: $('#patient-modal input[name="health_insurance_number"]').val(),
                            health_insurance_first_place_code: $('#patient-modal input[name="health_insurance_first_place_code"]').val(),
                            health_insurance_first_place: $('#patient-modal input[name="health_insurance_first_place"]').val(),
                            health_insurance_issued_date: $('#patient-modal input[name="health_insurance_issued_date"]').val(),
                            health_insurance_expired_date: $('#patient-modal input[name="health_insurance_expired_date"]').val(),
                            is_active: $('#patient-modal input[name="is_active"]').prop('checked')
                        }, getCookie('_tk'), function (data, status) {
                            if (status == 'success') {
                                resetValidation();
                                pTable.ajax.reload(null, false);
                            }
                        });
                    }
                }
                else {
                    $("#validationCode").html("Mã bệnh nhân đã tồn tại trong hệ thống");
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
    LoadAjaxAuth('DELETE', APP_CONFIG.Delete + '?id=' + $('#confirm-delete input[name="id"]').val(), {
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
    $('#patient-modal input[name="birthday_year_only"]').prop('checked', false);
    $('#patient-modal input[name="is_active"]').prop('checked', true);
    $("#validationForm").removeClass('was-validated');
}

function resetValidation() {
    $("#validationCode").addClass('invalid-feedback');
    $("#validationForm").removeClass('was-validated');
    $("#validationCode").removeClass("error-validation");
    $("#code").removeClass("error-field");
    $('#patient-modal').modal('hide');
}

$(document).on('click', '#btnExport', function () {
    $('#waiting-modal').modal({ backdrop: 'static', keyboard: false });
    LoadAjaxAuth('POST', APP_CONFIG.Export, {
        EmployeeId: getCookie('_id'),
        EmployeeName: getCookie("_full_name")
    }, getCookie('_tk'), function (d, s) {
        $('#waiting-modal').modal('hide');
        if (d.success) {
            var result = d.result;
            download(APP_CONFIG.BaseUrl + "/" + result.filePath, result.fileName);
        }
        else {
            toastr.error('Export thất bại');
        }
    });
});

function download(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
}