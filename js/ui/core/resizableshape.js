var ResizableShape = function(){this.initialize.apply(this, arguments);}
ResizableShape.prototype = toolBox.extend(new Shape(), {
    fixedSize       : false
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'ResizableShape';
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.strokeStyle = '#F4A460';
        this.shapeFormat.fillStyle = '#F5F5DC';
        this.shapeFormat.textFillStyle = '#000000';
        this.shapeFormat.textBaseline = 'middle';
    }
,   move: function(_moveX, _moveY) {
        this.setActualX(this.currentActualX + _moveX);
        this.setActualY(this.currentActualY + _moveY);
        this.registerDrawBufferForResizableShape();
        this.syncDockedShapePosition(true);
    }
,   onMoveToTop: function() {
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].classType === 'ShapeBorder') {
                return;
            }
        }
        var sb = null;
        for (var i=toolBox.BORDER_POSITION_TOP;i<=toolBox.BORDER_POSITION_TOP_LEFT_CORNER;i++) {
            sb = new ShapeBorder(this.containerShape, this, this.defaultLayer, i);
            sb.zoomable = this.zoomable;
        }
        this.syncDockedShapePosition(false);
    }
,   onDropFromTop: function() {
        var found = false;
        while (true) {
            found = false;
            for (var i=0;i<this.childShapes.length;i++) {
                if (this.childShapes[i].classType === 'ShapeBorder') {
                    found = true;
                    this.childShapes[i].destroy();
                    break;
                }
            }
            if (found === false) {
                break;
            }
        }
    }
,   registerDrawBufferForResizableShape: function() {
        this.ioJobController.registerDrawShape(this);
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isContainerShape) {
                this.childShapes[i].syncPositionWithParentShape(false);
            }
            else {
                this.childShapes[i].syncPositionWithParentShape(true);
            }
        }
    }
,   innerDrawIsolatedShape: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        this.innerDraw(_destinationLayer.ctx, _drawLastPos);
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isContainerShape) {
                this.childShapes[i].drawIsolatedShape(_sourceLayer, _destinationLayer, _drawLastPos);
            }
            else {
                this.childShapes[i].draw(_destinationLayer.ctx, _drawLastPos);
            }
        }
    }
});
