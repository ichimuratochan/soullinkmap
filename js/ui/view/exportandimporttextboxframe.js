var ExportAndImportTextBoxFrame = function(){this.initialize.apply(this, arguments);}
ExportAndImportTextBoxFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    exportMode          : toolBox.EXPORT_MODE_MAX
,   backupShapeFormat   : null
,   importAsBody        : false
,   checkBox            : null
,   checkBoxLabel       : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, 0, 0, 0, 0, false, false]);
//        TextBoxFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, null, '']);

        if (!this.soulMaster) {
            return;
        }

        this.setActualW(500);
        this.setActualH(250);

        this.centerize();

        this.initializeFrameButtons();
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CHANGE_EXPORTMODE);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_MAXIMIZE);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_OK);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CANCEL);

        var leftMostFrameButton = this.getLeftMostFrameButton();
        var rightMostFrameButton = this.getRightMostFrameButton();
//        this.checkBox = new CheckBox(_containerShape, this, _defaultLayer, leftMostFrameButton.x - 30, leftMostFrameButton.y + 2, 16, 16);
        this.checkBox = new CheckBox(_containerShape, this, _defaultLayer, rightMostFrameButton.x + 20, rightMostFrameButton.y + rightMostFrameButton.h + 5, 16, 16);
        this.checkBox.syncPositionWithParentWidth = true;
        this.checkBox.setClickCommand(this.checkBoxChanged);
        this.checkBoxLabel = new Label(_containerShape, this, _defaultLayer, this.checkBox.x - 180, this.checkBox.y, 180, this.checkBox.h);
        this.checkBoxLabel.syncPositionWithParentWidth = true;
        this.checkBoxLabel.shapeFormat.textFillStyle = '#ffffff';
        this.checkBoxLabel.shapeFormat.textAlign = toolBox.TEXT_ALIGN_RIGHT;
        this.checkBoxLabel.text = translator.t('BodyとしてImport');

        this.view = new TextBox(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + this.checkBoxLabel.h + 7,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + this.checkBoxLabel.h + 7),
            null,
            ''
        );

        this.shapeFormat.fillStyle = '#696969';  //'#00bfff';
        this.shapeFormat.textFillStyle = '#ffffff';
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;

        this.backupShapeFormat = new ShapeFormat();
        this.backupShapeFormat.copyFrom(this.shapeFormat);

        this.classType = 'ExportAndImportTextBoxFrame';

        this.changeExportMode();

        this.view.select(0, 0, false);

        this.alive = true;

        this.registerDrawBuffer();
    }
,   checkBoxChanged: function() {
        if (this.checked === true) {
            this.parentShape.importAsBody = true;
        }
        else {
            this.parentShape.importAsBody = false;
        }
    }
,   changeExportMode: function() {
        this.exportMode++;
        if (this.exportMode > toolBox.EXPORT_MODE_MAX) {
            this.exportMode = toolBox.EXPORT_MODE_XML;
        }
        if (this.exportMode === toolBox.EXPORT_MODE_XML) {
            var xmlText = '<!-- soullinkmap xml data of "' + this.soulMaster.targetBackGround.text + '" -->\n';
            xmlText += this.soulMaster.dataAccessAction.saveDataToSerializedText();
            this.view.setText(xmlText);
            this.shapeFormat.copyFrom(this.backupShapeFormat);
        }
        else if (this.exportMode === toolBox.EXPORT_MODE_JSONP) {
            var jsonpText = toolBox.getCompressedSaveDataAsJavaScript(this.soulMaster.targetBackGround.text, this.soulMaster.dataAccessAction.saveDataToSerializedText());
            this.view.setText(jsonpText);
            this.shapeFormat.fillStyle = toolBox.HYPER_LINK_JSONP_FILL_COLOR;
            this.shapeFormat.textFillStyle = toolBox.HYPER_LINK_JSONP_STROKE_COLOR;
        }
        this.text = translator.t('Export / Import\n(F2でImport)') + ' - ' + this.getExportModeName(this.exportMode);
        this.registerDrawBuffer();
    }
,   getExportModeName: function() {
        if (this.exportMode === toolBox.EXPORT_MODE_XML) {
            return translator.t('XML');
        }
        else if (this.exportMode === toolBox.EXPORT_MODE_JSONP) {
            return translator.t('JSONP');
        }
    }
,   callBackFromShapeTransferAnimation: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.onMoveToTop();
        this.visible = true;
        this.registerDrawBuffer();
        this.soulMaster.editTextBox = this;
    }
,   save: function() {  //実際は読み込み処理を行うのでsaveではなくload
        if (this.view.getText().indexOf('<TABLE>') !== -1) {
            if (this.importAsBody === true) {
                this.soulMaster.mainAction.importDataFromSerializedTextAsBody(this.view.getText());
            }
                else {
                this.soulMaster.mainAction.loadDataFromSerializedText(this.view.getText());
                this.soulMaster.savedMapName = '';
            }
            this.soulMaster.mainAction.closeAll();
        }
        else {
            if (this.importAsBody === true) {
                alert(translator.t('BodyとしてImportできるのはXML形式で保存されたMAPだけです'));
                return;
            }
            toolBox.executeJavaScript(this.view.getText());
            this.soulMaster.savedMapName = '';
        }
    }
,   cancel: function() {
        this.soulMaster.actionInProgress = false;
        this.destroy();
    }
});
