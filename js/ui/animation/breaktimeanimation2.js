var BreakTimeAnimation2 = function(){this.initialize.apply(this, arguments);}
BreakTimeAnimation2.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames       : 600
,   clearSelfRect   : false
,   balls           : null
,   ballCount       : 100
,   ball            : null
,   ballSize        : 40
,   globalAlpha     : 1
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'BreakTimeAnimation2';

        this.shapeFormat.strokeLineWidth = 1;
        this.shapeFormat.strokeStyle = '#FFFFFF';
        this.shapeFormat.fillStyle = '#FFFFFF';

        this.balls = new Array();
        for (var i=1;i<=this.ballCount;i++) {
            toolBox.addToArray(this.balls, new Rect(
                    toolBox.randomNumber(this.w),
                    -toolBox.randomNumber(300)+150,
                    toolBox.randomNumber(20) - 10,
                    15,
                    this.getNewColor()
                ));
        }

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

        //clear
//        _ctx.clearRect(this.x, this.y, this.w, this.h);
        for (var i=0;i<this.balls.length;i++) {
            this.ball = this.balls[i];
            _ctx.clearRect(this.ball.x3 - (this.ballSize / 2 + 2), this.ball.y3 - (this.ballSize / 2 + 2), this.ballSize + 2, this.ballSize + 2)
        }

        for (var i=0;i<this.balls.length;i++) {
            this.ball = this.balls[i];

            //new position
            this.ball.x += this.ball.x2;
            if (this.ball.x > this.w || this.ball.x < 0) {
                this.ball.x2 = -this.ball.x2;
                this.ball.x += (this.ball.x2 * 2);
            }

            this.ball.y2 += 0.3;
            this.ball.y += this.ball.y2;
            if (this.ball.y > this.h) {
                if (this.ball.y2 < 1) {
                    this.ball.x = toolBox.randomNumber(this.w);
                    this.ball.y = -toolBox.randomNumber(200);
                    this.ball.x2 = toolBox.randomNumber(20) - 10;
                    this.ball.y2 = 10;
                    this.ball.r = this.getNewColor();
                }
                else {
                    this.ball.y2 = -(this.ball.y2 - 3);
                }
            }

            //draw
            _ctx.beginPath();
            _ctx.fillStyle = this.ball.r;
            var radius = this.ballSize / 2;
            _ctx.arc(Math.floor(this.ball.x), Math.floor(this.ball.y), Math.floor(radius), 0, Math.floor(Math.PI * 2), false);
            _ctx.closePath();
            _ctx.fill();

            //save last position
            this.ball.x3 = this.ball.x;
            this.ball.y3 = this.ball.y;

        }

        if (this.frameCounter === this.maxFrames) {
            _ctx.restore();
        }
    }
,   getNewColor: function() {
        var a = toolBox.randomNumber(10);
        if (a === 1) {
            return '#F5F5DC';
        }
        else if (a === 2) {
            return '#87ceeb';
        }
        else if (a === 3) {
            return '#7fffd4';
        }
        else if (a === 4) {
            return '#ffc0cb';
        }
        else if (a === 5) {
            return '#ffff00';
        }
        else if (a === 6) {
            return '#0000ff';
        }
        else if (a === 7) {
            return '#ff0000';
        }
        else if (a === 8) {
            return '#008000';
        }
        else if (a === 9) {
            return '#ff69b4';
        }
        else if (a === 10) {
            return '#ffa500';
        }
    }
});
