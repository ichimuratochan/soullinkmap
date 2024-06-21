var MainAction = function(){this.initialize.apply(this, arguments);}
MainAction.prototype = toolBox.extend(new ActionBase(), {
    initialize: function(_soulMaster) {
        ActionBase.prototype.initialize.apply(this,[_soulMaster]);
        this.classType = 'MainAction';
        this.alive = true;
    }
,   closeAll: function() {
        var box = null;
        var boxRemaining = false;
        var boxDestroyed = false;
        for (var i=1;i<=12;i++) {
            if (i === 1) box = this.soulMaster.menu;
            if (i === 2) box = this.soulMaster.editTextBox;
            if (i === 3) box = this.soulMaster.inputBox;
            if (i === 4) box = this.soulMaster.formatSettingBox;
            if (i === 5) box = this.soulMaster.colorSettingBox;
            if (i === 6) box = this.soulMaster.birdViewDirectionSettingBox;
            if (i === 7) box = this.soulMaster.viewSettingBox;
            if (i === 8) box = this.soulMaster.linkConditionListBox;
            if (i === 9) box = this.soulMaster.detailBirdViewBox;
            if (i === 10) box = this.soulMaster.similarSoulsListBox;
            if (i === 11) box = this.soulMaster.savedMapListBox;
            if (i === 12) box = this.soulMaster.animation;

            if (box !== null && box.alive === true) {
                if (boxDestroyed === false) {
                    if (box.zOrder.isTopShape() === true) {
                        if (box.cancel) {
                            box.cancel();
                        }
                        else {
                            box.destroy();
                        }
                        if (i === 1) this.soulMaster.menu = null;
                        if (i === 2) this.soulMaster.editTextBox = null;
                        if (i === 3) this.soulMaster.inputBox = null;
                        if (i === 4) this.soulMaster.formatSettingBox = null;
                        if (i === 5) this.soulMaster.colorSettingBox = null;
                        if (i === 6) this.soulMaster.birdViewDirectionSettingBox = null;
                        if (i === 7) this.soulMaster.viewSettingBox = null;
                        if (i === 8) this.soulMaster.linkConditionListBox = null;
                        if (i === 9) this.soulMaster.detailBirdViewBox = null;
                        if (i === 10) this.soulMaster.similarSoulsListBox = null;
                        if (i === 11) this.soulMaster.savedMapListBox = null;
                        if (i === 12) this.soulMaster.animation = null;
                        boxDestroyed = true;
                    }
                    else {
                        boxRemaining = true;
                    }
                }
                else {
                    boxRemaining = true;
                }
            }

        }
        if (boxRemaining === false) {
            this.soulMaster.actionInProgress = false;
        }
    }
,   getCurrentDialog: function() {
        var box = null;
        for (var i=1;i<=12;i++) {
            if (i === 1) box = this.soulMaster.menu;
            if (i === 2) box = this.soulMaster.editTextBox;
            if (i === 3) box = this.soulMaster.inputBox;
            if (i === 4) box = this.soulMaster.formatSettingBox;
            if (i === 5) box = this.soulMaster.colorSettingBox;
            if (i === 6) box = this.soulMaster.birdViewDirectionSettingBox
            if (i === 7) box = this.soulMaster.viewSettingBox;
            if (i === 8) box = this.soulMaster.linkConditionListBox;
            if (i === 9) box = this.soulMaster.detailBirdViewBox;
            if (i === 10) box = this.soulMaster.similarSoulsListBox;
            if (i === 11) box = this.soulMaster.savedMapListBox;
            if (i === 12) box = this.soulMaster.animation;
            if (box !== null && box.alive === true) {
                if (box.zOrder.isTopShape() === true) {
                    return box;
                }
            }
        }
        return null;
    }
,   doSaveActionInDialog: function() {
        var box = this.getCurrentDialog();
        if (box && box.view) {
            if (box.view.save) {
                box.view.save();
            }
        }
    }
,   acceptSelectionInDialog: function() {
        var box = this.getCurrentDialog();
        if (box && box.view) {
            if (box.view.doMenuAction) {
                box.view.doMenuAction();
            }
        }
    }
,   selectUpwardInDialog: function() {
        var box = this.getCurrentDialog();
        if (box && box.view) {
            if (box.view.selectNextUpwardMenuItem) {
                box.view.selectNextUpwardMenuItem();
            }
        }
    }
,   selectDownwardInDialog: function() {
        var box = this.getCurrentDialog();
        if (box && box.view) {
            if (box.view.selectNextDownwardMenuItem) {
                box.view.selectNextDownwardMenuItem();
            }
        }
    }
,   selectLeftwardInDialog: function() {
        var box = this.getCurrentDialog();
        if (box && box.view) {
            if (box.view.selectNextLeftwardMenuItem) {
                box.view.selectNextLeftwardMenuItem();
            }
        }
    }
,   selectRightwardInDialog: function() {
        var box = this.getCurrentDialog();
        if (box && box.view) {
            if (box.view.selectNextRightwardMenuItem) {
                box.view.selectNextRightwardMenuItem();
            }
        }
    }
,   openHelp: function() {
        var openurl = '';
        if (translator.language === 'Japanese') {
            openurl = toolBox.getAbsoluteLocation() + '?' + toolBox.createQueryParam('map', 'help/help.map');
        }
        else {
            openurl = toolBox.getAbsoluteLocation() + '?' + toolBox.createQueryParam('map', 'help/help_english.map');
        }
        toolBox.openWindow(openurl, 'Help');
    }
,   createMainManu: function(_x, _y) {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.actionInProgress = true;
        if (!_x || !_y) {
            _x = this.soulMaster.currentActualX + (this.soulMaster.currentActualW / 2);
            _y = this.soulMaster.currentActualY + (this.soulMaster.currentActualH / 2);
        }
        var newMenu = new MainMenuViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            0,
            0,
            0,
            0
        );
        newMenu.setActualX(_x - (newMenu.currentActualW / 2));
        newMenu.setActualY(_y - (newMenu.currentActualH / 2));
        if (newMenu.currentActualX < 0) {
            newMenu.setActualX(0);
        }
        if (newMenu.currentActualY < 0) {
            newMenu.setActualY(0);
        }
        if (newMenu.currentActualX2 > this.soulMaster.backGroundShape.currentActualW) {
            newMenu.setActualX(this.soulMaster.backGroundShape.currentActualW - newMenu.currentActualW);
        }
        if (newMenu.currentActualY2 > this.soulMaster.backGroundShape.currentActualH) {
            newMenu.setActualY(this.soulMaster.backGroundShape.currentActualH - newMenu.currentActualH);
        }
        newMenu.onMoveToTop();
        newMenu.registerDrawBuffer();
        this.soulMaster.registerDrawBuffer();
        this.soulMaster.menu = newMenu;
    }
,   createEntityView: function(_x, _y, _bodyId, _maximized, _viewMode) {
        this.resumeMaximizedSizeOfTopView();
        var x = 0;
        var y = 0;
        if (toolBox.isNullOrUndefined(_x) === false) {
            x = _x;
        }
        else {
            x = this.soulMaster.savedX;
        }
        if (toolBox.isNullOrUndefined(_y) === false) {
            y = _y;
        }
        else {
            y = this.soulMaster.savedY;
        }
        var newViewFrame = new EntityViewFrame(
            this.soulMaster.targetBackGround,
            this.soulMaster.targetBackGround,
            this.soulMaster.targetBackGround.middleLayer,
            ((x - this.soulMaster.targetBackGround.currentActualX) - this.soulMaster.targetBackGround.getActualInnerOffsetX()) / this.soulMaster.targetBackGround.getActualZoom(),
            ((y - this.soulMaster.targetBackGround.currentActualY) - this.soulMaster.targetBackGround.getActualInnerOffsetY()) / this.soulMaster.targetBackGround.getActualZoom(),
            this.soulMaster.targetBackGround.w * 0.8,
            this.soulMaster.targetBackGround.h * 0.8,
            toolBox.BODY_ID_WORLD
        );
        if (toolBox.isNullOrUndefined(_bodyId) === false) {
            newViewFrame.view.bodyId = _bodyId;
//            newViewFrame.changeViewMode(toolBox.VIEW_MODE_BIRDVIEW);
        }
        if (_maximized && _maximized === true) {
            var maximizeButton = newViewFrame.getButton(toolBox.FRAME_BUTTON_TYPE_MAXIMIZE);
            if (maximizeButton !== null) {
                maximizeButton.commandMaximize();
            }
        }
        if (_viewMode) {
            newViewFrame.changeViewMode(_viewMode);
        }
        newViewFrame.view.showBodyData(true);
        newViewFrame.view.adjustInnerOffsetToStartPosition();

        newViewFrame.onMoveToTop();
        newViewFrame.visible = false;
        new ShapeCreationAnimation2(
            this.soulMaster.targetBackGround,
            this.soulMaster.targetBackGround,
            this.soulMaster.targetBackGround.selectedShapeLayer,
            new Rect(newViewFrame.x, newViewFrame.y, newViewFrame.x + newViewFrame.w, newViewFrame.y + newViewFrame.h),
            newViewFrame
        ).startAnimation();
        return newViewFrame;
    }
,   maximizeSizeOfTopView: function() {
        var topViewFrame = this.soulMaster.selectedShapesAction.getTopViewFrame();
        if (topViewFrame === null) {
            return;
        }
        var maxButton = topViewFrame.getButton(toolBox.FRAME_BUTTON_TYPE_MAXIMIZE);
        if (maxButton !== null) {
            maxButton.commandMaximize();
        }
    }
,   resumeMaximizedSizeOfTopView: function() {
        var topViewFrame = this.soulMaster.selectedShapesAction.getTopViewFrame();
        if (topViewFrame === null) {
            return;
        }
        var resumeSizeButton = topViewFrame.getButton(toolBox.FRAME_BUTTON_TYPE_RESUME_SIZE);
        if (resumeSizeButton !== null) {
            resumeSizeButton.commandResumeSize();
        }
    }
,   startRangeSelection: function() {
        this.soulMaster.targetBackGround.clearSelectedShapes();
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview !== null) {
                topview.view.registerDrawBufferWithoutChildren()
            }
        }
        this.soulMaster.rangeSelectionShape = new RangeSelectionShape(
                                                  this.soulMaster.backGroundShape,
                                                  this.soulMaster.backGroundShape,
                                                  this.soulMaster.backGroundShape.topLayer,
                                                  0,
                                                  0,
                                                  0,
                                                  0
                                              );
    }
