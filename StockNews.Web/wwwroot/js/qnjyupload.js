/**ADOU 2017-05-06
 * 上传控件
 * @param {any} options
    options.selectBtn 选择文件按钮的id名称(#id),
    options.selectBtn 附加属性[pick = '#自定义名称',extensions = 'gif,jpg,jpeg,bmp,png',url = '提交地址']
    options.submitBtn 提交按钮的id名称(#id),
    options.fileQueuedCallback  '文件加入队列回调函数,参数file',
    options.uploadSuccessCallback  '文件上传成功回调函数,参数file, response',
    options.submitCallback  '提交回调函数,参数event, uploader'
    -------页面-------
    <div class="input-group-addon"
    id = "SelectFile"
    pick = "#picker"
    extensions = "gif,jpg,jpeg,bmp,png"
    url = "/Home/Submit"
    style = "cursor:pointer;" >选择文件</div >
    -------JS-------
     QnjyUplader({
        selectBtn: "SelectFile",
        submitBtn: "btnSubmit",
        fileQueuedCallback: function (file,uploader) {
            $("#Head").empty();
            $("#Head").val(file.name);
        },
        uploadSuccessCallback: function (file, response) {
            if (response.IsSuccess) {
                layer.msg(response.Massage);
            } else {
                layer.msg(response.Massage);
            }
            setTimeout(function () {
                location.reload();
            }, 1000);
        },
        submitCallback: function (event, uploader) { Submit(uploader); }
    });
 */
var QnjyUplader = function (options) {
    var sobj = $("#" + options.selectBtn);
    var pick = sobj.attr("pick");
    var url = sobj.attr("url");
    var extensions = sobj.attr("extensions");

    //sobj.after("<div id='" + pick.replace("#", "") + "' class='picker'></div>");

    var setting = {
        auto: false,
        disableGlobalDnd: true,
        swf: '/wwwroot/js/Common/webuploader/Uploader.swf',
        server: url,
        formData: {},
        pick: sobj,
        resize: false,
        multiple: false,
        fileNumLimit: 1,
        accept: {
            title: "uploadtitle",
            extensions: extensions
        }
    };
    //初始化Web Uploader
    var uploader = WebUploader.create(setting);
    //选择文件事件
    sobj.on("click", function () {
        $(pick + " .webuploader-element-invisible").click();
    });
    // 当文件被加入队列以后触发。
    uploader.on('fileQueued', function (file) {
        options.fileQueuedCallback(file, uploader);
    });
    //上传文件类型出错
    uploader.on('error', function (handler) {
        if (handler == "Q_TYPE_DENIED") {
            layer.msg("文件必须是以下格式：" + sobj.attr("extensions"));
        } else if (handler == "Q_EXCEED_NUM_LIMIT") {
            layer.msg("只能上传一个文件");
        }
    });
    //上传前执行
    uploader.on('uploadBeforeSend', function (obj, data, headers) {

    });
    //上传出错
    uploader.on('uploadError', function (file, reason) {
        this.reset();
        layer.msg("提交失败！");
    });
    //上传成功
    uploader.on('uploadSuccess', function (file, response) {
        this.reset();
        options.uploadSuccessCallback(file, response);
    });
    //提交
    $("#" + options.submitBtn).on("click", function (event) {
        options.submitCallback(event, uploader);
    });
    //删除
    $(options.List).on("click", options.Item, function () {
        var Id = $(this).attr("id");
        uploader.removeFile(uploader.getFile(Id, true));
        $(this).remove();
    });
}

