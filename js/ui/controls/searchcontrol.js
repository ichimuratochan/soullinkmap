var SearchControl = function(){this.initialize.apply(this, arguments);}
SearchControl.prototype = toolBox.extend(new Shape(), {
    opened  : false
,   openButton              : null
,   closeButton             : null
,   searchWordButton        : null
,   searchNextButton        : null
,   searchPreviousButton    : null
,   searchText              : ''
,   currentBodyId           : ''
,   initialize: function(_containerShape, _parentShape, _defaultLayer) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, this.x, this.y, this.w, this.h]);
        this.r = 5;
        this.classType = 'SearchControl';

        this.shapeFormat.textDescription = 'bold';
        this.shapeFormat.textSize = 10;
        this.shapeFormat.textFont = 'Arial';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_LEFT;
        this.shapeFormat.strokeStyle = '#b0c4de';
        this.shapeFormat.selectedStrokeStyle = '#b0c4de';
        this.shapeFormat.textFillStyle = this.parentShape.shapeFormat.textFillStyle;
        this.shapeFormat.fillStyle = this.parentShape.shapeFormat.fillStyle;
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.drawShadow = false;
        this.text = ' ';

        this.globalAlpha = this.parentShape.globalAlpha;

        this.initializeButtons();
        this.closeControl();
        this.syncPositionWithParentShape(true);

        this.alive = true;
    }
,   initializeButtons: function() {
        this.openButton = new Button(this.containerShape, this.parentShape, this.defaultLayer, this.x + 2, this.y + 2, toolBox.SEARCH_CONTROL_CLOSED_WIDTH - 4, toolBox.SEARCH_CONTROL_HEIGHT - 4)
        this.openButton.text = ' ';
        this.openButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.openButton.shapeFormat.fillStyle = this.shapeFormat.fillStyle;
        this.openButton.setImageUrl('img/search.png', true);
        this.openButton.r = 4;
        this.openButton.tag = this;
        this.openButton.setClickCommand(this.clickCommandOpenControl);

        this.closeButton = new Button(this.containerShape, this.parentShape, this.defaultLayer, this.x + 2, this.y + 2, toolBox.SEARCH_CONTROL_CLOSED_WIDTH - 4, toolBox.SEARCH_CONTROL_HEIGHT - 4)
        this.closeButton.text = 'X';
        this.closeButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.closeButton.shapeFormat.fillStyle = this.shapeFormat.fillStyle;
        this.closeButton.shapeFormat.textFillStyle = this.shapeFormat.textFillStyle;
        this.closeButton.r = 4;
        this.closeButton.tag = this;
        this.closeButton.setClickCommand(this.clickCommandCloseControl);

        this.searchWordButton = new Button(this.containerShape, this.parentShape, this.defaultLayer, this.closeButton.x + this.closeButton.w + 1, this.y + 2, toolBox.SEARCH_CONTROL_OPENED_WIDTH - ((toolBox.SEARCH_CONTROL_CLOSED_WIDTH - 2) * 3) - 1, toolBox.SEARCH_CONTROL_HEIGHT - 4)
        this.searchWordButton.text = '';
        this.searchWordButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
//        this.searchWordButton.shapeFormat.fillStyle = this.shapeFormat.fillStyle;
//        this.searchWordButton.shapeFormat.textFillStyle = this.shapeFormat.textFillStyle;
        this.searchWordButton.shapeFormat.fillStyle = '#f5f5f5';
        this.searchWordButton.shapeFormat.textFillStyle = '#778899';
        this.searchWordButton.shapeFormat.textAlign = 'left';
        this.searchWordButton.r = 4;
        this.searchWordButton.tag = this;
        this.searchWordButton.setClickCommand(this.clickCommandInputSearchWord);

        this.searchPreviousButton = new Button(this.containerShape, this.parentShape, this.defaultLayer, this.searchWordButton.x + this.searchWordButton.w + 1, this.y + 2, toolBox.SEARCH_CONTROL_CLOSED_WIDTH - 4, toolBox.SEARCH_CONTROL_HEIGHT - 4)
        this.searchPreviousButton.text = '<';
        this.searchPreviousButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.searchPreviousButton.shapeFormat.fillStyle = this.shapeFormat.fillStyle;
        this.searchPreviousButton.shapeFormat.textFillStyle = this.shapeFormat.textFillStyle;
        this.searchPreviousButton.r = 4;
        this.searchPreviousButton.tag = this;
        this.searchPreviousButton.setClickCommand(this.clickCommandSearchPrevious);

        this.searchNextButton = new Button(this.containerShape, this.parentShape, this.defaultLayer, this.searchPreviousButton.x + this.searchPreviousButton.w + 1, this.y + 2, toolBox.SEARCH_CONTROL_CLOSED_WIDTH - 4, toolBox.SEARCH_CONTROL_HEIGHT - 4)
        this.searchNextButton.text = '>';
        this.searchNextButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.searchNextButton.shapeFormat.fillStyle = this.shapeFormat.fillStyle;
        this.searchNextButton.shapeFormat.textFillStyle = this.shapeFormat.textFillStyle;
        this.searchNextButton.r = 4;
        this.searchNextButton.tag = this;
        this.searchNextButton.setClickCommand(this.clickCommandSearchNext);

    }
