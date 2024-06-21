var ViewSettingView = function(){this.initialize.apply(this, arguments);}
ViewSettingView.prototype = toolBox.extend(new MenuViewBase(), {
    targetView          : null
,   buttonWidth         : 50
,   menuItemWidth       : 130
,   menuGroupLabelWidth : 260
,   menuLabelWidth      : 125
,   viewStyleMode       : toolBox.VIEW_STYLE_MODE_ORIGINAL
,   viewImageMode       : toolBox.VIEW_IMAGE_MODE_ORIGINAL
,   birdViewParentStepCount : 5
,   birdViewChildStepCount  : 5
,   birdViewDirection       : toolBox.BIRDVIEW_DIRECTION_RIGHT
,   birdViewHorizontalSpace : 5
,   birdViewVerticalSpace   : 15
,   birdViewLevel           : toolBox.BIRDVIEW_LEVEL_NORMAL
,   linkViewStepCount       : 5
,   readonlyFlag            : '0'
,   birdViewDirectionMenuItem   : null
,   callBackTarget          : null
,   arg1                    : null
,   arg2                    : null
,   arg3                    : null
,   arg4                    : null
,   arg5                    : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _targetView, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;

        this.targetView = _targetView;
        this.viewStyleMode = _targetView.viewStyleMode;
        this.viewImageMode = _targetView.viewImageMode;
        this.birdViewParentStepCount = _targetView.birdViewParentStepCount;
        this.birdViewChildStepCount = _targetView.birdViewChildStepCount;
        this.birdViewDirection = _targetView.birdViewDirection;
        this.birdViewHorizontalSpace = _targetView.birdViewHorizontalSpace;
        this.birdViewVerticalSpace = _targetView.birdViewVerticalSpace;
        this.birdViewLevel = _targetView.birdViewLevel;
        this.linkViewStepCount = _targetView.linkViewStepCount;
        this.readonlyFlag = _targetView.readonlyFlag;

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'ViewSettingView';

        this.text = ' ';

        this.alive = true;
    }
,   initMenuItems: function() {
        var itemY = this.menuItemMargin;
        this.addLabel(this.menuItemMargin, itemY, '[ ' + translator.t('共通設定') + ' ]');
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchViewStyleMode, translator.t('ビュースタイル'), translator.t(toolBox.VIEW_STYLE_MODE_NAMES[this.targetView.viewStyleMode]));
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchViewImageMode, translator.t('背景画像'), translator.t(toolBox.VIEW_IMAGE_MODE_NAMES[this.targetView.viewImageMode]));
        itemY += this.menuItemHeight;
        this.addLabel(this.menuItemMargin, itemY, '[ ' + translator.t('俯瞰ビュー設定') + ' ]');
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandInputBirdViewParentStepCount, translator.t('親階層数'), this.targetView.birdViewParentStepCount + '');
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandInputBirdViewChildStepCount, translator.t('子階層数'), this.targetView.birdViewChildStepCount + '');
        itemY += this.menuItemHeight;
        this.birdViewDirectionMenuItem = this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandPopupBirdViewDirectionSettingView, translator.t('表示方向'), translator.t(toolBox.BIRDVIEW_DIRECTION_NAMES[this.targetView.birdViewDirection]));
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandInputBirdViewHorizontalSpace, translator.t('水平方向間隔'), this.targetView.birdViewHorizontalSpace + '');
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandInputBirdViewVerticalSpace, translator.t('垂直方向間隔'), this.targetView.birdViewVerticalSpace + '');
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchBirdViewLevel, translator.t('ビューレベル'), translator.t(toolBox.BIRDVIEW_LEVEL_NAMES[this.targetView.birdViewLevel]));
        itemY += this.menuItemHeight;
        this.addLabel(this.menuItemMargin, itemY, '[ ' + translator.t('Linkビュー設定') + ' ]');
        itemY += this.menuItemHeight;
        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandInputLinkViewStepCount, translator.t('階層数'), this.targetView.linkViewStepCount + '');
//        itemY += this.menuItemHeight;
//        this.addViewSettingMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchReadonlyOrEditable, translator.t('読取専用'), translator.t(toolBox.FLAG_NAMES[this.targetView.readonlyFlag]));
    }
,   addLabel: function(_x, _y, _labelText) {
        var newLabel = new Label(
            this,
            this,
            this.defaultLayer,
            _x,
            _y + 3,
            this.menuGroupLabelWidth,
            this.menuItemHeight - 6,
            _labelText
        );
        newLabel.showBackGroundColor = true;
    }
