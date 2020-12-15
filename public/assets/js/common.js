const languageDataTable = {
    lengthMenu: 'Hiển thị _MENU_',
    zeroRecords: 'Dữ liệu không tồn tại',
    info: 'Trang _PAGE_/_PAGES_',
    infoEmpty: 'Không tìm thấy kết quả',
    infoFiltered: '(Tìm kiếm trên _MAX_ dòng)',
    search: 'Tìm kiếm',
    searchPlaceholder: 'Nhập thông tin cần tìm',
    processing: 'Đang xử lý',
    select: {
        rows: ''
    },
    paginate: {
        first: '<<',
        previous: 'Trước',
        next: 'Sau',
        last: '>>'
    }
};

function openModal(modalName) {
    //$('#' + modalName).modal('show');
    $('#' + modalName).modal({ backdrop: 'static', keyboard: false, show: true });
}

function closeModal(modalName) {
    //$('#' + modalName).modal('hide');
    $('#' + modalName).modal('toggle');
}

function getFormData(name) {
    var a = "#" + name;
    for (var b = $(a + " input," + a + " select," + a + " textarea," + a + " checkboxchecked"), c = {}, d = 0; d < b.length; d++) {
        if ($(b[d]).attr('type') != 'checkbox')
            c[b[d].name] = b[d].value;
        else {
            c[b[d].name] = $(b[d]).prop('checked');
        }
    }
    return c
}

function resetForm(mfrmEditName, objGridColEdit) {
    $("#" + mfrmEditName).find("input, textarea, select").each(function () {
        $(this).val("");

        var strType = $(this).attr("type");
        if (strType === "checkbox") {
            $(this).prop('checked', false);
        }
    });
}

function setFormData(mfrmEditName, objDataSet) {
    if (objDataSet == undefined || objDataSet == null) return;

    $("#" + mfrmEditName).find("input, textarea, select").each(function () {
        var field = $(this).attr('name');

        var objValue;

        if (objDataSet.hasOwnProperty(field)) {
            objValue = objDataSet[field];

            if (objDataSet[field] == null)
                objValue = "";

            var objPropertyNames = Object.getOwnPropertyNames(objDataSet);

            for (var i = 0; i < objPropertyNames.length; i++) {
                if (objPropertyNames[i] == field) {
                    var strRole = $(this).attr("data-role");

                    if (strRole != undefined) {
                        var strID = $(this).attr("id");

                        var dropdownlist = $("#" + strID).data("kendoDropDownList");

                        if (dropdownlist != undefined) {
                            if (objValue == true || objValue == false) {
                                objValue = objValue == true ? "1" : "0";
                            }

                            objValue = $.trim(objValue);
                            dropdownlist.value(objValue);

                        } else {
                            $(this).val(objValue);
                        }
                    } else {
                        var strType = $(this).attr('type');

                        if (strType == "checkbox" || strType == "radio") {
                            $(this).prop('checked', objValue);
                        }

                        $(this).val(objValue);
                    }
                }
            }
        }
    });
}

function setDataSourceSelect(name, data, value = 'id', display = 'name') {
    var html = '';
    data.forEach((e, i) => {
        html += `<option value="${e[value]}">${e[display]}</option>`
    });
    $('#' + name).html(html);
}

function dataTableJS(name) {
    var self = this;
    var id = '#' + name;

    self.getmultiSelected = function () {
        var data = $(id).DataTable().rows({ selected: true }).data();
        return self.cDtA(data);
    }
    self.getRowSelected = function () {
        return $(id).DataTable().rows({ selected: true }).data()[0];
    }
    self.clear = function () {
        $(id).dataTable().fnClearTable();
    }
    self.getSource = function (data) {
        return $(id).DataTable().rows().data();
    }
    self.addSource = function (data) {
        $(id).dataTable().fnAddData(data);
    }
    self.reloadSource = function (data) {
        $(id).dataTable().fnClearTable();
        if (data && data.length > 0) {
            $(id).dataTable().fnAddData(data);
        }  
    }
    self.cDtA = function (data) {
        var results = [];

        for (i = 0; i < data.length; i++) {
            results.push(data[i]);
        }
        return results;
    }
};


logoutWeb = () => {
    $.removeCookie('_tk');
    location.href = "sysuser/login";
}