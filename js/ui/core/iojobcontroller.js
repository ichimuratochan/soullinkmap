var IOJobController = function(){this.initialize.apply(this, arguments);}
IOJobController.prototype = {
    drawBuffers             : null
,   animationShapes         : null
,   canvasManager           : null
,   backGroundShapes        : null
,   systemBackGround        : null
,   mainBackGround          : null
,   activeBackGroundShape   : null
,   activeDrawMode          : null
,   drawMovingShapesIsolationMode   : false
,   drawContainerByImageMode        : false
,   isDrawable                  : true
,   startTime                   : null
,   limitTimeToDoFirstAction    : 10000 //msec
,   firstTimeMenuIconShown      : false
,   initialize: function(_canvasManager) {
        this.drawBuffers = new Array();
        this.animationShapes = new Array();
        this.canvasManager = _canvasManager;
        this.systemBackGround = new SystemBackGround(
            this,
            this.canvasManager.systemHiddenLayer,
            this.canvasManager.systemBottomLayer,
            this.canvasManager.systemMiddleLayer,
            this.canvasManager.systemTopLayer,
            this.canvasManager.systemTempLayer,
            this.canvasManager.systemBottomLayer
        );
        this.mainBackGround = new MainBackGround(
            this,
            this.canvasManager.hiddenLayer,
            this.canvasManager.bottomLayer,
            this.canvasManager.middleLayer,
            this.canvasManager.topLayer,
            this.canvasManager.tempLayer,
            this.canvasManager.bottomLayer
        );
        this.systemBackGround.soulMaster.targetBackGround = this.mainBackGround;
        this.mainBackGround.soulMaster = this.systemBackGround.soulMaster;
        this.backGroundShapes = new Array();
        toolBox.addToArray(this.backGroundShapes, this.systemBackGround);
        toolBox.addToArray(this.backGroundShapes, this.mainBackGround);
        this.activeBackGroundShape = this.mainBackGround;
        this.systemBackGround.registerDrawBuffer();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_INITIALIZE, toolBox.DRAW_MODE_NORMAL);
        this.mainBackGround.showData();
        this.mainBackGround.registerDrawBuffer();
        this.finishPreparing(this.mainBackGround, toolBox.COMMAND_TYPE_INITIALIZE, toolBox.DRAW_MODE_NORMAL);
        this.startTime = Number(new Date()) + 0;
    }
,   singleHit: function(_mouseX, _mouseY, _multiSelect) {
        this.isDrawable = false;
        this.executeX = _mouseX;
        this.executeY = _mouseY;
        var targetShape = null;
        var commandType = _multiSelect === true ? toolBox.COMMAND_TYPE_MULTI_SELECT : toolBox.COMMAND_TYPE_SELECT;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            if (targetShape === null) {
                targetShape = this.backGroundShapes[i].execute(commandType, this.executeX, this.executeY)
                if (targetShape !== null) {
                    this.activeBackGroundShape = this.backGroundShapes[i];
                }
            }
        }
        if (this.activeBackGroundShape.isContainerShapeSelected() === true) {
            this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_MOVE_CONTAINER_IMAGE_START);
        }
        else if (targetShape.isAnimationShape) {
            this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
        }
        else {
            this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_MOVGING_SHAPE_ISOLATION_START);
        }
        this.isDrawable = true;
    }
,   splash: function() {
        this.systemBackGround.soulMaster.mainAction.splash();
    }
,   setLanguage: function(_language) {
        this.systemBackGround.soulMaster.mainAction.setLanguage(_language);
    }
,   generateImage: function() {
        this.systemBackGround.soulMaster.mainAction.generateImage();
    }
,   save: function() {
        this.systemBackGround.soulMaster.mainAction.save();
    }
,   searchInputInTopView: function() {
        this.systemBackGround.soulMaster.mainAction.searchInputInTopView();
    }
,   searchNextInTopView: function() {
        this.systemBackGround.soulMaster.mainAction.searchNextInTopView();
    }
,   searchPreviousInTopView: function() {
        this.systemBackGround.soulMaster.mainAction.searchPreviousInTopView();
    }