,   endRangeSelection: function(_x, _y, _w, _h) {
        this.soulMaster.rangeSelectionShape = null;
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var selectedShapes = new Array();
            for (var i=0;i<this.soulMaster.targetBackGround.childShapes.length;i++) {
                this.soulMaster.targetBackGround.childShapes[i].addToArrayIfIsInRect(selectedShapes, _x, _y, _w, _h);
            }
            if (selectedShapes.length > 0) {
                var zOrderSortedShapes = new Array();
                this.soulMaster.targetBackGround.zOrderSort(selectedShapes, zOrderSortedShapes);
                for (var i=0;i<zOrderSortedShapes.length;i++) {
//                    zOrderSortedShapes[i].zOrder.moveToTop();
                    this.soulMaster.targetBackGround.addSelectedShape(zOrderSortedShapes[i]);
                }
                this.soulMaster.targetBackGround.adjustForMultiSelection();
                this.soulMaster.targetBackGround.registerDrawBufferWithoutChildren();
            }
        }
        this.soulMaster.actionInProgress = false;
    }
,   startShapeTransferAnimation: function(_sourceRect, _destinationRect, _shapeFormat, _callBackTarget, _message) {
        new ShapeTransferAnimation(
            this.soulMaster.containerShape,
            this.soulMaster.parentShape,
            this.soulMaster.backGroundShape.selectedShapeLayer,
            _sourceRect,
            _destinationRect,
            _shapeFormat,
            _callBackTarget,
            _message
        ).startAnimation();
    }
