
$(document).ready(init);
function init() {
    $("#MainTable").DataTable().state.clear();
    // getLocations().then(r => getPatients());
    getPatients();
    $(".select2").select2();
    $('.btnFilter').click(function () {
        // oTable.draw();
    });
    // $('.date-picker').datepicker({
    //     dateFormat: 'mm/dd/yyyy'
    // });
    $('.card-header input[name="Name"]').bind('keypress', function (e) {
        if (e.keyCode === 13) {
            oTable.draw();
        }
    });
    
    $('.btnCloseModal').click(function () {
        $($(this).attr('data-ref')).modal('hide');
    });
    

    $('#fUpload').bind('change', function () {
        $('#File').val($('#fUpload').val());
    });


    //setInterval(getClipboard, 1000);
}

const getPatients = function () {
    LoadAjaxAuth('POST', APP_CONFIG.GetTable, {}, getCookie('_tk'), function (d, s) {
        if (d.hasError === true) {
            setAlert(d.errors, 'Lỗi: ', '');
        } else {
            $('#modal-default').modal('hide');
            APP_CONFIG.Patients = d;
            populatePatients();
            setAlert('thành công: ', 'Thêm thông tin');
        }

    })
};
const populatePatients = function (data = APP_CONFIG.Patients) {
    const table = $("#MainTable");
    table.DataTable().state.save();
    table.DataTable().destroy();
    $("#data").empty();
    let count = 1;
    data.forEach(function (d) {
        const e = $(`<tr>
    <td class=" text-muted">${count++}</td>
    <td class="">
        <img style="width: 200px; height: auto;" src="https://via.placeholder.com/200.png/09f/fff" alt="${d.id}" data-target="#modal-picture" onclick="openPicturesModal('${d.id}')"
                        data-toggle="modal"/>
    </td>
    <td class="" data-order="${d.code}">
        ${d.code}
    </td>
    <td class="" data-order="${d.firstName}">${d.firstName}</td>
    <td class="" data-order="${d.lastName}">${d.lastName}</td>
    <td class=""  data-order="${d.genderText}">${d.genderText}</td>
    <td class=""  data-order="${d.dayMonthOfBirth}">${d.dayMonthOfBirth}</td>
    <td class=""  data-order="${d.yearOfBirth}">${d.yearOfBirth}</td>
    <td class=""  data-order="${d.cmnd}">${d.cmnd}</td>
    <td class=""  data-order="${d.passport}">${d.passport}</td>
    <td class=""  data-order="${d.icIssuedDate}">${d.icIssuedDate}</td>
    <td class=""  data-order="${d.icIssuedPlace}">${d.icIssuedPlace}</td>
</tr>`);
        $("#data").append(e);
    });

    table.DataTable({
        "bLengthChange": false,
        "bPaginate": true,
        "bFilter": false,
    });
};
const openPicturesModal = function (id) {
    $("#modal-picture #id").val(id);
    let pictures = [];
    for (let i = 0; i < 20; i++) {
        pictures.push("https://via.placeholder.com/200.png/09f/fff");
    }
    const width = Math.floor(100 / pictures.length);
    pictures.forEach((pic, index) => {
        $("#modal-picture #pictureIndicators .carousel-indicators").append(`<li class="thumbnail" style="background-image: url('${pic}'); width: ${width}%; padding-top: ${width}%" data-target="#pictureIndicators" data-slide-to="${index}" ${index === 0 ? "class=\"active\"" : ""}></li>`);
        $("#modal-picture .carousel-inner").append(`<div class="carousel-item ${index === 0 ? "active" : ""}">
                              <img class="d-block w-100" src="${pic}">
                            </div>`)
    });

    $(".carousel").carousel();
};
const find = function () {
    const keyword = $("#searchInput").val();
    if (keyword === "") {
        populatePatients();
        return;
    }
    const filtered = APP_CONFIG.Patients.filter(p => {
        let join = Object.keys(p).map(key => p[key]).join(";");
        return join.indexOf(keyword) > 0;
    });
    populatePatients(filtered);
};