var BreakTimeAnimation = function(){this.initialize.apply(this, arguments);}
BreakTimeAnimation.prototype = toolBox.extend(new AnimationBase(), {
    maxFrames               : 1200
,   clearSelfRect           : false
,   centerFireBall          : null
,   centerFireBallMaxSize   : 26
,   mainBranchW             : 100
,   mainBranchH             : 50
,   lastPoint               : null
,   dice                    : 0
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        AnimationBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'BreakTimeAnimation';

        this.shapeFormat.strokeLineWidth = 1;
        this.shapeFormat.strokeStyle = '#000000';
        this.shapeFormat.fillStyle = '#000000';

        this.centerFireBall = new Rect(this.x + (this.w / 2), this.y + (this.h / 2), 0, 0);
        this.lastPoint = new Rect(this.centerFireBall.x - (this.centerFireBallMaxSize / 2), this.centerFireBall.y - (this.centerFireBallMaxSize / 2), this.centerFireBall.x + (this.centerFireBallMaxSize / 2), this.centerFireBall.y + (this.centerFireBallMaxSize / 2));

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

        toolBox.setTempPos(this, _drawLastPos);
        _ctx.fillStyle = this.shapeFormat.fillStyle;
        _ctx.fillRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH);

        _ctx.fillStyle = this.shapeFormat.fillStyle;
        _ctx.fillRect(this.lastPoint.x, this.lastPoint.y, this.lastPoint.x2 - this.lastPoint.x, this.lastPoint.y2 - this.lastPoint.y);

        if (this.frameCounter >= this.maxFrames - 40) {
            this.centerFireBall.y *= 1.04;
            if (this.frameCounter === this.maxFrames - 40) {
                toolBox.setTempPos(this, _drawLastPos);
                this.lastPoint.y2 = toolBox.tempH - 20;
            }
        }

        if (this.centerFireBall.y + (this.centerFireBallMaxSize / 2) <= this.h - 30) {
            _ctx.beginPath();
            if (Math.random() > 0.2) {
                _ctx.fillStyle = '#FAFAD2';
            }
            else {
                _ctx.fillStyle = '#F0E68C';
            }
            var maxradius = this.centerFireBallMaxSize / 2;
            var radius = (maxradius - (maxradius / 5)) + (Math.floor(Math.random() * (maxradius / 5)));
            _ctx.arc(this.centerFireBall.x, this.centerFireBall.y, radius, 0, Math.PI * 2, false);
            _ctx.closePath();
            _ctx.fill();

            if (Math.random() > 0.8) {
                _ctx.strokeStyle = '#FA8072';
                _ctx.stroke();
            }
            
            if (Math.random() > 0.7) {
                _ctx.strokeStyle = '#FFFFE0';
            }
            else {
                _ctx.strokeStyle = '#FAFAD2';
            }
            if (this.frameCounter >= 100) {
                var mainBranchCount = Math.floor(Math.random() * 10) + 5;
                for (var i=1;i<=mainBranchCount;i++) {
                    var w = this.mainBranchW + Math.floor(Math.random() * this.mainBranchW * 2.5);
                    var h = this.mainBranchH + Math.floor(Math.random() * this.mainBranchH * 5);
                    var x = this.centerFireBall.x + (Math.floor(Math.random() * w) + 1 - w / 2);
                    var y = this.centerFireBall.y + (Math.floor(Math.random() * h) + 1 - h / 2.2);

                    if (this.frameCounter > toolBox.randomNumber(this.maxFrames - this.frameCounter)) {
                        _ctx.lineWidth = Math.floor(Math.random() * 2)
                        _ctx.beginPath();
                        _ctx.moveTo(this.centerFireBall.x, this.centerFireBall.y);
                        _ctx.lineTo(x, y);
                        _ctx.closePath();
                        _ctx.stroke();
                    }
                    
                    if (x < this.lastPoint.x) {
                        this.lastPoint.x = x;
                    }
                    if (y < this.lastPoint.y) {
                        this.lastPoint.y = y;
                    }
                    if (x > this.lastPoint.x2) {
                        this.lastPoint.x2 = x;
                    }
                    if (y > this.lastPoint.y2) {
                        this.lastPoint.y2 = y;
                    }
                    if (Math.random() >= 0.5) {
                        var maxradius = this.centerFireBallMaxSize / 2 / 4;
                        var radius = (maxradius - (maxradius / 5)) + (Math.floor(Math.random() * (maxradius / 5)));

                        if (this.frameCounter > toolBox.randomNumber(this.maxFrames - this.frameCounter)) {
                            _ctx.beginPath();
                            if (Math.random() > 0.9) {
                                _ctx.fillStyle = '#FFFFE0';
                            }
                            else {
                                _ctx.fillStyle = '#FAFAD2';
                            }
                            _ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                            _ctx.closePath();
                            _ctx.fill();
                        }
                        mainBranchCount = Math.floor(Math.random() * 5) + 5;
                        for (var j=1;j<=mainBranchCount;j++) {
                            var w2 = this.mainBranchW / 2 + Math.floor(Math.random() * this.mainBranchW * 2.25);
                            var h2 = this.mainBranchH / 2 + Math.floor(Math.random() * this.mainBranchH * 2.25);
                            var x2 = x + (Math.floor(Math.random() * w2) + 1 - w2 / 2);
                            var y2 = y + (Math.floor(Math.random() * h2) + 1 - h2 / 2.5);

                            if (this.frameCounter > toolBox.randomNumber(this.maxFrames - this.frameCounter)) {
                                _ctx.lineWidth = Math.floor(Math.random() * 2) + 1;
                                _ctx.beginPath();
                                _ctx.moveTo(x, y);
                                _ctx.lineTo(x2, y2);
                                _ctx.closePath();
                                _ctx.stroke();
                            }
                            if (x2 < this.lastPoint.x) {
                                this.lastPoint.x = x2;
                            }
                            if (y2 < this.lastPoint.y) {
                                this.lastPoint.y = y2;
                            }
                            if (x2 > this.lastPoint.x2) {
                                this.lastPoint.x2 = x2;
                            }
                            if (y2 > this.lastPoint.y2) {
                                this.lastPoint.y2 = y2;
                            }
                        }
                    }
                }
            }
        }

        if (this.frameCounter >= this.maxFrames - 350) {
            this.mainBranchW *= 0.985;
            this.mainBranchH *= 0.985;
        }
    }
});
