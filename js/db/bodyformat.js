var BodyFormat = function(){this.initialize.apply(this, arguments);}
BodyFormat.prototype = toolBox.extend(new Table(), {
    initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'BodyFormat';

        this.name = 'BODY_FORMAT';
        this.addColumn('BODY_FORMAT_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('SHAPE_TYPE', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('STROKE_STYLE', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('STROKE_LINE_WIDTH', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('SELECTED_STROKE_LINE_WIDTH', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('SELECTED_STROKE_STYLE', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('DRAW_SHADOW_FLAG', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('SHADOW_STROKE_LINE_WIDTH', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('SHADOW_STROKE_STYLE', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('FILL_STYLE', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('TEXT_DESCRIPTION', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('TEXT_SIZE', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('TEXT_FONT', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('TEXT_BASELINE', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('TEXT_ALIGN', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('TEXT_VERTICAL_ALIGN', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('TEXT_FILL_STYLE', toolBox.COLUMN_TYPE_STRING);
        this.key = 'BODY_FORMAT_ID';

        this.alive = true;
    }
});
