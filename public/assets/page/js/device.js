const init_device = function () {
    getRoom();
};
$(document).ready(init_device);
const Global = {
};

function getRoom() {
    const api = APP_CONFIG.GetRooms;
    LoadAjaxAuth('POST', api, {}, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#modal-default').modal('hide');
            APP_CONFIG.Rooms = d;
            populateRoom(APP_CONFIG.Rooms);
            setAlert('thành công: ', 'Thêm thông tin');
        }

    })
}

function populateSelect($select, dataSet, placeholder) {
    $select
        .empty()
        .append($(`<option value="">${placeholder}</option>`))
        .append(...dataSet.map(d => $(`<option value="${d.value}">${d.text}</option>`)));
}

function populateRoom(rooms) {
    populateSelect($('.RoomId'), rooms.map(room => ({
        value: room.id,
        text: room.description
    })), 'Chọn phòng');
}

$('.RoomId').on('change', function () {
    var roomId = $(this).find(":selected").val();
    var room = APP_CONFIG.Rooms.find(x => x.id === roomId);

    if (room === null || room === undefined) return;
    $('.Code').val(room.code);
});