var startDate;
var endDate;
var patientCode;
var patientName;
var status;
var pTable;

var loadData = function () {
    pTable = $('#receptionTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        processing: true,
        serverSide: true,
        filter: false,
        order: [[7, 'desc']],
        sort: false,
        bInfo: false,
        bAutoWidth: true,
        scrollX: true,
        scrollCollapse: true,
        ajax:
        {
            "url": APP_CONFIG.GetAllReception,
            "type": "POST",
            "headers": { Authorization: getCookie('_tk') },
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": function (d) {
                startDate = new Date($('#startDate').val());
                endDate = new Date($('#endDate').val());
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
        },
        columns:
            [
                {
                    "data": "id",
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "patient_code", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "full_name", "sClass": "left", "bSearchable": true, "bSortable": true },
                {
                    "data": "birthday", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
                {
                    "data": "gender", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data === 1 ? "Nam" : "Nữ";
                    }
                },
                { "data": "registered_code", "sClass": "left", "bSearchable": true, "bSortable": true },
                {
                    "data": "created_date", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format("DD/MM/YYYY") : "";
                    }
                },
                {
                    "data": "registered_date", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format("DD/MM/YYYY") : "";
                    }
                },
                {
                    "data": "status", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return getNameByStatus(data);
                    }
                },
                {
                    "data": "is_finished", "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return checkBox(full.id, data);
                    }
                },
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return '<button id="btnShowReason" class="btn btn-primary btn-xs" data-toggle="modal" data-id="' + full.id + '"><i class="fa fa-eye" ></i ></button>';
                    }
                }
            ],
        buttons: []
    });

    pTable.on('draw.dt page.dt order.dt search.dt', function () {
        pTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
};

$(document).ready(function () {
    document.getElementById("startDate").valueAsDate = new Date()
    document.getElementById("endDate").valueAsDate = new Date()
    checkHasPermission();
    loadData();
});

$('#searchBtn').click(function () {
    pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
});

var getNameByStatus = function (status) {
    if (status === 0)
        return 'Mới';
    else if (status === 1)
        return 'Tạm ứng';
    else if (status === 2)
        return 'Tất toán';
    else if (status === 3)
        return 'Hủy';
    else if (status === 4)
        return 'Đang chờ tạm ứng';
    else if (status === 5)
        return 'Đang chờ tất toán';
    else if (status === 6)
        return 'Tạm ứng thất bại';
    else if (status === 7)
        return 'Tất toán thất bại';
    else return '';
}

var checkBox = function (id, isFinished) {
    if (checkHasPermission()) {
        if (isFinished) {
            isFinished = false;
            return '<input type="checkbox" id ="btnChange" data-isFinished="' + isFinished + '" data-id="' + id + '" checked="checked" style="width:20px;height:20px"/>';
        }
        else {
            isFinished = true;
            return '<input type="checkbox" id ="btnChange" data-isFinished="' + isFinished + '" data-id="' + id + '" style="width:20px;height:20px"/>';
        }
    } else {
        if (isFinished)
            return '<input type="checkbox" disabled id ="btnChange" data-isFinished="' + isFinished + '" data-id="' + id + '" checked="checked" style="width:20px;height:20px"/>';
        else
            return '<input type="checkbox" disabled id ="btnChange" data-isFinished="' + isFinished + '" data-id="' + id + '" style="width:20px;height:20px"/>';
    }

}

$(document).on('click', '#btnChange', function () {
    var value = $(this).attr('data-id') + '|' + $(this).attr('data-isFinished');
    $('#confirm-change input[name="data"]').val(value);
    $('#confirm-change').modal({ backdrop: 'static', keyboard: false });
});

$(document).on('click', '#btnChangeFinished', function () {
    var value = $('#confirm-change input[name="data"]').val();
    var reason = $('#confirm-change input[name="reason"]').val();
    if (reason === "" || reason === undefined) {
        document.getElementById("error-reason").innerHTML = "Vui lòng nhập lý do thay đổi...";
        return;
    }
    else {

        var substring = value.split("|");
        var id = substring[0];
        var isFinished = substring[1];
        LoadAjaxAuth('POST', APP_CONFIG.ChangeFinished, {
            Id: id,//$(this).attr('data-id'),
            IsFinished: isFinished,//$(this).attr('data-isFinished'),
            Reason: reason,
            EmployeeId: getCookie('_id')
        }, getCookie('_tk'), function (data, status) {
            if (status === 'success') {
                $('#confirm-change').modal('hide');
                pTable.ajax.reload(null, false);
                toastr.success('Thay đổi thành công !');
                resetReson();
            } else {
                $('#confirm-change').modal('hide');
                toastr.error('Thay đổi thất bại !');
                pTable.ajax.reload(null, false);
                resetReson();
            }
        });
    }
});

var resetReson = function () {
    document.getElementById("reason").value = "";
    document.getElementById("error-reason").innerHTML = "";
}

$(document).on('click', '#cancle-change', function () {
    pTable.ajax.reload(null, false);
    resetReson();
});

var checkHasPermission = function () {
    var getPermission = getCookie('_permissions');
    var isHasPermission = getPermission.indexOf('RECEPTION');
    if (isHasPermission === -1)
        return false;
    return true;
}

$(document).on('click', '#btnExport', function () {
    $('#waiting-modal').modal({ backdrop: 'static', keyboard: false });

    startDate = new Date($('#startDate').val());
    endDate = new Date($('#endDate').val());
    endDate.setDate(endDate.getDate() + 1);
    endDate.setSeconds(endDate.getSeconds() - 1);
    endDate = new Date(endDate);
    patientCode = $('#patientCode').val();
    patientName = $('#patientName').val(),
        status = $('#status').val();

    LoadAjaxAuth('POST', APP_CONFIG.Export, {
        StartDate: startDate.toISOString(),
        EndDate: endDate.toISOString(),
        PatientCode: patientCode,
        PatientName: patientName,
        Status: status,
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

$(document).on('click', '#btnShowReason', function () {
    LoadAjaxAuth('GET', APP_CONFIG.GetReason + '/' + $(this).attr('data-id'), {
    }, getCookie('_tk'), function (data, status) {
        if (status === 'success') {
            loadReason(data.result.receptionHistories);
            $('#ReasonModal').modal({ backdrop: 'static', keyboard: false });
        }
    });
});

$(document).on('click', '#close-reason', function () {
    $('#ReasonModal').on('hidden.bs.modal', function () {
        var pTable = $('#ReasonTable').DataTable();
        pTable.clear().draw();
    })
});

var loadReason = function (receptionHistories) {
    var pTable = $('#ReasonTable').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10], [5, 10]],
        orderCellsTop: true,
        retrieve: true,
        filter: true,
        sort: true,
        order: [[2, "desc"]],
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
                { "data": "reason", "bSearchable": true, "bSortable": true },
                {
                    "data": "createdDate", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format("DD/MM/YYYY HH:mm") : "";
                    }
                },
                { "data": "createdBy", "bSearchable": true, "bSortable": true }
            ],
    });
    pTable.on('draw.dt page.dt order.dt search.dt', function () {
        pTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    pTable.rows.add(receptionHistories).draw();
}