,   searchSoulsByText: function(_text) {
        if (toolBox.trim(_text) !== '') {
            this.isDrawable = false;
            this.systemBackGround.soulMaster.mainAction.searchSoulsByText(_text);
            this.isDrawable = true;
        }
    }
,   showContextMenu: function(_mouseX, _mouseY, _multiSelect) {
        if (this.activeBackGroundShape === this.mainBackGround) {
            this.isDrawable = false;
            this.singleHit(toolBox.mouseX, toolBox.mouseY, _multiSelect)
            this.systemBackGround.soulMaster.mainAction.closeAll();
            this.systemBackGround.soulMaster.mainAction.createSelectedShapesMenu(_mouseX, _mouseY);

            this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
            this.isDrawable = true;
        }
    }
,   startRangeSelection: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.startRangeSelection();
        this.systemBackGround.soulMaster.mainAction.closeAll();
        this.isDrawable = true;
    }
,   editSelectedShapes: function() {
        if (this.systemBackGround.soulMaster.targetBackGround.selectedShapes.length > 0) {
            this.isDrawable = false;
            this.systemBackGround.soulMaster.selectedShapesAction.editTextOfSelectedShapesStart();
            this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DIVE_OR_EDIT, toolBox.DRAW_MODE_NORMAL);
            this.isDrawable = true;
        }
    }
,   editSelectedBody: function() {
        if (this.systemBackGround.soulMaster.targetBackGround.selectedShapes.length === 1) {
            this.isDrawable = false;
            this.systemBackGround.soulMaster.selectedShapesAction.editTextOfSelectedBodyStart();
            this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DIVE_OR_EDIT, toolBox.DRAW_MODE_NORMAL);
            this.isDrawable = true;
        }
    }
,   editSelectedLink: function() {
        if (this.systemBackGround.soulMaster.targetBackGround.selectedShapes.length === 1) {
            this.isDrawable = false;
            this.systemBackGround.soulMaster.selectedShapesAction.editTextOfSelectedLinkStart();
            this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DIVE_OR_EDIT, toolBox.DRAW_MODE_NORMAL);
            this.isDrawable = true;
        }
    }
,   createMultipleShapes: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.createMultipleEntities();
        this.systemBackGround.soulMaster.dataAccessAction.saveToData();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DIVE_OR_EDIT, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   copySelectedEntities: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.copySelectedEntities();
        this.isDrawable = true;
    }
,   cutSelectedEntities: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.cutSelectedEntities();
        this.isDrawable = true;
    }
,   pasteEntities: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.pasteEntities();
        ioJobController.finishPreparing(this.mainBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   undo: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.undo();
        this.isDrawable = true;
    }
,   redo: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.redo();
        this.isDrawable = true;
    }
,   doUp: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.doUp();
        this.isDrawable = true;
    }
,   doDown: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.doDown();
        this.isDrawable = true;
    }
,   doRight: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.doRight();
        this.isDrawable = true;
    }
,   doLeft: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.doLeft();
        this.isDrawable = true;
    }
,   closeAllMenus: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.closeAll();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   surfaceFromCurrentBody: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.surfaceFromCurrentBody();
        this.isDrawable = true;
    }
,   changeTopViewMode: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.changeTopViewMode();
        this.isDrawable = true;
    }
,   doSaveActionInDialog: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.doSaveActionInDialog();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   doOpenHelp: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.openHelp();
        this.isDrawable = true;
    }
,   acceptSelectionInDialog: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.acceptSelectionInDialog();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   selectUpwardInDialog: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.selectUpwardInDialog();
        this.systemBackGround.registerDrawBuffer();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   selectDownwardInDialog: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.selectDownwardInDialog();
        this.systemBackGround.registerDrawBuffer();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   selectLeftwardInDialog: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.selectLeftwardInDialog();
        this.systemBackGround.registerDrawBuffer();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   selectRightwardInDialog: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.mainAction.selectRightwardInDialog();
        this.systemBackGround.registerDrawBuffer();
        this.finishPreparing(this.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   selectAll: function() {
        this.isDrawable = false;
        this.systemBackGround.soulMaster.selectedShapesAction.selectAll();
        this.isDrawable = true;
    }
,   doubleHit: function(_mouseX, _mouseY) {
        this.isDrawable = false;
        this.canvasManager.setMouseCursorBusy();
        this.executeX = _mouseX;
        this.executeY = _mouseY;
        var targetShape = null;
        var commandType = toolBox.COMMAND_TYPE_DIVE_OR_EDIT;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            targetShape = this.backGroundShapes[i].execute(commandType, this.executeX, this.executeY)
            if (targetShape !== null) {
                this.activeBackGroundShape = this.backGroundShapes[i];
                this.systemBackGround.soulMaster.dataAccessAction.saveToData();
                this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
                break;
            }
        }
        this.isDrawable = true;
    }
