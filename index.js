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

            // dns查找
            var dns = calc(speed.dns, speed.total);
            $('.waterfall .total .dns').css('width', dns + '%');
            $('.waterfall .only .dnsTime').html(speed.dns + ' ms');
            $('.waterfall .only .dns').css('width', dns + '%');
            cur_width += dns;

            // 建立链接
            var ct = calc(speed.ct, speed.total);
            $('.waterfall .total .ct').css('width', ct + '%');
            $('.waterfall .only .ctTime').html(speed.ct + ' ms');
            $('.waterfall .only .ct').css('width', ct + '%');
            $('.waterfall .only .ct').css('margin-left', cur_width + '%');
            cur_width += ct;

            // 首字节
            var st = calc(speed.st, speed.total);
            $('.waterfall .total .st').css('width', st + '%');
            $('.waterfall .only .stTime').html(speed.st + ' ms');
            $('.waterfall .only .st').css('width', st + '%');
            $('.waterfall .only .st').css('margin-left', cur_width + '%');
            cur_width += st;

            // html传输
            var tt = calc(speed.tt, speed.total);
            $('.waterfall .total .tt').css('width', tt + '%');
            $('.waterfall .only .ttTime').html(speed.tt + ' ms');
            $('.waterfall .only .tt').css('width', tt + '%');
            $('.waterfall .only .tt').css('margin-left', cur_width + '%');
            cur_width += tt;

            // DOM解析
            var drt = calc(speed.drt, speed.total);
            $('.waterfall .total .drt').css('width', drt + '%');
            $('.waterfall .only .drtTime').html(speed.drt + ' ms');
            $('.waterfall .only .drt').css('width', drt + '%');
            $('.waterfall .only .drt').css('margin-left', cur_width + '%');
            cur_width += drt;

            // 页面渲染
            var dct = calc(speed.dct, speed.total);
            $('.waterfall .total .dct').css('width', dct + '%');
            $('.waterfall .only .dctTime').html(speed.dct + ' ms');
            $('.waterfall .only .dct').css('width', dct + '%');
            $('.waterfall .only .dct').css('margin-left', cur_width + '%');
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

document.addEventListener('DOMContentLoaded', function () {
    renderPerformance();
});
