var LinkConditionListView = function(){this.initialize.apply(this, arguments);}
LinkConditionListView.prototype = toolBox.extend(new MenuViewBase(), {
    linkFilters                     : null
,   buttonWidth                     : 50
,   menuItemWidth                   : 240
,   conditionOperatorButtonWidth    : 70
,   selectedSoulId                  : ''
,   buttons                         : null
,   logicalOperatorButtons          : null
,   conditionOperatorButtons        : null
,   targetLinkConditionMenuItem     : null
,   callBackTarget      : null
,   arg1                : null
,   arg2                : null
,   arg3                : null
,   arg4                : null
,   arg5                : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultLinkFilters, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;

        this.linkFilters = new Array();
        for (var i=0;i<_defaultLinkFilters.length;i++) {
            toolBox.addToArray(this.linkFilters, _defaultLinkFilters[i].clone());
        }
        this.buttons = new Array();
        this.logicalOperatorButtons = new Array();
        this.conditionOperatorButtons = new Array();

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'LinkConditionListView';

        this.buttons[0].select(0, 0, false);
        this.text = ' ';

        this.alive = true;
    }
,   resetMenuItems: function() {
        var found = false;
        while (true) {
            found = false;
            if (this.buttons.length > 0) {
                found = true;
                this.buttons[this.buttons.length - 1].destroy();
                this.buttons.length = this.buttons.length - 1;
            }
            if (this.logicalOperatorButtons.length > 0) {
                found = true;
                this.logicalOperatorButtons[this.logicalOperatorButtons.length - 1].destroy();
                this.logicalOperatorButtons.length = this.logicalOperatorButtons.length - 1;
            }
            if (this.menuItems.length > 0) {
                found = true;
                this.menuItems[this.menuItems.length - 1].destroy();
                this.menuItems.length = this.menuItems.length - 1;
            }
            if (this.conditionOperatorButtons.length > 0) {
                found = true;
                this.conditionOperatorButtons[this.conditionOperatorButtons.length - 1].destroy();
                this.conditionOperatorButtons.length = this.conditionOperatorButtons.length - 1;
            }
            if (found === false) {
                break;
            }
        }
        this.buttons.length = 0;
        this.logicalOperatorButtons.length = 0;
        this.clearMenuItems();
        this.conditionOperatorButtons.length = 0;
    }
,   initMenuItems: function() {
        var itemY = this.menuItemMargin;
        var first = true;
        for (var i=0;i<this.linkFilters.length;i++) {
            this.addLinkConditionItem(this.menuItemMargin, itemY, this.linkFilters[i], first);
            first = false;
            itemY += this.menuItemHeight;
        }
        this.addLinkConditionItem(this.menuItemMargin, itemY, null, first);
    }
,   addLinkConditionItem: function(_x, _y, _linkFilter, _first) {
        var newButton = new Button(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            this.buttonWidth,
            this.menuItemHeight
        )
        var newLogicalOperatorButton = new Button(
            this,
            this,
            this.defaultLayer,
            newButton.x + newButton.w + 5,
            _y,
            this.buttonWidth,
            this.menuItemHeight
        )
        newLogicalOperatorButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        var newItem = new OmittedTextMenuItem(
            this,
            this,
            this.defaultLayer,
            newLogicalOperatorButton.x + newLogicalOperatorButton.w + 5,
            _y,
//            this.menuItemWidth - (this.buttonWidth + 5),
            this.w - (this.buttonWidth + 5 + this.buttonWidth + 5 + this.conditionOperatorButtonWidth + 5 + 31),
            this.menuItemHeight
        );
        var newConditionOperatorButton = new Button(
            this,
            this,
            this.defaultLayer,
            newItem.x + newItem.w + 5,
            _y,
            this.conditionOperatorButtonWidth,
            this.menuItemHeight
        )
        newConditionOperatorButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        newConditionOperatorButton.syncPositionWithParentWidth = true;
        
        newButton.tag = newItem;
        newLogicalOperatorButton.tag = newItem;
        newConditionOperatorButton.tag = newItem;

        if (_linkFilter === null) {
            newItem.setMenuCommand(null, '- - -');
            newItem.tag = null;

            newButton.setClickCommand(this.clickCommandAddFilter);
            newButton.text = translator.t('追加');
            newLogicalOperatorButton.setClickCommand(null);
            newLogicalOperatorButton.text = '- - -';
            newConditionOperatorButton.setClickCommand(null);
            newConditionOperatorButton.text = '- - -';
        }
        else {
            newItem.setMenuCommand(this.menuCommandUpdateFilter, _linkFilter.text);
            newItem.tag = _linkFilter;
            if (this.soulMaster.dataAccessAction.isSpecialSoulId(_linkFilter.soulId) === true) {
                newItem.shapeFormat.textDescription = 'bold';
            }

            newButton.setClickCommand(this.clickCommandDeleteFilter);
            newButton.text = translator.t('削除');
            if (_first === true) {
                newLogicalOperatorButton.setClickCommand(null);
                newLogicalOperatorButton.text = '- - -';
            }
            else {
                newLogicalOperatorButton.setClickCommand(this.clickCommandChangeLogicalOperator);
                newLogicalOperatorButton.text = this.getTextForLogicalOperator(_linkFilter.logicalOperator)
            }
            newConditionOperatorButton.setClickCommand(this.clickCommandChangeConditionOperator);
            newConditionOperatorButton.text = this.getTextForConditionOperator(_linkFilter.conditionOperator)
        }

        toolBox.addToArray(this.buttons, newButton);
        toolBox.addToArray(this.logicalOperatorButtons, newLogicalOperatorButton);
        toolBox.addToArray(this.menuItems, newItem);
        toolBox.addToArray(this.conditionOperatorButtons, newConditionOperatorButton);
        return newItem;
    }
,   clickCommandChangeLogicalOperator: function() {
        var menuItem = this.tag;
        var linkFilter = menuItem.tag;
        if (linkFilter.logicalOperator === toolBox.LOGICAL_OPERATOR_AND) {
            linkFilter.logicalOperator = toolBox.LOGICAL_OPERATOR_OR;
        }
        else {
            linkFilter.logicalOperator = toolBox.LOGICAL_OPERATOR_AND;
        }
        this.text = this.parentShape.getTextForLogicalOperator(linkFilter.logicalOperator);
        this.backGroundShape.registerDrawBuffer();
    }
,   getTextForLogicalOperator: function(_logicalOperator) {
        if (_logicalOperator === toolBox.LOGICAL_OPERATOR_AND) {
            return translator.t('かつ');
        }
        else {
            return translator.t('又は');
        }
    }
,   clickCommandChangeConditionOperator: function() {
        var menuItem = this.tag;
        var linkFilter = menuItem.tag;
        if (linkFilter.conditionOperator === toolBox.CONDITION_OPERATOR_EQUAL) {
            linkFilter.conditionOperator = toolBox.CONDITION_OPERATOR_NOT_EQUAL;
        }
        else {
            linkFilter.conditionOperator = toolBox.CONDITION_OPERATOR_EQUAL;
        }
        this.text = this.parentShape.getTextForConditionOperator(linkFilter.conditionOperator);
        this.backGroundShape.registerDrawBuffer();
    }
,   getTextForConditionOperator: function(_conditionOperator) {
        if (_conditionOperator === toolBox.CONDITION_OPERATOR_EQUAL) {
            return translator.t('と同じ');
        }
        else {
            return translator.t('と違う');
        }
    }
,   clickCommandAddFilter: function() {
        var menuItem = this.tag;
        var a = prompt(translator.t('Link名称を入力してください'), '');
        if (a === null || toolBox.trim(a) === '') {
            this.backGroundShape.registerDrawBuffer();
            return;
        }
        if (this.parentShape.popupSimilarSoulsForLinkCondition(toolBox.trim(a), menuItem) === false) {
            alert(translator.t('該当するLinkが見つかりません'));
        }
        this.backGroundShape.registerDrawBuffer();
    }
,   menuCommandUpdateFilter: function() {
        var a = prompt(translator.t('Link名称を入力してください'), this.text);
        if (a === null || toolBox.trim(a) === '') {
            this.backGroundShape.registerDrawBuffer();
            return;
        }
        if (this.parentShape.popupSimilarSoulsForLinkCondition(toolBox.trim(a), this) === false) {
            alert(translator.t('該当するLinkが見つかりません'));
        }
        this.backGroundShape.registerDrawBuffer();
    }
,   popupSimilarSoulsForLinkCondition: function(_text, _linkConditionMenuItem) {
        this.targetLinkConditionMenuItem = _linkConditionMenuItem;
        var rows = this.soulMaster.dataAccessAction.findSimilarSoulsByText(_text);
        if (rows.length > 0) {
            this.soulMaster.actionInProgress = true;

            var newSimilarSoulsListBox = new SimiarSoulsListViewFrame(
                this.soulMaster.backGroundShape,
                this.soulMaster.backGroundShape,
                this.soulMaster.defaultLayer,
                this,
                rows,
                'selectSimilarSoulsListForLinkCondition'
            );
            newSimilarSoulsListBox.visible = false;

            this.soulMaster.mainAction.startShapeTransferAnimation(_linkConditionMenuItem.getRect(), newSimilarSoulsListBox.getRect(), _linkConditionMenuItem.shapeFormat, newSimilarSoulsListBox);

            return true;
        }
        else {
            return false;
        }
    }
,   callBackFromSimilarSoulsListView: function(_resultSoulId, _arg1, _arg2, _arg3, _arg4, _arg5) {
        var selectedSoulId = _resultSoulId;
        var linkConditionMenuItem = this.targetLinkConditionMenuItem;
        var linkFilters = linkConditionMenuItem.parentShape.linkFilters;
        var linkFilter = linkConditionMenuItem.tag;
        if (linkFilter === null) {
            linkFilter = new FilterDefinition()
            toolBox.addToArray(linkFilters, linkFilter);
        }
        linkFilter.soulId = selectedSoulId;
        linkFilter.text = this.soulMaster.dataAccessAction.getTextOfSoulById(selectedSoulId);
        linkConditionMenuItem.parentShape.resetMenuItems();
        linkConditionMenuItem.parentShape.initMenuItems();
        for (var i=0;i<linkFilters.length;i++) {
            if (linkFilters[i] === linkFilter) {
                linkConditionMenuItem.parentShape.menuItems[i].select(0, 0, false);
                break;
            }
        }
        linkConditionMenuItem.parentShape.registerDrawBuffer();
    }
,   clickCommandDeleteFilter: function() {
        var menuItem = this.tag;
        var linkFilter = menuItem.tag;
        var targetFilger = null;
        for (var i=0;i<this.parentShape.linkFilters.length;i++) {
            if (this.parentShape.linkFilters[i] === linkFilter) {
                targetFilter = this.parentShape.linkFilters[i];
                break;
            }
        }
        if (targetFilter !== null) {
            this.parentShape.linkFilters = toolBox.arrayWithout(this.parentShape.linkFilters, targetFilter);
            this.parentShape.resetMenuItems();
            this.parentShape.initMenuItems();
            this.parentShape.backGroundShape.registerDrawBuffer();
        }
    }
,   selectNextUpwardMenuItem: function() {
        var selectedButton = null;
        for (var i=0;i<this.buttons.length;i++) {
            if (i > 0 && this.buttons[i].isSelected() === true) {
                selectedButton = this.buttons[i-1];
                break;
            }
        }
        if (selectedButton != null) {
            selectedButton.select(0, 0, false);
            this.scrollToShowSelectedButton();
            return;
        }

        var selectedLogicalOperatorButton = null;
        for (var i=0;i<this.logicalOperatorButtons.length;i++) {
            if (i > 0 && this.logicalOperatorButtons[i].isSelected() === true) {
                selectedLogicalOperatorButton = this.logicalOperatorButtons[i-1];
                break;
            }
        }
        if (selectedLogicalOperatorButton != null) {
            selectedLogicalOperatorButton.select(0, 0, false);
            this.scrollToShowSelectedLogicalOperatorButton();
            return;
        }

        var selectedMenuItem = null;
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

        var selectedConditionOperatorButton = null;
        for (var i=0;i<this.conditionOperatorButtons.length;i++) {
            if (i > 0 && this.conditionOperatorButtons[i].isSelected() === true) {
                selectedConditionOperatorButton = this.conditionOperatorButtons[i-1];
                break;
            }
        }
        if (selectedConditionOperatorButton != null) {
            selectedConditionOperatorButton.select(0, 0, false);
            this.scrollToShowSelectedConditionOperatorButton();
            return;
        }

    }
,   selectNextDownwardMenuItem: function() {
        var selectedButton = null;
        for (var i=0;i<this.buttons.length;i++) {
            if (i < this.buttons.length - 1 && this.buttons[i].isSelected() === true) {
                selectedButton = this.buttons[i+1];
                break;
            }
        }
        if (selectedButton != null) {
            selectedButton.select(0, 0, false);
            this.scrollToShowSelectedButton();
            return;
        }

        var selectedLogicalOperatorButton = null;
        for (var i=0;i<this.logicalOperatorButtons.length;i++) {
            if (i < this.logicalOperatorButtons.length - 1 && this.logicalOperatorButtons[i].isSelected() === true) {
                selectedLogicalOperatorButton = this.logicalOperatorButtons[i+1];
                break;
            }
        }
        if (selectedLogicalOperatorButton != null) {
            selectedLogicalOperatorButton.select(0, 0, false);
            this.scrollToShowSelectedLogicalOperatorButton();
            return;
        }

        var selectedMenuItem = null;
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

        var selectedConditionOperatorButton = null;
        for (var i=0;i<this.conditionOperatorButtons.length;i++) {
            if (i < this.conditionOperatorButtons.length - 1 && this.conditionOperatorButtons[i].isSelected() === true) {
                selectedConditionOperatorButton = this.conditionOperatorButtons[i+1];
                break;
            }
        }
        if (selectedConditionOperatorButton != null) {
            selectedConditionOperatorButton.select(0, 0, false);
            this.scrollToShowSelectedConditionOperatorButton();
            return;
        }
    }
,   selectNextLeftwardMenuItem: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.conditionOperatorButtons[i].isSelected() === true) {
                this.menuItems[i].select(0, 0, false);
                return;
            }
            else if (this.menuItems[i].isSelected() === true) {
                this.logicalOperatorButtons[i].select(0, 0, false);
                return;
            }
            else if (this.logicalOperatorButtons[i].isSelected() === true) {
                this.buttons[i].select(0, 0, false);
                return;
            }
        }
    }
