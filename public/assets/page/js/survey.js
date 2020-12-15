var pTable;
var loadData = function () {
    var url = APP_CONFIG.GetTable;
    pTable = $('#MainTable').DataTable({
        paging: false,
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: false,
        sort: false,
        bInfo: true,
        bAutoWidth: true,
        ajax:
        {
            "url": url,
            "type": "GET",
            "headers": { Authorization: getCookie('_tk') },
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "dataSrc": "result",
        },
        columns:
            [
                { "data": "result.ans_1", "sClass": "text-center" },
                { "data": "result.ans_2", "sClass": "text-center" },
                {
                    "data": "id",
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        var result = '';
                        $.each(full.documents, function (index, value) {
                            result += '<button id="btnImage" class="btn btn-success btn-xs" data-toggle="modal" url="' + value.url + '"><i class="fa fa-image" ></i ></button>';
                        });
                        return result;
                    }
                }
            ],
        createdRow: function (row, data, dataIndex) {
            if (data.result.ans_1 == 'Y' || data.result.ans_2 == 'Y') {
                $(row).css({ "background-color": "red" });
            }
        }
    });
};

$(document).ready(function () {
    loadData();
});

$(document).on('click', '#btnImage', function () {
    var url = APP_CONFIG.BaseUrl + $(this).attr('url');
    document.getElementById('image').src = url;
    $('#image-modal').modal({ backdrop: 'static', keyboard: false });
});