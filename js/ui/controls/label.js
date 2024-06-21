var Label = function(){this.initialize.apply(this, arguments);}
Label.prototype = toolBox.extend(new Button(), {
    showBackGroundColor : false
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _text) {
        Button.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'Label';
        this.r = 0;

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.strokeStyle = '#dcdcdc';
        this.shapeFormat.fillStyle = '#dcdcdc';
        this.shapeFormat.textFillStyle = '#000000';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_LEFT;
        this.shapeFormat.textSize = 12;
        this.shapeFormat.drawShadow = false;
        this.text = _text;
        this.r = 5;

        this.zoomable = false;

        this.alive = true;
//        this.registerDrawBuffer();
    }
,   commandDrop: function(_x, _y) {
    }
,   move: function(_moveX, _moveY) {
    }
,   hit: function(_x, _y) {
        return false;
    }
,   commandDoubleHit: function(_x, _y) {
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        if (this.showBackGroundColor === true) {
            _ctx.strokeStyle = this.shapeFormat.strokeStyle;
            _ctx.fillStyle = this.shapeFormat.fillStyle;
            _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
            this.drawRect(ctx);
        }
        this.drawText(ctx);
    }
});
