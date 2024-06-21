var SoulMaster = function(){this.initialize.apply(this, arguments);}
SoulMaster.prototype = toolBox.extend(new Shape(), {
    menu                        : null
,   editTextBox                 : null
,   inputBox                    : null
,   formatSettingBox            : null
,   colorSettingBox             : null
,   similarSoulsListBox         : null
,   savedMapListBox             : null
,   detailBirdViewBox           : null
,   linkConditionListBox        : null
,   viewSettingBox              : null
,   birdViewDirectionSettingBox : null
,   animation               : null
,   targetBackGround        : null
,   actionInProgress        : false
,   mainAction              : null
,   selectedShapesAction    : null
,   dataAccessAction        : null
,   menuIndex               : 1
,   maxMenuIndex            : 3
,   savedX                  : 0
,   savedY                  : 0
,   doAnimation             : true
,   animateWhenSavingXandY  : false
,   clipBoard               : null
,   clipBoardMode           : toolBox.CLIPBOARD_MODE_COPY
,   savedMapName            : ''
,   rangeSelectionShape     : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer) {
        Shape.prototype.initialize.apply(this,[
            _containerShape,
            _parentShape,
            _defaultLayer,
            (_parentShape.ioJobController.canvasManager.getWidth() / 2) - (toolBox.SOUL_MASTER_SIZE / 2),
            (_parentShape.ioJobController.canvasManager.getHeight() / 2) - (toolBox.SOUL_MASTER_SIZE / 2),
            toolBox.SOUL_MASTER_SIZE,// * 1.618,
            toolBox.SOUL_MASTER_SIZE
        ]);
        this.classType = 'SoulMaster';
        this.mainAction = new MainAction(this);
        this.selectedShapesAction = new SelectedShapesAction(this);
        this.dataAccessAction = new DataAccessAction(this);
        this.clipBoard = new Array();

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.fillStyle = '#696969';
//        this.shapeFormat.fillStyle = '#00bfff';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.textVerticalAlign = 'middle';
//        this.shapeFormat.textFont = 'Arial Black';
        this.shapeFormat.textBaseline = 'middle'
        this.shapeFormat.textSize = 30;
        this.shapeFormat.textFillStyle = '#b0c4de';
        this.shapeFormat.selectedStrokeStyle = this.shapeFormat.strokeStyle;
        this.text = ' ';
        this.setImageUrl('img/logo.jpg', true);
        this.alive = true;
    }
,   changeMouseCursor: function() {
        this.ioJobController.setMouseCursor('default');
    }
,   registerDrawBuffer: function() {
        this.ioJobController.registerDrawShape(this);
        this.syncDockedShapePosition(false);
        for (var i=0;i<this.childShapes.length;i++) {
            this.childShapes[i].syncPositionWithParentShape(true);
        }
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        if (this.currentActualX < 0) {
            this.setActualX(0);
        }
        else if (this.currentActualX2 > this.backGroundShape.currentActualW) {
            var x = this.backGroundShape.currentActualW - this.currentActualW;
            this.setActualX(x);
        }
        if (this.currentActualY < 0) {
            this.setActualY(0);
        }
        else if (this.currentActualY2 > this.backGroundShape.currentActualH) {
            var y = this.backGroundShape.currentActualH - this.currentActualH;
            this.setActualY(y);
        }
    }
,   commandDrop: function(_x, _y) {
        if (_x === toolBox.savedMouseX && _y === toolBox.savedMouseY) {
            this.switchVisibilityOfSoulMasterMenu();
        }
    }
,   move: function(_moveX, _moveY) {
        this.mainAction.closeAll();
        this.setActualX(this.currentActualX + _moveX);
        if (this.currentActualX < 0) {
            this.setActualX(0);
        }
        else if (this.currentActualX > this.backGroundShape.currentActualW - this.currentActualW) {
            this.setActualX(this.backGroundShape.currentActualW - this.currentActualW);
        }
        this.setActualY(this.currentActualY + _moveY);
        if (this.currentActualY < 0) {
            this.setActualY(0);
        }
        else if (this.currentActualY > this.backGroundShape.currentActualH - this.currentActualH) {
            this.setActualY(this.backGroundShape.currentActualH - this.currentActualH);
        }
        this.registerDrawBuffer();
        this.syncDockedShapePosition(true);
    }
,   hit: function(_x, _y) {
        if (this.alive === false || this.isVisible() === false) {
            return false;
        }
        this.defaultLayer.ctx.beginPath();
        this.defaultLayer.ctx.arc(this.currentActualX + this.currentActualW / 2, this.currentActualY + this.currentActualW / 2, this.currentActualW / 2, 0, Math.PI * 2, false);
        return this.defaultLayer.ctx.isPointInPath(_x, _y);
    }
,   innerFade: function(_ctx, _fadeLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _fadeLastPos);
        ctx.beginPath();
        ctx.strokeStyle = toolBox.INNER_FADE_COLOR;
        ctx.lineWidth = this.shapeFormat.strokeLineWidth;
        ctx.arc(toolBox.tempX + toolBox.tempW / 2, toolBox.tempY + toolBox.tempW / 2, toolBox.tempW / 2, 0, Math.PI*2, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        if (this.hasNoImage() === true) {
            ctx.beginPath();
            ctx.strokeStyle = toolBox.INNER_FADE_COLOR;
            ctx.lineWidth = this.shapeFormat.strokeLineWidth;
            ctx.arc(toolBox.tempX + toolBox.tempW / 2, toolBox.tempY + toolBox.tempW / 2, toolBox.tempW / 2, 0, Math.PI*2, false);
            ctx.fillStyle = '#E6E6FA';
            ctx.fill();
        }
        else {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = this.shapeFormat.strokeLineWidth;
            ctx.arc(toolBox.tempX + toolBox.tempW / 2, toolBox.tempY + toolBox.tempW / 2, toolBox.tempW / 2, 0, Math.PI*2, false);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(this.image, toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH);
            ctx.restore();
        }
    }
,   innerDrawIsolatedShape: function(_sourceLayer, _destinationLayer) {
        this.innerDraw(_destinationLayer.ctx, false);
    }
,   savePointedXandY: function() {
        this.savedX = toolBox.mouseX;
        this.savedY = toolBox.mouseY;
        if (this.animateWhenSavingXandY === true) {
            new PointingAnimation(
                this.containerShape,
                this.parentShape,
                this.backGroundShape.bottomLayer,
                toolBox.mouseX,
                toolBox.mouseY
            ).startAnimation();
        }
    }
,   switchVisibilityOfSoulMasterMenu: function() {
        if (this.dockedShapeInfos.length === 0) {
            this.initializeMenuItems();
        }
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            this.dockedShapeInfos[i].info1.visible = !this.dockedShapeInfos[i].info1.visible;
            logger.put('soulMaster - switch ' + this.dockedShapeInfos[i].info1.visible, toolBox.LOG_LEVEL_INFO);
        }
        this.parentShape.ioJobController.firstTimeMenuIconShown = true;
    }
