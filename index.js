/**
 * web performance by timing API (页面的性能timing数据)
 * author: zhangjunah(http://weibo.com/zhangjunah)
 * github: https://github.com/zhangjunah/web-performance
 */

function renderPerformance() {
    chrome.tabs.executeScript({file: 'content-script.js'}, function(result) {
        var speed = result[0];

        if (speed.status != 0) {
            document.body.innerHTML = speed.msg;
        } else {
            // 总时间
            $('.waterfall .totalTime').html(speed.total + ' ms');

            var cur_width = 0;
            var animateTime = 500;

            // dns查找
            var dns = calc(speed.dns, speed.total);
            $('.waterfall .total .dns').animate({width: dns + '%'}, animateTime);
            $('.waterfall .only .dnsTime').html(speed.dns + ' ms');
            $('.waterfall .only .dns').animate({width: dns + '%'}, animateTime);
            cur_width += dns;

            // 建立链接
            var ct = calc(speed.ct, speed.total);
            $('.waterfall .total .ct').animate({width: ct + '%'}, animateTime);
            $('.waterfall .only .ctTime').html(speed.ct + ' ms');
            $('.waterfall .only .ct').css('margin-left', cur_width + '%');
            $('.waterfall .only .ct').animate({width: ct + '%'}, animateTime);
            cur_width += ct;

            // 首字节
            var st = calc(speed.st, speed.total);
            $('.waterfall .total .st').animate({width: st + '%'}, animateTime);
            $('.waterfall .only .stTime').html(speed.st + ' ms');
            $('.waterfall .only .st').css('margin-left', cur_width + '%');
            $('.waterfall .only .st').animate({width: st + '%'}, animateTime);
            cur_width += st;

            // html传输
            var tt = calc(speed.tt, speed.total);
            $('.waterfall .total .tt').animate({width: tt + '%'}, animateTime);
            $('.waterfall .only .ttTime').html(speed.tt + ' ms');
            $('.waterfall .only .tt').css('margin-left', cur_width + '%');
            $('.waterfall .only .tt').animate({width: tt + '%'}, animateTime);
            cur_width += tt;

            // DOM解析
            var drt = calc(speed.drt, speed.total);
            $('.waterfall .total .drt').animate({width: drt + '%'}, animateTime);
            $('.waterfall .only .drtTime').html(speed.drt + ' ms');
            $('.waterfall .only .drt').css('margin-left', cur_width + '%');
            $('.waterfall .only .drt').animate({width: drt + '%'}, animateTime);
            cur_width += drt;

            // 页面渲染
            var dct = calc(speed.dct, speed.total);
            $('.waterfall .total .dct').animate({width: dct + '%'}, animateTime);
            $('.waterfall .only .dctTime').html(speed.dct + ' ms');
            $('.waterfall .only .dct').css('margin-left', cur_width + '%');
            $('.waterfall .only .dct').animate({width: dct + '%'}, animateTime);
            cur_width += dct;

            bindEvents();
        }
    });
}

// 计算宽度
function calc(item, total) {
    return item * 99 / total;
}

// 绑定鼠标事件
function bindEvents() {
    $('.only').on('mouseover', function() {
        console.log(this);
        if ($(this).attr('tip')) {
            $('.tip').html('计算方式：' + $(this).attr('tip'));
            $('.tip').show();
        }
    });

    $('.only').on('mouseout', function() {
        $('.tip').hide();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderPerformance();
});
