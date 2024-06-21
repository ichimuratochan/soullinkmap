var Info = function(){this.initialize.apply(this, arguments);}
Info.prototype = {
    info1 : null
,   info2 : null
,   info3 : null
,   info4 : null
,   info5 : null
,   initialize: function(_info1, _info2, _info3, _info4, _info5) {
        this.info1 = _info1;
        this.info2 = _info2;
        this.info3 = _info3;
        this.info4 = _info4;
        this.info5 = _info5;
    }
,   clone: function() {
        return new Info(this.info1, this.info2, this.info3, this.info4, this.info5);
    }
};
