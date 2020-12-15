var oTable;
var loadData = function () {
    var url = APP_CONFIG.GetTable;
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
        order: [[2, "desc"]],
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
                d.Is_Active = $('select[name="IsActive"]').val();
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
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "key", "bSearchable": false, "bSortable": true },
                { "data": "value", "bSearchable": false, "bSortable": true },
                { "data": "description", "bSearchable": false, "bSortable": true },

                {
                    "data": "is_active",
                    "bSearchable": false,
                    "bSortable": true,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (data == 1)
                            return '<span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i></span>';
                        else
                            return '';
                    }
                },

                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="' + full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>';
                    }
                }

            ],
        buttons: []
    });
};
$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="Key"]').prop('disabled', true);
    LoadAjaxAuth('POST', APP_CONFIG.GetById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.data;
        $('#modal-default input[name="Id"]').val(r.id);
        $('#modal-default input[name="Key"]').val(r.key);
        $('#modal-default input[name="Value"]').val(r.value);
        $('#modal-default input[name="Description"]').val(r.description);
        $('#modal-default input[name="IsActive"]').prop('checked', r.is_Active);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
});
$(document).ready(function () {
    loadData();
    $(".select2").select2();
    $('.btnFilter').click(function () { oTable.draw(); });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#modal-default input[name="Id"]').val('');
        $('#modal-default input[type="text"]').val('');
        $('#modal-default input[name="Key"]').prop('disabled', false);
        $('#modal-default input[name="IsActive"]').prop('checked', true);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    $('.btnSaveModal').click(function () {
        var id = $('#modal-default input[name="Id"]').val();
        LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddRow : APP_CONFIG.UpdateRow, {
            Key: $('.modal input[name="Key"]').val(),
            Value: $('.modal input[name="Value"]').val(),
            Description: $('.modal input[name="Description"]').val(),
            Id: id,
            Is_Active: $('input[name="IsActive"]').prop('checked') ? 1 : 0
        }, getCookie('_tk'), function (d, s) {
            $('#modal-default').modal('hide');
            oTable.draw();
        });
    });
});