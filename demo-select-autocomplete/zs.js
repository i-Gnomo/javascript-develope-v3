;(function() {
    //把select里面的option数据 转换为一个data数组[{value:'',text:''}]
    function getSelectDatalist(_select) {
        var data = [];
        _select.find('option').each(function() {
            var _text = $(this).text();
            var _value = $(this).val();
            data.push({ text: _text, value: _value });
        });
        if(!data.length) {
            var _prompt = _select.attr('data-prompt') || '请选择';
            data.push({
                text: _prompt,
                value: ''
            });
        }
        return data;
    }

    //获取10位长度的随机字符串 由数字和英文字母组成
    function createZboxId() {
        var zid = '';
        var wds = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        for(var i = 0; i < 10; i++) {
            zid += (wds[Math.floor(Math.random() * wds.length)]);
        }
        return zid;
    }

    $.fn.extend({
        zSelect: function(opts) {
            opts = opts ? opts : {};
            return $(this).each(function(k, v) {
                var _v = $(v);
                if(_v.is('select')) {
                    if(_v.attr('isInited') === 'yes') {
                        return;
                    }
                    _v.attr('isInited', 'yes');
                    _v.hide();
                    var data = getSelectDatalist(_v);
                    var _value = _v.attr('data-value') || _v.val() || '';
                    var _name = _v.attr('name') || '';
                    var _skin = _v.attr('data-skin') || '';
                    var _content=_v.attr('data-content') || false;
                    var zbox_id = createZboxId();
                    _v.data('zbox_id', zbox_id);
                    _v.addClass('zbox-id-' + zbox_id);
                    _v.attr('name', '');
                    _v.after('<div data-zbox-id="' + zbox_id + '" class="zs-box ' + _skin + ' zbox-' + zbox_id + '"><div contenteditable="'+_content+'" class="zs-value">请选择</div><i class="zs-down-ico"></i><input class="zs-input" name="' + _name + '" value="" type="hidden"/><ul class="zs-list"></ul></div>');
                    _v.zsSetData(data, {});
                    _v.zsGetBox().setZsValue(_value);
                    if(v.disabled) {
                        _v.zsGetBox().setZsDisabled(true);
                    }
                }
            });
        },
        setZsValue: function(_value) {
            return $(this).each(function(k, v) {
                var _v = $(v);
                if(_v.is('select')) {
                    _v.zsGetBox().setZsValue(_value);
                } else if(_v.is('.zs-box')) {
                    _v.find('.zs-item.current').removeClass('current');
                    var _item = _v.find('.zs-item[v="' + _value + '"]').addClass('current');
                    var _text = '请选择';
                    if(_item.length) {
                        _text = _item.attr("title");
                        // _text = _item.text();
                    } else {
                        _value = '';
                    }
                    _v.find('.zs-value').text(_text).attr('title', _text);
                    _v.find('.zs-input').val(_value);
                    $('.zbox-id-' + _v.attr('data-zbox-id')).trigger('setZsValue');
                }
            });
        },
        getZsValue: function() {
            if($(this).is('select')) {
                return $(this).zsGetBox().find('.zs-input').val();
            } else if($(this).is('.zs-box')) {
                return $(this).find('.zs-input').val();
            }
            return '';
        },
        setZsDisabled: function(isdisb) {
            return isdisb ? $(this).zsGetBox().addClass('zs-disabled') : $(this).zsGetBox().removeClass('zs-disabled');
        },
        zsGetBox: function() {
            var _t = $(this);
            if(_t.is('select')) {
                var zbox_id = _t.data('zbox_id');
                if(zbox_id) {
                    return $('.zbox-' + zbox_id);
                } else {
                    return $();
                }
            } else if(_t.is('.zs-box')) {
                return _t;
            }
        },
        zsLoadData: function(opts) {
            return $(this).each(function(k, v) {
                var _v = $(v);
                $.ajax({
                    url: opts.url,
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        var _prompt = _v.attr('data-prompt');
                        var _data = [];
                        if(opts.dataFitler) {
                            data = opts.dataFitler(data);
                        }
                        if(_prompt) {
                            var item = {};
                            if(opts.valueField) {
                                item[opts.valueField] = '';
                            } else {
                                item['value'] = '';
                            }
                            if(opts.textField) {
                                item[opts.textField] = _prompt;
                                item['text'] = _prompt;
                            }

                            _data = [item].concat(data);
                        } else {
                            _data = data;
                        }
                        _v.zsSetData(_data, opts);
                        _v.trigger('dataSeted');
                    }
                });
            });
        },
        zsSetData: function(dataList, opts) {
            return $(this).each(function(k, v) {
                var _v = $(v);
                var _list = '';
                $.each(dataList, function(index, item) {
                    var __v = item[opts.valueField || 'value'];
                    var __text = item[opts.textField || 'text']; 
                    if(item[opts.fletterField || 'fletter'] && typeof item[opts.fletterField || 'fletter']!='undefined'){
                        var __text2 = item[opts.fletterField || 'fletter'] +'-'+ item[opts.textField || 'text']; 
                    }else{
                        var __text2 = __text;
                    }
                    
                    _list += ('<li class="zs-item" v="' + __v + '" title="' + __text + '">' + __text2 + '</li>');
                });
                _v.zsGetBox().find('.zs-list').empty().append(_list);
                if(opts.setValue) {
                    _v.zsGetBox().setZsValue(opts.setValue);
                }
            });
        }
    });

    $.extend({
        zSelectGroup: function(zsList) {
            function copyItem(item) {
                var newItem = {};
                for(var i in item) {
                    newItem[i] = item[i];
                }
                return newItem;
            }

            $.each(zsList, function(index, item) {
                var _item = copyItem(item);
                _item.initValue = _item.setValue;
                _item.initDisabled = _item.setDisabled || false;
                _item.setValue = '';
                if(index == 0) {
                    _item.elem.zsLoadData(_item);
                } else {
                    _item.elem.zsGetBox().setZsDisabled(true);

                    var parent = zsList[index - 1];
                    parent.elem.on('setZsValue', function() {
                        var _value = parent.elem.getZsValue();
                        _item.elem.zsGetBox().setZsValue('');
                        if(_value) {
                            _item.url = item.url.replace('@parentValue', _value);
                            _item.elem.zsLoadData(_item).zsGetBox().setZsDisabled(false);
                        } else {
                            _item.elem.zsGetBox().setZsDisabled(true);
                        }
                    });
                }
                _item.elem.one('dataSeted', function() {
                    if(_item.initValue) {
                        _item.elem.zsGetBox().setZsDisabled(_item.initDisabled? _item.initDisabled:false).setZsValue(_item.initValue);
                    }
                });
            });
        }
    });

    $(function() {
        $(document).on('click', function(e) {
            var _tg = $(e.target);
            if(!(_tg.hasClass('zs-box') || _tg.parents('.zs-box').length)) {
                $('.zs-box').removeClass('active')
            }
        });
        $(document).on('click', '.zs-box', function() {
            var _t = $(this);
            if(_t.hasClass('zs-disabled') || _t.hasClass('readonly')) {
                return;
            }
            $('.zs-box').not(this).removeClass('active');
            _t.toggleClass('active').removeClass('active-top');
            var _list = _t.find('.zs-list');
            if(_list.offset().top + _list.height() > $(window).scrollTop() + $(window).height()) {
                _t.addClass('active-top');
            }
        });
        $(document).on('click', '.zs-box .zs-item', function() {
            var _value = $(this).attr('v');
            $(this).parents('.zs-box').setZsValue(_value);
        });

        if($('.z-select')){
            $('.z-select').zSelect();
        }
    });
})();


