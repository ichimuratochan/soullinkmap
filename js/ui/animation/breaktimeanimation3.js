var BreakTimeAnimation3 = function(){this.initialize.apply(this, arguments);}
BreakTimeAnimation3.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames       : 300
,   clearSelfRect   : true
,   dice1Number     : 0
,   dice2Number     : 0
,   dice3Number     : 0
,   diceRollSpeed   : 1
,   globalAlpha     : 1
,   initialize: function(_containerShape, _parentShape, _defaultLayer) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        
        this.x = (this.parentShape.w / 2) - 75;
        this.y = (this.parentShape.h / 2) - 75;
        this.w = 150;
        this.h = 150;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, this.x, this.y, this.w, this.h]);

        this.classType = 'BreakTimeAnimation3';

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.strokeLineWidth = 3;
        this.shapeFormat.strokeStyle = '#000000';
        this.shapeFormat.fillStyle = '#FFFFFF';
        if (translator.language === 'Japanese') {
            this.shapeFormat.textFont = 'HG行書体';
        }
        else {
            this.shapeFormat.textFont = 'Impact';
        }
        this.shapeFormat.textSize = 80;
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.textVerticalAlign = 'middle';
        
        this.alive = true;

    }
,   hit: function(_x, _y) {
        return true;
    }
,   animationDone: function() {
        this.parentShape.soulMaster.actionInProgress = false;
        this.parentShape.soulMaster.animation = null;
    }
,   drawAnimation: function(_ctx, _drawLastPos) {
        if (this.frameCounter === 1) {
            _ctx.save();
        }

        //最後のフェードアウト
        if (this.frameCounter > this.maxFrames - 20) {
            this.globalAlpha -= 0.05;
            if (this.globalAlpha < 0) {
                this.globalAlpha = 0;
            }
            _ctx.globalAlpha = this.globalAlpha;
        }
        
        if (this.frameCounter <= 180) {
            if (this.frameCounter >= this.diceRollSpeed) {
                this.diceRollSpeed *= 1.2;
                this.dice1Number = toolBox.randomNumber(6);
                this.dice2Number = toolBox.randomNumber(6);
                this.dice3Number = toolBox.randomNumber(6);
            }
        }
        else if (this.frameCounter === 210) {
            this.x = (this.parentShape.w / 2) - 104;
            this.y = (this.parentShape.h / 2) - 104;
            this.w = 208;
            this.h = 208;
            this.shapeFormat.textSize = 120;
        }
        else if (this.frameCounter > 210) {
            this.x = (this.parentShape.w / 2) - 100;
            this.y = (this.parentShape.h / 2) - 100;
            this.w = 200;
            this.h = 200;
            this.shapeFormat.textSize = 110;
        }
        if (translator.language === 'Japanese') {
            if (this.dice1Number === 1) {
                this.text = '大\n吉';
            }
            else if (this.dice1Number === 2 || this.dice1Number === 3) {
                this.text = '中\n吉';
            }
            else if (this.dice1Number === 4 || this.dice1Number === 5) {
                this.text = '小\n吉';
            }
            else if (this.dice1Number === 5) {
                this.text = '凶';
            }
        }
        else {
            this.text = toolBox.trim(this.dice1Number + '') + toolBox.trim(this.dice2Number + '') + toolBox.trim(this.dice3Number + '');
        }
        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(_ctx);
        this.drawRect(_ctx);
        this.drawText(_ctx);

        if (this.frameCounter === this.maxFrames) {
            _ctx.restore();
        }
    }
});
