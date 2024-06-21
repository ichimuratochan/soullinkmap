var SavedMapListView = function(){this.initialize.apply(this, arguments);}
SavedMapListView.prototype = toolBox.extend(new MenuViewBase(), {
    savedMapList            : null
,   callBackTarget          : null
,   arg1                    : null
,   arg2                    : null
,   arg3                    : null
,   arg4                    : null
,   arg5                    : null
,   deleteButttonWidth      : 50
,   menuItemWidth           : 441
,   selectedSavedMap        : ''
,   deleteButtons           : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;
        
        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;
        this.deleteButtons = new Array();

        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'SavedMapListView';

        this.menuItems[0].select(0, 0, false);
        this.menuItems[0].menuCommand();

        this.text = ' ';

        this.alive = true;
    }
,   initMenuItems: function() {
        this.savedMapList = this.soulMaster.mainAction.getSavedMapList();
        this.clearMenuItems();
        var itemY = this.menuItemMargin;
        for (var i=0;i<this.savedMapList.length;i++) {
            this.addSavedMapItem(this.menuItemMargin, itemY, this.savedMapList[i]);
            itemY += this.menuItemHeight;
        }
    }
,   clearMenuItems: function() {
        while (this.menuItems.length > 0) {
            this.menuItems[this.menuItems.length-1].destroy();
            this.menuItems.length = this.menuItems.length - 1;
        }
        while (this.deleteButtons.length > 0) {
            this.deleteButtons[this.deleteButtons.length-1].destroy();
            this.deleteButtons.length = this.deleteButtons.length - 1;
        }
    }
,   addSavedMapItem: function(_x, _y, _savedMapName) {
        var newButton = new Button(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            this.deleteButttonWidth,
            this.menuItemHeight
        )
        newButton.text = translator.t('削除');
        newButton.tag = _savedMapName;
        newButton.setClickCommand(this.clickCommandDelete);
        toolBox.addToArray(this.deleteButtons, newButton);

        var newItem = new OmittedTextMenuItem(
            this,
            this,
            this.defaultLayer,
            _x + this.deleteButttonWidth + 5,
            _y,
//            this.menuItemWidth - (this.deleteButttonWidth + 5),
            this.w - (this.deleteButttonWidth + 5 + 31),
            this.menuItemHeight
        );
//        newItem.highLightedStyle = '#e6e6fa';
        newItem.notHighLightedStyle = '#e6e6fa';
        newItem.setMenuCommand(this.menuCommandSelectSavedMap, _savedMapName);
        newItem.tag = _savedMapName;
        toolBox.addToArray(this.menuItems, newItem);
    }
,   clickCommandDelete: function() {
        var deleteTargetMap = this.tag;
        var answer = confirm(translator.t('MAPを削除しますか？'));
        if (answer === true) {
            this.parentShape.savedMapList = toolBox.arrayWithout(this.parentShape.savedMapList, deleteTargetMap);
            this.parentShape.soulMaster.mainAction.setSavedMapList(this.parentShape.savedMapList);
            
            if (this.parentShape.savedMapList.length > 0) {
                this.parentShape.initMenuItems();
            }
            else {
                this.parentShape.cancel();
            }
        }
        this.parentShape.containerShape.registerDrawBuffer();
    }
,   menuCommandSelectSavedMap: function() {
        this.parentShape.selectedSavedMap = this.tag;
    }
,   selectNextUpwardMenuItem: function() {
        var selectedButton = null;;
        for (var i=0;i<this.deleteButtons.length;i++) {
            if (i > 0 && this.deleteButtons[i].isSelected() === true) {
                selectedButton = this.deleteButtons[i-1];
                break;
            }
        }
        if (selectedButton != null) {
            selectedButton.select(0, 0, false);
            this.scrollToShowSelectedButton();
            return;
        }

        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (i > 0 && this.menuItems[i].isSelected() === true) {
                selectedMenuItem = this.menuItems[i-1]
                break;
            }
        }
        if (selectedMenuItem != null) {
            selectedMenuItem.select(0, 0, false);
            this.scrollToShowSelectedMenuItem();
            return;
        }
    }
,   selectNextDownwardMenuItem: function() {
        var selectedButton = null;;
        for (var i=0;i<this.deleteButtons.length;i++) {
            if (i < this.deleteButtons.length - 1 && this.deleteButtons[i].isSelected() === true) {
                selectedButton = this.deleteButtons[i+1];
                break;
            }
        }
        if (selectedButton != null) {
            selectedButton.select(0, 0, false);
            this.scrollToShowSelectedButton();
            return;
        }

        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (i < this.menuItems.length - 1 && this.menuItems[i].isSelected() === true) {
                selectedMenuItem = this.menuItems[i+1]
                break;
            }
        }
        if (selectedMenuItem != null) {
            selectedMenuItem.select(0, 0, false);
            this.scrollToShowSelectedMenuItem();
            return;
        }
    }
,   selectNextLeftwardMenuItem: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                this.deleteButtons[i].select(0, 0, false);
                return;
            }
        }
    }
,   selectNextRightwardMenuItem: function() {
        for (var i=0;i<this.deleteButtons.length;i++) {
            if (this.deleteButtons[i].isSelected() === true) {
                this.menuItems[i].select(0, 0, false);
                return;
            }
        }
    }
,   scrollToShowSelectedButton: function() {
        var selectedButton = null;
        for (var i=0;i<this.deleteButtons.length;i++) {
            if (this.deleteButtons[i].isSelected() === true) {
                selectedButton = this.deleteButtons[i];
                break;
            }
        }
        if (selectedButton != null) {
            if (this.innerOffsetY + selectedButton.y < 0) {
                this.zoomToScroll(0, -((this.innerOffsetY + selectedButton.y) - this.menuItemMargin));
            }
            else if ((this.innerOffsetY + selectedButton.y + selectedButton.h) > this.h) {
                this.zoomToScroll(0, this.h - (this.innerOffsetY + selectedButton.y + selectedButton.h + this.menuItemMargin));
            }
        }
    }
,   doMenuAction: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                this.menuItems[i].menuCommand();
                this.save();
                return;
            }
            if (this.deleteButtons[i].isSelected() === true) {
                this.deleteButtons[i].clickCommand();
            }
        }
    }
,   save: function() {
        this.callBackTarget.callBackFromSavedMapListView(this.selectedSavedMap, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
,   cancel: function() {
        if (this.callBackTarget.callBackCancelFromSavedMapListView) {
            this.callBackTarget.callBackCancelFromSavedMapListView(this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        }
        this.parentShape.destroy();
    }
});
