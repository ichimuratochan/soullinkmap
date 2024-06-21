var EntityFormatSettingView = function(){this.initialize.apply(this, arguments);}
EntityFormatSettingView.prototype = toolBox.extend(new MenuViewBase(), {
    editShapeFormat     : null
,   bodyStandardShapeFormat : null
,   linkStandardShapeFormat : null
,   callBackTarget      : null
,   arg1                : null
,   arg2                : null
,   arg3                : null
,   arg4                : null
,   arg5                : null
,   menuItemWidth       : 240
,   menuLabelWidth      : 80
,   TARGET_IS_SELECTED_BODY_OR_LINK : '選択中のBody/Link'
,   TARGET_IS_BODY_STARNDARD_STYLE  : '標準のBodyスタイル'
,   TARGET_IS_LINK_STARNDARD_STYLE  : '標準のLinkスタイル'
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultShapeFormat, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        this.editShapeFormat = new EntityFormat();
        this.editShapeFormat.copyFrom(_defaultShapeFormat);
        this.editShapeFormat.id = _defaultShapeFormat.id;

        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        this.classType = 'EntityFormatSettingView';

        this.bodyStandardShapeFormat = new EntityFormat();
        this.bodyStandardShapeFormat.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(toolBox.BODY_FORMAT_ID_BODY_STANDARD));
        this.linkStandardShapeFormat = new EntityFormat();
        this.linkStandardShapeFormat.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(toolBox.BODY_FORMAT_ID_LINK_STANDARD));

        this.text = ' ';

        this.alive = true;
    }
,   initMenuItems: function() {
        var itemY = this.menuItemMargin;
        this.addFormatMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchFormatSettingTarget, translator.t('対象'), translator.t(this.TARGET_IS_SELECTED_BODY_OR_LINK));
        itemY += this.menuItemHeight;
        this.addColorMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateColorSettingView, translator.t('背景色'), this.editShapeFormat.fillStyle);
        itemY += this.menuItemHeight;
        this.addColorMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateColorSettingView, translator.t('文字色'), this.editShapeFormat.textFillStyle);
        itemY += this.menuItemHeight;
        this.addFontMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateFontSettingView, translator.t('フォント'), this.editShapeFormat.textFont);
        itemY += this.menuItemHeight;
        this.addFormatMenuItem(this.menuItemMargin, itemY, this.menuCommandInputFontSize, translator.t('文字サイズ'), this.editShapeFormat.textSize + '');
        itemY += this.menuItemHeight;
        this.addFormatMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchTextAlign, translator.t('文字左右位置'), this.editShapeFormat.textAlign);
    }