,   mouseOver: function(_mouseX, _mouseY) {
        this.isDrawable = false;
        this.executeX = _mouseX;
        this.executeY = _mouseY;
        var targetShape = null;
        var commandType = toolBox.COMMAND_TYPE_MOUSE_OVER;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            targetShape = this.backGroundShapes[i].execute(commandType, this.executeX, this.executeY)
            if (targetShape !== null) {
                this.activeBackGroundShape = this.backGroundShapes[i];
                this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
                break;
            }
        }
        this.isDrawable = true;
    }
,   drag: function(_mouseMoveX, _mouseMoveY) {
        this.isDrawable = false;
        this.executeX = _mouseMoveX;
        this.executeY = _mouseMoveY;
        var targetShape = null;
        var commandType = toolBox.COMMAND_TYPE_DRAG;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            if (this.backGroundShapes[i] === this.activeBackGroundShape) {
                if (this.backGroundShapes[i].selectedShapes.length > 0) {
                    var found = false;
                    for (var j=0;j<this.backGroundShapes[i].selectedShapes.length;j++) {
                        this.backGroundShapes[i].selectedShapes[j].execute(commandType, this.executeX, this.executeY);
                        found = true;
                    }
                    if (found === true) {
                        this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
                    }
                }
                break;
            }
        }
        this.isDrawable = true;
    }
,   drop: function(_mouseX, _mouseY) {
        this.isDrawable = false;
        this.canvasManager.setMouseCursorBusy();
        this.executeX = _mouseX;
        this.executeY = _mouseY;
        var commandType = toolBox.COMMAND_TYPE_DROP;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            if (this.backGroundShapes[i] === this.activeBackGroundShape) {
                if (this.backGroundShapes[i].selectedShapes.length > 0) {
                    this.backGroundShapes[i].registerDrawBuffer();
                    for (var j=0;j<this.backGroundShapes[i].selectedShapes.length;j++) {
                        this.backGroundShapes[i].selectedShapes[j].execute(commandType, this.executeX, this.executeY);
                    }
                }
                break;
            }
        }
        this.systemBackGround.soulMaster.dataAccessAction.saveToData();
        this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   virtualDrop: function(_mouseX, _mouseY) {
        this.isDrawable = false;
        this.canvasManager.setMouseCursorBusy();
        this.executeX = _mouseX;
        this.executeY = _mouseY;
        var commandType = toolBox.COMMAND_TYPE_VIRTUAL_DROP;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            if (this.backGroundShapes[i] === this.activeBackGroundShape) {
                if (this.backGroundShapes[i].selectedShapes.length > 0) {
                    this.backGroundShapes[i].registerDrawBuffer();
                    for (var j=0;j<this.backGroundShapes[i].selectedShapes.length;j++) {
                        this.backGroundShapes[i].selectedShapes[j].execute(commandType, this.executeX, this.executeY);
                    }
                }
                break;
            }
        }

        this.systemBackGround.soulMaster.dataAccessAction.saveToData();
        this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   resizeWorld: function() {
        this.isDrawable = false;
        this.canvasManager.initializeCanvasContainerSize();
        this.canvasManager.initializeAppFooterContainerSize();
        this.canvasManager.initializeSystemTopLayerSize();
        this.canvasManager.resizeLayers();
        for (var i=0;i<this.backGroundShapes.length;i++) {
            this.backGroundShapes[i].fitToCanvas();
        }
        this.finishPreparing(this.backGroundShapes[0], toolBox.COMMAND_TYPE_RESIZE_WORLD, toolBox.DRAW_MODE_NORMAL);
        this.isDrawable = true;
    }