,   startShapeTransferAnimationWithMaxFrame: function(_sourceRect, _destinationRect, _shapeFormat, _callBackTarget, _message, _maxFrames) {
        new ShapeTransferAnimation(
            this.soulMaster.containerShape,
            this.soulMaster.parentShape,
            this.soulMaster.backGroundShape.selectedShapeLayer,
            _sourceRect,
            _destinationRect,
            _shapeFormat,
            _callBackTarget,
            _message,
            null,
            null,
            null,
            null,
            _maxFrames
        ).startAnimation();
    }
,   startBreakTimeAnimation: function() {
        if (this.soulMaster.actionInProgress === false) {
            this.soulMaster.actionInProgress = true;
            this.soulMaster.animation = new BreakTimeAnimation(
                this.soulMaster.containerShape,
                this.soulMaster.parentShape,
                this.soulMaster.backGroundShape.selectedShapeLayer,
                this.soulMaster.backGroundShape.x,
                this.soulMaster.backGroundShape.y,
                this.soulMaster.backGroundShape.w,
                this.soulMaster.backGroundShape.h
            );
            this.soulMaster.animation.startAnimation()
        }
    }
,   startBreakTimeAnimation2: function() {
        if (this.soulMaster.actionInProgress === false) {
            this.soulMaster.actionInProgress = true;
            this.soulMaster.animation = new BreakTimeAnimation2(
                this.soulMaster.containerShape,
                this.soulMaster.parentShape,
                this.soulMaster.backGroundShape.selectedShapeLayer,
                this.soulMaster.backGroundShape.x,
                this.soulMaster.backGroundShape.y,
                this.soulMaster.backGroundShape.w,
                this.soulMaster.backGroundShape.h
            );
            this.soulMaster.animation.startAnimation()
        }
    }
