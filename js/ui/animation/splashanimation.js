var SplashAnimation = function(){this.initialize.apply(this, arguments);}
SplashAnimation.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames       : 150
,   frameTerm       : 30
,   clearSelfRect   : true
,   globalAlpha     : 1
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'SplashAnimation';
        this.r = 20;

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.strokeLineWidth = 5;
        this.shapeFormat.strokeStyle = '#FFFFFF';
        this.shapeFormat.fillStyle = '#b0c4de';
        this.shapeFormat.textFont = 'Century';//'Tahoma'; //'Colonna MT';
        this.shapeFormat.textSize = 50;
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textFillStyle = '#b0c4de';

//        this.text = 'soullinkmap';
        this.text = 'Let there be change';

        this.alive = true;

    }
,   hit: function(_x, _y) {
        return false;
    }
,   drawAnimation: function(_ctx, _drawLastPos) {
        _ctx.save();

        if (this.frameCounter < this.frameTerm) {
            this.globalAlpha = this.frameCounter / this.frameTerm;
        }
        else if (this.frameCounter >= this.frameTerm && this.frameCounter < (this.maxFrames - this.frameTerm)) {
            this.globalAlpha = 1;
        }
        else {
            this.globalAlpha = (this.maxFrames - this.frameCounter) / this.frameTerm;
        }
        _ctx.globalAlpha = this.globalAlpha;

        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(_ctx);

        this.drawText(_ctx);

        _ctx.restore();

    }
});
