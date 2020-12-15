var oTable;
var loadData = function () {
    var url = 'api/Room/pharmacy';
    oTable = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100]],
        dom: 'Bfrtip',
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        bProcessing: true,
        bServerSide: true,
        bFilter: false,
        bSort: true,
        order: [[1, "desc"]],
        bInfo: true,
        bAutoWidth: true,
        ajax:
        {
            "url": url,
            "type": "POST",
            "headers": { Authorization: getCookie('_tk') },

            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": function (d) {
                return JSON.stringify(
                    {
                        RequestData: {
                            IsActive: "1",
                            ExamType: ""
                        }

                    }
                );
            }
        },
        columns:
            [
                {
                    "data": "Id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "Id", "bSearchable": false, "bSortable": true },
                { "data": "Code", "bSearchable": false, "bSortable": false },
                {
                    "data": "Code",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return '<a class="btn btn-sm btn-primary btnUpdate"><i class="zmdi zmdi-check zmdi-hc-fw"></i> Action</a>';
                    }
                },
            ],
        buttons: []
    });

    //LoadAjaxAuth('POST', 'api/Room/all', {}, getCookie('_tk'), function (d, s) {
    //    console.log(d.result.data);
    //});
};
$(document).ready(function () {
    loadData();
});