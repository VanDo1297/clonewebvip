function resetPassword() {
    event.preventDefault();

    var password = $('#password').val();
    if (password === null || password === undefined || password === "") return;

    var repassword = $('#repassword').val();
    if (repassword === null || repassword === undefined || repassword === "") return;

    if (repassword != password) {
        toastr.error("Mật khẩu không khớp");
        return;
    }

    var url = new URL(window.location.href);
    var token = url.searchParams.get("token");

    let params = {
        "Token": token,
        "Password": $('#password').val()
    };

    $.ajax({
        url: APP_CONFIG.ResetPassword,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        data: JSON.stringify(params),
        success: function (data) {
            if (data.result) {
                location.href = APP_CONFIG.LoginUrl;
                toastr.success("Cập nhật mật khẩu thành công");
            } else {
                toastr.error("Cập nhật mật khẩu thất bại");
            }
        },
        error: function (data) {
            var result = data.responseJSON;
            toastr.error(result.message);
        }
    });
}