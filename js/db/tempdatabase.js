var TempDataBase = function(){this.initialize.apply(this, arguments);}
TempDataBase.prototype = toolBox.extend(new LocalDataBase(), {
    initialize: function() {
        LocalDataBase.prototype.initialize.apply(this);
        this.classType = 'TempDataBase';

        this.alive = true;
    }
});
