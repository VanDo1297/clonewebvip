var loadData = function () {
    var url = APP_CONFIG.GetById + '/' + getCookie('_id');
    LoadAjaxAuth('GET', url, { }, getCookie('_tk'), function (d, s) {
        var result = d.result;

        var title = document.getElementById('title');
        $.each(result.list_titles, function (index, value) {
            var opt = document.createElement('option');
            opt.value = value.id;
            opt.text = value.description;
            title.appendChild(opt);
        });

        var position = document.getElementById('position');
        $.each(result.list_positions, function (index, value) {
            var opt = document.createElement('option');
            opt.value = value.id;
            opt.text = value.description;
            position.appendChild(opt);
        });

        document.getElementById("image").src = result.image_Url;
        document.getElementById("namePro").innerHTML = result.full_name;

        $('#user_name').val(result.user_name);
        $('#code').val(result.code);
        $('#name').val(result.full_name);
        $('#sex').val(result.sex);
        $('#email').val(result.email);
        var bits = result.birthdate.split(/\D/);
        var date = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
        var birthdate = date.toISOString().split('T')[0];
        $('#birthdate').val(birthdate);
        $('#phone').val(result.phone);
        $('#title').val(result.title);
        $('#position').val(result.position);
        $('#oldPass').val('');
        $('#newPass').val('');
        $('#renewPass').val('');
    });
};

$(document).ready(function () {
    loadData();
});

$('#btnSave').click(function () {

    resetValidation();

    var id = getCookie('_id');
    var oldPass = $('#oldPass').val();
    var newPass = $('#newPass').val();
    var renewPass = $('#renewPass').val();

    if (oldPass === null || oldPass === undefined || oldPass.length === 0) {
        $("#valid-pass").removeClass('invalid-feedback');
        $("#valid-pass").addClass("error-validation");
        $("#oldPass").addClass("error-field");
        return;
    }
    else {
        if (newPass === null || newPass === undefined || newPass.length === 0) {
            $("#valid-new-pass").removeClass('invalid-feedback');
            $("#valid-new-pass").addClass("error-validation");
            $("#newPass").addClass("error-field");
            return;
        }

        if (renewPass === null || renewPass === undefined || renewPass.length === 0) {
            $("#valid-renew-pass").removeClass('invalid-feedback');
            $("#valid-renew-pass").addClass("error-validation");
            $("#renewPass").addClass("error-field");
            return;
        }

        LoadAjaxAuth('POST', APP_CONFIG.CheckPass, {
            UserName: getCookie('_user_name'),
            Password: oldPass,
        }, getCookie('_tk'), function (d, s) {
                if (d.result === false) {
                    $("#valid-pass").html('Mật khẩu cũ không chính xác');
                    $("#valid-pass").removeClass('invalid-feedback');
                    $("#valid-pass").addClass("error-validation");
                    $("#oldPass").addClass("error-field");
                    return;
                }
                else {
                    if (renewPass != newPass) {
                        $("#valid-renew-pass").html("Mật khẩu không khớp");
                        $("#valid-renew-pass").removeClass('invalid-feedback');
                        $("#valid-renew-pass").addClass("error-validation");
                        $("#renewPass").addClass("error-field");
                        return;
                    }

                    LoadAjaxAuth('PUT', APP_CONFIG.Update + id, {
                        Password: $('#newPass').val(),
                        Email: $('#email').val(),
                        Phone: $('#phone').val(),
                        Birthdate: $('#birthdate').val(),
                        Title: $('#title :selected').val(),
                        Position: $('#position :selected').val(),
                    }, getCookie('_tk'), function (data, status) {
                        if (status == 'success'){
                            toastr.success('Cập nhật thành công');
                            $('#oldPass').val('');
                            $('#newPass').val('');
                            $('#renewPass').val('');
                        }
                        else {
                            toastr.error('Cập nhật thất bại');
                        }
                    });
                }
        });
    }
});

function resetValidation() {
    $("#valid-pass").addClass('invalid-feedback');
    $("#valid-pass").removeClass("error-validation");
    $("#valid-new-pass").addClass('invalid-feedback');
    $("#valid-new-pass").removeClass("error-validation");
    $("#valid-renew-pass").addClass('invalid-feedback');
    $("#valid-renew-pass").removeClass("error-validation");
    $("#oldPass").removeClass("error-field");
    $("#newPass").removeClass("error-field");
    $("#renewPass").removeClass("error-field");
}