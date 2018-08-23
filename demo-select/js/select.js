$(function() {
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
            var mk = [],
                temp = '';
            if (arr.length > 0) {
                mk.push(arr[0]);
                $.map(arr, function(a, i) {
                    if (arr[i] != mk[mk.length - 1]) {
                        mk.push(arr[i]);
                    }
                    return '';
                })
            }
            return mk;
        }
    })
    $.fn.extend({
        tip: function(msg, arg) {
            /**
             * [msg 提示]
             * @type {[type]}
             */
            var _this = $(this);
            var posi1 = ['static', 'inherit'];
            var posi2 = ['absolute', 'fixed'];
            var pop = _this.css('position');
            if ((typeof pop == 'undefined') || $.inArray(pop, posi1) > -1) {
                if ($.inArray(pop, posi2) == -1) {
                    _this.addClass('pop-relative');
                }
            }
            _this.append('<div class="pop-tips">' + msg + '</div>');

            var stimer = setTimeout(function() {
                _this.removeClass('pop-relative');
                _this.find('.pop-tips').remove();
                clearTimeout(stimer);
            }, arg ? (arg.times || 1500) : 1500);
        }
    })
    $.fn.extend({
        initSelect: function() {
            var args = arguments[0] || '';
            var _this = $(this),
                rdid = $.randomid();
            if (_this.attr('inited') === 'yes') { return; }
            _this.attr({
                'inited': 'yes',
                'data-id': rdid
            });
            _this.data('data-select-level', 1);
            _this.data('data-title', eval(_this.attr('data-title'))).removeAttr('data-title');
            _this.after('<div id="select-' + rdid + '" class="select-defined ' + (_this.attr('data-skin') || '') + '" ' + (_this.attr('data-style') ? ('style="' + _this.attr('data-style') + '"') : ('')) + '>\
                        <div class="select-text"><span>' + (_this.attr('data-holder') || '') + '</span><i class="fa fa-angle-down ic-arrow"></i></div>\
                        <input type="hidden" name="' + (_this.attr('name') || '') + '" />\
                        <div class="select-defined-content">\
                            <div class="select-defined-title"></div>\
                        </div>\
                        </div>').removeAttr('name');
            //设置title bar 品牌 车系 车型
            _this.setSelectTitleBox(1);

            if (!args.length) return;
            if (args.length > 0) {
                _this.data('data-group', args);
                //first init 初始化设置数据
                _this.setSelcet(arguments[0] || '', rdid);
            }

            //下面是select点开关闭效果
            var __s = _this.next('.select-defined');
            if (_this.hasClass('disabled')) {
                __s.addClass('disabled');
            }
            __s.on('click', '.select-text', function(e) {
                e.stopPropagation();
                if ($(this).parent('.select-defined').hasClass('disabled')) {
                    return false;
                }
                var _box = $(e.target).parents('.select-defined');
                if (_box.hasClass('active')) {
                    _box.removeClass('active');
                } else {
                    $('.select-defined').removeClass('active');
                    _box.addClass('active');
                }
            });
            $(document).not(__s).on('click', function(e) {
                if ($(e.target).parents('.select-defined-content').length <= 0) {
                    __s.removeClass('active');
                }
            });
        },
        getSelectTitleBox: function() {
            return $(this).next('.select-defined').find('.select-defined-title') || $();
        },
        setSelectTitleBox: function(level) {
            //select 索引 品牌车系车型
            var _this = $(this);
            var boxTit = _this.data("data-title");
            var x = ['<ul>'];
            for (var i = 1; i < (boxTit.length + 1); i++) {
                x.push(i == 1 ?
                    ('<li class="' + (i == level ? 'current' : '') + '">\
                                <a href="javascript:void(0)">' + boxTit[i - 1] + '</a>\
                                </li>') :
                    ('<li class="' + (i == level ? 'current' : '') + ' ' + (i > level ? 'disn' : '') + '">\
                                <i>&gt;</i>\
                                <a href="javascript:void(0)">' + boxTit[i - 1] + '</a>\
                                </li>')
                );
            }
            x.push('</ul>');
            _this.getSelectTitleBox().html(x.join(''));

            //点击索引
            _this.getSelectTitleBox().off('click').on('click', 'ul li a', function(e) {
                var _ev_dom = $(e.target),
                    _now_alink = _ev_dom.parent('li');
                var _level = _ev_dom.parents('ul').find('li').index(_now_alink);

                if (_level > 0) {
                    _now_alink.next('li').addClass('disn')
                        .siblings('li').removeClass('current');
                } else {
                    _now_alink.siblings('li').addClass('disn').removeClass('current');
                }

                _now_alink.addClass('current');

                var __contents = _ev_dom.parents('.select-defined-content');
                __contents.find('.select-box-content[data-level=' + (_level - (-1)) + ']').removeClass('disn')
                    .siblings('.select-box-content').addClass('disn');

            })
        },
        setSelcet: function(args, sid) {
            var _this = $(this);
            var __s = _this.next('.select-defined');
            var _con = __s.find('.select-defined-content');
            var _con__tit = __s.find('.select-defined-title');
            var _con__dl = __s.find('.select-data-dl');
            if (args instanceof Array) {
                if (parseInt(_this.data('data-select-level')) > 0) {
                    var now_levl = parseInt(_this.data('data-select-level'));
                    _this.setSelectLevels({
                        'box': _con,
                        'index': now_levl
                    }, args);
                }
            }
        },
        evalAbcIndex: function(arr) {
            //品牌ABC索引
            var __abc_index = '<div class="select-bar-ABC">';
            for (var i = 0; i < arr.length; i++) {
                __abc_index += '<a href="javascript:void(0);" data-abc="' + arr[i] + '">' + arr[i] + '</a>';
            }
            __abc_index += '</div>';
            return __abc_index;
        },
        evalGroupData: function(index, props, data) {
            var fieldId = props.fieldValue || 'id',
                fieldName = props.fieldText || 'name';
            var initVal = props.setSelected || '';

            var _str = '<div class="select-data-dl">';
            if (index == 0) {
                // var _indexArr = $.arrayfilter($.map(data, function(a) { return a.fletter || '' }));
                var _indexArr = $.arrayfilter($.map(data, function(a) { return a.title.substring(0, 1) || '' }));
                _str += this.evalAbcIndex(_indexArr);
                _str += '<div class="select-dl" data-type="' + (index - (-1)) + '">';
                if (_indexArr.length > 0)
                    for (var i = 0; i < _indexArr.length; i++) {
                        _str += '<dl><dt>' + _indexArr[i] + '</dt><dd>';
                        $.each(data, function(_i, item) {
                            if (item['title'].substring(0, 1) == _indexArr[i]) {
                                var fname = item[fieldName].slice(4);
                                _str += '<a href="javascript:void(0);" data-key="' + item[fieldId] + '" data-text="' + fname + '" title="' + fname + '" ' + ((initVal == item[fieldId]) ? 'class="active"' : '') + '>' + fname + '</a>';
                            }
                        })
                        _str += '</dd></dl>';
                    }
                _str += '</div>';
            } else {
                _str += '<div class="select-dl" data-type="' + (index - (-1)) + '">';
                if (data.length > 0) {
                    $.each(data, function(_k, group) {
                        _str += '<dl><dt>' + group[fieldName] + '</dt><dd>';
                        if (group['list'].length > 0) {
                            for (var i = 0; i < group['list'].length; i++) {
                                _str += '<a href="javascript:void(0);" data-key="' + group['list'][i][fieldId] + '" data-text="' + group['list'][i][fieldName] + '" title="' + group['list'][i][fieldName] + '" ' + ((initVal == group['list'][i][fieldId]) ? 'class="active"' : '') + '>';
                                // if (index == 2) {
                                //     _str += '<span style="float:right;color:#d60000;padding: 0 5px;">19.80万</span>'
                                // }
                                _str += group['list'][i][fieldName] + '</a>';
                            }
                        }
                        _str += '</dd></dl>';
                    })
                }
                _str += '</div>';
            }
            _str += '</div>';
            return _str;
        },
        setSelectLevels: function() {
            //初始化每一级数据
            var args = arguments;
            var box = args[0]['box'],
                index = args[0]['index'] - 1,
                item = args[1][index];
            var newurl = item.url;
            this.setSelectTitleBox(index - (-1));

            if (index > 0) {
                var pid = box.find('.select-box-content[data-level=' + index + ']').data('data-checked-parms');
                pid = pid.key;
                newurl = newurl.replace('@parentValue', pid);
            }

            this.getSelectListData(newurl, function(result) {
                /**
                 * [result 获取到的数据]
                 */
                var _this = this;

                // _data数据过滤
                var _data = (item.dataFilter instanceof Function ? item.dataFilter(result) : result.data);
                box.find('.select-box-content').addClass('disn');
                //判断容器是否已存在
                var _nBox = box.find('.select-box-content[data-level=' + (index - (-1)) + ']');
                if (_nBox.length > 0) {
                    //品牌 车系 车型容器都有的情况下 改变相应容器内的数据
                    _nBox.html(_this.evalGroupData(index, item, _data)).removeClass('disn');
                } else {
                    box.append('<div class="select-box-content" data-level="' + (index - (-1)) + '">' + _this.evalGroupData(index, item, _data) + '</div>');
                }
                if (index === 0) {
                    //加载品牌数据时 将品牌索引也加载出来
                    var abc_length = $.arrayfilter($.map(_data, function(a) { return a.title.substring(0, 1) || '' })).length || 0;
                    box.find('.select-box-content[data-level=1]').css('height', abc_length * 20);
                }

                _nBox = box.find('.select-box-content[data-level=' + (index - (-1)) + ']');
                bindListEvent(_this, _nBox, args[1]);

                if (index > 0) {
                    var doselectId = box.find('.select-box-content[data-level=' + index + ']').data('data-checked-parms');
                    doselectId = doselectId.key;
                    var initselectId = args[1][index - 1].setSelected;
                    if (doselectId != initselectId) {
                        _this.clearSelectVal();
                        return;
                    } else {
                        if (item.setSelected && item.setSelected != '') {
                            _nBox.find('.select-dl dl dd a[data-key="' + item.setSelected + '"]').trigger('click');
                        }
                    }
                } else {
                    if (item.setSelected && item.setSelected != '') {
                        _nBox.find('.select-dl dl dd a[data-key="' + item.setSelected + '"]').trigger('click');
                    }
                    bindABCEvent(_this.next('.select-defined'));
                }

            }.bind(this));

            function bindListEvent(_ele, _nbox, argsgroup) {
                //点击选择 品牌 车系 车型时
                _nbox.off('click').on('click', '.select-dl dl dd a', function(e) {
                    //点击了品牌车系或者车型
                    var _ev_dom = $(e.target),
                        _ev_key = _ev_dom.attr('data-key'),
                        _ev_txt = _ev_dom.attr('data-text');

                    if (_ev_key) {
                        /**
                         * [level 当前下拉级别level]
                         */
                        var level = _ev_dom.parents('.select-dl').attr('data-type');
                        _ev_dom.parents('.select-dl').find('a.active').removeClass('active');
                        _ev_dom.addClass('active');

                        var __s = _ele.next('.select-defined');
                        __s.find('.select-box-content[data-level=' + level + ']').data('data-checked-parms', {
                            "key": _ev_key,
                            "txt": _ev_txt
                        })
                        __s.find('.select-box-content').each(function(k, v) {
                            if ($(v).attr('data-level') > level) {
                                $(v).removeData('data-checked-parms');
                            }
                        });
                        if (level < argsgroup.length) {
                            _ele.data('data-select-level', level - (-1));
                            _ele.setSelectLevels({
                                'box': __s.find('.select-defined-content'),
                                'index': level - (-1)
                            }, argsgroup);
                        } else {
                            __s.removeClass('active');
                            var _txt = _ev_dom.attr('data-text');
                            __s.find('.select-text').attr("v", "true").find('span').text(_txt).end().next('input[type=hidden]').val(_ev_key);
                            if (argsgroup[argsgroup.length - 1].dataSelected instanceof Function) {
                                argsgroup[argsgroup.length - 1].dataSelected(_ele, _ev_key, _txt);
                            }
                        }
                    }
                })
            }

            function bindABCEvent(_ele) {
                _ele.find('.select-bar-ABC').off('click').on('click', 'a', function(e) {
                    e.stopPropagation();
                    var _this = $(e.target);
                    var _eq = _this.parents('.select-bar-ABC').find('a').index(_this);
                    var _adcbox = _ele.find('.select-box-content[data-level=1] .select-dl');

                    if (_this.parents('.select-bar-ABC').data('ds-index') == _eq) {
                        return;
                    }
                    _adcbox.scrollTop(0);
                    _this.parents('.select-bar-ABC').data('ds-index', _eq);

                    var posTop = _adcbox.find('dl').eq(_eq).offset().top;
                    _adcbox.scrollTop(posTop - _adcbox.offset().top);
                });
            }
        },
        getSelectListData: function(_url, cbk) {
            //本地存储数据
            //如果本地没存储的话 就走下面ajax接口获取数据
            $.ajax({
                url: _url,
                type: "get",
                dataType: "jsonp",
                jsonpCallback: "jsonpCkb",
                success: function(result) {
                    if (result.state == "y") {
                        cbk(result);
                    }
                }
            });
        },
        getSelectVal: function() {
            return this.next('.select-defined').find('input[type="hidden"]').val();
        },
        getSelectText: function() {
            var txt = this.next('.select-defined').find('.select-text span').text();
            return (this.attr('data-holder') == txt) ? '' : txt;
        },
        getGroupVal: function() {
            var lists = this.next('.select-defined').find('.select-box-content');
            var datas = [];
            $.each(lists, function(k, v) {
                if ($(v).attr('data-level') == (k + 1)) {
                    if ($(v).data('data-checked-parms')) {
                        datas.push($(v).data('data-checked-parms'));
                    }
                }
            })
            return datas;
        },
        clearSelectVal: function() {
            this.next('.select-defined').find('input[type="hidden"]').val('');
            this.next('.select-defined').find('.select-text').removeAttr('v')
                .find('span').text(this.attr('data-holder') || '请选择');
        },
        clearGroupVal: function() {
            this.clearSelectVal();
            this.next('.select-defined').find('.select-defined-title ul').find('li').eq(0).find('a').trigger('click');
            this.next('.select-defined').find('.select-box-content').each(function(k, v) {
                $(v).removeData('data-checked-parms');
                if (k > 0) {
                    $(v).remove();
                } else {
                    $(v).find('.select-dl').find('a.active').removeClass('active');
                    // $(v).find('.select-dl').scrollTop(0);
                }
            });
        },
        hideSelect: function() {
            this.next('.select-defined').addClass('disn');
        },
        addDisabled: function() {
            this.addClass('disabled').next('.select-defined').addClass('disabled');
        },
        removeDisabled: function() {
            this.removeClass('disabled').next('.select-defined').removeClass('disabled');
        }
    })
})