window.onload = function() {
    main();
    var mapurl = toolBox.getQueryParam('map');
    if (toolBox.isNullOrUndefined(mapurl) === false) {
        ioJobController.firstTimeMenuIconShown = true;
        ioJobController.mainBackGround.text = 'Loading...';
        logger.put('Loading...', toolBox.LOG_LEVEL_INFO);
        loadFromJSONP(mapurl);
    }
    else {
        ioJobController.splash();
    }
};
function loadFromJSONP(_mapurl) {
    var script = document.createElement('script');
    script.id = 'jsonpscript';
    script.src = _mapurl;
    document.body.appendChild(script);
}
function load(_saveData) {
    ioJobController.systemBackGround.soulMaster.mainAction.loadDataFromSerializedText(toolBox.decompress(_saveData));
    ioJobController.systemBackGround.soulMaster.mainAction.closeAll();
    if (toolBox.isNullOrUndefined($('jsonpscript')) === false) {
        document.body.removeChild($('jsonpscript'));
    }
    var soul = toolBox.getQueryParam('soul');
    if (toolBox.isNullOrUndefined(soul) === false) {
        ioJobController.systemBackGround.soulMaster.mainAction.directJumpToSoul(soul);
    }
}
function main(){
    var mainCanvas = $('main_canvas');
    if (!mainCanvas || !mainCanvas.getContext) return false;

    canvasManager = new CanvasManager(mainCanvas);
    ioJobController = new IOJobController(canvasManager);

    mainCanvas.onmousedown = canvasMouseDown;
    if (mainCanvas.ondrageend) {
        mainCanvas.ondrageend   = canvasMouseUp;
    }
    else {
        mainCanvas.onmouseup   = canvasMouseUp;
    }
    mainCanvas.onmousemove = canvasMouseMove;
    mainCanvas.ondblclick  = canvasDoubleClick;
    mainCanvas.oncontextmenu = canvasContextMenu;
    window.onresize        = documentResize;
    window.onbeforeunload  = documentUnload;
    document.onkeydown     = documentKeydown;
    document.onkeyup       = documentKeyup;

    window.addEventListener('dragover', function(_event) {_event.preventDefault();}, false);
    window.addEventListener("drop" , canvasMouseDrop);

    mainCanvas.addEventListener("mousewheel" , canvasMouseWheel);
    mainCanvas.addEventListener("DOMMouseScroll" , canvasMouseWheel);

    mainCanvas.addEventListener('touchstart',canvasTouchStart, false);
    mainCanvas.addEventListener('touchmove' ,canvasTouchMove, false);
    mainCanvas.addEventListener('touchend'  ,canvasTouchEnd, false);

    mainCanvas.addEventListener("gesturestart", canvasGestureStart, false);
    mainCanvas.addEventListener("gesturechange", canvasGestureChange, false);
    document.addEventListener("gestureend", documentGestureEnd, false);

    $('languageragioenglish').onclick = languaeRadioClickOrChange;
    $('languageragioenglish').onchange = languaeRadioClickOrChange;
    $('languageragiojapanese').onclick = languaeRadioClickOrChange;
    $('languageragiojapanese').onchange = languaeRadioClickOrChange;
    if (toolBox.checkIsCookieAvailable() === false) {
        $('languageragiojapanese').checked = true;
    }
    else {
        if (toolBox.getCookie('language') === null) {
            $('languageragiojapanese').checked = true;
        }
        else {
            if (toolBox.getCookie('language') === 'English') {
                $('languageragioenglish').checked = true;
            }
            else {
                $('languageragiojapanese').checked = true;
            }
        }
    }
    this.languaeRadioClickOrChange();

    $('searchtext').value = '';
    $('q').value = '';
    $('searchbutton').onclick = searchButtonClick;
    $('wikibutton').onclick = wikiButtonClick;
    $('switch_display_footer').onclick = switchDisplayFooterClick;

    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             function(f) { return window.setTimeout(f, 30); };
    }());
//    window.setInterval(draw, 1000/30);

    draw();

}

