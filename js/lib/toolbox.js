var ToolBox = function(){this.initialize.apply(this, arguments);}
ToolBox.prototype = {
    FOOTER_HEIGHT               : 45
,   LOG_LEVEL_TEST              : 4
,   LOG_LEVEL_ERROR             : 3
,   LOG_LEVEL_INFO              : 2
,   LOG_LEVEL_DEBUG             : 1
,   COMMAND_TYPE_INITIALIZE     : 0
,   COMMAND_TYPE_DIVE_OR_EDIT   : 1
,   COMMAND_TYPE_MOUSE_OVER     : 2
,   COMMAND_TYPE_SELECT         : 3
,   COMMAND_TYPE_MULTI_SELECT   : 4
,   COMMAND_TYPE_DRAG           : 5
,   COMMAND_TYPE_DROP           : 6
,   COMMAND_TYPE_CLOSE          : 7
,   COMMAND_TYPE_MAXIMIZE       : 8
,   COMMAND_TYPE_RESUME_SIZE    : 9
,   COMMAND_TYPE_ZOOM_IN        : 10
,   COMMAND_TYPE_ZOOM_OUT       : 11
,   COMMAND_TYPE_RESIZE_WORLD   : 12
,   COMMAND_TYPE_CLICK          : 13
,   COMMAND_TYPE_DELETE         : 14
,   COMMAND_TYPE_VIRTUAL_DROP   : 15
,   COMMAND_TYPE_ANIMATION      : 16
,   COMMAND_TYPE_OTHER          : 99
,   DRAW_TARGET_STATUS_INITIALIZED          : 0
,   DRAW_TARGET_STATUS_PREPARING            : 1
,   DRAW_TARGET_STATUS_FINISH_PREPARING     : 2
,   DRAW_TARGET_STATUS_DRAWING              : 3
,   DRAW_TARGET_STATUS_FINISH_DRAWING       : 4
,   DRAW_MODE_NORMAL                        : 0
,   DRAW_MODE_MOVGING_SHAPE_ISOLATION_START : 1
,   DRAW_MODE_MOVE_CONTAINER_IMAGE_START    : 2
,   DRAW_MODE_OTHER                         : 99
,   BORDER_POSITION_TOP                 : 0
,   BORDER_POSITION_TOP_RIGHT_CORNER    : 1
,   BORDER_POSITION_RIGHT               : 2
,   BORDER_POSITION_BOTTOM_RIGHT_CORNER : 3
,   BORDER_POSITION_BOTTOM              : 4
,   BORDER_POSITION_BOTTOM_LEFT_CORNER  : 5
,   BORDER_POSITION_LEFT                : 6
,   BORDER_POSITION_TOP_LEFT_CORNER     : 7
,   DOCK_POSITION_TOP                   : 0
,   DOCK_POSITION_TOP_RIGHT_CORNER      : 1
,   DOCK_POSITION_RIGHT                 : 2
,   DOCK_POSITION_BOTTOM_RIGHT_CORNER   : 3
,   DOCK_POSITION_BOTTOM                : 4
,   DOCK_POSITION_BOTTOM_LEFT_CORNER    : 5
,   DOCK_POSITION_LEFT                  : 6
,   DOCK_POSITION_TOP_LEFT_CORNER       : 7
,   DOCK_POSITION_LINK                  : 8
,   DOCK_POSITION_BODY                  : 9
,   FRAME_BUTTON_TYPE_CLOSE             : 0
,   FRAME_BUTTON_TYPE_MAXIMIZE          : 1
,   FRAME_BUTTON_TYPE_RESUME_SIZE       : 2
,   FRAME_BUTTON_TYPE_OK                : 3
,   FRAME_BUTTON_TYPE_CANCEL            : 4
,   FRAME_BUTTON_TYPE_CHANGE_VIEWMODE   : 5
,   FRAME_BUTTON_TYPE_CHANGE_EXPORTMODE : 6
,   FRAME_BUTTON_TYPE_CHANGE_URLMODE    : 7
,   SCROLL_TYPE_VERTICAL    : 0
,   SCROLL_TYPE_HORIZONTAL  : 1
,   SCROLL_TYPE_RESET       : 2
,   SCROLL_BAR_WIDTH        : 5
,   SOUL_MASTER_SIZE        : 60
,   SHAPE_WIDTH_MIN         : 121
,   SHAPE_HEIGHT_MIN        : 30
,   SHAPE_WIDTH_MAX         : 99999
,   SHAPE_HEIGHT_MAX        : 99999
,   BORDER_SIZE             : 10
,   FRAME_BUTTON1_WIDTH     : 45
,   FRAME_BUTTON1_HEIGHT    : 20
,   PATH_BAR_HEIGHT         : 20
,   SEARCH_CONTROL_OPENED_WIDTH : 150
,   SEARCH_CONTROL_CLOSED_WIDTH : 23
,   SEARCH_CONTROL_HEIGHT   : 20

,   FLAG_NAMES  : {'0':'OFF','1':'ON'}

,   EXPORT_MODE_XML         : 0
,   EXPORT_MODE_JSONP       : 1
,   EXPORT_MODE_MAX         : 1

,   HYPER_LINK_URL_MODE_NORMAL  : 0
,   HYPER_LINK_URL_MODE_JSONP   : 1
,   HYPER_LINK_URL_MODE_MAX     : 1

,   VIEW_MODE_EDITVIEW      : 0
,   VIEW_MODE_BIRDVIEW      : 1
,   VIEW_MODE_LINKVIEW      : 2
,   VIEW_MODE_MAX           : 2

,   VIEW_STYLE_MODE_ORIGINAL    : 0
,   VIEW_STYLE_MODE_BODY        : 1
,   VIEW_STYLE_MODE_MAX         : 1
,   VIEW_STYLE_MODE_NAMES       : {0:'独自スタイル',1:'Bodyスタイル'}

,   VIEW_IMAGE_MODE_ORIGINAL    : 0
,   VIEW_IMAGE_MODE_BODY        : 1
,   VIEW_IMAGE_MODE_MAX         : 1
,   VIEW_IMAGE_MODE_NAMES       : {0:'独自画像',1:'Body画像'}

,   ENTITY_TYPE_OTHER       : 0
,   ENTITY_TYPE_LINK        : 1
,   ENTITY_TYPE_BODY        : 2

,   DEFAULT_LINK_WIDTH      : 121
,   DEFAULT_LINK_HEIGHT     : 30
,   DEFAULT_BODY_WIDTH      : 121
,   DEFAULT_BODY_HEIGHT     : 75

,   MENUMODE_BACKGROUND         : 0
,   MENUMODE_EDITVIEW           : 1
,   MENUMODE_EDITVIEW_SELECTED  : 2
,   MENUMODE_BIRDVIEW           : 3
,   MENUMODE_BIRDVIEW_SELECTED  : 4
,   MENUMODE_LINKVIEW           : 5
,   MENUMODE_LINKVIEW_SELECTED  : 6

,   NEW_MAP_TEXT            : '新しいMAP'

,   SOUL_ID_WORLD           : '0'
,   SOUL_ID_SAME            : '1'
,   SOUL_ID_INHERITED       : '2'
,   SOUL_ID_BELONG          : '3'
,   SOUL_ID_SAME_ENG        : '4'
,   SOUL_ID_INHERITED_ENG   : '5'
,   SOUL_ID_BELONG_ENG      : '6'

,   BODY_ID_WORLD           : '0'

,   SOUL_RELATION_EQUAL     : '='

,   BODY_FORMAT_ID_BODY_STANDARD : '0'
,   BODY_FORMAT_ID_LINK_STANDARD : '1'

,   DEFAULT_TEXT_LINK       : '(LINK)'
,   DEFAULT_TEXT_BODY       : '(BODY)'

,   TEXT_ALIGN_RIGHT        : 'right'
,   TEXT_ALIGN_CENTER       : 'center'
,   TEXT_ALIGN_LEFT         : 'left'

,   FILTER_TYPE_SOUL        : 0
,   FILTER_TYPE_TEXT        : 1

,   LOGICAL_OPERATOR_AND    : 1
,   LOGICAL_OPERATOR_OR     : 2

,   CONDITION_OPERATOR_EQUAL        : 0
,   CONDITION_OPERATOR_NOT_EQUAL    : 1

,   BIRDVIEW_TYPE_SPLIT     : 0
,   BIRDVIEW_TYPE_UNITE     : 1

,   BIRDVIEW_LEVEL_SIMPLE   : 0
,   BIRDVIEW_LEVEL_NORMAL   : 1
,   BIRDVIEW_LEVEL_BOOST    : 2
,   BIRDVIEW_LEVEL_NAMES    : {0:'シンプル',1:'ノーマル',2:'ブースト'}
,   BIRDVIEW_LEVEL_MIN      : 0
,   BIRDVIEW_LEVEL_MAX      : 2

,   BIRDVIEW_DIRECTION_RIGHT    : 0
,   BIRDVIEW_DIRECTION_DOWN     : 1
,   BIRDVIEW_DIRECTION_LEFT     : 2
,   BIRDVIEW_DIRECTION_UP       : 3
,   BIRDVIEW_DIRECTION_DEEPER   : 4
,   BIRDVIEW_DIRECTION_HIGHER   : 5
,   BIRDVIEW_DIRECTION_NAMES    : {0:'右',1:'下',2:'左',3:'上',4:'ダイブ',5:'浮上'}

,   DEFAULT_BACK_GROUND_IMG     : 'img/sky77.jpg'
,   FADE_STROKE_COLOR           : '#cccccc'
,   FADE_FILL_COLOR             : '#ffffff'
,   INNER_FADE_COLOR            : '#cccccc'
,   SELECTED_SHAPE_COLOR        : '#0000FF'
,   SHADOW_COLOR                : '#696969'
,   CENTER_SOUL_STROKE_COLOR    : '#d2b48c'
,   SOUL_SHARE_FILL_COLOR       : '#ffffff'
,   HYPER_LINK_FILL_COLOR       : '#fffacd'
,   HYPER_LINK_STROKE_COLOR     : '#ffa500'
,   HYPER_LINK_JSONP_FILL_COLOR     : '#000000'
,   HYPER_LINK_JSONP_STROKE_COLOR   : '#8080ff'

,   LOCK_BOLT_FILL_COLOR        : '#808080'
,   SHAPE_TYPE_RECT             : 0
,   SHAPE_TYPE_RRECT            : 1
,   RRECT_RADIUS_SIZE           : 10
,   LINK_SHAPE_MARGIN_SIZE      : 5
,   LOCK_BOLT_SIZE              : 12
,   HYPER_LINK_BUTTON_WIDTH     : 30
,   HYPER_LINK_BUTTON_HEIGHT    : 12
,   HYPER_LINK_BUTTON_RADIUS    : 3
,   ARROW_FOOT_LENGTH           : 20
,   ARROW_FOOT_DEGREE           : 30

,   CLIPBOARD_MODE_COPY         : 0
,   CLIPBOARD_MODE_CUT          : 1

,   TRANSACTION_TYPE_INSERT : 0
,   TRANSACTION_TYPE_UPDATE : 1
,   TRANSACTION_TYPE_DELETE : 2

,   SERIALIZE_TAG_TABLE             : '<TABLE>'
,   SERIALIZE_TAG_TABLE_END         : '</TABLE>'
,   SERIALIZE_TAG_TABLE_NAME        : '<TABLE_NAME>'
,   SERIALIZE_TAG_TABLE_NAME_END    : '</TABLE_NAME>'
,   SERIALIZE_TAG_ROWS              : '<ROWS>'
,   SERIALIZE_TAG_ROWS_END          : '</ROWS>'
,   SERIALIZE_TAG_ROW               : '<ROW>'
,   SERIALIZE_TAG_ROW_END           : '</ROW>'
,   COLUMN_TYPE_STRING      : 'STRING'
,   COLUMN_TYPE_NUMBER      : 'NUMBER'
,   isMouseDown             : false
,   isTapDown               : false
,   isLongTouch             : false
,   isZoomIn                : true
,   isKeyCommandDone        : false
,   longTouchTimeOut        : null
,   longTouchInterval       : null
,   wheelEndTimeOut         : null
,   tapStartTime            : null
,   tapEndTime              : null
,   tapCount                : 0
,   lastWheelTime           : 0
,   mouseX                  : 0
,   mouseY                  : 0
,   savedMouseX             : 0
,   savedMouseY             : 0
,   userSelectedFile        : null
,   isIE                    : false
,   isOpera                 : false
,   isFireFox               : false
,   isChrome                : false
,   isSafari                : false
,   isTouchAvailable        : false
,   ZENKAKU_ALPHANUMERIC    : '！”＃＄％＆’（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～'
,   HANKAKU_ALPHANUMERIC    : '\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/0123456789\:\;\<\=\>\?\@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^\_\'abcdefghijklmnopqrstuvwxyz\{\|\}\~'
,   ALPHANUMERIC_MAP        : {'！':'\!','”':'\"','＃':'\#','＄':'\$','％':'\%','＆':'\&','’':'\'','（':'\(','）':'\)','＊':'\*','＋':'\+','，':'\,','－':'\-','．':'\.','／':'\/',
                               '０':'0','１':'1','２':'2','３':'3','４':'4','５':'5','６':'6','７':'7','８':'8','９':'9','：':'\:','；':'\;','＜':'\<','＝':'\=','＞':'\>','？':'\?','＠':'\@',
                               'Ａ':'A','Ｂ':'B','Ｃ':'C','Ｄ':'D','Ｅ':'E','Ｆ':'F','Ｇ':'G','Ｈ':'H','Ｉ':'I','Ｊ':'J','Ｋ':'K','Ｌ':'L','Ｍ':'M','Ｎ':'N','Ｏ':'O','Ｐ':'P','Ｑ':'Q','Ｒ':'R','Ｓ':'S',
                               'Ｔ':'T','Ｕ':'U','Ｖ':'V','Ｗ':'W','Ｘ':'X','Ｙ':'Y','Ｚ':'Z','［':'\[','＼':'\\','］':'\]','＾':'\^','＿':'\_','｀':'\'',
                               'ａ':'a','ｂ':'b','ｃ':'c','ｄ':'d','ｅ':'e','ｆ':'f','ｇ':'g','ｈ':'h','ｉ':'i','ｊ':'j','ｋ':'k','ｌ':'l','ｍ':'m','ｎ':'n','ｏ':'o','ｐ':'p','ｑ':'q','ｒ':'r','ｓ':'s',
                               'ｔ':'t','ｕ':'u','ｖ':'v','ｗ':'w','ｘ':'x','ｙ':'y','ｚ':'z','｛':'\{','｜':'\|','｝':'\}','～':'\~'}
,   ZENKAKU_HIRAGANA        : 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょ'
,   ZENKAKU_KATAKANA        : 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョ'
,   HIRAGANA_MAP            : {'あ':'ｱ','い':'ｲ','う':'ｳ','え':'ｴ','お':'ｵ','か':'ｶ','き':'ｷ','く':'ｸ','け':'ｹ','こ':'ｺ','さ':'ｻ','し':'ｼ','す':'ｽ','せ':'ｾ','そ':'ｿ','た':'ﾀ','ち':'ﾁ','つ':'ﾂ','て':'ﾃ','と':'ﾄ','な':'ﾅ','に':'ﾆ','ぬ':'ﾇ','ね':'ﾈ','の':'ﾉ','は':'ﾊ','ひ':'ﾋ','ふ':'ﾌ','へ':'ﾍ','ほ':'ﾎ','ま':'ﾏ','み':'ﾐ','む':'ﾑ','め':'ﾒ','も':'ﾓ','や':'ﾔ','ゆ':'ﾕ','よ':'ﾖ','ら':'ﾗ','り':'ﾘ','る':'ﾙ','れ':'ﾚ','ろ':'ﾛ','わ':'ﾜ','を':'ｦ','ん':'ﾝ','が':'ｶﾞ','ぎ':'ｷﾞ','ぐ':'ｸﾞ','げ':'ｹﾞ','ご':'ｺﾞ','ざ':'ｻﾞ','じ':'ｼﾞ','ず':'ｽﾞ','ぜ':'ｾﾞ','ぞ':'ｿﾞ','だ':'ﾀﾞ','ぢ':'ﾁﾞ','づ':'ﾂﾞ','で':'ﾃﾞ','ど':'ﾄﾞ','ば':'ﾊﾞ','び':'ﾋﾞ','ぶ':'ﾌﾞ','べ':'ﾍﾞ','ぼ':'ﾎﾞ','ぱ':'ﾊﾟ','ぴ':'ﾋﾟ','ぷ':'ﾌﾟ','ぺ':'ﾍﾟ','ぽ':'ﾎﾟ','ぁ':'ｱ','ぃ':'ｲ','ぅ':'ｳ','ぇ':'ｴ','ぉ':'ｵ','っ':'ﾂ','ゃ':'ﾔ','ゅ':'ﾕ','ょ':'ﾖ'}
,   KATAKANA_MAP            : {'ア':'ｱ','イ':'ｲ','ウ':'ｳ','エ':'ｴ','オ':'ｵ','カ':'ｶ','キ':'ｷ','ク':'ｸ','ケ':'ｹ','コ':'ｺ','サ':'ｻ','シ':'ｼ','ス':'ｽ','セ':'ｾ','ソ':'ｿ','タ':'ﾀ','チ':'ﾁ','ツ':'ﾂ','テ':'ﾃ','ト':'ﾄ','ナ':'ﾅ','ニ':'ﾆ','ヌ':'ﾇ','ネ':'ﾈ','ノ':'ﾉ','ハ':'ﾊ','ヒ':'ﾋ','フ':'ﾌ','ヘ':'ﾍ','ホ':'ﾎ','マ':'ﾏ','ミ':'ﾐ','ム':'ﾑ','メ':'ﾒ','モ':'ﾓ','ヤ':'ﾔ','ユ':'ﾕ','ヨ':'ﾖ','ラ':'ﾗ','リ':'ﾘ','ル':'ﾙ','レ':'ﾚ','ロ':'ﾛ','ワ':'ﾜ','ヲ':'ｦ','ン':'ﾝ','ガ':'ｶﾞ','ギ':'ｷﾞ','グ':'ｸﾞ','ゲ':'ｹﾞ','ゴ':'ｺﾞ','ザ':'ｻﾞ','ジ':'ｼﾞ','ズ':'ｽﾞ','ゼ':'ｾﾞ','ゾ':'ｿﾞ','ダ':'ﾀﾞ','ヂ':'ﾁﾞ','ヅ':'ﾂﾞ','デ':'ﾃﾞ','ド':'ﾄﾞ','バ':'ﾊﾞ','ビ':'ﾋﾞ','ブ':'ﾌﾞ','ベ':'ﾍﾞ','ボ':'ﾎﾞ','パ':'ﾊﾟ','ピ':'ﾋﾟ','プ':'ﾌﾟ','ペ':'ﾍﾟ','ポ':'ﾎﾟ','ァ':'ｱ','ィ':'ｲ','ゥ':'ｳ','ェ':'ｴ','ォ':'ｵ','ッ':'ﾂ','ャ':'ﾔ','ュ':'ﾕ','ョ':'ﾖ'}
,   SAVED_MAP_LIST_KEY      : 'savedMapList'
,   SAVED_MAP_LIST_DELIMITER    : '@@@'

//メモリ動的確保防止用変数
,   tempX                   : 0
,   tempY                   : 0
,   tempW                   : 0
,   tempH                   : 0
,   tempX2                  : 0
,   tempY2                  : 0
,   tempR                   : 0
,   tempRect1               : null
,   tempRect2               : null
,   tempLine                : null
,   a                       : 0
,   b                       : 0
,   c                       : 0
,   d                       : 0
,   e                       : 0
,   rectForAdjustingTempPos : null
,   dateTimeKey             : new Date()
,   seqKey                  : 0
,   isCookieAvailable       : false
,   initialize: function() {
        this.tempRect1 = new Rect(0, 0, 0, 0);
        this.tempRect2 = new Rect(0, 0, 0, 0);
        this.tempLine = new Rect(0, 0, 0, 0);
        var userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('opera') != -1) {
            this.isOpera = true;
        } else if (userAgent.indexOf('msie') != -1) {
            this.isIE = true;
        } else if (userAgent.indexOf('chrome') != -1) {
            this.isChrome = true;
        } else if (userAgent.indexOf('safari') != -1) {
            this.isSafari = true;
        } else if (userAgent.indexOf('firefox') != -1) {
            this.isFireFox = true;
        }
        this.isCookieAvailable = this.checkIsCookieAvailable();
    }
