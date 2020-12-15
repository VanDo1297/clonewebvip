$(document).ready(function () {
    var username = getCookie('_user_name');
    var password = getCookie('_password');
    if (username == "null" || password == "null") return;
    $('#username').val(username);
    $('#password').val(password);

    document.cookie = '_tk=';
    document.cookie = '_permissions=';
    document.cookie = '_id=';
    document.cookie = '_full_name=';
});

function login() {
    event.preventDefault();

    if ($('#remember').is(':checked')) {
        document.cookie = '_password=' + encodeURIComponent($('#password').val());
    }

    let params = {
        UserName: $('#username').val(),
        Password: $('#password').val()
    };

    $.ajax({
        url: APP_CONFIG.Login,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        data: JSON.stringify(params),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result.token) {
                    document.cookie = '_tk=' + encodeURIComponent(result.token);
                    document.cookie = '_permissions=' + encodeURIComponent(JSON.stringify(result.permissions.map(p => p.code)));
                    document.cookie = '_id=' + encodeURIComponent(result.id);
                    document.cookie = '_full_name=' + encodeURIComponent(result.full_name);
                    document.cookie = '_user_name=' + encodeURIComponent(result.user_name);

                    if (result.token.indexOf('U_') === 0 || result.token.indexOf('E_') === 0)
                        location.href = APP_CONFIG.HomeUrl;
                }
            } else if (data.success == false) {
                var result = data.responseJSON;
                toastr.error(result.message);
            }
        },
        error: function (data) {
            var result = data.responseJSON;
            toastr.error(result.message);
        }
    });
}