,   initializeMenuItems: function() {
        var soulMasterMenuItem = null;
        for (var i=toolBox.DOCK_POSITION_TOP;i<=toolBox.DOCK_POSITION_TOP_LEFT_CORNER;i++) {
            soulMasterMenuItem = new SoulMasterMenuItem(this.containerShape, this.parentShape, this.defaultLayer, this.x, this.y, this.w, this.h);
            this.dockShape(soulMasterMenuItem, i);
            soulMasterMenuItem.visible = false;
        }
        this.showSoulMasterMenus();
    }
,   switchMenuForward: function() {
        this.soulMaster.menuIndex++;
        if (this.soulMaster.menuIndex > this.soulMaster.maxMenuIndex) {
            this.soulMaster.menuIndex = 1;
        }
        this.soulMaster.showSoulMasterMenus();
    }
,   switchMenuBackward: function() {
        this.soulMaster.menuIndex--;
        if (this.soulMaster.menuIndex < 1) {
            this.soulMaster.menuIndex = this.soulMaster.maxMenuIndex;
        }
        this.soulMaster.showSoulMasterMenus();
    }
,   getMenuMode: function() {
        if (this.targetBackGround.childShapes.length === 0) {
            return toolBox.MENUMODE_BACKGROUND;
        }
        else {
            var topview = this.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview.isEntityViewFrame) {
                if (topview.getViewMode() === toolBox.VIEW_MODE_EDITVIEW) {
                    if (topview.isEntitySelected() === true) {
                        return toolBox.MENUMODE_EDITVIEW_SELECTED;
                    }
                    else {
                        return toolBox.MENUMODE_EDITVIEW;
                    }
                }
                else if (topview.getViewMode() === toolBox.VIEW_MODE_BIRDVIEW) {
                    if (topview.isEntitySelected() === true) {
                        return toolBox.MENUMODE_BIRDVIEW_SELECTED;
                    }
                    else {
                        return toolBox.MENUMODE_BIRDVIEW;
                    }
                }
                else if (topview.getViewMode() === toolBox.VIEW_MODE_LINKVIEW) {
                    if (topview.isEntitySelected() === true) {
                        return toolBox.MENUMODE_LINKVIEW_SELECTED;
                    }
                    else {
                        return toolBox.MENUMODE_LINKVIEW;
                    }
                }
            }
            else {
                return toolBox.MENUMODE_BACKGROUND;
            }
        }
    }
