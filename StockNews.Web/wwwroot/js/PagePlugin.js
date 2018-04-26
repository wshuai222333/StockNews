/*
    分页插件
    $(容器名称).cgtPager({
        CurrentPage: 1,//当前页
        TotalPages: 100,//总页数
        ItemsPerPage:20,//每页条数
        TotalItems:200,//总条数
        buttonClickCallback: PageClick//点击事件,自定义
    });
    var PageClick=function(CurrentPage){
        //执行分页
    }
*/
(function ($) {
    $.fn.cgtPager = function (options) {

        var opts = $.extend({}, $.fn.cgtPager.defaults, options);

        return this.each(function () {

            $(this).empty().append(options.TotalPages > 0 ? outPutPager(options) : "");

        });
    };
    //输出分页条目
    var outPutPager = function (options) {
        var $pager = $('<div><div class="pageinfo"></div><ul class="pagerUL pagination"></ul></div>');

        $pager.find("div.pageinfo").append("总条数:" + options.TotalItems + ",总页数:" + options.TotalPages + ",每页条数:" + options.ItemsPerPage + ",当前页:" + options.CurrentPage);

        $pager.find("ul").append(outPutButton(options, 1)).append(outPutButton(options, 2));

        var startPoint = 1;
        var endPoint = 9;

        if (parseInt(options.CurrentPage) > 4) {
            startPoint = parseInt(options.CurrentPage) - 4;
            endPoint = parseInt(options.CurrentPage) + 4;
        }

        if (endPoint > parseInt(options.TotalPages)) {
            startPoint = parseInt(options.TotalPages) - 8;
            endPoint = parseInt(options.TotalPages);
        }

        if (startPoint < 1) {
            startPoint = 1;
        }

        for (var i = startPoint; i <= endPoint; i++) {
            var pagerItem = $("<li class='pagerItem' data-num='" + (i) + "'>" + (i) + "</li>");
            if (i == parseInt(options.CurrentPage)) {
                pagerItem.addClass("pagerCurrent").addClass("active");
            }
            else {
                pagerItem.click(function () {
                    options.buttonClickCallback(this.firstChild.data);
                });
            }
            pagerItem.appendTo($pager.find("ul"));
        }

        $pager.find("ul").append(outPutButton(options, 3)).append(outPutButton(options, 4));

        return $pager;
    }
    //输出分页按钮
    var outPutButton = function (options, k) {
        var $button = $("<li class='pagerItem'></li>");

        var btnText = "", className = "";
        var dataNum = 1;

        switch (k) {
            case 1:
                btnText = "首页"; className = "pagerHome"; dataNum = 1;
                break;
            case 2:
                btnText = "上一页"; className = "pagerPrev";
                if ((parseInt(options.CurrentPage) - 1) < 1) {
                    dataNum = 1;
                }
                else {
                    dataNum = (parseInt(options.CurrentPage) - 1);
                }
                break;
            case 3:
                btnText = "下一页"; className = "pagerNext";
                if ((parseInt(options.CurrentPage) + 1) > parseInt(options.TotalPages)) {
                    dataNum = parseInt(options.TotalPages);
                } else {
                    dataNum = (parseInt(options.CurrentPage) + 1);
                }
                break;
            case 4:
                btnText = "尾页"; className = "pagerLast"; dataNum = options.TotalPages;
                break;
        }
        //给标签添加属性
        $button.append(btnText).attr("class", className).attr("data-num", dataNum);
        //点击分页事件
        $button.click(function () {
            options.buttonClickCallback(dataNum);
        });

        return $button;
    }
    //默认值
    $.fn.cgtPager.defaults = {
        CurrentPage: 1,//当前页
        TotalPages: 100,//总页数
        ItemsPerPage: 20,//每页条数
        TotalItems: 200//总条数
    };
})(jQuery);
/*
    数据处理标准
    result = Newtonsoft.Json.JsonConvert.SerializeObject(new
    {
        Items = res,
        CurrentPage = CurrentPage,
        ItemsPerPage = ItemsPerPage,
        TotalPages = TotalPages,
        TotalItems = TotalItems
    });
    表格插件
    $(function () {
        demoL(1);
    });

    var demoL = function (pi) {
        var param = {};
        var valid = GetParameter(param, pi);
        if (!valid) {
            return;
        }

        $("#table").cgtAjax({
            Type: "POST",//请求类型POST、GET
            Url: "/data/PluginHandler.ashx",//请求地址
            dataType: "json",//获取数据类型
            Params: param,//参数
            buttonClickCallback: demoL,//如果有分页添加此属性
            TableHtml:"",//自定义数据行,默认为空或不添加此属性
            Header: {//自定义表头,key为后台对应的实体，val为自定义名称
                "id": "编号",
                "name": "姓名",
                "age": "年龄",
                "sex": "性别",
                "address": "地址",
                "telphone": "电话/手机",
                "remark": "备注",
                "options":"操作"
            },
            IsRowsEvent: true,//是否自定义数据行,true为自定义
            RowsEvent: function (p, rows) {//自定义数据航
                var result = "";
                switch (p) {
                    case "name":
                        result = "name" + rows.id;
                        break;
                    case "options":
                        result = "<a href='?edit'>编辑</a>&nbsp;&nbsp;";
                        result += "<a href='?delete'>删除</a>&nbsp;&nbsp;";
                        result += "<a href='?select'>查看</a>";
                        break;
                }
                return result;
            }
        });
    }
    //查询参数
    var GetParameter = function (param, pi) {

        param.Action = "demo";

        param.CurrentPage = pi;

        param.ItemsPerPage = 20;

        return true;
    }
*/
(function ($) {
    $.fn.cgtAjax = function (options) {
        var opts = $.extend({}, $.fn.cgtAjax.defaults, options);
        return this.each(function () {

            var idName = $(this).attr("id");
            var className = $(this).attr("class");

            options.IdName = "#" + idName;
            options.ClassName = $.trim("." + className.split(' ')[0]);

            $(this).empty().append(OutPutTable(options));

        });
    };
    //AJAX
    var OutPutTable = function (options) {

        var times = (Math.random() * 1000) + 100;

        $(options.ClassName).empty().append(tableBeforeSend());
        $.ajax({
            type: options.Type,
            url: options.Url + "?times=" + times,
            cache: false,
            dataType: options.dataType,
            async: true,
            data: options.Params,
            beforeSend: function () {
                $(options.ClassName).empty().append(tableBeforeSend());
            },
            success: function (data) {
                if (data.IsSuccess) {
                    var result = matchingDataType(options, data.Data);
                    $(options.ClassName).empty().append(result);
                } else {
                    $(options.ClassName).empty().append("<div class='table_null'>" + data.Message + "</div>");
                }
            }
        });

    }
    //根据类型匹配数据
    var matchingDataType = function (options, data) {
        var result = "";

        switch (options.dataType) {
            case "json":
                result = tableList(options, data);
                break;
            case "text":
                result = data;
                break;
        }

        return result;
    }
    //加载
    var tableBeforeSend = function () {
        var $loading = $("<div class='table_loading'></div>");

        $loading.append("<p class='loadimg'><img src='/wwwroot/images/loading.gif' width='80' height='80' /></p>");

        $loading.append("<p>正在加载...</p>");

        return $loading;
    }
    //表格
    var tableList = function (options, data) {
        var $table = $("<div><table class='table table-striped'><tbody></tbody></table><div class='pager'></div></div>");
        if (!$.trim(options.TableHtml)) {
            //表头
            var headerTr = $("<tr></tr>");
            for (var p in options.Header) {
                var thItem = $("<th><span>" + options.Header[p] + "</span></th>");
                thItem.appendTo(headerTr);
            }
            headerTr.appendTo($table.find("table tbody"));
            //是否自定义数据列

            //数据
            $(data.Items).each(function (index, item) {
                var trItem = $("<tr></tr>");
                for (var p in options.Header) {
                    var tdItem = $("<td>" + ((typeof (item[p]) == 'undefined' && !item[p]) ? "" : item[p]) + "</td>");
                    if (options.IsRowsEvent) {
                        tdItem.empty().append(((options.RowsEvent(p, item) == "") ? ((typeof (item[p]) == 'undefined' && !item[p]) ? "" : item[p]) : options.RowsEvent(p, item)));
                    }
                    tdItem.appendTo(trItem);
                }
                trItem.appendTo($table.find("table tbody"));
            });
        }
        else {
            $table.find("table tbody").append(options.TableHtml(options, data));
        }

        //如果分页条数大于0,则进行分页操作
        if (parseInt(data.TotalPages) > 0) {
            $table.find(".pager").empty().append(OutPutPager(options, data));
        }

        return $table;
    }
    //分页
    var OutPutPager = function (options, datas) {

        var $pager = $("<div><div class='pageinfo'></div><ul class='pagerUL pagination'></ul></div>");

        $pager.find("div.pageinfo").empty().append("总条数:" + datas.TotalItems + ",总页数:" + datas.TotalPages + ",每页条数:" + datas.ItemsPerPage + ",当前页:" + datas.CurrentPage);

        $pager.find("ul").empty().append(OutPutButton(options, datas, 1)).append(OutPutButton(options, datas, 2));

        var startPoint = 1;
        var endPoint = 9;

        if (parseInt(datas.CurrentPage) > 4) {
            startPoint = parseInt(datas.CurrentPage) - 4;
            endPoint = parseInt(datas.CurrentPage) + 4;
        }

        if (endPoint > parseInt(datas.TotalPages)) {
            startPoint = parseInt(datas.TotalPages) - 8;
            endPoint = parseInt(datas.TotalPages);
        }

        if (startPoint < 1) {
            startPoint = 1;
        }

        for (var i = startPoint; i <= endPoint; i++) {
            var pagerItem = $("<li class='pagerItem'>" + (i) + "</li>");
            //当前页
            if (i == parseInt(datas.CurrentPage)) {
                pagerItem.addClass("pagerCurrent").addClass("active");
            }
            else {//点击分页事件
                pagerItem.click(function () {
                    options.buttonClickCallback(this.firstChild.data);
                });
            }
            pagerItem.appendTo($pager.find("ul"));
        }

        $pager.find("ul").append(OutPutButton(options, datas, 3)).append(OutPutButton(options, datas, 4));

        return $pager;
    }
    //分页按钮
    var OutPutButton = function (options, datas, k) {
        var $button = $("<li class='pagerItem'></li>");

        var btnText = "", className = "";
        var dataNum = 1;

        switch (k) {
            case 1:
                btnText = "首页"; className = "pagerHome"; dataNum = 1;
                break;
            case 2:
                btnText = "上一页"; className = "pagerPrev";
                if ((parseInt(datas.CurrentPage) - 1) < 1) {
                    dataNum = 1;
                }
                else {
                    dataNum = (parseInt(datas.CurrentPage) - 1);
                }
                break;
            case 3:
                btnText = "下一页"; className = "pagerNext";
                if ((parseInt(datas.CurrentPage) + 1) > parseInt(datas.TotalPages)) {
                    dataNum = parseInt(datas.TotalPages);
                } else {
                    dataNum = (parseInt(datas.CurrentPage) + 1);
                }
                break;
            case 4:
                btnText = "尾页"; className = "pagerLast"; dataNum = datas.TotalPages;
                break;
        }
        //给标签添加属性
        $button.append(btnText).attr("class", className).attr("data-num", dataNum);
        //点击分页事件
        $button.click(function () {
            options.buttonClickCallback(dataNum);
        });

        return $button;
    }
    //默认值
    $.fn.cgtAjax.defaults = {};
})(jQuery);
//数组去除重复
var arrayToHeavy = function (arr) {
    var result = [], tmp = {};
    for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!tmp[ai]) {
            result = result.concat(ai);
            tmp[ai] = ai;
        }
    }
    return result;
}
//金额小数进1
var ConvertFloat = function (fm) {
    var r = "";
    m = $.trim(fm);
    if (m == undefined && m == "") {
        r = "0.00";
        return;
    }

    var s = m.split('.');
    if (s[1] == undefined) {
        r = s[0] + ".00";
    } else {
        var a = s[1].substring(0, 2);
        var b = s[1].substring(1, 2);
        var c = s[1].substring(2, 3);
        if (b > 0) {
            if (c != "" && c != undefined) {
                r = s[0] + "." + s[1].substring(0, 1) + (parseInt(s[1].substring(1, 2)) + 1);
            }
            else {
                r = s[0] + "." + s[1].substring(0, 2);
            }
        } else {
            r = s[0] + "." + s[1].substring(0, 2);
        }
    }
    return r;
}

