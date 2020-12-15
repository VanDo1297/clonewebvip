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
                "headers": {Authorization: getCookie('_tk')},

                "contentType": "application/json; charset=utf-8",
                "dataType": "JSON",
                "data": function (d) {
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
                {"data": "name", "bSearchable": false, "bSortable": false},
                {"data": "lastTimeRun", "bSearchable": false, "bSortable": false},
                {"data": "nextTimeRun", "bSearchable": false, "bSortable": false},
                {"data": "scheduledTime", "bSearchable": false, "bSortable": false},
                {"data": "message", "bSearchable": false, "bSortable": false},
                {
                    "data": "isActive",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (data === 'true')
                            return '<span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i></span>';
                        else
                            return '<span class="badge badge-danger"><i class="zmdi zmdi-close zmdi-hc-fw"></i></span>';    
                    }
                },
                {
                    "data": "isSuccess",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        if (data === 'true')
                            return '<span class="badge badge-success"><i class="zmdi zmdi-check zmdi-hc-fw"></i></span>';
                        else
                            return '<span class="badge badge-danger"><i class="zmdi zmdi-close zmdi-hc-fw"></i></span>';

                    }
                },
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {

                        return '<button class="btnRun" data-id="' + data + '">Run</button>' +
                            '<button class="btnDelete" data-id="' + data + '">Delete</button>' +
                            '<button class="btnEdit" data-id="' + data + '">Edit</button>';


                    }
                }

            ],
        buttons: []
    });
};


$(document).on('click', '.btnEdit', function (e) {
    var id = $(this).attr('data-id');
    var r = APP_CONFIG.Services.find(function (e){return e.id === id});
    $('#modal-default input[name="id"]').prop('disabled', true);

    $('#modal-default input[name="id"]').val(r.id);
    $('#modal-default input[name="Name"]').val(r.serviceName);
    $('#modal-default input[name="Scheduled"]').val(r.scheduledTime);
    $('#modal-default input[name="IsActive"]').prop('checked', r.isActive);
    $('#modal-default').modal({backdrop: 'static', keyboard: false});
   
});

$(document).on('click', '.btnDelete', function () {

    Swal.fire({
        title: 'Chắc chắn ?',
        text: "Bạn muốn xóa item này !",
        type: 'warning',
        background: '#020303',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa'
    }).then((result) => {
        if(result.value
)
    {
        LoadAjaxAuth('POST', APP_CONFIG.DeleteRow, {
            RequestData: {
                Id: $(this).attr('data-id')
            }
        }, getCookie('_tk'), function (d, s) {
            if (d.result.data === false)
                Swal.fire({
                    type: 'error',
                    title: 'Xóa thất bại',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#020303'
                });
            else {
                Swal.fire({
                    type: 'success',
                    title: 'Xóa thành công',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#020303'

                });
                getServices();
            }
        });
    }
})
    ;

});

$(document).on('click', '.btnRecovery', function () {

    LoadAjaxAuth('POST', APP_CONFIG.RecoveryRow, {
        RequestData: {
            CardNumber: $(this).attr('data-id')
        }
    }, getCookie('_tk'), function (d, s) {
        if (d.result.data === false)
            Swal.fire({
                type: 'error',
                title: 'Khôi phục thất bại',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
        else {
            Swal.fire({
                type: 'success',
                title: 'Khôi phục thành công',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
            getServices();
        }
    });
});
$(document).on('click', '.btnRun', function () {

    LoadAjaxAuth('POST', APP_CONFIG.RunRow, {
        RequestData: {
            Id: $(this).attr('data-id')
        }
    }, getCookie('_tk'), function (d, s) {
        if (d.result.data === false)
            Swal.fire({
                type: 'error',
                title: 'Chay thất bại',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
        else {
            Swal.fire({
                type: 'success',
                title: 'Chay thành công',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
            getServices();
        }
    });
});
$(document).on('click', '#AddServiceButton', function () {

    LoadAjaxAuth('POST', APP_CONFIG.AddRow, {
        RequestData: {
            Name: $("#AddServiceName").val(),
            ScheduledTime: $("#AddServiceSchedule").val()
        }
    }, getCookie('_tk'), function (d, s) {
        if (d.result.data === false)
            Swal.fire({
                type: 'error',
                title: 'Chay thất bại',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
        else {
            Swal.fire({
                type: 'success',
                title: 'Chay thành công',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
            getServices();
        }
    });
});

function getServices() {
    LoadAjaxAuth('POST', APP_CONFIG.List, {
        RequestData: {}
    }, getCookie('_tk'), function (d, s) {
        if (d.result.data === false)
            Swal.fire({
                type: 'error',
                title: 'Chay thất bại',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
        else {
            Swal.fire({
                type: 'success',
                title: 'Chay thành công',
                showConfirmButton: false,
                timer: 3000,
                background: '#020303'
            });
            APP_CONFIG.Services = d.result.result.data;
            loadData();
            oTable.draw();
            
        }
    });
}

$(document).ready(function () {

    getServices();

    $(".select2").select2();
    $('.btnFilter').click(function () {
        oTable.draw();
    });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#modal-default').modal({backdrop: 'static', keyboard: false});
    });

    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    $('.btnSaveModal').click(function () {
        var RequestData = {
            Id: $('#modal-default input[name="id"]').val(),
                Name: $('#modal-default input[name="Name"]').val(),
                Scheduled: $('#modal-default input[name="Scheduled"]').val(),
                IsActive: $('#modal-default input[name="IsActive"]').checked
        };
        LoadAjaxAuth('POST', APP_CONFIG.UpdateRow, {
            RequestData: RequestData
        }, getCookie('_tk'), function (d, s) {
            if (d.hasError === true)
                setAlert(d.errors, 'Lỗi: ', '');
            else {
                $('#modal-default').modal('hide');
                getServices();
            }
        });
    });
});