,   checkIsCookieAvailable: function() {
        this.setCookie('isCookieAvailable','true');
        if (this.getCookie('isCookieAvailable') === null) {
            return false;
        }
        else {
            return true;
        }
    }
,   setCookie: function(_key, _value) {
        var cookieString = '';
        //path
        var path = location.pathname;
        var paths = new Array();
        paths = path.split('/');
        if (paths[paths.lenght-1] !== '') {
            paths[paths.length-1] = '';
            path = paths.join('/');
        }
        //有効期限
        var exptime = new Date().getTime();
        var cltime = new Date(exptime + (60 * 60 * 24 * 1000 * 10000));
        var expdate = cltime.toUTCString();
        //Cookie文字列生成
        cookieString += encodeURIComponent(_key) + '=' + encodeURIComponent(_value) + '; path=' + path + '; expires=' + expdate + '; ';
        document.cookie = cookieString;
    }
,   getCookie: function(_key) {
        if (document.cookie.length > 0) {
            var keyValues = {};
            var cookieParams = document.cookie.split(';');

            for (var i=0;i<cookieParams.length;i++) {
                var element = cookieParams[i].split('=');

                var key = this.trim(decodeURIComponent(element[0]));
                var value = this.trim(decodeURIComponent(element[1]));

                keyValues[key] = value;
            }
            return keyValues[_key];
        }
        else {
            return null;
        }
    }
