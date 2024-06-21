var AppConfig = function(){this.initialize.apply(this, arguments);}
AppConfig.prototype = toolBox.extend(new Table(), {
    initialize: function(_dataBase) {
        Table.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'AppConfig';

        this.name = 'APP_CONFIG';

        this.addColumn('BACK_GROUND_TEXT', toolBox.COLUMN_TYPE_STRING, translator.t(toolBox.NEW_MAP_TEXT));
        this.addColumn('BACK_GROUND_INNER_OFFSET_X', toolBox.COLUMN_TYPE_NUMBER, 0);
        this.addColumn('BACK_GROUND_INNER_OFFSET_Y', toolBox.COLUMN_TYPE_NUMBER, 0);
        this.addColumn('BACK_GROUND_INNER_ZOOM', toolBox.COLUMN_TYPE_NUMBER, 1);
        this.addColumn('BACK_GROUND_IMAGE_URL', toolBox.COLUMN_TYPE_STRING, '');
        this.addColumn('BACK_GROUND_FORMAT_FILL_STYLE', toolBox.COLUMN_TYPE_STRING, '#f5f5f5');
        this.addColumn('BACK_GROUND_FORMAT_TEXT_ALIGN', toolBox.COLUMN_TYPE_STRING, toolBox.TEXT_ALIGN_LEFT);
        this.addColumn('BACK_GROUND_FORMAT_TEXT_VERTICAL_ALIGN', toolBox.COLUMN_TYPE_STRING, 'top');
        this.addColumn('BACK_GROUND_FORMAT_TEXT_DESCRIPTION', toolBox.COLUMN_TYPE_STRING, '');
        this.addColumn('BACK_GROUND_FORMAT_TEXT_SIZE', toolBox.COLUMN_TYPE_NUMBER, 25);
        this.addColumn('BACK_GROUND_FORMAT_TEXT_FONT', toolBox.COLUMN_TYPE_STRING, 'HG丸ｺﾞｼｯｸM-PRO');
        this.addColumn('BACK_GROUND_FORMAT_TEXT_FILL_STYLE', toolBox.COLUMN_TYPE_STRING, '#000000');
        this.addColumn('STANDARD_VIEW_FORMAT_FILL_STYLE', toolBox.COLUMN_TYPE_STRING, '#ffffff');
        this.addColumn('STANDARD_VIEW_FORMAT_TEXT_ALIGN', toolBox.COLUMN_TYPE_STRING, toolBox.TEXT_ALIGN_LEFT);
        this.addColumn('STANDARD_VIEW_FORMAT_TEXT_VERTICAL_ALIGN', toolBox.COLUMN_TYPE_STRING, 'top');
        this.addColumn('STANDARD_VIEW_FORMAT_TEXT_DESCRIPTION', toolBox.COLUMN_TYPE_STRING, '');
        this.addColumn('STANDARD_VIEW_FORMAT_TEXT_SIZE', toolBox.COLUMN_TYPE_NUMBER, 14);
        this.addColumn('STANDARD_VIEW_FORMAT_TEXT_FONT', toolBox.COLUMN_TYPE_STRING, 'Arial');
        this.addColumn('STANDARD_VIEW_FORMAT_TEXT_FILL_STYLE', toolBox.COLUMN_TYPE_STRING, '#000000');
        this.addColumn('STANDARD_VIEW_IMAGE_URL', toolBox.COLUMN_TYPE_STRING, '');

        this.key = 'BACK_GROUND_TEXT';

        this.alive = true;
    }
,   loadDataFromSerializedText: function(_text) {
        var text = toolBox.substringTextBetweenStartAndEnd(_text, toolBox.SERIALIZE_TAG_ROWS, toolBox.SERIALIZE_TAG_ROWS_END);
        var rowText = '';
        var row = null;
        var value = '';
        rowText = toolBox.substringTextBetweenStartAndEnd(text, toolBox.SERIALIZE_TAG_ROW, toolBox.SERIALIZE_TAG_ROW_END);
        row = this.newRow();
        for (var i=0;i<this.columns.length;i++) {
            if (rowText.indexOf('<' + this.columns[i] + '>') === -1) {
                value = this.defaultValues[i];
            }
            else {
                value = toolBox.substringTextBetweenStartAndEnd(rowText, '<' + this.columns[i] + '>', '</' + this.columns[i] + '>');
            }
            if (this.columnTypes[i] === toolBox.COLUMN_TYPE_NUMBER) {
                row[this.columns[i]] = Number(value);
            }
            else {
                row[this.columns[i]] = value;
            }
        }
        toolBox.addToArray(this.rows, row);
    }
});