,   startBreakTimeAnimation3: function() {
        if (this.soulMaster.actionInProgress === false) {
            this.soulMaster.actionInProgress = true;
            this.soulMaster.animation = new BreakTimeAnimation3(
                this.soulMaster.containerShape,
                this.soulMaster.parentShape,
                this.soulMaster.backGroundShape.topLayer
            );
            this.soulMaster.animation.startAnimation()
        }
    }
,   startFormatingLinkViewEntitiesAnimation: function(_callBackTarget) {
        this.soulMaster.actionInProgress = true;
        this.soulMaster.animation = new LinkViewFormatAnimation(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape.topLayer,
            _callBackTarget,
            this.soulMaster.backGroundShape.w / 2 - 300,
            this.soulMaster.backGroundShape.h / 2 - 60,
            600,
            120
        );
        this.soulMaster.animation.startAnimation()
    }
,   searchSoulsByText: function(_text) {
        var rows = this.soulMaster.dataAccessAction.findSimilarSoulsByText(_text);
        if (rows.length > 0) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.actionInProgress = true;

            var newSimilarSoulsListBox = new SimiarSoulsListViewFrame(
                this.soulMaster.backGroundShape,
                this.soulMaster.backGroundShape,
                this.soulMaster.defaultLayer,
                this,
                rows,
                'searchSoulsByText'
            );
            newSimilarSoulsListBox.visible = false;

            this.startShapeTransferAnimation(this.soulMaster.getRect(), newSimilarSoulsListBox.getRect(), this.soulMaster.shapeFormat, newSimilarSoulsListBox);
        }
    }
,   callBackFromSimilarSoulsListView: function(_resultSoulId, _arg1, _arg2, _arg3, _arg4, _arg5) {
        var selectedSoulId = _resultSoulId;
        var bodyRows = this.soulMaster.dataAccessAction.findBodiesBySoulId(selectedSoulId);
        if (bodyRows.length > 0) {
            var newEntityViewFrame = this.soulMaster.mainAction.createEntityView(1, 1, bodyRows[0]['BODY_ID'], _arg1);
            newEntityViewFrame.changeViewMode(toolBox.VIEW_MODE_BIRDVIEW);
            if (_arg2) {
                newEntityViewFrame.view.innerZoom = 0.8;
                this.maximizeSizeOfTopView();
                this.soulMaster.selectedShapesAction.centerizeAndSelectBody(newEntityViewFrame.view, newEntityViewFrame.view.bodyId);
                this.soulMaster.move(0, 100);
            }
            this.soulMaster.dataAccessAction.saveToData();
            this.soulMaster.parentShape.registerDrawBuffer();
        }
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.targetBackGround.registerDrawBuffer();
    }
