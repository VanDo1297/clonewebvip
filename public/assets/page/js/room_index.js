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
                d.Name = $('input[name="Name"]').val();
                d.Object_Id = $('.card select[name="Object"]').val();
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
                { "data": "name", "bSearchable": false, "bSortable": true },
                { "data": "id", "bSearchable": false, "bSortable": true },
                { "data": "object_name", "bSearchable": false, "bSortable": true },
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
                        return '<a class="btn btn-success btn-sm btn--icon-text btnAddService" data-name ="' + full.name + '" data-id="' + full.id + '"><i class="zmdi zmdi-account-add zmdi-hc-fw"></i> Thêm dịch vụ</a></br>\
                                <a class="btn btn-warning btn-sm btn--icon-text btnListService" data-name ="' + full.name + '" data-id="' + full.id + '"><i class="zmdi zmdi-account-add zmdi-hc-fw"></i> Danh sách dịch vụ</a></br>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="'+ full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>';
                    }
                }

            ],
        buttons: []
    });
};


var oTable1;
var loadServiceNotInRoomData = function() {
    var url = APP_CONFIG.GetAllServiceNotInRoom;
    oTable1 = $('#ServiceNotInTable').DataTable({
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
                d.RoomId = $('#modal-ServiceNotIn input[name="ServiceNotInRoomId"]').val();
                d.Is_Active = $('select[name="ServiceNotInIsActive"]').val();
                d.Name = $('input[name="ServiceNotInName"]').val();
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
                { "data": "name", "bSearchable": false, "bSortable": true },
                { "data": "id", "bSearchable": false, "bSortable": true },
                { "data": "object_name", "bSearchable": false, "bSortable": true },

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
                        return '<a class="btn btn-success btn-sm btn--icon-text btnSelectService" data-name ="' + full.name + '" data-id="' + full.id + '"><i class="zmdi zmdi-account-add zmdi-hc-fw"></i> Thêm</a>';
                    }
                }

            ],
        buttons: []
    });
};

var oTable2;
var loadServiceInRoomData = function() {
    var url = APP_CONFIG.GetAllServiceInRoom;
    oTable2 = $('#ServiceTable').DataTable({
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
                d.RoomId = $('#modal-Service input[name="ServiceRoomId"]').val();
                d.Is_Active = $('select[name="ServiceIsActive"]').val();
                d.Name = $('input[name="ServiceName"]').val();
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
                { "data": "name", "bSearchable": false, "bSortable": true },
                { "data": "id", "bSearchable": false, "bSortable": true },
                { "data": "object_name", "bSearchable": false, "bSortable": true },

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
                        return '<a class="btn btn-danger btn-sm btn--icon-text btnRemoveService" data-name ="' + full.name + '" data-id="' + full.id + '"><i class="zmdi zmdi-close zmdi-hc-fw"></i> Xóa</a>';
                    }
                }

            ],
        buttons: []
    });
};

// Thêm dịch vụ button
$(document).on('click', '.btnAddService', function () {
    $('#modal-ServiceNotIn input[name="ServiceNotInRoomId"]').val($(this).attr('data-id'));
    loadServiceNotInRoomData();
    oTable1.ajax.reload()
    $('#modal-ServiceNotIn').modal({ backdrop: 'static', keyboard: false });
});

// Thêm dịch vụ button
$(document).on('click', '.btnListService', function () {
    $('#modal-Service input[name="ServiceRoomId"]').val($(this).attr('data-id'));
    loadServiceInRoomData();
    oTable2.ajax.reload();
    $('#modal-Service').modal({ backdrop: 'static', keyboard: false });
});

$(document).on('click', '.btnSelectService', function () {
    LoadAjaxAuth('POST', APP_CONFIG.AddService, {
        Service_Room_Id: $('#modal-ServiceNotIn input[name="ServiceNotInRoomId"]').val(),
        Service_Id: $(this).attr('data-id')
        
    }, getCookie('_tk'), function (d, s) {

        var r = d.result.data;

        if (d.result.hasError == true) {
            setAlert(d.result.errors, 'Lỗi: ', '');
        } else {
            oTable1.draw();
            setAlert('Thêm thành công');
        }
    });
});
$(document).on('click', '.btnRemoveService', function () {
    LoadAjaxAuth('POST', APP_CONFIG.RemoveService, {
        ServiceRoomId: $('#modal-Service input[name="ServiceRoomId"]').val(),
        ServiceId: $(this).attr('data-id')

    }, getCookie('_tk'), function (d, s) {

        if (d.result.hasError == true) {
            setAlert(d.result.errors, 'Lỗi: ', '');
        } else {
            oTable2.draw();
            setAlert('Xóa thành công');
        }
    });
});

