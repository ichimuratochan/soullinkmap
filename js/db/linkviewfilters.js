var LinkViewFilters = function(){this.initialize.apply(this, arguments);}
LinkViewFilters.prototype = toolBox.extend(new Table(), {
    initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'LinkViewFilters';

        this.name = 'LINK_VIEW_FILTERS';
        this.addColumn('VIEW_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('SEQ_NO', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('SOUL_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('LOGICAL_OPERATOR', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('CONDITION_OPERATOR', toolBox.COLUMN_TYPE_NUMBER);
        this.key = 'VIEW_ID,SEQ_NO';
        this.addIndex('VIEW_ID');

        this.alive = true;
    }
});