,   zoomIn: function() {
        this.isDrawable = false;
        var targetShape = null;
        var commandType = toolBox.COMMAND_TYPE_ZOOM_IN;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            targetShape = this.backGroundShapes[i].execute(commandType, this.executeX, this.executeY)
            if (targetShape !== null) {
                this.activeBackGroundShape = this.backGroundShapes[i];
                this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
                break;
            }
        }
        this.isDrawable = true;
    }
,   zoomOut: function() {
        this.isDrawable = false;
        var targetShape = null;
        var commandType = toolBox.COMMAND_TYPE_ZOOM_OUT;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            targetShape = this.backGroundShapes[i].execute(commandType, this.executeX, this.executeY)
            if (targetShape !== null) {
                this.activeBackGroundShape = this.backGroundShapes[i];
                this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
                break;
            }
        }
        this.isDrawable = true;
    }
,   deleteSelectedShapes: function(_mouseX, _mouseY) {
        this.isDrawable = false;
        this.canvasManager.setMouseCursorBusy();
        this.executeX = _mouseX;
        this.executeY = _mouseY;
        var targetShape = null;
        var commandType = toolBox.COMMAND_TYPE_DELETE;
        for (var i=0;i<this.backGroundShapes.length;i++) {
            targetShape = this.backGroundShapes[i].execute(commandType, this.executeX, this.executeY)
            if (targetShape !== null) {
                this.activeBackGroundShape = this.backGroundShapes[i];
                this.finishPreparing(this.activeBackGroundShape, commandType, toolBox.DRAW_MODE_NORMAL);
                break;
            }
        }
        this.isDrawable = true;
    }
,   registerDrawShape: function(_shape) {
        if (this.drawBuffers.length === 0) {
            toolBox.addToArray(this.drawBuffers, new DrawBuffer(this.backGroundShapes));
        }
        else {
            if (this.drawBuffers[this.drawBuffers.length - 1].status !== toolBox.DRAW_TARGET_STATUS_PREPARING) {
                toolBox.addToArray(this.drawBuffers, new DrawBuffer(this.backGroundShapes));
            }
        }
        this.drawBuffers[this.drawBuffers.length - 1].addShape(_shape);
    }
,   finishPreparing: function(_targetBackGroundShape, _commandType, _drawMode) {
        for (var i=0;i<this.drawBuffers.length;i++) {
            if (this.drawBuffers[i].status === toolBox.DRAW_TARGET_STATUS_PREPARING) {
                this.drawBuffers[i].finishPreparing(_targetBackGroundShape, _commandType, _drawMode);
logger.put('io dbid=' + this.drawBuffers[i].id + ' finishPreparing : ' + toolBox.getCommandTypeName(this.drawBuffers[i].commandType) + '>' + _targetBackGroundShape.classType, toolBox.LOG_LEVEL_DEBUG);
                break;
            }
        }
    }
,   setMouseCursor: function(_cursor) {
        this.canvasManager.setMouseCursor(_cursor);
    }
,   getMouseCursor: function() {
        return this.canvasManager.getMouseCursor();
    }
,   draw: function() {
        if (this.isDrawable === true) {
            if (this.drawBuffers.length === 0) {
                this.canvasManager.restoreMouseCursor();
            }
            else {
                this.OptimizeDrawBuffersForBackGroundDraw();
                this.innerDraw();
            }
        }
        if (this.firstTimeMenuIconShown === false) {
            var currentTime = Number(new Date()) + 0;
            if ((currentTime - this.startTime) > this.limitTimeToDoFirstAction && this.isCommandAcceptable() === true) {
                this.systemBackGround.soulMaster.switchVisibilityOfSoulMasterMenu();
                this.firstTimeMenuIconShown = true;
            }
        }
    }
