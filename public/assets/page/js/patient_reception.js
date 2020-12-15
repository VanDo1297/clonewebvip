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
const numberEachCall = 5;

function populateSelect($select, dataSet, placeholder) {
    $select
        .empty()
        .append($(`<option value="">${placeholder}</option>`))
        .append(...dataSet.map(d => $(`<option value="${d.value}">${d.text}</option>`)));
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


async function getTables() {
    const api = APP_CONFIG.GetTableAll;
    return await postData(api, {});
}

function populateTable(data = Global.Tables) {
    populateSelect($("#TableSelect"), data.map(d => ({
        value: d.code,
        text: d.name
    })), "Chọn phòng")

    if (data && data.length > 0) {
        const savedTable = getCookie("table");
        $("#TableSelect").val(savedTable);
    }
}

async function init() {
    const savedTable = getCookie("table");
    const isStarted = getCookie("is_started");
    const isStartedValue = isStarted && parseInt(isStarted) === 1;
    if (isStartedValue && savedTable !== undefined && savedTable !== "") {
        reloadQueue(savedTable);
    } else {
        Global.Tables = await getTables();
        populateTable();
        $("#call").hide();
        $("#home").show();
    }
}

$(document).ready(function () {
    init();
});

async function fetchQueue(table = Global.SelectedTable) {
    const api = APP_CONFIG.GetPatientQueue;

    return await postData(api, {
        "Table": table,
        "Limit": numberEachCall
    });
}

function updateQueue(queue) {
    if (queue === undefined) {
        return;
    }

    $("#table").text(Global.SelectedTable);
    $("#type1").text(Global.Type === PRIORITIZED ? "ƯU TIÊN" : "THƯỜNG");
    $("#from").text(queue.from === -1 ? "-" : queue.from);
    $("#to").text(queue.to === -1 ? "-" : queue.to);
    $("#callBtn").removeClass('btn-danger').removeClass('btn-primary');
    if (Global.Type === PRIORITIZED) {
        $("#callBtn").addClass('btn-primary');
    }
    if (Global.Type === NORMAL) {
        $("#callBtn").addClass('btn-danger');
    }
}

async function call() {
    const $callBtn = $("#callBtn");
    $callBtn.prop('disabled', true);
    const api = APP_CONFIG.Call;

    const queue = await postData(api, {
        "Table": Global.SelectedTable,
        "Limit": numberEachCall
    });
    if (queue) {
        if (queue.returnCode && queue.returnCode != 200) {
            toastr.error(queue.result.errors);
        } else {
            updateQueue(queue);
        }
    }
    setTimeout(function () {
        $callBtn.prop('disabled', false);
    }, TIMEOUT);
}

async function reloadQueue(table = Global.SelectedTable) {
    Global.SelectedTable = table;
    const queue = await fetchQueue(table);
    Global.Type = queue.type;
    updateQueue(queue);
    $("#home").hide();
    $("#call").show();
}

async function Exit() {
    //type = await changeType(-1);
    //Global.Type = type;
    setCookie("is_started", 0, 365);
    init();
}

async function Save() {
    Global.SelectedTable = $("#TableSelect").val();
    let type = $("#Type").val();
    if (Global.SelectedTable === "" || type === "") {
        return;
    }
    if ($("#SaveConfig").prop('checked')) {
        setCookie("table", Global.SelectedTable, 365);
        setCookie("is_started", 1, 365);
    }

    if (type !== undefined) {
        type = await changeType(type);
        Global.Type = type.type;
        reloadQueue()
    }

    // reloadQueue(Global.SelectedTable);
}

async function changeType(type = Global.Type) {
    const api = APP_CONFIG.ChangeType;
    return await postData(api, {
        "Table": Global.SelectedTable,
        "Type": type
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue + ";");
}