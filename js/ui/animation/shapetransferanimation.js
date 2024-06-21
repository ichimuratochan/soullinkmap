var ShapeTransferAnimation = function(){this.initialize.apply(this, arguments);}
ShapeTransferAnimation.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames           : 5
,   sourceRect          : null
,   destinationRect     : null
,   callBackTarget      : null
,   arg1                : null
,   arg2                : null
,   arg3                : null
,   arg4                : null
,   arg5                : null
,   isBorderLineOnly    : false
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _sourceRect, _destinationRect, _shapeFormat, _callBackTarget, _arg1, _arg2, _arg3, _arg4, _arg5, _maxFrames, _isBorderLineOnly) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _sourceRect.x, _sourceRect.y, _sourceRect.w, _sourceRect.h]);

        this.classType = 'ShapeTransferAnimation';

        this.sourceRect = _sourceRect;
        this.destinationRect = _destinationRect;
        this.shapeFormat = _shapeFormat;
        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;
        if (toolBox.isNullOrUndefined(_maxFrames) === false) {
            this.maxFrames = _maxFrames;
        }
        if (toolBox.isNullOrUndefined(_isBorderLineOnly) === false) {
            this.isBorderLineOnly = _isBorderLineOnly;
        }

        this.alive = true;

    }
,   drawAnimation: function(_ctx, _drawLastPos) {
        var ratio = 0;
        if (this.progress <= 0.5) {
            ratio = this.progress * this.progress;
        }
        else {
            ratio = 1 - ((1 - this.progress) * (1 - this.progress));
        }
        this.setActualX(this.sourceRect.x + ((this.destinationRect.x - this.sourceRect.x) * ratio));
        this.setActualY(this.sourceRect.y + ((this.destinationRect.y - this.sourceRect.y) * ratio));
        var x2 = this.sourceRect.x2 + ((this.destinationRect.x2 - this.sourceRect.x2) * ratio);
        var y2 = this.sourceRect.y2 + ((this.destinationRect.y2 - this.sourceRect.y2) * ratio);
        this.setActualW(x2 - this.currentActualX);
        this.setActualH(y2 - this.currentActualY);
        this.setActualR(this.sourceRect.r);
        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(_ctx);
        this.drawRect(_ctx);
    }
,   animationDone: function() {
        if (this.callBackTarget) {
            this.callBackTarget.callBackFromShapeTransferAnimation(this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        }
    }
});