,   keyExistsInStorage: function(_key) {
        if (window.localStorage.getItem(_key)) {
            return true;
        }
        else {
            return false;
        }
    }
,   setItemInStorage: function(_key, _value) {
        window.localStorage.setItem(_key, _value);
    }
,   getItemFromStorage: function(_key) {
        return window.localStorage.getItem(_key);
    }
,   removeItemFromStorage: function(_key) {
        window.localStorage.removeItem(_key);
    }
,   extend: function(_destination, _source) {
        for (var property in _source) {
            _destination[property] = _source[property];
        }
        return _destination;
    }
,   clean: function(_target) {
        for (var property in _target) {
            delete _target[property];
        }
    }
,   createUniqueKey: function() {
        this.dateTimeKey = new Date();
        this.seqKey++;
        if (this.seqKey > 99999) {
            this.seqKey = 0;
        }
        return (Number(this.dateTimeKey) + Math.random()).toString() + '.' + this.seqKey.toString();
    }
,   randomNumber: function(_max) {
        return Math.floor(Math.random() * _max) + 1;
    }
,   pointerX: function(_event) {
        if (this.isOpera === true) {
            return this.nvl(_event.offsetX, 0);
        }
        if (_event.touches) {
            if (_event.touches.length > 0) {
                return this.nvl(_event.touches[0].pageX, 0);
            }
            return this.nvl(_event.changedTouches[0].pageX, 0);
        }
        if (this.isFireFox && _event.layerX) {
            return this.nvl(_event.layerX, 0);
        }
        return this.nvl(_event.offsetX, 0);
    }
