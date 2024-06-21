var Body = function(){this.initialize.apply(this, arguments);}
Body.prototype = toolBox.extend(new Table(), {
    rowBeforeUpdate :null
,   rebuildSoulLink: false
,   initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'Body';

        this.name = 'BODY';
        this.addColumn('BODY_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('SOUL_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('LINK_FLAG', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('PARENT_BODY_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('X', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('Y', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('W', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('H', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('R', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('ZORDER_NEXT_LOWER_BODY_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('ZORDER_NEXT_HIGHER_BODY_ID', toolBox.COLUMN_TYPE_STRING);
        this.key = 'BODY_ID';
        this.addIndex('SOUL_ID');
        this.addIndex('PARENT_BODY_ID');

        this.alive = true;
    }
,   afterEditRow: function(_row) {
        this.rowBeforeUpdate = this.cloneRow(_row); //afterUpdateRowで参照する更新前row
    }
,   afterUpdateRow: function(_row) {
        if (_row['SOUL_ID'] !== this.rowBeforeUpdate['SOUL_ID'] ||
            _row['PARENT_BODY_ID'] !== this.rowBeforeUpdate['PARENT_BODY_ID']
           ) {
            this.rebuildSoulLink = true;
        }
    }
,   afterAddRow: function(_row) {
        this.rebuildSoulLink = true;
    }
,   afterDeleteRow: function(_row) {
        this.rebuildSoulLink = true;
    }
});
