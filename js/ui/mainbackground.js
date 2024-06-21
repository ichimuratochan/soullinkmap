var MainBackGround = function(){this.initialize.apply(this, arguments);}
MainBackGround.prototype = toolBox.extend(new BackGroundShape(), {
    myNameImg               : null
,   changed                 : false
,   garbages                : null
,   standardViewFormat      : null
,   standardViewImageUrl    : ''
,   initialize: function(_ioJobController, _hiddenLayer, _bottomLayer, _middleLayer, _topLayer, _tempLayer, _defaultLayer) {
        if (!_ioJobController) {
            return;
        }
        BackGroundShape.prototype.initialize.apply(this,[
            _ioJobController,
            _hiddenLayer,
            _bottomLayer,
            _middleLayer,
            _topLayer,
            _tempLayer,
            _defaultLayer,
            0,
            0,
            _topLayer.width,
            _topLayer.height
        ]);
        this.r = 10;
        this.classType = 'MainBackGround';
        this.garbages = new Array();
        this.setImageUrl('');   //toolBox.DEFAULT_BACK_GROUND_IMG, true);
        this.myNameImg = new Image();
//        this.myNameImg.src = 'img/logo.png';

        this.standardViewFormat = new ShapeFormat();

        this.alive = true;
    }
,   saveToData: function() {
        if (this.changed === true) {
            this.soulMaster.dataAccessAction.updateAppConfig(
                this.text,
                this.innerOffsetX,
                this.innerOffsetY,
                this.innerZoom,
                this.imageUrl,
                this.shapeFormat.fillStyle,
                this.shapeFormat.textAlign,
                this.shapeFormat.textVerticalAlign,
                this.shapeFormat.textDescription,
                this.shapeFormat.textSize,
                this.shapeFormat.textFont,
                this.shapeFormat.textFillStyle,
                this.standardViewFormat.fillStyle,
                this.standardViewFormat.textAlign,
                this.standardViewFormat.textVerticalAlign,
                this.standardViewFormat.textDescription,
                this.standardViewFormat.textSize,
                this.standardViewFormat.textFont,
                this.standardViewFormat.textFillStyle,
                this.standardViewImageUrl
            );
        }
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].changed === true) {
                this.childShapes[i].saveToData();
            }
        }
        this.changed = false;
    }
,   syncReadOnlyViews: function() {
        //同じBodyを表示中のEditViewで、最上位でないEditViewはデータ保存ではなく保存後の最新データ再表示
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isViewFrame) {
                if (this.childShapes[i].isEntityViewFrame) {
                    if (this.childShapes[i].getViewMode() === toolBox.VIEW_MODE_EDITVIEW) {
                        if (this.isTopOfEditView(this.childShapes[i]) === false) {
                            this.childShapes[i].view.showBodyData(false);
                        }
                    }
                    else if (this.childShapes[i].getViewMode() === toolBox.VIEW_MODE_BIRDVIEW) {
                        //TODO:EditView以外のViewの同期
                        this.childShapes[i].view.showBodyData(false);
                    }
                }
            }
        }
    }
,   isTopOfEditView: function(_entityViewFrame) {
        var ret = true;
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isViewFrame && this.childShapes[i].getViewMode() === toolBox.VIEW_MODE_EDITVIEW && this.childShapes[i] !== _entityViewFrame) {
                if (this.childShapes[i].zOrder.isHigherThan(_entityViewFrame) === true) {
                    ret = false;
                    break;
                }
            }
        }
        return ret;
    }
,   isChanged: function() {
        var ret = false;
        var row = this.soulMaster.dataAccessAction.findAppConfig();
        if (this.text !== row['BACK_GROUND_TEXT'] ||
            this.innerOffsetX !== row['BACK_GROUND_INNER_OFFSET_X'] ||
            this.innerOffsetY !== row['BACK_GROUND_INNER_OFFSET_Y'] ||
            this.innerZoom !== row['BACK_GROUND_INNER_ZOOM'] ||
            this.imageUrl !== row['BACK_GROUND_IMAGE_URL'] ||
            this.shapeFormat.fillStyle !== row['BACK_GROUND_FORMAT_FILL_STYLE'] ||
            this.shapeFormat.textAlign !== row['BACK_GROUND_FORMAT_TEXT_ALIGN'] ||
            this.shapeFormat.textVerticalAlign !== row['BACK_GROUND_FORMAT_TEXT_VERTICAL_ALIGN'] ||
            this.shapeFormat.textDescription !== row['BACK_GROUND_FORMAT_TEXT_DESCRIPTION'] ||
            this.shapeFormat.textSize !== row['BACK_GROUND_FORMAT_TEXT_SIZE'] ||
            this.shapeFormat.textFont !== row['BACK_GROUND_FORMAT_TEXT_FONT'] ||
            this.shapeFormat.textFillStyle !== row['BACK_GROUND_FORMAT_TEXT_FILL_STYLE'] ||
            this.standardViewFormat.fillStyle !== row['STANDARD_VIEW_FORMAT_FILL_STYLE'] ||
            this.standardViewFormat.textAlign !== row['STANDARD_VIEW_FORMAT_TEXT_ALIGN'] ||
            this.standardViewFormat.textVerticalAlign !== row['STANDARD_VIEW_FORMAT_TEXT_VERTICAL_ALIGN'] ||
            this.standardViewFormat.textDescription !== row['STANDARD_VIEW_FORMAT_TEXT_DESCRIPTION'] ||
            this.standardViewFormat.textSize !== row['STANDARD_VIEW_FORMAT_TEXT_SIZE'] ||
            this.standardViewFormat.textFont !== row['STANDARD_VIEW_FORMAT_TEXT_FONT'] ||
            this.standardViewFormat.textFillStyle !== row['STANDARD_VIEW_FORMAT_TEXT_FILL_STYLE'] ||
            this.standardViewImageUrl !== row['STANDARD_VIEW_IMAGE_URL']
           ) {
            this.changed = true;
            ret = true;
        }
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isViewFrame) {
                if (this.childShapes[i].isChanged() === true) {
//                    this.changed = true;    //TODO:不要なREDOログ生成をなくす？仮でも良い
                    ret = true;
                }
            }
        }
        return ret;
    }