,   pointerY: function(_event) {
        if (this.isOpera === true) {
            return this.nvl(_event.offsetY, 0);
        }
        if (_event.touches) {
            if (_event.touches.length > 0) {
                return this.nvl(_event.touches[0].pageY, 0);
            }
            return this.nvl(_event.changedTouches[0].pageY, 0);
        }
        if (this.isFireFox && _event.layerY) {
            return this.nvl(_event.layerY, 0);
        }
        return this.nvl(_event.offsetY, 0);
    }
,   pointerX2: function(_event) {
        if (this.isOpera === true) {
            return this.nvl(_event.offsetX, 0);
        }
        if (_event.touches) {
            if (_event.touches.length > 0) {
                return this.nvl(_event.touches[0].pageX, 0);
            }
            return this.nvl(_event.changedTouches[0].pageX, 0);
        }
        if (this.isFireFox && _event.clientX) {
            return this.nvl(_event.clientX, 0);
        }
        return this.nvl(_event.clientX, 0);
    }
,   pointerY2: function(_event) {
        if (this.isOpera === true) {
            return this.nvl(_event.offsetY, 0);
        }
        if (_event.touches) {
            if (_event.touches.length > 0) {
                return this.nvl(_event.touches[0].pageY, 0);
            }
            return this.nvl(_event.changedTouches[0].pageY, 0);
        }
        if (this.isFireFox && _event.clientY) {
            return this.nvl(_event.clientY, 0);
        }
        return this.nvl(_event.clientY, 0);
    }
