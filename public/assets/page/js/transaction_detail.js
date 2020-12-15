function loadPatientByCode() {
    var url = new URL(window.location.href);
    var patientCode = url.searchParams.get("patientCode");
    var registeredCode = url.searchParams.get("registeredCode");
    url = APP_CONFIG.GetPatientByCode + "/" + patientCode;
    LoadAjaxAuth('GET', url, {}, getCookie('_tk'), function (d, s) {
        if (d.success) {
            var result = d.result;
            if (result === null || result === undefined) return;
            $('#card_number').val(result.tekmedi_card_number);
            $('#registered_code').val(registeredCode);
            $('#patient_name').val(result.last_name + " " + result.first_name);
            $('#patient_code').val(result.code);
            var bits = result.birthday.split(/\D/);
            var date = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
            var birthday = date.toISOString().split('T')[0];
            $('#birthday').val(birthday);
            $('#gender').val(result.gender);
        }
        else {
            toastr.error('Mã bệnh nhân không tồn tại');
        }
    });
}

function loadData() {
    var url = new URL(window.location.href);
    var patientCode = url.searchParams.get("patientCode");
    var registeredDate = url.searchParams.get("registeredDate");
    var registeredCode = url.searchParams.get("registeredCode");

    LoadAjaxAuth('POST', APP_CONFIG.GetDetail, {
        PatientCode: patientCode,
        RegisteredDate: registeredDate,
        RegisteredCode: registeredCode
    }, getCookie('_tk'), function (d, s) {
        if (d.success) {
            var result = d.result;
            if (result === null || result === undefined) {
                toastr.error('Không tìm thấy giao dịch');
                return;
            }
            loadMainInfo(result.transactionInfoDetail);
        }
        else {
            toastr.error('Không tìm thấy giao dịch');
        }
    });
}