,   innerDraw: function() {
        var targetDrawBuffer = null;
        var targetBackGround = this.drawBuffers[0].targetBackGroundShape;
logger.put('io db=' + this.drawBuffers[0].id + ' startDrawing : ' + toolBox.getCommandTypeName(this.drawBuffers[0].commandType), toolBox.LOG_LEVEL_DEBUG);
        for (var i=0;i<this.backGroundShapes.length;i++) {
            targetDrawBuffer = this.drawBuffers[0].extractDrawBufferByBackGround(this.backGroundShapes[i]);
            if (targetDrawBuffer.shapes.length === 0) {
                continue;
            }
            if (this.backGroundShapes[i] === targetBackGround) {
logger.put('io db=' + this.drawBuffers[0].id + ' innerDraw loop ' + (i + 1) + ' Target!!' + this.backGroundShapes[i].classType, toolBox.LOG_LEVEL_DEBUG);
                var isZoomingStartedSuddenly = ((targetDrawBuffer.commandType === toolBox.COMMAND_TYPE_ZOOM_IN || targetDrawBuffer.commandType === toolBox.COMMAND_TYPE_ZOOM_OUT) && this.drawContainerByImageMode === false);
                if (targetDrawBuffer.commandType === toolBox.COMMAND_TYPE_DROP || targetDrawBuffer.commandType === toolBox.COMMAND_TYPE_VIRTUAL_DROP) {
                    this.backGroundShapes[i].clearAllLayer();
                    if (this.drawMovingShapesIsolationMode === true) {
logger.put('io db=' + this.drawBuffers[0].id + ' IsolationModeFinish', toolBox.LOG_LEVEL_DEBUG);
                        this.drawMovingShapesIsolationMode = false;
                    }
                    else if (this.drawContainerByImageMode === true) {
logger.put('io db=' + this.drawBuffers[0].id + ' ContainerImageModeFinish', toolBox.LOG_LEVEL_DEBUG);
                        this.drawContainerByImageMode = false;
                    }
                    targetDrawBuffer.draw(null, false);
                    if (this.backGroundShapes[i].isChildContainerShapeSelected() === true) {
                        this.backGroundShapes[i].selectedShapeLayer.targetShape = this.backGroundShapes[i].getSelectedChildContainerShape();
                    }
                    else {
                        this.backGroundShapes[i].selectedShapeLayer.targetShape = null;
                    }
                }
                else if (targetDrawBuffer.drawMode === toolBox.DRAW_MODE_MOVE_CONTAINER_IMAGE_START || isZoomingStartedSuddenly === true) {
logger.put('io db=' + this.drawBuffers[0].id + ' ContainerImageModeStart', toolBox.LOG_LEVEL_DEBUG);
                    this.drawMovingShapesIsolationMode = false;
                    this.backGroundShapes[i].hiddenLayer.clear();
                    if (this.backGroundShapes[i].isChildContainerShapeSelected() === true) {
                        if (this.backGroundShapes[i].selectedShapeLayer.targetShape === this.backGroundShapes[i].getSelectedChildContainerShape()) {
                            this.backGroundShapes[i].hiddenLayer.copyFrom(this.backGroundShapes[i].topLayer);
                        }
                        else {
                            this.backGroundShapes[i].topLayer.clear();
                            this.backGroundShapes[i].middleLayer.clear();
                            this.backGroundShapes[i].hiddenLayer.clear();
                            this.backGroundShapes[i].draw(null, false);
                            this.backGroundShapes[i].hiddenLayer.copyFrom(this.backGroundShapes[i].topLayer);
                        }
                    }
                    else {
                        this.backGroundShapes[i].middleLayer.copyFrom(this.backGroundShapes[i].topLayer);
                        this.backGroundShapes[i].hiddenLayer.copyFrom(this.backGroundShapes[i].middleLayer);
                    }
                    this.backGroundShapes[i].saveActualPositionOfSelectedShapes();
                    this.backGroundShapes[i].saveInnerOffsetAndZoomOfSelectedShapes();
                    this.drawContainerByImageMode = true;
                }
                else if (targetDrawBuffer.drawMode === toolBox.DRAW_MODE_MOVGING_SHAPE_ISOLATION_START) {
                    this.drawContainerByImageMode = false;
logger.put('io db=' + this.drawBuffers[0].id + ' IsolationModeStart', toolBox.LOG_LEVEL_DEBUG);
                    this.backGroundShapes[i].topLayer.clear();
                    targetDrawBuffer.draw(null, true);
                    this.backGroundShapes[i].middleLayer.copyFrom(this.backGroundShapes[i].topLayer);
                    this.backGroundShapes[i].hiddenLayer.clear();
                    this.backGroundShapes[i].hiddenLayer.copyFrom(this.backGroundShapes[i].middleLayer);
                    this.backGroundShapes[i].saveActualPositionOfSelectedShapes();
                    this.backGroundShapes[i].saveInnerOffsetAndZoomOfSelectedShapes();
                    var tempDrawBuffer = new DrawBuffer(this.backGroundShapes);
                    tempDrawBuffer.shapes = this.backGroundShapes[i].getSelectedShapesAndDockedShapes();
                    tempDrawBuffer.fadeShapes(this.backGroundShapes[i].middleLayer.ctx, true);
                    tempDrawBuffer.finishPreparing(this.backGroundShapes[i], toolBox.COMMAND_TYPE_OTHER, toolBox.DRAW_MODE_OTHER);
                    tempDrawBuffer.drawIsolatedShapes(this.backGroundShapes[i].hiddenLayer, this.backGroundShapes[i].topLayer, false);
                    tempDrawBuffer.destroy();
                    this.drawMovingShapesIsolationMode = true;
                }
                else if (this.drawMovingShapesIsolationMode === true) {
logger.put('io db=' + this.drawBuffers[0].id + ' IsolationModeInProgress', toolBox.LOG_LEVEL_DEBUG);
                    targetDrawBuffer.clearDirty(this.backGroundShapes[i].topLayer.ctx, true);
                    targetDrawBuffer.drawIsolatedShapes(this.backGroundShapes[i].hiddenLayer, this.backGroundShapes[i].topLayer, false);
                }
                else if (this.drawContainerByImageMode === true) {
logger.put('io db=' + this.drawBuffers[0].id + ' ContainerImageModeInProgress', toolBox.LOG_LEVEL_DEBUG);
                    targetDrawBuffer.drawContainerWithImage(this.backGroundShapes[i].hiddenLayer, this.backGroundShapes[i].topLayer, false);
                }
                else {
logger.put('io db=' + this.drawBuffers[0].id + ' otherMode', toolBox.LOG_LEVEL_DEBUG);
                    if (targetDrawBuffer.isAlreadyDrawn() === false) {
                        if (targetDrawBuffer.drawBackGround === true) {
                            targetDrawBuffer.clearAll();
                        }
                        targetDrawBuffer.draw(null, false);
                    }
                }
            }
            else {
logger.put('io db=' + this.drawBuffers[0].id + ' innerDraw loop ' + (i + 1) + '蝗樒岼 other ' + this.backGroundShapes[i].classType, toolBox.LOG_LEVEL_DEBUG);
                if (targetDrawBuffer.drawBackGround === true) {
                    targetDrawBuffer.clearAll();
                }
                else {
                    targetDrawBuffer.clearSelectedShapeLayerForContainerDraw();
                }
                targetDrawBuffer.draw(null, false);
            }
logger.put('io db=' + this.drawBuffers[0].id + ' innerDrawFinish loop ' + (i + 1) + '蝗樒岼', toolBox.LOG_LEVEL_DEBUG);
        }
logger.put('io db=' + this.drawBuffers[0].id + ' finishDrawing : ' + toolBox.getCommandTypeName(targetDrawBuffer.commandType), toolBox.LOG_LEVEL_DEBUG);
        this.drawBuffers[0].saveLastDrawingPoints();
        this.drawBuffers[0].status = toolBox.DRAW_TARGET_STATUS_FINISH_DRAWING;
        this.registerNextAnimationFrame();
        this.drawBuffers[0].destroy();
        this.drawBuffers.shift();
    }
