// 核心方法
// 回调系统
// 异步队列
// 数据缓存
// 队列操作
// 选择器引
// 属性操作
// 节点遍历
// 文档处理
// 样式操作
// 属性操作
// 事件体系
// AJAX交互
// 动画引擎
;
(function($) {
    function foo(options) {
        options = $.extend({
            a: '1',
            b: '2'
        }, options);
        return options;
    }
    var foo_s = foo({ a: '111', b: '222', c: '333' });
    var bar = function() {
        console.log(foo_s);
    }
    $.Bar = bar;

    //(1)封装对象方法的插件
    //(2)封装全局函数的插件
    //(3)选择器插件-运算密集型函数
    $.fn.extend({
            color: function(val) {
                return this.css('color', val);
            }
        })
        //默认值
        //链式调用
        //$选择符匹配多个元素 this.each


    //核心方法

    //初始化元素 设置默认选中值

    //数据类型分类 ajax or load or select
    //jsonp
    //回调事件
    //绑定触发选择等操作
    //外部事件 设置选中值 获取选中值 setDisabled removeDisabled
    //数据缓存？

})(jQuery);