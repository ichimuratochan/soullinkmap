var ShapeBorder = function(){this.initialize.apply(this, arguments);}
ShapeBorder.prototype = toolBox.extend(new Shape(), {
    borderPosition  : 0
,   isShapeBorder   : true
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _borderPosition) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        this.borderPosition = _borderPosition;
        this.syncPositionWithParentShape(true);
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, this.x, this.y, this.w, this.h]);
        this.classType = 'ShapeBorder';

        this.shapeFormat.strokeStyle = '#FFFFFF';
        this.shapeFormat.drawShadow = false;

        this.alive = true;
    }
,   commandDoubleHit: function(_x, _y) {
        this.parentShape.commandDoubleHit(_x, _y);
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        if (this.borderPosition === toolBox.BORDER_POSITION_TOP) {
            this.x = toolBox.BORDER_SIZE;
            this.y = 0;
            this.w = this.parentShape.getInnerW() - toolBox.BORDER_SIZE * 2;
            this.h = toolBox.BORDER_SIZE;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_RIGHT_CORNER) {
            this.x = this.parentShape.getInnerW() - toolBox.BORDER_SIZE;
            this.y = 0;
            this.w = toolBox.BORDER_SIZE;
            this.h = toolBox.BORDER_SIZE;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_RIGHT) {
            this.x = this.parentShape.getInnerW() - toolBox.BORDER_SIZE;
            this.y = toolBox.BORDER_SIZE;
            this.w = toolBox.BORDER_SIZE;
            this.h = this.parentShape.getInnerH() - toolBox.BORDER_SIZE * 2;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_RIGHT_CORNER) {
            this.x = this.parentShape.getInnerW() - toolBox.BORDER_SIZE;
            this.y = this.parentShape.getInnerH() - toolBox.BORDER_SIZE;
            this.w = toolBox.BORDER_SIZE;
            this.h = toolBox.BORDER_SIZE;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM) {
            this.x = toolBox.BORDER_SIZE;
            this.y = this.parentShape.getInnerH() - toolBox.BORDER_SIZE;
            this.w = this.parentShape.getInnerW() - toolBox.BORDER_SIZE * 2;
            this.h = toolBox.BORDER_SIZE;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_LEFT_CORNER) {
            this.x = 0;
            this.y = this.parentShape.getInnerH() - toolBox.BORDER_SIZE;
            this.w = toolBox.BORDER_SIZE;
            this.h = toolBox.BORDER_SIZE;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_LEFT) {
            this.x = 0;
            this.y = toolBox.BORDER_SIZE;
            this.w = toolBox.BORDER_SIZE;
            this.h = this.parentShape.getInnerH() - toolBox.BORDER_SIZE * 2;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_LEFT_CORNER) {
            this.x = 0;
            this.y = 0;
            this.w = toolBox.BORDER_SIZE;
            this.h = toolBox.BORDER_SIZE;
        }
        this.saveCurrentDrawingPoints();
    }
,   changeMouseCursor: function() {
        if (this.parentShape.isMaximized && this.parentShape.isMaximized()) {
            return;
        }
        if (this.borderPosition === toolBox.BORDER_POSITION_TOP) {
            this.ioJobController.setMouseCursor('n-resize');
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_RIGHT_CORNER) {
            this.ioJobController.setMouseCursor('ne-resize');
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_RIGHT) {
            this.ioJobController.setMouseCursor('w-resize');
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_RIGHT_CORNER) {
            this.ioJobController.setMouseCursor('se-resize');
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM) {
            this.ioJobController.setMouseCursor('s-resize');
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_LEFT_CORNER) {
            this.ioJobController.setMouseCursor('sw-resize');
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_LEFT) {
            this.ioJobController.setMouseCursor('e-resize');
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_LEFT_CORNER) {
            this.ioJobController.setMouseCursor('nw-resize');
        }
    }
,   move: function(_moveX, _moveY) {
        if (this.parentShape.isResizable() === false) {
            return;
        }
        if (this.parentShape.fixedSize === true) {
            return;
        }
        var x = this.currentActualX + _moveX;
        var y = this.currentActualY + _moveY;
        if (this.borderPosition === toolBox.BORDER_POSITION_TOP) {
            this.setActualY(y);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_RIGHT_CORNER) {
            this.setActualX(x);
            this.setActualY(y);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_RIGHT) {
            this.setActualX(x);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_RIGHT_CORNER) {
            this.setActualX(x);
            this.setActualY(y);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM) {
            this.setActualY(y);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_LEFT_CORNER) {
            this.setActualX(x);
            this.setActualY(y);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_LEFT) {
            this.setActualX(x);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_LEFT_CORNER) {
            this.setActualX(x);
            this.setActualY(y);
        }
        this.resizeParent();
        this.parentShape.registerDrawBufferForResizableShape();
    }
