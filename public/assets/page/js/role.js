

function loadRoles() {
    if (APP_CONFIG.Table !== undefined) {
        APP_CONFIG.Table.ajax.reload(null, false);
        return;
    }
    APP_CONFIG.Table = $('#MainTable').DataTable({
        pageLength: APP_CONFIG.pageLength,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: true,
        sort: true,
        order: [[1, 'asc']],
        bInfo: true,
        bAutoWidth: true,
        processing: true,
        ajax:
            {
                "url": APP_CONFIG.GetAll,
                "headers": { Authorization: getCookie('_tk') },
                "type": "GET",
                "contentType": "application/json; charset=utf-8",
                "dataType": "JSON",
                "dataSrc": function (data) {
                    APP_CONFIG.Roles = data.result;
                    return data.result;
                }
            },
        columns:
            [
                { "data": "id", "bSearchable": false, "bSortable": false, "sClass": "text-center" },
                { "data": "code", "bSearchable": true, "bSortable": true },
                { "data": "name", "bSearchable": true, "bSortable": true},
                { "data": "description", "bSearchable": true, "bSortable": true},
                {
                    "data": "id",
                    "bSearchable": false,
                    "bSortable": false,
                    "mRender": function (data, type, full, meta) {
                        return '<a class="btn btn-primary btn-sm btn--icon-text btnEdit" data-id="' + full.id + '" onclick="showPermissionsModal(this)"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Ds nội dung truy cập</a>' +
                            '<a class="row-function-users btn btn-success btn-sm btn--icon-text btnEdit" data-id="' + full.id + '" onclick="showUsersModal(this)"><i class="zmdi zmdi-edit zmdi-hc-fw"></i> Ds người dùng</a>' +
                            '<a class="row-function-users btn btn-danger btn-sm btn--icon-text btnEdit" data-id="' + full.id + '" onclick="deleteRole(this)"><i class="zmdi zmdi-delete zmdi-hc-fw"></i> Xóa</a>';
                    }
                },
            ],
        buttons: []
    });

    APP_CONFIG.Table.on('order.dt search.dt', function () {
        APP_CONFIG.Table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

function deleteRole(sender) {
    var roleId = sender.getAttribute("data-id");
    APP_CONFIG.currentRoleId = roleId;
    $('#confirm-delete-role input[name="id"]').val(roleId);
    $('#confirm-delete-role').modal({ backdrop: 'static', keyboard: false });
}

$('#btn-delete-role').click(function () {
    $.ajax({
        "url": APP_CONFIG.DeleteRole + $('#confirm-delete-role input[name="id"]').val(),
        "type": "DELETE",
        "headers": { Authorization: getCookie('_tk') },
        "contentType": "application/json; charset=utf-8",
        "dataType": "JSON",
        "success": function (data) {
            $('#confirm-delete-role').modal('hide');
            toastr.success('Xóa quyền truy cập thành công');
            getRoles();
        }
    })
});

function populatePermissionRole() {
    var roleId = APP_CONFIG.currentRoleId;
    var role = APP_CONFIG.Roles.filter(function (i) {
        return i.id === roleId;
    })[0];
    
    var permissions = role.permissions.map(function (p) {
        return p.id;
    });

    $('.permission-checkbox').each(function (index, item) {
        var i = $(item);

        if (permissions.includes(i.val())) {
            i.prop('checked', true);
        } else {
            i.prop('checked', false);
        }
    });
    return role;
}

function showPermissionsModal(sender) {
    APP_CONFIG.currentRoleId = sender.getAttribute("data-id");
    var role = populatePermissionRole();
    $('.modal-title-permissions').text("Nội dung truy cập của " + role.name);
    $('#modal-permission').modal({backdrop: 'static', keyboard: false});
    
}

function populateUserRole() {
    if (APP_CONFIG.currentRoleId === undefined || APP_CONFIG.currentRoleId === null ||
        APP_CONFIG.Roles === undefined || APP_CONFIG.Roles === null) return;
    var roleId = APP_CONFIG.currentRoleId;
    var role = APP_CONFIG.Roles.filter(function (i) {
        return i.id === roleId;
    })[0];

    APP_CONFIG.selectedUsers = role.users.map(function (p) {
        return p.id;
    });


    $('.user-checkbox').each(function (index, item) {
        var i = $(item);

        if (APP_CONFIG.selectedUsers.includes(i.val())) {
            i.prop('checked', true);
        } else {
            i.prop('checked', false);
        }
    });
    return role;
}

function showUsersModal(sender) {
    APP_CONFIG.currentRoleId = sender.getAttribute("data-id");
    var role = populateUserRole();
    $('.modal-title-users').text("DS người dùng có quyền " + role.name);
    $('#modal-users').modal({backdrop: 'static', keyboard: false});
}

$('#modal-users').on('shown.bs.modal', function () {
    var table = $('#table-users').DataTable();
    table.columns.adjust();
});

function savePermission() {
    var checkedPermissions = [];
    $('.permission-checkbox').each(function (index, item) {
        var i = $(item);
        if (i.prop('checked')) {
            checkedPermissions.push(i.val());
        }
    });
    var roleId = APP_CONFIG.currentRoleId;
    var requestUpdatePermission = {
        "PermissionIds": checkedPermissions
    };
    closePermission();
    $.ajax({
        "url": APP_CONFIG.UpdatePermissions + roleId,
        "type": "PUT",
        "headers": { Authorization: getCookie('_tk') },
        "contentType": "application/json; charset=utf-8",
        "dataType": "JSON",
        "data": JSON.stringify(requestUpdatePermission),
        "success": function (data) {
            getRoles();
        }

    })
}

function saveUser() {
    var requestUpdateUsers = {
        "UserIds": APP_CONFIG.selectedUsers
    };

    closeUser();
    $.ajax({
        "url": APP_CONFIG.UpdateUsers + APP_CONFIG.currentRoleId,
        "type": "PUT",
        "headers": { Authorization: getCookie('_tk') },
        "contentType": "application/json; charset=utf-8",
        "dataType": "JSON",
        "data": JSON.stringify(requestUpdateUsers),
        "success": function (data) {
            getRoles();
        }

    })
}

function closePermission() {
    $('#modal-permission').modal('hide');
}

function closeUser() {
    $('#modal-users').modal('hide');
}

async function getPermissions() {
    $('#table-permission').DataTable({
        pageLength: -1,
        lengthChange: false,
        orderCellsTop: true,
        destroy: true,
        retrieve: true,
        filter: false,
        sort: true,
        order: [[2, 'asc']],
        paging: false,
        bInfo: false,
        bAutoWidth: true,
        ajax:
        {
            "url": APP_CONFIG.GetPermissions,
            "headers": { Authorization: getCookie('_tk') },
            "type": "GET",
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "dataSrc": "result",
        },
        columns:
            [
                {
                    "data": "id", "bSearchable": false, "bSortable": false,
                    "mRender": function (data, type, full, meta) {
                        return '<label class= "rt-chkbox rt-chkbox-single rt-chkbox-outline"><input type="checkbox" class="checkboxes permission-checkbox" value="' + full.id + '"/><span></span></label>';
                    }
                },
                { "data": "code", "bSearchable": true, "bSortable": true },
                { "data": "description", "bSearchable": true, "bSortable": true }
            ],
        buttons: [],
        columnDefs: [
            { "visible": false, "targets": 2 }
        ],
        drawCallback: function (settings) {
            $("#table-permission thead").remove();

            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(2, { page: 'current' }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="5">' + group + '</td></tr>'
                    );

                    last = group;
                }
            });
        }
    });
}

