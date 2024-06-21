var ShapeDestructionAnimation = function(){this.initialize.apply(this, arguments);}
ShapeDestructionAnimation.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames               : 10
,   framePerMilliSeconds    : 50
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'ShapeDestructionAnimation';

        this.shapeFormat.strokeLineWidth = 1;
        this.shapeFormat.strokeStyle = '#000000';
        this.shapeFormat.fillStyle = '#FFFFFF';
        this.shapeFormat.textFillStyle = '#a9a9a9';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textSize = 80;
        this.shapeFormat.textFont = 'HGP行書体';

        this.alive = true;

    }
,   drawAnimation: function(_ctx, _drawLastPos) {
        if (this.containerShape.parentShape) {
            if (this.containerShape.parentShape !== this.containerShape.parentShape.zOrder.getTopShape()) {
                return;
            }
        }
        _ctx.save();

        _ctx.globalAlpha = (100 - (this.frameCounter * 10)) / 100;

        _ctx.strokeStyle = this.shapeFormat.strokeStyle;;
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
        toolBox.setTempPos(this, _drawLastPos);
        var span = Math.max(toolBox.tempW, toolBox.tempH) / 5;
        var shrinkSize = span / 5 * (this.frameCounter - 1) / 15;
        if (toolBox.tempW > toolBox.tempH) {
            for (var i=0;i<5;i++) {
                var j = 0;
                while (j * span < toolBox.tempH) {
                    var verticalSpan = span;
                    if (toolBox.tempH <= (span * (j + 1)) && toolBox.tempH >= (span * j)) {
                        verticalSpan = toolBox.tempH - (span * j);
                    }
                    verticalSpan -= (shrinkSize * 2);
                    if (verticalSpan < 1) {
                        verticalSpan = 1;
                    }
                    _ctx.strokeRect(toolBox.tempX + (span * i + shrinkSize), toolBox.tempY + (span * j + shrinkSize), span - (shrinkSize * 2), verticalSpan);
                    _ctx.fillStyle = this.shapeFormat.fillStyle;
                    _ctx.fillRect(toolBox.tempX + (span * i + shrinkSize), toolBox.tempY + (span * j + shrinkSize), span - (shrinkSize * 2), verticalSpan);
                    j++;
                }
            }
        }
        else {
            for (var i=0;i<5;i++) {
                var j = 0;
                while (j * span < toolBox.tempW) {
                    var horizontalSpan = span;
                    if (toolBox.tempW <= (span * (j + 1)) && toolBox.tempW >= (span * j)) {
                        horizontalSpan = toolBox.tempW - (span * j);
                    }
                    horizontalSpan -= (shrinkSize * 2);
                    if (horizontalSpan < 1) {
                        horizontalSpan = 1;
                    }
                    _ctx.strokeRect(toolBox.tempX + (span * j + shrinkSize), toolBox.tempY + (span * i + shrinkSize), horizontalSpan, span - (shrinkSize * 2));
                    _ctx.fillStyle = this.shapeFormat.fillStyle;
                    _ctx.fillRect(toolBox.tempX + (span * j + shrinkSize), toolBox.tempY + (span * i + shrinkSize), horizontalSpan, span - (shrinkSize * 2));
                    j++;
                }
            }
        }
        _ctx.restore();
    }
});