,   reset: function() {
        var a = null;
        while (this.childShapes.length > 0) {
            a = this.childShapes[0];
            a.destroy();
            a.clean();  //TODO：上のdestroyのタイミングで既にchildShapes.length = 0をしてしまっている！！！！間違い！！！
        }
        this.childShapes.length = 0;
        this.text = '';
        this.x = 0;
        this.y = 0;
        this.w = this.topLayer.width;
        this.h = this.topLayer.height;
        this.r = 10;
        this.currentActualX = 0;
        this.currentActualY = 0;
        this.currentActualW = this.topLayer.width;
        this.currentActualH = this.topLayer.height;
        this.currentActualX2 = this.currentActualX + this.currentActualW;
        this.currentActualY2 = this.currentActualY + this.currentActualH;
        this.currentActualR = 0;
        this.lastActualX = this.currentActualX;
        this.lastActualY = this.currentActualY;
        this.lastActualW = this.currentActualW;
        this.lastActualH = this.currentActualH;
        this.lastActualX2 = this.currentActualX2;
        this.lastActualY2 = this.currentActualY2;
        this.lastActualR = this.currentActualR;
        this.savedActualX = this.currentActualX;
        this.savedActualY = this.currentActualY;
        this.savedActualW = this.currentActualW;
        this.savedActualH = this.currentActualH;
        this.savedActualX2 = this.currentActualX2;
        this.savedActualY2 = this.currentActualY2;
        this.savedActualR = this.currentActualR;
        this.innerOffsetX = 0;
        this.innerOffsetY = 0;
        this.innerZoom = 1;
        this.resumeX = this.x;
        this.resumeY = this.y;
        this.resumeW = this.w;
        this.resumeH = this.h;
        this.setImageUrl('img/sky77.jpg', true);
        this.savedInnerOffsetX = 0;
        this.savedInnerOffsetY = 0;
        this.savedInnerZoom = 1;
        if (this.parentShape) {
            this.wDiff = this.parentShape.w - this.w;
            this.hDiff = this.parentShape.h - this.h;
        }
        this.changed = false;
        this.garbages.length = 0;
    }
