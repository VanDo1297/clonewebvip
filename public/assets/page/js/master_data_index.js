$(document).ready(init);

function getInputValue($input) {
    const tagName = $input.prop("tagName");
    if (tagName === 'INPUT') {
        const type = $input.attr("type");
        if (type === 'text') {
            return $input.val();
        }
        if (type === 'radio') {
            return $input.filter(":checked").val();
        }
        if (type === 'date') {
            return $input.val();
        }
        if (type === 'datetime-local') {
            return $input.val();
        }
        if (type === 'checkbox') {
            return $input.prop('checked');
        }
        
    }
    if(tagName ==='SELECT'){
        
            return $input.val();
    }
    if(tagName ==='DIV'){

        return $input.val();
    }
}

function setInputValue($input, value) {
    const tagName = $input.prop("tagName");
    if (tagName === 'INPUT') {
        const type = $input.attr("type");
        if (type === 'text') {
            $input.val(value);
            return;
        }
        if (type === 'radio') {
            $input[value].prop('checked', true);
            return;
        }
        if (type === 'date') {
            $input.val(moment(value).format("YYYY-MM-DD"));
            return;
        }
        if (type === 'datetime-local') {
            $input.val(moment(value).format("YYYY-MM-DDTHH:mm"));
            return;
        }
        if (type === 'checkbox') {
            $input.prop('checked', value);
            return;
        }
    }
    if(tagName ==='SELECT'){

        $input.val(value).trigger('change');
        return;
    }
    if(tagName ==='DIV'){

        $input.val(value);
        return;
    }
}

function init() {
    // $("#MainTable").DataTable().state.clear();
    getData();
}

const updateData = function () {
    let invalid = false;
    $("#modal-edit .required").each((index, e) => {
        e = $(e);
        if (e.val() === null || e.val() === "" || e.val() === undefined) {
            invalid = true;

        }
    });
    if (invalid) {
        alert("Missing required info");
        return;
    }
    const fields = APP_CONFIG.RequestFields;
    const model = {};
    fields.forEach(field => {
        model[field] = getInputValue($("#modal-edit ." + field + ""));
    });
    const requestBody = {
        Model: model
    };
    LoadAjaxAuth('POST', APP_CONFIG.UpdateUrl, requestBody, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#modal-edit').modal('hide');
            getData();
            setAlert('thành công: ', 'Sua thông tin');
        }

    })
};
const getData = function () {
    LoadAjaxAuth('POST', APP_CONFIG.ListUrl, {}, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            APP_CONFIG.Data = d;
            populateData();
            setAlert('thành công: ', 'Thêm thông tin');
        }

    })
};

function openUpdateModal(id) {
    const data = APP_CONFIG.Data;
    const d = data.find(function (d) {
        return d.id === id;
    });
    const fields = APP_CONFIG.RequestFields;
    $("#modal-edit .Id").val(id);
    fields.forEach(field => {
        const jsonKey = field[0].toLowerCase() + field.substr(1);
        setInputValue($("#modal-edit ." + field + ""), d[jsonKey]);
    });


    return true;
}

const populateData = function (data = APP_CONFIG.Data) {
    const table = $("#MainTable");
    const keys = APP_CONFIG.JSONKeysHeaders;
    // table.DataTable().state.save();
    // table.DataTable().destroy();
    $("#data").empty();
    let count = 1;
    data.forEach(function (d) {
        const e = $(`<tr>
    <td class=" text-muted">${count++}</td>
    ${keys.map(key => `<td className="" data-order="${d[key]}">${d[key]}</td>`).join()}
    <td class="">
        <button class="btn btn-primary btn-xs btn--icon-text certificate_edit" id="PopoverCustomT-1" title="Sửa" data-target="#modal-edit" onclick="openUpdateModal('${d.id}')"
                        data-toggle="modal"
                type="button"><i class="fa fa-pencil" ></i >
        </button>
        <button class="btn btn-danger btn-xs btn--icon-text certificate_delete" id="PopoverCustomT-1" title="Xóa" data-target="#modal-delete" onclick="openDeleteConfirmationModal('${d.id}')"
        data-toggle="modal"
                type="button"><i class="fa fa-trash-o"></i>
        </button>
    </td>
</tr>`);
        $("#data").append(e);
    });


};
const addData = function () {
    let invalid = false;
    $("#modal-add .required").each((index, e) => {
        const $e = $(e);
        if ($e.val() === null || $e.val() === "" || $e.val() === undefined) {
            invalid = true;

        }
    });
    if (invalid) {
        alert("Missing required info");
        return;
    }
    const fields = APP_CONFIG.RequestFields;
    const model = {};
    fields.forEach(field => {
        model[field] = getInputValue($("#modal-add ." + field + ""));
    });
    const response = {
        model : model
    };
    LoadAjaxAuth('POST', APP_CONFIG.AddUrl, response, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $("#modal-add").modal('hide');
            getData();
            setAlert('thành công: ', 'Thêm thông tin');
        }

    });
};


const deleteData = function () {
    const id = $("#modal-delete #id").val();
    const requestBody = {
        Id: id
    };
    LoadAjaxAuth('POST', APP_CONFIG.DeleteUrl, requestBody, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            getData();
            setAlert('thành công: ', 'xoa thông tin');
        }

    })
};
const openDeleteConfirmationModal = function (id) {
    $("#modal-delete #id").val(id);
};
const find = function () {
    const keyword = $("#searchInput").val();
    if (keyword === "") {
        populateData();
        return;
    }
    const filtered = APP_CONFIG.Data.filter(p => {
        let join = Object.keys(p).map(key => p[key]).join(";");
        return join.indexOf(keyword) > 0;
    });
    populateData(filtered);
};

$(document).on('click', '#addRow', function () {
    $('#modal-add').modal({ backdrop: 'static', keyboard: false });
});