,   selectNextRightwardMenuItem: function() {
        for (var i=0;i<this.buttons.length;i++) {
            if (this.buttons[i].isSelected() === true) {
                this.logicalOperatorButtons[i].select(0, 0, false);
                return;
            }
            else if (this.logicalOperatorButtons[i].isSelected() === true) {
                this.menuItems[i].select(0, 0, false);
                return;
            }
            else if (this.menuItems[i].isSelected() === true) {
                this.conditionOperatorButtons[i].select(0, 0, false);
                return;
            }
        }
    }
,   scrollToShowSelectedButton: function() {
        var selectedButton = null;
        for (var i=0;i<this.buttons.length;i++) {
            if (this.buttons[i].isSelected() === true) {
                selectedButton = this.buttons[i];
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
,   scrollToShowSelectedLogicalOperatorButton: function() {
        var selectedLogicalOperatorButton = null;
        for (var i=0;i<this.logicalOperatorButtons.length;i++) {
            if (this.logicalOperatorButtons[i].isSelected() === true) {
                selectedLogicalOperatorButton = this.logicalOperatorButtons[i];
                break;
            }
        }
        if (selectedLogicalOperatorButton != null) {
            if (this.innerOffsetY + selectedLogicalOperatorButton.y < 0) {
                this.zoomToScroll(0, -((this.innerOffsetY + selectedLogicalOperatorButton.y) - this.menuItemMargin));
            }
            else if ((this.innerOffsetY + selectedLogicalOperatorButton.y + selectedLogicalOperatorButton.h) > this.h) {
                this.zoomToScroll(0, this.h - (this.innerOffsetY + selectedLogicalOperatorButton.y + selectedLogicalOperatorButton.h + this.menuItemMargin));
            }
        }
    }
,   scrollToShowSelectedConditionOperatorButton: function() {
        var selectedConditionOperatorButton = null;
        for (var i=0;i<this.conditionOperatorButtons.length;i++) {
            if (this.conditionOperatorButtons[i].isSelected() === true) {
                selectedConditionOperatorButton = this.conditionOperatorButtons[i];
                break;
            }
        }
        if (selectedConditionOperatorButton != null) {
            if (this.innerOffsetY + selectedConditionOperatorButton.y < 0) {
                this.zoomToScroll(0, -((this.innerOffsetY + selectedConditionOperatorButton.y) - this.menuItemMargin));
            }
            else if ((this.innerOffsetY + selectedConditionOperatorButton.y + selectedConditionOperatorButton.h) > this.h) {
                this.zoomToScroll(0, this.h - (this.innerOffsetY + selectedConditionOperatorButton.y + selectedConditionOperatorButton.h + this.menuItemMargin));
            }
        }
    }
,   doMenuAction: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.buttons[i].isSelected() === true && this.buttons[i].clickCommand) {
                this.buttons[i].clickCommand();
                return;
            }
            if (this.logicalOperatorButtons[i].isSelected() === true && this.logicalOperatorButtons[i].clickCommand) {
                this.logicalOperatorButtons[i].clickCommand();
                return;
            }
            if (this.menuItems[i].isSelected() === true && this.menuItems[i].menuCommand) {
                this.menuItems[i].menuCommand();
                return;
            }
            if (this.conditionOperatorButtons[i].isSelected() === true && this.conditionOperatorButtons[i].clickCommand) {
                this.conditionOperatorButtons[i].clickCommand();
                return;
            }
        }
    }
,   save: function() {
        this.callBackTarget.callBackFromLinkConditionListView(this.linkFilters, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
        
    }
,   cancel: function() {
        this.parentShape.destroy();
    }
});
