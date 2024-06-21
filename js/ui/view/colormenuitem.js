var ColorMenuItem = function(){this.initialize.apply(this, arguments);}
ColorMenuItem.prototype = toolBox.extend(new MenuItem(), {
    initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _color) {
        MenuItem.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'ColorMenuItem';

        this.shapeFormat.fillStyle = _color;

        this.zoomable = true;

        this.alive = true;
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(ctx);
        this.drawRect(ctx);
//        ctx.globalAlpha = 1;
        ctx.fillStyle = this.shapeFormat.fillStyle;
        ctx.fillRect(toolBox.tempX + 5, toolBox.tempY + 5, toolBox.tempW - 10, toolBox.tempH - 10);
        this.drawText(ctx);
    }
,   setMenuCommand: function(_menuCommand, _menuCommandName) {
        this.menuCommand = _menuCommand;
        this.menuCommandName = _menuCommandName;
        this.text = ' ';
    }
});
