const init_device = function () {
    getRoom();
    getDoctor();
};
$(document).ready(init_device);
const Global = {};

function getRoom() {
    const api = APP_CONFIG.GetRooms;
    LoadAjaxAuth('POST', api, {}, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#modal-default').modal('hide');
            APP_CONFIG.Rooms = d;
            populateRoom();
            setAlert('thành công: ', 'Thêm thông tin');
        }

    })
}

function getDoctor() {
    const api = APP_CONFIG.GetDoctors;
    LoadAjaxAuth('POST', api, {}, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#modal-default').modal('hide');
            APP_CONFIG.Doctors = d;
            populateDoctor();
            setAlert('thành công: ', 'Thêm thông tin');
        }

    });
}


function populateSelect($select, dataSet, placeholder) {
    $select
        .empty()
        .append($(`<option value="">${placeholder}</option>`))
        .append(...dataSet.map(d => $(`<option value="${d.value}">${d.text}</option>`)));
}

function populateRoom(rooms = APP_CONFIG.Rooms) {
    populateSelect($('.RoomId'), rooms.map(room => ({
        value: room.id,
        text: room.description
    })), 'Chon phong');
}

function populateDoctor(doctors = APP_CONFIG.Doctors) {
    populateSelect($('.DoctorId'), doctors.map(doctor => ({
        value: doctor.id,
        text: doctor.name
    })), 'Chon bac si');
}