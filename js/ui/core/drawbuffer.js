var DrawBuffer = function(){this.initialize.apply(this, arguments);}
DrawBuffer.prototype = toolBox.extend(new BaseObject(), {
    status                  : 0
,   shapes                  : null
,   contexts                : null
,   backGroundShapes        : null
,   drawBackGround          : false
,   canvasManager           : null
,   drawMode                : 0
,   commandType             : null
,   targetBackGroundShape   : null
,   containsAnimation       : false
,   initialize: function(_backGroundShapes) {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'DrawBuffer';
        this.shapes = new Array();
        this.contexts = new Array();
        this.status = toolBox.DRAW_TARGET_STATUS_INITIALIZED;
        this.backGroundShapes = _backGroundShapes;
        this.canvasManager = this.backGroundShapes[0].ioJobController.canvasManager;
        this.alive = true;
    }
,   addShape: function(_shape) {
        if (this.status === toolBox.DRAW_TARGET_STATUS_FINISH_PREPARING ||
            this.status === toolBox.DRAW_TARGET_STATUS_DRAWING) {
            logger.put('ステータスが適切でない状態でaddShapeが呼ばれました', toolBox.LOG_LEVEL_ERROR);
            return;
        }
        this.status = toolBox.DRAW_TARGET_STATUS_PREPARING;
        _shape.alreadyDrawn = false;
        toolBox.addToArrayIfNotExists(this.shapes, _shape);
        if (this.targetBackGroundShape === null) {
            this.targetBackGroundShape = _shape.backGroundShape;
        }
        if (_shape === _shape.backGroundShape) {
            this.drawBackGround = true;
        }
        if (_shape.isAnimationShape) {
            this.containsAnimation = true;
        }
logger.put('db ' + this.id + ' addShape : ' + _shape.classType, toolBox.LOG_LEVEL_DEBUG);
        toolBox.addToArrayIfNotExists(this.contexts, _shape.getCtx(null));
    }
,   isAlreadyDrawn: function() {
        var ret = true;
        for (var i=0;i<this.shapes.length;i++) {
            if (this.shapes[i].alreadyDrawn === false) {
                ret = false;
                break;
            }
        }
        return ret;
    }
,   fadeShapes: function(_ctx, _fadeLastPost) {
        for (var i=0;i<this.shapes.length;i++) {
            this.shapes[i].fade(_ctx, _fadeLastPost);
        }
    }
,   clearAll: function(_ctx) {
        if (toolBox.isNullOrUndefined(_ctx) === false) {
            //コンテキスト指定がある場合はそれを優先
            _ctx.clearRect(0, 0, this.canvasManager.getWidth(), this.canvasManager.getHeight());
        }
        else {
            //指定が無い場合は全レイヤクリア
            this.targetBackGroundShape.clearAllLayer();
        }
    }
,   clearDirty: function(_ctx, _clearLastPos) {
        if (toolBox.isNullOrUndefined(_ctx) === false) {
            //コンテキスト指定がある場合はそれを優先
            this.innerClearDirtyForSingleCtx(_ctx, true, _clearLastPos);
        }
        else {
            //全コンテキストを回してそれぞれDirtyClear実施
            for (var i=0;i<this.contexts.length;i++) {
                this.innerClearDirtyForSingleCtx(this.contexts[i], false, _clearLastPos);
            }
            //ContainerShapeが描画対象にあれば選択Shape用レイヤは強制クリア
            this.clearSelectedShapeLayerForContainerDraw();
        }
    }
,   innerClearDirtyForSingleCtx: function(_ctx, _all, _clearLastPos) {
        var maxX = this.backGroundShapes[0].currentActualW;
        var maxY = this.backGroundShapes[0].currentActualH;
        var maxX2 = 0;
        var maxY2 = 0;
        var found = false;
        var targetShapes = new Array();
        for (var i=0;i<this.shapes.length;i++) {
            toolBox.addToArray(targetShapes, this.shapes[i]);
            var effectedShapes = this.shapes[i].getEffectedShapes();
            for (var j=0;j<effectedShapes.length;j++) {
                toolBox.addToArray(targetShapes, effectedShapes[j]);
            }
        }
        if (_clearLastPos === true) {
            for (var i=0;i<targetShapes.length;i++) {
                if (targetShapes[i] === this.targetBackGroundShape) {
                    continue;
                }
                if (targetShapes[i].getCtx(null) === _ctx || _all === true) {
                    found = true;
                    if (maxX > Math.max(targetShapes[i].lastActualX, targetShapes[i].containerShape.lastActualX)) {
                        maxX = Math.max(targetShapes[i].lastActualX, targetShapes[i].containerShape.lastActualX)
                    }
                    if (maxY > Math.max(targetShapes[i].lastActualY, targetShapes[i].containerShape.lastActualY)) {
                        maxY = Math.max(targetShapes[i].lastActualY, targetShapes[i].containerShape.lastActualY);
                    }
                    if (maxX2 < Math.min(targetShapes[i].lastActualX2, targetShapes[i].containerShape.lastActualX2)) {
                        maxX2 = Math.min(targetShapes[i].lastActualX2, targetShapes[i].containerShape.lastActualX2);
                    }
                    if (maxY2 < Math.min(targetShapes[i].lastActualY2, targetShapes[i].containerShape.lastActualY2)) {
                        maxY2 = Math.min(targetShapes[i].lastActualY2, targetShapes[i].containerShape.lastActualY2);
                    }
                }
            }
        }
        else {
            for (var i=0;i<targetShapes.length;i++) {
                if (targetShapes[i] === this.targetBackGroundShape) {
                    continue;
                }
                if (targetShapes[i].getCtx(null) === _ctx || _all === true) {
                    found = true;
                    if (maxX > Math.max(targetShapes[i].currentActualX, targetShapes[i].containerShape.currentActualX)) {
                        maxX = Math.max(targetShapes[i].currentActualX, targetShapes[i].containerShape.currentActualX)
                    }
                    if (maxY > Math.max(targetShapes[i].currentActualY, targetShapes[i].containerShape.currentActualY)) {
                        maxY = Math.max(targetShapes[i].currentActualY, targetShapes[i].containerShape.currentActualY);
                    }
                    if (maxX2 < Math.min(targetShapes[i].currentActualX2, targetShapes[i].containerShape.currentActualX2)) {
                        maxX2 = Math.min(targetShapes[i].currentActualX2, targetShapes[i].containerShape.currentActualX2);
                    }
                    if (maxY2 < Math.min(targetShapes[i].currentActualY2, targetShapes[i].containerShape.currentActualY2)) {
                        maxY2 = Math.min(targetShapes[i].currentActualY2, targetShapes[i].containerShape.currentActualY2);
                    }
                }
            }
        }

        if (found === true) {
            _ctx.clearRect(maxX - 2, maxY - 2, maxX2 - maxX + 4, maxY2 - maxY + 4);
        }
    }
,   clearSelectedShapeLayerForContainerDraw: function() {
        //ContainerShapeが描画対象にあれば選択Shape用レイヤは強制クリア
        for (var i=0;i<this.shapes.length;i++) {
            if (this.shapes[i].isContainerShape && !this.shapes[i].isBackGroundShape) {
                this.targetBackGroundShape.selectedShapeLayer.clear();
                break;
            }
        }
    }
,   drawContainerWithImage: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        if (this.status === toolBox.DRAW_TARGET_STATUS_INITIALIZED ||
            this.status === toolBox.DRAW_TARGET_STATUS_PREPARING ||
            this.status === toolBox.DRAW_TARGET_STATUS_FINISH_DRAWING) {
            logger.put('ステータスが適切でない状態でdrawが呼ばれました', toolBox.LOG_LEVEL_ERROR);
            return;
        }
        else if (this.status !== toolBox.DRAW_TARGET_STATUS_DRAWING) {
            this.status = toolBox.DRAW_TARGET_STATUS_DRAWING;
        }
        this.innerDrawContainerWithImage(_sourceLayer, _destinationLayer, _drawLastPos);
        this.finishDrawing();
    }
,   innerDrawContainerWithImage: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        if (this.shapes.length > 0) {
            for (var i = 0;i < this.shapes.length;i++) {
                this.shapes[i].alreadyDrawn = false;
            }
            for (var i = 0;i < this.shapes.length;i++) {
                if (this.shapes[i].isContainerShape) {
logger.put('db ' + this.id + ' drawContainer : ' + this.shapes[i].classType, toolBox.LOG_LEVEL_DEBUG);
                    this.shapes[i].drawContainerWithImage(_sourceLayer, _destinationLayer, _drawLastPos);
                }
                else if (this.shapes[i].isAnimationShape) {
                    this.shapes[i].draw(null, _drawLastPos);
                }
            }
        }
    }
