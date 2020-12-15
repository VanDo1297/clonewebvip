var startDate;
var endDate;
var patientCode;
var patientName;
var status;
var loadData = function () {
    pTable = $('#transactionReportTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        processing: true,
        serverSide: true,
        filter: false,
        order: [[12, 'asc']],
        sort: false,
        bInfo: false,
        bAutoWidth: true,
        scrollX: true,
        scrollCollapse: true,
        ajax:
        {
            "url": APP_CONFIG.GetReport,
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
                { "data": "tekmedi_card_number", "sClass": "left" },
                { "data": "tekmedi_Uid", "sClass": "left" },
                { "data": "patient_code", "sClass": "left" },
                { "data": "registered_number", "sClass": "left" },
                { "data": "full_name", "sClass": "left" },
                {
                    "data": "gender", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data == 1 ? "Nam" : "Nữ";
                    }
                },
                {
                    "data": "birthday", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
                {
                    "data": "total_money_required", "sClass": "right",
                    "mRender": function (data, type, full, meta) {
                        return data.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                    }
                },
                {
                    "data": "total_money_hold", "sClass": "right",
                    "mRender": function (data, type, full, meta) {
                        return data.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                    }
                },
                {
                    "data": "total_payment", "sClass": "right",
                    "mRender": function (data, type, full, meta) {
                        return data.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                    }
                },
                {
                    "data": "created_date", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
                {
                    "data": "status", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return full.status == 1 ? "Đang khám" : "Tất toán";
                    }
                },
                {
                    "data": "detail", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return '<a target="_blank" href="Transaction/Detail?patientCode=' + full.patient_code + '&registeredCode=' + full.registered_number + '&registeredDate=' + full.registered_date +'">Xem chi tiết</a>';
                    }
                },
            ],
        buttons: []
    });

    pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
};


$(document).ready(function () {
    document.getElementById("startDate").valueAsDate = new Date()
    document.getElementById("endDate").valueAsDate = new Date()
    loadData();
});

$('#searchBtn').click(function () {
    pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
});


$(document).on('click', '#btnExport', function () {
    $('#waiting-modal').modal({ backdrop: 'static', keyboard: false });
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