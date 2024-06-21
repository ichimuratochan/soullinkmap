var Soul = function(){this.initialize.apply(this, arguments);}
Soul.prototype = toolBox.extend(new Table(), {
    initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'Soul';

        this.name = 'SOUL';
        this.addColumn('SOUL_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('TEXT', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('BODY_FORMAT_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('IMAGE_URL', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('HYPER_LINK_URL', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('HYPER_LINK_URL_MODE', toolBox.COLUMN_TYPE_NUMBER, toolBox.HYPER_LINK_URL_MODE_NORMAL);
        this.addColumn('HYPER_LINK_JSONP_DIRECT_JUMP_FLAG', toolBox.COLUMN_TYPE_STRING);
        this.key = 'SOUL_ID';
        this.addIndex('BODY_FORMAT_ID');

        this.alive = true;
    }
});
