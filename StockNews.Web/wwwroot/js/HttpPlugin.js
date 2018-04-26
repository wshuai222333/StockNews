var $ax = function (options) {
    var times = (Math.random() * 1000) + 100;
 
    //$(options.IdName).show().empty().append(ajaxBeforeSend());

    $.ajax({
        type: options.Type,
        url: options.Url + "?times=" + times,
        cache: false,
        dataType: options.dataType,
        async: true,
        data: options.Params,
        beforeSend: function () {
           // $(options.IdName).hide().empty().append(ajaxBeforeSend());
        },
        success: function (data) {
            options.successfn(data);
        }
    });
}

//加载
var ajaxBeforeSend = function () {
    var $loading = $("<div></div>");

    $loading.append("<p><img src='/wwwroot/images/loading.gif' width='80' height='80' /></p>");

    $loading.append("<p>正在加载...</p>");

    return $loading;
}

