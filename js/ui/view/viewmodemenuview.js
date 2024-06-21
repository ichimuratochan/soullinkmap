var ViewModeMenuView = function(){this.initialize.apply(this, arguments);}
ViewModeMenuView.prototype = toolBox.extend(new MenuViewBase(), {
    targetView      : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _view) {
        if (!_parentShape) return;
        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'ViewModeMenuView';
        this.showDragScrollArea = false;
        this.text = '';
        this.targetView = _view;
        this.alive = true;
    }
,   initMenuItems: function() {
        var item = null;

        this.menuItemWidth = 60;
        this.menuItemHeight = 60;

        var itemX = this.menuItemMargin;
        item = this.addMenuItem(itemX, this.menuItemMargin, this.menuCommandEditView, translator.t('編集\nビュー'));
        itemX += this.menuItemWidth + this.menuItemMargin;
        item = this.addMenuItem(itemX, this.menuItemMargin, this.menuCommandBirdView, translator.t('俯瞰\nビュー'));
        itemX += this.menuItemWidth + this.menuItemMargin;
        item = this.addMenuItem(itemX, this.menuItemMargin, this.menuCommandLinkView, translator.t('Link\nビュー'));

        itemX = this.menuItemMargin;
        var itemY = this.menuItemMargin + this.menuItemHeight;

        this.menuItemWidth = 95;
        this.menuItemHeight = 25;
        
        item = this.addSettingMenuItem(itemX, itemY, this.menuCommandSaveAsImage, translator.t('画像で保存'));
        itemX += this.menuItemWidth;
        item = this.addSettingMenuItem(itemX, itemY, this.menuCommandViewSetting, translator.t('ビュー設定'));
    }
,   addMenuItem: function(_x, _y, _menuCommand, _menuCommandName) {
        var newItem = new SpecialMenuItem(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            this.menuItemWidth,
            this.menuItemHeight
        );
        newItem.setMenuCommand(_menuCommand, _menuCommandName);
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   addSettingMenuItem: function(_x, _y, _menuCommand, _menuCommandName) {
        var newItem = new SpecialMenuItem(
            this,
            this,
            this.defaultLayer,
            _x + 2,
            _y + 4,
            this.menuItemWidth - 4,
            this.menuItemHeight - 6
        );
        newItem.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        newItem.shapeFormat.textSize = 10;
        newItem.setMenuCommand(_menuCommand, _menuCommandName);
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   menuCommandEditView: function() {
        this.soulMaster.mainAction.closeAll();
        this.parentShape.targetView.changeViewMode(toolBox.VIEW_MODE_EDITVIEW);
    }
,   menuCommandBirdView: function() {
        this.soulMaster.mainAction.closeAll();
        this.parentShape.targetView.changeViewMode(toolBox.VIEW_MODE_BIRDVIEW);
    }
,   menuCommandLinkView: function() {
        this.soulMaster.mainAction.closeAll();
        this.parentShape.targetView.changeViewMode(toolBox.VIEW_MODE_LINKVIEW);
    }
,   menuCommandSaveAsImage: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.generateImage();
    }
,   menuCommandViewSetting: function() {
        this.soulMaster.selectedShapesAction.popupViewSetting();
    }
});
