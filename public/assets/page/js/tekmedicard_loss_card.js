$(document).ready(function () {
    $(".savebtn").attr("disabled", true);
});

function LoadDatabyCardNumber(cardNumber) {
    LoadAjaxAuth('GET', APP_CONFIG.GetByCardNumber + cardNumber, {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            // $('#PaymentForm input[name="currentTekmediCardNumber"]').val(result.tekmedi_card_number);
            // $('#PaymentForm input[name="code"]').val(result.code);
            // $('#PaymentForm input[name="fullName"]').val(result.last_name + " " + result.first_name);
            // $('#PaymentForm input[name="birthday"]').val(moment(result.birthday).format('L'));
            // $('#PaymentForm input[name="identityCardNumber"]').val(result.ic_number);
            // $('#PaymentForm select[name="gender"]').val(result.gender);
            // $('#PaymentForm input[name="address"]').val(result.street);
            $('#PaymentForm input[name="money"]').val(result.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }))
            // bindingAddress(result.province_id, result.district_id, result.ward_id, result.street);
            // $(".savebtn").attr("disabled", false);
            return;
        }
        $(".savebtn").attr("disabled", true);
        toastr.error('Số thẻ tekmedicard chưa được đăng kí cho bệnh nhân');
        reset();
    });
}

function LoadDatabyPatientCode(patientCode) {
    LoadAjaxAuth('GET', APP_CONFIG.GetPatientByCode + patientCode, {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            $('#PaymentForm input[name="currentTekmediCardNumber"]').val(result.tekmedi_card_number);
            $('#PaymentForm input[name="code"]').val(result.code);
            $('#PaymentForm input[name="fullName"]').val(result.last_name + " " + result.first_name);
            $('#PaymentForm input[name="birthday"]').val(moment(result.birthday).format('L'));
            $('#PaymentForm input[name="identityCardNumber"]').val(result.ic_number);
            $('#PaymentForm select[name="gender"]').val(result.gender);
            $('#PaymentForm input[name="address"]').val(result.street);
            // $('#PaymentForm input[name="money"]').val(result.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }))
            bindingAddress(result.province_id, result.district_id, result.ward_id, result.street);
            $(".savebtn").attr("disabled", false);
            if (!result.tekmedi_card_number) {
                $('#cardNumber').addClass("error-field");
                $(".savebtn").attr("disabled", true);
                toastr.warning('Bệnh nhân chưa đăng kí thẻ');
            } else {
                LoadDatabyCardNumber(result.tekmedi_card_number);
            }
            return;
        }
        toastr.error('Mã bệnh nhân không tồn tại');
        reset();
    });
}

function CheckCardNumber(cardNumber) {
    $(".savebtn").attr("disabled", true);
    LoadAjaxAuth('GET', APP_CONFIG.GetByCardNumber + cardNumber, {
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            var result = data.result;
            if (result.is_deleted == true) {
                $('#newTekmediCard').addClass("error-field");
                toastr.error('Thẻ không hợp lệ');
                return;
            }
            if (result.is_active == true) {
                $('#newTekmediCard').addClass("error-field");
                toastr.error('Thẻ đã được gán cho bệnh nhân');
                return;
            }
            $('#newTekmediCard').removeClass("error-field");
            $('#validationCardNumber').hide();
            if ($('#PaymentForm input[name="code"]').val() != "") {
                $(".savebtn").attr("disabled", false);
            }
        }
        else {
            if (data.status == 404) {
                if ($('#PaymentForm input[name="code"]').val() != "") {
                    $(".savebtn").attr("disabled", false);
                }
                $('#newTekmediCard').removeClass("error-field");
                return;
            }
            toastr.error('Lỗi hệ thống, vui lòng liên hệ ban quản trị');
        }

    });
}

$('#patientCode').on('change paste input', function () {
    var patientCode = $('#PaymentForm input[name="code"]').val();
    if (patientCode != "") {
        LoadDatabyPatientCode(patientCode);
    }
});

