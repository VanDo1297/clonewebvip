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
                d.Year = $('select[name="Year"]').val();
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
                { "data": "title", "bSearchable": false, "bSortable": true },
                { "data": "start_time", "bSearchable": false, "bSortable": true },
                { "data": "end_time", "bSearchable": false, "bSortable": true },
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
var loadSel = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetSel, {}, getCookie('_tk'), function (d, s) {
        var sel = $('select[name="DepartmentType"], .modal select[name="DepartmentId"]');
        sel.html('');
        sel.append('<option value=""> Chuyên khoa</option>');
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
        }
    });
};
$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="Code"]').prop('disabled', true);
    LoadAjaxAuth('POST', APP_CONFIG.GetById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.data;
        var start = r.strStartTime.split(" ");
        var end = r.strEndTime.split(" ");
        $('#modal-default input[name="Id"]').val(r.id);
        $('#modal-default input[name="StartTime"]').val(start[0]).trigger('change');
        $('#modal-default input[name="EndTime"]').val(end[0]).trigger('change');
        $('#modal-default input[name="StartTime1"]').val(start[1]).trigger('change');
        $('#modal-default input[name="EndTime1"]').val(end[1]).trigger('change');
        $('#modal-default input[name="Title"]').val(r.title);
        $('#modal-default input[name="IsActive"]').prop('checked', r.is_Active);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
});
$(document).ready(function () {
    //loadSel();
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
        $('#modal-default input[name="IsActive"]').prop('checked', true);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    
});

$('.btnSaveModal').click(function () {
    var id = $('#modal-default input[name="Id"]').val();
    LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddRow : APP_CONFIG.UpdateRow, {
        Id: id,
        Title: $('.modal input[name="Title"]').val(),
        Is_Active: $('#modal-default input[name="IsActive"]').prop('checked') ? 1 : 0,
        Start_Time: ($('#modal-default input[name="StartTime"]').val() + ' ' + $('#modal-default input[name="StartTime1"]').val()),
        End_Time: $('#modal-default input[name="EndTime"]').val() + ' ' + $('#modal-default input[name="EndTime1"]').val()
    }, getCookie('_tk'), function (d, s) {
        if (d.hasError === true)
            setAlert(d.errors, 'Lỗi: ', '');
        else {
            $('#modal-default').modal('hide');
            oTable.draw();
        }
    });
});