function addRole() {
    var roleName = $("#addRoleName").val();
    var roleDescription = $("#addRoleDescription").val();
    var roleCode = $("#addRoleCode").val();
    var isActive = $('#modal-addrole input[name="isActive"]').prop('checked');
    var roles = APP_CONFIG.Roles;
    var role = roles.find(function (e) {
        return e.code === roleCode;
    });
    if (role === undefined) {
        var requestBody = {
            "code": roleCode,
            "name": roleName,
            "description": roleDescription,
            "is_active": isActive
        };
        $.ajax({
            "url": APP_CONFIG.AddRole,
            "type": "POST",
            "headers": { Authorization: getCookie('_tk') },
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": JSON.stringify(requestBody),
            "success": function (data) {
                $('#modal-addrole').modal('hide');
                toastr.success('Thêm quyền truy cập thành công');
                getRoles();
            }

        })
    } else {
        toastr.error('Đã tồn tại quyền truy cập này');
    }
}

async function getUsers() {
    var tableUser = $('#table-users').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
        processing: true,
        serverSide: false,
        filter: true,
        order: [[1, 'asc']],
        sort: true,
        bInfo: false,
        bAutoWidth: true,
        scrollX: true,
        scrollCollapse: true,
        ajax:
        {
            "url": APP_CONFIG.GetUsers,
            "headers": { Authorization: getCookie('_tk') },
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "JSON",
            "data": function (d) {
                return JSON.stringify(d);
            }
        },
        columns:
            [
                {
                    "data": "id", "bSearchable": false, "bSortable": false,
                    "mRender": function (data, type, full, meta) {
                        return '<label class= "rt-chkbox rt-chkbox-single rt-chkbox-outline"><input id="cbSelectUser" type="checkbox" class="checkboxes user-checkbox" value="' + full.id + '"/><span></span></label>';
                    }
                },
                { "data": "user_name", "bSearchable": true, "bSortable": true },
                { "data": "code", "bSearchable": true, "bSortable": true },
                { "data": "full_name", "bSearchable": true, "bSortable": true }
            ]
    });

    tableUser.on('draw.dt order.dt search.dt page.dt length.dt', function () {
        populateUserRole();
    }).draw();
}

function getRoles() {
    loadRoles();
}

$(document).on('click', '#btnAddRole', function () {
    $('#addRoleCode').val('');
    $('#addRoleName').val('');
    $('#addRoleDescription').val('');
    $('#modal-addrole').modal('show');
})

$(document).on('click', '#btnAddPermission', function () {
    $('#addPermissionMenu').val('');
    $('#addPermissionFunction').val('');
    $('#modal-addpermision').modal('show');
})

$(document).ready(function () {
    getRoles();
    getPermissions();
    getUsers();
});

$(document).on('change', '#cbSelectUser', function () {
    if (this.checked) {
        APP_CONFIG.selectedUsers.push($(this).val());
    }
    else {
        var index = APP_CONFIG.selectedUsers.indexOf($(this).val());
        if (index !== -1) APP_CONFIG.selectedUsers.splice(index, 1);
    }
});