,   registerNextAnimationFrame: function() {
        this.isDrawable = false;
        if (this.animationShapes.length > 0) {
            var tempArray = new Array();
            for (var i=0;i<this.animationShapes.length;i++) {
                if (this.animationShapes[i].alive === true) {
                    toolBox.addToArray(tempArray, this.animationShapes[i]);
                }
            }
            this.animationShapes = tempArray;
        }
        if (this.drawBuffers[0].containsAnimation === true) {
            for (var i=0;i<this.drawBuffers[0].shapes.length;i++) {
                if (this.drawBuffers[0].shapes[i].isAnimationShape) {
                    toolBox.addToArrayIfNotExists(this.animationShapes, this.drawBuffers[0].shapes[i]);
                }
            }
        }
        if (this.animationShapes.length > 0) {
            var animationAdded = false;
            var nextFrameIsTheLastFrame = true;
            for (var i=0;i<this.animationShapes.length;i++) {
                if (this.animationShapes[i].addAnimationFrame() === true) {
                    animationAdded = true;
                    if (this.animationShapes[i].isGonnaBeTheLastFrame() === false) {
                        nextFrameIsTheLastFrame = false;
                    }
                }
            }
            if (animationAdded === true) {
                this.finishPreparing(this.animationShapes[0].backGroundShape, toolBox.COMMAND_TYPE_ANIMATION, toolBox.DRAW_MODE_NORMAL);
                if (nextFrameIsTheLastFrame === true) {
                    this.animationShapes[0].backGroundShape.registerDrawBuffer();
                    this.finishPreparing(this.animationShapes[0].backGroundShape, toolBox.COMMAND_TYPE_NORMAL, toolBox.DRAW_MODE_NORMAL);
                }
            }
        }
        this.isDrawable = true;
    }