/**
 * [description]
    // select下拉框的使用
    $(".search_key").on('setZsValue',function(){
        var _key = $(this).getZsValue();
        console.log(_key);
    });

    $('.z-select').zSelect();//渲染下拉框
    $(".search_key").getZsValue();//下拉框的当前选中值
    $(".search_key").setZsValue('state');//设置下拉框的选中值
    $(".search_key").setZsDisabled(true); //下拉框不可选择

    // 设置下拉数据
    $(".search_key").zsSetData([
        {'text':'zsx1','value':'1'},
        {'text':'zsx2','value':'2'},
        {'text':'zsx3','value':'3'},
        {'text':'zsx4','value':'4'}
    ],{
        valueField: 'value',
        textField: 'text'
    }).setZsValue('');

    // ajax方式设置下拉数据
    $(".search_key").zsLoadData({
        'valueField': 'id',
        'textField': 'name',
        'url': '../resource/jsondata/new4s_xs_state.json',
    });

    $.zSelectGroup([{
        elem: $('.sg_province'),
        setValue:'21',
        setDisabled: true, //可以设置联动下拉框是否可点击
        valueField: 'id',
        textField: 'name',
        url: '../resource/jsondata/new4s_xs_province.json?level=1',
        dataFitler: function(result) {
            return result.data;
        }
    }, {
        elem: $('.sg_city'),
        setValue:'22',
        setDisabled: true, //可以设置联动下拉框是否可点击
        valueField: 'id',
        textField: 'name',
        url: '../resource/jsondata/new4s_xs_province.json?level=2&pid=@parentValue',
        dataFitler: function(result) {
            return result.data;
        }
    }]);

 */

