var pTable;
var pTableError;
var selectedIds = [];
var listErrors = [];
var loadData = function () {
    pTable = $('#paidWaitingReportTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        processing: true,
        filter: false,
        sort: false,
        bInfo: false,
        bAutoWidth: true,
        scrollX: true,
        scrollCollapse: true,
        ajax:
        {
            "url": APP_CONFIG.GetAll,
            "type": "POST",
            "headers": { Authorization: getCookie('_tk') },
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": function (d) {
                var startDate = new Date($('#startDate').val());
                var endDate = new Date($('#endDate').val());
                endDate.setDate(endDate.getDate() + 1);
                endDate.setSeconds(endDate.getSeconds() - 1);
                endDate = new Date(endDate);
                patientCode = $('#patientCode').val();
                patientName = $('#patientName').val(),
                    status = $('#status').val();
                d.PatientCode = patientCode;
                d.PatientName = patientName;
                d.Status = status;
                d.StartDate = startDate.toISOString();
                d.EndDate = endDate.toISOString();
                return JSON.stringify(d);
            },
            "dataSrc": function (data) {
                APP_CONFIG.List = data.result;
                return data.result;
            }
        },
        columns:
            [
                {
                    "data": "id",
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return full.status == 0 ?
                            (full.is_selected ? '<input id="cbSelect" name="cbSelect" type="checkbox" data-id="' + full.id + '" checked>'
                                : '<input id="cbSelect" name="cbSelect" type="checkbox" data-id="' + full.id + '">')
                            : '<input disabled type="checkbox" data-id="' + full.id + '"/>';
                    }
                },
                {
                    "data": "id",
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "patient_code", "sClass": "left" },
                { "data": "registered_code", "sClass": "left" },
                { "data": "full_name", "sClass": "left" },
                {
                    "data": "gender", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data == 1 ? "Nam" : "Nữ";
                    }
                },
                {
                    "data": "birthday", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        if (full.birthday_year_only) {
                            return data ? moment(data).format('YYYY') : "";
                        }
                        else {
                            return data ? moment(data).format('L') : "";
                        }
                    }
                },
                {
                    "data": "amount", "sClass": "right",
                    "mRender": function (data, type, full, meta) {
                        return data.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                    }
                },
                {
                    "data": "registered_date", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
                {
                    "data": "status", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return full.status == 0 ? "Mới" : "Chờ tất toán";
                    }
                }
            ]
    });

    $('#paidWaitingReportTable').on('page.dt length.dt', function (e, settings, len) {
        pTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            var index = selectedIds.indexOf(data.id);
            data.is_selected = index !== -1;
            this.invalidate();
        });
    });

    pTable.on('draw.dt order.dt search.dt page.dt length.dt', function () {
        pTable.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
};


$(document).ready(function () {
    var today = new Date();
    document.getElementById("startDate").valueAsDate = today;
    document.getElementById("startDate").max = today.toISOString().split("T")[0];
    document.getElementById("endDate").valueAsDate = today;
    document.getElementById("endDate").min = today.toISOString().split("T")[0];
    loadData();
});

$('#searchBtn').click(function () {
    pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
});

$('#syncBtn').click(function () {
    var startDate = new Date($('#startDate').val());
    var endDate = new Date($('#endDate').val());
    var diff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays > APP_CONFIG.LimitSync) {
        toastr.warning('Không thể đồng bộ hơn ' + APP_CONFIG.LimitSync + " ngày");
        return;
    }

    $('#waiting-modal').modal({ backdrop: 'static', keyboard: false });
    var startDate = new Date($('#startDate').val());
    var endDate = new Date($('#endDate').val());
    endDate.setDate(endDate.getDate() + 1);
    endDate.setSeconds(endDate.getSeconds() - 1);
    endDate = new Date(endDate);
    LoadAjaxAuth('POST', APP_CONFIG.Sync, {
        from_date: startDate.toISOString(),
        to_date: endDate.toISOString()
    }, getCookie('_tk'), function (d, s) {
        $('#waiting-modal').modal('hide');
        if (d.success) {
            pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
            toastr.success('Đồng bộ thành công');
        }
        else {
            toastr.error('Đồng bộ thất bại');
        }
    });
});