,   showSoulMasterMenus: function() {
        var menuMode = this.getMenuMode();
        var soulMasterMenuItem = null;
        if (menuMode === toolBox.MENUMODE_BACKGROUND) {
            //****************************************************************
            //BackGroundしかない場合のメニュー
            //****************************************************************
            this.maxMenuIndex = 1;
            if (this.menuIndex === 1 || this.menuIndex > this.maxMenuIndex) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandHelp, translator.t('ヘルプ'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation2, translator.t('休憩'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandEditTextOfSelectedShapesStart, translator.t('編集'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateEntityView, translator.t('新規\nビュー'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateSaveAndLoadMenu, translator.t('保存\n読込'));
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandSaveAndLoadDataFromSerializedTextStart, translator.t('保存\n読込'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandRedo, translator.t('やり\nなおす'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandUndo, translator.t('元に\n戻す'));
                    }
                }
            }
/*
            else if (this.menuIndex === 2) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation2, translator.t('休憩\n２'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(null, translator.t(''));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateEntityView, translator.t('新規\nビュー'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandUndo, translator.t('元に\n戻す'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandRedo, translator.t('やり\nなおす'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation, translator.t('休憩\n１'));
                    }
                }
            }
*/
        }
        else if (menuMode === toolBox.MENUMODE_EDITVIEW_SELECTED || menuMode === toolBox.MENUMODE_EDITVIEW) {
            //****************************************************************
            //EditViewがトップの場合かつEntityが選択されている場合のメニュー or EditViewがトップの場合かつEntityが選択されていない場合のメニュー
            //****************************************************************
            this.maxMenuIndex = 4;
            if (this.menuIndex === 1 || this.menuIndex > this.maxMenuIndex) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCutSelectedEntities, translator.t('切り取り'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCopySelectedEntities, translator.t('コピー'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandPasteEntities, translator.t('貼り付け'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandDestroySelectedShape, translator.t('削除'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandEditTextOfSelectedShapesStart, translator.t('編集'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateEntity, translator.t('作成'));
                    }
                }
            }
            else if (this.menuIndex === 2) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateMainManu, translator.t('メニュー'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateNewViewOfSelectedBody, translator.t('新規\nビューで\n開く'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandSlideForwardForTopEditView, translator.t('前\nスライド'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandSlideBackwardForTopEditView, translator.t('後\nスライド'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation, translator.t('休憩'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandReleaseSoul, translator.t('Soul\n共有解除'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandDiveToSelectedBody, translator.t('ダイブ'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandSurfaceFromCurrentBody, translator.t('浮上'));
                    }
                }
            }
            else if (this.menuIndex === 3) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation, translator.t('休憩\n１'));
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation2, translator.t('休憩\n２'));
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation2, translator.t('休憩'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandHelp, translator.t('ヘルプ'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandZoomIn, translator.t('ズーム\nイン'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandZoomOut, translator.t('ズーム\nアウト'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateSaveAndLoadMenu, translator.t('保存\n読込'));
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandSaveAndLoadDataFromSerializedTextStart, translator.t('保存\n読込'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandRedo, translator.t('やり\nなおす'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandUndo, translator.t('元に\n戻す'));
                    }
                }
            }
            else if (this.menuIndex === 4) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandEditStyleStart, translator.t('スタイル'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandSelectAll, translator.t('全て\n選択'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartRangeSelection, translator.t('範囲\n選択'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandAdjustToViewAll, translator.t('全体\n表示'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandEditImageOfSelectedShapeStart, translator.t('画像\n設定'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandEditHyperLinkUrlofSelectedShapeStart, translator.t('URL\n設定'));
                    }
                }
            }
        }
        else if (menuMode === toolBox.MENUMODE_BIRDVIEW || menuMode === toolBox.MENUMODE_BIRDVIEW_SELECTED) {
            //****************************************************************
            //BirdViewがトップの場合かつEntityが選択されていない場合のメニュー or BirdViewがトップの場合かつEntityが選択されている場合のメニュー
            //****************************************************************
            this.maxMenuIndex = 4;
            if (this.menuIndex === 1 || this.menuIndex > this.maxMenuIndex) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewDirectionToUp, translator.t('上方向'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewSpaceBetweenBodiesToPlus, translator.t('間隔\n＋'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewDirectionToRight, translator.t('右方向'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewDirectionToDown, translator.t('下方向'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewDirectionToLeft, translator.t('左方向'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewSpaceBetweenBodiesToMinus, translator.t('間隔\n－'));
                    }
                }
            }
            else if (this.menuIndex === 2) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateMainManu, translator.t('メニュー'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandHelp, translator.t('ヘルプ'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandZoomIn, translator.t('ズーム\nイン'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandZoomOut, translator.t('ズーム\nアウト'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateSaveAndLoadMenu, translator.t('保存\n読込'));
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandSaveAndLoadDataFromSerializedTextStart, translator.t('保存\n読込'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandDiveToSelectedBody, translator.t('ダイブ'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandSurfaceFromCurrentBody, translator.t('浮上'));
                    }
                }
            }
            else if (this.menuIndex === 3) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandAdjustToViewAll, translator.t('全体\n表示'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCopySelectedEntities, translator.t('コピー'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateNewViewOfSelectedBody, translator.t('新規\nビューで\n開く'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation3, translator.t('休憩'));
//                        soulMasterMenuItem.setMenuCommand(null, translator.t(''));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandRedo, translator.t('やり\nなおす'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandUndo, translator.t('元に\n戻す'));
                    }
                }
            }
            else if (this.menuIndex === 4) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
//                        soulMasterMenuItem.setMenuCommand(null, translator.t('検索'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewLevelToPlus, translator.t('ビュー\nレベル\n＋'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewChildStepCountToPlus, translator.t('子階層\n＋'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewChildStepCountToMinus, translator.t('子階層\n－'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation3, translator.t('休憩'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewLevelToMinus, translator.t('ビュー\nレベル\n－'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewParentStepCountToMinus, translator.t('親階層\n－'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandChangeBirdViewParentStepCountToPlus, translator.t('親階層\n＋'));
                    }
                }
            }
        }
        else if (menuMode === toolBox.MENUMODE_LINKVIEW || menuMode === toolBox.MENUMODE_LINKVIEW_SELECTED) {
            //****************************************************************
            //LinkViewがトップの場合かつEntityが選択されていない場合のメニュー or LinkViewがトップの場合かつEntityが選択されている場合のメニュー
            //****************************************************************
            this.maxMenuIndex = 3;
            if (this.menuIndex === 1 || this.menuIndex > this.maxMenuIndex) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandDefineLinkFiltersForTopLinkView, translator.t('Link\n条件'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandLinkViewChangeStepCountToPlus, translator.t('階層\n＋'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandLinkViewChangeStepCountToMinus, translator.t('階層\n－'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCalcSpringMovementOfSelectedLinkView, translator.t('整形\n(連打)'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandSelectBodyGroupOfLinkView, translator.t('まとめて\n選択'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandLockPositionOfSelectedLinkViewEntity, translator.t('選択\nSoul\nロック'));
                    }
                }
            }
            else if (this.menuIndex === 2) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandAdjustToViewAll, translator.t('全体\n表示'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandZoomIn, translator.t('ズーム\nイン'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandZoomOut, translator.t('ズーム\nアウト'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation2, translator.t('休憩'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandDiveToSelectedBody, translator.t('ダイブ'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandSurfaceFromCurrentBody, translator.t('浮上'));
                    }
                }
            }
            else if (this.menuIndex === 3) {
                for (var i=0;i<this.dockedShapeInfos.length;i++) {
                    soulMasterMenuItem = this.dockedShapeInfos[i].info1;
                    if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP) {
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation, translator.t('休憩\n１'));
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandStartBreakTimeAnimation2, translator.t('休憩'));
                        soulMasterMenuItem.setMenuCommand(this.menuCommandHelp, translator.t('ヘルプ'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCopySelectedEntities, translator.t('コピー'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_RIGHT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateNewViewOfSelectedBody, translator.t('新規\nビューで\n開く'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuForward, translator.t('>>'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandCreateSaveAndLoadMenu, translator.t('保存\n読込'));
//                        soulMasterMenuItem.setMenuCommand(this.menuCommandSaveAndLoadDataFromSerializedTextStart, translator.t('保存\n読込'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.switchMenuBackward, translator.t('<<'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_LEFT) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandRedo, translator.t('やり\nなおす'));
                    }
                    else if (this.dockedShapeInfos[i].info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                        soulMasterMenuItem.setMenuCommand(this.menuCommandUndo, translator.t('元に\n戻す'));
                    }
                }
            }
        }
    }
,   menuCommandCreateEntityView: function() {
        this.soulMaster.mainAction.createEntityView();
    }
,   menuCommandUndo: function() {
        this.soulMaster.mainAction.undo();
    }
,   menuCommandRedo: function() {
        this.soulMaster.mainAction.redo();
    }
,   menuCommandCreateSaveAndLoadMenu: function() {
        this.soulMaster.mainAction.createSaveAndLoadMenu();
    }
,   menuCommandHelp: function() {
        this.soulMaster.mainAction.openHelp();
    }
,   menuCommandStartBreakTimeAnimation: function() {
        this.soulMaster.mainAction.startBreakTimeAnimation();
    }
,   menuCommandStartBreakTimeAnimation2: function() {
        this.soulMaster.mainAction.startBreakTimeAnimation2();
    }
,   menuCommandStartBreakTimeAnimation3: function() {
        this.soulMaster.mainAction.startBreakTimeAnimation3();
    }
,   menuCommandSelectAll: function() {
        this.soulMaster.selectedShapesAction.selectAll();
    }
,   menuCommandStartRangeSelection: function() {
        this.soulMaster.mainAction.startRangeSelection();
    }
,   menuCommandAdjustToViewAll: function() {
        this.soulMaster.selectedShapesAction.adjustToViewAll();
    }
,   menuCommandCalcSpringMovementOfSelectedLinkView: function() {
        this.soulMaster.selectedShapesAction.calcSpringMovementOfSelectedLinkView();
    }
,   menuCommandChangeBirdViewDirectionToDown: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirectionToDown();
    }
,   menuCommandChangeBirdViewDirectionToLeft: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirectionToLeft();
    }
,   menuCommandChangeBirdViewDirectionToRight: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirectionToRight();
    }
,   menuCommandChangeBirdViewDirectionToUp: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirectionToUp();
    }
,   menuCommandChangeBirdViewLevelToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewLevelToMinus();
    }
,   menuCommandChangeBirdViewLevelToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewLevelToPlus();
    }
