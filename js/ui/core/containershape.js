var ContainerShape = function(){this.initialize.apply(this, arguments);}
ContainerShape.prototype = toolBox.extend(new Shape(), {
    isContainerShape    : true
,   savedInnerOffsetX   : 0
,   savedInnerOffsetY   : 0
,   savedInnerZoom      : 1
,   wDiff               : 0
,   hDiff               : 0
,   tempLayer           : null
,   verticallyScrollable    : true
,   horizontallyScrollable  : true
,   fixedChildrensZOrder    : false
,   initialize: function(_containerShape, _parentShape, _tempLayer, _defaultLayer, _x, _y, _w, _h) {
        this.tempLayer = _tempLayer;
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        if (this.parentShape) {
            this.wDiff = this.parentShape.w - this.w;
            this.hDiff = this.parentShape.h - this.h;
        }
        this.zoomable = true;
        this.saveInnerOffsetAndZoom();
        this.classType  = 'ContainerShape';
        this.shapeFormat.fillStyle = '#e6e6fa';
        this.shapeFormat.textFillStyle = '#000000';
        this.shapeFormat.textBaseline = 'top';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_LEFT;
        this.shapeFormat.drawShadow = false;
    }
,   changeMouseCursor: function() {
        this.ioJobController.setMouseCursor('move');
    }
,   zoomIn: function(_x, _y) {
        if (this.zoomable === false) {
            return;
        }
        if (this.isSelected() === false) {
            this.select(0, 0, false);
        }
        var currentInnerZoom = this.innerZoom;
        this.innerZoom *= 1.05;
        var zoomDiff = this.innerZoom / currentInnerZoom;
        //ズームしながらマウス選択位置に向かっていくように座標調整
        this.setActualInnerOffsetX(
            this.getActualInnerOffsetX() -
            (
                ((this.currentActualW * zoomDiff) - this.currentActualW) * ((_x - this.currentActualX) / this.currentActualW)
            )
        );
        this.setActualInnerOffsetY(
            this.getActualInnerOffsetY() -
            (
                ((this.currentActualH * zoomDiff) - this.currentActualH) * ((_y - this.currentActualY) / this.currentActualH)
            )
        );
        this.registerDrawBufferWithoutChildren();
        this.afterZoomIn();
    }
,   afterZoomIn: function() {
    }
,   zoomOut: function(_x, _y) {
        if (this.zoomable === false) {
            return;
        }
        if (this.isSelected() === false) {
            this.select(0, 0, false);
        }
        var currentInnerZoom = this.innerZoom;
        this.innerZoom *= 0.95;
/*
        if (toolBox.isFireFox === true) {
            if (this.innerZoom < 0.2) {
                this.innerZoom = 0.2;
            }
        }
        else {
*/
            if (this.innerZoom < 0.03) {
                this.innerZoom = 0.03;
            }
//        }
        var zoomDiff = this.innerZoom / currentInnerZoom;
        //ズームしながらマウス選択位置に向かっていくように座標調整
        this.setActualInnerOffsetX(
            this.getActualInnerOffsetX() +
            (
                (this.currentActualW - (this.currentActualW * zoomDiff)) * ((_x - this.currentActualX) / this.currentActualW)
            )
        );
        this.setActualInnerOffsetY(
            this.getActualInnerOffsetY() +
            (
                (this.currentActualH - (this.currentActualH * zoomDiff)) * ((_y - this.currentActualY) / this.currentActualH)
            )
        );
        this.registerDrawBufferWithoutChildren();
        this.afterZoomOut();
    }
,   afterZoomOut: function() {
    }
,   move: function(_moveX, _moveY) {
        if (this.horizontallyScrollable === true || this.verticallyScrollable === true) {
            if (this.horizontallyScrollable === true) {
                this.setActualInnerOffsetX(this.getActualInnerOffsetX() + _moveX);
            }
            if (this.verticallyScrollable === true) {
                this.setActualInnerOffsetY(this.getActualInnerOffsetY() + _moveY);
            }
            this.registerDrawBufferWithoutChildren();
        }
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.w = this.parentShape.w - this.wDiff;
        this.h = this.parentShape.h - this.hDiff;
        this.saveCurrentDrawingPoints();
        if (_syncRecursive === true) {
            for (var i=0;i<this.childShapes.length;i++) {
                this.childShapes[i].syncPositionWithParentShape(_syncRecursive);
            }
        }
    }
,   draw: function(_ctx, _drawLastPos) {
logger.put('cont ' + this.id + ' draw ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        this.alreadyDrawn = true;
        if (this.alive === false) {
            toolBox.clean(this);
            return;
        }
        if (this.isVisible() === true) {
            var zOrderSortedShapes = new Array();
            this.zOrderSort(this.childShapes, zOrderSortedShapes);
            //コンテナ自信はデフォルトレイヤに描画
            var ctx = this.getCtx(_ctx);
            this.innerDraw(ctx, _drawLastPos);
            //子供Shapeは一時レイヤに描画後、一時レイヤから元イメージを切り出して描画用レイヤに画像描画
            this.tempLayer.clear();
            for (var i=0;i<zOrderSortedShapes.length;i++) {
                zOrderSortedShapes[i].draw(this.tempLayer.ctx, _drawLastPos);  ////一時コンテキストに描画
            }
            var ctxForChildShapes = null;
            //自分（コンテナ）がBackGroundShape上で最も手前のzOrderならば自分（コンテナ）内の子Shapeは
            //selectedShapeLayerに描画  ※コンテナ内画像移動モードに即入れるようにするため
            if (this.parentShape === this.parentShape.zOrder.getTopShape()) {
                ctxForChildShapes = this.backGroundShape.selectedShapeLayer.ctx;
            }
            else {
                ctxForChildShapes = ctx;
            }
            this.startClip(ctxForChildShapes, _drawLastPos);
            toolBox.setTempPos(this, _drawLastPos);
            this.tempLayer.ctx.clearRect(0, 0, toolBox.tempX, this.tempLayer.height);
            this.tempLayer.ctx.clearRect(toolBox.tempX, 0, toolBox.tempW, toolBox.tempY);
            this.tempLayer.ctx.clearRect(toolBox.tempX, toolBox.tempY2, toolBox.tempW, this.tempLayer.height - toolBox.tempY2);
            this.tempLayer.ctx.clearRect(toolBox.tempX2, 0, this.tempLayer.width - toolBox.tempX2, this.tempLayer.height);
            ctxForChildShapes.drawImage(this.tempLayer, 0, 0);
            this.endClip(ctxForChildShapes);
        }
    }
,   draw2: function(_ctx) {
logger.put('cont ' + this.id + ' draw2 ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        var zOrderSortedShapes = new Array();
        this.zOrderSort(this.childShapes, zOrderSortedShapes);
//        this.innerDraw(_ctx, false);
        for (var i=0;i<zOrderSortedShapes.length;i++) {
            zOrderSortedShapes[i].draw2(_ctx);
        }
    }
,   drawContainerWithImage: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        //まずコンテナ描画
        this.innerDraw(_destinationLayer.ctx, _drawLastPos);
        var zoomDiff = this.innerZoom / this.savedInnerZoom;
        var moveImageX = (this.innerOffsetX - this.savedInnerOffsetX);
        var moveImageY = (this.innerOffsetY - this.savedInnerOffsetY);
        //一時レイヤクリア
        this.tempLayer.clear();
        //コンテナ領域を一時レイヤにコピー
        this.tempLayer.ctx.drawImage(_sourceLayer, - this.savedActualX, - this.savedActualY);
        this.tempLayer.ctx.clearRect(this.savedActualW, 0, this.tempLayer.width - this.savedActualW, this.tempLayer.height);
        this.tempLayer.ctx.clearRect(0, this.savedActualH, this.savedActualW, this.tempLayer.height - this.savedActualH);
        //描画領域クリッピング開始
        this.startClip(_destinationLayer.ctx, _drawLastPos)
        //一時レイヤから描画レイヤにdrawImageでコピー（putImageData/getImageDataではクリッピングできないため）
        _destinationLayer.ctx.drawImage(
            this.tempLayer,
            this.currentActualX + (moveImageX * this.getActualZoom()),
            this.currentActualY + (moveImageY * this.getActualZoom()),
            this.tempLayer.width * zoomDiff,
            this.tempLayer.height * zoomDiff
        );

        //描画領域クリッピング終了
        this.endClip(_destinationLayer.ctx)
    }
,   saveInnerOffsetAndZoom: function() {
        this.savedInnerOffsetX = this.innerOffsetX;
        this.savedInnerOffsetY = this.innerOffsetY;
        this.savedInnerZoom    = this.innerZoom;
    }
,   startClip: function(_ctx, _clipLastPos) {
        _ctx.save();
        _ctx.beginPath();
        if (_clipLastPos === true) {
            _ctx.rect(this.lastActualX + 1, this.lastActualY + 1, this.lastActualW - 2, this.lastActualH - 2);
        }
        else {
            _ctx.rect(this.currentActualX + 1, this.currentActualY + 1, this.currentActualW - 2, this.currentActualH - 2);
        }
        _ctx.closePath();
        _ctx.clip();
    }
,   endClip: function(_ctx) {
        _ctx.restore();
    }
,   getCtx: function(_ctx) {
        if (toolBox.isNullOrUndefined(_ctx) === false) {
            return _ctx;
        }
        else {
            if (this.isSelected() === true && this.parentShape && this.parentShape.isSelected() === false) {
                return this.backGroundShape.middleLayer.ctx;
            }
            else {
                return this.defaultLayer.ctx;
            }
        }
    }
,   getWholeRect: function() {
        var ret = null;
        if (this.childShapes.length > 0) {
            ret = new Rect();
            ret.x = this.childShapes[0].x;
            ret.x2 = this.childShapes[0].x + this.childShapes[0].w;
            ret.y = this.childShapes[0].y;
            ret.y2 = this.childShapes[0].y + this.childShapes[0].h;
            for (var i=0;i<this.childShapes.length;i++) {
                if (ret.x > this.childShapes[i].x) {
                    ret.x = this.childShapes[i].x;
                }
                if (ret.x2 < this.childShapes[i].x + this.childShapes[i].w) {
                    ret.x2 = this.childShapes[i].x + this.childShapes[i].w;
                }
                if (ret.y > this.childShapes[i].y) {
                    ret.y = this.childShapes[i].y;
                }
                if (ret.y2 < this.childShapes[i].y + this.childShapes[i].h) {
                    ret.y2 = this.childShapes[i].y + this.childShapes[i].h;
                }
            }
        }
        return ret;
    }
,   moveAndZoomToViewAll: function() {
        var wholeRect = this.getWholeRect();
        if (wholeRect !== null) {
            var areaW = wholeRect.x2 - wholeRect.x;
            var areaH = wholeRect.y2 - wholeRect.y;
            var adjustX = areaW * 0.05;
            var adjustY = areaH * 0.05;
            var areaRatio = areaW / areaH;
            var containerRatio = this.w / this.h;
            if (areaRatio > containerRatio) {
                this.innerZoom = this.w / (areaW * 1.1);
                adjustY = ((this.h / this.innerZoom) - areaH) / 2;
                this.innerOffsetX = -(wholeRect.x - adjustX);
                this.innerOffsetY = -(wholeRect.y - adjustY);
            }
            else {
                this.innerZoom = this.h / (areaH * 1.1);
                adjustX = ((this.w / this.innerZoom) - areaW) / 2;
                this.innerOffsetX = -(wholeRect.x - adjustX);
                this.innerOffsetY = -(wholeRect.y - adjustY);
            }
        }
        else {
            this.innerOffsetX = 0;
            this.innerOffsetY = 0;
        }
/*
        if (toolBox.isFireFox === true) {
            if (this.innerZoom < 0.2) {
                this.innerZoom = 0.2;
            }
        }
*/
        this.saveCurrentDrawingPoints();
        this.registerDrawBuffer();
    }
,   moveInsideVertically: function(_p) {
        if (this.childShapes.length > 0) {
            var minY = this.childShapes[0].y;
            var maxY = this.childShapes[0].y + this.childShapes[0].h;
            for (var i=0;i<this.childShapes.length;i++) {
                if (minY > this.childShapes[i].y) {
                    minY = this.childShapes[i].y;
                }
                if (maxY < this.childShapes[i].y + this.childShapes[i].h) {
                    maxY = this.childShapes[i].y + this.childShapes[i].h;
                }
            }
            var adjustY = this.h / this.innerZoom / 2;
            this.innerOffsetY = -(minY + (((maxY - adjustY) - (minY + adjustY)) * _p));
        }
        else {
            this.innerOffsetY = 0;
        }
        this.saveCurrentDrawingPoints();
        this.registerDrawBuffer();
    }
,   moveInsideHorizontally: function(_p) {
        if (this.childShapes.length > 0) {
            var minX = this.childShapes[0].x;
            var maxX = this.childShapes[0].x + this.childShapes[0].w;
            for (var i=0;i<this.childShapes.length;i++) {
                if (minX > this.childShapes[i].x) {
                    minX = this.childShapes[i].x;
                }
                if (maxX < this.childShapes[i].x + this.childShapes[i].w) {
                    maxX = this.childShapes[i].x + this.childShapes[i].w;
                }
            }
            var adjustX = this.w / this.innerZoom / 2;
            this.innerOffsetX = -(minX + (((maxX - adjustX) - (minX + adjustX)) * _p));
        }
        else {
            this.innerOffsetX = 0;
        }
        this.saveCurrentDrawingPoints();
        this.registerDrawBuffer();
    }
,   getVerticalPositionInPercentile: function() {
        if (this.childShapes.length > 0) {
            var minY = this.childShapes[0].y;
            var maxY = this.childShapes[0].y + this.childShapes[0].h;
            for (var i=0;i<this.childShapes.length;i++) {
                if (minY > this.childShapes[i].y) {
                    minY = this.childShapes[i].y;
                }
                if (maxY < this.childShapes[i].y + this.childShapes[i].h) {
                    maxY = this.childShapes[i].y + this.childShapes[i].h;
                }
            }
            if ((maxY - minY) <= (this.h / this.innerZoom)) {
                if ((minY + this.innerOffsetY) < 0) {
                    return 0.997;
                }
                else if (maxY > (-this.innerOffsetY + (this.h / this.innerZoom))) {
                    return 0;
                }
                else {
                    return -1;
                }
            }
            else {
                var adjustY = this.h / this.innerZoom / 2;
                var p = ((-this.innerOffsetY + adjustY) - (minY + adjustY)) / ((maxY - adjustY) - (minY + adjustY));
                if (p < 0) {
                    return 0;
                }
                else if (p >= 1) {
                    return 0.997;
                }
                else {
                    return p;
                }
            }
        }
        else {
            return -1;
        }
    }
,   getHorizontalPositionInPercentile: function() {
        if (this.childShapes.length > 0) {
            var minX = this.childShapes[0].x;
            var maxX = this.childShapes[0].x + this.childShapes[0].w;
            for (var i=0;i<this.childShapes.length;i++) {
                if (minX > this.childShapes[i].x) {
                    minX = this.childShapes[i].x;
                }
                if (maxX < this.childShapes[i].x + this.childShapes[i].w) {
                    maxX = this.childShapes[i].x + this.childShapes[i].w;
                }
            }
            if ((maxX - minX) <= (this.w / this.innerZoom)) {
                if ((minX + this.innerOffsetX) < 0) {
                    return 0.997;
                }
                else if (maxX > (-this.innerOffsetX + (this.w / this.innerZoom))) {
                    return 0;
                }
                else {
                    return -1;
                }
            }
            else {
                var adjustX = this.w / this.innerZoom / 2;
                var p = ((-this.innerOffsetX + adjustX) - (minX + adjustX)) / ((maxX - adjustX) - (minX + adjustX));
                if (p < 0) {
                    return 0;
                }
                else if (p >= 1) {
                    return 0.997;
                }
                else {
                    return p;
                }
            }
        }
        else {
            return -1;
        }
    }
});