,   directJumpToSoul: function(_text) {
        var rows = this.soulMaster.dataAccessAction.findSoulsByText(_text);
        if (rows.length === 1) {
            this.callBackFromSimilarSoulsListView(rows[0]['SOUL_ID'], 'directJumpToSoul', true);
        }
        else if (rows.length > 0) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.actionInProgress = true;

            var newSimilarSoulsListBox = new SimiarSoulsListViewFrame(
                this.soulMaster.backGroundShape,
                this.soulMaster.backGroundShape,
                this.soulMaster.defaultLayer,
                this,
                rows,
                'directJumpToSoul',
                true
            );
            newSimilarSoulsListBox.visible = false;

            this.startShapeTransferAnimation(this.soulMaster.getRect(), newSimilarSoulsListBox.getRect(), this.soulMaster.shapeFormat, newSimilarSoulsListBox);
        }
    }
,   callBackCancelFromSimilarSoulsListView: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.soulMaster.actionInProgress = false;
    }
,   createSelectedShapesMenu: function(_x, _y) {
        this.soulMaster.actionInProgress = true;
        if (!_x || !_y) {
            _x = this.soulMaster.currentActualX + (this.soulMaster.currentActualW / 2);
            _y = this.soulMaster.currentActualY + (this.soulMaster.currentActualH / 2);
        }
        var newMenu = new SelectedShapesMenuViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            0,
            0,
            0,
            0
        );
        newMenu.setActualX(_x - (newMenu.currentActualW / 2));
        newMenu.setActualY(_y - (newMenu.currentActualH / 2));
        if (newMenu.currentActualX < 0) {
            newMenu.setActualX(0);
        }
        if (newMenu.currentActualY < 0) {
            newMenu.setActualY(0);
        }
        if (newMenu.currentActualX2 > this.soulMaster.backGroundShape.currentActualW) {
            newMenu.setActualX(this.soulMaster.backGroundShape.currentActualW - newMenu.currentActualW);
        }
        if (newMenu.currentActualY2 > this.soulMaster.backGroundShape.currentActualH) {
            newMenu.setActualY(this.soulMaster.backGroundShape.currentActualH - newMenu.currentActualH);
        }
        newMenu.onMoveToTop();
        newMenu.registerDrawBuffer();
        this.soulMaster.registerDrawBuffer();
        this.soulMaster.menu = newMenu;
    }
,   createViewModeMenu: function(_x, _y, _view) {
        this.soulMaster.actionInProgress = true;
        if (!_x || !_y) {
            _x = this.soulMaster.currentActualX + (this.soulMaster.currentActualW / 2);
            _y = this.soulMaster.currentActualY + (this.soulMaster.currentActualH / 2);
        }
        var newMenu = new ViewModeMenuViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            0,
            0,
            0,
            0,
            _view
        );
        newMenu.setActualX(_x - (newMenu.currentActualW / 2));
        newMenu.setActualY(_y - (newMenu.currentActualH / 2));
        if (newMenu.currentActualX < 0) {
            newMenu.setActualX(0);
        }
        if (newMenu.currentActualY < 0) {
            newMenu.setActualY(0);
        }
        if (newMenu.currentActualX2 > this.soulMaster.backGroundShape.currentActualW) {
            newMenu.setActualX(this.soulMaster.backGroundShape.currentActualW - newMenu.currentActualW);
        }
        if (newMenu.currentActualY2 > this.soulMaster.backGroundShape.currentActualH) {
            newMenu.setActualY(this.soulMaster.backGroundShape.currentActualH - newMenu.currentActualH);
        }
        newMenu.onMoveToTop();
        newMenu.registerDrawBuffer();
        this.soulMaster.registerDrawBuffer();
        this.soulMaster.menu = newMenu;
    }
,   switchAnimationWhenSavingXandY: function() {
        this.soulMaster.animateWhenSavingXandY = !this.soulMaster.animateWhenSavingXandY;
    }
