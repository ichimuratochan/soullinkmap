var Rect = function(){this.initialize.apply(this, arguments);}
Rect.prototype = {
    x : 0
,   y : 0
,   w : 0
,   h : 0
,   x2 : 0
,   y2 : 0
,   r  : 0
,   x3 : 0
,   y3 : 0
,   initialize: function(_x, _y, _x2, _y2, _r) {
        this.x = _x;
        this.y = _y;
        this.w = _x2 - _x;
        this.h = _y2 - _y;
        this.x2 = _x2;
        this.y2 = _y2;
        if (_r !== undefined && _r !== null) {
            this.r = _r;
        }
    }
,   clone: function() {
        return new Rect(this.x, this.y, this.x2, this.y2, this.r);
    }
};
