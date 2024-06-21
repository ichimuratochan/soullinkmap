var SimilarSoulsListView = function(){this.initialize.apply(this, arguments);}
SimilarSoulsListView.prototype = toolBox.extend(new MenuViewBase(), {
    editShapeFormat         : null
,   similarSoulRows         : null
,   callBackTarget          : null
,   arg1                    : null
,   arg2                    : null
,   arg3                    : null
,   arg4                    : null
,   arg5                    : null
,   detailButttonWidth      : 50
,   menuItemWidth           : 240
,   selectedSoulId          : ''
,   detailButtons           : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _similarSoulRows, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;
        
        this.similarSoulRows = _similarSoulRows;
        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;
        this.detailButtons = new Array();

        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'SimilarSoulsListView';

        this.menuItems[0].select(0, 0, false);
        this.menuItems[0].menuCommand();

        this.text = ' ';

        this.alive = true;
    }
,   initMenuItems: function() {
        var itemY = this.menuItemMargin;
        for (var i=0;i<this.similarSoulRows.length;i++) {
            this.addSimilarSoulRowItem(this.menuItemMargin, itemY, this.similarSoulRows[i]);
            itemY += this.menuItemHeight;
        }
    }
,   addSimilarSoulRowItem: function(_x, _y, _similarSoulRow) {
        var newButton = new Button(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            this.detailButttonWidth,
            this.menuItemHeight
        )
        newButton.text = translator.t('詳細');
        newButton.tag = _similarSoulRow['SOUL_ID'];
        newButton.setClickCommand(this.clickCommandDetail);
        toolBox.addToArray(this.detailButtons, newButton);

        var newItem = new OmittedTextMenuItem(
            this,
            this,
            this.defaultLayer,
            _x + this.detailButttonWidth + 5,
            _y,
            this.menuItemWidth - (this.detailButttonWidth + 5),
            this.menuItemHeight
        );
        newItem.setMenuCommand(this.menuCommandSelectSoul, _similarSoulRow['TEXT']);
        newItem.tag = _similarSoulRow['SOUL_ID'];
        if (this.soulMaster.dataAccessAction.isSpecialSoulId(newItem.tag) === true) {
            newItem.shapeFormat.textDescription = 'bold';
        }
        toolBox.addToArray(this.menuItems, newItem);
    }
,   clickCommandDetail: function() {
        this.soulMaster.selectedShapesAction.showDetailBirdViewStart(this, this.tag);
    }
,   menuCommandSelectSoul: function() {
        this.parentShape.selectedSoulId = this.tag;
    }
,   selectNextUpwardMenuItem: function() {
        var selectedButton = null;;
        for (var i=0;i<this.detailButtons.length;i++) {
            if (i > 0 && this.detailButtons[i].isSelected() === true) {
                selectedButton = this.detailButtons[i-1];
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
        for (var i=0;i<this.detailButtons.length;i++) {
            if (i < this.detailButtons.length - 1 && this.detailButtons[i].isSelected() === true) {
                selectedButton = this.detailButtons[i+1];
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
                this.detailButtons[i].select(0, 0, false);
                return;
            }
        }
    }
,   selectNextRightwardMenuItem: function() {
        for (var i=0;i<this.detailButtons.length;i++) {
            if (this.detailButtons[i].isSelected() === true) {
                this.menuItems[i].select(0, 0, false);
                return;
            }
        }
    }
,   scrollToShowSelectedButton: function() {
        var selectedButton = null;
        for (var i=0;i<this.detailButtons.length;i++) {
            if (this.detailButtons[i].isSelected() === true) {
                selectedButton = this.detailButtons[i];
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
            if (this.detailButtons[i].isSelected() === true) {
                this.detailButtons[i].clickCommand();
            }
        }
    }
,   save: function() {
        this.callBackTarget.callBackFromSimilarSoulsListView(this.selectedSoulId, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
,   cancel: function() {
        if (this.callBackTarget.callBackCancelFromSimilarSoulsListView) {
            this.callBackTarget.callBackCancelFromSimilarSoulsListView(this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        }
        this.parentShape.destroy();
    }
});