,   isSamePoint: function(_x1, _x2, _y1, _y2, _adjustment) {
        var adjustment = 0;
        if (this.isNullOrUndefined(_adjustment) === false) {
            adjustment = _adjustment;
        }
        if (_x1 < _x2 && (_x2 - _x1) > adjustment) {
            return false;
        }
        if (_x2 < _x1 && (_x1 - _x2) > adjustment) {
            return false;
        }
        if (_y1 < _y2 && (_y2 - _y1) > adjustment) {
            return false;
        }
        if (_y2 < _y1 && (_y1 - _y2) > adjustment) {
            return false;
        }
        return true;
    }
,   isRightClick: function(_event) {
        if (_event.button === 2) {
            return true;
        }
        else {
            return false;
        }
    }
,   isNullOrUndefined: function(_val) {
        if (_val === undefined || _val === null || _val === 'Nan') {
            return true;
        }
        else {
            return false;
        }
    }
,   nvl: function(_val, _instead) {
        if (this.isNullOrUndefined(_val) === true) {
            return _instead;
        }
        else {
            return _val;
        }
    }
,   trim: function(_str) {
        if (this.isNullOrUndefined(_str) === false) {
            return _str.replace(/(^\s+)|(\s+$)/g, "");
        }
        else {
            return _str;
        }
    }
,   strCopy: function(_str, _len) {
        var str = '';
        while (str.length < _len) str += _str;
        return str;
    }
,   convertStringToHankaku: function(_str) {
        if (this.isNullOrUndefined(_str) === true) {
            return  '';
        }
        else {
            var ret = '';
            for (var i=0;i<_str.length;i++) {
                if (this.ALPHANUMERIC_MAP[_str.charAt(i)]) {
                    ret += this.ALPHANUMERIC_MAP[_str.charAt(i)];
                }
                else {
                    if (this.HIRAGANA_MAP[_str.charAt(i)]) {
                        ret += this.HIRAGANA_MAP[_str.charAt(i)];
                    }
                    else {
                        if (this.KATAKANA_MAP[_str.charAt(i)]) {
                            ret += this.KATAKANA_MAP[_str.charAt(i)];
                        }
                        else {
                            ret += _str.charAt(i);
                        }
                    }
                }
            }
            return ret;
        }
    }
,   round: function(_val, _decimalPlace) {
        var decimalPlace = 0;
        if (this.isNullOrUndefined(_decimalPlace) === false) {
            decimalPlace = _decimalPlace;
        }
        if (decimalPlace === 0) {
            return Math.round(_val);
        }
        var multiply = Math.pow(10, _decimalPlace);
        return Math.round(_val * multiply) / multiply;
    }
,   arrayWithout: function(_baseArray, _without) {
        if (_baseArray && _baseArray.length > 0) {
            var ret = new Array();
            for (var i=0;i<_baseArray.length;i++) {
                if (_baseArray[i] !== _without) {
                    this.addToArray(ret, _baseArray[i]);
                }
            }
            return ret;
        }
        else {
            return _baseArray;
        }
    }
