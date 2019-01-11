<<<<<<< HEAD
(function($) {
    //浏览器判断
    var browser = function() {
        return {
            mobile: window.navigator.userAgent.toLowerCase().match(/iphone|ipad|ios|android|ipod/) ? true : false
        }
    }();
    if (!browser.mobile) {
        // console.log('PC端不显示！！！');
        $('body').html('<p style="font-size: 16px;line-height: 50px;margin-left: 20px;height: 50px;">只能在移动设备上操作游戏！</p>');
        return false;
    } else {
        $('body').addClass('app-handle');
    };

    //播放背景音乐
    function toggleSound() {
        var music = document.getElementById("backMusic");
        if (music.paused) {
            music.play();
        }
    }
    //播放进球喝彩
    function succMusic() {
        var music_2 = document.getElementById("ballSuccMusic");
        if (music_2.paused) {
            music_2.play();
        }
    }

    function isPhoneX() {
        return (screen.width == 375 && screen.height == 812) ? true : false;
    }

    //计算画布宽高
    var baseW, baseH, whV, bgSrc;
    if (isPhoneX()) {
        baseW = 375, baseH = 812;
        bgSrc = __MYPUBLIC__ + "/images/bg2.jpg";
    } else {
        baseW = 540, baseH = 960;
        // baseW = 1080, baseH = 1920;
        // baseW = 1128, baseH = 1802;
        bgSrc = __MYPUBLIC__ + "/images/bg.jpg";
    }
    whV = (baseH / baseW).toFixed(2);

    var svgWidth = document.body.clientWidth;
    var svgHeight = svgWidth * whV;

    function getsize(w, h) {
        return {
            width: w / baseW * svgWidth,
            height: h / baseH * svgHeight,
        }
    }

    //路径计算
    var points = [{
        x1: 0,
        y1: -(isPhoneX() ? svgHeight * 0.16 : svgHeight * 0.3),
        x2: 0,
        y2: svgHeight * 0.5
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: svgWidth,
        y2: -svgHeight * 0.26
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: -svgWidth,
        y2: -svgHeight * 0.26
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: svgWidth,
        y2: -svgHeight * 0.16
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: svgWidth,
        y2: svgHeight * 0.2
    }];

    //加载loading
    var drawLoading = SVG("loading").size(svgWidth, svgHeight);
    var loadsGroup = drawLoading.group().size(140, 190).center((svgWidth - 140) / 2, (svgHeight - 240) / 2);
    for (var z = 6; z > 0; z--) {
        loadsGroup.add(drawLoading.image(__MYPUBLIC__ + '/images/loading/load_0' + z + '.jpg').size(140, 190).addClass("load_" + z));
    }
    loadsGroup.select('image').attr("display", "none");
    loadsGroup.animate(1000, '-').during(function(pos, morph, eased) {
        //1-8帧图循环播放
        var t = (pos * 10).toFixed(0);
        var n = t - (-2);
        if (n % 2 == 0) {
            // console.log(t, n, n % 2, (n / 2).toFixed(0));
            loadsGroup.select('image').attr("display", "none");
            loadsGroup.select('image.load_' + (n / 2).toFixed(0)).attr("display", "inline");
        }
    }).loop(true, true);

    var timeIsOver = false;
    var isTouched = true;
    var oldTouchTime = new Date().getTime();
    //画布
    var drawSvg = SVG("basket").size(svgWidth, svgHeight);

    //背景
    var image = drawSvg.image(bgSrc).size("100%", "100%").loaded(function(loader) {});

    //元素A 动态人
    // console.log(svgWidth, svgHeight);
    // var sizeA = getsize(svgWidth*0.54, svgHeight*0.68);//274, 626
    var sizeA = {
        width: svgWidth * 0.54,
        height: svgHeight * 0.68
    }
    if (isPhoneX()) {
        sizeA = getsize(190, 438);
    }
    var peopleA = drawSvg.group().size(sizeA.width, sizeA.height)
        .move((svgWidth - sizeA.width) / 2, svgHeight - sizeA.height);
    for (var a = 8; a > 0; a--) {
        peopleA.add(drawSvg.image(__MYPUBLIC__ + '/images/cells/tlan__' + a + '.png').addClass("peop_" + a).size(sizeA.width, sizeA.height));
    }
    peopleA.select('image').attr("display", "none");
    peopleA.select('image.peop_1').attr("display", "inline");

    //元素B 动态人
    var peopleB = peopleA.clone();
    for (var b = 29; b > 8; b--) {
        peopleB.add(drawSvg.image(__MYPUBLIC__ + '/images/cells/tlan__' + b + '.png').addClass("peop_" + b).size(sizeA.width, sizeA.height));
    }
    peopleA.addClass("people_a");
    peopleB.addClass("people_b");
    peopleB.select('image').attr("display", "none");

    //元素 篮筐
    var ballnetSize = getsize(102, 124);
    var ballnet = drawSvg.image(__MYPUBLIC__ + '/images/ballnet/1.png').size(ballnetSize.width, ballnetSize.height)
        .move(svgWidth * 0.425, svgHeight * 0.21); //176 156

    var ballnetGroup = drawSvg.group();
    ballnetGroup.size(ballnetSize.width, ballnetSize.height).move(svgWidth * 0.425, svgHeight * 0.211);
    if (isPhoneX()) {
        ballnetSize = getsize(64, 78);
        ballnet.size(ballnetSize.width, ballnetSize.height)
            .move(svgWidth * 0.43, svgHeight * 0.415);
        ballnetGroup.move(svgWidth * 0.43, svgHeight * 0.415);
    }
    for (var d = 1; d < 8; d++) {
        ballnetGroup.add(drawSvg.image(__MYPUBLIC__ + '/images/ballnet/' + d + '.png').addClass("ballnet_" + d).size(ballnetSize.width, ballnetSize.height));
    }
    ballnetGroup.select('image').attr("display", "none");

    //元素篮球 ball
    var ballsize = svgWidth * 0.15;
    var ball = drawSvg.group().center(svgWidth * 0.44, 200).addClass("basketball");
    for (var c = 5; c > 0; c--) {
        ball.add(drawSvg.image(__MYPUBLIC__ + '/images/cells/ball/tlan__q' + c + '.png').addClass("ball_" + c).size(ballsize, ballsize));
    }
    ball.select('image').attr("display", "none");

    //抛球动画
    function ballMove(ballTag) {
        //球体自旋转
        var bindex = 1;
        ball.select('image.ball_' + bindex).attr("display", "inline");
        // var setballring = setInterval(function() {
        //     bindex = (bindex == 6) ? 1 : bindex;
        //     var lastbindex = (bindex == 1) ? 5 : (bindex - 1);
        //     ball.select('image.ball_' + lastbindex).attr("display", "none");
        //     ball.select('image.ball_' + bindex).attr("display", "inline");
        //     bindex++;
        // }, 100);

        var idx = ballTag ? 0 : Math.floor(Math.random() * 4) - (-1);
        // var idx = 4;
        // ballTag = false;
        ball.animate(180, '<>').dmove(points[idx]['x1'], points[idx]['y1']).size(ballsize * 0.8).after(function() {
            if (ballTag) {
                //进球了 球框动态
                ballnet.attr("display", "none");
                ballnetGroup.animate(600, '-').during(function(pos, morph, eased) {
                    //1-8帧图循环播放
                    var t = (pos * 10).toFixed(0);
                    var n = t - (-2);
                    if (n % 2 == 0) {
                        ballnetGroup.select('image').attr("display", "none");
                        ballnetGroup.select('image.ballnet_' + (n / 2).toFixed(0)).attr("display", "inline");
                    }
                }).after(function() {
                    ballnetGroup.stop();
                    ballnetGroup.select('image').attr("display", "none");
                    ballnet.attr("display", "inline");
                });
                succMusic();
            }
            ball.animate(150, '>').dmove(points[idx]['x2'], points[idx]['y2']).size(ballsize * 0.2)
                .after(function() {
                    //球停止自旋转
                    // bindex = 1;
                    // clearInterval(setballring);
                    // isTouched = true;
                    console.log('ballover11111---', isTouched);
                    ball.stop();
                    console.log('ballover22222---', isTouched);
                    this.select('image').attr("display", "none");
                    //球位置复原
                    this.size(ballsize).center(svgWidth * 0.44, 200);
                    //进球数改变
                    $('#inCount').find('span').html(successTimes);
                });
        });
    };

    //元素A动作动作
    function prepareMove() {
        peopleA.animate(600, '-').during(function(pos, morph, eased) {
            //1-8帧图循环播放
            var t = (pos * 10).toFixed(0);
            var n = t - (-2);
            if (n % 2 == 0) {
                peopleA.select('image').attr("display", "none");
                peopleA.select('image.peop_' + (n / 2).toFixed(0)).attr("display", "inline");
            }
        }).loop(true, true);
    }
    // var ttttttt = setTimeout(function(){
    //     peopleA.finish();
    // },2000);

    //元素B动作
    function peopleMove(cbk) {
        peopleA.finish();
        peopleA.attr("display", "none");
        var step = 29;
        var stepv = (1 / step).toFixed(2);
        var stepx = 0;
        var once = false;
        peopleB.select('image').attr("display", "none");
        peopleB.animate(1000, '<>').during(function(pos, morph, eased) {
            if (stepx < step && pos > stepv * stepx) {
                peopleB.select('image.peop_' + stepx).attr("display", "none");
                stepx++;
                peopleB.select('image.peop_' + stepx).attr("display", "inline");
            }
            if (!once && stepx == 18) {
                // console.log('投球啦不管中不中');
                var popTag = cbk();
                ballMove(popTag);
                once = true;
            }
        }).after(function() {
            peopleB.stop();
            peopleB.select('image').attr("display", "none");
            prepareMove();
            peopleA.attr("display", "inline");
            if (timeIsOver) {
                peopleA.finish();
            }
        });
    }

    //手势触摸元素开始动态
    var successTimes = 0; //进球次数
    //蓄力值
    var oSet = 0; //蓄力值
    var baseSet = 30; //蓄力标准值 大于标准值可以进球 小于等于标准值不能进球
    var setInterbox = null;

    function startPower() {
        var tm = 1500; //3s
        var up = true;
        var vH = $('.power').height() - 8;
        $('#pointerv').css({
            'transition': 'all 1.5s linear',
            '-webkit-transition': 'all 1.5s linear',
            '-moz-transition': 'all 1.5s linear',
            '-o-transition': 'all 1.5s linear',
            'transform': 'translate(0, -' + vH + 'px)'
        });
        $('#pointerv').addClass('moveUp');
        up = false;
        setInterbox = setInterval(function() {
            if (up) {
                $('#pointerv').css({ 'transform': 'translate(0, -' + vH + 'px)' });
                $('#pointerv').removeClass('moveDown').addClass('moveUp');
                up = false;
            } else {
                $('#pointerv').css({ 'transform': 'translate(0, 0)' });
                $('#pointerv').removeClass('moveUp').addClass('moveDown');
                up = true;
            }
        }, tm);
        prepareMove();
    }

    function clearPower() {
        var pintV = $('#pointerv');
        clearInterval(setInterbox);
        pintV.removeClass('moveUp');
        pintV.removeClass('moveDown');
        pintV.css({
            'transition': 'transform 0s linear 0s',
            '-webkit-transition': 'transform 0s linear 0s',
            '-moz-transition': 'transform 0s linear 0s',
            '-o-transition': 'transform 0s linear 0s',
            'transform': 'translate(0, 0)'
        });
    }

    function getPowerV() {
        var splitarr = window.getComputedStyle($('#pointerv')[0]).getPropertyValue("transform").toString().split(',');
        var nowPos = splitarr[splitarr.length - 1].toString().slice(0, -1);
        return Math.abs(parseFloat(nowPos).toFixed(2));
    }

    function resetAll() {
        //重置蓄力条
        oSet = 0;
        baseSet = 30;
        $('#pointerw').css("height", baseSet + "%");
        //重置进球次数
        successTimes = 0;
        YourTimeCount = parseInt(YourTimeCount) - 1;
        var _mTime = parseInt($('#myTimes').attr('attr-v'));
        $('#myTimes').html(_mTime - 1).attr('attr-v', _mTime - 1);
    }


    // $('#basket').bind("touchstart", function(event) {
    //     if (!isTouched) {
    //         event.preventDefault();
    //     }
    // });

    $('#basket').on("click", function() {
        var n_date = new Date().getTime();
        // console.log(isTouched + '--' + n_date + '---' + oldTouchTime);
        // if (isTouched && (n_date - oldTouchTime) > 1000) {
        // isTouched = false;
        if ((parseInt(YourTimeCount) > 0) && (n_date - oldTouchTime) > 1500) {
            oldTouchTime = n_date;
            oSet = getPowerV();
            peopleMove(function() {
                var isBallSucc = false;
                if (oSet >= baseSet) {
                    isBallSucc = true;
                    successTimes += 1;
                    if (baseSet < 90) {
                        baseSet += 5;
                    }
                    $('#pointerw').css("height", baseSet + "%");
                }
                return isBallSucc;
            })
        }
    });

    // $('#basket').bind("touchmove", function() {});

    // $('#basket').bind("touchcancel", function() {});

    //倒计时
    function beginGame() {
        timeIsOver = false;
        startPower();
        var maxTime = 30; //每局游戏时长30s
        $('#clock').find('span.one').attr('num', 3);
        $('#clock').find('span.two').attr('num', 0);
        $('#clock').attr('attr-seconds', maxTime);
        var timInterval = setInterval(function() {
            if (maxTime > 0) {
                maxTime--;
                var tarr = maxTime.toString().split('');
                if (tarr.length > 1) {
                    $('#clock').find('span.one').attr('num', tarr[0]);
                    $('#clock').find('span.two').attr('num', tarr[1]);
                } else {
                    $('#clock').find('span.one').attr('num', '0');
                    $('#clock').find('span.two').attr('num', tarr[0]);
                }
                $('#clock').attr('attr-seconds', maxTime);
            } else {
                console.log('游戏结束');
                //弹出层提示 游戏结束 页面不可操作 重置数据
                timeIsOver = true;
                clearPower();
                peopleA.finish();
                clearInterval(timInterval);
                /*$.post('http://ksf.imbabot.com/addPoint', { 'openid': MYOPENID, 'type': _get_type }, function(_rd) {
                    if (_rd['status'] == '200') {*/
                //success
                $('#successTimes').html(successTimes);
                $('#getedCoins').html(300);
                $('#timeEnd').show();
                resetAll();
                /*} else {
                        //error
                        alert(_rd['msg']);
                    }
                })*/
            }
        }, 1000);
    }

    var setTimeLoad = setTimeout(function() {
        $('.app-loading').remove();
        loadsGroup.finish();
        if (parseInt(YourTimeCount) > 0) {
            $('#help').show();
        } else {
            $('#yourTimesOver').show();
        }
        clearTimeout(setTimeLoad);
    }, 3000);

    $('.helpBtn').on("click", function() {
        $('body').find('.dialog').hide();
        $('#help').show();
    })

    $('#knowIt').on("click", function() {
        $('#help').hide();
        if (!$(this).hasClass('knowed')) {
            $('#knowIt').addClass('knowed');
            beginGame();
            toggleSound();
        }
    })
    $('#playAgain').on("click", function() {
        $('#timeEnd').hide();
        if (parseInt(YourTimeCount) > 0) {
            // isTouched = true;
            beginGame();
        } else {
            $('#yourTimesOver').show();
        }
    })

    /* 
     $.post('http://ksf.imbabot.com/findRestPoint', { 'openid': MYOPENID }, function(_rd) {
        console.log('_rd', _rd);
        if (_rd['state'] == 'ok') {
            //success
            console.log('_rd222222', _rd);
            $('#myCoins').html(_rd['restPoint']);
        } else {
            //error
            // alert(_rd['msg']);
        }
    })
    */
    console.log('play basketball XXXXX');
=======
(function($) {
    //浏览器判断
    var browser = function() {
        return {
            mobile: window.navigator.userAgent.toLowerCase().match(/iphone|ipad|ios|android|ipod/) ? true : false
        }
    }();
    if (!browser.mobile) {
        // console.log('PC端不显示！！！');
        $('body').html('<p style="font-size: 16px;line-height: 50px;margin-left: 20px;height: 50px;">只能在移动设备上操作游戏！</p>');
        return false;
    } else {
        $('body').addClass('app-handle');
    };

    //播放背景音乐
    function toggleSound() {
        var music = document.getElementById("backMusic");
        if (music.paused) {
            music.play();
        }
    }
    //播放进球喝彩
    function succMusic() {
        var music_2 = document.getElementById("ballSuccMusic");
        if (music_2.paused) {
            music_2.play();
        }
    }

    function isPhoneX() {
        return (screen.width == 375 && screen.height == 812) ? true : false;
    }

    //计算画布宽高
    var baseW, baseH, whV, bgSrc;
    if (isPhoneX()) {
        baseW = 375, baseH = 812;
        bgSrc = __MYPUBLIC__ + "/images/bg2.jpg";
    } else {
        baseW = 540, baseH = 960;
        // baseW = 1080, baseH = 1920;
        // baseW = 1128, baseH = 1802;
        bgSrc = __MYPUBLIC__ + "/images/bg.jpg";
    }
    whV = (baseH / baseW).toFixed(2);

    var svgWidth = document.body.clientWidth;
    var svgHeight = svgWidth * whV;

    function getsize(w, h) {
        return {
            width: w / baseW * svgWidth,
            height: h / baseH * svgHeight,
        }
    }

    //路径计算
    var points = [{
        x1: 0,
        y1: -(isPhoneX() ? svgHeight * 0.16 : svgHeight * 0.3),
        x2: 0,
        y2: svgHeight * 0.5
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: svgWidth,
        y2: -svgHeight * 0.26
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: -svgWidth,
        y2: -svgHeight * 0.26
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: svgWidth,
        y2: -svgHeight * 0.16
    }, {
        x1: 0,
        y1: (isPhoneX() ? svgHeight * 0.1 : -svgHeight * 0.16),
        x2: svgWidth,
        y2: svgHeight * 0.2
    }];

    //加载loading
    var drawLoading = SVG("loading").size(svgWidth, svgHeight);
    var loadsGroup = drawLoading.group().size(140, 190).center((svgWidth - 140) / 2, (svgHeight - 240) / 2);
    for (var z = 6; z > 0; z--) {
        loadsGroup.add(drawLoading.image(__MYPUBLIC__ + '/images/loading/load_0' + z + '.jpg').size(140, 190).addClass("load_" + z));
    }
    loadsGroup.select('image').attr("display", "none");
    loadsGroup.animate(1000, '-').during(function(pos, morph, eased) {
        //1-8帧图循环播放
        var t = (pos * 10).toFixed(0);
        var n = t - (-2);
        if (n % 2 == 0) {
            // console.log(t, n, n % 2, (n / 2).toFixed(0));
            loadsGroup.select('image').attr("display", "none");
            loadsGroup.select('image.load_' + (n / 2).toFixed(0)).attr("display", "inline");
        }
    }).loop(true, true);

    var timeIsOver = false;
    var isTouched = true;
    var oldTouchTime = new Date().getTime();
    //画布
    var drawSvg = SVG("basket").size(svgWidth, svgHeight);

    //背景
    var image = drawSvg.image(bgSrc).size("100%", "100%").loaded(function(loader) {});

    //元素A 动态人
    // console.log(svgWidth, svgHeight);
    // var sizeA = getsize(svgWidth*0.54, svgHeight*0.68);//274, 626
    var sizeA = {
        width: svgWidth * 0.54,
        height: svgHeight * 0.68
    }
    if (isPhoneX()) {
        sizeA = getsize(190, 438);
    }
    var peopleA = drawSvg.group().size(sizeA.width, sizeA.height)
        .move((svgWidth - sizeA.width) / 2, svgHeight - sizeA.height);
    for (var a = 8; a > 0; a--) {
        peopleA.add(drawSvg.image(__MYPUBLIC__ + '/images/cells/tlan__' + a + '.png').addClass("peop_" + a).size(sizeA.width, sizeA.height));
    }
    peopleA.select('image').attr("display", "none");
    peopleA.select('image.peop_1').attr("display", "inline");

    //元素B 动态人
    var peopleB = peopleA.clone();
    for (var b = 29; b > 8; b--) {
        peopleB.add(drawSvg.image(__MYPUBLIC__ + '/images/cells/tlan__' + b + '.png').addClass("peop_" + b).size(sizeA.width, sizeA.height));
    }
    peopleA.addClass("people_a");
    peopleB.addClass("people_b");
    peopleB.select('image').attr("display", "none");

    //元素 篮筐
    var ballnetSize = getsize(102, 124);
    var ballnet = drawSvg.image(__MYPUBLIC__ + '/images/ballnet/1.png').size(ballnetSize.width, ballnetSize.height)
        .move(svgWidth * 0.425, svgHeight * 0.21); //176 156

    var ballnetGroup = drawSvg.group();
    ballnetGroup.size(ballnetSize.width, ballnetSize.height).move(svgWidth * 0.425, svgHeight * 0.211);
    if (isPhoneX()) {
        ballnetSize = getsize(64, 78);
        ballnet.size(ballnetSize.width, ballnetSize.height)
            .move(svgWidth * 0.43, svgHeight * 0.415);
        ballnetGroup.move(svgWidth * 0.43, svgHeight * 0.415);
    }
    for (var d = 1; d < 8; d++) {
        ballnetGroup.add(drawSvg.image(__MYPUBLIC__ + '/images/ballnet/' + d + '.png').addClass("ballnet_" + d).size(ballnetSize.width, ballnetSize.height));
    }
    ballnetGroup.select('image').attr("display", "none");

    //元素篮球 ball
    var ballsize = svgWidth * 0.15;
    var ball = drawSvg.group().center(svgWidth * 0.44, 200).addClass("basketball");
    for (var c = 5; c > 0; c--) {
        ball.add(drawSvg.image(__MYPUBLIC__ + '/images/cells/ball/tlan__q' + c + '.png').addClass("ball_" + c).size(ballsize, ballsize));
    }
    ball.select('image').attr("display", "none");

    //抛球动画
    function ballMove(ballTag) {
        //球体自旋转
        var bindex = 1;
        ball.select('image.ball_' + bindex).attr("display", "inline");
        // var setballring = setInterval(function() {
        //     bindex = (bindex == 6) ? 1 : bindex;
        //     var lastbindex = (bindex == 1) ? 5 : (bindex - 1);
        //     ball.select('image.ball_' + lastbindex).attr("display", "none");
        //     ball.select('image.ball_' + bindex).attr("display", "inline");
        //     bindex++;
        // }, 100);

        var idx = ballTag ? 0 : Math.floor(Math.random() * 4) - (-1);
        // var idx = 4;
        // ballTag = false;
        ball.animate(180, '<>').dmove(points[idx]['x1'], points[idx]['y1']).size(ballsize * 0.8).after(function() {
            if (ballTag) {
                //进球了 球框动态
                ballnet.attr("display", "none");
                ballnetGroup.animate(600, '-').during(function(pos, morph, eased) {
                    //1-8帧图循环播放
                    var t = (pos * 10).toFixed(0);
                    var n = t - (-2);
                    if (n % 2 == 0) {
                        ballnetGroup.select('image').attr("display", "none");
                        ballnetGroup.select('image.ballnet_' + (n / 2).toFixed(0)).attr("display", "inline");
                    }
                }).after(function() {
                    ballnetGroup.stop();
                    ballnetGroup.select('image').attr("display", "none");
                    ballnet.attr("display", "inline");
                });
                succMusic();
            }
            ball.animate(150, '>').dmove(points[idx]['x2'], points[idx]['y2']).size(ballsize * 0.2)
                .after(function() {
                    //球停止自旋转
                    // bindex = 1;
                    // clearInterval(setballring);
                    // isTouched = true;
                    console.log('ballover11111---', isTouched);
                    ball.stop();
                    console.log('ballover22222---', isTouched);
                    this.select('image').attr("display", "none");
                    //球位置复原
                    this.size(ballsize).center(svgWidth * 0.44, 200);
                    //进球数改变
                    $('#inCount').find('span').html(successTimes);
                });
        });
    };

    //元素A动作动作
    function prepareMove() {
        peopleA.animate(600, '-').during(function(pos, morph, eased) {
            //1-8帧图循环播放
            var t = (pos * 10).toFixed(0);
            var n = t - (-2);
            if (n % 2 == 0) {
                peopleA.select('image').attr("display", "none");
                peopleA.select('image.peop_' + (n / 2).toFixed(0)).attr("display", "inline");
            }
        }).loop(true, true);
    }
    // var ttttttt = setTimeout(function(){
    //     peopleA.finish();
    // },2000);

    //元素B动作
    function peopleMove(cbk) {
        peopleA.finish();
        peopleA.attr("display", "none");
        var step = 29;
        var stepv = (1 / step).toFixed(2);
        var stepx = 0;
        var once = false;
        peopleB.select('image').attr("display", "none");
        peopleB.animate(1000, '<>').during(function(pos, morph, eased) {
            if (stepx < step && pos > stepv * stepx) {
                peopleB.select('image.peop_' + stepx).attr("display", "none");
                stepx++;
                peopleB.select('image.peop_' + stepx).attr("display", "inline");
            }
            if (!once && stepx == 18) {
                // console.log('投球啦不管中不中');
                var popTag = cbk();
                ballMove(popTag);
                once = true;
            }
        }).after(function() {
            peopleB.stop();
            peopleB.select('image').attr("display", "none");
            prepareMove();
            peopleA.attr("display", "inline");
            if (timeIsOver) {
                peopleA.finish();
            }
        });
    }

    //手势触摸元素开始动态
    var successTimes = 0; //进球次数
    //蓄力值
    var oSet = 0; //蓄力值
    var baseSet = 30; //蓄力标准值 大于标准值可以进球 小于等于标准值不能进球
    var setInterbox = null;

    function startPower() {
        var tm = 1500; //3s
        var up = true;
        var vH = $('.power').height() - 8;
        $('#pointerv').css({
            'transition': 'all 1.5s linear',
            '-webkit-transition': 'all 1.5s linear',
            '-moz-transition': 'all 1.5s linear',
            '-o-transition': 'all 1.5s linear',
            'transform': 'translate(0, -' + vH + 'px)'
        });
        $('#pointerv').addClass('moveUp');
        up = false;
        setInterbox = setInterval(function() {
            if (up) {
                $('#pointerv').css({ 'transform': 'translate(0, -' + vH + 'px)' });
                $('#pointerv').removeClass('moveDown').addClass('moveUp');
                up = false;
            } else {
                $('#pointerv').css({ 'transform': 'translate(0, 0)' });
                $('#pointerv').removeClass('moveUp').addClass('moveDown');
                up = true;
            }
        }, tm);
        prepareMove();
    }

    function clearPower() {
        var pintV = $('#pointerv');
        clearInterval(setInterbox);
        pintV.removeClass('moveUp');
        pintV.removeClass('moveDown');
        pintV.css({
            'transition': 'transform 0s linear 0s',
            '-webkit-transition': 'transform 0s linear 0s',
            '-moz-transition': 'transform 0s linear 0s',
            '-o-transition': 'transform 0s linear 0s',
            'transform': 'translate(0, 0)'
        });
    }

    function getPowerV() {
        var splitarr = window.getComputedStyle($('#pointerv')[0]).getPropertyValue("transform").toString().split(',');
        var nowPos = splitarr[splitarr.length - 1].toString().slice(0, -1);
        return Math.abs(parseFloat(nowPos).toFixed(2));
    }

    function resetAll() {
        //重置蓄力条
        oSet = 0;
        baseSet = 30;
        $('#pointerw').css("height", baseSet + "%");
        //重置进球次数
        successTimes = 0;
        YourTimeCount = parseInt(YourTimeCount) - 1;
        var _mTime = parseInt($('#myTimes').attr('attr-v'));
        $('#myTimes').html(_mTime - 1).attr('attr-v', _mTime - 1);
    }


    // $('#basket').bind("touchstart", function(event) {
    //     if (!isTouched) {
    //         event.preventDefault();
    //     }
    // });

    $('#basket').on("click", function() {
        var n_date = new Date().getTime();
        // console.log(isTouched + '--' + n_date + '---' + oldTouchTime);
        // if (isTouched && (n_date - oldTouchTime) > 1000) {
        // isTouched = false;
        if ((parseInt(YourTimeCount) > 0) && (n_date - oldTouchTime) > 1500) {
            oldTouchTime = n_date;
            oSet = getPowerV();
            peopleMove(function() {
                var isBallSucc = false;
                if (oSet >= baseSet) {
                    isBallSucc = true;
                    successTimes += 1;
                    if (baseSet < 90) {
                        baseSet += 5;
                    }
                    $('#pointerw').css("height", baseSet + "%");
                }
                return isBallSucc;
            })
        }
    });

    // $('#basket').bind("touchmove", function() {});

    // $('#basket').bind("touchcancel", function() {});

    //倒计时
    function beginGame() {
        timeIsOver = false;
        startPower();
        var maxTime = 30; //每局游戏时长30s
        $('#clock').find('span.one').attr('num', 3);
        $('#clock').find('span.two').attr('num', 0);
        $('#clock').attr('attr-seconds', maxTime);
        var timInterval = setInterval(function() {
            if (maxTime > 0) {
                maxTime--;
                var tarr = maxTime.toString().split('');
                if (tarr.length > 1) {
                    $('#clock').find('span.one').attr('num', tarr[0]);
                    $('#clock').find('span.two').attr('num', tarr[1]);
                } else {
                    $('#clock').find('span.one').attr('num', '0');
                    $('#clock').find('span.two').attr('num', tarr[0]);
                }
                $('#clock').attr('attr-seconds', maxTime);
            } else {
                console.log('游戏结束');
                //弹出层提示 游戏结束 页面不可操作 重置数据
                timeIsOver = true;
                clearPower();
                peopleA.finish();
                clearInterval(timInterval);
                /*$.post('http://ksf.imbabot.com/addPoint', { 'openid': MYOPENID, 'type': _get_type }, function(_rd) {
                    if (_rd['status'] == '200') {*/
                //success
                $('#successTimes').html(successTimes);
                $('#getedCoins').html(300);
                $('#timeEnd').show();
                resetAll();
                /*} else {
                        //error
                        alert(_rd['msg']);
                    }
                })*/
            }
        }, 1000);
    }

    var setTimeLoad = setTimeout(function() {
        $('.app-loading').remove();
        loadsGroup.finish();
        if (parseInt(YourTimeCount) > 0) {
            $('#help').show();
        } else {
            $('#yourTimesOver').show();
        }
        clearTimeout(setTimeLoad);
    }, 3000);

    $('.helpBtn').on("click", function() {
        $('body').find('.dialog').hide();
        $('#help').show();
    })

    $('#knowIt').on("click", function() {
        $('#help').hide();
        if (!$(this).hasClass('knowed')) {
            $('#knowIt').addClass('knowed');
            beginGame();
            toggleSound();
        }
    })
    $('#playAgain').on("click", function() {
        $('#timeEnd').hide();
        if (parseInt(YourTimeCount) > 0) {
            // isTouched = true;
            beginGame();
        } else {
            $('#yourTimesOver').show();
        }
    })

    /* 
     $.post('http://ksf.imbabot.com/findRestPoint', { 'openid': MYOPENID }, function(_rd) {
        console.log('_rd', _rd);
        if (_rd['state'] == 'ok') {
            //success
            console.log('_rd222222', _rd);
            $('#myCoins').html(_rd['restPoint']);
        } else {
            //error
            // alert(_rd['msg']);
        }
    })
    */
    console.log('play basketball XXXXX');
>>>>>>> 8f33d3388ed0c45d5fd3c6910549d7b78440e8e8
})(Zepto);