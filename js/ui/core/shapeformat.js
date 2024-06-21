var ShapeFormat = function(){this.initialize.apply(this, arguments);}
ShapeFormat.prototype = toolBox.extend(new BaseObject(), {
    textDescription         : ''
,   textSize                : 14
,   textFont                : 'Arial' //'Rockwell'
,   textBaseline            : 'top'
,   textAlign               : toolBox.TEXT_ALIGN_CENTER
,   textVerticalAlign       : 'top'
,   strokeStyle             : '#ffffff'
,   strokeLineWidth         : 1
,   selectedStrokeLineWidth : 3
,   selectedStrokeStyle     : toolBox.SELECTED_SHAPE_COLOR
,   drawShadow              : true
,   shadowStrokeLineWidth   : 1
,   shadowStrokeStyle       : toolBox.SHADOW_COLOR
,   fillStyle               : '#e6e6fa'
,   textFillStyle           : '#000000'
,   shapeType               : toolBox.SHAPE_TYPE_RECT
,   initialize: function() {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'ShapeFormat';
    }
,   getFont: function(_zoom) {
        if (!_zoom) {
            _zoom = 1;
        }
        return this.textDescription + ' ' + (this.textSize * _zoom) + 'px ' + this.textFont;
    }
,   copyFrom: function(_shapeFormat) {
        this.textDescription = _shapeFormat.textDescription;
        this.textSize = _shapeFormat.textSize;
        this.textFont = _shapeFormat.textFont;
        this.textBaseline = _shapeFormat.textBaseline;
        this.textAlign = _shapeFormat.textAlign;
        this.textVerticalAlign = _shapeFormat.textVerticalAlign;
        this.strokeStyle = _shapeFormat.strokeStyle;
        this.strokeLineWidth = _shapeFormat.strokeLineWidth;
        this.selectedStrokeLineWidth = _shapeFormat.selectedStrokeLineWidth;
        this.selectedStrokeStyle = _shapeFormat.selectedStrokeStyle;
        this.drawShadow = _shapeFormat.drawShadow;
        this.shadowStrokeLineWidth = _shapeFormat.shadowStrokeLineWidth;
        this.shadowStrokeStyle = _shapeFormat.shadowStrokeStyle;
        this.fillStyle = _shapeFormat.fillStyle;
        this.textFillStyle = _shapeFormat.textFillStyle;
        this.shapeType = _shapeFormat.shapeType;
    }
});