,   arrayWithoutArray: function(_baseArray, _withoutArray) {
        var resultArray = new Array();
        var found = false;
        for (var i=0;i<_baseArray.length;i++) {
            found = false;
            for (var j=0;j<_withoutArray.length;j++) {
                if (_withoutArray[j] === _baseArray[i]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.addToArray(resultArray, _baseArray[i]);
            }
        }
        return resultArray;
    }
,   arrayContains: function(_baseArray, _target) {
        var key = -1;
        for (var i=0;i<_baseArray.length;i++) {
            if (_baseArray[i] === _target) {
                key = i;
                break;
            }
        }
        return key;
    }
,   copyArray: function(_baseArray) {
        return _baseArray.slice(0);
    }
,   sortArrayWithNumber: function(_baseArray) {
        _baseArray.sort(
            function(a,b){
                if( a < b ) return -1;
                if( a > b ) return 1;
                return 0;
            }
        );
    }
,   addToArrayIfNotExists: function(_baseArray, _target) {
        if (this.arrayContains(_baseArray, _target) === -1) {
            this.addToArray(_baseArray, _target);
        }
    }
,   addToArray: function(_baseArray, _target) {
        var newIndex = _baseArray.length;
        _baseArray[newIndex] = _target;
        return newIndex;
    }
,   addArrayToArray: function(_baseArray, _targetArray) {
        for (var i=0;i<_targetArray.length;i++) {
            toolBox.addToArray(_baseArray, _targetArray[i]);
        }
    }
,   getCommandTypeName: function(_commandType) {
        if (_commandType === this.COMMAND_TYPE_INITIALIZE) {
            return 'INITIALIZE';
        }
        else if (_commandType === this.COMMAND_TYPE_CLICK) {
            return 'CLICK';
        }
        else if (_commandType === this.COMMAND_TYPE_DIVE_OR_EDIT) {
            return 'DIVE_OR_EDIT';
        }
        else if (_commandType === this.COMMAND_TYPE_MOUSE_OVER) {
            return 'MOUSE_OVER';
        }
        else if (_commandType === this.COMMAND_TYPE_SELECT) {
            return 'SELECT';
        }
        else if (_commandType === this.COMMAND_TYPE_MULTI_SELECT) {
            return 'MULTI_SELECT';
        }
        else if (_commandType === this.COMMAND_TYPE_DRAG) {
            return 'DRAG';
        }
        else if (_commandType === this.COMMAND_TYPE_DROP) {
            return 'DROP';
        }
        else if (_commandType === this.COMMAND_TYPE_CLOSE) {
            return 'CLOSE';
        }
        else if (_commandType === this.COMMAND_TYPE_MAXIMIZE) {
            return 'MAXIMIZE';
        }
        else if (_commandType === this.COMMAND_TYPE_RESUME_SIZE) {
            return 'RESUME_SIZE';
        }
        else if (_commandType === this.COMMAND_TYPE_ZOOM_IN) {
            return 'ZOOM_IN';
        }
        else if (_commandType === this.COMMAND_TYPE_ZOOM_OUT) {
            return 'ZOOM_OUT';
        }
        else if (_commandType === this.COMMAND_TYPE_RESIZE_WORLD) {
            return 'RESIZE_WORLD';
        }
        else if (_commandType === this.COMMAND_TYPE_VIRTUAL_DROP) {
            return 'VIRTUAL_DROP';
        }
        else if (_commandType === this.COMMAND_TYPE_ANIMATION) {
            return 'ANIMATION';
        }
        else if (_commandType === this.COMMAND_TYPE_OTHER) {
            return 'OTHER';
        }
        else {
            return _commandType + ' UNKNOWN';
        }
    }
/*
,   getViewStyleModeName: function(_viewStyleMode) {
        if (_viewStyleMode === this.VIEW_STYLE_MODE_ORIGINAL) {
            return translator.t(this.this.VIEW_STYLE_MODE_ORIGINAL_NAME);
        }
        else if (_viewStyleMode === this.VIEW_STYLE_MODE_BODY) {
            return translator.t('Bodyスタイル');
        }
    }
,   getViewImageModeName: function(_viewImageMode) {
        if (_viewImageMode === this.VIEW_IMAGE_MODE_ORIGINAL) {
            return translator.t('独自画像');
        }
        else if (_viewImageMode === this.VIEW_IMAGE_MODE_BODY) {
            return translator.t('Body画像');
        }
    }
,   getBidrViewDirectionName: function(_birdViewDirection) {
        if (_birdViewDirection === this.BIRDVIEW_DIRECTION_RIGHT) {
            return translator.t('右');
        }
        else if (_birdViewDirection === this.BIRDVIEW_DIRECTION_DOWN) {
            return translator.t('下');
        }
        else if (_birdViewDirection === this.BIRDVIEW_DIRECTION_LEFT) {
            return translator.t('左');
        }
        else if (_birdViewDirection === this.BIRDVIEW_DIRECTION_UP) {
            return translator.t('上');
        }
        else if (_birdViewDirection === this.BIRDVIEW_DIRECTION_DEEPER) {
            return translator.t('ダイブ');
        }
        else if (_birdViewDirection === this.BIRDVIEW_DIRECTION_HIGHER) {
            return translator.t('浮上');
        }
    }
,   getBirdViewLevelName: function(_birdViewLevel) {
        if (_birdViewLevel === this.BIRDVIEW_LEVEL_SIMPLE) {
            return translator.t('シンプル');
        }
        else if (_birdViewLevel === this.BIRDVIEW_LEVEL_NORMAL) {
            return translator.t('ノーマル');
        }
        else if (_birdViewLevel === this.BIRDVIEW_LEVEL_BOOST) {
            return translator.t('ブースト');
        }
    }
*/
,   rectContainsRect: function(_x, _y, _x2, _y2, _xx, _yy, _xx2, _yy2) {
        if (_x <= _xx && _y <= _yy && _x2 >= _xx2 && _y2 >= _yy2) {
            return true;
        }
        else {
            return false;
        }
    }
,   rectHitRect: function(_x, _y, _x2, _y2, _xx, _yy, _xx2, _yy2) {
        if ((_x >= _xx && _x <= _xx2 && _y >= _yy && _y <= _yy2) ||
            (_x2 >= _xx && _x2 <= _xx2 && _y >= _yy && _y <= _yy2) ||
            (_x2 >= _xx && _x2 <= _xx2 && _y2 >= _yy && _y2 <= _yy2) ||
            (_x >= _xx && _x <= _xx2 && _y2 >= _yy && _y2 <= _yy2)) {
            return true;
        }
        else if ((_x <= _xx && _x2 >= _xx2 && _y >= _yy && _y <= _yy2) ||
                 (_x <= _xx && _x2 >= _xx2 && _y2 >= _yy && _y2 <= _yy2) ||
                 (_x >= _xx && _x <= _xx2 && _y <= _yy && _y2 >= _yy2) ||
                 (_x2 >= _xx && _x2 <= _xx2 && _y <= _yy && _y2 >= _yy2)) {
            return true;
        }
        else if (this.rectContainsRect(_x, _y, _x2, _y2, _xx, _yy, _xx2, _yy2) === true ||
                 this.rectContainsRect(_xx, _yy, _xx2, _yy2, _x, _y, _x2, _y2) === true) {
            return true;
        }
        else {
            return false;
        }
    }
,   pointHitRect: function(_x, _y, _xx, _yy, _xx2, _yy2) {
        if (_x >= _xx && _x <= _xx2 && _y >= _yy && _y <= _yy2) {
            return true;
        }
        else {
            return false;
        }
    }
,   lineHitRect: function(_x, _y, _x2, _y2, _xx, _yy, _xx2, _yy2) {
        this.tempX =_x;
        this.tempY =_y;
        for (var i=1;i<=5;i++) {
            if (this.pointHitRect(this.tempX, this.tempY, _xx, _yy, _xx2, _yy2) === true) {
                return true;
            }
            this.tempX += (_x2 - _x) / 5;
            this.tempY += (_y2 - _y) / 5;
        }
        return false;
    }
,   createLineFromTwoRect: function(_rect1, _rect2) {
        this.tempLine = new Rect(0, 0, 0, 0);

        this.tempLine.x = _rect1.x + ((_rect1.x2 - _rect1.x) / 2);
        this.tempLine.y = _rect1.y + ((_rect1.y2 - _rect1.y) / 2);
        this.tempLine.x2 = _rect2.x + ((_rect2.x2 - _rect2.x) / 2);
        this.tempLine.y2 = _rect2.y + ((_rect2.y2 - _rect2.y) / 2);

        this.adjustStartPosForLine(this.tempLine, _rect1);

        //lineのx2とy2計算
        this.tempX = this.tempLine.x;
        this.tempLine.x = -this.tempLine.x2;
        this.tempLine.x2 = -this.tempX;
        this.tempY = this.tempLine.y;
        this.tempLine.y = -this.tempLine.y2;
        this.tempLine.y2 = -this.tempY;

        this.adjustStartPosForLine(this.tempLine, new Rect(-_rect2.x2, -_rect2.y2, -_rect2.x, -_rect2.y));

        this.tempX = this.tempLine.x;
        this.tempLine.x = -this.tempLine.x2;
        this.tempLine.x2 = -this.tempX;
        this.tempY = this.tempLine.y;
        this.tempLine.y = -this.tempLine.y2;
        this.tempLine.y2 = -this.tempY;

        return this.tempLine;

    }
,   adjustStartPosForLine: function(_line, _rect) {
        var xReverse = 1;
        var yReverse = 1;
        if (_line.x > _line.x2) {
            xReverse = -1;
            _line.x = _line.x * xReverse;
            _line.x2 = _line.x2 * xReverse;
            this.tempX = _rect.x2 * xReverse;
            this.tempX2 = _rect.x * xReverse;
        }
        else {
            this.tempX = _rect.x;
            this.tempX2 = _rect.x2;
        }
        if (_line.y > _line.y2) {
            yReverse = -1;
            _line.y = _line.y * yReverse;
            _line.y2 = _line.y2 * yReverse;
            this.tempY = _rect.y2 * yReverse;
            this.tempY2 = _rect.y * yReverse;
        }
        else {
            this.tempY = _rect.y;
            this.tempY2 = _rect.y2;
        }

        //ラジアンを求めるときは２点のX/Y座標でatan2
        this.tempR = Math.atan2(_line.x2 - _line.x, _line.y2 - _line.y);
        this.tempW = this.tempX2 - _line.x;
        this.tempH = this.tempW / Math.tan(this.tempR);
        if (this.tempH >= this.tempY2 - _line.y) {
            this.tempH = this.tempY2 - _line.y;
            this.tempW = this.tempH / (1 / Math.tan(this.tempR));
        }

        if (xReverse === -1) {
            _line.x = (_line.x + this.tempW) * xReverse;
            _line.x2 = _line.x2 * xReverse;
        }
        else {
            _line.x = _line.x + this.tempW;
        }
        if (yReverse === -1) {
            _line.y = (_line.y + this.tempH) * yReverse;
             _line.y2 = _line.y2 * yReverse;
        }
        else {
            _line.y = _line.y + this.tempH;
        }
    }
,   calcArrowsFeetPointAndSetTempPos: function(_x, _y, _x2, _y2) {
        var x = _x2 - _x;
        var y = _y2 - _y;

        var deg = Math.atan2(x, y) / Math.PI * 180;

        this.tempX = this.ARROW_FOOT_LENGTH * Math.sin((deg - this.ARROW_FOOT_DEGREE) / 180 * Math.PI);
        this.tempY = this.ARROW_FOOT_LENGTH * Math.cos((deg - this.ARROW_FOOT_DEGREE) / 180 * Math.PI);
        
        this.tempX2 = this.ARROW_FOOT_LENGTH * Math.sin((deg + this.ARROW_FOOT_DEGREE) / 180 * Math.PI);
        this.tempY2 = this.ARROW_FOOT_LENGTH * Math.cos((deg + this.ARROW_FOOT_DEGREE) / 180 * Math.PI);

    }
,   calcDistanceBetweenTwoPoint: function(_x, _y, _x2, _y2) {
        this.a = _x2 - _x;
        this.b = _y2 - _y;
        return Math.sqrt(this.a * this.a + this.b * this.b)
    }
,   isTwoLinesIntersected: function(ax, ay, bx, by, cx, cy, dx, dy) {
        var ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
        var tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
        var tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
        var td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);
        return tc * td < 0 && ta * tb < 0;
    }
