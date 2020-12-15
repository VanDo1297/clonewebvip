var price = -1;
var registering = false;
var processing = false;

$(document).ready(function () {
    $(".recharge").attr("disabled", true);
    $(".savebtn").attr("disabled", true);
});

function CheckCardNumber(cardNumber) {
    $('#PaymentForm input[name="price"]').val("");
    $(".recharge").attr("disabled", true);
    $(".savebtn").attr("disabled", true);

    LoadAjaxAuth('GET', APP_CONFIG.GetByCardNumber + cardNumber, {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            $('#PaymentForm input[name="price"]').val(result.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }));
            if (result.is_deleted == true) {
                $('#cardNumber').addClass("error-field");
                toastr.error('Thẻ không hợp lệ');
                return;
            }
            if (result.is_active == true) {
                $('#cardNumber').addClass("error-field");
                toastr.error('Thẻ đã được gán cho bệnh nhân khác');
                return;
            }
            if ($('#PaymentForm input[name="code"]').val() != "") {
                $('#cardNumber').removeClass("error-field");
                $('#validationCardNumber').hide();
                $(".savebtn").attr("disabled", false);
            }
        }
        else {
            if (data.status == 404) {
                if ($('#PaymentForm input[name="code"]').val() != "") {
                    $(".savebtn").attr("disabled", false);
                }
                $('#cardNumber').removeClass("error-field");
                return;
            }
            toastr.error('Lỗi hệ thống, vui lòng liên hệ ban quản trị');
        }

    });
}

function LoadDatabyPatientCode(patientCode) {
    $('#PaymentForm input[name="price"]').val("");
    $(".recharge").attr("disabled", true);
    $(".savebtn").attr("disabled", true);

    LoadAjaxAuth('GET', APP_CONFIG.GetPatientByCode + patientCode, {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            $('#PaymentForm input[name="tekmediCardNumber"]').val(result.tekmedi_card_number);
            $('#PaymentForm input[name="code"]').val(result.code);
            $('#PaymentForm input[name="fullName"]').val(result.last_name + " " + result.first_name);
            $('#PaymentForm input[name="birthday"]').val(moment(result.birthday).format('L'));
            $('#PaymentForm input[name="identityCardNumber"]').val(result.ic_number);
            $('#PaymentForm select[name="gender"]').val(result.gender);
            $('#PaymentForm input[name="address"]').val(result.street);
            bindingAddress(result.province_id, result.district_id, result.ward_id, result.street);
            if (result.tekmedi_card_number != null && result.tekmedi_card_number != "") {
                $('#cardNumber').addClass("error-field");
                toastr.error('Bệnh nhân đã phát thẻ');
                $(".savebtn").attr("disabled", true);
                $("#cardNumber").attr("disabled", true);
                return;
            }
            $('#PaymentForm input[name="price"]').val(0);
            $('#cardNumber').removeClass("error-field");
        } else {
            toastr.error('Mã bệnh nhân không tồn tại');
            reset();
        }
        $("#cardNumber").attr("disabled", false);
    });
}


$(document).on('click', '#SaveBtn', function () {
    if (registering) return;
    registering = true;

    if ($('#PaymentForm input[name="price"]').val() > 0) {
        toastr.error('Thẻ chưa reset');
        $(".savebtn").attr("disabled", true);
        registering = false;
        return;
    }
    LoadAjaxAuth('POST', APP_CONFIG.RegisterCardPayment, {
        TekmediCardNumber: $('#PaymentForm input[name="tekmediCardNumber"]').val(),
        EmployeeId: getCookie('_id'),
        PatientCode: $('#PaymentForm input[name="code"]').val()
    }, getCookie('_tk'), function (result, status) {
        if (status == 'success') {
            $("#patientCode").attr("readonly", true);
            $("#cardNumber").attr("readonly", true);
            $(".savebtn").attr("disabled", true);
            toastr.success('Lưu thành công');
            $('#recharge-modal').modal({ backdrop: 'static', keyboard: false });
            registering = false;
            return;
        }
        toastr.error('Lưu thất bại');
        registering = false;
    });
});

function OnClickBtn(value) {
    price = value;
    $('#PaymentForm input[name="currency"]').val(parseFloat(value).toLocaleString('vi', { style: 'currency', currency: 'VND' }));
};

$(document).on('click', '#RechargeBtn', function () {
    if (price <= 0) {
        toastr.warning('Vui lòng chọn mệnh giá tiền');
        return;
    }

    $(".recharge").attr("disabled", true);
    var moneyNumber = parseFloat(price).toLocaleString('vi', { style: 'currency', currency: 'VND' });
    var moneyString = to_vietnamese(price).trim();
    $('#lblMoneyNumber').text(moneyNumber);
    $('#lblMoneyString').text('(' + moneyString + ')');
    $('#confirm-recharge').modal({ backdrop: 'static', keyboard: false });
});

$('#btnCancelRechargeModal').click(function () {
    reset();
    $('#recharge-modal').modal('hide');
});

