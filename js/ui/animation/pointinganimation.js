var PointingAnimation = function(){this.initialize.apply(this, arguments);}
PointingAnimation.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames               : 5
,   framePerMilliSeconds    : 20
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, 100, 100]);
        this.classType = 'PointingAnimation';

        this.shapeFormat.strokeLineWidth = 4;
        this.shapeFormat.strokeStyle = '#e0ffff';

        this.alive = true;

    }
,   drawAnimation: function(_ctx, _drawLastPos) {
        _ctx.save();

        _ctx.globalAlpha = (100 - (this.frameCounter * 20)) / 100;

        toolBox.setTempPos(this, _drawLastPos);
        _ctx.strokeStyle = this.shapeFormat.strokeStyle;
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
        for (var i=1;i<=this.maxFrames;i++) {
            if (this.frameCounter >= i) {
                _ctx.beginPath();
                _ctx.arc(toolBox.tempX, toolBox.tempY, i * 7, 0, Math.PI*2, false);
                _ctx.closePath();
                _ctx.stroke();
            }
        }
        _ctx.strokeStyle = '#20b2aa';
        _ctx.lineWidth = 2;
        for (var i=1;i<=this.maxFrames;i++) {
            if (this.frameCounter >= i) {
                _ctx.beginPath();
                _ctx.arc(toolBox.tempX, toolBox.tempY, i * 7, 0, Math.PI*2, false);
                _ctx.closePath();
                _ctx.stroke();
            }
        }

        _ctx.restore();

    }
,   doClearSelfRect: function(_ctx, _drawLastPos) {
        toolBox.setTempPos(this, true);
        _ctx.clearRect(
            (toolBox.tempX - (toolBox.tempW / 2)) - (this.shapeFormat.strokeLineWidth + 2),
            (toolBox.tempY - (toolBox.tempH / 2)) - (this.shapeFormat.strokeLineWidth + 2),
            toolBox.tempW + (this.shapeFormat.strokeLineWidth * 2 + 4),
            toolBox.tempH + (this.shapeFormat.strokeLineWidth * 2 + 4)
        );
    }
});
