// 百度地图API功能
var map = new BMap.Map("l-map");

map.centerAndZoom(new BMap.Point(116.443094, 39.925216), 14);
map.enableScrollWheelZoom(true);
var myGeo = new BMap.Geocoder();
function GetXYLocation() {
    console.log($("#Address").val());
    var baseAddress = $("#Address").val();
    if (baseAddress != null) {
        myGeo.getPoint(baseAddress, function (point) {
            console.log(point);
            if (point) {
                SeTmap(point.lng, point.lat);
                SetXY(point.lng, point.lat);
            }
        }, "北京市");
    }


}
//通过XY坐标加载地图
function SeTmap(x, y) {

    if (x != "" && y != "") {
        var address = new BMap.Point(x, y);

        addMarker(address, new BMap.Label($("#Address").val(), { offset: new BMap.Size(20, -10) }));
    }
}
// 编写自定义函数,创建标注
function addMarker(point, label) {
    map.clearOverlays();
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    map.centerAndZoom(point, 14);
    marker.setLabel(label);
}



//XY坐标赋值
function SetXY(x, y) {
    $("#LocationX").val(x);
    $("#LocationY").val(y);
}