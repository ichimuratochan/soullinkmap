var FontSettingBox = function(){this.initialize.apply(this, arguments);}
FontSettingBox.prototype = toolBox.extend(new MenuViewBase(), {
    textFont    : ''
,   callBackTarget  : null
,   arg1            : null
,   arg2            : null
,   arg3            : null
,   arg4            : null
,   arg5            : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultTextFont, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;
        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'FontSettingBox';
        this.text = 'font';

        this.shapeFormat.textFont = _defaultTextFont;

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].shapeFormat.textFont === this.shapeFormat.textFont) {
                this.menuItems[i].select(0, 0, false);
                this.menuItems[i].menuCommand();
                this.scrollToShowSelectedMenuItem();
                break;
            }
        }

        this.alive = true;
    }
,   initMenuItems: function() {
        var fonts = [
            'ＭＳ ゴシック',
            'ＭＳ 明朝',
            'ＭＳ Ｐゴシック',
            'ＭＳ Ｐ明朝',
            'HG丸ｺﾞｼｯｸM-PRO',
            'HG創英角ｺﾞｼｯｸUB',
            'HG創英角ﾎﾟｯﾌﾟ体',
            'HG創英ﾌﾟﾚｾﾞﾝｽEB',
            'HG教科書体',
            'HG正楷書体-PRO',
            'HG行書体',
            'HGｺﾞｼｯｸM',
            'Algerian',
            'Arial Black',
            'Arial Narrow',
            'Arial',
            'Bernard MT Condensed',
            'Bookman Old Style',
            'Cambria Math',
            'Century',
            'Colonna MT',
            'Comic Sans MS',
            'Consolas',
            'Courier New',
            'Gadugi',
            'Georgia',
            'Impact',
            'MS UI Gothic',
            'Rockwell',
            'Showcard Gothic',
            'Tahoma',
            'Times New Roman',
            'Verdana'
        ];
        var itemY = this.menuItemMargin;
        for (var i=0;i<fonts.length;i++) {
            this.addFontMenuItem(this.menuItemMargin, itemY, this.menuCommandSelectFont, fonts[i]);
            itemY += this.menuItemHeight;
        }
    }
,   addFontMenuItem: function(_x, _y, _menuCommand, _textFont) {
        var newItem = new FontItem(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            this.menuItemWidth,
            this.menuItemHeight
        );
        newItem.setMenuCommand(_menuCommand, _textFont);
        newItem.shapeFormat.textFont = _textFont;
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   menuCommandSelectFont: function() {
        this.parentShape.shapeFormat.textFont = this.shapeFormat.textFont;
    }
,   doMenuAction: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                this.menuItems[i].menuCommand();
                this.save();
                return;
            }
        }
    }
,   selectNextUpwardMenuItem: function() {
        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                if (i > 0) {
                    selectedMenuItem = this.menuItems[i-1]
                    break;
                }
                else {
                    selectedMenuItem = this.menuItems[this.menuItems.length-1]
                    break;
                }
            }
        }
        if (selectedMenuItem != null) {
            selectedMenuItem.select(0, 0, false);
            this.scrollToShowSelectedMenuItem();
            selectedMenuItem.menuCommand();
        }
    }
,   selectNextDownwardMenuItem: function() {
        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                if (i+1<this.menuItems.length) {
                    selectedMenuItem = this.menuItems[i+1]
                    break;
                }
                else {
                    selectedMenuItem = this.menuItems[0]
                    break;
                }
            }
        }
        if (selectedMenuItem != null) {
            selectedMenuItem.select(0, 0, false);
            this.scrollToShowSelectedMenuItem();
            selectedMenuItem.menuCommand();
        }
    }
,   save: function() {
        this.callBackTarget.callBackFromFontSettingView(this.shapeFormat.textFont, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
,   cancel: function() {
        this.callBackTarget.callBackCancelFromFontSettingView(this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
});
