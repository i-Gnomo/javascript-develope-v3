;
(function($) {
    //全局函数
    $.extend({
        randomid: function() {
            //16位自由数
            var rdm = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
            var x = new Array();
            for (var i = 0; i < 16; i++) {
                x.push(rdm[Math.floor(Math.random() * rdm.length)]);
            };
            return x.join('');
        },
        arrayfilter: function(arr) {
            //数组去重 获取品牌索引时使用
            var array = [];
            if (arr.length > 0) {
                array.push(arr[0]);
                $.map(arr, function(a, i) {
                    if (arr[i] != array[array.length - 1]) {
                        array.push(arr[i]);
                    }
                    return '';
                })
            }
            return array;
        }
    })

    $.fn.oselectDefaults = {
        dataList: function(parms, index, cbk) {
            var box = this;
            var p = parms[index - 1];
            var pid = '';
            var newurl = p.url;
            if (index > 1) {
                pid = box.find('.select-box-content[data-level=' + (index - 1) + ']').data('data-checked-parms');
                pid = pid.id;
            }
            switch (p.type) {
                case 'default':
                case 'easyui':
                    newurl = p.url.replace('@parentValue', pid);
                    dataAjx(newurl);
                    break;
                case 'javascript':
                    // console.log(p, box);
                    if (p.jsObject && p.jsObject != '') {
                        if (window[p.jsObject]) {
                            // console.log(window[p.jsObject]);
                            var _nresult = evalJsObject(window[p.jsObject]);
                            cbk(_nresult);
                            // cbk(window[p.jsObject]);
                        } else {
                            if (newurl && newurl != '') {
                                dataWrite(newurl);
                            }
                        }
                    }
                    break;
                default:
                    break;
            };

            function evalJsObject(_result) {
                // console.log(index, pid, _result);
                if (index > 1 && pid != '') {
                    $.each(_result, function(i, group) {
                        if (group[p.fieldv] == pid) {
                            _result = group['List'];
                        }
                    })
                }
                // debugger;
                return _result;
            }

            function dataWrite(_url) {
                // console.log('javascript', _url);
                var _script = $('<script type="text\/javascript" src="' + _url + '?callback=window.loadselectdata"></script>');
                $('script[js-select]').length > 0 ?
                    _script.insertBefore($('script[js-select]')) :
                    _script.insertBefore($('body script').eq(0));

                window.loadselectdata = function(_result) {
                    var _data = $('<script type="text\/javascript">window["' + p.jsObject + '"]=' + JSON.stringify(_result) + '<\/script>');
                    _data.insertAfter(_script);
                    _script.remove();
                    // evalJsObject(window[p.jsObject]);
                    cbk(window[p.jsObject]);
                }
            }

            function dataAjx(_url) {
                $.ajax({
                    url: _url,
                    type: 'get',
                    dataType: 'jsonp',
                    // jsonpCallback: 'jsonpCkb',
                    success: function(result) {
                        if (result) {
                            cbk(result);
                        }
                    }
                });
            }
        },
        oEvents: {
            'toggleDown': function(_s) {
                _s.off('click').on('click', '.select-text', function(e) {
                    var _p = $(this).parent('.select-defined');
                    e.stopPropagation();
                    if (_p.hasClass('disabled')) {
                        return false;
                    }
                    if (_p.hasClass('active')) {
                        _p.removeClass('active');
                    } else {
                        $('.select-defined').removeClass('active');
                        _p.addClass('active');
                    }
                });
                $(document).not(_s).on('click', function(e) {
                    if ($(e.target).parents('.select-defined-content').length == 0) {
                        _s.removeClass('active');
                    }
                });
            },
            'bindAbcClick': function(_s) {
                _s.off('click').on('click', 'a', function(e) {
                    e.stopPropagation();
                    var _this = $(e.target);
                    var _eq = _s.find('a').index(_this);
                    var _adcbox = _s.next('.select-dl');

                    if (_s.data('ds-index') == _eq) {
                        return;
                    }
                    _adcbox.scrollTop(0);
                    _s.data('ds-index', _eq);

                    var posTop = _adcbox.find('dl').eq(_eq).offset().top;
                    _adcbox.scrollTop(posTop - _adcbox.offset().top);
                });
            },
            'toggleDisn': function(_s, _box) {
                var _titBar = _box.oGetTitBar();
                var _index = parseInt(_s.attr('data-level'));
                $.each(_titBar.find('li'), function(i, item) {
                    if (i < (_index - 1)) {
                        $(item).removeClass('current').removeClass('disn');
                    }
                    if (i > (_index - 1)) {
                        $(item).removeClass('current').addClass('disn');
                    }
                    if (i == (_index - 1) && _index > 1) {
                        $(item).addClass('current').removeClass('disn');
                    }
                })
                _s.removeClass('disn').siblings(".select-box-content").addClass('disn');
            }

        }
    };
    $.fn.extend({
        oselect: function(opt) {
            // var opts = $.extend(opt ? opt : {}, $.fn.oselectDefaults.options);
            var opts = opt ? opt : {};
            return $(this).each(function(idx, v) {
                var _v = $(v),
                    rdid = $.randomid(),
                    zselect = null;
                if (!_v.attr('inited')) {
                    //初始化
                    var d_tit = _v.attr('data-title') || '',
                        d_place = _v.attr('data-holder') || '',
                        d_skin = _v.attr('data-skin') || '',
                        d_style = _v.attr('data-style') || '',
                        d_name = _v.attr('name') || '';
                    var len = 0;
                    var tit_str = '';
                    if (d_tit != '') {
                        _v.data('d-title', d_tit.split(',')).removeAttr('data-title');
                        if (opts.length > 0) {
                            len = opts.length;
                        }
                        tit_str += _v.oSetTitle(len);
                    }
                    var zbox = $('<div class="select-text"><span>' + d_place + '</span><i class="fa fa-angle-down ic-arrow"></i></div>'),
                        zinput = $('<input type="hidden" name="' + d_name + '" />'),
                        zcontent = $('<div class="select-defined-content">' + ((tit_str != '') ? ('<div class="select-defined-title">' + tit_str + '</div>') : '') + '</div>');

                    zselect = $('<div id="select-' + rdid + '" class="select-defined ' + d_skin + '" ' + (d_style != '' ? ('style="' + d_style + '"') : ('')) + '></div>');
                    zselect.append(zbox).append(zinput).append(zcontent);
                    _v.after(zselect).removeAttr('name');
                    _v.attr({
                        'inited': 'yes',
                        'data-id': rdid
                    });
                }

                zselect = zselect ? zselect : _v.oGetSelect();
                _v.hasClass('disabled') ? zselect.addClass('disabled') : zselect.removeClass('disabled');

                if (!opts || !opts.length) { return _v; }
                if ($.isArray(opts) && opts.length > 0) {
                    var myopts = [];
                    $.map(opts, function(itm, i) {
                        if (!itm.type) {
                            if (i > 0) {
                                opts[i]['type'] = opts[i - 1]['type'];
                            } else {
                                opts[i]['type'] = 'default';
                            }
                        }
                        myopts.push(opts[i]);
                        return '';
                    });
                    // console.log(myopts);
                    zselect.data('d-data', opts);
                    zselect.oListData();
                }
                zselect.oListEvent('toggleDown');

            });
        },
        oSetTitle: function(_len) {
            var _t = $(this);
            var tit = _t.data("d-title");
            var _length = _len > 0 ? _len : tit.length;
            var x = ['<ul>'];
            for (var i = 1; i < (_length + 1); i++) {
                x.push(i == 1 ?
                    ('<li class="current">') :
                    ('<li class="disn"><i>&gt;</i>')
                );
                x.push('<a href="javascript:void(0)">' + tit[i - 1] + '</a></li>');
            }
            x.push('</ul>');
            return x.join('');
        },
        oGetSelect: function() {
            var _t = $(this);
            if (_t.is('select')) {
                var o_id = _t.attr('data-id');
                if (o_id) {
                    return _t.next('#select-' + o_id);
                } else {
                    return $();
                }
            } else if (_t.is('.select-defined')) {
                return _t;
            }
        },
        oGetTitBar: function() {
            var _t = $(this);
            return _t.find('.select-defined-title') || null;
        },
        oGetText: function() {
            var _t = $(this);
            return _t.find('.select-text') || null;
        },
        oGetInput: function() {
            var _t = $(this);
            return _t.find('.select-text').next('input[type="hidden"]') || null;
        },
        oGetContent: function() {
            var _t = $(this);
            return _t.find('.select-defined-content') || null;
        },
        oGetSelectVal: function() {
            var _t = $(this);
            return _t.oGetSelect().oGetInput().val() || '';
        },
        oGetGroupVal: function() {
            var _t = $(this);
            return _t.oGetSelect().data('select-checked-parms') || '';
        },
        oListData: function(index) {
            var _t = this;
            var datalist = $.fn.oselectDefaults.dataList;
            var crud = 'create';
            var opts = _t.data('d-data');
            var index = index ? index : 1;
            var list = _t.oGetContent().find('.select-box-content[data-level="' + index + '"]');
            if (!list || list.length == 0) {
                if (index <= opts.length) {
                    crud = 'create';
                } else {
                    crud = 'close';
                }
            } else if (list.length > 0) {
                crud = 'update';
            }
            if (crud == 'close') {
                _t.removeClass('active');
                var _ncons = _t.oGetContent().find('.select-box-content[data-level]');
                var _currentCked = [];
                $.each(_ncons, function(x, y) {
                    _currentCked.push($(this).data('data-checked-parms'));
                    if ($(this).attr('data-level') == (index - 1)) {
                        var _lastCked = $(this).data('data-checked-parms');
                        _t.oGetText().attr("v", "true").find('span').text(_lastCked.title);
                        _t.oGetInput().val(_lastCked.title);
                    }
                })
                _t.data('select-checked-parms', _currentCked);
                return _t;
            }

            var cruelist = {
                create: function(__s, h) {
                    var abcPack = (h && h > 0) ? true : false;
                    _t.oGetContent().append('<div class="select-box-content' + (abcPack ? ' abc-pack' : '') + '" data-level="' + index + '" ' + (abcPack ? "style=\"height:" + h + "px;\"" : "") + '>' + __s + '</div>');
                    if (abcPack) {
                        _t.find('.select-bar-ABC').oListEvent('bindAbcClick');
                    }
                    var _ncon = _t.oGetContent().find('.select-box-content[data-level=' + index + ']');
                    _ncon.oListEvent('bindListClick');
                    $.fn.oselectDefaults.oEvents['toggleDisn'].call(this, _ncon, _t);
                },
                update: function(__s, h) {
                    var abcPack = (h && h > 0) ? true : false;
                    var _ncon = _t.oGetContent().find('.select-box-content[data-level=' + index + ']');
                    _ncon.html(__s);
                    if (abcPack) {
                        _ncon.addClass('abc-pack').css('height', h + 'px');
                        _t.find('.select-bar-ABC').oListEvent('bindAbcClick');
                    } else {
                        _ncon.removeClass('abc-pack').css('height', 'auto');
                    }
                    _ncon.oListEvent('bindListClick');
                    $.fn.oselectDefaults.oEvents['toggleDisn'].call(this, _ncon, _t);
                },
                evalAbc: function(arr) {
                    //品牌ABC索引
                    var __abc_str = '<div class="select-bar-ABC">';
                    for (var i = 0; i < arr.length; i++) {
                        __abc_str += '<a href="javascript:void(0);" data-abc="' + arr[i] + '">' + arr[i] + '</a>';
                    }
                    __abc_str += '</div>';
                    return __abc_str;
                }
            }

            // datalist(opts, (index - 1), dcallback);
            datalist.call(this, opts, index, dcallback);

            function dcallback(result) {
                var ots = opts[index - 1];
                var fid = ots.fieldv || 'id',
                    ftitle = ots.fieldt || 'title';
                var initVal = ots.selectedid || '';
                var data = ots.filter instanceof Function ? ots.filter(result) : result;
                if (!data || data.length == 0) { return; }
                var str = '<div class="select-data-dl">';
                var abc = [];
                if (ots.abcTag) {
                    //abc
                    abc = $.arrayfilter($.map(data, function(a) { return (ots.type != 'javascript' ? a[ftitle].substring(0, 1) : a["L"]) || '' }));
                    if (abc.length > 0) {
                        str += cruelist['evalAbc'](abc);
                        str += '<div class="select-dl">';
                        for (var i = 0; i < abc.length; i++) {
                            str += '<dl><dt>' + abc[i] + '</dt><dd>';
                            $.each(data, function(_i, item) {
                                if ((ots.type != 'javascript' ? item[ftitle].substring(0, 1) : item["L"]) == abc[i]) {
                                    var fname = item[ftitle];
                                    if (ots.type != 'javascript') {
                                        fname = item[ftitle].slice(4);
                                    }
                                    str += '<a href="javascript:void(0);" data-key="' + item[fid] + '" data-text="' + fname + '" title="' + fname + '" ' + ((initVal == item[fid]) ? 'class="active"' : '') + '>' + fname + '</a>';
                                }
                            })
                            str += '</dd></dl>';
                        }
                        str += '</div>';
                    }
                }
                if (!ots.abcTag || abc.length == 0) {
                    str += '<div class="select-dl"><dl>';
                    $.each(data, function(_i, group) {
                        var fname = group[ftitle];
                        var flist = group['list'] || group['List'] || '';
                        if (flist && flist.length > 0 && index > 1) {
                            str += '<dt>' + fname + '</dt><dd>';
                            for (var i = 0; i < flist.length; i++) {
                                str += '<a href="javascript:void(0);" data-key="' + flist[i][fid] + '" data-text="' + flist[i][ftitle] + '" title="' + flist[i][ftitle] + '" ' + ((initVal == flist[i][fid]) ? 'class="active"' : '') + '>' + flist[i][ftitle] + '</a>';
                            }
                            str += '</dd>';
                        } else {
                            if (_i == 0) {
                                str += '<dd>';
                            }
                            str += '<a href="javascript:void(0);" data-key="' + group[fid] + '" data-text="' + fname + '" title="' + fname + '" ' + ((initVal == group[fid]) ? 'class="active"' : '') + '>' + fname + '</a>';
                            if (_i == (data.length - 1)) {
                                str += '</dd>';
                            }
                        }
                    })
                    str += '</dl></div>';
                }

                str += '</div>';
                if (ots.abcTag) {
                    cruelist[crud](str, abc.length * 20);
                } else {
                    cruelist[crud](str);
                }
                _t.oListEvent('toggleLevel');
            }

        },
        oListEvent: function(type) {
            //事件分发
            var _t = this;
            var evts = $.fn.oselectDefaults.oEvents;
            switch (type) {
                case 'toggleDown':
                case 'bindAbcClick':
                    evts[type].call(this, _t);
                    break;
                case 'toggleLevel':
                    _t.oGetTitBar().off('click').on('click', 'ul li a', function(e) {
                        var _dom = $(e.target),
                            _li = _dom.parent('li');
                        var _level = _dom.parents('ul').find('li').index(_li);
                        if (_level > 0) {
                            _li.next('li').addClass('disn')
                                .siblings('li').removeClass('current');
                        } else {
                            _li.siblings('li').addClass('disn').removeClass('current');
                        }
                        _li.addClass('current');
                        var __contents = _dom.parents('.select-defined-content');
                        __contents.find('.select-box-content[data-level=' + (_level - (-1)) + ']').removeClass('disn')
                            .siblings('.select-box-content').addClass('disn');
                    })
                    break;
                case 'bindListClick':
                    var _zselect = _t.parents('.select-defined');
                    var _level = parseInt(_t.attr('data-level'));
                    _t.off('click').on('click', '.select-dl dl dd a', function(e) {
                        var _dom = $(e.target),
                            _id = _dom.attr('data-key'),
                            _txt = _dom.attr('data-text');
                        _dom.parents('.select-dl').find('a.active').removeClass('active');
                        _dom.addClass('active');
                        _zselect.find('.select-box-content').each(function(k, v) {
                            if ($(v).attr('data-level') > _level) {
                                $(v).removeData('data-checked-parms');
                            }
                        });
                        _t.data('data-checked-parms', {
                            "id": _id,
                            "title": _txt
                        })
                        _zselect.oListData(_level + 1);
                    })
                    break;
            }
        }
    });

    /*
    //default方式
    $('.oselect1').oselect([{
        abcTag: true, //标识索引
        type: '',
        url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/1',
        fieldv: 'id',
        fieldt: 'title',
        filter: function(result) { return result['rows']; },
        callback: function() {}
    }, {
        type: '',
        url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/3/pid/@parentValue',
        fieldv: 'id',
        fieldt: 'title',
        filter: function(result) { return result['rows']; },
        callback: function() {}
    }, {
        type: '',
        url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/5/pid/@parentValue',
        fieldv: 'id',
        fieldt: 'title',
        filter: function(result) { return result['rows']; },
        callback: function() {}
    }]);

    //easyui
    $('.oselect2').oselect([{
        abcTag: true, //标识索引
        type: 'easyui',
        url: 'http://brandcheyun.caridcc.com/index/ajax/easyui/type/1',
        fieldv: 'id',
        fieldt: 'title',
        callback: function() {}
    }, {
        type: 'default',
        // url: 'http://brandcheyun.caridcc.com/index/ajax/easyui/type/3/pid/@parentValue',
        url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/3/pid/@parentValue',
        fieldv: 'id',
        fieldt: 'title',
        filter: function(result) { return result['rows']; }
    }]);
    $('.oselect3').oselect([{
        // abcTag: true, //标识索引
        type: 'easyui',
        url: 'http://brandcheyun.caridcc.com/index/ajax/easyui/type/1',
        fieldv: 'id',
        fieldt: 'title',
        callback: function() {}
    }, {
        type: 'default',
        // url: 'http://brandcheyun.caridcc.com/index/ajax/easyui/type/3/pid/@parentValue',
        url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/3/pid/@parentValue',
        fieldv: 'id',
        fieldt: 'title',
        filter: function(result) { return result['rows']; }
    }]);
    
    setTimeout(function() {
        $('.oselect2').oselect([{
            abcTag: true, //标识索引
            type: '',
            url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/1',
            fieldv: 'id',
            fieldt: 'title',
            filter: function(result) { return result['rows']; },
            callback: function() {}
        }, {
            type: '',
            url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/3/pid/@parentValue',
            fieldv: 'id',
            fieldt: 'title',
            filter: function(result) { return result['rows']; },
            callback: function() {}
        }, {
            type: '',
            url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/5/pid/@parentValue',
            fieldv: 'id',
            fieldt: 'title',
            filter: function(result) { return result['rows']; },
            callback: function() {}
        }]);
    }, 1000);
    
    //javascript
    $('.oselect4').oselect([{
        abcTag: true,
        type: 'javascript',
        jsObject: 'JSONDATA',
        url: 'http://brandcheyun.caridcc.com/index/ajax/javascript',
        fieldv: 'I',
        fieldt: 'N'
    }, {
        type: 'javascript',
        jsObject: 'JSONDATA',
        fieldv: 'I',
        fieldt: 'N'
    }, {
        type: 'default',
        url: 'http://brandcheyun.caridcc.com/index/ajax/brand/type/5/pid/@parentValue',
        fieldv: 'id',
        fieldt: 'title',
        filter: function(result) { return result['rows']; },
        callback: function() {}
    }]);
    
    setTimeout(function() {
        $('.oselect5').oselect([{
            type: 'javascript',
            jsObject: 'JSONDATA',
            // url: 'http://brandcheyun.caridcc.com/index/ajax/javascript',
            fieldv: 'I',
            fieldt: 'N'
        }, {
            type: 'javascript',
            jsObject: 'JSONDATA',
            fieldv: 'I',
            fieldt: 'N'
        }]);
    }, 500);
    */
})(jQuery);