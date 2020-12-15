$('#tekmedi_card_number').on('change paste input', function () {
    loadDataByCard();
});

$('#code').on('change paste input', function () {
    loadDataByCode();
});

function loadDataByCard() {
    var cardNumber = $('#tekmedi_card_number').val();
    if (cardNumber === null || cardNumber === "" || cardNumber === undefined) return;

    LoadAjaxAuth('POST', APP_CONFIG.ValidateCardNumber + cardNumber, { }, 
        getCookie('_tk'), function (data, status) {
            if (status == 'success' && data.result) {
                $('#tekmedi_card_number').removeClass("error-field");
                $('#validationCardNumber').hide();
                
                var url = APP_CONFIG.GetPatientByCard + "/" + cardNumber;
                LoadAjaxAuth('GET', url, {}, getCookie('_tk'), function (d, s) {
                    if (d.success) {
                        var result = d.result;
                        if (result === null || result === undefined) {
                            toastr.error('Số thẻ tekmedicard chưa được đăng kí cho bệnh nhân');
                            reset();
                            return;
                        }

                        $('#code').val(result.code);
                        $('#name').val(result.last_name + " " + result.first_name);
                        $('#birthday').val(moment(result.birthday).format('L'));
                        $('#gender').val(result.gender);
                        $('#ic_number').val(result.ic_number);
                        document.getElementById("price").value = parseFloat(result.price).toLocaleString('vi', { style: 'currency', currency: 'VND' });
                        loadAddress(result.province_id, result.district_id, result.ward_id, result.village, result.street);

                        $(".savebtn").attr("disabled", false);
                    }
                    else {
                        toastr.error('Số thẻ tekmedicard chưa được đăng kí cho bệnh nhân');
                        reset();
                    }
                });
                return;
            }

            reset();
            $('#tekmedi_card_number').val(cardNumber);
            $('#tekmedi_card_number').focus();
            $('#tekmedi_card_number').addClass("error-field");
            $('#validationCardNumber').show();
            $(".savebtn").attr("disabled", true);
        });
}

function loadDataByCode() {
    var code = $('#code').val();
    if (code === null || code === "" || code === undefined) return;

    code = code.replace(/^\s+|\s+$/g, "");
    if (code === "") return;

    var url = APP_CONFIG.GetPatientByCode + "/" + code;
    LoadAjaxAuth('GET', url, {}, getCookie('_tk'), function (d, s) {
        if (d.success) {
            var result = d.result;
            if (result === null || result === undefined) {
                toastr.error('Mã bệnh nhân không tồn tại');
                reset();
                return;
            }

            var cardNumber = result.tekmedi_card_number;
            if (cardNumber === null || cardNumber === "" || cardNumber === undefined) {
                $('#tekmedi_card_number').addClass("error-field");
                $(".savebtn").attr("disabled", true);
                toastr.warning('Bệnh nhân chưa đăng kí thẻ');
                return;
            } else {
                $('#tekmedi_card_number').val(result.tekmedi_card_number);
                var url = APP_CONFIG.GetPatientByCard + "/" + cardNumber;
                LoadAjaxAuth('GET', url, {}, getCookie('_tk'), function (d, s) {
                    if (d.success) {
                        var result = d.result;
                        if (result === null || result === undefined) {
                            toastr.error('Số thẻ tekmedicard chưa được đăng kí cho bệnh nhân');
                            reset();
                            return;
                        }

                        $('#code').val(result.code);
                        $('#name').val(result.last_name + " " + result.first_name);
                        $('#birthday').val(moment(result.birthday).format('L'));
                        $('#gender').val(result.gender);
                        $('#ic_number').val(result.ic_number);
                        document.getElementById("price").value = parseFloat(result.price).toLocaleString('vi', { style: 'currency', currency: 'VND' });
                        loadAddress(result.province_id, result.district_id, result.ward_id, result.village, result.street);

                        $('#tekmedi_card_number').removeClass("error-field");
                        $('#validationCardNumber').hide();
                        $(".savebtn").attr("disabled", false);
                    }
                    else {
                        toastr.error('Số thẻ tekmedicard chưa được đăng kí cho bệnh nhân');
                        reset();
                    }
                });
            }

            $(".savebtn").attr("disabled", false);
        }
        else {
            toastr.error('Mã bệnh nhân không tồn tại');
            reset();
        }
    });
}

function loadAddress(provinceId, districtId, wardId, village, street) {
    var url = APP_CONFIG.GetAddress + "/" + provinceId + "/" + districtId + "/" + wardId;
    LoadAjaxAuth('GET', url, {}, getCookie('_tk'), function (d, s) {
        var result = d.result;
        if (result === null || result === undefined) return;

        var address = street + " - " + village + " - " + result.block + " - " + result.district + " - " + result.province;
        address = address.replace("null", "");
        address = address.replace("-  -", "-");
        $('#address').val(address);
    });
}

function save() {
    $('#waiting-modal').modal({ backdrop: 'static', keyboard: false });
    LoadAjaxAuth('POST', APP_CONFIG.CheckFinally, {
        Patient_Code: $('#code').val(),
        Requested_Date: new Date()
    }, getCookie('_tk'), function (data, status) {
        if (status == 'success' && data.code == 200 && data.result) {
            LoadAjaxAuth('PUT', APP_CONFIG.Return, {
                TekmediCardNumber: $('#tekmedi_card_number').val(),
                EmployeeId: getCookie('_id')
            }, getCookie('_tk'), function (data, status) {
                $('#waiting-modal').modal('hide');
                if (status == 'success') {
                    toastr.success('Lưu thành công');
                    printInfo(data.result);
                    reset();
                    return;
                }
                toastr.error('Lưu thất bại');
            });
        }
        else {
            $('#waiting-modal').modal('hide');
            toastr.error('Không thể trả thẻ khi chưa thực hiện tất toán');
        }
    });
}

function reset() {
    $('#tekmedi_card_number').val("");
    $('#tekmedi_card_number').removeClass("error-field");
    $('#validationCardNumber').hide();

    $('#code').val("");
    $('#name').val("");
    $('#birthday').val("");
    $('#gender').val(0);
    $('#address').val("");
    $('#ic_number').val("");

    document.getElementById("price").value = parseFloat(0).toLocaleString('vi', { style: 'currency', currency: 'VND' });

    $(".savebtn").attr("disabled", true);
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
    var patientCode = $('#code').val();
    var patientName = $('#name').val();
    var currentDate = new Date();
    var birthday = new Date($('#PaymentForm input[name="birthday"]').val()).getFullYear();
    var age = currentDate.getFullYear() - birthday;
    var gender = $('#gender option:selected').text();
    var money = parseFloat(data.price).toLocaleString('vi');

    var templateData = { date, employeeName, patientCode, patientName, age, gender, money };
    return createReturnTemplate(templateData);
}