,   setTempPos: function(_shape, _lastPos) {
        if (this.rectForAdjustingTempPos === null) {
            if (_lastPos === true) {
                this.tempX = _shape.lastActualX;
                this.tempY = _shape.lastActualY;
                this.tempW = _shape.lastActualW;
                this.tempH = _shape.lastActualH;
                this.tempX2 = _shape.lastActualX2;
                this.tempY2 = _shape.lastActualY2;
                this.tempR = _shape.lastActualR;
            }
            else {
                this.tempX = _shape.currentActualX;
                this.tempY = _shape.currentActualY;
                this.tempW = _shape.currentActualW;
                this.tempH = _shape.currentActualH;
                this.tempX2 = _shape.currentActualX2;
                this.tempY2 = _shape.currentActualY2;
                this.tempR = _shape.currentActualR;
            }
        }
        else {
            this.tempX = _shape.lastActualX - (_shape.containerShape.lastActualX + _shape.containerShape.getActualInnerOffsetX() + this.rectForAdjustingTempPos.x);
            this.tempY = _shape.lastActualY - (_shape.containerShape.lastActualY + _shape.containerShape.getActualInnerOffsetY() + this.rectForAdjustingTempPos.y);
            this.tempW = _shape.lastActualW;
            this.tempH = _shape.lastActualH;
            this.tempX2 = _shape.lastActualX2 - (_shape.containerShape.lastActualX + _shape.containerShape.getActualInnerOffsetX() + this.rectForAdjustingTempPos.x);
            this.tempY2 = _shape.lastActualY2 - (_shape.containerShape.lastActualY + _shape.containerShape.getActualInnerOffsetY() + this.rectForAdjustingTempPos.y)
            this.tempR = _shape.lastActualR;
        }
    }