,   generateImage: function() {
        var topViewFrame = this.soulMaster.selectedShapesAction.getTopViewFrame();
        if (topViewFrame === null) {
            return;
        }
        var rect = topViewFrame.view.getWholeRect();
        if (rect === null) {
            return;
        }
        

        rect.x = rect.x * topViewFrame.view.getActualZoom();
        rect.y = rect.y * topViewFrame.view.getActualZoom();
        rect.x2 = rect.x2 * topViewFrame.view.getActualZoom();
        rect.y2 = rect.y2 * topViewFrame.view.getActualZoom();

        var newPage = window.open("", "", "width=" + this.soulMaster.targetBackGround.bottomLayer.width / 2 + ",height=" + this.soulMaster.targetBackGround.bottomLayer.height / 2);
        newPage.document.open();
        newPage.document.writeln('<html><head><title>Save this page as image file<\/title><\/head><body>');
        newPage.document.writeln('<canvas id="new_image" draggable="false" style="border:0px solid gray;background-color:transparent;">');
        newPage.document.writeln('<\/body><\/html>');
        newPage.document.close();

        canvasManager.extend2DContext(newPage);

        var newImage = newPage.document.getElementById('new_image');
        newImage.style.position = 'absolute';
        newImage.style.display = 'block';
        newImage.style.border = '0px solid gray';
        newImage.style.backgroundColor = 'transparent';
        newImage.style.top = 0;
        newImage.style.left = 0;
        newImage.clientTop = 0;
        newImage.clientLeft = 0;
        newImage.width = rect.x2 - rect.x;
        newImage.height = rect.y2 - rect.y;
        newImage.style.width = rect.x2 - rect.x;
        newImage.style.height = rect.y2 - rect.y;

        toolBox.rectForAdjustingTempPos = rect;
        topViewFrame.view.generateImage(newImage);
        toolBox.rectForAdjustingTempPos = null;

/*
        this.soulMaster.targetBackGround.tempLayer.getContext('2d').drawImage(this.soulMaster.targetBackGround.bottomLayer, 0, 0, this.soulMaster.targetBackGround.bottomLayer.width, this.soulMaster.targetBackGround.bottomLayer.height);
        this.soulMaster.targetBackGround.tempLayer.getContext('2d').drawImage(this.soulMaster.targetBackGround.middleLayer, 0, 0, this.soulMaster.targetBackGround.middleLayer.width, this.soulMaster.targetBackGround.middleLayer.height);
        this.soulMaster.targetBackGround.tempLayer.getContext('2d').drawImage(this.soulMaster.targetBackGround.topLayer, 0, 0, this.soulMaster.targetBackGround.topLayer.width, this.soulMaster.targetBackGround.topLayer.height);
        newImage.getContext('2d').drawImage(this.soulMaster.targetBackGround.tempLayer, 0, 0, this.soulMaster.targetBackGround.tempLayer.width, this.soulMaster.targetBackGround.tempLayer.height);
*/
    }
,   resetAll: function() {
        this.soulMaster.targetBackGround.clearSelectedShapes();
        this.soulMaster.targetBackGround.reset();
    }
,   createSaveAndLoadMenu: function() {
        this.soulMaster.actionInProgress = true;
        var newMenu = new SaveAndLoadMenuViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer
        );
        newMenu.onMoveToTop();
        newMenu.registerDrawBuffer();
        this.soulMaster.registerDrawBuffer();
        this.soulMaster.menu = newMenu;
    }
,   exportAndImportDataFromSerializedTextStart: function() {
        this.soulMaster.actionInProgress = true;

        var newTextBox = new ExportAndImportTextBoxFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer
        );
        newTextBox.visible = false;

        this.startShapeTransferAnimation(this.soulMaster.getRect(), newTextBox.getRect(), this.soulMaster.shapeFormat, newTextBox);
    }
