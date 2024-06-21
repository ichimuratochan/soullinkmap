var ActionBase = function(){this.initialize.apply(this, arguments);}
ActionBase.prototype = toolBox.extend(new BaseObject(), {
    soulMaster  : null
,   initialize: function(_soulMaster) {
        BaseObject.prototype.initialize.apply(this);
        this.soulMaster = _soulMaster;
        this.classType = 'ActionBase';
    }
,   destroy: function() {
        this.alive = false;
    }
});