$('#btnRechargeModal').click(function () {
    $(".recharge").attr("disabled", false);
    $('#PaymentForm input[name="currency"]').focus();
    $('#recharge-modal').modal('hide');
});

$('#btnSaveModal').click(function () {
    if (processing) return;
    processing = true;

    LoadAjaxAuth('POST', APP_CONFIG.AddPayment, {
        TekmediCardNumber: $('#PaymentForm input[name="tekmediCardNumber"]').val(),
        Price: price,
        EmployeeId: getCookie('_id'),
        PatientCode: $('#PaymentForm input[name="code"]').val()
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            $('#confirm-recharge').modal('hide');
            toastr.success('Lưu thành công');
            printInfo(data.result);
            reset();
            processing = false;
            return;
        }

        $('#confirm-recharge').modal('hide');
        toastr.error('Lưu thất bại');
        processing = false;
    });
});

$('#cardNumber').on('change paste input', function () {
    var cardNumber = $('#PaymentForm input[name="tekmediCardNumber"]').val();
    if (cardNumber === null || cardNumber === "" || cardNumber === undefined) return;
    
    LoadAjaxAuth('POST', APP_CONFIG.ValidateCardNumber + cardNumber, { }, 
    getCookie('_tk'), function (data, status) {
        if (status == 'success' && data.result) {
            $('#cardNumber').removeClass("error-field");
            $('#validationCardNumber').hide();
            
            CheckCardNumber(cardNumber);
            return;
        }
        
        $('#cardNumber').focus();
        $('#cardNumber').addClass("error-field");
        $('#validationCardNumber').show();
        $(".savebtn").attr("disabled", true);
    });
});

$('#patientCode').on('change paste input', function () {
    var patientCode = $('#PaymentForm input[name="code"]').val();
    if (patientCode != "") {
        LoadDatabyPatientCode(patientCode);
    }
});

$('#currency').on('change paste input', function () {
    var currentMoney = $('#PaymentForm input[name="currency"]').val().replace(/\D/g, '');
    var money = (isNaN(currentMoney) == true || currentMoney == "" || currentMoney < 0) ? 0 : currentMoney;
    $('#PaymentForm input[name="currency"]').val(parseFloat(money).toLocaleString('vi', { style: 'currency', currency: 'VND' }));
    price = parseFloat(money);
});

$(document).on('click', '#CancelBtn', function () {
    reset();
});

function reset() {
    $('#PaymentForm input[name="tekmediCardNumber"]').val("");
    $('#PaymentForm input[name="tekmediCardNumber"]').removeClass("error-field");
    $('#PaymentForm input[name="code"]').val("");
    $('#PaymentForm input[name="fullName"]').val("");
    $('#PaymentForm input[name="birthday"]').val("");
    $('#PaymentForm input[name="identityCardNumber"]').val("");
    $('#PaymentForm select[name="gender"]').val(0);
    $('#PaymentForm input[name="address"]').val("");
    $('#PaymentForm input[name="price"]').val("");
    $('#PaymentForm input[name="currency"]').val("");
    $(".recharge").attr("disabled", true);
    $(".savebtn").attr("disabled", true);
    $('#cardNumber').removeClass("error-field");
    $("#cardNumber").attr("disabled", false);
    $('#validationCardNumber').hide();
    $("#patientCode").attr("readonly", false);
    $("#cardNumber").attr("readonly", false);
}


function bindingAddress(provinceId, districtId, wardId, street) {
    $.ajax({
        type: 'GET',
        url: APP_CONFIG.GetAddress + provinceId + '/' + districtId + '/' + wardId,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            var result = data.result;
            $('#PaymentForm input[name="address"]').val(street + " - " + result.block + " - " + result.district + " - " + result.province);
        },
        error: function (request, status, error) {
            $('#PaymentForm input[name="address"]').val("");
        }
    })
}

function printInfo(data) {
    var mywindow = window.open('', 'PRINT');
    mywindow.document.write('<head><link href="css/print_order.css" rel="stylesheet" /></head>');

    var template = createTemplate(data);
    mywindow.document.write(template);

    setTimeout(function () {
        mywindow.print();
        mywindow.close();
    }, 250);
}

function createTemplate(data) {

    var transactionDate = new Date(data.time);
    var month = parseInt(transactionDate.getMonth()) + 1;
    var date = transactionDate.getHours() + ':' + transactionDate.getMinutes() + ', Ngày ' + transactionDate.getDate() + ' tháng ' + month + ' năm ' + transactionDate.getFullYear();

    var employeeName = data.employee_name;
    var patientCode = $('#PaymentForm input[name="code"]').val();
    var patientName = $('#PaymentForm input[name="fullName"]').val();
    var currentDate = new Date();
    var birthday = new Date($('#PaymentForm input[name="birthday"]').val()).getFullYear();
    var age = currentDate.getFullYear() - birthday;
    var gender = $('#PaymentForm select[name="gender"] option:selected').text();
    var money = parseFloat(data.price).toLocaleString('vi');

    var templateData = { date, employeeName, patientCode, patientName, age, gender, money };
    return createRechargeTemplate(templateData);
}
