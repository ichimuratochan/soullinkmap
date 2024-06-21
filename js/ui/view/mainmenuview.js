var MainMenuView = function(){this.initialize.apply(this, arguments);}
MainMenuView.prototype = toolBox.extend(new MenuViewBase(), {
    initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'MainMenuView';
        this.text = 'menu items';

        this.alive = true;
    }
,   initMenuItems: function() {
        var itemY = this.menuItemMargin;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateEditView, translator.t('新規ビュー'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandSelectedShapeMenu, translator.t('選択中メニュー'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandRangeSelect, translator.t('範囲選択'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchAnimationWhenSavingXandY, translator.t('ポインティングアニメーションON/OFF'));
//        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandGenerateImage, translator.t('画像\n出力'));
//        itemY += this.menuItemHeight;
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandSaveAndLoad, translator.t('保存読込'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandBreakTime, translator.t('休憩１'));
        itemY += this.menuItemHeight;
        this.addMenuItem(this.menuItemMargin, itemY, this.menuCommandBreakTime2, translator.t('休憩２'));
    }
,   menuCommandCreateEditView: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.createEntityView(this.soulMaster.savedX, this.soulMaster.savedY);
    }
,   menuCommandRangeSelect: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.startRangeSelection();
    }
,   menuCommandBreakTime: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.startBreakTimeAnimation();
    }
,   menuCommandBreakTime2: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.startBreakTimeAnimation2();
    }
,   menuCommandSelectedShapeMenu: function() {
        var x = this.parentShape.currentActualX + (this.parentShape.currentActualW / 2);
        var y = this.parentShape.currentActualY + (this.parentShape.currentActualH / 2);;
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.createSelectedShapesMenu(x, y);
    }
,   menuCommandSwitchAnimationWhenSavingXandY: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.switchAnimationWhenSavingXandY();
    }
/*
,   menuCommandGenerateImage: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.generateImage();
    }
*/
,   menuCommandSaveAndLoad: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.createSaveAndLoadMenu();
    }
});
