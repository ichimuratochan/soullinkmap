var AnimationBase = function(){this.initialize.apply(this, arguments);}
AnimationBase.prototype = toolBox.extend(new Shape(), {
    isAnimationShape        : true
,   clearSelfRect           : true
,   frameCounter            : 0
,   progress                : 0
,   maxFrames               : 100
,   framePerMilliSeconds    : 10
,   lastDrawnTime           : 0
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'AnimationBase';

    }
,   startAnimation: function() {
//        this.destroy();
        if (this.soulMaster.doAnimation === true) {
            this.addAnimationFrame();
        }
        else {
            this.destroy();
        }
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
    }
,   move: function() {
    }
,   select: function() {
    }
,   hit: function(_x, _y) {
        return false;
    }
,   animationDone: function() {
    }
,   destroy: function() {
        this.frameCounter = this.maxFrames;
        this.progress = 100;
        this.alive = false;
        this.innerDestroy();
        while (true) {
            if (this.childShapes.length > 0) {
                this.childShapes[0].destroy();
            }
            else {
                break;
            }
        }
        this.childShapes.length = 0;
        this.undockAllShapes();
        this.zOrder.destroy();
        if (this.parentShape) {
            if (this.parentShape.childShapes.length > 0) {
                this.parentShape.childShapes = toolBox.arrayWithout(this.parentShape.childShapes, this);
            }
//            this.parentShape.registerDrawBufferWithoutChildren();
        }
        this.animationDone();
    }
,   drawIsolatedShape: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        this.draw(null, _drawLastPos);
    }
,   draw: function(_ctx, _drawLastPos) {
logger.put('shape ' + this.id + ' draw ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        this.alreadyDrawn = true;
        if (this.alive === false) {
            toolBox.clean(this);
            return;
        }
        var currentTime = Number(new Date()) + 0;
        if (this.lastDrawnTime !== 0 && currentTime - this.lastDrawnTime < this.framePerMilliSeconds) {
            return;
        }
        this.frameCounter++;
        this.progress = this.frameCounter / this.maxFrames;
        if (this.isVisible() === true) {
            if (this.containerShape) {
                this.containerShape.startClip(this.getCtx(_ctx), _drawLastPos);
            }
            this.innerDraw(this.getCtx(_ctx), _drawLastPos);
            this.lastDrawnTime = Number(new Date()) + 0;
            if (this.containerShape) {
                this.containerShape.endClip(this.getCtx(_ctx));
            }
        }
        if (this.frameCounter === this.maxFrames) {
            var ctx = this.getCtx(_ctx);
            this.doClearSelfRect(ctx, _drawLastPos)
            this.destroy();
        }
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        if (this.clearSelfRect === true) {
            this.doClearSelfRect(ctx, _drawLastPos)
        }
        this.drawAnimation(ctx, _drawLastPos);
    }
,   doClearSelfRect: function(_ctx, _drawLastPos) {
        toolBox.setTempPos(this, true);
        _ctx.clearRect(
            toolBox.tempX - (this.shapeFormat.strokeLineWidth + 2),
            toolBox.tempY - (this.shapeFormat.strokeLineWidth + 2),
            toolBox.tempW + (this.shapeFormat.strokeLineWidth * 2 + 4),
            toolBox.tempH + (this.shapeFormat.strokeLineWidth * 2 + 4)
        );
    }
,   addAnimationFrame: function() {
        var success = false;
        if (this.alive === true) {
            success = true;
            this.ioJobController.registerDrawShape(this);
        }
        return success;
    }
,   drawAnimation: function(_ctx, _drawLastPos) {

        _ctx.strokeStyle = '#000000';
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
        toolBox.setTempPos(this, _drawLastPos);
        _ctx.strokeRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH);

        this.x += 1;
        this.y += 1;

    }
,   isGonnaBeTheLastFrame: function() {
        return ((this.frameCounter + 1) >= this.maxFrames);
    }
});
