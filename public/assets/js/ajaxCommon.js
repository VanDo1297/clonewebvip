function sendRequest(url, data, cbSuccess, cbError, spiner = true) {
    var o = "POST";
    if (null === data)
        o = "GET";

    var dt = {};
    // Xử lý lấy fnCode để thêm vô request
    if (data !== {}) {
        dt = {
            fnCd: getUrlParameter('fnCode'),
            requestData: data
        };
    }
    $.ajax({
        headers: {
            Authorization: getCookie('_tk'),
        },
        url: domain + url,
        type: o,
        data: JSON.stringify(dt),
        dataType: "json",
        beforeSend: function () {
            if (spiner)
                messageUtility.ShowSpinner();
        },
        complete: function () {
            if (spiner)
                messageUtility.HideSpinner();
        }
    }).done(function (t) {
        if (t.success) {
            cbSuccess(t.result);
        } else {
            //if ((t.result.errors === "Token không hợp lệ." && t.result.errorCode === -1) || (t.returnCode === 401 && t.success === false)) {
            //    location.href = "sysuser/login";
            //}
            cbError(t, t.returnCode, t.result.errors);
        }
    }).fail(function (t, n, a) {
        cbError(t, n, a);
        console.log(t, n, a);
    })
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};