,   menuCommandChangeBirdViewSpaceBetweenBodiesToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewSpaceBetweenBodiesToPlus();
    }
,   menuCommandChangeBirdViewSpaceBetweenBodiesToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewSpaceBetweenBodiesToMinus();
    }
,   menuCommandChangeBirdViewChildStepCountToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewChildStepCountToPlus();
    }
,   menuCommandChangeBirdViewChildStepCountToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewChildStepCountToMinus();
    }
,   menuCommandChangeBirdViewParentStepCountToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewParentStepCountToPlus();
    }
,   menuCommandChangeBirdViewParentStepCountToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewParentStepCountToMinus();
    }
,   menuCommandLinkViewChangeStepCountToPlus: function() {
        this.soulMaster.selectedShapesAction.changeLinkViewStepCountToPlus();
    }
,   menuCommandLinkViewChangeStepCountToMinus: function() {
        this.soulMaster.selectedShapesAction.changeLinkViewStepCountToMinus();
    }
,   menuCommandCopySelectedEntities: function() {
        this.soulMaster.selectedShapesAction.copySelectedEntities();
    }
,   menuCommandCutSelectedEntities: function() {
        this.soulMaster.selectedShapesAction.cutSelectedEntities();
    }
,   menuCommandCreateEntity: function() {
        this.soulMaster.selectedShapesAction.createEntity();
    }