// Table dịch vụ cận lâm sàng
var loadSecondTable = function (id, d) {
    var tbl = $('#SecondTable tbody');
    tbl.empty();

    for (var i = 0; i < rs.length; i++) {
        if (rs[i].is_Active == 1) {
            tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].name + '</td>\
                            <td>'+ rs[i].id + '</td>\
                            <td>'+ rs[i].object_Name + '</td>\
                             <td>\
                                <span class="badge badge-warning"><i class="zmdi zmdi-check zmdi-hc-fw"></i></span>\
                            </td>\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="' + rs[i].id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chọn</a>\
                            </td>\
                        </tr>');
        }
        else {
            tbl.append('<tr>\
                            <td>'+ (i + 1) + '</td>\
                            <td>'+ rs[i].name + '</td>\
                            <td>'+ rs[i].id + '</td>\
                            <td>'+ rs[i].object_Name + '</td>\
                             <td>\
                                <span class="badge badge-warning"></span>\
                            </td>\
                            <td>\
                                <a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="' + rs[i].id + '" hidden><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chọn</a>\
                            </td>\
                        </tr>');
        }   
    }
    $('#modal-Doctor').modal({ backdrop: 'static', keyboard: false });
};



//var loadService = function () {
//    LoadAjaxAuth('POST', APP_CONFIG.GetAllService, {}, getCookie('_tk'), function (d, s) {
//        var sel = $('.modal select[name="Service"]');
//        sel.empty();
//        sel.append('<option value=""> Dịch vụ cận lâm sàng</option>');
//        for (var i = 0; i < d.length; i++) {
//            var item = d[i];
//            sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
//        }
//    });
//};

var loadObject = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetObject, {}, getCookie('_tk'), function (d, s) {
        var sel = $('select[name="Object"], .modal select[name="Object"]');
        sel.empty();
        sel.append('<option value=""> Đối tượng</option>');
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            sel.append('<option value="' + item.id + '"> ' + item.name + '</option>');
        }
    });
};

var loadObject1 = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetObject, {}, getCookie('_tk'), function (d, s) {
        var sel = $('#objectList');
        sel.empty();
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            sel.append('<label class="custom-control custom-checkbox">' +
                '<input type = "checkbox" id="objectCheckbox" name = "' + item.name.trim() + '" class= "custom-control-input" value = "' + item.id + '"/>' +
                '<span class="custom-control-indicator"></span>\
                             <span class="custom-control-description">'+ item.name + '</span>\
                        </label >');
        }
    });
};

$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="Code"]').prop('disabled', true);
    $('#objectList #objectCheckbox').prop('checked', false);
    LoadAjaxAuth('POST', APP_CONFIG.GetById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d,s) {
        var r = d.result.data;
        $('#modal-default input[name="Id"]').val(r.id);
        $('#modal-default input[name="Code"]').val(r.id);
        $('#modal-default input[name="Name"]').val(r.name);
        $('#modal-default input[name="IsActive"]').prop('checked', r.is_Active);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });

        for (var i = 0; i < d.result.data.object.length; i++) {
            var item = d.result.data.object

            $('#objectList input[name="' + item[i].trim() + '"]').prop('checked', true);
        };
    });
});
$(document).ready(function () {
    //loadService();
    loadObject();
    loadData();
    loadObject1();

    $(".select2").select2();
    $('.btnFilter').click(function () { oTable.draw(); });
    $('.btnServiceFilter').click(function () { oTable1.draw(); });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#objectList #objectCheckbox').prop('checked', false);
        $('#modal-default input[name="Id"]').val('');
        $('#modal-default input[name="Name"]').val('');
        $('#modal-default input[name="Code"]').prop('disabled', false);
        $('#modal-default input[name="Code"]').val('');
        $('#modal-default input[name="IsActive"]').prop('checked', true);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });

    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    $('.btnSaveModal').click(function () {
        var object = "";
        var id = $('#modal-default input[name="Id"]').val();
        $('#objectCheckbox:checked').each(function () {
            object = object + $(this).val() + ',';
        });

        LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0 ? APP_CONFIG.AddRow : APP_CONFIG.UpdateRow, {
            Name: $('.modal input[name="Name"]').val(),
            Is_Active: $('input[name="IsActive"]').prop('checked') ? 1 : 0,
            Id: $('#modal-default input[name="Code"]').val(),
            Object_Id: object
        }, getCookie('_tk'), function (d, s) {
            $('#modal-default').modal('hide');
            oTable.draw();
        });
    });
});