$('#newTekmediCard').on('change paste input', function () {
    var currentCardNumber = $('#PaymentForm input[name="currentTekmediCardNumber"]').val();
    var cardNumber = $('#PaymentForm input[name="newTekmediCard"]').val();
    if (cardNumber === null ||  cardNumber === undefined) return;
    
    if (cardNumber === "") {
        $('#newTekmediCard').removeClass("error-field");
        $('#validationCardNumber').hide();

        if (cardNumber !== currentCardNumber) {
            $(".savebtn").attr("disabled", false);
        }
        return;
    }
    
    if (cardNumber === currentCardNumber) {
        $('#newTekmediCard').focus();
        $('#newTekmediCard').addClass("error-field");
        $('#validationCardNumber').show();
        $(".savebtn").attr("disabled", true);
        return;
    }
    
    LoadAjaxAuth('POST', APP_CONFIG.ValidateCardNumber + cardNumber, { }, 
    getCookie('_tk'), function (data, status) {
        if (status == 'success' && data.result) {
            $('#newTekmediCard').removeClass("error-field");
            $('#validationCardNumber').hide();
            CheckCardNumber(cardNumber);
            return;
        }

        $('#newTekmediCard').focus();
        $('#newTekmediCard').addClass("error-field");
        $('#validationCardNumber').show();
        $(".savebtn").attr("disabled", true);
    });
});

function OnClickBtn(value) {
    price = value;
};

$(document).on('click', '#SaveBtn', function () {
    LoadAjaxAuth('POST', APP_CONFIG.LostCardPayment, {
        CurrentTekmediCardNumber: $('#PaymentForm input[name="currentTekmediCardNumber"]').val(),
        NewTekmediCardNumber: $('#PaymentForm input[name="newTekmediCard"]').val(),
        EmployeeId: getCookie('_id'),
        PatientCode: $('#PaymentForm input[name="code"]').val()
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success') {
            toastr.success('Lưu thành công');
            printInfo(data.result);
            reset();
            return;
        }
        toastr.error('Lưu thất bại');
    });
});

$(document).on('click', '#CancelBtn', function () {
    reset();
});

function reset() {
    $('#PaymentForm input[name="currentTekmediCardNumber"]').val("");
    $('#PaymentForm input[name="code"]').val("");
    $('#PaymentForm input[name="fullName"]').val("");
    $('#PaymentForm input[name="birthday"]').val("");
    $('#PaymentForm input[name="identityCardNumber"]').val("");
    $('#PaymentForm select[name="gender"]').val(0);
    $('#PaymentForm input[name="address"]').val("");
    $(".savebtn").attr("disabled", false);
    $('#PaymentForm input[name="money"]').val(0);
    $('#PaymentForm input[name="newTekmediCard"]').val("");
    $('#PaymentForm input[name="newTekmediCard"]').removeClass("error-field");
    $('#validationCardNumber').hide();
}

function bindingAddress(provinceId, districtId, wardId, street) {
    $.ajax({
        type: 'GET',
        url: APP_CONFIG.GetAddress + provinceId + '/' + districtId + '/' + wardId,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            var result = data.result;
            $('#PaymentForm input[name="address"]').val(street + ", " + result.block + ", " + result.district + ", " + result.province);
        },
        error: function (request, status, error) {
            $('#PaymentForm input[name="address"]').val("");
        }
    })
}

function printInfo(data) {
    var mywindow = window.open('', 'PRINT');
    mywindow.document.write('<head><link href="css/print_order.css" rel="stylesheet" /></head>');

    // card fee
    if (data.type === 11) {
        var template = createTemplateRenew(data);
        mywindow.document.write(template);
    }
    else {
        var template = createTemplate(data);
        mywindow.document.write(template);
    }

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
    return createLostTemplate(templateData);
}

function createTemplateRenew(data) {

    var transactionDate = new Date(data.time);
    var month = parseInt(transactionDate.getMonth()) + 1;
    var date = transactionDate.getHours() + ':' + transactionDate.getMinutes() + ', Ngày ' + transactionDate.getDate() + ' tháng ' + month + ' năm ' + transactionDate.getFullYear();

    var employeeName = document.getElementById("full_name").innerHTML;
    var patientCode = $('#PaymentForm input[name="code"]').val();
    var patientName = $('#PaymentForm input[name="fullName"]').val();
    var currentDate = new Date();
    var birthday = new Date($('#PaymentForm input[name="birthday"]').val()).getFullYear();
    var age = currentDate.getFullYear() - birthday;
    var gender = $('#PaymentForm select[name="gender"] option:selected').text();
    var money = parseFloat(data.price).toLocaleString('vi');

    var templateData = { date, employeeName, patientCode, patientName, age, gender, money };
    return createLostTemplateRenew(templateData);
}