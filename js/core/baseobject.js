var BaseObject = function(){this.initialize.apply(this, arguments);}
BaseObject.prototype = {
    id          : ''
,   classType   : 'BaseObject'
,   alive       : false
,   initialize: function() {
        this.id = toolBox.createUniqueKey();
    }
,   destroy: function() {
        this.alive = false;
    }
};