var loadMainInfo = function (transactionInfoDetail) {
    var pTable = $('#MainInfo').DataTable({
        pageLength: APP_CONFIG.pageLength,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: false,
        sort: true,
        order: [[4, "asc"]],
        bInfo: false,
        bAutoWidth: false,
        processing: true,
        paging: false,
        data: transactionInfoDetail,
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
                { "data": "id", "bSearchable": true, "bSortable": true },
                { "data": "registered_code", "bSearchable": true, "bSortable": true },
                {
                    "data": "registered_date", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return moment(data).format("DD/MM/YYYY");
                    }
                },
                {
                    "data": "transaction_date", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return moment(data).format("DD/MM/YYYY HH:mm");
                    }
                },
                { "data": "employee_name", "bSearchable": true, "bSortable": true },
                { "data": "store_name", "bSearchable": true, "bSortable": true },
                {
                    "data": "amount", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });
                    }
                },
                { "data": "status", "bSearchable": true, "bSortable": true },
                { "data": "type", "bSearchable": true, "bSortable": true },
                { "data": "message", "bSearchable": true, "bSortable": true },
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return '<button id="btnShowHoldModal" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-eye" ></i ></button>'
                    }
                }
            ],
        buttons: [],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total required
            total = api
                .cells(function (index, data, node) {
                    return (api.row(index).data().type === 'Tạm ứng' || api.row(index).data().type === 'Tất toán') &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công' || api.row(index).data().status === 'Success') ?
                        true : false;
                }, 7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            total -= api
                .cells(function (index, data, node) {
                    return (api.row(index).data().type === 'Tạm ứng' || api.row(index).data().type === 'Tất toán') &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công' || api.row(index).data().status === 'Success') ?
                        true : false;
                }, 7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total curent required
            pageTotal = api
                .cells(function (index, data, node) {
                    return (api.row(index).data().type === 'Tạm ứng' || api.row(index).data().type === 'Tất toán') &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công' || api.row(index).data().status === 'Success') ?
                        true : false;
                }, 7, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            pageTotal -= api
                .cells(function (index, data, node) {
                    return api.row(index).data().type === 'Hủy' &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công' || api.row(index).data().status === 'Success') ?
                        true : false;
                }, 7, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(1).footer()).html("Tổng chi phí tất toán".toUpperCase());
            $(api.column(7).footer()).html(
                parseFloat(pageTotal).toLocaleString('vi', { style: 'currency', currency: 'VND' }) + ' (tổng ' + parseFloat(total).toLocaleString('vi', { style: 'currency', currency: 'VND' }) + ')'
            );
        }
    });

    pTable.on('draw.dt page.dt order.dt search.dt', function () {
        mergeHoldCells();

        pTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
};

$(document).ready(function () {
    loadPatientByCode();
    loadData();
});

$(document).on('click', '#btnShowHoldModal', function () {
    LoadAjaxAuth('GET', APP_CONFIG.GetById + '/' + $(this).attr('data-id'), {
    }, getCookie('_tk'), function (data, status) {
        if (status === 'success') {
            loadInfoTransactionById(data.result.transactionInfoDetail);
            //$("#HoldModal").modal('show');
            $('#HoldModal text[name="id_transaction"]').html(data.result.transactionInfoDetail[0].patient_code + " - " + data.result.transactionInfoDetail[0].registered_code + " - " + data.result.transactionInfoDetail[0].id.toUpperCase());
            $('#HoldModal text[name="type_transaction"]').html(" " + ' THÔNG TIN GIAO DỊCH' + " " + data.result.transactionInfoDetail[0].type.toUpperCase());
            $('#HoldModal').modal({ backdrop: 'static', keyboard: false });
        }
    });
});

$(document).on('click', '#close-detail', function () {
    $('#HoldModal').on('hidden.bs.modal', function () {
        var pTable = $('#HoldTable').DataTable();
        pTable.clear().draw();
    })
});

var loadInfoTransactionById = function (detailTransaction) {
    var pTable = $('#HoldTable').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20], [5, 10, 20]],
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: true,
        sort: true,
        order: [[1, "asc"]],
        bInfo: true,
        bAutoWidth: true,
        processing: true,
        data: [],
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
                { "data": "service_id", "bSearchable": true, "bSortable": true },
                { "data": "service_name", "bSearchable": true, "bSortable": true },
                {
                    "data": "hold_amount", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });
                    }
                },
                {
                    "data": "actual_amount", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return parseFloat(data).toLocaleString('vi', { style: 'currency', currency: 'VND' });
                    }
                },
            ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total required
            total = api
                .cells(function (index, data, node) {
                    return (api.row(index).data().type === 'Tạm ứng' || api.row(index).data().type === 'Tất toán') &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công') ?
                        true : false;
                }, 3)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            total -= api
                .cells(function (index, data, node) {
                    return api.row(index).data().type === 'Hủy' &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công') ?
                        true : false;
                }, 3)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total curent required
            pageTotal = api
                .cells(function (index, data, node) {
                    return (api.row(index).data().type === 'Tạm ứng' || api.row(index).data().type === 'Tất toán') &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công') ?
                        true : false;
                }, 3, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            pageTotal -= api
                .cells(function (index, data, node) {
                    return api.row(index).data().type === 'Hủy' &&
                        (api.row(index).data().status === null || api.row(index).data().status === undefined ||
                            api.row(index).data().status === '' || api.row(index).data().status === 'Thành công') ?
                        true : false;
                }, 3, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(3).footer()).html(
                parseFloat(pageTotal).toLocaleString('vi', { style: 'currency', currency: 'VND' }) + ' (tổng ' + parseFloat(total).toLocaleString('vi', { style: 'currency', currency: 'VND' }) + ')'
            );

            // Total actual
            total = api
                .cells(function (index, data, node) {
                    return (api.row(index).data().type === 'Tạm ứng' || api.row(index).data().type === 'Tất toán') && api.row(index).data().status === 'Thành công' ?
                        true : false;
                }, 4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            total -= api
                .cells(function (index, data, node) {
                    return api.row(index).data().type === 'Hủy' && api.row(index).data().status === 'Thành công' ?
                        true : false;
                }, 4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total current actual
            pageTotal = api
                .cells(function (index, data, node) {
                    return (api.row(index).data().type === 'Tạm ứng' || api.row(index).data().type === 'Tất toán') && api.row(index).data().status === 'Thành công' ?
                        true : false;
                }, 4, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            pageTotal -= api
                .cells(function (index, data, node) {
                    return api.row(index).data().type === 'Hủy' && api.row(index).data().status === 'Thành công' ?
                        true : false;
                }, 4, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(4).footer()).html(
                parseFloat(pageTotal).toLocaleString('vi', { style: 'currency', currency: 'VND' }) + ' (tổng ' + parseFloat(total).toLocaleString('vi', { style: 'currency', currency: 'VND' }) + ')'
            );
        }
    });

    pTable.on('draw.dt page.dt order.dt search.dt', function () {
        //mergeHoldCells();
        pTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    pTable.rows.add(detailTransaction).draw();
};

function mergeHoldCells() {
    var dimension_col = null;
    var columnCount = $("#HoldTable tr:first th").length;
    for (dimension_col = 0; dimension_col <= columnCount; dimension_col++) {
        if (dimension_col == 1 || dimension_col == 3 || dimension_col == 4 || dimension_col == 5 || dimension_col == 6) {
            continue;
        }

        // first_instance holds the first instance of identical td
        var first_instance = null;
        var rowspan = 1;
        // iterate through rows
        $("#HoldTable").find('tr').each(function () {
            // find the td of the correct column (determined by the dimension_col set above)
            var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');
            if (first_instance === null) {
                // must be the first row
                first_instance = dimension_td;
            } else if (dimension_td.text() === first_instance.text()) {
                // the current td is identical to the previous
                // remove the current td
                dimension_td.attr('hidden', true);
                ++rowspan;
                // increment the rowspan attribute of the first instance
                first_instance.attr('rowspan', rowspan);
            } else {
                // this cell is different from the last
                first_instance = dimension_td;
                rowspan = 1;
            }
        });
    }
}

function mergePaidCells() {
    var dimension_col = null;
    var columnCount = $("#PaidTable tr:first th").length;
    for (dimension_col = 0; dimension_col <= columnCount; dimension_col++) {
        if (dimension_col == 1 || dimension_col == 3 || dimension_col == 4 || dimension_col == 5 || dimension_col == 6) {
            continue;
        }

        // first_instance holds the first instance of identical td
        var first_instance = null;
        var rowspan = 1;
        // iterate through rows
        $("#PaidTable").find('tr').each(function () {
            // find the td of the correct column (determined by the dimension_col set above)
            var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');
            if (first_instance === null) {
                // must be the first row
                first_instance = dimension_td;
            } else if (dimension_td.text() === first_instance.text()) {
                // the current td is identical to the previous
                // remove the current td
                dimension_td.attr('hidden', true);
                ++rowspan;
                // increment the rowspan attribute of the first instance
                first_instance.attr('rowspan', rowspan);
            } else {
                // this cell is different from the last
                first_instance = dimension_td;
                rowspan = 1;
            }
        });
    }
}