,   loadDataFromSerializedText: function(_text) {
        this.soulMaster.doAnimation = false;
        this.resetAll();
        this.soulMaster.dataAccessAction.loadDataFromSerializedText(_text);
        this.soulMaster.targetBackGround.showData();
        this.soulMaster.doAnimation = true;
        ioJobController.finishPreparing(this.soulMaster.targetBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
    }
,   importDataFromSerializedTextAsBody: function(_text) {
        this.soulMaster.doAnimation = false;
        this.resetAll();
        this.soulMaster.dataAccessAction.importDataFromSerializedTextAsBody(_text);
        this.soulMaster.targetBackGround.showData();
        this.soulMaster.doAnimation = true;
        ioJobController.finishPreparing(this.soulMaster.targetBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
    }
,   save: function() {
        if (this.soulMaster.savedMapName === '') {
            this.saveAs();
        }
        else {
            try {
                var jsonpText = toolBox.getCompressedSaveDataAsJavaScript(this.soulMaster.targetBackGround.text, this.soulMaster.dataAccessAction.saveDataToSerializedText());
                toolBox.setItemInStorage(this.soulMaster.savedMapName, jsonpText);
                alert(translator.t('このブラウザのストレージに保存しました。'));
            }
            catch (e) {
                alert(translator.t('エラーが発生しました。保存できませんでした。'));
            }
        }
        this.soulMaster.backGroundShape.registerDrawBuffer();
    }
,   saveAs: function() {
        var savedMapName = prompt(translator.t('名前をつけて保存'), this.soulMaster.targetBackGround.text);
        savedMapName = toolBox.trim(toolBox.nvl(savedMapName, ''));
        if (savedMapName !== '') {
            var save = false;
            var savedMapList = this.getSavedMapList();
            if (toolBox.arrayContains(savedMapList, savedMapName) !== -1) {
                var answer = confirm(savedMapName + translator.t('\nはこのブラウザのストレージに既に存在します。上書きしますか？'));
                if (answer === true) {
                    save = true;
                }
            }
            else {
                save = true;
            }
            if (save === true) {
                try {
                    var jsonpText = toolBox.getCompressedSaveDataAsJavaScript(this.soulMaster.targetBackGround.text, this.soulMaster.dataAccessAction.saveDataToSerializedText());
                    toolBox.setItemInStorage(savedMapName, jsonpText);
                    this.soulMaster.savedMapName = savedMapName;
                    toolBox.addToArrayIfNotExists(savedMapList, savedMapName);
                    this.setSavedMapList(savedMapList);
                    alert(translator.t('このブラウザのストレージに保存しました。'));
                }
                catch (e) {
                    alert(translator.t('エラーが発生しました。保存できませんでした。'));
                }
            }
        }
        this.soulMaster.backGroundShape.registerDrawBuffer();
    }
,   loadMapStart: function() {
        if (toolBox.keyExistsInStorage(toolBox.SAVED_MAP_LIST_KEY) === false) {
            alert(translator.t('保存されたMAPがありません'));
            return;
        }
        var savedMapList = this.getSavedMapList();
        if (savedMapList.length > 0) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.actionInProgress = true;

            var newSavedMapListBox = new SavedMapListViewFrame(
                this.soulMaster.backGroundShape,
                this.soulMaster.backGroundShape,
                this.soulMaster.defaultLayer,
                this
            );
            newSavedMapListBox.visible = false;

            this.startShapeTransferAnimation(this.soulMaster.getRect(), newSavedMapListBox.getRect(), this.soulMaster.shapeFormat, newSavedMapListBox);
        }
    }
,   callBackFromSavedMapListView: function(_selectedSavedMap, _arg1, _arg2, _arg3, _arg4, _arg5) {
        var savedMapJsonp = toolBox.getItemFromStorage(_selectedSavedMap);
        toolBox.executeJavaScript(savedMapJsonp);
        this.soulMaster.savedMapName = _selectedSavedMap;
    }
,   callBackCancelFromSavedMapListView: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.soulMaster.actionInProgress = false;
    }
,   getSavedMapList: function() {
        var savedMapList = new Array();
        var savedMapListString = toolBox.getItemFromStorage(toolBox.SAVED_MAP_LIST_KEY);
        if (savedMapListString && toolBox.trim(savedMapListString) !== '') {
            savedMapList = savedMapListString.split(toolBox.SAVED_MAP_LIST_DELIMITER);
        }
        return savedMapList;
    }
