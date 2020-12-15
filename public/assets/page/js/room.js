const NORMAL = 0;
const PRIORITIZED = 1;
const WAITING = 0;
const CALLED = 1;
const TIMEOUT = 10000;
const Global = {
    queue: [],
};
const dumpQueue = [];
const dumpRoom = [];
const numberLimit = localStorage.getItem('number_limit');
const numberEachCall = numberLimit ? parseInt(numberLimit) : 5;

const numberLimitPriority = localStorage.getItem('number_limit_priority');
const numberEachCallPriority = numberLimitPriority ? parseInt(numberLimitPriority) : 3;

async function getNormalQueue() {
    return await getQueue(NORMAL, WAITING);
}

async function getPriorityQueue() {
    return await getQueue(PRIORITIZED, WAITING);
}


async function getRoom() {
    const api = APP_CONFIG.GetRoom;
    const data = await postData(api, {});
    return data;
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

function populateNormalQueue(data = Global.normalQueue) {
    const tbody = $("#normalQueue");
    tbody.empty();
    let count = 1;
    data.forEach(function (d) {
        const e = $(`<div class="row"><div class="col-md-4">
                        ${d.queueNumber}
                    </div>
                    <div class="col-md-8">
                        ${d.name}/${d.age} TUỔI
                    </div></div>`);
        tbody.append(e);
    });
}

function populatePriorityQueue(data = Global.priorityQueue) {
    const tbody = $("#priorityQueue");
    tbody.empty();
    data.forEach(function (d) {
        const e = $(`<div class="row"><div class="col-md-4">
                        ${d.queueNumber}
                    </div>
                    <div class="col-md-8">
                        ${d.name}/${d.age} TUỔI
                    </div></div>`);
        tbody.append(e);
    });
}

async function getQueue(type, status) {
    const api = APP_CONFIG.GetRoomQueue;

    return await postData(api, {
        room: Global.SelectedTable,
        limit: 10,
        type: type,
        status: status
    });
}

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

async function _parseJSON(response) {
    const text = await response.json();
    return text ? JSON.parse(text) : {};
};

function getXSRFToken() {
    return $("#xsrfToken").val();
}

async function init() {
    const savedRoom = getCookie("room");
    const isStarted = getCookie("is_started");
    const isStartedValue = isStarted && parseInt(isStarted) === 1;
    if (isStartedValue && savedRoom !== undefined && savedRoom !== "") {
        reloadQueue(savedRoom);
    } else {
        $("#call").hide();
        $("#home").show();
        Global.rooms = await getRoom();
        populateRoom();
    }
}

$(document).ready(function () {
    init();

    $('.province').select2({
        placeholder: 'Chọn mã phòng'
    });
});

async function getLatestNormalCall() {
    const api = APP_CONFIG.GetRoomQueue;
    const data = await postData(api, {
        "Room": Global.SelectedTable,
        "Limit": 1,
        "Type": NORMAL,
        "Status": CALLED
    });
    return data[0];
}

async function getLatestPriorityCall() {
    const api = APP_CONFIG.GetRoomQueue;
    const data = await postData(api, {
        "Room": Global.SelectedTable,
        "Limit": 1,
        "Type": PRIORITIZED,
        "Status": CALLED
    });
    return data[0];
}

async function reloadQueue(room = Global.SelectedTable) {
    const $callBtn = $(".call-btn");
    $callBtn.prop('disabled', false);
    Global.SelectedTable = room;
    // Global.queue = await getQueue();
    Global.normalQueue = [];
    Global.priorityQueue = [];
    Global.latestNormalCall = await getLatestNormalCall();
    Global.latestPriorityCall = await getLatestPriorityCall();
    if (Global.latestNormalCall === undefined) {
        $("#latestNormalCall").text("-");
    } else {
        $("#latestNormalCall").text(`${Global.latestNormalCall.queueNumber}`);
    }
    if (Global.latestPriorityCall === undefined) {
        $("#latestPriorityCall").text("-");
    } else {
        $("#latestPriorityCall").text(`${Global.latestPriorityCall.queueNumber}`);
    }
    Global.normalQueue = await getNormalQueue();
    populateNormalQueue(Global.normalQueue);
    Global.priorityQueue = await getPriorityQueue();

    populatePriorityQueue(Global.priorityQueue);

    $("#home").hide();
    $("#call").show();
}

async function normalCall() {
    const $callBtn = $(".call-btn");
    $callBtn.prop('disabled', true);
    const api = APP_CONFIG.RoomCall;
    var value = await postData(api, {
        "Room": Global.SelectedTable,
        "Number": numberEachCall,
        "Type": NORMAL
    });

    if (value) {
        if (value.returnCode && value.returnCode != 200) {
            toastr.error(value.result.errors);
        } else {
            reloadQueue();
        }
    }

    setTimeout(function () {
        $callBtn.prop('disabled', false);
    }, TIMEOUT);
}

async function priorityCall() {
    const $callBtn = $(".call-btn");
    $callBtn.prop('disabled', true);
    const api = APP_CONFIG.RoomCall;
    var value = await postData(api, {
        "Room": Global.SelectedTable,
        "Number": numberEachCallPriority,
        "Type": PRIORITIZED
    });

    if (value) {
        if (value.returnCode && value.returnCode != 200) {
            toastr.error(value.result.errors);
        } else {
            reloadQueue();
        }
    }

    setTimeout(function () {
        $callBtn.prop('disabled', false);
    }, TIMEOUT);
}
function Exit() {
    setCookie("is_started", 0, 365);
    init();
}
function Save() {
    Global.SelectedTable = $("#RoomSelect").val();
    if (Global.SelectedTable === "") {
        return;
    }
    if ($("#SaveConfig").prop('checked')) {
        setCookie("room", Global.SelectedTable, 365);
        setCookie("is_started", 1, 365);
    }

    reloadQueue(Global.SelectedTable);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue);
}

setInterval(async function () {
    const savedRoom = getCookie("room");
    const isStarted = getCookie("is_started");
    const isStartedValue = isStarted && parseInt(isStarted) === 1;
    if (isStartedValue && savedRoom !== undefined && savedRoom !== "") {
        reloadQueue(savedRoom);
    };
}, 30000);


$(function () {
    $('#RoomSelect').change(function () {
        localStorage.setItem('todoData', this.value);
    });
    if (localStorage.getItem('todoData')) {

        $('#RoomSelect').val(localStorage.getItem('todoData')).trigger('change');
    }

    $('#select_limit').change(function () {
        localStorage.setItem('number_limit', this.value);
    });
    if (localStorage.getItem('number_limit')) {
        $('#select_limit').val(localStorage.getItem('number_limit')).trigger('change');
    }

    $('#select_limit_priority').change(function () {
        localStorage.setItem('number_limit_priority', this.value);
    });
    if (localStorage.getItem('number_limit_priority')) {
        $('#select_limit_priority').val(localStorage.getItem('number_limit_priority')).trigger('change');
    }
});