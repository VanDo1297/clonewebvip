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
                d.IsActive = $('select[name="IsActive"]').val();
                d.ObjectId = $('select[name="Object"]').val();
                d.Name = $('input[name="Name"]').val();
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

                //{
                //    "data": "employees",
                //    "bSearchable": false,
                //    "bSortable": false,
                //    "sClass": "text-center",
                //    "mRender": function (data, type, full, meta) {
                //        if (data === undefined || data === null || data.length === 0)
                //            return '';
                //        else {
                //            var arr = data.split(',');
                //            var tmp = '<div class="listview__attrs">';

                //            for (var i = 0; i < arr.length; i++) {
                //                var doc = arr[i].split('|');
                //                if (doc.length === 2)
                //                    tmp += '<span>' + doc[1] + '<a class="btn btn-light btn-sm btn--icon btnRemoveDoctor" data-id="' + doc[0] + '" data-master="' + full.id + '"><i class="zmdi zmdi-close zmdi-hc-fw"></i></a></span>';
                //            }
                //            tmp += '</div>';
                //            return tmp;
                //        }
                //    }
                //},
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="'+ full.id + '"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Chỉnh sửa</a>';
                    }
                }

            ],
        buttons: []
    });
};
//var loadSecondTable = function (id, d) {
//    var tbl = $('#SecondTable tbody');
//    tbl.empty();

//    for (var i = 0; i < d.length; i++) {
//        tbl.append('<tr>\
//                        <td>'+ (i + 1) + '</td>\
//                        <td></td>\
//                        <td><p>'+ d[i].ten + '</p> <div class="listview__attrs">\
//                                        <span>'+ d[i].chuyenKhoa + '</span>\
//                                        <span>'+ d[i].chuyenMon + '</span>\
//                                    </div></td>\
//            <td>'+ d[i].gioiTinh + '</td>\
//            <td>'+ d[i].namSinh + '</td>\
//            <td><label class="custom-control custom-checkbox">\
//                                <input type="checkbox" class="custom-control-input"  name="chkDoctor" data-id="'+ d[i].id + '" />\
//                                <span class="custom-control-indicator"></span>\
//                            </label></td>\
//                    </tr>');
//    }
//    $('#modal-Doctor').modal({ backdrop: 'static', keyboard: false });
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
//$(document).on('click', '.btnAddDoctor', function () {
//    var id = $(this).attr('data-id');
//    $('#modal-Doctor input[name="PharmacyId"]').val(id);
//    LoadAjaxAuth('POST', APP_CONFIG.Employees, {
//        Id: $(this).attr('data-id')
//    }, getCookie('_tk'), function (d, s) {
//        loadSecondTable(id, d);
//    });
//});
//$(document).on('click', '.btnSaveDoctorModal', function () {
//    var id = $('#modal-Doctor input[name="PharmacyId"]').val();
//    var obj = {
//        PharmacyId: id,
//        Employees: []
//    };
//    arr = $('#SecondTable tbody input[name="chkDoctor"]:checked');
//    for (var i = 0; i < arr.length; i++) {
//        obj.Employees.push($(arr[i]).attr('data-id'));
//    }
//    if (obj.Employees.length > 0)
//        LoadAjaxAuth('POST', APP_CONFIG.AddEmployee, obj, getCookie('_tk'), function (d, s) {
//            $('#modal-Doctor').modal('hide');
//            oTable.draw();
//        });
//});

//$(document).on('click', '.btnRemoveDoctor', function () {
//    if (confirm('Bạn muốn gỡ bác sĩ này ra khỏi phòng này ?')) {
//        LoadAjaxAuth('POST', APP_CONFIG.RemoveEmployee, {
//            EmployeeId: $(this).attr('data-id'),
//            PharmacyId: $(this).attr('data-master')
//        }, getCookie('_tk'), function (d, s) {
//            oTable.draw();
//        });
//    }
//});
$(document).on('click', '.btnEdit', function () {
    $('#modal-default input[name="id"]').prop('disabled', true);
    $('#objectList #objectCheckbox').prop('checked', false);
    LoadAjaxAuth('POST', APP_CONFIG.GetById, {
        Id: $(this).attr('data-id')
    }, getCookie('_tk'), function (d, s) {
        var r = d.result.data.pharmacy;
        $('#modal-default input[name="id"]').val(r.id);
        $('#modal-default input[name="Id"]').val(r.id);

        $('#modal-default input[name="Id"]').prop('readonly');
        $('#modal-default input[name="Name"]').val(r.name);


        for (var i = 0; i < d.result.data.object.length; i++) {
            var item = d.result.data.object

            $('#objectList input[name="' + item[i].trim() + '"]').prop('checked', true);
        };


        var object = "";
        var id = $('#modal-default input[name="id"]').val();

        $('#modal-default select[name="Object"]').val(r.object_Id).trigger('change');

        $('#modal-default input[name="IsActive"]').prop('checked', r.is_Active);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
});
$(document).ready(function () {
    loadObject();
    loadData();
    loadObject1();
    $(".select2").select2();
    $('.btnFilter').click(function () { oTable.draw(); });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    $('.btnAddRow').click(function () {
        $('#objectList #objectCheckbox').prop('checked', false);
        $('#modal-default input[name="id"]').val('');
        $('#modal-default input[name="Id"]').val('');
        $('#modal-default input[name="Name"]').val('');
        $('#modal-default input[name="IsActive"]').prop('checked', true);
        $('#modal-default').modal({ backdrop: 'static', keyboard: false });
    });
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    $('.btnSaveModal').click(function () {

        var object = "";
        var id = $('#modal-default input[name="id"]').val();

        $('#objectCheckbox:checked').each(function () {
            object = object + $(this).val() + ',';
        });

        LoadAjaxAuth('POST', id === null || id === undefined || id.length === 0? APP_CONFIG.AddRow : APP_CONFIG.UpdateRow, {
            Object_Id: object,
            Name: $('.modal input[name="Name"]').val(),
            Id: $('#modal-default input[name="Id"]').val(),
            Is_Active: $('input[name="IsActive"]').prop('checked') ? 1 : 0
        }, getCookie('_tk'), function (d, s) {
            $('#modal-default').modal('hide');
            oTable.draw();
        });
    });
});