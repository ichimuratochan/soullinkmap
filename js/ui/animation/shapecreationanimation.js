var ShapeCreationAnimation = function(){this.initialize.apply(this, arguments);}
ShapeCreationAnimation.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames               : 10
,   framePerMilliSeconds    : 20
,   targetRect              : null
,   callBackTarget      : null
,   arg1                : null
,   arg2                : null
,   arg3                : null
,   arg4                : null
,   arg5                : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _targetRect, _callBackTarget, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _targetRect.x, _targetRect.y, _targetRect.w, _targetRect.h]);

        this.classType = 'ShapeCreationAnimation';

        this.targetRect = _targetRect;

        this.shapeFormat.strokeLineWidth = 1;
        this.shapeFormat.fillStyle = '#ffffff';
        this.shapeFormat.strokeStyle = '#c0c0c0';

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        this.alive = true;

    }
/*
,   innerDestroy: function() {
        if (this.arg1) {
            this.arg1.visible = true;
            this.arg1.registerDrawBuffer();
        }
        if (this.arg2) {
            this.arg2.visible = true;
            this.arg2.registerDrawBuffer();
        }
    }
*/
,   animationDone: function() {
        if (this.arg1) {
            this.arg1.visible = true;
            this.arg1.registerDrawBuffer();
        }
        if (this.arg2) {
            this.arg2.visible = true;
            this.arg2.registerDrawBuffer();
        }
        if (this.callBackTarget) {
            this.callBackTarget.callBackFromShapeCreationAnimation(this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        }
    }
,   drawAnimation: function(_ctx, _drawLastPos) {
        _ctx.save();

        _ctx.globalAlpha = (100 - (this.frameCounter * 10)) / 100;

        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(_ctx);
        this.drawRect(_ctx);

        var shrinkSize = toolBox.tempH - (toolBox.tempH * 11 / 13);

        _ctx.strokeRect(
            toolBox.tempX + (shrinkSize - (shrinkSize * this.progress)),
            toolBox.tempY + (shrinkSize - (shrinkSize * this.progress)),
            toolBox.tempW - (shrinkSize - (shrinkSize * this.progress)) * 2,
            toolBox.tempH - (shrinkSize - (shrinkSize * this.progress)) * 2
        );

        _ctx.restore();

    }
});