,   getReversedDockPosition: function(_dockPosition) {
        if (_dockPosition === this.DOCK_POSITION_TOP) {
            return this.DOCK_POSITION_BOTTOM;
        }
        if (_dockPosition === this.DOCK_POSITION_TOP_RIGHT_CORNER) {
            return this.DOCK_POSITION_BOTTOM_LEFT_CORNER;
        }
        else if (_dockPosition === this.DOCK_POSITION_RIGHT) {
            return this.DOCK_POSITION_LEFT;
        }
        else if (_dockPosition === this.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
            return this.DOCK_POSITION_TOP_LEFT_CORNER;
        }
        else if (_dockPosition === this.DOCK_POSITION_BOTTOM) {
            return this.DOCK_POSITION_TOP;
        }
        else if (_dockPosition === this.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
            return this.DOCK_POSITION_TOP_RIGHT_CORNER;
        }
        else if (_dockPosition === this.DOCK_POSITION_LEFT) {
            return this.DOCK_POSITION_RIGHT;
        }
        else if (_dockPosition === this.DOCK_POSITION_TOP_LEFT_CORNER) {
            return this.DOCK_POSITION_BOTTOM_RIGHT_CORNER;
        }
        else if (_dockPosition === this.DOCK_POSITION_LINK) {
            return this.DOCK_POSITION_BODY;
        }
        else if (_dockPosition === this.DOCK_POSITION_BODY) {
            return this.DOCK_POSITION_LINK;
        }
    }
,   escapeText: function(_text) {
        if (_text === null || _text === undefined || _text === '') {
            return '';
        }
        else {
            return _text + ''.replace(/</g, '\\<').replace(/>/g,'\\>');
        }
    }
,   sliceTextByKeyword: function(_text, sliceKeyWord) {
        var text = _text;
        var pos = _text.indexOf(sliceKeyWord);
        if (pos === -1) {
            return '';
        }
        text = text.slice(pos + sliceKeyWord.length);
        return text;
    }
,   substringTextBetweenStartAndEnd: function(_text, _startWord, _endWord) {
        var text = _text;
        var startPos = _text.indexOf(_startWord);
        if (startPos === -1) {
            return '';
        }
        var endPos = _text.indexOf(_endWord);
        if (endPos === -1) {
            return '';
        }
        else {
            text = text.substring(startPos + _startWord.length, endPos);
        }
        return text;
    }
,   val2ContainsVal1: function(_val1, _val2) {
        var val1 = toolBox.trim(toolBox.convertStringToHankaku(_val1.replace(/\n/g, "").toUpperCase()));
        var val2 = toolBox.trim(toolBox.convertStringToHankaku(_val2.replace(/\n/g, "").toUpperCase()));
        if (val1 !== '') {
            if (val2.indexOf(val1) !== -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
,   openWindow: function(_url, _target) {
        window.open(_url, _target);
    }
,   getAbsoluteLocation: function() {
        var thisLocation = window.location.href;
        if (thisLocation.indexOf('?') >= 0) {
            thisLocation = thisLocation.substr(0, thisLocation.indexOf('?'));
        }
        return thisLocation;
    }
,   createQueryParam: function(_key, _value) {
        return _key + '=' + encodeURIComponent(_value);
    }
,   getQueryParam: function(_key) {
        return this.getQueryParams()[_key];
    }
,   getQueryParams: function() {
        var keyValues = {};
        if( 1 < window.location.search.length )
        {
            var queryString = window.location.search.substring(1);
            var params = queryString.split('&');

            for (var i=0;i<params.length;i++) {
                var element = params[i].split('=');

                var key = decodeURIComponent(element[0]);
                var value = decodeURIComponent(element[1]);

                keyValues[key] = value;
            }
        }
        return keyValues;
    }
,   compress: function(_buf) {
        return Base64.toBase64(RawDeflate.deflate(Base64.utob(_buf)));
    }
,   decompress: function(_buf) {
        return Base64.btou(RawDeflate.inflate(Base64.fromBase64(_buf)));
    }
,   getCompressedSaveDataAsJavaScript: function(_title, _text) {
        var compressedData = this.compress(_text);
        var rowdata = '';
        var rows = new Array();
        while (true) {
            if (compressedData.length > 200) {
                rowdata = compressedData.substr(0, 200);
                this.addToArray(rows, rowdata);
                compressedData = compressedData.substr(200);
            }
            else {
                this.addToArray(rows, compressedData);
                break;
            }
        }
        var js = 'var d=\'\'; //soullinkmap jsonp data of "' + _title + '"\n';
        for (var i=0;i<rows.length;i++) {
            js += 'd+=\'' + rows[i] + '\';\n';
        }
        js += 'load(d);';
        return js;
    }
,   executeJavaScript: function(_js) {
        eval(_js);
    }
,   generateRelatedKeywords: function(_keyword) {
        
    }
,   askToAI: function(_prompt) {
        var keywordJson = null;
        
        return keywordJson;
    }
,   executeAPI: function() {
        
    }
/*
,   startLoadingDialog: function(_backGroundShape) {

        var w = 300;
        var h = 50;
        var dialogRect = new Rect(_backGroundShape.w / 2 - w / 2, _backGroundShape.h / 2 - h / 2, _backGroundShape.w / 2 + w / 2, _backGroundShape.h / 2 + h / 2);
        var dialog = document.createElement('div');
        dialog.id = 'waitDialog';
        dialog.style.position = 'absolute';
        dialog.style.left = dialogRect.x + 'px';
        dialog.style.top = dialogRect.y + 'px';
        dialog.style.width = dialogRect.w + 'px';
        dialog.style.height = dialogRect.h + 'px';
        dialog.style.border = '0px solid gray';
        dialog.style.display = 'block';
        dialog.style.zIndex = '99999';
        dialog.style.textAlign = 'center';
        dialog.style.fontSize = '50pt';
        dialog.style.fontFamily = 'HG丸ｺﾞｼｯｸM-PRO';
        dialog.innerHTML = 'LOADING...';
        document.body.appendChild(dialog);
    }
,   endLoadingDialog: function() {
        if ($('waitDialog')) {
            document.body.removeChild($('waitDialog'));
        }
    }
*/
};