//获取系统时间
var gettime = function (day) {

    var d = new Date();

    if (day == 0) {
        d = new Date();//当天
    }
    else if (day == -1) {
        d = new Date(d.getTime() - 24 * 60 * 60 * 1000); //前一天
    }
    else if (day == 1) {
        d = new Date(d.getTime() + 24 * 60 * 60 * 1000); //后一天
    }
    else {
        d = new Date();
    }

    nian = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();

    var times = nian + "-" + month + "-" + day;
    return times
}

//json时间转换成string日志
var jsonTimeFormat = function (jsonDate) {
    try {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    } catch (ex) {
        return "";
    }
}
//json时间转换成日期
var jsonDateFormat = function (jsonDate) {
    try {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + day
    } catch (ex) {
        return "";
    }
}
//月份下拉列表
var MonthDownList = function () {
    var d = new Date();
    var result = [];
    var mn = d.getMonth()+1
    result.push(d.getFullYear() + (mn < 10 ? "0" + mn : mn));
    for (var i = 0; i < 12; i++) {
        d.setMonth(d.getMonth()-1);
        var m = d.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        //在这里可以自定义输出的日期格式  
        result.push(d.getFullYear() + "" + m);
    }
    
    //生成前12个月日期下拉框  
    for (var allinfo = result, i = 0; i < allinfo.length; i++) {
        $("#Month").append("<option value='" + allinfo[i] + "'>" + allinfo[i] + "</option>");
    }
}


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//操作按钮(Edit|Del|)
var operationBtn = function (id, btns) {
    var html = "";

    var btn = btns.split('|');

    for (var i = 0; i < btn.length; i++) {
        switch (btn[i]) {
            case "Edit":
                html += '<a style="text-decoration:none" onclick="edit(' + id + ')" href="javascript:;" title="编辑"><i class="Hui-iconfont"></i>编辑</a>';
                break;
            case "Del":
                html += '<a style="text-decoration:none" class="ml-5" onclick="del(' + id + ')" href="javascript:;" title="删除"><i class="Hui-iconfont"></i>删除</a>';
                break
            case "GroupMemberPermission":
                html += '<a style="text-decoration:none" class="ml-5" onclick="GroupMemberPermission(' + id + ')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe63c;</i>分配权限</a>';
                break
            case "Audit":
                html += '<a style="text-decoration:none" class="ml-5" onclick="audit(' + id + ')" href="javascript:;" title="审批"><i class="Hui-iconfont"></i>审批</a>';
                break
            case "Back":
                html += '<a style="text-decoration:none" class="ml-5" onclick="back(' + id + ')" href="javascript:;" title="退回"><i class="Hui-iconfont"></i>退回</a>';
                break
            case "Download":
                html += '<a style="text-decoration:none" class="ml-5" onclick="download(' + id + ')" href="javascript:;" title="下载"><i class="Hui-iconfont"></i>下载</a>';
                break
            case "Upload":
                html += '<a style="text-decoration:none" class="ml-5" onclick="upload(' + id + ')" href="javascript:;" title="上传"><i class="Hui-iconfont"></i>上传</a>';
                break
            case "Release":
                html += '<a style="text-decoration:none" class="ml-5" onclick="release(' + id + ')" href="javascript:;" title="发布"><i class="Hui-iconfont"></i>发布</a>';
                break
            case "Undo":
                html += '<a style="text-decoration:none" class="ml-5" onclick="undo(' + id + ')" href="javascript:;" title="撤销"><i class="Hui-iconfont"></i>撤销</a>';
                break
            case "Sign1":
                html += '<a style="text-decoration:none" class="ml-5" onclick="sign1(' + id + ')" href="javascript:;" title="签字1"><i class="Hui-iconfont"></i>签字1</a>';
                break
            case "Sign2":
                html += '<a style="text-decoration:none" class="ml-5" onclick="sign2(' + id + ')" href="javascript:;" title="签字2"><i class="Hui-iconfont"></i>签字2</a>';
                break
            case "LookUp":
                html += '<a style="text-decoration:none" class="ml-5" onclick="lookup(' + id + ')" href="javascript:;" title="查看"><i class="Hui-iconfont"></i>查看</a>';
                break
            case "Rec":
                html += '<a style="text-decoration:none" class="ml-5" onclick="rec(' + id + ')" href="javascript:;" title="恢复"><i class="Hui-iconfont"></i>恢复</a>';
                break
        }
    }

    return html;
}

