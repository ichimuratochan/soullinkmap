var MenuItem = function(){this.initialize.apply(this, arguments);}
MenuItem.prototype = toolBox.extend(new Shape(), {
    menuCommand         : null
,   menuCommandName     : ''
,   isMenuItem          : true
,   tag                 : null
,   highLightedStyle    : '#f5f5f5'
,   notHighLightedStyle : '#ffffff'
,   highLighted         : false
,   thisAndContainersWidthDiff  : 0
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'MenuItem';

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RECT;
        this.shapeFormat.strokeStyle = '#d3d3d3';
        this.shapeFormat.fillStyle = '#f5f5f5';
        this.shapeFormat.textFillStyle = '#000000';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_LEFT;
        this.shapeFormat.textSize = 12;
        this.shapeFormat.drawShadow = false;

        if (this.containerShape) {
            this.thisAndContainersWidthDiff = this.containerShape.w - this.w;
        }

        this.zoomable = true;

        this.alive = true;
    }
,   commandMouseOver: function() {
        this.changeMouseCursor();
        this.highLighted = true;
        for (var i=0;i<this.parentShape.childShapes.length;i++) {
            if (this.parentShape.childShapes[i].isMenuItem &&
                this.parentShape.childShapes[i] !== this) {
                this.parentShape.childShapes[i].highLighted = false;
            }
        }
        this.parentShape.registerDrawBuffer();
    }
,   commandDrop: function(_x, _y) {
        if (this.menuCommand) {
            this.menuCommand();
        }
    }
,   move: function(_moveX, _moveY) {
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.w = this.containerShape.w - this.thisAndContainersWidthDiff;
        this.saveCurrentDrawingPoints();
    }
,   commandDoubleHit: function(_x, _y) {
    }
,   prepareInnerDraw: function(_ctx) {
        if (this.isSelected()) {
            _ctx.strokeStyle = this.shapeFormat.selectedStrokeStyle;
        }
        else {
            _ctx.strokeStyle = this.shapeFormat.strokeStyle;
        }
        if (this.highLighted === true) {
            _ctx.fillStyle = this.highLightedStyle;
        }
        else {
            _ctx.fillStyle = this.notHighLightedStyle;
        }
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
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
,   setMenuCommand: function(_menuCommand, _menuCommandName) {
        this.menuCommand = _menuCommand;
        this.menuCommandName = _menuCommandName;
        this.text = _menuCommandName;
    }
});
