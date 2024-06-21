var LinkViewLock = function(){this.initialize.apply(this, arguments);}
LinkViewLock.prototype = toolBox.extend(new BaseObject(), {
    soulId  : ''
,   bodyId  : ''
,   centerX : 0
,   centerY : 0
,   initialize: function() {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'LinkViewLock';
    }
});
