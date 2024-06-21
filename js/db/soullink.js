var SoulLink = function(){this.initialize.apply(this, arguments);}
SoulLink.prototype = toolBox.extend(new Table(), {
    initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'SoulLink';

        this.name = 'SOUL_LINK';
        this.addColumn('A_SOUL_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('RELATION', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('B_SOUL_ID', toolBox.COLUMN_TYPE_STRING);
        this.key = 'A_SOUL_ID,RELATION,B_SOUL_ID';
        this.addIndex('A_SOUL_ID');
        this.addIndex('B_SOUL_ID');

        this.alive = true;
    }
});