,   OptimizeDrawBuffersForBackGroundDraw: function() {
        if (this.drawBuffers[0].commandType === toolBox.COMMAND_TYPE_INITIALIZE ||
            this.drawBuffers[0].commandType === toolBox.COMMAND_TYPE_RESIZE_WORLD) {
            return;
        }
        var lastDrawBackGroundIndex = -1;
        for (var i=this.drawBuffers.length-1;i>=0;i--) {
            if (this.drawBuffers[i].drawBackGround === true) {
                lastDrawBackGroundIndex = i;
                break;
            }
        }
        if (lastDrawBackGroundIndex === -1) {
            return;
        }
        for (var i=0;i<lastDrawBackGroundIndex;i++) {
            if (this.drawBuffers.length > 1 &&
                this.drawBuffers[1].commandType === this.drawBuffers[0].commandType &&
                this.drawBuffers[1].targetBackGroundShape === this.drawBuffers[0].targetBackGroundShape) {
logger.put(this.drawBuffers[0].id + ' purged : ' + toolBox.getCommandTypeName(this.drawBuffers[0].commandType), toolBox.LOG_LEVEL_DEBUG);
                this.drawBuffers[0].destroy();
                this.drawBuffers.shift();
            }
            else {
                break;
            }
        }
        for (var i=0;i<lastDrawBackGroundIndex;i++) {
            if (this.drawBuffers.length > 3 &&
                this.drawBuffers[2].commandType === this.drawBuffers[0].commandType && this.drawBuffers[0].commandType === toolBox.COMMAND_TYPE_DRAG &&
                this.drawBuffers[3].commandType === this.drawBuffers[1].commandType && this.drawBuffers[1].commandType === toolBox.COMMAND_TYPE_VIRTUAL_DROP &&
                this.drawBuffers[2].targetBackGroundShape === this.drawBuffers[0].targetBackGroundShape &&
                this.drawBuffers[3].targetBackGroundShape === this.drawBuffers[1].targetBackGroundShape) {
logger.put(this.drawBuffers[0].id + ' purged2 : ' + toolBox.getCommandTypeName(this.drawBuffers[0].commandType), toolBox.LOG_LEVEL_DEBUG);
                this.drawBuffers[0].destroy();
                this.drawBuffers.shift();
                this.drawBuffers[0].destroy();
                this.drawBuffers.shift();
            }
            else {
                break;
            }
        }
    }
,   isCommandAcceptable: function() {
        if (this.drawMovingShapesIsolationMode === true) {
            return false;
        }
        if (this.drawBuffers.length > 0) {
            for (var i=0;i<this.drawBuffers.length;i++) {
                if (this.drawBuffers[i].containsAnimation === true) {
                    return false;
                }
            }
        }
        if (this.canvasManager.isUserTypingStringInProcess() === true) {
            return false;
        }
        if (this.systemBackGround.soulMaster.actionInProgress === true) {
            return false;
        }
        return true;
    }
};