,   setSavedMapList: function(_savedMapList) {
        toolBox.setItemInStorage(toolBox.SAVED_MAP_LIST_KEY, _savedMapList.join(toolBox.SAVED_MAP_LIST_DELIMITER));
    }
,   searchInputInTopView: function() {
        var topViewFrame = this.soulMaster.selectedShapesAction.getTopViewFrame();
        if (topViewFrame !== null) {
            topViewFrame.searchControl.inputSearchWord();
        }
    }
,   searchNextInTopView: function() {
        var topViewFrame = this.soulMaster.selectedShapesAction.getTopViewFrame();
        if (topViewFrame !== null) {
            if (topViewFrame.searchControl.opened === true) {
                topViewFrame.searchControl.searchNext();
            }
            else {
                topViewFrame.searchControl.inputSearchWord();
            }
        }
    }
,   searchPreviousInTopView: function() {
        var topViewFrame = this.soulMaster.selectedShapesAction.getTopViewFrame();
        if (topViewFrame !== null) {
            if (topViewFrame.searchControl.opened === true) {
                topViewFrame.searchControl.searchPrevious();
            }
        }
    }
,   undo: function() {
        this.soulMaster.doAnimation = false;
        this.soulMaster.dataAccessAction.undo();
        this.soulMaster.mainAction.resetAll();
        this.soulMaster.targetBackGround.showData();
        this.soulMaster.doAnimation = true;
        ioJobController.finishPreparing(this.soulMaster.targetBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
    }
,   redo: function() {
        this.soulMaster.doAnimation = false;
        this.soulMaster.dataAccessAction.redo();
        this.soulMaster.mainAction.resetAll();
        this.soulMaster.targetBackGround.showData();
        this.soulMaster.doAnimation = true;
        ioJobController.finishPreparing(this.soulMaster.targetBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
    }
,   splash: function() {
        new SplashAnimation(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape.topLayer,
            this.soulMaster.backGroundShape.w / 2 - 300,
            this.soulMaster.backGroundShape.h / 2 - 60,
            600,
            120
        ).startAnimation();
    }
,   setLanguage: function(_language) {
        if (translator.language === _language) {
            return;
        }
        this.closeAll();
        var backGroundText = this.soulMaster.targetBackGround.text;
        if (backGroundText === translator.t(toolBox.NEW_MAP_TEXT)) {
            translator.language = _language;
            backGroundText = translator.t(toolBox.NEW_MAP_TEXT);
        }
        else {
            translator.language = _language;
        }
        this.soulMaster.targetBackGround.text = backGroundText;
        toolBox.setCookie('language',_language);
        for (var i=0;i<this.soulMaster.targetBackGround.childShapes.length;i++) {
            if (this.soulMaster.targetBackGround.childShapes[i].isEntityViewFrame) {
                this.soulMaster.targetBackGround.childShapes[i].setViewTitle();
            }
        }
        this.soulMaster.targetBackGround.registerDrawBuffer();
        this.soulMaster.backGroundShape.registerDrawBuffer();
    }
,   showProgress: function(_progressInPercent) {
        var maxWidth = 100;
        var ctx = this.soulMaster.parentShape.topLayer.ctx;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        var x = (this.soulMaster.targetBackGround.w / 2) - (maxWidth / 2);
        var w = maxWidth;
        var y = (this.soulMaster.targetBackGround.h / 2) - (maxWidth / 2);
        var h = maxWidth;
        
        ctx.strokeRRect(x, y, w, h, 5);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRRect(x, y, maxWidth * (_progressInPercent / 100), h, 5);
    }
,   calcTextWidthAndHeight: function(_shapeFormat, _text) {
        var ctx = this.soulMaster.targetBackGround.topLayer.ctx;
        var rect = new Rect(0, 0, 0, 0);
        if (toolBox.trim(_text) === '') {
            return rect;
        }
        ctx.font = _shapeFormat.getFont(1);
        var textLines = _text.split('\n');
        for (var i=0;i<textLines.length;i++) {
            if (rect.w < ctx.measureText(textLines[i]).width) {
                rect.w = ctx.measureText(textLines[i]).width;
            }
        }
        rect.h = _shapeFormat.textSize * textLines.length * 1.5;
        return rect;
    }
});
