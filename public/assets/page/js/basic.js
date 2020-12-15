function formatDate(t) { var e = new Date(t), n = "" + (e.getMonth() + 1), a = "" + e.getDate(), g = e.getFullYear(); return n.length < 2 && (n = "0" + n), a.length < 2 && (a = "0" + a), [g, n, a].join("/") }
function LoadAjax(n, t, i, r) { $.ajax({ type: n, url: t, data: i, cache: !1, success: r, error: r }) }
var format = function (num) {
    var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
    if (str.indexOf(".") > 0) {
        parts = str.split(".");
        str = parts[0];
    }
    str = str.split("").reverse();
    for (var j = 0, len = str.length; j < len; j++) {
        if (str[j] != ",") {
            output.push(str[j]);
            if (i % 3 == 0 && j < (len - 1)) {
                output.push(",");
            }
            i++;
        }
    }
    formatted = output.reverse().join("");
    return (formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
};
function LoadAjaxAuth(method, url, data, auth, callback) {
    $.ajax({
        type: method,
        headers: {
            Authorization: auth
        }, dataType: "json", contentType: "application/json; charset=utf-8"
        , url: url, data: JSON.stringify(data), cache: !1, success: callback, error: callback
    });

    //$.ajax({
    //    url: t,
    //    headers: {
    //        Authorization: $.cookie('_tk'),
    //    },
    //    type: o,
    //    data: JSON.stringify(i),
    //    dataType: "json",
    //    contentType: "application/json; charset=utf-8",
    //    beforeSend: function () {
    //        if (spiner)
    //            messageUtility.ShowSpinner();
    //    },
    //    complete: function () {
    //        if (spiner)
    //            messageUtility.HideSpinner();
    //    }
    //}).done(function (t) {
    //    if (t.success) {
    //        cbSuccess(t.result);
    //    } else {
    //        if ((t.result.errors === "Token không hợp lệ." && t.result.errorCode === -1) || (t.returnCode === 401 && t.success === false)) {
    //            location.href = "sysuser/login";
    //        }
    //        cbError(t, t.returnCode, t.result.errors);
    //    }
    //}).fail(function (t, n, a) {
    //    cbError(t, n, a);
    //    console.log(t, n, a);
    //})
}

function keepAlive() {
    setInterval(function () { LoadAjax('GET', WEB_CONFIG.PING, {}, function () { }); }, 300000);
}
function loadingHTML() {
    return '<div class="text-center loading"><i class="zmdi zmdi-settings zmdi-hc-spin"><\/i> Loading...<\/div>';
}
function chartNoData() {
    return '<p><code>No data available in chart.</code></p>';
}
function setAlert(m, t, pri) {
    //$.toaster({ message: m, title: t, priority: pri, timeout: 5000 });//,,success
    $.notify({
        icon: '',
        title: t,
        message: m,
        url: ''
    }, {
            element: 'body',
            type: 'inverse',
            allow_dismiss: true,
            //placement: {
            //    from: from,
            //    align: align
            //},
            offset: {
                x: 20,
                y: 20
            },
            spacing: 10,
            z_index: 2000,
            delay: 5000,
            timer: 1000,
            url_target: '_blank',
            mouse_over: false,
            animate: {
                enter: 'animated fadeInRight',
                exit: 'animated fadeOutRight'
            },
            template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert--notify" role="alert">' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '<button type="button" aria-hidden="true" data-notify="dismiss" class="close"><span>×</span></button>' +
                '</div>'
        });
}
function getCookie(name) {
    var results = document.cookie.match ('(^|;) ?' + name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : null;
}
function setFirstSelect(ele) {
    $(ele).val($(ele + " option:first").val()).trigger('change');
}
function getListMenu() {
    var token = getCookie('_tk');
    var param = {};
    param.Token = token;
    sendRequest(
        "api/roles/getmenu",
        param,
        (result) => {
            $('#ulMenu').append(result.data);
            //createIndexColumn(result.data);
            //jsTableDepartmentSetting.reloadSource(result.data);
        },
        (xhr, status, err) => {
            messageUtility.ShowMessage('error', err);
        },
        false
    )
}
//$('#leftmenu').append('<li cla1ss="menu-item-has-children dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ticket" aria-hidden="true"></i> Quan ly lich kham</a><ul class="sub-menu children dropdown-menu"><li><i class="fa fa-ticket" aria-hidden="true"></i><a href="/department/index/*?fnCode=FN0003*/">Quản lý chuyên khoa</a></li></ul> </li>')


// $(document).ready(function () {
//     for (var i = 0; i < WEB_CONFIG.ARRALERT.length; i++) {
//         setAlert(WEB_CONFIG.ARRALERT[i].m, WEB_CONFIG.ARRALERT[i].t, '');
//     }
//     //getListMenu();
//     keepAlive();
//     $('.btnFullScreen').click(function () {
//         if ($(this).attr('data-sa-action') == 'fullscreen') {
//             setTimeout(function () {
//                 $('.btnFullScreen').attr('data-sa-action', 'fullscreens');
//             }, 100);
//         }
//         else {
//             setTimeout(function () {
//                 $('.btnFullScreen').attr('data-sa-action', 'fullscreen');
//             }, 100);
//             try {
//                 if (document.cancelFullScreen) {
//                     document.cancelFullScreen();
//                 } else if (document.mozCancelFullScreen) {
//                     document.mozCancelFullScreen();
//                 } else if (document.webkitCancelFullScreen) {
//                     document.webkitCancelFullScreen();
//                 } else if (document.msExitFullscreen) {
//                     document.msExitFullscreen();
//                 }
//             }
//             catch (e) { }
//         }
//     });
// })
/**
 * Open model by id
 * @param {any} id      : Identifier
 */
function openModel(id) {
    $('#' + id).modal({ show: true, focus: true, keyboard: false, backdrop: false });
}
/**
 * Set border error for input control when validate is wrong 
 */
$(document).ready(function () {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $("input.input-validation-error")
        .closest(".form-group").addClass("has-danger");

	$(":input").attr("autocomplete", "off");
        
    // loadUserRole();
});

// async function loadUserRole() {
//     document.getElementById("full_name").innerHTML = getCookie("_full_name");

//     // Check role
//     var permissions = JSON.parse(getCookie("_permissions"));
//     $.each(permissions, function (index, value) {
//         if (value.includes("INDEX")) {
//             var func = value.substring(0, value.indexOf('.')).toLowerCase();
//             var name = "submenu-" + func;
//             var menuItems = document.getElementsByName(name);
//             if (menuItems && menuItems.length > 0) {
//                 $.each(menuItems, function (index, menuItem) {
//                     menuItem.style.display = "block";
//                 });
//             }
//         }
//     });

//     // Hide empty menu
//     var megaMenus = document.getElementsByClassName("mega-menu-dropdown");
//     if (megaMenus && megaMenus.length > 0) {
//         $.each(megaMenus, function (index, megaMenu) {
//             var menuItems = megaMenu.getElementsByClassName("nav-item");
//             if (menuItems && menuItems.length > 0) {
//                 $.each(menuItems, function (index, menuItem) {
//                     if (menuItem && menuItem.style && menuItem.style.display != "none") {
//                         megaMenu.style.display = "block";
//                     }
//                 });
//             }
//         });
//     }
// }

/**
 * Set input control use icheck plugin
 * */
function setIcheck() {
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    })
}

