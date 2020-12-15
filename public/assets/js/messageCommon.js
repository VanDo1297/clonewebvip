var messageUtility = new function () {
    var self = this;
    self.ShowMessage = function (type, content, callbackFunction, withResource) {
        var n = noty({
            text: withResource === undefined ? content : L(content),
            type: type,
            layout: jQuery(this).data("notify-layout") ? jQuery(this).data("notify-layout") : 'topRight',
            animation: {
                open: 'animated bounceIn',
                close: 'animated fadeOut',
                speed: 200
            },
            timeout: 3000,
            callback: {
                onShow: function () {
                    if (callbackFunction !== null && callbackFunction !== undefined) {
                        callbackFunction();
                    }
                }
            }
        });
    };

    self.ShowConfirm = function (buttons, cbLeftButton, cbRightButton) {
        var n = noty({
            text: "Bạn có muốn tiếp tục không ?",
            layout: 'center',
            animation: {
                open: 'animated bounceIn',
                close: 'animated fadeOut',
                speed: 200
            },
            buttons: [
                {
                    addClass: 'btn btn-primary', text: buttons[0], onClick: function ($noty) {
                        if (cbLeftButton)
                            cbLeftButton();
                        $noty.close();
                    }
                },
                {
                    addClass: 'btn btn-danger', text: buttons[1], onClick: function ($noty) {
                        if (cbRightButton)
                            cbRightButton();
                        $noty.close();
                    }
                }
            ]
        });
    };

    self.ShowSpinner = function () {
        $('#modal-spinner').modal('show');
    };

    self.HideSpinner = function () {
        //$('#modal-spinner').modal('hide');

        $("#modal-spinner").removeClass("in");
        $(".modal-backdrop").remove();
        $("#modal-spinner").hide();
    }
}