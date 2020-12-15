function send() {
    event.preventDefault();

    var email = $('#email').val();
    if (email === null || email === undefined || email === "") return;

    let checkParams = {
        Email: email
    };

    $.ajax({
        url: APP_CONFIG.CheckEmail,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        data: JSON.stringify(checkParams),
        success: function (data) {
            let sendParams = {
                Link: APP_CONFIG.ResetUrl,
                FromEmail: APP_CONFIG.Mail,
                PassFromEmail: APP_CONFIG.PassMail,
                ToEmail: email
            };

            if (data.success && data.result) {
                $.ajax({
                    url: APP_CONFIG.SendEmail,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    datatype: JSON,
                    data: JSON.stringify(sendParams),
                    success: function (data) {
                        if (data.success == true) {
                            toastr.success("Gửi email thành công");
                        } else {
                            toastr.error("Gửi email thất bại");
                        }
                    },
                    error: function (data) {
                        var result = data.responseJSON;
                        toastr.error(result.message);
                    }
                });
            } else {
                toastr.error("Email không tồn tại trong hệ thống");
            }
        },
        error: function (data) {
            var result = data.responseJSON;
            toastr.error(result.message);
        }
    });
}