,   drawIsolatedShapes: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        if (this.status === toolBox.DRAW_TARGET_STATUS_INITIALIZED ||
            this.status === toolBox.DRAW_TARGET_STATUS_PREPARING ||
            this.status === toolBox.DRAW_TARGET_STATUS_FINISH_DRAWING) {
            logger.put('ステータスが適切でない状態でdrawが呼ばれました', toolBox.LOG_LEVEL_ERROR);
            return;
        }
        else if (this.status !== toolBox.DRAW_TARGET_STATUS_DRAWING) {
            this.status = toolBox.DRAW_TARGET_STATUS_DRAWING;
        }
        this.innerDrawIsolatedShapes(_sourceLayer, _destinationLayer, _drawLastPos);
        this.finishDrawing();
    }
,   innerDrawIsolatedShapes: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        if (this.shapes.length > 0) {
            for (var i = 0;i < this.shapes.length;i++) {
                this.shapes[i].alreadyDrawn = false;
            }
            var zOrderSortedShapes = new Array();
            if (this.drawBackGround === true) {
                this.targetBackGroundShape.getZOrderSortedAllShapes(zOrderSortedShapes);
            }
            else {
                this.targetBackGroundShape.zOrderSort(this.shapes, zOrderSortedShapes);
            }
            for (var i = 0;i < zOrderSortedShapes.length;i++) {
                if (zOrderSortedShapes[i].alreadyDrawn === false) {
logger.put('db ' + this.id + ' Isolationdraw : ' + zOrderSortedShapes[i].classType, toolBox.LOG_LEVEL_DEBUG);
                    zOrderSortedShapes[i].drawIsolatedShape(_sourceLayer, _destinationLayer, _drawLastPos);
                }
            }

            var otherShapes = toolBox.arrayWithoutArray(this.shapes, zOrderSortedShapes);
            if (otherShapes.length > 0) {
                for (var i = 0;i < otherShapes.length;i++) {
                    if (otherShapes[i].alreadyDrawn === false) {
                        otherShapes[i].drawIsolatedShape(_sourceLayer, _destinationLayer, _drawLastPos);
                    }
                }
            }
        }
    }
