var CanvasManager = function(){this.initialize.apply(this, arguments);}
CanvasManager.prototype = {
    executeX                : 0
,   executeY                : 0
,   layers                  : null
,   addLayerCount           : 9
,   canvasContainer         : null
,   appFooterContainer      : null
,   systemTopLayer          : null  //システム用（メニュー・モーダルダイアログなど）最上位レイヤ
,   systemMiddleLayer       : null  //システム用中位レイヤ
,   systemBottomLayer       : null  //システム用最下位レイヤ
,   systemHiddenLayer       : null  //システム描画イメージバッファ用隠しレイヤ
,   systemTempLayer         : null  //システム描画イメージ一時バッファ用隠しレイヤ
,   topLayer                : null  //メイン描画領域の最上位レイヤ
,   middleLayer             : null  //メイン描画領域の最下位レイヤ
,   bottomLayer             : null  //メイン描画領域の中位レイヤ
,   hiddenLayer             : null  //メイン描画イメージバッファ用隠しレイヤ
,   tempLayer               : null  //メイン描画イメージ一時バッファ用隠しレイヤ
,   currentMouseCursor      : null
,   isFocusOnInputArea      : false
,   initialize: function(_canvas) {
        this.canvasContainer = $('canvas_div');
        this.appFooterContainer = $('app_footer');
        this.extend2DContext(window);
        this.systemTopLayer = _canvas;
        this.initializeCanvasContainerSize();
        this.initializeAppFooterContainerSize();
        this.initializeSystemTopLayerSize();
        this.initializeLayers();

        this.currentMouseCursor = 'default';
    }
,   initializeAppFooterContainerSize: function() {
        toolBox.FOOTER_HEIGHT = $('app_footer').clientHeight+1;
        this.appFooterContainer.style.position = 'absolute';
        this.appFooterContainer.style.top = (document.documentElement.clientHeight - toolBox.FOOTER_HEIGHT + 1) + 'px';;
        this.appFooterContainer.style.left = '3px';
        this.appFooterContainer.style.height = toolBox.FOOTER_HEIGHT;
    }
,   initializeCanvasContainerSize: function() {
        this.canvasContainer.style.position = 'absolute';
        this.canvasContainer.style.top = '0px';
        this.canvasContainer.style.left = '0px';
        this.canvasContainer.style.width = document.documentElement.clientWidth;
        this.canvasContainer.style.height = document.documentElement.clientHeight - toolBox.FOOTER_HEIGHT;
    }
,   initializeSystemTopLayerSize: function() {
        this.systemTopLayer.style.position = 'absolute';
        this.systemTopLayer.style.top = '0px';
        this.systemTopLayer.style.left = '0px';
        this.systemTopLayer.width = this.systemTopLayer.clientWidth;
        var clientHeight = document.documentElement.clientHeight - toolBox.FOOTER_HEIGHT;
        this.systemTopLayer.height = clientHeight;
        this.systemTopLayer.clientHeight = clientHeight;
        this.systemTopLayer.style.height = clientHeight + 'px';
    }
,   createTextAreaDiv: function(_id) {
        var htmlTextAreaElement = document.createElement('div');
        htmlTextAreaElement.style.position = 'absolute';
        htmlTextAreaElement.style.border = '0px solid gray';
        htmlTextAreaElement.style.zIndex = 100;
        htmlTextAreaElement.style.display = 'none';
        htmlTextAreaElement.id = 'textAreaDiv' + _id;
        htmlTextAreaElement.appendChild(this.createTextArea(_id));
        this.systemTopLayer.parentElement.appendChild(htmlTextAreaElement);
        return htmlTextAreaElement;
    }
,   createInputDiv: function(_id) {
        var htmlInputElement = document.createElement('div');
        htmlInputElement.style.position = 'absolute';
        htmlInputElement.style.border = '0px solid gray';
        htmlInputElement.style.zIndex = 100;
        htmlInputElement.style.display = 'none';
        htmlInputElement.id = 'inputDiv' + _id;
        htmlInputElement.appendChild(this.createInput(_id));
        this.systemTopLayer.parentElement.appendChild(htmlInputElement);
        return htmlInputElement;
    }
,   destroyTextAreaDiv: function(_id) {
        this.systemTopLayer.parentElement.removeChild($('textAreaDiv' + _id));
    }
,   destroyInputDiv: function(_id) {
        this.systemTopLayer.parentElement.removeChild($('inputDiv' + _id));
    }
,   createTextArea: function(_id) {
        var textArea = document.createElement('textarea');
        textArea.style.width = '100%';
        textArea.style.height = '100%';
        textArea.style.resize = 'none'
        textArea.id = 'textArea' + _id;
        textArea.parentShape = null;    //プロパティ拡張
        textArea.classType = 'TextArea';    //プロパティ拡張
        textArea.onmousemove = function(_event) {
            clearTimeout(toolBox.longTouchTimeOut);
            clearInterval(toolBox.longTouchInterval);
            if (toolBox.isMouseDown) {
                logger.put('TextArea MouseDrag', toolBox.LOG_LEVEL_INFO);
                ioJobController.drag(toolBox.pointerX2(_event) - toolBox.mouseX, toolBox.pointerY2(_event) - toolBox.mouseY);
            }
            else {
                logger.put('TextArea MouseMove - MouseOver', toolBox.LOG_LEVEL_INFO);
                ioJobController.mouseOver(toolBox.pointerX2(_event), toolBox.pointerY2(_event));
            }
            toolBox.mouseX = toolBox.pointerX2(_event);
            toolBox.mouseY = toolBox.pointerY2(_event);
        }
        textArea.onkeyup = function(_event) {
/*
            if (toolBox.isMouseDown === true || toolBox.isLongTouch === true) {
                return false;
            }
            logger.put('TextArea Keyup', toolBox.LOG_LEVEL_INFO);
            var keycode, shift, ctrl;

            if (_event !== null) {
                keycode = _event.which;
                ctrl    = typeof _event.modifiers == 'undefined' ? _event.ctrlKey : _event.modifiers & Event.CONTROL_MASK;
                shift   = typeof _event.modifiers == 'undefined' ? _event.shiftKey : _event.modifiers & Event.SHIFT_MASK;
                if (!ctrl && !shift && keycode === 116) return;
            } else {
                keycode = _event.keyCode;
                ctrl    = _event.ctrlKey;
                shift   = _event.shiftKey;
                if (!ctrl && !shift && keycode === 116) return;
                _event.returnValue = false;
                _event.cancelBubble = true;
            }
            keychar = String.fromCharCode(keycode).toUpperCase();
            if (keycode === 113 && toolBox.isKeyCommandDone === true) {
                toolBox.isKeyCommandDone = false;
                ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
            }
            return false;
*/
        }
        textArea.onkeydown = function(_event) {
            clearTimeout(toolBox.wheelEndTimeOut);
            var keycode, keychar, shift, ctrl;

            if (_event !== null) {
                keycode = _event.which;
                ctrl    = typeof _event.modifiers == 'undefined' ? _event.ctrlKey : _event.modifiers & Event.CONTROL_MASK;
                shift   = typeof _event.modifiers == 'undefined' ? _event.shiftKey : _event.modifiers & Event.SHIFT_MASK;
                if (!ctrl && !shift && keycode === 116) return;
            } else {
                keycode = _event.keyCode;
                ctrl    = _event.ctrlKey;
                shift   = _event.shiftKey;
                if (!ctrl && !shift && keycode === 116) return;
                _event.returnValue = false;
                _event.cancelBubble = true;
            }
            keychar = String.fromCharCode(keycode).toUpperCase();
            if (ctrl) {
            }
            else if (shift) {
            }
            else {
                if (keycode === 113) { //F2
                    logger.put('TextArea Keydown - EditSelectedShapeSave', toolBox.LOG_LEVEL_INFO);
                    this.parentShape.parentShape.save();
                    ioJobController.finishPreparing(ioJobController.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
                    _event.cancelBubble = true;
                    return false;
                }
                else if (keycode === 27) { //ESC
                    logger.put('TextArea Keydown - EditSelectedShapeCancel', toolBox.LOG_LEVEL_INFO);
                    this.parentShape.parentShape.cancel();
                    ioJobController.finishPreparing(ioJobController.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
                    _event.cancelBubble = true;
                    return false;
                }
            }
        }
        return textArea;
    }
,   createInput: function(_id) {
        var input = document.createElement('input');
        input.style.width = '100%';
        input.style.height = '100%';
        input.id = 'input' + _id;
        input.parentShape = null;    //プロパティ拡張
        input.classType = 'Input';    //プロパティ拡張
        input.onmousemove = function(_event) {
            clearTimeout(toolBox.longTouchTimeOut);
            clearInterval(toolBox.longTouchInterval);
            if (toolBox.isMouseDown) {
                logger.put('Input MouseDrag', toolBox.LOG_LEVEL_INFO);
                ioJobController.drag(toolBox.pointerX2(_event) - toolBox.mouseX, toolBox.pointerY2(_event) - toolBox.mouseY);
            }
            else {
                logger.put('Input MouseMove - MouseOver', toolBox.LOG_LEVEL_INFO);
                ioJobController.mouseOver(toolBox.pointerX2(_event), toolBox.pointerY2(_event));
            }
            toolBox.mouseX = toolBox.pointerX2(_event);
            toolBox.mouseY = toolBox.pointerY2(_event);
        }
        input.onkeyup = function(_event) {
/*
            if (toolBox.isMouseDown === true || toolBox.isLongTouch === true) {
                return false;
            }
            logger.put('Input Keyup', toolBox.LOG_LEVEL_INFO);
            var keycode, shift, ctrl;

            if (_event !== null) {
                keycode = _event.which;
                ctrl    = typeof _event.modifiers == 'undefined' ? _event.ctrlKey : _event.modifiers & Event.CONTROL_MASK;
                shift   = typeof _event.modifiers == 'undefined' ? _event.shiftKey : _event.modifiers & Event.SHIFT_MASK;
                if (!ctrl && !shift && keycode === 116) return;
            } else {
                keycode = _event.keyCode;
                ctrl    = _event.ctrlKey;
                shift   = _event.shiftKey;
                if (!ctrl && !shift && keycode === 116) return;
                _event.returnValue = false;
                _event.cancelBubble = true;
            }
            keychar = String.fromCharCode(keycode).toUpperCase();
            if (keycode === 113 && toolBox.isKeyCommandDone === true) {
                toolBox.isKeyCommandDone = false;
                ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
            }
            return false;
*/
        }
        input.onkeydown = function(_event) {
            clearTimeout(toolBox.wheelEndTimeOut);
            var keycode, keychar, shift, ctrl;

            if (_event !== null) {
                keycode = _event.which;
                ctrl    = typeof _event.modifiers == 'undefined' ? _event.ctrlKey : _event.modifiers & Event.CONTROL_MASK;
                shift   = typeof _event.modifiers == 'undefined' ? _event.shiftKey : _event.modifiers & Event.SHIFT_MASK;
                if (!ctrl && !shift && keycode === 116) return;
            } else {
                keycode = _event.keyCode;
                ctrl    = _event.ctrlKey;
                shift   = _event.shiftKey;
                if (!ctrl && !shift && keycode === 116) return;
                _event.returnValue = false;
                _event.cancelBubble = true;
            }
            keychar = String.fromCharCode(keycode).toUpperCase();
            if (ctrl) {
            }
            else if (shift) {
            }
            else {
                if (keycode === 113) { //F2
                    logger.put('Input Keydown - Edit ImageOfSelectedShapeSave', toolBox.LOG_LEVEL_INFO);
                    this.parentShape.parentShape.save();
                    ioJobController.finishPreparing(ioJobController.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
                    _event.cancelBubble = true;
                    return false;
                }
                else if (keycode === 27) { //ESC
                    logger.put('Input Keydown - Edit ImageOFSelectedShapeCancel', toolBox.LOG_LEVEL_INFO);
                    this.parentShape.parentShape.cancel();
                    ioJobController.finishPreparing(ioJobController.systemBackGround, toolBox.COMMAND_TYPE_DROP, toolBox.DRAW_MODE_NORMAL);
                    _event.cancelBubble = true;
                    return false;
                }
            }
        }
        return input;
    }
    //2DContext拡張メソッド
,   extend2DContext: function(_window) {
        _window.CanvasRenderingContext2D.prototype.createPathRRect = function(x,y,xs,ys,radi){
            this.beginPath();
            this.moveTo(x+radi, y);
            this.lineTo(x+xs-radi, y);
            this.quadraticCurveTo(x+xs, y, x+xs, y+radi);
            this.lineTo(x+xs, y+ys-radi);
            this.quadraticCurveTo(x+xs, y+ys, x+xs-radi, y+ys);
            this.lineTo(x+radi, y+ys);
            this.quadraticCurveTo(x, y+ys, x, y+ys-radi);
            this.lineTo(x, y+radi);
            this.quadraticCurveTo(x, y, x+radi, y);
            this.closePath();
        };
        _window.CanvasRenderingContext2D.prototype.strokeRRect = function(x,y,xs,ys,radi){
            this.beginPath();
            this.moveTo(x+radi, y);
            this.lineTo(x+xs-radi, y);
            this.quadraticCurveTo(x+xs, y, x+xs, y+radi);
            this.lineTo(x+xs, y+ys-radi);
            this.quadraticCurveTo(x+xs, y+ys, x+xs-radi, y+ys);
            this.lineTo(x+radi, y+ys);
            this.quadraticCurveTo(x, y+ys, x, y+ys-radi);
            this.lineTo(x, y+radi);
            this.quadraticCurveTo(x, y, x+radi, y);
            this.closePath();
            this.stroke();
        };
        _window.CanvasRenderingContext2D.prototype.fillRRect = function(x,y,xs,ys,radi){
            this.beginPath();
            this.moveTo(x+radi, y);
            this.lineTo(x+xs-radi, y);
            this.quadraticCurveTo(x+xs, y, x+xs, y+radi);
            this.lineTo(x+xs, y+ys-radi);
            this.quadraticCurveTo(x+xs, y+ys, x+xs-radi, y+ys);
            this.lineTo(x+radi, y+ys);
            this.quadraticCurveTo(x, y+ys, x, y+ys-radi);
            this.lineTo(x, y+radi);
            this.quadraticCurveTo(x, y, x+radi, y);
            this.closePath();
            this.fill();
        };
        _window.CanvasRenderingContext2D.prototype.fillRRectGrad = function(x,y,xs,ys,radi,color1,color2,x1,y1,x2,y2){
            this.beginPath();
            var grad = this.createLinearGradient(x1,y1,x2,y2);
            grad.addColorStop(0.0, color1);
            grad.addColorStop(1.0, color2);
            this.fillStyle = grad;
            this.moveTo(x+radi, y);
            this.lineTo(x+xs-radi, y);
            this.quadraticCurveTo(x+xs, y, x+xs, y+radi);
            this.lineTo(x+xs, y+ys-radi);
            this.quadraticCurveTo(x+xs, y+ys, x+xs-radi, y+ys);
            this.lineTo(x+radi, y+ys);
            this.quadraticCurveTo(x, y+ys, x, y+ys-radi);
            this.lineTo(x, y+radi);
            this.quadraticCurveTo(x, y, x+radi, y);
            this.closePath();
            this.fill();
        };
        _window.CanvasRenderingContext2D.prototype.fillRectGrad = function(x,y,xs,ys,color1,color2,x1,y1,x2,y2){
            this.beginPath();
            var grad = this.createLinearGradient(x1,y1,x2,y2);
            grad.addColorStop(0.0, color1);
            grad.addColorStop(1.0, color2);
            this.fillStyle = grad;
            this.fillRect(x,y,xs,ys);
        };
        _window.CanvasRenderingContext2D.prototype.strokeLine = function(x,y,xs,ys){
            this.beginPath();
            this.moveTo(x, y);
            this.lineTo(xs, ys);
            this.stroke();
            this.closePath();
        };
        _window.CanvasRenderingContext2D.prototype.strokeCurveRightBottomCorner = function(x,y,xs,ys, radi){
            this.beginPath();
            this.moveTo(x, y);
            this.quadraticCurveTo(x, y+radi, xs, ys);
            this.stroke();
            this.closePath();
        };
        _window.CanvasRenderingContext2D.prototype.fillText2 = function (text,x,y,maxWidth,fontSize){
            if (toolBox.isSafari === true || toolBox.isFireFox === true) {
                var width=0;
                for(var i=0,len=text.length;i<len;i++){
                    if(text.charCodeAt(i)<0x7F||0xFF60<text.charCodeAt(i)&&text.charCodeAt(i)<0xFFA0){//半角英数の時か半角カナの時
                        width+=1/2;
                    }else{
                        width+=1;
                    }
                }
                width *=fontSize;
                if(width>maxWidth){
                    try {
                        var scale = maxWidth/width;
                        this.translate(x,0);
                        this.scale(scale,1);
                        this.fillText(text,0,y);
                        this.scale(1/scale,1);
                        this.translate(-x,0);
                    }
                    catch (e) {
                        alert('Sorry. This function does not work on this browser. Try another.');
                    }
                }else{
                    this.fillText(text,x,y);
                }
            }
            else {
                this.fillText(text,x,y,maxWidth);
            }
        };
    }
    //canvas機能拡張メソッド
,   extendLayer: function(_layer) {
        //canvasの2dコンテキスト取得用プロパティ追加
        _layer.ctx = _layer.getContext('2d');
        //canvasクリアメソッド追加
        _layer.clear = function() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
        //canvas間のイメージコピーメソッド追加
        _layer.copyFrom = function(_sourceLayer) {
            this.ctx.drawImage(_sourceLayer, 0, 0);
        }
        //レイヤに表示されているメインShape
        _layer.targetShape = null;
    }
,   initializeLayers: function() {
        this.layers = new Array();
        var topZIndex = 0;
        for (var i=1;i<=this.addLayerCount;i++) {
            toolBox.addToArray(this.layers, this.createLayer(i - 1));
            topZIndex = i;
        }
        toolBox.addToArray(this.layers, this.systemTopLayer)
        this.systemTopLayer.style.zIndex = topZIndex;
        for (var i=0;i<this.layers.length;i++) {
            this.extendLayer(this.layers[i]);
        }
        this.hiddenLayer = this.layers[0];
        this.tempLayer = this.layers[1];
        this.systemHiddenLayer = this.layers[2];
        this.systemTempLayer = this.layers[3];
        this.bottomLayer = this.layers[4];
        this.middleLayer = this.layers[5];
        this.topLayer = this.layers[6];
        this.systemBottomLayer = this.layers[7];
        this.systemMiddleLayer = this.layers[8];

        this.hiddenLayer.style.display = 'hidden';
        this.tempLayer.style.display = 'hidden';
        this.systemHiddenLayer.style.display = 'hidden';
        this.systemTempLayer.style.display = 'hidden';

        this.tempLayer.id = 'templayer';
        this.hiddenLayer.id = 'hiddenlayer';
        this.bottomLayer.id = 'bottomlayer';
        this.middleLayer.id = 'middlelayer';
        this.topLayer.id = 'toplayer';
        this.systemTempLayer.id = 'systemtemplayer';
        this.systemHiddenLayer.id = 'systemhiddenlayer';
        this.systemBottomLayer.id = 'systembottomlayer';
        this.systemMiddleLayer.id = 'systemmiddlelayer';
        this.systemTopLayer.id = 'systemtoplayer';

        this.resizeLayers();
    }
,   createLayer: function(_zIndex) {
        var layer = document.createElement('canvas');
        layer.id = 'layer' + _zIndex;
        layer.style.position = 'absolute';
        layer.style.display = 'block';
        layer.style.border = '0px solid gray';
        layer.style.backgroundColor = 'transparent';
        layer.style.zIndex =_zIndex;
        this.systemTopLayer.parentElement.appendChild(layer);
        return layer;
    }
,   resizeLayers: function() {
        for (var i=0;i<this.layers.length;i++) {
            if (this.layers[i] !== this.systemTopLayer) {
                this.layers[i].style.top = this.systemTopLayer.style.top;
                this.layers[i].style.left = this.systemTopLayer.style.left;
                this.layers[i].clientLeft = this.systemTopLayer.clientLeft;
                this.layers[i].clientTop = this.systemTopLayer.clientTop;
                this.layers[i].width = this.systemTopLayer.width;
                this.layers[i].height = this.systemTopLayer.height;
                this.layers[i].style.width = this.systemTopLayer.style.width;
                this.layers[i].style.height = this.systemTopLayer.style.height;
            }
        }
    }
,   getWidth: function() {
        return this.systemTopLayer.width;
    }
,   getHeight: function() {
        return this.systemTopLayer.height;
    }
,   setMouseCursor: function(_cursor) {
        this.currentMouseCursor = _cursor;
        if (this.systemTopLayer.style.cursor !== 'wait') {
            this.systemTopLayer.style.cursor = this.currentMouseCursor;
        }
    }
,   getMouseCursor: function() {
        return this.currentMouseCursor;
    }
,   setMouseCursorBusy: function() {
        this.systemTopLayer.style.cursor = 'wait';
    }
,   restoreMouseCursor: function() {
        if (this.systemTopLayer.style.cursor !== this.currentMouseCursor) {
            this.systemTopLayer.style.cursor = this.currentMouseCursor;
        }
    }
,   isUserTypingStringInProcess: function() {
        if (document.activeElement.classType) {
            if (document.activeElement.classType === 'TextArea' || document.activeElement.classType === 'Input') {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
/*
        if (this.htmlTextAreaElement.children[0].id === document.activeElement.id) {
            return true;
        }
        else if (this.htmlInputElement.children[0].id === document.activeElement.id) {
            return true;
        }
        else {
            return false;
        }
*/
    }
};