,   resizeParent: function() {
        var x = this.parentShape.currentActualX;
        var y = this.parentShape.currentActualY;
        var w = this.parentShape.currentActualW;
        var h = this.parentShape.currentActualH;

        if (this.borderPosition === toolBox.BORDER_POSITION_TOP) {
            h += y - this.currentActualY;
            y = this.currentActualY;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_RIGHT_CORNER) {
            w = this.currentActualX2 - x;
            h += y - this.currentActualY;
            y = this.currentActualY;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_RIGHT) {
            w = this.currentActualX2 - x;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_RIGHT_CORNER) {
            w = this.currentActualX2 - x;
            h = this.currentActualY2 - y;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM) {
            h = this.currentActualY2 - y;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_LEFT_CORNER) {
            w += x - this.currentActualX;
            x = this.currentActualX;
            h = this.currentActualY2 - y;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_LEFT) {
            w += x - this.currentActualX;
            x = this.currentActualX;
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_LEFT_CORNER) {
            w += x - this.currentActualX;
            x = this.currentActualX;
            h += y - this.currentActualY;
            y = this.currentActualY;
        }

        if (!this.parentShape.tooSmallForActualSize(w, h) ||
           (w >= this.parentShape.currentActualW && h >= this.parentShape.currentActualH)
           ) {
            this.parentShape.setActualX(x);
            this.parentShape.setActualY(y);
            this.parentShape.setActualW(w);
            this.parentShape.setActualH(h);
            this.parentShape.syncDockedShapePosition(true);
        }

    }
,   innerDraw: function(_ctx, _drawLastPos) {
/*
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        ctx.save();
        ctx.beginPath();
        this.prepareInnerDraw(ctx);

        if (this.borderPosition === toolBox.BORDER_POSITION_TOP || this.borderPosition === toolBox.BORDER_POSITION_BOTTOM) {
            ctx.moveTo(toolBox.tempX, toolBox.tempY + (toolBox.tempH / 2));
            ctx.lineTo(toolBox.tempX + toolBox.tempW, toolBox.tempY + (toolBox.tempH / 2));
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_RIGHT || this.borderPosition === toolBox.BORDER_POSITION_LEFT) {
            ctx.moveTo(toolBox.tempX + (toolBox.tempW / 2), toolBox.tempY);
            ctx.lineTo(toolBox.tempX + (toolBox.tempW / 2), toolBox.tempY + toolBox.tempH);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_RIGHT_CORNER) {
            ctx.moveTo(toolBox.tempX, toolBox.tempY + (toolBox.tempH / 2));
            ctx.lineTo(toolBox.tempX + (toolBox.tempW / 2), toolBox.tempY + toolBox.tempH);
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_RIGHT_CORNER) {
            ctx.moveTo(toolBox.tempX + (toolBox.tempW / 2), toolBox.tempY);
            ctx.lineTo(toolBox.tempX, toolBox.tempY + (toolBox.tempH / 2));
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_BOTTOM_LEFT_CORNER) {
            ctx.moveTo(toolBox.tempX + (toolBox.tempW / 2), toolBox.tempY);
            ctx.lineTo(toolBox.tempX + toolBox.tempW, toolBox.tempY + (toolBox.tempH / 2));
        }
        else if (this.borderPosition === toolBox.BORDER_POSITION_TOP_LEFT_CORNER) {
            ctx.moveTo(toolBox.tempX + (toolBox.tempW / 2), toolBox.tempY + toolBox.tempH);
            ctx.lineTo(toolBox.tempX + toolBox.tempW, toolBox.tempY + (toolBox.tempH / 2));
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
*/
    }
,   fade: function(_ctx, _fadeLastPos) {
        this.parentShape.fade(_ctx, _fadeLastPos);
    }
,   addToArrayIfIsInRect: function(_array, _x, _y, _w, _h) {
    }
,   getEffectedShapes: function() {
        var effectedShapes = toolBox.arrayWithout(this.parentShape.childShapes, this);
        toolBox.addToArray(effectedShapes, this.parentShape);
        for (var i=0;i<this.parentShape.dockedShapeInfos.length;i++) {
            toolBox.addToArray(effectedShapes, this.parentShape.dockedShapeInfos[i].info1);
            for (var j=0;j<this.parentShape.dockedShapeInfos[i].info1.childShapes.length;j++) {
                toolBox.addToArray(effectedShapes, this.parentShape.dockedShapeInfos[i].info1.childShapes[j]);
            }
        }
        return effectedShapes;
    }
});
