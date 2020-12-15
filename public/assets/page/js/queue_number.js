const Global = {
    queue: [],
};

async function postData(url = '', data = {}) {
    // Default options are marked with *
    try {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            accept: 'application/json',
            headers: {
                'Authorization': getCookie('_tk'),
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            'Origin': 'http://localhost:63342/',
            // 'X-CSRF-TOKEN': getXSRFToken(),
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return await response.json(); // parses JSON response into native JavaScript objects
    } catch (e) {
        console.log(e);
    }
}

async function getRoom() {
    const api = APP_CONFIG.GetRoom;
    const data = await postData(api, {});
    return data;
}

function Save() {
    Global.SelectedTable = $("#RoomSelect").val();
    if (Global.SelectedTable === "") {
        return;
    }

    reloadQueue(Global.SelectedTable);
}

function Exit() {
    var pTable = $('#HoldTable').DataTable();
    pTable.clear().draw();
    init();
}

async function reloadQueue(room = Global.SelectedTable) {
    const $callBtn = $(".call-btn");
    $callBtn.prop('disabled', false);
    Global.SelectedTable = room;
    $("#home").hide();
    getPatientsInRoom(room);
    $('#manage-queue text[name="current-room"]').html(room);
    $("#manage-queue").show();
}

async function init() {
    Global.rooms = await getRoom();
    populateRoom();
}

function populateSelect($select, dataSet, placeholder) {
    $select
        .empty()
        .append($(`<option value="">${placeholder}</option>`))
        .append(...dataSet.map(d => $(`<option value="${d.value}">${d.text}</option>`)));
}

function populateRoom(rooms = Global.rooms) {
    populateSelect($('#RoomSelect'), rooms.map(room => ({
        value: room.code,
        text: room.description
    })), 'Chọn phòng');

    if (rooms && rooms.length > 0) {
        const savedRoom = getCookie("room");
        $("#RoomSelect").val(savedRoom);
    }
}

$(document).ready(function () {
    init();

    $('.province').select2({
        placeholder: 'Chọn mã phòng'
    });
});

var loadPatiensInTalbe = function (patientsInRooms) {
    var pTable = $('#PatientTable').DataTable({
        //pageLength: APP_CONFIG.pageLength,
        //lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
        //orderCellsTop: true,
        destroy: true,
        //retrieve: true,
        processing: true,
        //serverSide: true,
        filter: false,
        order: [[3, 'asc']],
        //sort: true,
        //bInfo: false,
        //bAutoWidth: true,
        //scrollX: true,
        //scrollCollapse: true,
        //paging: false,
        //searching: false,
        data: [],
        columns:
            [
                {
                    "data": "id",
                    "sClass": "text-center",
                    "mRender": function (data, type, full, meta) {
                        return (meta.row + 1 + meta.settings._iDisplayStart);
                    }
                },
                { "data": "patient_code", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "full_name", "sClass": "left", "bSearchable": true, "bSortable": true },
                { "data": "number", "sClass": "text-center", "bSearchable": true, "bSortable": true },
                {
                    "data": "birth_day", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format('L') : "";
                    }
                },
                {
                    "data": "gender", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? (data === 1 ? "Nam" : "Nữ") : "";
                    }
                },
                {
                    "data": "type", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data === 1 ? "Ưu tiên" : "Thường";
                    }
                },
                {
                    "data": "is_called", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data === true ? "Đã gọi" : "Chưa gọi";
                    }
                },
                {
                    "data": "created_date", "sClass": "left",
                    "mRender": function (data, type, full, meta) {
                        return data ? moment(data).format("DD/MM/YYYY HH:mm:ss") : "";
                    }
                }
            ],
        buttons: []
    });

    pTable.on('draw.dt page.dt order.dt search.dt', function () {
        pTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    pTable.rows.add(patientsInRooms).draw();
}

var getPatientsInRoom = function (room) {
    LoadAjaxAuth('POST', APP_CONFIG.GetPatientsInRoom, {
        DepartmentCode: room,
    }, getCookie('_tk'), function (d, s) {
        if (d.success) {
            var result = d.result;
            loadPatiensInTalbe(result.patientsInRooms);
        }
        else {
            toastr.error('Không tìm thấy số thứ tự trong phòng này !');
        }
    });
}

$(document).on('click', '#searchBtn', function () {
    Global.SelectedTable = $("#RoomSelect").val();
    if (Global.SelectedTable === "") {
        toastr.warning("Vui lòng chọn phòng để tìm kiếm");
        return;
    } else {
        getPatientsInRoom(Global.SelectedTable);
    }
});

