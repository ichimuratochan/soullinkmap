var EntityFormat = function(){this.initialize.apply(this, arguments);}
EntityFormat.prototype = toolBox.extend(new ShapeFormat(), {
    changed         : false
,   initialize: function() {
        ShapeFormat.prototype.initialize.apply(this);
        this.classType = 'EntityFormat';
    }
,   isChanged: function(_soulMaster) {
        var row = _soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(this.id);
        if (row === null) {
            this.changed = true;
        }
        else {
            if (this.shapeType !== row['SHAPE_TYPE'] ||
                this.strokeStyle !== row['STROKE_STYLE'] ||
                this.strokeLineWidth !== row['STROKE_LINE_WIDTH'] ||
                this.selectedStrokeLineWidth !== row['SELECTED_STROKE_LINE_WIDTH'] ||
                this.selectedStrokeStyle !== row['SELECTED_STROKE_STYLE'] ||
                this.drawShadow !== row['DRAW_SHADOW_FLAG'] === '1' ? true : false ||
                this.shadowStrokeLineWidth !== row['SHADOW_STROKE_LINE_WIDTH'] ||
                this.shadowStrokeStyle !== row['SHADOW_STROKE_STYLE'] ||
                this.fillStyle !== row['FILL_STYLE'] ||
                this.textDescription !== row['TEXT_DESCRIPTION'] ||
                this.textSize !== row['TEXT_SIZE'] ||
                this.textFont !== row['TEXT_FONT'] ||
                this.textBaseline !== row['TEXT_BASELINE'] ||
                this.textAlign !== row['TEXT_ALIGN'] ||
                this.textVerticalAlign !== row['TEXT_VERTICAL_ALIGN'] ||
                this.textFillStyle !== row['TEXT_FILL_STYLE']
            ) {
                this.changed = true;
            }
        }
        return this.changed;
    }
,   saveToData: function(_soulMaster) {
        var row = _soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(this.id);
        if (row === null) {
            _soulMaster.dataAccessAction.addBodyFormat(
                this.id,
                this.shapeType,
                this.strokeStyle,
                this.strokeLineWidth,
                this.selectedStrokeLineWidth,
                this.selectedStrokeStyle,
                this.drawShadow,
                this.shadowStrokeLineWidth,
                this.shadowStrokeStyle,
                this.fillStyle,
                this.textDescription,
                this.textSize,
                this.textFont,
                this.textBaseline,
                this.textAlign,
                this.textVerticalAlign,
                this.textFillStyle
            );
        }
        else {
            _soulMaster.dataAccessAction.updateBodyFormat(
                this.id,
                this.shapeType,
                this.strokeStyle,
                this.strokeLineWidth,
                this.selectedStrokeLineWidth,
                this.selectedStrokeStyle,
                this.drawShadow,
                this.shadowStrokeLineWidth,
                this.shadowStrokeStyle,
                this.fillStyle,
                this.textDescription,
                this.textSize,
                this.textFont,
                this.textBaseline,
                this.textAlign,
                this.textVerticalAlign,
                this.textFillStyle
            );
        }
        this.changed = false;
    }
,   loadFromBodyFormatRowData: function(_row) {
        this.id = _row['BODY_FORMAT_ID'];
        this.shapeType = _row['SHAPE_TYPE'];
        this.strokeStyle = _row['STROKE_STYLE'];
        this.strokeLineWidth = _row['STROKE_LINE_WIDTH'];
        this.selectedStrokeLineWidth = _row['SELECTED_STROKE_LINE_WIDTH'];
        this.selectedStrokeStyle = _row['SELECTED_STROKE_STYLE'];
        this.drawShadow = _row['DRAW_SHADOW_FLAG'] === '1' ? true : false;
        this.shadowStrokeLineWidth = _row['SHADOW_STROKE_LINE_WIDTH'];
        this.shadowStrokeStyle = _row['SHADOW_STROKE_STYLE'];
        this.fillStyle = _row['FILL_STYLE'];
        this.textDescription = _row['TEXT_DESCRIPTION'];
        this.textSize = _row['TEXT_SIZE'];
        this.textFont = _row['TEXT_FONT'];
        this.textBaseline = _row['TEXT_BASELINE'];
        this.textAlign = _row['TEXT_ALIGN'];
        this.textVerticalAlign = _row['TEXT_VERTICAL_ALIGN'];
        this.textFillStyle = _row['TEXT_FILL_STYLE'];
    }
});
