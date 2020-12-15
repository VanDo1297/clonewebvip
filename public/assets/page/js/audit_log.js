var pTable;
var loadData = function () {
    var url = APP_CONFIG.GetTable;
    pTable = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        processing: true,
        serverSide: true,
        filter: false,
        order: [[2, 'asc']],
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
                var startDate = new Date($('#start_date').val());
                var endDate = new Date($('#end_date').val());
                endDate.setDate(endDate.getDate() + 1);
                endDate.setSeconds(endDate.getSeconds() - 1);
                endDate = new Date(endDate);
                d.StartDate = startDate.toISOString();
                d.EndDate = endDate.toISOString();
                d.PatientCode = $('#patientCode').val();
                return JSON.stringify(d);
            },
        },
        columns:
            [
                {
                    "data": "id", "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                {
                    "data": "inserted_date",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L LTS') : "";
                    }
                },
                {
                    "data": "updated_date", "bSearchable": true, "bSortable": true,
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L LTS') : "";
                    }
                },
                { "data": "trace_id", "data-search": "trace_id", "data-order": "trace_id" },
                { "data": "ip_address", "data-search": "ip_address", "data-order": "ip_address" },
                { "data": "request_url", "data-search": "request_url", "data-order": "request_url" },
                { "data": "http_method", "data-search": "http_method", "data-order": "http_method" },
                { "data": "action_name", "data-search": "action_name", "data-order": "action_name" },
                { "data": "controller_name", "data-search": "controller_name", "data-order": "controller_name" },
                { "data": "response_status", "data-search": "response_status", "data-order": "response_status" },
                { "data": "response_status_code", "data-search": "response_status_code", "data-order": "response_status_code" },
                { "data": "action_parameters", "data-search": "action_parameters", "data-order": "action_parameters" },
                { "data": "request_body", "data-search": "request_body", "data-order": "request_body" },
                { "data": "response_body", "data-search": "response_body", "data-order": "response_body" },
                { "data": "exception", "data-search": "exception", "data-order": "exception" }
            ],
        columnDefs: [{
            targets: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            render: $.fn.dataTable.render.ellipsis(256)
        }]
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