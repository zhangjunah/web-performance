(function() {
    var speed = {
        status: 0,
        msg: ''
    };


    if (!window.performance || !window.performance.timing) {
        speed.status = 1;
        speed.msg = 'Not support performance timing API!';
    } else {
        var timing = window.performance.timing;

        if (timing['domComplete'] == 0 || timing['domComplete'] - timing['domainLookupStart'] <= 0) {
            speed.status = 1;
            speed.msg = 'Page is not domComplete!!!';

        } else {
            var start = timing['domainLookupStart'];
            var dns   = timing['domainLookupEnd'];
            var ct    = timing['connectEnd'];
            var st    = timing['responseStart'];
            var tt    = timing['responseEnd'];
            var drt   = timing['domInteractive'];
            var dct   = timing['domComplete'];

            speed['dns']   = dns - start;
            speed['ct']    = ct - dns;
            speed['st']    = st - ct;
            speed['tt']    = tt - st;
            speed['drt']   = drt - tt;
            speed['dct']   = dct - drt;
            speed['total'] = dct - start;
        }
    }

    return speed;

})();
