var LinkViewFormatAnimation = function(){this.initialize.apply(this, arguments);}
LinkViewFormatAnimation.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames       : 2
,   frameTerm       : 100
,   clearSelfRect   : false
,   callBackTarget  : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _callBackTarget, _x, _y, _w, _h) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'LinkViewFormatAnimation';
        this.r = 20;

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.strokeLineWidth = 5;
        this.shapeFormat.strokeStyle = '#FFFFFF';
        this.shapeFormat.fillStyle = '#b0c4de';
        this.shapeFormat.textFont = 'Tahoma';//'Century'; //'Colonna MT';
        this.shapeFormat.textSize = 50;
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textFillStyle = '#b0c4de';

        this.callBackTarget = _callBackTarget;

        this.text = translator.t('整形中...');

        this.alive = true;

    }
,   hit: function(_x, _y) {
        return true;
    }
,   drawAnimation: function(_ctx, _drawLastPos) {
/*
        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(_ctx);
        this.drawText(_ctx);
*/
    }
,   doClearSelfRect: function(_ctx, _drawLastPos) {
/*
        toolBox.setTempPos(this, true);
        _ctx.clearRect(
            toolBox.tempX - (this.shapeFormat.strokeLineWidth + 2),
            toolBox.tempY - (this.shapeFormat.strokeLineWidth + 2),
            toolBox.tempW + (this.shapeFormat.strokeLineWidth * 2 + 4),
            toolBox.tempH + (this.shapeFormat.strokeLineWidth * 2 + 4)
        );
*/
    }
,   animationDone: function() {
        if (this.callBackTarget) {
            this.callBackTarget.callBackFromLinkViewFormatAnimation();
        }
    }
});
