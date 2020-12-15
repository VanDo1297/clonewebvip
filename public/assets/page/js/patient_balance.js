var pTable;
var startDate;
var endDate;
var loadData = function () {
    var url = APP_CONFIG.GetTable;
    pTable = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        processing: true,
        serverSide: true,
        filter: false,
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
                startDate = new Date($('#start_date').val());
                endDate = new Date($('#end_date').val());
                endDate.setDate(endDate.getDate() + 1);
                endDate.setSeconds(endDate.getSeconds() - 1);
                endDate = new Date(endDate);
                d.StartDate = startDate.toISOString();
                d.EndDate = endDate.toISOString();
                d.EmployeeId = getCookie('_id');
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
                { "data": "ic_number", "bSearchable": true, "bSortable": true },
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
                }
            ],
        buttons: []
    });
};

$(document).ready(function () {
    document.getElementById('start_date').valueAsDate = new Date();
    document.getElementById('end_date').valueAsDate = new Date();
    loadData();
});

$(document).on('click', '#btnSearch', function () {
    pTable.one('draw', function () { pTable.columns.adjust(); }).ajax.reload();
});

$(document).on('click', '#btnExport', function () {
    $('#waiting-modal').modal({ backdrop: 'static', keyboard: false });
    LoadAjaxAuth('POST', APP_CONFIG.Export, {
        StartDate: startDate.toISOString(),
        EndDate: endDate.toISOString(),
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