function languaeRadioClickOrChange() {
    if ($('languageragioenglish').checked === true) {
        ioJobController.setLanguage('English');
    }
    else {
        ioJobController.setLanguage('Japanese');
    }
    this.blur();
}

function searchButtonClick() {
    if (ioJobController.isCommandAcceptable() === true) {
        $('searchbutton').blur();
        var text = $('searchtext').value;
        ioJobController.searchSoulsByText(text);
    }
}
function wikiButtonClick() {
    if (ioJobController.isCommandAcceptable() === true) {
        $('wikibutton').blur();
        var openurl = 'http://ja.wikipedia.org/wiki/' + $('searchtext').value;
        toolBox.openWindow(openurl, 'Wikipedia');
    }
}
function switchDisplayFooterClick() {
    if ($('app_footer_table').style.display === 'none') {
        $('app_footer_table').style.display = 'block';
    }
    else {
        $('app_footer_table').style.display = 'none';
    }
    ioJobController.resizeWorld();
}
function draw() {
    ioJobController.draw();
    window.requestAnimationFrame(draw);
}
function canvasMouseDrop(_event) {
    _event.preventDefault();
    toolBox.userSelectedFile = _event.dataTransfer.files[0];
}
function canvasMouseDown(_event) {
    if (toolBox.touchAvailable === true) {
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }
    if (document.activeElement.attributes.type) {
        if (document.activeElement.attributes.type.value === 'text' || 
            document.activeElement.attributes.type.value === 'button' ||
            document.activeElement.attributes.type.value === 'submit') {
            document.activeElement.blur();
        }
    }
    
    clearTimeout(toolBox.wheelEndTimeOut);
    if (toolBox.isRightClick(_event) === true) {
        return false;
    }
    logger.put('MouseDown - singleHit', toolBox.LOG_LEVEL_INFO);
    toolBox.mouseX = toolBox.pointerX(_event);
    toolBox.mouseY = toolBox.pointerY(_event)
    toolBox.savedMouseX = toolBox.mouseX;
    toolBox.savedMouseY = toolBox.mouseY;
    ioJobController.singleHit(toolBox.mouseX, toolBox.mouseY, _event.ctrlKey || _event.shiftKey);
    toolBox.isMouseDown = true;

    toolBox.longTouchTimeOut = setTimeout(function() {
        toolBox.longTouchInterval = setInterval(function() {
            if (toolBox.isMouseDown === true) {
                toolBox.isLongTouch = true;
                if (toolBox.isZoomIn === true) {
                    logger.put('MouseDown - zoomIn', toolBox.LOG_LEVEL_INFO);
                    ioJobController.zoomIn();
                }
                else {
                    logger.put('MouseDown - zoomOut', toolBox.LOG_LEVEL_INFO);
                    ioJobController.zoomOut();
                }
            }
        }, 30)
    }, 300);

    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasTouchStart(_event) {
    toolBox.touchAvailable = true;
    if (document.activeElement.attributes.type) {
        if (document.activeElement.attributes.type.value === 'text' || 
            document.activeElement.attributes.type.value === 'button' ||
            document.activeElement.attributes.type.value === 'submit') {
            document.activeElement.blur();
        }
    }
    logger.put('TouchStart - singleHit', toolBox.LOG_LEVEL_INFO);
    toolBox.isMouseDown = true;
    toolBox.tapStartTime = new Date();
    toolBox.mouseX = toolBox.pointerX(_event);
    toolBox.mouseY = toolBox.pointerY(_event);
    toolBox.savedMouseX = toolBox.mouseX;
    toolBox.savedMouseY = toolBox.mouseY;
    if (toolBox.tapCount === 1 && toolBox.tapStartTime - toolBox.tapEndTime > 200) {
    	toolBox.tapCount = 0;
	}
    ioJobController.singleHit(toolBox.mouseX, toolBox.mouseY);

    toolBox.longTouchTimeOut = setTimeout(function() {
        toolBox.longTouchInterval = setInterval(function() {
            if (toolBox.isMouseDown === true) {
                toolBox.isLongTouch = true;
                if (toolBox.isZoomIn === true) {
                    logger.put('TouchDown - zoomIn', toolBox.LOG_LEVEL_INFO);
                    ioJobController.zoomIn();
                }
                else {
                    logger.put('TouchDown - zoomOut', toolBox.LOG_LEVEL_INFO);
                    ioJobController.zoomOut();
                }
            }
        }, 30)
    }, 300);

    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasMouseMove(_event) {
    if (toolBox.touchAvailable === true) {
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }
    if (toolBox.isLongTouch === true) {
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }
    clearTimeout(toolBox.longTouchTimeOut);
    clearInterval(toolBox.longTouchInterval);
    if (toolBox.isMouseDown) {
//        logger.put('MouseDrag', toolBox.LOG_LEVEL_INFO);
        ioJobController.drag(toolBox.pointerX(_event) - toolBox.mouseX, toolBox.pointerY(_event) - toolBox.mouseY);
    }
    else {
//        logger.put('MouseMove - MouseOver', toolBox.LOG_LEVEL_INFO);
        ioJobController.mouseOver(toolBox.pointerX(_event), toolBox.pointerY(_event));
    }
    toolBox.mouseX = toolBox.pointerX(_event);
    toolBox.mouseY = toolBox.pointerY(_event);
    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasTouchMove(_event) {
    if (toolBox.isLongTouch === true) {
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }
    clearTimeout(toolBox.longTouchTimeOut);
    clearInterval(toolBox.longTouchInterval);
    if (toolBox.isMouseDown) {
//        logger.put('TouchMove', toolBox.LOG_LEVEL_INFO);
        ioJobController.drag(toolBox.pointerX(_event) - toolBox.mouseX, toolBox.pointerY(_event) - toolBox.mouseY);
    }
    else {
//        logger.put('TouchMouseOver', toolBox.LOG_LEVEL_INFO);
        ioJobController.mouseOver(toolBox.pointerX(_event), toolBox.pointerY(_event));
    }
    toolBox.mouseX = toolBox.pointerX(_event);
    toolBox.mouseY = toolBox.pointerY(_event);
    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasMouseUp(_event) {
    if (toolBox.touchAvailable === true) {
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }
    clearTimeout(toolBox.longTouchTimeOut);
    clearInterval(toolBox.longTouchInterval);
    if (toolBox.isRightClick(_event) === true) {
        return false;
    }
    if (toolBox.isMouseDown) {
        toolBox.isMouseDown = false;
        toolBox.mouseX = toolBox.pointerX(_event);
        toolBox.mouseY = toolBox.pointerY(_event);
        if (toolBox.isLongTouch === true) {
            toolBox.isLongTouch = false;
            toolBox.isZoomIn = !toolBox.isZoomIn;
        }
        logger.put('MouseUp - Drop', toolBox.LOG_LEVEL_INFO);
        ioJobController.drop(toolBox.mouseX, toolBox.mouseY);
    }
    else {
        logger.put('MouseUp - Nothing', toolBox.LOG_LEVEL_INFO);
    }
    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasTouchEnd(_event) {
    clearTimeout(toolBox.longTouchTimeOut);
    clearInterval(toolBox.longTouchInterval);
    if (toolBox.isMouseDown) {
        toolBox.isMouseDown = false;
        toolBox.tapEndTime = new Date();
        toolBox.mouseX = toolBox.pointerX(_event);
        toolBox.mouseY = toolBox.pointerY(_event);
        toolBox.tapCount++;
        if (toolBox.isLongTouch === true) {
            toolBox.isLongTouch = false;
            toolBox.isZoomIn = !toolBox.isZoomIn;
        }
        logger.put('TouchEnd - Drop', toolBox.LOG_LEVEL_INFO);
        ioJobController.drop(toolBox.mouseX, toolBox.mouseY);
        if (toolBox.tapCount === 2) {
            toolBox.tapCount = 0;
            logger.put('DoubleTap', toolBox.LOG_LEVEL_INFO);
            ioJobController.doubleHit(toolBox.mouseX, toolBox.mouseY);
        }
    }
    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasContextMenu(_event) {
    if (_event.shiftKey === true) {
        _event.preventDefault();
        _event.cancelBubble = true;
        return true;
    }
    logger.put('canvasContextMenu', toolBox.LOG_LEVEL_INFO);
    toolBox.mouseX = toolBox.pointerX(_event);
    toolBox.mouseY = toolBox.pointerY(_event);
    ioJobController.showContextMenu(toolBox.mouseX, toolBox.mouseY, _event.ctrlKey || _event.shiftKey);
    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasDoubleClick(_event) {
    logger.put('canvasDoubleClick', toolBox.LOG_LEVEL_INFO);
    if (toolBox.touchAvailable === true) {
        logger.put('not touchAvailable', toolBox.LOG_LEVEL_INFO);
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }
    if (toolBox.isRightClick(_event) === true) {
        logger.put('RightClick', toolBox.LOG_LEVEL_INFO);
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }
    toolBox.mouseX = toolBox.pointerX(_event);
    toolBox.mouseY = toolBox.pointerY(_event)
    if (!toolBox.isSamePoint(toolBox.mouseX, toolBox.savedMouseX, toolBox.mouseY, toolBox.savedMouseY, 1)) {
        logger.put('mouseX=' + toolBox.mouseX + ' savedMouseX=' + toolBox.savedMouseX + ' mouseY=' + toolBox.mouseY + ' savedMouseY=' + toolBox.savedMouseY, toolBox.LOG_LEVEL_INFO);
        _event.preventDefault();
        _event.cancelBubble = true;
        return false;
    }

    logger.put('DoubleClick', toolBox.LOG_LEVEL_INFO);
    ioJobController.doubleHit(toolBox.mouseX, toolBox.mouseY);
    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasMouseWheel(_event) {
    clearTimeout(toolBox.wheelEndTimeOut);
    var zoomIn = false;
    if (_event.wheelDelta) {
        if (_event.wheelDelta > 0) {
            zoomIn = true;
        }
        else {
            zoomIn = false;
        }
    }
    else {
        if (_event.detail >= 0) {
            zoomIn = false;
        }
        else {
            zoomIn = true;
        }
    }

    if (zoomIn === true) {
        logger.put('MouseWheel - zoomIn', toolBox.LOG_LEVEL_INFO);
        ioJobController.zoomIn();
        ioJobController.zoomIn();
    }
    else {
        logger.put('MouseWheel - zoomOut', toolBox.LOG_LEVEL_INFO);
        ioJobController.zoomOut();
        ioJobController.zoomOut();
    }
    toolBox.lastWheelTime = new Date().getTime();

    toolBox.wheelEndTimeOut = setTimeout(function() {
        logger.put('MouseWheel - virtualdrop', toolBox.LOG_LEVEL_INFO);
        ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
    }, 200);

    _event.preventDefault();
    _event.cancelBubble = true;
    return false;
}

function canvasGestureStart(_event) {
//    alert(_event);
}
function canvasGestureChange(_event) {
//    alert(_event);
}
function documentGestureEnd(_event) {
//    alert(_event);
}

function documentUnload() {
    return translator.t('MAPは保存しましたか？');
}

function documentResize(_event) {
    logger.put('onDocumentResize', toolBox.LOG_LEVEL_INFO);
    ioJobController.resizeWorld();
}

function documentKeyup(_event) {
    if (toolBox.isMouseDown === true || toolBox.isLongTouch === true) {
        return false;
    }
    logger.put('Keyup', toolBox.LOG_LEVEL_INFO);

    if (toolBox.isKeyCommandDone === true) {
        toolBox.isKeyCommandDone = false;
        ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
    }

    return false;
}

function documentKeydown(_event) {
    clearTimeout(toolBox.wheelEndTimeOut);

    if (document.activeElement === $('searchtext') || document.activeElement === $('q') || document.activeElement === $('searchbutton') || document.activeElement === $('wikibutton')) {
        return;
    }

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

    if (ioJobController.isCommandAcceptable() === false && keycode !== 27 && keycode != 13 && keycode != 37 && keycode != 38 && keycode != 39 && keycode != 40 && keycode !== 113) {
        return;
    }

    logger.put('keycode = ' + keycode, toolBox.LOG_LEVEL_INFO);

    keychar = String.fromCharCode(keycode).toUpperCase();
    if (ctrl) {
        if (keycode === 38) {   //UP
            if (toolBox.isKeyCommandDone === false) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - singleHit', toolBox.LOG_LEVEL_INFO);
                ioJobController.singleHit(toolBox.mouseX, toolBox.mouseY, false);
            }
            logger.put('Keydown - zoomIn', toolBox.LOG_LEVEL_INFO);
            ioJobController.zoomIn();//toolBox.mouseX, toolBox.mouseY);
        }
        else if (keycode === 40) {  //DOWN
            if (toolBox.isKeyCommandDone === false) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - singleHit', toolBox.LOG_LEVEL_INFO);
                ioJobController.singleHit(toolBox.mouseX, toolBox.mouseY, false);
            }
            logger.put('Keydown - zoomOut', toolBox.LOG_LEVEL_INFO);
            ioJobController.zoomOut();//toolBox.mouseX, toolBox.mouseY);
        }
        else if (keycode === 13) { //Enter
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - surfaceFromCurrentBody', toolBox.LOG_LEVEL_INFO);
            ioJobController.surfaceFromCurrentBody();
        }
        else if (keychar === 'C') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - Copy', toolBox.LOG_LEVEL_INFO);
            ioJobController.copySelectedEntities();
        }
        else if (keychar === 'X') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - Cut', toolBox.LOG_LEVEL_INFO);
            ioJobController.cutSelectedEntities();
        }
        else if (keychar === 'V') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - Paste', toolBox.LOG_LEVEL_INFO);
            ioJobController.pasteEntities();
        }
        else if (keychar === 'Z') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - Undo', toolBox.LOG_LEVEL_INFO);
            ioJobController.undo();
        }
        else if (keychar === 'Y') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - Redo', toolBox.LOG_LEVEL_INFO);
            ioJobController.redo();
        }
        else if (keychar === 'A') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - select all', toolBox.LOG_LEVEL_INFO);
            if (_event) {
                _event.preventDefault();
            }
            else {
                _event.returnValue = false;
                _event.cancelBubble = true;
            }
            ioJobController.selectAll();
        }
        else if (keychar === 'Q') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - save image', toolBox.LOG_LEVEL_INFO);
            ioJobController.generateImage();
        }
        else if (keychar === 'S') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - save', toolBox.LOG_LEVEL_INFO);
            if (_event) {
                _event.preventDefault();
            }
            else {
                _event.returnValue = false;
                _event.cancelBubble = true;
            }
            ioJobController.save();
            return false;
        }
        else if (keychar === 'F') {
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - searchInputInTopView', toolBox.LOG_LEVEL_INFO);
            if (_event) {
                _event.preventDefault();
            }
            else {
                _event.returnValue = false;
                _event.cancelBubble = true;
            }
            ioJobController.searchInputInTopView();
            return false;
        }
    }
    else if (shift) {
        if (keycode === 114) { //F3
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - F3 to searchPreviousInTopView', toolBox.LOG_LEVEL_INFO);
                if (_event) {
                    _event.preventDefault();
                }
                else {
                    _event.returnValue = false;
                    _event.cancelBubble = true;
                }
                ioJobController.searchPreviousInTopView();
                return false;
            }
        }
    }
    else {
        if (keycode === 13) { //Enter
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - DoubleHit', toolBox.LOG_LEVEL_INFO);
                ioJobController.doubleHit(toolBox.mouseX, toolBox.mouseY);
            }
            else {
                logger.put('Enter while doing something', toolBox.LOG_LEVEL_INFO);
                ioJobController.acceptSelectionInDialog();;
            }
        }
        else if (keycode === 46) { //Delete
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - Delete', toolBox.LOG_LEVEL_INFO);
            ioJobController.deleteSelectedShapes(toolBox.mouseX, toolBox.mouseY);
        }
        else if (keycode === 8) { //BackSpace
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - surfaceFromCurrentBody', toolBox.LOG_LEVEL_INFO);
            ioJobController.surfaceFromCurrentBody();
        }
        else if (keycode === 112) { //F1
            toolBox.isKeyCommandDone = true;
            logger.put('F1 while doing something', toolBox.LOG_LEVEL_INFO);
            ioJobController.doOpenHelp();
        }
        else if (keycode === 113) { //F2
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - EditSelectedShapes', toolBox.LOG_LEVEL_INFO);
                ioJobController.editSelectedShapes();
            }
            else {
                logger.put('F2 while doing something', toolBox.LOG_LEVEL_INFO);
                ioJobController.doSaveActionInDialog();
            }
        }
        else if (keycode === 114) { //F3
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - F3 to searchNextInTopView', toolBox.LOG_LEVEL_INFO);
                if (_event) {
                    _event.preventDefault();
                }
                else {
                    _event.returnValue = false;
                    _event.cancelBubble = true;
                }
                ioJobController.searchNextInTopView();
                return false;
            }
        }
        else if (keycode === 27) { //ESC
            toolBox.isKeyCommandDone = true;
            logger.put('Keydown - ESC', toolBox.LOG_LEVEL_INFO);
            ioJobController.closeAllMenus();
        }
        else if (keycode === 37) { //LEFT
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - LEFT', toolBox.LOG_LEVEL_INFO);
                ioJobController.doLeft();
//                ioJobController.drag(-10, -0);
//                ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
            }
            else {
                logger.put('Left while doing something', toolBox.LOG_LEVEL_INFO);
                ioJobController.selectLeftwardInDialog();
            }
        }
        else if (keycode === 38) { //UP
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - UP', toolBox.LOG_LEVEL_INFO);
                ioJobController.doUp();
//                ioJobController.drag(0, -10);
//                ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
            }
            else {
                logger.put('Up while doing something', toolBox.LOG_LEVEL_INFO);
                ioJobController.selectUpwardInDialog();
            }
        }
        else if (keycode === 39) { //RIGHT
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - RIGHT', toolBox.LOG_LEVEL_INFO);
                ioJobController.doRight();
//                ioJobController.drag(10, 0);
//                ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
            }
            else {
                logger.put('Right while doing something', toolBox.LOG_LEVEL_INFO);
                ioJobController.selectRightwardInDialog();
            }
        }
        else if (keycode === 40) { //DOWN
            if (ioJobController.isCommandAcceptable() === true) {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - DOWN', toolBox.LOG_LEVEL_INFO);
                ioJobController.doDown();
//                ioJobController.drag(0, 10);
//                ioJobController.virtualDrop(toolBox.mouseX, toolBox.mouseY);
            }
            else {
                logger.put('Down while doing something', toolBox.LOG_LEVEL_INFO);
                ioJobController.selectDownwardInDialog();
            }
        }
        else {
            if (keychar === 'D') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - Delete', toolBox.LOG_LEVEL_INFO);
                ioJobController.deleteSelectedShapes(toolBox.mouseX, toolBox.mouseY);
            }
            else if (keychar === 'I') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - DoubleHit', toolBox.LOG_LEVEL_INFO);
                ioJobController.doubleHit(toolBox.mouseX, toolBox.mouseY);
            }
            else if (keychar === 'V') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - ChangeViewMode', toolBox.LOG_LEVEL_INFO);
                ioJobController.changeTopViewMode();
            }
            else if (keychar === 'Q') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - Create Multiple Shapes', toolBox.LOG_LEVEL_INFO);
                ioJobController.createMultipleShapes();
            }
            else if (keychar === 'R') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - StartRangeSelection', toolBox.LOG_LEVEL_INFO);
                ioJobController.startRangeSelection();
            }
            else if (keychar === 'U') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - surfaceFromCurrentBody', toolBox.LOG_LEVEL_INFO);
                ioJobController.surfaceFromCurrentBody();
            }
            else if (keychar === 'B') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - editSelectedBody', toolBox.LOG_LEVEL_INFO);
                ioJobController.editSelectedBody();
            }
            else if (keychar === 'L') {
                toolBox.isKeyCommandDone = true;
                logger.put('Keydown - editSelectedLink', toolBox.LOG_LEVEL_INFO);
                ioJobController.editSelectedLink();
            }
        }
    }
    if (keycode === 8 && (document.activeElement !== $('searchtext') || document.activeElement !== $('q'))) {
        return false;
    }
}
