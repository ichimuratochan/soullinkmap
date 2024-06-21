var ColorItem = function(){this.initialize.apply(this, arguments);}
ColorItem.prototype = toolBox.extend(new MenuItem(), {
    color : ''
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _color) {
        MenuItem.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'ColorItem';
        this.color = _color;
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT

        this.alive = true;
        this.registerDrawBuffer();
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.saveCurrentDrawingPoints();
    }
,   commandDoubleHit: function(_x, _y) {
        this.menuCommand();
        this.parentShape.save(); 
    }
,   prepareInnerDraw: function(_ctx) {
        if (this.isSelected()) {
            _ctx.strokeStyle = this.shapeFormat.selectedStrokeStyle;
        }
        else {
            _ctx.strokeStyle = this.shapeFormat.strokeStyle;
        }
        _ctx.fillStyle = this.color;
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
    }
,   setMenuCommand: function(_menuCommand, _menuCommandName) {
        this.menuCommand = _menuCommand;
        this.menuCommandName = _menuCommandName;
        this.text = ' ';
    }
});