,   menuCommandCreateNewViewOfSelectedBody: function() {
        this.soulMaster.selectedShapesAction.createNewViewOfSelectedBody();
    }
,   menuCommandDefineLinkFiltersForTopLinkView: function() {
        this.soulMaster.selectedShapesAction.defineLinkFiltersForTopLinkView();
    }
,   menuCommandDestroySelectedShape: function() {
        this.soulMaster.selectedShapesAction.destroySelectedShape();
    }
,   menuCommandReleaseSoul: function() {
        this.soulMaster.selectedShapesAction.independSelectedBodyFromSharedSouls();
    }
,   menuCommandDiveToSelectedBody: function() {
        this.soulMaster.selectedShapesAction.diveToSelectedBody();
    }
,   menuCommandEditStyleStart: function() {
        this.soulMaster.selectedShapesAction.editStyleStart();
    }
,   menuCommandEditHyperLinkUrlofSelectedShapeStart: function() {
        this.soulMaster.selectedShapesAction.editHyperLinkUrlofSelectedShapeStart();
    }
,   menuCommandEditImageOfSelectedShapeStart: function() {
        this.soulMaster.selectedShapesAction.editImageOfSelectedShapeStart();
    }
,   menuCommandEditTextOfSelectedShapesStart: function() {
        this.soulMaster.selectedShapesAction.editTextOfSelectedShapesStart();
    }
