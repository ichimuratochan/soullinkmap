var RangeSelectionShape = function(){this.initialize.apply(this, arguments);}
RangeSelectionShape.prototype = toolBox.extend(new Shape(), {
    isRangeSelectionShape    : true
,   selectionStartX     : 0
,   selectionStartY     : 0
,   selectionEndX       : 0
,   selectionEndY       : 0
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, 0, 0, _parentShape.backGroundShape.currentActualW, _parentShape.backGroundShape.currentActualH]);
        this.classType = 'RangeSelectionShape';
        this.strokeStyle = toolBox.SELECTED_SHAPE_COLOR;
        this.alive = true;
    }
,   changeMouseCursor: function() {
        this.ioJobController.setMouseCursor('default');
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.saveCurrentDrawingPoints();
    }
,   select: function(_x, _y, _multiSelect) {
        this.backGroundShape.clearSelectedShapes();
        this.backGroundShape.addSelectedShape(this);
        this.backGroundShape.registerSelectedShapesToDrawBuffer();
        this.selectionStartX = _x;
        this.selectionStartY = _y;
        this.selectionEndX = _x;
        this.selectionEndY = _y;
    }
,   move: function(_moveX, _moveY) {
        this.selectionEndX += _moveX;
        this.selectionEndY += _moveY;
        this.registerDrawBufferWithoutChildren();
    }
,   commandDrop: function(_x, _y) {
        var x = Math.min(this.selectionStartX, this.selectionEndX);
        var y = Math.min(this.selectionStartY, this.selectionEndY);
        var w = Math.max(this.selectionStartX, this.selectionEndX) - Math.min(this.selectionStartX, this.selectionEndX);
        var h = Math.max(this.selectionStartY, this.selectionEndY) - Math.min(this.selectionStartY, this.selectionEndY);
        this.soulMaster.mainAction.endRangeSelection(x, y, w, h);
        this.destroy();
    }
,   draw: function(_ctx, _drawLastPos) {
logger.put('rangeselection ' + this.id + ' draw ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        this.alreadyDrawn = true;
        if (this.alive === false) {
//            toolBox.clean(this);
            return;
        }
    }
,   drawIsolatedShape: function(_ctx, _drawLastPos) {
logger.put('rangeselection ' + this.id + ' draw ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        this.alreadyDrawn = true;
        if (this.alive === false) {
//            toolBox.clean(this);
            return;
        }
        var ctx = this.getCtx(_ctx);
        ctx.strokeStyle = this.strokeStyle;
        var x = Math.min(this.selectionStartX, this.selectionEndX);
        var y = Math.min(this.selectionStartY, this.selectionEndY);
        var w = Math.max(this.selectionStartX, this.selectionEndX) - Math.min(this.selectionStartX, this.selectionEndX);
        var h = Math.max(this.selectionStartY, this.selectionEndY) - Math.min(this.selectionStartY, this.selectionEndY);
        ctx.strokeRect(x, y, w, h);
    }
,   getCtx: function(_ctx) {
        return this.defaultLayer.ctx;
    }
});
