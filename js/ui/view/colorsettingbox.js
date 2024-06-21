var ColorSettingBox = function(){this.initialize.apply(this, arguments);}
ColorSettingBox.prototype = toolBox.extend(new MenuViewBase(), {
    color           : ''
,   callBackTarget  : null
,   arg1            : null
,   arg2            : null
,   arg3            : null
,   arg4            : null
,   arg5            : null
,   columnCount     : 4
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultColor, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;
        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'ColorSettingBox';
        this.text = ' ';

        this.color = _defaultColor;

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].color === this.color) {
                this.menuItems[i].select(0, 0, false);
                this.menuItems[i].menuCommand();
                this.scrollToShowSelectedMenuItem();
                break;
            }
        }
        this.alive = true;
    }
,   initMenuItems: function() {
        var colors = [
            '#000000','#696969','#808080','#a9a9a9','#c0c0c0','#d3d3d3','#dcdcdc','#f5f5f5','#ffffff','#fffafa',
            '#f8f8ff','#fffaf0','#faf0e6','#faebd7','#ffefd5','#ffebcd','#ffe4c4','#ffe4b5','#ffdead','#ffdab9',
            '#ffe4e1','#fff0f5','#fff5ee','#fdf5e6','#fffff0','#f0fff0','#f5fffa','#f0ffff','#f0f8ff','#e6e6fa',
            '#b0c4de','#778899','#708090','#4682b4','#4169e1','#191970','#000080','#00008b','#0000cd','#0000ff',
            '#1e90ff','#6495ed','#00bfff','#87cefa','#87ceeb','#add8e6','#b0e0e6','#afeeee','#e0ffff','#00ffff',
            '#00ffff','#40e0d0','#48d1cc','#00ced1','#20b2aa','#5f9ea0','#008b8b','#008080','#2f4f4f','#006400',
            '#008000','#228b22','#2e8b57','#3cb371','#66cdaa','#8fbc8f','#7fffd4','#98fb98','#90ee90','#00ff7f',
            '#00fa9a','#7cfc00','#7fff00','#adff2f','#00ff00','#32cd32','#9acd32','#556b2f','#6b8e23','#808000',
            '#bdb76b','#eee8aa','#fff8dc','#f5f5dc','#ffffe0','#fafad2','#fffacd','#f5deb3','#deb887','#d2b48c',
            '#f0e68c','#ffff00','#ffd700','#ffa500','#f4a460','#ff8c00','#daa520','#cd853f','#b8860b','#d2691e',
            '#a0522d','#8b4513','#800000','#8b0000','#a52a2a','#b22222','#cd5c5c','#bc8f8f','#e9967a','#f08080',
            '#fa8072','#ffa07a','#ff7f50','#ff6347','#ff4500','#ff0000','#dc143c','#c71585','#ff1493','#ff69b4',
            '#db7093','#ffc0cb','#ffb6c1','#d8bfd8','#ff00ff','#ff00ff','#ee82ee','#dda0dd','#da70d6','#ba55d3',
            '#9932cc','#9400d3','#8b008b','#800080','#4b0082','#483d8b','#8a2be2','#9370db','#6a5acd','#7b68ee'
        ];
        var itemCount = 0;
        for (var y=0;y<35;y++) {
            for (var x=0;x<this.columnCount;x++) {
                if (itemCount + 1<=colors.length) {
                    this.addColorMenuItem(x * 53 + 5, y * 25 + 5, 48, 20, this.menuCommandSelectColor, colors[itemCount]);
                }
                itemCount++;
            }
        }
    }
,   addColorMenuItem: function(_x, _y, _w, _h, _menuCommand, _color) {
        var newItem = new ColorItem(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            _w,
            _h
        );
        newItem.setMenuCommand(_menuCommand, '');
        newItem.color = _color;
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   menuCommandSelectColor: function() {
        this.parentShape.color = this.color;
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
                if (i > this.columnCount - 1) {
                    selectedMenuItem = this.menuItems[i-this.columnCount]
                    break;
                }
                else {
//                    selectedMenuItem = this.menuItems[i-this.columnCount]
//                    break;
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
                if (i+this.columnCount<this.menuItems.length) {
                    selectedMenuItem = this.menuItems[i+this.columnCount]
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
,   selectNextLeftwardMenuItem: function() {
        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                if (i > 0) {
                    selectedMenuItem = this.menuItems[i-1]
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
,   selectNextRightwardMenuItem: function() {
        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                if (i+1<this.menuItems.length) {
                    selectedMenuItem = this.menuItems[i+1]
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
        this.callBackTarget.callBackFromColorSettingView(this.color, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
,   cancel: function() {
        this.callBackTarget.callBackCancelFromColorSettingView(this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
});