/**
 * Show warning message
 * @param {any} msg     : Message
 */
function showConfirmWarning(msg) {
    $.confirm({
        title: 'Thông báo',
        content: msg,
        icon: 'fa fa-warning',
        theme: 'material',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        escapeKey: true,
        animation: 'none',
        closeAnimation: 'zoom',
        type: 'orange',
        buttons: {
            ok: {
                text: 'Ok'
            }
        }
    });
}

/**
 * Show confirm question
 * @param {any} msg         : Message
 * @param {any} callback    : Callback function
 */
function showConfirmQuestion(msg, callback) {
    $.confirm({
        title: 'Cảnh báo',
        content: msg,
        icon: 'fa fa-question',
        theme: 'material',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        escapeKey: true,
        animation: 'none',
        closeAnimation: 'zoom',
        type: 'red',
        buttons: {
            ok: {
                text: 'Đồng ý',
                btnClass: 'btn-danger'
            },
            cancel: {
                text: 'Hủy',
                btnClass: 'btn-success'
            }
        },
        onAction: function (btnName) {
            if (btnName === 'ok') {
                this.close();
                callback();
            }
        }
    });
}

/**
 * Show confirm error message
 * @param {any} msg : Message
 */
function showConfirmError(msg) {
    $.confirm({
        title: 'Thông báo',
        content: msg,
        icon: 'fa fa-warning',
        theme: 'material',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        escapeKey: true,
        animation: 'none',
        closeAnimation: 'zoom',
        type: 'red',
        buttons: {
            ok: {
                text: 'Ok'
            }
        }
    });
}

/**
 * Call when ajax excute into error case
 * @param {any} xhr
 * @param {any} status
 * @param {any} error
 */
function ajaxError(xhr, status, error) {
    showConfirmError('Lỗi trong quá trình xử lý');
    console.log(xhr);
    console.log(error);
}
/**
 * Notification success message
 * @param {any} msg
 */
function notification(msg) {
    if (msg === 'undefined' | msg.length === 0) {
        return;
    }
    Lobibox.notify('success', {
        sound: false,
        delay: 3000,
        size: 'mini',
        icon: false,
        position: 'bottom right',
        msg: msg
    });
}

/**
 * Format number
 * @param {any} num
 */
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function populateSelect($select, placeholder, dataSet,) {
    $select
        .empty()
        .append($(`<option value="">${placeholder}</option>`))
        .append(...dataSet.map(d => $(`<option value="${d.value}">${d.text}</option>`)));
}
//Giải quyết vấn đề  Modal đầu không scroll khi modal 2 tắt
$('body').on('hidden.bs.modal', '.modal', function (e) {
    if ($('.modal').is(':visible')) { // check if first modal open 
        $('body').addClass('modal-open'); // re-add class 'modal-open' to the body because it was removed when we close the second modal
        $('.modal').focus(); // Focus first modal to activate scrollbar
    }
});
// end


