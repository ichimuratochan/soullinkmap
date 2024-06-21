var SaveAndLoadMenuView = function(){this.initialize.apply(this, arguments);}
SaveAndLoadMenuView.prototype = toolBox.extend(new MenuViewBase(), {
    menuItemWidth       : 60
,   menuItemHeight      : 60
,   showDragScrollArea  : false
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'SaveAndLoadMenuView';
        this.text = ' ';

        this.horizontallyScrollable = false;
        this.verticallyScrollable = false;

        this.alive = true;
    }
,   initMenuItems: function() {
        var itemX = this.menuItemMargin;
        var menuItem = null;

        var newItem = this.addSaveAndLoadMenuItem(itemX, this.menuItemMargin, this.menuCommandSave, translator.t('Save'));
//        newItem.setImageUrl('img/save.png', true);
        itemX += this.menuItemWidth + this.menuItemMargin;
        newItem = this.addSaveAndLoadMenuItem(itemX, this.menuItemMargin, this.menuCommandSaveAs, translator.t('Save\nAs'));
//        newItem.setImageUrl('img/saveas.png', true);
        itemX += this.menuItemWidth + this.menuItemMargin;
        newItem = this.addSaveAndLoadMenuItem(itemX, this.menuItemMargin, this.menuCommandLoad, translator.t('Load'));
//        newItem.setImageUrl('img/open.png', true);
        itemX += this.menuItemWidth + this.menuItemMargin;
        newItem = this.addSaveAndLoadMenuItem(itemX, this.menuItemMargin, this.menuCommandSaveAndLoadDataFromSerializedTextStart, translator.t('Export\nImport'));
//        newItem.setImageUrl('img/import_export.png', true);
    }
,   addSaveAndLoadMenuItem: function(_x, _y, _menuCommand, _menuCommandName) {
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
,   menuCommandSave: function() {
        this.soulMaster.mainAction.save();
    }
,   menuCommandSaveAs: function() {
        this.soulMaster.mainAction.saveAs();
    }
,   menuCommandLoad: function() {
        this.soulMaster.mainAction.loadMapStart();
    }
,   menuCommandSaveAndLoadDataFromSerializedTextStart: function() {
        this.soulMaster.mainAction.closeAll();
        this.soulMaster.mainAction.exportAndImportDataFromSerializedTextStart();
    }
,   cancel: function() {
        this.parentShape.destroy();
        this.soulMaster.actionInProgress = false;
    }
});
