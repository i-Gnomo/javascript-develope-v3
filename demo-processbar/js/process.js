/**
 * 
 * process进度
 */
function processBar($v) {
    this.bar = $v;
    this.init = function() {
        // console.log(this.prosItems);
        var _this = this;
        var _s = '<ul>';
        _s += '<li style="flex: 0.5 0 auto;"></li>';
        var _step = 0;
        $.each(_this.prosItems, function(x, item) {
            if (item['current']) {
                _step = x - (-1);
            }
        })
        for (var i = 0; i < _this.prosItems.length; i++) {
            if (i < _step) {
                _s += '<li class="b-red"><a>' + _this.prosItems[i]['title'] + '<span></span></a></li>';
            } else {
                _s += '<li><a>' + _this.prosItems[i]['title'] + '<span></span></a></li>';
            }
            if (i != (_this.prosItems.length - 1)) {
                _s += '<li></li>';
            }
        }
        _s += '<li style="flex: 0.5 0 auto;"></li>';
        _s += '<div class="bline01"></div>';
        _s += '<div class="bline02"></div>'
        _s += '</ul>';
        _this.bar.html(_s);
        var linumber = _step * 2;
        if (_step == _this.prosItems.length) {
            linumber++;
        }
        var liwidth = 0;
        $.each(_this.bar.find('li'), function(idx, itm) {
            if (idx < linumber) {
                liwidth += $(itm).width();
            }
        });
        _this.bar.find('.bline02').stop().animate({ "width": (_step != _this.prosItems.length) ? (liwidth - 5) : liwidth + "px" }, 1000);
    }
}
processBar.prototype.prosItems = [{
    "title": "建档"
}, {
    "title": "邀约"
}, {
    "title": "到店",
    "current": true
}, {
    "title": "成交"
}, {
    "title": "提车"
}];