,   addViewSettingMenuItem: function(_x, _y, _menuCommand, _menuCommandName, _buttonText) {
        var newLabel = new Label(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            this.menuLabelWidth,
            this.menuItemHeight,
            _menuCommandName
        )
        var newItem = new MenuItem(
            this,
            this,
            this.defaultLayer,
            _x + this.menuLabelWidth + 5,
            _y,
            this.menuItemWidth,
            this.menuItemHeight
        );
        newItem.setMenuCommand(_menuCommand, _menuCommandName);
        newItem.text = _buttonText;
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   menuCommandSwitchViewStyleMode: function() {
        this.parentShape.viewStyleMode = this.parentShape.getNextKey(this.parentShape.viewStyleMode, toolBox.VIEW_STYLE_MODE_NAMES, toolBox.VIEW_STYLE_MODE_MAX);
        this.text = translator.t(toolBox.VIEW_STYLE_MODE_NAMES[this.parentShape.viewStyleMode]);
        this.backGroundShape.registerDrawBuffer();
    }
,   menuCommandSwitchViewImageMode: function() {
        this.parentShape.viewImageMode = this.parentShape.getNextKey(this.parentShape.viewImageMode, toolBox.VIEW_IMAGE_MODE_NAMES, toolBox.VIEW_IMAGE_MODE_MAX);
        this.text = translator.t(toolBox.VIEW_IMAGE_MODE_NAMES[this.parentShape.viewImageMode]);
        this.backGroundShape.registerDrawBuffer();
    }
,   menuCommandSwitchBirdViewLevel: function() {
        this.parentShape.birdViewLevel = this.parentShape.getNextKey(this.parentShape.birdViewLevel, toolBox.BIRDVIEW_LEVEL_NAMES, toolBox.BIRDVIEW_LEVEL_MAX);
        this.text = translator.t(toolBox.BIRDVIEW_LEVEL_NAMES[this.parentShape.birdViewLevel]);
        this.backGroundShape.registerDrawBuffer();
    }
,   menuCommandInputBirdViewParentStepCount: function() {
        var a = prompt(translator.t('１以上の数値を入力してください'), this.text);
        a = toolBox.convertStringToHankaku(a);
        if (a !== null && !isNaN(a)) {
            if (Number(a) >= 1) {
                this.parentShape.birdViewParentStepCount = Number(a);
                this.text = a;
                this.backGroundShape.registerDrawBuffer();
            }
        }
    }
,   menuCommandInputBirdViewChildStepCount: function() {
        var a = prompt(translator.t('１以上の数値を入力してください'), this.text);
        a = toolBox.convertStringToHankaku(a);
        if (a !== null && !isNaN(a)) {
            if (Number(a) >= 1) {
                this.parentShape.birdViewChildStepCount = Number(a);
                this.text = a;
                this.backGroundShape.registerDrawBuffer();
            }
        }
    }
,   menuCommandPopupBirdViewDirectionSettingView: function() {
        this.soulMaster.selectedShapesAction.popupBirdViewDirectionSettingStart(this.parentShape.birdViewDirection, this.parentShape)
    }
,   menuCommandInputBirdViewHorizontalSpace: function() {
        var a = prompt(translator.t('１以上の数値を入力してください'), this.text);
        a = toolBox.convertStringToHankaku(a);
        if (a !== null && !isNaN(a)) {
            if (Number(a) >= 1) {
                this.parentShape.birdViewHorizontalSpace = Number(a);
                this.text = a;
                this.backGroundShape.registerDrawBuffer();
            }
        }
    }
,   menuCommandInputBirdViewVerticalSpace: function() {
        var a = prompt(translator.t('１以上の数値を入力してください'), this.text);
        a = toolBox.convertStringToHankaku(a);
        if (a !== null && !isNaN(a)) {
            if (Number(a) >= 1) {
                this.parentShape.birdViewVerticalSpace = Number(a);
                this.text = a;
                this.backGroundShape.registerDrawBuffer();
            }
        }
    }
,   callBackFromBirdViewDirectionSettingView: function(_resultBirdViewDirection, _arg1, _arg2, _arg3, _arg4, _arg5) {
        this.birdViewDirection =_resultBirdViewDirection;
        this.birdViewDirectionMenuItem.text = translator.t(toolBox.BIRDVIEW_DIRECTION_NAMES[_resultBirdViewDirection]);
        this.backGroundShape.clearSelectedShapes();
        this.birdViewDirectionMenuItem.select(0, 0, false);
        this.backGroundShape.registerDrawBuffer();
    }
,   menuCommandInputLinkViewStepCount: function() {
        var a = prompt(translator.t('１以上の数値を入力してください'), this.text);
        a = toolBox.convertStringToHankaku(a);
        if (a !== null && !isNaN(a)) {
            if (Number(a) >= 1) {
                this.parentShape.linkViewStepCount = Number(a);
                this.text = a;
                this.backGroundShape.registerDrawBuffer();
            }
        }
    }
,   menuCommandSwitchReadonlyOrEditable: function() {
        if (this.parentShape.readonlyFlag === '1') {
            this.parentShape.readonlyFlag = '0';
        }
        else {
            this.parentShape.readonlyFlag = '1';
        }
        this.text = translator.t(toolBox.FLAG_NAMES[this.parentShape.readonlyFlag]);
        this.backGroundShape.registerDrawBuffer();
    }
,   getNextKey: function(_currentKey, _keyValues, _maxKey) {
        var firstKey = -1;
        var retKey = -1;
        for (var key in _keyValues) {
            if (firstKey === -1) {
                firstKey = Number(key);
            }
            if (Number(key) === Number(_currentKey)) {
                if (Number(key) === _maxKey) {
                    retKey = firstKey;
                }
                else {
                    retKey = Number(key)+1;
                }
                break;
            }
        }
        return retKey;
    }
,   save: function() {
        this.targetView.viewStyleMode = this.viewStyleMode;
        this.targetView.viewImageMode = this.viewImageMode;
        this.targetView.birdViewParentStepCount = this.birdViewParentStepCount;
        this.targetView.birdViewChildStepCount = this.birdViewChildStepCount;
        this.targetView.birdViewDirection = this.birdViewDirection;
        this.targetView.birdViewHorizontalSpace = this.birdViewHorizontalSpace;
        this.targetView.birdViewVerticalSpace = this.birdViewVerticalSpace;
        this.targetView.birdViewLevel = this.birdViewLevel;
        this.targetView.linkViewStepCount = this.linkViewStepCount;
        this.targetView.readonlyFlag = this.readonlyFlag;
        this.callBackTarget.callBackFromViewSettingView(this.targetView, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
        
    }
,   cancel: function() {
        this.parentShape.destroy();
    }
});