var displayErrors = function () {
    if (pTableError != undefined && pTableError != null) {
        pTableError.ajax.reload();
    }

    pTableError = $('#table-error').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: true,
        sort: false,
        order: [[1, "asc"]],
        processing: true,
        bInfo: false,
        bAutoWidth: true,
        ajax: function (data, callback, settings) {
            callback({ data: listErrors })
        },
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
                { "data": "patient_code", "bSearchable": true, "bSortable": true },
                { "data": "registered_code", "bSearchable": true, "bSortable": true },
                { "data": "message", "bSearchable": true, "bSortable": true }
            ]
    });

    pTableError.on('order.dt search.dt', function () {
        pTableError.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
};

function asyncPaid(ids, callback) {
    (function paid(i) {
        setTimeout(function () {
            var id = ids[i];
            var progressBar = document.getElementById("progressBar");
            let params = {
                "employee_id": getCookie('_id'),
                "id": id
            };
            $.ajax({
                async: false,
                url: APP_CONFIG.Paid,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: JSON,
                data: JSON.stringify(params),
                success: function (data) {
                    var transactions = APP_CONFIG.List.filter(i => i.id == id);
                    if (transactions != null && transactions.length > 0) {
                        if (listErrors.length == 0) {
                            var errorTable = document.getElementById("modal-table");
                            if (errorTable != null) {
                                errorTable.style.display = "block";
                            }
                        }

                        var transaction = transactions[0];
                        var patient_code = transaction.patient_code;
                        var registered_code = transaction.registered_code;
                        var message = "Thành công";
                        var templateData = { id, patient_code, registered_code, message };
                        listErrors.unshift(templateData);
                        displayErrors();
                    }
                },
                error: function (data) {
                    var result = data.responseJSON;
                    var transactions = APP_CONFIG.List.filter(i => i.id == id);
                    if (transactions != null && transactions.length > 0) {
                        if (listErrors.length == 0) {
                            var errorTable = document.getElementById("modal-table");
                            if (errorTable != null) {
                                errorTable.style.display = "block";
                            }
                        }

                        var transaction = transactions[0];
                        var patient_code = transaction.patient_code;
                        var registered_code = transaction.registered_code;
                        var message = "Lỗi: " + result.message;
                        var templateData = { id, patient_code, registered_code, message };
                        listErrors.unshift(templateData);
                        displayErrors();
                    }
                }
            });

            var width = parseInt(100 * (i + 1) / selectedIds.length);
            progressBar.style.width = width + "%";
            progressBar.innerHTML = width + "%";

            if (++i < ids.length) {
                paid(i);
            } else {
                callback();
            }
        }, 500);
    }(0));
}

$('#progress-modal').on('hidden.bs.modal', function () {
    var progressBar = document.getElementById("progressBar");
    if (progressBar != null) {
        progressBar.style.width = "0%";
        progressBar.innerHTML = "0%";
    }

    var errorTable = document.getElementById("modal-table");
    if (errorTable != null) {
        errorTable.style.display = "none";
    }

    var cbSelectAll = document.getElementById('cbSelectAll');
    cbSelectAll.checked = false;
    selectedIds = [];
    listErrors = [];
    pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
});

$('#paidBtn').click(function () {
    if (selectedIds.length > 0) {
        $('#progress-modal').modal({ backdrop: 'static', keyboard: false });
        asyncPaid(selectedIds, function () {
            pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
        });
    }
    else {
        toastr.warning('Vui lòng chọn giao dịch để tất toán');
    }
});

function selectAll(cbSelectAll) {
    selectedIds = cbSelectAll.checked && APP_CONFIG.List.filter(i => i.status == 0) != null ?
        APP_CONFIG.List.filter(i => i.status == 0).map(i => i.id) : [];

    pTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.data();
        var index = selectedIds.indexOf(data.id);
        data.is_selected = index !== -1;
        this.invalidate();
    });
}

$(document).on('change', '#cbSelect', function () {
    if (this.checked) {
        selectedIds.push($(this).attr('data-id'));
    }
    else {
        var index = selectedIds.indexOf($(this).attr('data-id'));
        if (index !== -1) selectedIds.splice(index, 1);

        var cbSelectAll = document.getElementById('cbSelectAll');
        cbSelectAll.checked = false;
    }
});

function changeStartDate() {
    var startDate = new Date($('#startDate').val());
    document.getElementById("endDate").min = startDate.toISOString().split("T")[0];
}

function changeEndDate() {
    var endDate = new Date($('#endDate').val());
    document.getElementById("startDate").max = endDate.toISOString().split("T")[0];
}