,   showData: function() {
        var row = this.soulMaster.dataAccessAction.findAppConfig();
        this.text = row['BACK_GROUND_TEXT'];
        this.innerOffsetX = row['BACK_GROUND_INNER_OFFSET_X'];
        this.innerOffsetY = row['BACK_GROUND_INNER_OFFSET_Y'];
        this.innerZoom = row['BACK_GROUND_INNER_ZOOM'];
        this.setImageUrl(row['BACK_GROUND_IMAGE_URL'], true);
        this.shapeFormat.fillStyle = row['BACK_GROUND_FORMAT_FILL_STYLE'];
        this.shapeFormat.textAlign = row['BACK_GROUND_FORMAT_TEXT_ALIGN'];
        this.shapeFormat.textVerticalAlign = row['BACK_GROUND_FORMAT_TEXT_VERTICAL_ALIGN'];
        this.shapeFormat.textDescription = row['BACK_GROUND_FORMAT_TEXT_DESCRIPTION'];
        this.shapeFormat.textSize = row['BACK_GROUND_FORMAT_TEXT_SIZE'];
        this.shapeFormat.textFont = row['BACK_GROUND_FORMAT_TEXT_FONT'];
        this.shapeFormat.textFillStyle = row['BACK_GROUND_FORMAT_TEXT_FILL_STYLE'];
        this.standardViewFormat.fillStyle = row['STANDARD_VIEW_FORMAT_FILL_STYLE'];
        this.standardViewFormat.textAlign = row['STANDARD_VIEW_FORMAT_TEXT_ALIGN'];
        this.standardViewFormat.textVerticalAlign = row['STANDARD_VIEW_FORMAT_TEXT_VERTICAL_ALIGN'];
        this.standardViewFormat.textDescription = row['STANDARD_VIEW_FORMAT_TEXT_DESCRIPTION'];
        this.standardViewFormat.textSize = row['STANDARD_VIEW_FORMAT_TEXT_SIZE'];
        this.standardViewFormat.textFont = row['STANDARD_VIEW_FORMAT_TEXT_FONT'];
        this.standardViewFormat.textFillStyle = row['STANDARD_VIEW_FORMAT_TEXT_FILL_STYLE'];
        this.standardViewImageUrl = row['STANDARD_VIEW_IMAGE_URL'];

        var rows = this.soulMaster.dataAccessAction.getAllViewStatuses();
        var viewFrame = null;
        var childShapeMap = {};
        for (var i=0;i<rows.length;i++) {
            viewFrame = this.soulMaster.mainAction.createEntityView(rows[i]['X'], rows[i]['Y']);
            viewFrame.showData(rows[i]);
            childShapeMap[viewFrame.id] = viewFrame;
        }
        //zOrder設定
        if (rows.length > 0) {
            childShapeMap[rows[0]['VIEW_ID']].zOrder.getTopShape().onDropFromTop();
        }
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['ZORDER_NEXT_LOWER_VIEW_ID'] === '') {
                childShapeMap[rows[i]['VIEW_ID']].zOrder.nextLowerShape = null;
            }
            else {
                childShapeMap[rows[i]['VIEW_ID']].zOrder.nextLowerShape = childShapeMap[rows[i]['ZORDER_NEXT_LOWER_VIEW_ID']];
            }
            if (rows[i]['ZORDER_NEXT_HIGHER_VIEW_ID'] === '') {
                childShapeMap[rows[i]['VIEW_ID']].zOrder.nextHigherShape = null;
            }
            else {
                childShapeMap[rows[i]['VIEW_ID']].zOrder.nextHigherShape = childShapeMap[rows[i]['ZORDER_NEXT_HIGHER_VIEW_ID']];
            }
        }
        if (rows.length > 0) {
            childShapeMap[rows[0]['VIEW_ID']].zOrder.getTopShape().onMoveToTop();
        }
        this.registerDrawBuffer();
    }
,   commandDoubleHit: function(_x, _y) {
        var view = this.soulMaster.mainAction.createEntityView(_x, _y);
    }
,   changeMouseCursor: function() {
        this.ioJobController.setMouseCursor('move');
    }
,   registerDrawBuffer: function() {
        this.ioJobController.registerDrawShape(this);
        for (var i=0;i<this.childShapes.length;i++) {
            this.childShapes[i].syncPositionWithParentShape(true);
        }
        this.soulMaster.showSoulMasterMenus();
        this.soulMaster.registerDrawBuffer();
    }
,   innerDraw: function(_ctx, _drawLastPos) {

        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        var imgRatio = 0;
        if (this.hasNoImage() === true) {
            imgRatio = this.currentActualW / this.currentActualH;
        }
        else {
            imgRatio = this.image.width / this.image.height;
        }
        var backGroundRatio = toolBox.tempW / toolBox.tempH;
        var x = 0;
        var y = 0;
        var w = 0;
        var h = 0;
        if (imgRatio > backGroundRatio) {
            w = toolBox.tempH * imgRatio;
            h = toolBox.tempH;
            x = toolBox.tempX - ((w - toolBox.tempW) / 2);
            y = 0;
        }
        else {
            w = toolBox.tempW;
            h = toolBox.tempW / imgRatio;
            x = 0;
            y = toolBox.tempY - ((h - toolBox.tempH) / 2);
        }
        ctx.fillStyle = this.shapeFormat.fillStyle;
        ctx.fillRect(x, y, w, h);
        if (this.hasNoImage() === false) {
            try {
                ctx.drawImage(this.image, x, y, w, h);
            }
            catch (e) {
                ctx.fillRect(x, y, w, h);
            }
        }
        if (this.isSelected()) {
            ctx.strokeStyle = this.shapeFormat.selectedStrokeStyle;
        }
        else {
            ctx.strokeStyle = this.shapeFormat.strokeStyle;
        }
        if (this.myNameImg === null || this.myNameImg.src === '' || this.myNameImg.comlete === false) {
            this.drawText(ctx);
        }
        else {
            try {
                ctx.drawImage(this.myNameImg, 10, 5, 260, 40);
            }
            catch (e) {

            }
        }
    }
,   callBackFromInputBox: function(_resultText, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (_arg1 === 'editImageOfSelectedShape') {
            var newUrl = _resultText;
            this.setImageUrl(newUrl, true);
            this.select(0, 0, false);
            this.soulMaster.dataAccessAction.saveToData();
            this.registerDrawBuffer();
        }
    }
,   callBackCancelFromInputBox: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.select(0, 0, false);
    }
});
