function download(a) {
    $.ajax({
        type: 'POST',
        headers: {
            Authorization: getCookie('_tk')
        },
        url: '/Report/Download',
        data: {
            Name: $(a).attr('data-id')
        },

    });
};

function exportExcel() {
    $.ajax({
        type: 'GET',
        headers: {
            Authorization: getCookie('_tk')
        },
        url: '/Report/Export',
        data: {
            FromDate: $('#startDate').val(),
            ToDate: $('#endDate').val()
        },

    });
}

$(document).ready(function () {

    var link = '/Report/Export?FromDate=' + $('#startDate').val() + '&ToDate=' + $('#endDate').val();
    $('.btnExport').attr('href', link);

    $('#startDate').change(function () {

        var link = '/Report/Export?FromDate=' + $(this).val() + '&ToDate=' + $('#endDate').val();
        $('.btnExport').attr('href',link)

    });

    $('#endDate').change(function () {

        var link = '/Report/Export?FromDate=' + $('#startDate').val()  + '&ToDate=' + $(this).val();
        $('.btnExport').attr('href', link)

    });


    $('.btnFilter').click(function () {
        $.ajax({
            type: 'POST',
            headers: {
                Authorization: getCookie('_tk')
            },
            url: '/Report/LoadList',
            data: {
                FromDate: $('#startDate').val(),
                ToDate: $('#endDate').val()
            },
            success: function (response) {
                $('#listFiles').empty();
                var r = response.data;
                for (var i = 0; i < r.length; i++) {
                    $('#listFiles').append(' <div class="col-sm-4">\
                                           <div class= "card c1" >\
                                                <div class="card-body">\
                                                    <div class="row">\
                                                        <div class="col-sm-10">\
                                                            <div class="col-sm-12">'+ r[i] + '</div>\
                                                        </div>\
                                                        <div class="col-sm-2">\
                                                            <div class="col-sm-12" id="download"><a href="/Report/Download?Name='+r[i]+'"><i class="actions__item zmdi zmdi-download pull-right"></i></a></div>\
                                                        </div>\
                                                    </div>\
                                                </div >\
                                            </div >\
                                          </div >');
                }
            }

        });
    });

    $.ajax({
        type: 'POST',
        headers: {
            Authorization: getCookie('_tk')
        },
        url: '/Report/LoadList',
        data: {
            FromDate: $('#startDate').val(),
            ToDate: $('#endDate').val()
        },
        success: function (response) {
            var r = response.data;
            for (var i = 0; i < r.length; i++) {
                $('#listFiles').append(' <div class="col-sm-4">\
                                           <div class= "card c1" >\
                                                <div class="card-body">\
                                                    <div class="row">\
                                                        <div class="col-sm-10">\
                                                            <div class="col-sm-12">'+r[i]+'</div>\
                                                        </div>\
                                                        <div class="col-sm-2">\
                                                            <div class="col-sm-12" id="download"><a href="/Report/Download?Name='+ r[i] +'"><i class="actions__item zmdi zmdi-download pull-right"></i></a></div>\
                                                        </div>\
                                                    </div>\
                                                </div >\
                                            </div >\
                                          </div >');
            }
        }

    });
});