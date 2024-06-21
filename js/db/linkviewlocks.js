var LinkViewLocks = function(){this.initialize.apply(this, arguments);}
LinkViewLocks.prototype = toolBox.extend(new Table(), {
    initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'LinkViewLocks';

        this.name = 'LINK_VIEW_LOCKS';
        this.addColumn('VIEW_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('SOUL_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('BODY_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('CENTER_X', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('CENTER_Y', toolBox.COLUMN_TYPE_NUMBER);
        this.key = 'VIEW_ID,SOUL_ID';
        this.addIndex('VIEW_ID');

        this.alive = true;
    }
});
