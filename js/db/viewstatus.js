var ViewStatus = function(){this.initialize.apply(this, arguments);}
ViewStatus.prototype = toolBox.extend(new Table(), {
    initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'ViewStatus';

        this.name = 'VIEW_STATUS';
        this.addColumn('VIEW_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('VIEW_MODE', toolBox.COLUMN_TYPE_NUMBER, toolBox.VIEW_MODE_EDITVIEW);
        this.addColumn('VIEW_STYLE_MODE', toolBox.COLUMN_TYPE_NUMBER, toolBox.VIEW_STYLE_MODE_ORIGINAL);
        this.addColumn('VIEW_IMAGE_MODE', toolBox.COLUMN_TYPE_NUMBER, toolBox.VIEW_IMAGE_MODE_ORIGINAL);
        this.addColumn('BIRDVIEW_PARENT_STEP_COUNT', toolBox.COLUMN_TYPE_NUMBER, 5);
        this.addColumn('BIRDVIEW_CHILD_STEP_COUNT', toolBox.COLUMN_TYPE_NUMBER, 5);
        this.addColumn('BIRDVIEW_DIRECTION', toolBox.COLUMN_TYPE_NUMBER, toolBox.BIRDVIEW_DIRECTION_RIGHT);
        this.addColumn('BIRDVIEW_HORIZONTAL_SPACE', toolBox.COLUMN_TYPE_NUMBER, 5);
        this.addColumn('BIRDVIEW_VERTICAL_SPACE', toolBox.COLUMN_TYPE_NUMBER, 15);
        this.addColumn('BIRDVIEW_LEVEL', toolBox.COLUMN_TYPE_NUMBER, toolBox.BIRDVIEW_LEVEL_NORMAL);
        this.addColumn('LINKVIEW_STEP_COUNT', toolBox.COLUMN_TYPE_NUMBER, 5);
        this.addColumn('READONLY_FLAG', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('FILL_STYLE', toolBox.COLUMN_TYPE_STRING, '#ffffff');
        this.addColumn('TEXT_DESCRIPTION', toolBox.COLUMN_TYPE_STRING, '');
        this.addColumn('TEXT_SIZE', toolBox.COLUMN_TYPE_NUMBER, 14);
        this.addColumn('TEXT_FONT', toolBox.COLUMN_TYPE_STRING, 'Arial');
        this.addColumn('TEXT_FILL_STYLE', toolBox.COLUMN_TYPE_STRING, '#000000');
        this.addColumn('BODY_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('MAXIMIZED_FLAG', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('X', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('Y', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('W', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('H', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('R', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('RESUME_X', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('RESUME_Y', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('RESUME_W', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('RESUME_H', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('INNER_OFFSET_X', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('INNER_OFFSET_Y', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('INNER_ZOOM', toolBox.COLUMN_TYPE_NUMBER);
        this.addColumn('IMAGE_URL', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('ZORDER_NEXT_LOWER_VIEW_ID', toolBox.COLUMN_TYPE_STRING);
        this.addColumn('ZORDER_NEXT_HIGHER_VIEW_ID', toolBox.COLUMN_TYPE_STRING);
        this.key = 'VIEW_ID';

        this.alive = true;
    }
});
