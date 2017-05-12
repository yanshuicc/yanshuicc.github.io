function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
$(function(){
	var t = $("#T");
	var width = t.width(),
	height = t.height(),
	r = Raphael("T", width, height),
	color = t.css("color");
	r.canvas.style.backgroundColor = color;
	}
)
