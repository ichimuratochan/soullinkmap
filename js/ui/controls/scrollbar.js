var ScrollBar = function(){this.initialize.apply(this, arguments);}
ScrollBar.prototype = toolBox.extend(new Shape(), {
    scrollType              : 0
,   targetContainerShape    : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _targetContainerShape, _scrollType) {
        this.parentShape = _parentShape;
        this.targetContainerShape = _targetContainerShape;
        this.scrollType = _scrollType;
        this.syncPositionWithParentShape(true);
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, this.x, this.y, this.w, this.h]);
        this.classType = 'ScrollBar';

        this.shapeFormat.fillStyle = '#ffffff';
        this.shapeFormat.strokeStyle = '#d3d3d3';
        this.shapeFormat.drawShadow = false;

        this.alive = true;
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        if (this.scrollType === toolBox.SCROLL_TYPE_VERTICAL) {
            this.x = this.targetContainerShape.x + this.targetContainerShape.w;
            this.y = this.targetContainerShape.y;
            this.w = toolBox.SCROLL_BAR_WIDTH;
            this.h = this.targetContainerShape.h;
        }
        else if (this.scrollType === toolBox.SCROLL_TYPE_HORIZONTAL) {
            this.x = this.targetContainerShape.x;
            this.y = this.targetContainerShape.y + this.targetContainerShape.h;
            this.w = this.targetContainerShape.w;
            this.h = toolBox.SCROLL_BAR_WIDTH;
        }
        else if (this.scrollType === toolBox.SCROLL_TYPE_RESET) {
            this.x = this.targetContainerShape.x + this.targetContainerShape.w;
            this.y = this.targetContainerShape.y + this.targetContainerShape.h;
            this.w = toolBox.SCROLL_BAR_WIDTH;
            this.h = toolBox.SCROLL_BAR_WIDTH;
        }
        this.saveCurrentDrawingPoints();
    }
,   move: function() {
    }
,   changeMouseCursor: function() {
        this.ioJobController.setMouseCursor('default');
    }
,   commandDrop: function(_x, _y) {
        if (this.scrollType === toolBox.SCROLL_TYPE_VERTICAL) {
            var p = 0;
            if (_y > this.currentActualY + this.currentActualH) {
                p = 1;
            }
            else if (_y < this.currentActualY) {
                p = 0;
            }
            else {
                p = (_y  - this.currentActualY) / this.currentActualH;
            }
            this.targetContainerShape.moveInsideVertically(p);
        }
        else if (this.scrollType === toolBox.SCROLL_TYPE_HORIZONTAL) {
            var p = 0;
            if (_x > this.currentActualX + this.currentActualW) {
                p = 1;
            }
            else if (_x < this.currentActualX) {
                p = 0;
            }
            else {
                p = (_x - this.currentActualX) / this.currentActualW;
            }
            this.targetContainerShape.moveInsideHorizontally(p);
        }
        else if (this.scrollType === toolBox.SCROLL_TYPE_RESET) {
            this.targetContainerShape.moveAndZoomToViewAll();
        }
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(ctx);
        this.drawRect(ctx);

        ctx.fillStyle = '#000000';
        var pointWidth = 10 * this.getParentZoom();
        if (this.scrollType === toolBox.SCROLL_TYPE_VERTICAL) {
            var p = this.targetContainerShape.getVerticalPositionInPercentile();
            if (p >= 0) {
                ctx.fillRect(toolBox.tempX, toolBox.tempY + ((toolBox.tempH - pointWidth) * p), toolBox.tempW, pointWidth);
            }
        }
        else if (this.scrollType === toolBox.SCROLL_TYPE_HORIZONTAL) {
            var p = this.targetContainerShape.getHorizontalPositionInPercentile();
            if (p >= 0) {
                ctx.fillRect(toolBox.tempX + ((toolBox.tempW - pointWidth) * p), toolBox.tempY, pointWidth, toolBox.tempH);
            }
        }
    }
,   addToArrayIfIsInRect: function(_array, _x, _y, _w, _h) {
    }
,   getEffectedShapes: function() {
        if (this.parentShape) {
            var effectedShapes = toolBox.arrayWithout(this.parentShape.childShapes, this);
            toolBox.addToArray(effectedShapes, this.parentShape);
            return effectedShapes;
        }
        else {
            return new Array();
        }
    }
});
