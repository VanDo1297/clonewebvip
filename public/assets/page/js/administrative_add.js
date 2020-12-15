function getLocations() {
    LoadAjaxAuth('POST', APP_CONFIG.GetLocations, {}, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            APP_CONFIG.Locations = d;
            populateProvincesSelect($(".province_select"));
            // populateDistrictsSelect($(".district_select"));
            // populateBlocksSelect($(".block_select"));
        }

    })
}

function populateProvincesSelect($select = $("select.province_select"), data = APP_CONFIG.Locations) {

    populateSelect($select, 'Chọn tỉnh', data.map(c => ({
        'value': c.provinceCode,
        'text': c.provinceName
    })));
}

function populateDistrictsSelect($select = $("select.district_select"), provinceCode, data = APP_CONFIG.Locations,) {
    const province = data.find(d => d.provinceCode === provinceCode);
    if (province === undefined) {
        data = [];
    } else {
        data = province.districts;
    }
    populateSelect($select, 'Chọn quận', data.map(c => ({
        'value': c.districtCode,
        'text': c.districtName
    })));
}

function populateBlocksSelect($select = $("select.block_select"), provinceCode, districtCode, data = APP_CONFIG.Locations,) {
    const province = data.find(d => d.provinceCode === provinceCode);
    if (province === undefined) {
        data = [];
    } else {
        const district = province.districts.find(d => d.districtCode === districtCode);
        if (district === undefined) {
            data = [];
        } else {
            data = district.wards;
        }
    }
    populateSelect($select, 'Chọn phường xã', data.map(c => ({
        'value': c.wardCode,
        'text': c.wardName
    })));
}

function init() {
    $("#MainTable").DataTable().state.clear();
    getLocations();
    // getPatients();
    $(".select2").select2();
    $('.btnFilter').click(function () {
        // oTable.draw();
    });
    // $('.date-picker').datepicker({
    //     dateFormat: 'mm/dd/yyyy'
    // });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#File').val('');
        $('#modal-add').modal({backdrop: 'static', keyboard: false});
    });
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
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

    $('#fUpload').bind('change', function () {
        $('#File').val($('#fUpload').val());
    });


    //setInterval(getClipboard, 1000);
}


const getProvinceName = function (code) {
    const provinces = APP_CONFIG.Locations.filter(location => location.provinceCode === code);
    if (provinces[0] !== undefined) {
        return provinces[0].province;
    }
};
const getDistrictName = function (provinceCode, code) {
    const districts = APP_CONFIG.Locations.filter(location => location.provinceCode === provinceCode && location.districtCode === code);
    if (districts[0] !== undefined) {
        return districts[0].district;
    }
};
const getBlockName = function (provinceCode, districtCode, code) {
    const blocks = APP_CONFIG.Locations.filter(location => location.provinceCode === provinceCode && location.districtCode === districtCode && location.blockCode === code);
    if (blocks[0] !== undefined) {
        return blocks[0].block;
    }
};


const addPatient = function () {
    let invalid = false;
    $("#modal-add .required").each((index, e) => {
        const $e = $(e);
        if ($e.val() === null || $e.val() === "" || $e.val() === undefined) {
            invalid = true;

        }
    });
    if (invalid) {
        alert("Missing required info");
        return;
    }
    const requestBody = {
        "Code": $("#modal-add #code").val(),
        "Phone": $("#modal-add #phone").val(),
        "Birthday": $("#modal-add #dob").val(),
        "BlockId": $("#modal-add #block").val(),
        "CardNumber": $("#modal-add #cardNumber").val(),
        "DistrictId": $("#modal-add #district").val(),
        "Gender": $("#modal-add input[name='gender']:checked").val(),
        "ProvinceId": $("#modal-add #province").val(),
        "HealthInsuranceNumber": $("#modal-add #health_insurance_number").val(),
        "ICIssuedPlace": $("#modal-add #ic_issued_place").val(),
        "HealthInsuranceExpiredDate": $("#modal-add #health_insurance_expired_date").val(),
        "ICIssuedDate": $("#modal-add #ic_issued_date").val(),
        "IsActive": true,
        "FirstName": $("#modal-add #firstName").val(),
        "LastName": $("#modal-add #lastName").val(),
        "HealthInsuranceIssuedDate": $("#modal-add #health_insurance_issued_date").val(),
        "HealthInsuranceFirstPlace": $("#modal-add #health_insurance_first_place").val(),
        "HealthInsuranceFirstPlaceCode": $("#modal-add #health_insurance_first_place_code").val(),
        "UnitNumber": $("#modal-add #unit_number").val(),
        "Street": $("#modal-add #street").val(),
        "Village": $("#modal-add #village").val(),
        "ICType": $("#modal-add input[name='ic_type']:checked").val(),
        "Email": $("#modal-add #email").val(),
        "BirthdayYearOnly": $("#modal-add #birth_year_only").prop('checked'),
        "IcNumber": $("#modal-add #ic_number").val(),
    };
    LoadAjaxAuth('POST', APP_CONFIG.AddRow, requestBody, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#modal-default').modal('hide');
            // getPatients();
            alert("Thành công");
        }

    })
};