/**
 * [select autocomplete 下拉框输入自动匹配字段值]
 * @extend jQuery zSelect
 * @author zhangshaoxuan
 */
$(function(){
    function _bindEd(_s){
        var _d = _s.data('selectauto');
        var _b = _s.zsGetBox().find('.zs-value');

        var _c = _d.conf;
        _b.attr("placeholder", _c.prompt);
        _b.off('.autoselect');

        for(var evt in _c.inputEvents){
            _b.on(evt+'.autoselect', {target: _b, father: _s}, _c.inputEvents[evt]);
        }
    }
    function _e_blur(e){
        var t = $(e.data.target);
        if($.trim(t.text())==''){
            t.text(t.attr('placeholder'));
        }
        return false;
    }
    function _e_click(e){
        var t = $(e.data.target);
        t.attr('title','');

        $('.zs-box').not(t.parents('.zs-box')).removeClass('active');
        var _s = $('select.zbox-id-'+t.parents('.zs-box').attr('data-zbox-id'));
        if(t.text().indexOf('请选择')>-1){
            t.text('');
        }
        _s.selectauto('showList');
        _s.data('selectauto').conf.keyHandler.query.call(t, e);
        return false;
    }
    function _write_in(e){
        var t = e.data.target;
        var _b = $(t); //txt box
        var _s = $(e.data.father); //select
        var _d = _s.data('selectauto'); //all configs
        var _c = _d.conf; //defaults
        if(e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13 && e.keyCode != 9 && e.keyCode != 27){
            if(_d.timer){
                clearTimeout(_d.timer);
            }
            _d.timer = setTimeout(function(){
                var _v = _b.text();
                if(_d.previousText != _v){
                    _d.previousText = _v;
                    _s.selectauto('showList');
                    _c.keyHandler.query.call(t, e);
                }
            }, 300);
        }
    }
    function _events(e) {
        var t = e.data.target;
        var _b = $(t); //txt box
        var _s = $(e.data.father); //select
        var _d = _s.data('selectauto'); //all configs
        var _c = _d.conf; //defaults

        switch(e.keyCode) {
            case 38:
                e.preventDefault();
                e.stopPropagation();
                _c.keyHandler.up.call(t, e);
                break;
            case 40:
                e.preventDefault();
                e.stopPropagation();
                _c.keyHandler.down.call(t, e);
                break;
            case 13:
                e.preventDefault();
                _c.keyHandler.enter.call(t, e);
                return false;
                break;
            case 9:
            case 27:
                // close select;
                _c.keyHandler.close.call(t, e);
                break;
            default:;
        }
    }
    function to_Last_Div(t) {
        if (window.getSelection) {
            t.focus();
            var range = window.getSelection();
            range.selectAllChildren(t);
            range.collapseToEnd();
        }
        else if (document.selection) {
            var range = document.selection.createRange();
            range.moveToElementText(t);
            range.collapse(false);
            range.select();
        }
    }
    function up2down(_t, type){
        var _s = $('select.zbox-id-'+_t.parents('.zs-box').attr('data-zbox-id'));
        var zbox = _s.zsGetBox();
        var zlist = zbox.find('.zs-list');
        var _v = zbox.find('.zs-input').val();
        if(!zlist || !zlist.find('li')) {return false;}

        if(type == 'up'){
            var _tocell = zlist.find('li.current').prev('li');
            var _row = _tocell.length>0? _tocell: zlist.find('li').last();
        }
        if(type == 'down'){
            var _tocell = zlist.find('li.current').next('li');
            var _row = _tocell.length>0? _tocell: zlist.find('li').first();
        }

        _row.addClass('current').siblings('li.current').removeClass('current');
        zbox.find('.zs-value').text(_row.text());
        zbox.find('.zs-input').val(_row.attr('v'));
        _t.focus();
        to_Last_Div(_t[0]);
        return false;
    }
    function filterData(s, _v){
        var _d = s.data('selectauto');
        var _list = _d.data;
        var field = {
            valueField: _d.conf.valueField,
            textField: _d.conf.textField
        };
        _d.previousText = _v;
        if($.trim(_v) == '') { return _list;}
        var _vs = [];
        for(var a in _list){
            if(_list[a][field.textField].indexOf($.trim(_v))>-1){
                _vs.push(_list[a]);
            }
        }
        return _vs;
    }

    $.fn.selectauto = function(opts, dv){
        var _this = this;
        if(typeof opts == "string"){
            var _fun = $.fn.selectauto.methods[opts];
            if(_fun){
                return _fun(_this, dv);
            }else{
                return _this; 
            }
        }
        if(!opts.url && !opts.datalist){
            return _this;
        }
        var confs = $.extend({}, $.fn.selectauto.defaults, opts);
        return _this.each(function(_k,_item){
            if(confs.url){
                var s = $.fn.selectauto.methods['getAjaxData'];
                if(s){
                    s(confs.url, function(_data){
                        var _datalist = _data;
                        if(confs.dataFitler instanceof Function){
                            _datalist = confs.dataFitler(_datalist);
                        }
                        var opt = $.fn.selectauto.methods['getOptions'];
                        if(opt){
                            $(_item).data('selectauto', {
                                conf: confs,
                                list: _datalist,
                                data: opt(confs.textField, _datalist)
                             });
                        }
                        _bindEd($(_item));
                    })
                }
            }
        });
    }
    $.fn.selectauto.methods = {
        getAjaxData: function(_url, cbk){
            $.get(_url, function(result){
                cbk(result);
            })
        },
        getOptions: function(txt, _data){
            return $.map(_data,function(_itm){
                return _itm;
            });
        },
        getBoxText: function(s, txt){
            // debugger;
            var _data = s.data('selectauto');
            var _conf = _data.conf;
            var _list = _data.data;
            var vField = _conf.valueField;
            var tField= _conf.textField;
            var _id = '';
            for(var v in _list){
                if(_list[v][tField] == txt){
                    _id = _list[v][vField];
                }
            }
            return _id;
        },
        setInputVal: function(t){
            var _s = $('select.zbox-id-'+t.parents('.zs-box').attr('data-zbox-id'));
            var zbox = _s.zsGetBox();
            var _txt = $.trim(zbox.find('.zs-value').text());
            var _v = _s.selectauto('getBoxText', _txt);
            zbox.find('.zs-input').val(_v==''?_txt:_v);
            if(_v!=''){
                zbox.find('.zs-list li').each(function(_k, itm){
                    if($(itm).attr('v') == _v){
                        $(itm).addClass('current').siblings('li.current').removeClass('current');
                    }
                })
            }
        },
        showList: function(jq){
            return jq.each(function(){
                // debugger;
                var zbox = $(this).zsGetBox();
                var tbox = zbox.find('.zs-value');
                var _d = $(this).data('selectauto');
                var fields = {
                    valueField: _d.conf.valueField,
                    textField: _d.conf.textField
                };
                var _data = filterData($(this), tbox.text());
                $(this).zsSetData(_data, fields);

                if(_data.length>0){
                    zbox.addClass('active');
                }else{
                    zbox.removeClass('active');
                }
            });
        }
    }
    $.fn.selectauto.defaults = $.extend({},{
        inputEvents: { blur: _e_blur, click: _e_click, keydown: _events,  keyup: _write_in },
        valueField: 'id',
        textField: 'title',
        setDisabled: false,
        setValue: '',
        keyHandler: {
            up: function(e) {
                var _t = $(e.target);
                _t.blur();
                up2down(_t, 'up');
            },
            down: function(e) {
                var _t = $(e.target);
                _t.blur();
                up2down(_t, 'down');
            },
            enter: function(e) {
                var _t = $(e.target);
                _t.selectauto('setInputVal');
                _t.blur();
                var _s = $('select.zbox-id-'+_t.parents('.zs-box').attr('data-zbox-id'));
                var zbox = _s.zsGetBox();
                zbox.removeClass('active');
            },
            query: function(e) {
                var _t = $(e.target);
                _t.selectauto('setInputVal');
            },
            close: function(e){
                var _t = $(e.target);
                _t.blur();
                var _s = $('select.zbox-id-'+_t.parents('.zs-box').attr('data-zbox-id'));
                var zbox = _s.zsGetBox();
                zbox.removeClass('active');
            }
        }
    });
})

/**
 * autocomplete 
 * demo 
 * 
    $('.z-group-01').zsLoadData({
        'valueField': 'id',
        'textField': 'title',
        'url': '/api/getSupplierItypeList',
        'setValue': 1,
        dataFitler: function(result) {
            var newdata = [];
            $.each(result.data, function(index,item){
                if(item.id!="2" && item.id!="3"){
                    newdata.push(item);
                }
            });
            return newdata;
        }
    });
    
    $('.z-group-01').on('setZsValue', function(){
        var _key = $(this).getZsValue();
        $('.z-group-02').selectauto({
            'prompt': '请选择',
            'valueField': 'sid',
            'textField': 'title',
            'url': '/cla/getSupplierList?itype='+_key,
            dataFitler: function(result) {
                return result.data;
            }
        });
    })
 */