,   addFormatMenuItem: function(_x, _y, _menuCommand, _menuCommandName, _buttonText) {
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
            this.menuItemWidth - (this.menuLabelWidth + 5),
            this.menuItemHeight
        );
        newItem.setMenuCommand(_menuCommand, _menuCommandName);
        newItem.text = _buttonText;
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   addColorMenuItem: function(_x, _y, _menuCommand, _menuCommandName, _color) {
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
        var newItem = new ColorMenuItem(
            this,
            this,
            this.defaultLayer,
            _x + this.menuLabelWidth + 5,
            _y,
            this.menuItemWidth - (this.menuLabelWidth + 5),
            this.menuItemHeight,
            _color
        );
        newItem.setMenuCommand(_menuCommand, _menuCommandName);
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   addFontMenuItem: function(_x, _y, _menuCommand, _menuCommandName, _textFont) {
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
        var newItem = new FontMenuItem(
            this,
            this,
            this.defaultLayer,
            _x + this.menuLabelWidth + 5,
            _y,
            this.menuItemWidth - (this.menuLabelWidth + 5),
            this.menuItemHeight,
            _textFont
        );
        newItem.setMenuCommand(_menuCommand, _menuCommandName);
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   menuCommandSwitchFormatSettingTarget: function() {
        if (this.text === translator.t(this.parentShape.TARGET_IS_BODY_STARNDARD_STYLE)) {
            this.text = translator.t(this.parentShape.TARGET_IS_LINK_STARNDARD_STYLE);
        }
        else if (this.text === translator.t(this.parentShape.TARGET_IS_LINK_STARNDARD_STYLE)) {
            this.text = translator.t(this.parentShape.TARGET_IS_SELECTED_BODY_OR_LINK);
        }
        else if (this.text === translator.t(this.parentShape.TARGET_IS_SELECTED_BODY_OR_LINK)) {
            this.text = translator.t(this.parentShape.TARGET_IS_BODY_STARNDARD_STYLE);
        }
        else {
            this.text = translator.t(this.parentShape.TARGET_IS_SELECTED_BODY_OR_LINK);
        }
        this.backGroundShape.registerDrawBuffer();
    }
,   menuCommandSwitchTextAlign: function() {
        if (this.text === toolBox.TEXT_ALIGN_CENTER) {
            this.text = toolBox.TEXT_ALIGN_LEFT;
        }
        else if (this.text === toolBox.TEXT_ALIGN_LEFT) {
            this.text = toolBox.TEXT_ALIGN_RIGHT;
        }
        else if (this.text === toolBox.TEXT_ALIGN_RIGHT) {
            this.text = toolBox.TEXT_ALIGN_CENTER;
        }
        else {
            this.text = toolBox.TEXT_ALIGN_CENTER;
        }
        this.backGroundShape.registerDrawBuffer();
    }
,   menuCommandCreateColorSettingView: function() {
        this.soulMaster.selectedShapesAction.colorSettingStart(this);
    }
,   menuCommandCreateFontSettingView: function() {
        this.soulMaster.selectedShapesAction.fontSettingStart(this);
    }
,   menuCommandInputFontSize: function() {
        var a = prompt(translator.t('文字サイズを入力してください'), this.text);
        a = toolBox.convertStringToHankaku(a);
        if (a !== null && !isNaN(a)) {
            if (Number(a) >= 1) {
                this.text = a;
                this.backGroundShape.registerDrawBuffer();
            }
        }
    }
,   save: function() {
        this.prepareSaveEntityFormat();
        this.callBackTarget.callBackFromEntityFormatSettingView(this, this.editShapeFormat, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
,   prepareSaveEntityFormat: function() {
        //対象決定
        if (this.isTargetSelectedBodyOrLinkStyle() === true) {
            if (this.editShapeFormat.id === toolBox.BODY_FORMAT_ID_BODY_STANDARD) {
                this.editShapeFormat.copyFrom(this.bodyStandardShapeFormat);
                this.editShapeFormat.id = toolBox.createUniqueKey();
            }
            else if (this.editShapeFormat.id === toolBox.BODY_FORMAT_ID_LINK_STANDARD) {
                this.editShapeFormat.copyFrom(this.linkStandardShapeFormat);
                this.editShapeFormat.id = toolBox.createUniqueKey();
            }
        }
        else if (this.isTargetBodyStandardStyle() === true) {
            this.editShapeFormat = this.bodyStandardShapeFormat;
        }
        else if (this.isTargetLinkStandardStyle() === true) {
            this.editShapeFormat = this.linkStandardShapeFormat;
        }
        //スタイル設定
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].menuCommandName === translator.t('背景色')) {
                this.editShapeFormat.fillStyle = this.menuItems[i].shapeFormat.fillStyle;
            }
            else if (this.menuItems[i].menuCommandName === translator.t('文字色')) {
                this.editShapeFormat.textFillStyle = this.menuItems[i].shapeFormat.fillStyle;
            }
            else if (this.menuItems[i].menuCommandName === translator.t('フォント')) {
                this.editShapeFormat.textFont = this.menuItems[i].shapeFormat.textFont;
            }
            else if (this.menuItems[i].menuCommandName === translator.t('文字サイズ')) {
                this.editShapeFormat.textSize = Number(this.menuItems[i].text);
            }
            else if (this.menuItems[i].menuCommandName === translator.t('文字左右位置')) {
                this.editShapeFormat.textAlign = this.menuItems[i].text;
            }
        }
    }
,   cancel: function() {
        this.parentShape.destroy();
    }
,   isTargetSelectedBodyOrLinkStyle: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].menuCommandName === translator.t('対象')) {
                return this.menuItems[i].text === translator.t(this.TARGET_IS_SELECTED_BODY_OR_LINK);
            }
        }
        return false;
    }
,   isTargetBodyStandardStyle: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].menuCommandName === translator.t('対象')) {
                return this.menuItems[i].text === translator.t(this.TARGET_IS_BODY_STARNDARD_STYLE);
            }
        }
        return false;
    }
,   isTargetLinkStandardStyle: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].menuCommandName === translator.t('対象')) {
                return this.menuItems[i].text === translator.t(this.TARGET_IS_LINK_STARNDARD_STYLE);
            }
        }
        return false;
    }
});