,   clickCommandCloseControl: function() {
        this.tag.closeControl();
    }
,   clickCommandOpenControl: function() {
        this.tag.inputSearchWord();
    }
,   clickCommandInputSearchWord: function() {
        this.tag.inputSearchWord();
    }
,   clickCommandSearchPrevious: function() {
        this.tag.searchPrevious();
    }
,   clickCommandSearchNext: function() {
        this.tag.searchNext();
    }
,   openControl: function() {
        this.opened = true;
        this.openButton.visible = false;
        this.closeButton.visible = true;
        this.searchWordButton.visible = true;
        this.searchPreviousButton.visible = true;
        this.searchNextButton.visible = true;
        this.syncPositionWithParentShape(true);
        this.parentShape.registerDrawBuffer();
    }
,   closeControl: function() {
        this.opened = false;
        this.searchText = '';
        this.searchWordButton.text = '';
        this.openButton.visible = true;
        this.closeButton.visible = false;
        this.searchWordButton.visible = false;
        this.searchPreviousButton.visible = false;
        this.searchNextButton.visible = false;
        this.syncPositionWithParentShape(true);
        this.parentShape.registerDrawBuffer();
    }
,   inputSearchWord: function() {
        var a = prompt(translator.t('検索文字列を入力して下さい'), this.searchText);
        if (a === null) {
            return;
        }
        if (toolBox.trim(a) !== '') {
            this.searchText = toolBox.trim(a);
            this.setOmittedSearchWordText();
            this.openControl();
            this.searchNext();
        }
        else {
            this.searchText = '';
            this.searchWordButton.text = '';
            this.closeControl();
        }
    }
,   searchNext: function() {
        this.currentBodyId = this.soulMaster.selectedShapesAction.searchNext(this.parentShape.view, this.searchText, this.currentBodyId);
        this.backGroundShape.registerDrawBuffer();
    }
,   searchPrevious: function() {
        this.currentBodyId = this.soulMaster.selectedShapesAction.searchPrevious(this.parentShape.view, this.searchText, this.currentBodyId);
        this.backGroundShape.registerDrawBuffer();
    }
,   setOmittedSearchWordText: function() {
        var tempText = this.searchText;
        while (true) {
            if (tempText !== tempText.replace(/\n/,'')) {
                tempText = tempText.replace(/\n/,'');
            }
            else {
                break;
            }
        }
        var ctx = this.defaultLayer.ctx;
        this.searchWordButton.text = '';
        for (var i=0;i<tempText.length;i++) {
            this.searchWordButton.text = tempText.substring(0,i+1);
            ctx.font = this.searchWordButton.shapeFormat.getFont(this.getParentZoom());
            if ((ctx.measureText(this.searchWordButton.text).width + ctx.measureText('...........').width) > this.searchWordButton.currentActualW) {
                this.searchWordButton.text += '...';
                break;
            }
        }
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        var leftmostFrameButton = this.parentShape.getLeftMostFrameButton();
        if (leftmostFrameButton === null) {
            return;
        }
        if (this.opened === true) {
            this.x = leftmostFrameButton.x - (toolBox.SEARCH_CONTROL_OPENED_WIDTH + 10);
            this.w = toolBox.SEARCH_CONTROL_OPENED_WIDTH;
        }
        else {
            this.x = leftmostFrameButton.x - (toolBox.SEARCH_CONTROL_CLOSED_WIDTH + 10);
            this.w = toolBox.SEARCH_CONTROL_CLOSED_WIDTH;
        }
        this.y = toolBox.BORDER_SIZE + 1;
        this.h = toolBox.SEARCH_CONTROL_HEIGHT;
        this.openButton.x = this.x + 2;
        this.openButton.y = this.y + 2;
        this.closeButton.x = this.x + 2;
        this.closeButton.y = this.y + 2;
        this.searchWordButton.x = this.closeButton.x + this.closeButton.w + 1;
        this.searchWordButton.y = this.y + 2;
        this.searchPreviousButton.x = this.searchWordButton.x + this.searchWordButton.w + 1;
        this.searchPreviousButton.y = this.y + 2;
        this.searchNextButton.x = this.searchPreviousButton.x + this.searchPreviousButton.w + 1;
        this.searchNextButton.y = this.y + 2;
        this.saveCurrentDrawingPoints();
    }
,   move: function() {
    }
,   getEffectedShapes: function() {
        return toolBox.arrayWithout(this.parentShape.childShapes, this);
    }
});
