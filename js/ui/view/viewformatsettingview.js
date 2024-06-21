var ViewFormatSettingView = function(){this.initialize.apply(this, arguments);}
ViewFormatSettingView.prototype = toolBox.extend(new EntityFormatSettingView(), {
    isShapeFormatOfBackGround       : false
,   TARGET_IS_SELECTED_VIEW         : '選択中のビュー'
,   TARGET_IS_VIEW_STARNDARD_STYLE  : '標準のビュースタイル'
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultShapeFormat, _isShapeFormatOfBackGround, _arg1, _arg2, _arg3, _arg4, _arg5) {

        this.isShapeFormatOfBackGround = _isShapeFormatOfBackGround;

        EntityFormatSettingView.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultShapeFormat, _arg1, _arg2, _arg3, _arg4, _arg5]);
        this.classType = 'ViewFormatSettingView';
        

        this.alive = true;
    }
,   initMenuItems: function() {
        var itemY = this.menuItemMargin;
        if (this.isShapeFormatOfBackGround === false) {
            this.addFormatMenuItem(this.menuItemMargin, itemY, this.menuCommandSwitchFormatSettingTarget, translator.t('対象'), translator.t(this.TARGET_IS_SELECTED_VIEW));
            itemY += this.menuItemHeight;
        }
        this.addColorMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateColorSettingView, translator.t('背景色'), this.editShapeFormat.fillStyle);
        itemY += this.menuItemHeight;
        this.addColorMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateColorSettingView, translator.t('文字色'), this.editShapeFormat.textFillStyle);
        itemY += this.menuItemHeight;
        this.addFontMenuItem(this.menuItemMargin, itemY, this.menuCommandCreateFontSettingView, translator.t('フォント'), this.editShapeFormat.textFont);
        itemY += this.menuItemHeight;
        this.addFormatMenuItem(this.menuItemMargin, itemY, this.menuCommandInputFontSize, translator.t('文字サイズ'), this.editShapeFormat.textSize + '');
    }
,   menuCommandSwitchFormatSettingTarget: function() {
        if (this.text === translator.t(this.parentShape.TARGET_IS_SELECTED_VIEW)) {
            this.text = translator.t(this.parentShape.TARGET_IS_VIEW_STARNDARD_STYLE);
        }
        else if (this.text === translator.t(this.parentShape.TARGET_IS_VIEW_STARNDARD_STYLE)) {
            this.text = translator.t(this.parentShape.TARGET_IS_SELECTED_VIEW);
        }
        else {
            this.text = translator.t(this.parentShape.TARGET_IS_SELECTED_VIEW);
        }
        this.backGroundShape.registerDrawBuffer();
    }
,   save: function() {
        this.prepareSaveViewFormat();
        this.callBackTarget.callBackFromViewFormatSettingView(this, this.editShapeFormat, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
,   prepareSaveViewFormat: function() {
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
        }
    }
,   isTargetSelectedViewStyle: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].menuCommandName === translator.t('対象')) {
                return this.menuItems[i].text === translator.t(this.TARGET_IS_SELECTED_VIEW);
            }
        }
        return false;
    }
,   isTargetViewStandardStyle: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].menuCommandName === translator.t('対象')) {
                return this.menuItems[i].text === translator.t(this.TARGET_IS_VIEW_STARNDARD_STYLE);
            }
        }
        return false;
    }
});
