var Button = function(){this.initialize.apply(this, arguments);}
Button.prototype = toolBox.extend(new Shape(), {
    tag                             : ''
,   clickCommand                    : null
,   thisXAndparentsWidthDiff        : 0
,   thisYAndparentsHeightDiff       : 0
,   syncPositionWithParentWidth     : false
,   syncPositionWithParentHeight    : false
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'Button';

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RECT;
        this.shapeFormat.strokeStyle = '#d3d3d3';
        this.shapeFormat.fillStyle = '#f5f5f5';
        this.shapeFormat.textFillStyle = '#000000';
//        this.shapeFormat.textFillStyle = '#e6e6fa';
//        this.shapeFormat.fillStyle = '#696969';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.drawShadow = false;

        if (this.parentShape) {
            this.thisXAndparentsWidthDiff = this.parentShape.w - this.x;
            this.thisXAndparentsHeightDiff = this.parentShape.h - this.y;
            this.globalAlpha = this.parentShape.globalAlpha;
        }

        this.zoomable = true;

        this.alive = true;
//        this.registerDrawBuffer();
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        if (this.syncPositionWithParentWidth === true) {
            this.x = this.parentShape.w - this.thisXAndparentsWidthDiff;
        }
        if (this.syncPositionWithParentHeight === true) {
            this.y = this.parentShape.h - this.thisXAndparentsHeightDiff;
        }
        this.saveCurrentDrawingPoints();
    }
,   commandDrop: function(_x, _y) {
        if (this.clickCommand) {
            this.clickCommand();
        }
    }
,   move: function(_moveX, _moveY) {
    }
,   commandDoubleHit: function(_x, _y) {
    }
,   setClickCommand: function(_clickCommand) {
        this.clickCommand = _clickCommand;
    }
});