,   draw: function(_ctx, _drawLastPos) {
        if (this.status === toolBox.DRAW_TARGET_STATUS_INITIALIZED ||
            this.status === toolBox.DRAW_TARGET_STATUS_PREPARING ||
            this.status === toolBox.DRAW_TARGET_STATUS_FINISH_DRAWING) {
            logger.put('ステータスが適切でない状態でdrawが呼ばれました', toolBox.LOG_LEVEL_ERROR);
            return;
        }
        else if (this.status !== toolBox.DRAW_TARGET_STATUS_DRAWING) {
            this.status = toolBox.DRAW_TARGET_STATUS_DRAWING;
        }
        this.innerDraw(_ctx, _drawLastPos);
        this.finishDrawing();
    }
,   innerDraw: function(_ctx, _drawLastPos) {
logger.put('db ' + this.id + ' draw start', toolBox.LOG_LEVEL_DEBUG);
        if (this.shapes.length > 0) {
            for (var i = 0;i < this.shapes.length;i++) {
                this.shapes[i].alreadyDrawn = false;
            }
            var zOrderSortedShapes = new Array();
            if (this.drawBackGround === true) {
                this.targetBackGroundShape.getZOrderSortedAllShapes(zOrderSortedShapes);
            }
            else {
                this.targetBackGroundShape.zOrderSort(this.shapes, zOrderSortedShapes);
            }

            for (var i = 0;i < zOrderSortedShapes.length;i++) {
                if (zOrderSortedShapes[i].alreadyDrawn === false) {
logger.put('db target ---' + zOrderSortedShapes[i].classType + ' ' + zOrderSortedShapes[i].id + ' ' + zOrderSortedShapes[i].isSelected(), toolBox.LOG_LEVEL_DEBUG);
                    zOrderSortedShapes[i].draw(_ctx, _drawLastPos);
                }
            }
        }
    }
,   finishPreparing: function(_targetBackGroundShape, _commandType, _drawMode) {
        this.status = toolBox.DRAW_TARGET_STATUS_FINISH_PREPARING;
        for (var i=0;i<this.shapes.length;i++) {
logger.put('db ' + this.id + ' finishPreparing class:' + this.shapes[i].classType + ' ' + toolBox.getCommandTypeName(_commandType) + ' >' + _targetBackGroundShape.classType, toolBox.LOG_LEVEL_DEBUG);
            this.shapes[i].saveCurrentDrawingPoints();
        }
        this.targetBackGroundShape = _targetBackGroundShape;
        this.commandType = _commandType;
        this.drawMode = _drawMode;
    }
,   finishDrawing: function() {
        if (this.status !== toolBox.DRAW_TARGET_STATUS_DRAWING) {
            logger.put('ステータスが適切でない状態でfinishDrawingが呼ばれました', toolBox.LOG_LEVEL_ERROR);
            return;
        }
        this.status = toolBox.DRAW_TARGET_STATUS_FINISH_DRAWING;
    }
,   extractDrawBufferByBackGround: function(_backGroundShape) {
        var tempDrawBuffer = new DrawBuffer(this.backGroundShapes);
logger.put('db ' + this.id + ' extracting to > ' + tempDrawBuffer.id, toolBox.LOG_LEVEL_DEBUG);
        tempDrawBuffer.status = toolBox.DRAW_TARGET_STATUS_PREPARING;
        for (var i=0;i<this.shapes.length;i++) {
            if (this.shapes[i].backGroundShape === _backGroundShape) {
                if (this.shapes[i] === this.shapes[i].backGroundShape) {
                    tempDrawBuffer.drawBackGround = true;
                }
                if (this.shapes[i].isAnimationShape) {
                    tempDrawBuffer.containsAnimation = true;
                }
                tempDrawBuffer.addShape(this.shapes[i]);
            }
        }
        tempDrawBuffer.finishPreparing(_backGroundShape, this.commandType, this.drawMode);
        return tempDrawBuffer;
    }
,   saveLastDrawingPoints: function() {
        for (var i=0;i<this.shapes.length;i++) {
            this.shapes[i].saveLastDrawingPoints();
        }
    }
,   destroy: function() {
        this.shapes.length = 0;
        this.shapes = null;
        this.alive = false;
    }
});