var QNJYUpladerV1 = function (options) {
    var objs = $("#" + options.btnUploader);
    var pick = objs.attr("pick");
    var extensionType = objs.attr("extensionType");//0所有格式 1图片格式 2视频格式 3文件格式
    var multipleType = objs.attr("multipleType");//0false 1true  是否多选
    var extensions = "0";
    var mimeTypes = "0";

    var $list = $("#" + options.fileList);
    var ratio = window.devicePixelRatio || 1;
        // 缩略图大小
    var thumbnailWidth = 140 * ratio;
    var thumbnailHeight = 140 * ratio;

    //图片格式[".png",".jpg",".jpeg",".gif",".bmp"]
    //视频格式[".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg", ".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid"]
    //文件格式[".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"]
    //所有格式[".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg", ".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"]

    switch (extensionType) {
        case "0":
            extensions = "png,jpg,jpeg,gif,bmp,flv,swf,mkv,avi,rm,rmvb,mpeg,mpg,ogg,ogv,mov,wmv,mp4,webm,mp3,wav,mid,rar,zip,tar,gz,7z,bz2,cab,iso,doc,docx,xls,xlsx,ppt,pptx,pdf,txt,md,xml,exe";
            mimeTypes = "application/*";
            break;
        case "1":
            extensions = "png,jpg,jpeg,gif,bmp";
            mimeTypes = "image/*";
            break;
        case "2":
            extensions = "flv,swf,mkv,avi,rm,rmvb,mpeg,mpg,ogg,ogv,mov,wmv,mp4,webm,mp3,wav,mid";
            mimeTypes = "application/*";
            break;
        case "3":
            extensions = "rar,zip,tar,gz,7z,bz2,cab,iso,doc,docx,xls,xlsx,ppt,pptx,pdf,txt,md,xml,exe";
            mimeTypes = "application/*";
            break;
    }

    objs.after("<div id='" + pick + "' class='picker'></div>");

    var setting = {
        auto: false,
        disableGlobalDnd: true,//{Selector} [可选] [默认值：false] 是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开
        swf: '/wwwroot/js/Common/webuploader/Uploader.swf',
        server: '/Boss/WebUploaderDemo/Uploader',
        pick: { id: '#' + pick, multiple: (multipleType == "1" ? true : false) },
        formData: {},
        resize: false,
        accept: {
            title: "adouUploader",
            extensions: extensions
        }
    };

    if (multipleType != "1") {
        setting.fileNumLimit = 1;
    }
    //初始化Web Uploader
    var uploader = WebUploader.create(setting);

    //选择文件事件
    objs.on("click", function () {
        $('#' + pick + " .webuploader-element-invisible").click();
    });
    // 当文件被加入队列以后触发。
    uploader.on('fileQueued', function (file) {
        $list.html("");
        var guid = new GUID();
        var filename = guid.newGUID() + "." + file.ext;
        var $item = $("<span title='点击删除' class='fileItem'></span>");
        if (extensionType == "1") {
            $item.html("<img src='' />");
        } else {
            $item.html("/wwwroot/uploads/" + filename);
        }
        $item.attr("id", file.id).attr("name", file.name).attr("ext", file.ext).attr("size", file.size).attr("type", file.type).attr("path", "/wwwroot/uploads/" + filename);
        $list.append($item);

        if (extensionType == 1) {
            $img = $list.find("img");
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr('src', src);
            }, thumbnailWidth, thumbnailHeight); 
        }

        if (multipleType != 'undefined' || multipleType != "1" || !$.trim(multipleType)) {
            uploader.options.formData = { fileName: filename };
            uploader.upload();
        }
    });
    //上传文件类型出错
    uploader.on('error', function (handler) {
        if (handler == "Q_TYPE_DENIED") {
            layer.msg("文件必须是以下格式：" + extensions);
        } else if (handler == "Q_EXCEED_NUM_LIMIT") {
            layer.msg("只能上传一个文件");
        } else if (handler == "F_DUPLICATE") {
            layer.msg("文件重复");
        }
    });
    //上传前执行
    uploader.on('uploadBeforeSend', function (data, headers) {

    });
    //上传出错
    uploader.on('uploadError', function (file, reason) {
        //清空队列
        uploader.reset();
        layer.msg("上传失败！");
    });
    //上传成功
    uploader.on('uploadSuccess', function (file, response) {
        //清空队列
        uploader.reset();
        layer.msg("上传成功！");
    });
    //上传成功后
    uploader.on('uploadFinished', function () {
        //清空队列
        uploader.reset();
    });
    //删除文件
    $list.on("click", ".fileItem", function () {
        var Id = $(this).attr("id");
        uploader.removeFile(uploader.getFile(Id, true));
        $(this).remove();
    });
}