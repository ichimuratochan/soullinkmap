var Logger = function(){this.initialize.apply(this, arguments);}
Logger.prototype = {
    startTime   : 0
,   logLevel    : 0
,   initialize: function(_logLevel) {
        this.startTime = Number(new Date());
        this.logLevel = _logLevel;
    }
,   put: function(_buf, _level) {
        if (!_level || !this.logLevel) {
            console.log((Number(new Date()) - this.startTime) + ':' + _buf);
        }
        else {
            if (_level >= this.logLevel) {
                console.log((Number(new Date()) - this.startTime) + ':' + _buf);
            }
        }
    }
};