//状态转换文字
var StatusStr = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-success radius">启用</span>';
            break;
        case 1:
            request = '<span class="label label-warning radius">禁用</span>';
            break;
    }
    return request;
}

var UserTypeStr = function (type) {
    var request = "";
    switch (type) {
        case 0:
            request = '<span class="label label-success radius">见习员工</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">基地</span>';
            break;
        case 2:
            request = '<span class="label label-success radius">团委</span>';
            break;
    }
    return request;

}
//审核状态转换
var AuditStatusStr = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-warning radius">待审核</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">审核通过</span>';
            break;
        case 2:
            request = '<span class="label label-warning radius">退回</span>';
            break;
    }
    return request;
}
//基地类型转换
var BaseCompanyTypeStr = function (status) {
    var request = "";
    switch (status) {
        case -1:
            request = '<span class="label label-success radius">全部</span>';
            break;
        case 0:
            request = '<span class="label label-success radius">中小企业</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">中大型企业</span>';
            break;
        case 2:
            request = '<span class="label label-success radius">社会公益组织</span>';
            break;
        case 3:
            request = '<span class="label label-success radius">机关事业单位</span>';
            break;
    }
    return request;
}

//发布状态转换
var ReleaseStatusStr = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-success radius">未发布</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">发布</span>';
            break;
        case 2:
            request = '<span class="label label-warning radius">删除</span>';
            break;
    }
    return request;
}
//基地热点状态转换
var HotStatusStr = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-success radius">非热点</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">热点</span>';
            break;
        case 2:
            request = '<span class="label label-warning radius">撤销</span>';
            break;
    }
    return request;
}
//审核状态转换
var ApplyState = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-success radius">待审核</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">申请成功</span>';
            break;
        case 2:
            request = '<span class="label label-warning radius">退回</span>';
            break;
    }
    return request;
}
//栏目状态
var ColumnState = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-warning radius">无效</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">有效</span>';
            break;
    }
    return request;
}
//新闻稿状态
var NewsState = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-warning radius">新稿</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">发布</span>';
            break;
        case 2:
            request = '<span class="label label-warning radius">删除</span>';
            break; 
    }
    return request;
}
//基地岗位发布状态
var ReleaseStatusStr = function (status) {
    var request = "";
    switch (status) {
        case 0:
            request = '<span class="label label-warning radius">未发布</span>';
            break;
        case 1:
            request = '<span class="label label-success radius">发布</span>';
            break;
        case 2:
            request = '<span class="label label-warning radius">撤销</span>';
            break;
        case 3:
            request = '<span class="label label-warning radius">删除</span>';
            break;
    }
    return request;
}
