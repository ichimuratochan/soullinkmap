var SelectedShapesMenuView = function(){this.initialize.apply(this, arguments);}
SelectedShapesMenuView.prototype = toolBox.extend(new MenuViewBase(), {
    initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'SelectedShapeMenuView';
        this.text = 'menu items';

        this.alive = true;
    }
,   initMenuItems: function() {
        var itemY = this.menuItemMargin;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandOpenNewViewOfSelectedBody, translator.t('新規ビューで開く'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateShape, translator.t('Body作成'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandEditSelectedShapes, translator.t('編集'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandEditStyle, translator.t('スタイル'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandEditImageOfSelectedShape, translator.t('画像設定'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandEditUrlOfSelectedShape, translator.t('URL設定'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandCopy, translator.t('コピー'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandCut, translator.t('切り取り'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandPaste, translator.t('貼り付け'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandDelete, translator.t('削除'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandIndependSoul, translator.t('Soul共有解除'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandSelectAll, translator.t('全て選択'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandAdjustToViewAll, translator.t('ビュー内全体表示'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateMultipleEntities, translator.t('Body9個生成'));
//        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandDrawLineBetweenSelectedShapes, translator.t('選択Body間を結線'));
//        itemY += this.menuItemHeight;
//        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandChangeShapeType, translator.t('長方形⇔角丸長方形'));
//        itemY += this.menuItemHeight;
//        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandDockViews, translator.t('ビュードッキング'));
//        itemY += this.menuItemHeight;
//        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandUndockViews, translator.t('ビュードッキング解除'));
    }
,   menuCommandCreateShape: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.selectedShapesAction.createEntity();
        this.soulMaster.dataAccessAction.saveToData();
    }
,   menuCommandEditSelectedShapes: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length > 0) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.selectedShapesAction.editTextOfSelectedShapesStart();
        }
    }
,   menuCommandEditStyle: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length >= 1) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.selectedShapesAction.editStyleStart();
        }
    }
,   menuCommandDelete: function() {
        this.soulMaster.selectedShapesAction.destroySelectedShape();
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.dataAccessAction.saveToData();
    }
,   menuCommandCopy: function() {
        this.soulMaster.selectedShapesAction.copySelectedEntities();
        this.soulMaster.mainAction.closeAll();
    }
,   menuCommandCut: function() {
        this.soulMaster.selectedShapesAction.copySelectedEntities();
        this.soulMaster.mainAction.closeAll();
    }
,   menuCommandPaste: function() {
        this.soulMaster.selectedShapesAction.pasteEntities();
        this.soulMaster.mainAction.closeAll();
    }
,   menuCommandIndependSoul: function() {
        this.soulMaster.selectedShapesAction.independSelectedBodyFromSharedSouls();
        this.soulMaster.mainAction.closeAll();
    }
,   menuCommandSelectAll: function() {
        this.soulMaster.selectedShapesAction.selectAll();
        this.soulMaster.mainAction.closeAll();
    }
,   menuCommandEditImageOfSelectedShape: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.selectedShapesAction.editImageOfSelectedShapeStart();
        }
    }
,   menuCommandEditUrlOfSelectedShape: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.selectedShapesAction.editHyperLinkUrlofSelectedShapeStart();
        }
    }
,   menuCommandAdjustToViewAll: function() {
        this.soulMaster.selectedShapesAction.adjustToViewAll();
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.dataAccessAction.saveToData();
    }
,   menuCommandChangeShapeType: function() {
        this.soulMaster.selectedShapesAction.changeSelectedShapeType();
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.dataAccessAction.saveToData();
    }
,   menuCommandDrawLineBetweenSelectedShapes: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.selectedShapesAction.drawLineBetweenSelectedShapes();
        this.soulMaster.dataAccessAction.saveToData();
    }
,   menuCommandOpenNewViewOfSelectedBody: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.selectedShapesAction.createNewViewOfSelectedBody();
        this.soulMaster.dataAccessAction.saveToData();
    }
,   menuCommandCreateMultipleEntities: function() {
        this.soulMaster.selectedShapesAction.createMultipleEntities();
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.dataAccessAction.saveToData();
    }
,   menuCommandDockViews: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 2) {
            if (this.soulMaster.targetBackGround.selectedShapes[0].isEntityViewFrame &&
                this.soulMaster.targetBackGround.selectedShapes[1].isEntityViewFrame) 
            {
                this.soulMaster.selectedShapesAction.dockShapes();
                this.soulMaster.mainAction.closeAll();
                this.soulMaster.dataAccessAction.saveToData();
            }
        }
    }
,   menuCommandUndockViews: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            if (this.soulMaster.targetBackGround.selectedShapes[0].isEntityViewFrame) {
                this.soulMaster.selectedShapesAction.undockShapes();
                this.soulMaster.mainAction.closeAll();
                this.soulMaster.dataAccessAction.saveToData();
            }
        }
    }
});
