var CheckBox = function(){this.initialize.apply(this, arguments);}
CheckBox.prototype = toolBox.extend(new Button(), {
    checked : false
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        Button.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'CheckBox';

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.r = 2;
        this.shapeFormat.fillStyle = '#ffffff';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textFillStyle = '#000000';
        this.shapeFormat.strokeLineSize = 3;
        this.defaulutText = '';
        this.text = '';
        this.alive = true;
//        this.registerDrawBuffer();
    }
,   check: function() {
        this.checked = true;
        this.syncCheckedImage();
    }
,   uncheck: function() {
        this.checked = false;
        this.syncCheckedImage();
    }
,   commandDrop: function(_x, _y) {
        this.checked = !this.checked;
        this.syncCheckedImage();
        this.registerDrawBuffer();
        if (this.clickCommand) {
            this.clickCommand();
        }
    }
,   syncCheckedImage: function() {
        if (this.checked === true) {
            this.setImageUrl('img/check.png', true);
        }
        else {
            this.setImageUrl(null, true);
        }
    }
});