,   menuCommandLockPositionOfSelectedLinkViewEntity: function() {
        this.soulMaster.selectedShapesAction.lockPositionOfSelectedLinkViewEntity();
    }
,   menuCommandPasteEntities: function() {
        this.soulMaster.selectedShapesAction.pasteEntities();
    }
,   menuCommandSelectBodyGroupOfLinkView: function() {
        this.soulMaster.selectedShapesAction.selectBodyGroupOfLinkView();
    }
,   menuCommandSlideBackwardForTopEditView: function() {
        this.soulMaster.selectedShapesAction.slideInTheSameBodies(false);
    }
,   menuCommandSlideForwardForTopEditView: function() {
        this.soulMaster.selectedShapesAction.slideInTheSameBodies(true);
    }
,   menuCommandSurfaceFromCurrentBody: function() {
        this.soulMaster.selectedShapesAction.surfaceFromCurrentBody();
    }
,   menuCommandZoomIn: function() {
        this.soulMaster.selectedShapesAction.zoomIn();
    }
,   menuCommandZoomOut: function() {
        this.soulMaster.selectedShapesAction.zoomOut();
    }
,   menuCommandSwitchReadonlyOrEditableView: function() {
        this.soulMaster.selectedShapesAction.switchReadonlyOrEditableView();
    }
});
	