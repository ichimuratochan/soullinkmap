var toolBox = new ToolBox();
var translator = new Translator();
var logger = new Logger(toolBox.LOG_LEVEL_ERROR);
//var logger = new Logger(toolBox.LOG_LEVEL_DEBUG);
//var logger = new Logger(toolBox.LOG_LEVEL_INFO);
var canvasManager;
var ioJobController;
function $(_id) {
    var ele = document.getElementById(_id);
    if (toolBox.isNullOrUndefined(ele) === true) {
        if (document.getElementsByName(_id).length > 0) {
            ele = document.getElementsByName(_id)[0];
        }
    }
    return ele;
}
