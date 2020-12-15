var pTable;
var loadData = function () {
    pTable = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        processing: true,
        serverSide: true,
        filter: false,
        order: [[8, 'desc']],
        sort: false,
        bInfo: false,
        bAutoWidth: true,
        scrollX: true,
        scrollCollapse: true,
        ajax:
        {
            "url": APP_CONFIG.GetTable,
            "type": "POST",
            "headers": { Authorization: getCookie('_tk') },
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": function (d) {
                d.PatientCode = $('#code').val();
                d.PatientName = $('#name').val();
                d.Types = arrayCheckBox();
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
                        switch (full.type) {
                            case 2: // Recharge
                                return '<button id="btnPrint" class="btn btn-primary btn-xs" title="In" data-id="' + full.id + '"><i class="fa fa-print" ></i ></button>\
                                        <button id="btnCancel" class="btn btn-danger btn-xs" title="Hủy" data-id="' + full.id + '"><i class="fa fa-eraser" ></i ></button>';
                            case 3: // Return
                            case 11: // CardFee
                                return '<button id="btnPrint" class="btn btn-primary btn-xs" title="In" data-id="' + full.id + '"><i class="fa fa-print" ></i ></button>';
                            case 4: // Lost
                                if (full.new_tekmedi_card_number === null || full.new_tekmedi_card_number === '') return '<button id="btnPrint" class="btn btn-primary btn-xs" title="In" data-id="' + full.id + '"><i class="fa fa-print" ></i ></button>';
                                return '';
                            default:
                                return '';
                        }
                    }
                },
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "tekmedi_card_number", "bSearchable": true, "bSortable": true },
                { "data": "code", "bSearchable": true, "bSortable": true },
                { "data": "name", "bSearchable": true, "bSortable": true },
                { "data": "gender", "bSearchable": true, "bSortable": true },
                {
                    "data": "birthday", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return moment(data).format("DD/MM/YYYY");
                    }
                },
                { "data": "ic_number", "bSearchable": true, "bSortable": true },
                {
                    "data": "time", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return moment(data).format("DD/MM/YYYY HH:mm:ss");
                    }
                },
                { "data": "employee_name", "bSearchable": true, "bSortable": true },
                { "data": "manipulation", "bSearchable": true, "bSortable": true },
                {
                    "data": "price", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });;
                    }
                },
                {
                    "data": "before_value", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });;
                    }
                },
                {
                    "data": "after_value", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });;
                    }
                }
            ],
        fixedHeader: true,
        createdRow: function (row, data, dataIndex) {
            if (!data.is_actived_card) {
                $(row).css({ "background-color": "darkgray" });
            }
        }
    });

    pTable.on('order.dt search.dt', function () {
        pTable.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
};

$(document).on('click', '#btnSearch', function () {
    var patientCode = $('#code').val();
    if (patientCode === null || patientCode === "") {
        var patientName = $('#name').val();
        if (patientName === null || patientName === "") {
            toastr.warning("Vui lòng nhập thông tin để tìm kiếm");
            return;
        }
    }

    if (pTable === null || pTable === undefined) {
        loadData();
    }
    else {
        pTable.ajax.reload();
    }
});

$(document).on('click', '#btnPrint', function () {
    var url = APP_CONFIG.GetById + "?id=" + $(this).attr('data-id');
    LoadAjaxAuth('GET', url, {}, getCookie('_tk'), function (d, s) {
        var result = d.result;
        printInfo(result);
    });
});

function printInfo(data) {
    var mywindow = window.open('', 'PRINT');
    mywindow.document.write('<head><link href="css/print_order.css" rel="stylesheet" /></head>');

    var transactionDate = new Date(data.time);
    var month = parseInt(transactionDate.getMonth()) + 1;
    var date = transactionDate.getHours() + ':' + transactionDate.getMinutes() + ', Ngày ' + transactionDate.getDate() + ' tháng ' + month + ' năm ' + transactionDate.getFullYear();

    var employeeName = data.employee_name;
    var patientCode = data.code;
    var patientName = data.name;
    var currentDate = new Date();
    var birthday = new Date(data.birthday).getFullYear();
    var age = currentDate.getFullYear() - birthday;
    var gender = data.gender;
    var money = parseFloat(data.price).toLocaleString('vi');
    var templateData = { date, employeeName, patientCode, patientName, age, gender, money };

    switch (data.type) {
        case 2: // Recharge
            var template = createRechargeTemplate(templateData);
            mywindow.document.write(template);
            break;
        case 3: // Return
            var template = createReturnTemplate(templateData);
            mywindow.document.write(template);
            break;
        case 4: // Lost
            var template = createLostTemplate(templateData);
            mywindow.document.write(template);
            break;
        case 11: // CardFee
            var template = createLostTemplateRenew(templateData);
            mywindow.document.write(template);
            break;
    }

    setTimeout(function () {
        mywindow.print();
        mywindow.close();
    }, 250);
}

$(document).on('click', '#btnCancel', function () {
    var id = $(this).attr('data-id');
    $('#confirm-cancel input[name="id"]').val(id);
    $('#confirm-cancel').modal({ backdrop: 'static', keyboard: false });
});

$('#btnCancelModal').click(function () {
    var url = APP_CONFIG.Cancel + $('#confirm-cancel input[name="id"]').val();
    LoadAjaxAuth('POST', url, {}, getCookie('_tk'), function (d, s) {
        if (d.responseJSON !== null && d.responseJSON !== undefined && d.responseJSON.success === false)
            toastr.error('Hủy thất bại');
        else {
            toastr.success('Hủy thành công');
            pTable.ajax.reload(null, false);
        }

        $('#confirm-cancel').modal('hide');
    });
});

var arrayCheckBox = function () {
    var arrayCheck = [];
    $("input:checkbox[name=type]:checked").each(function () {
        arrayCheck.push($(this).val());
    });
    return arrayCheck;
}

function checkAll(ele) {
    var checkboxes = document.getElementsByTagName('input');
    if (ele.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type === 'checkbox') {
                checkboxes[i].checked = true;
            }
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            console.log(i)
            if (checkboxes[i].type === 'checkbox') {
                checkboxes[i].checked = false;
            }
        }
    }
}