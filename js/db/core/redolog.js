var RedoLog = function(){this.initialize.apply(this, arguments);}
RedoLog.prototype = toolBox.extend(new TableBase(), {
    logs    :   null
,   initialize: function(_dataBase) {
        TableBase.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'RedoLog';

        this.name = 'REDOLOG';
        this.addColumn('TRANSACTION_ID');
        this.addColumn('SUB_TRANSACTION_ID');
        this.addColumn('TABLE_NAME');
        this.addColumn('TRANSACTION_TYPE');
        this.addColumn('BEFORE_LOG');
        this.addColumn('AFTER_LOG');
        this.addColumn('ROLLBACK_FLAG');
        this.key = 'TRANSACTION_ID,SUB_TRANSACTION_ID';

        this.logs = this.rows;

        this.alive = true;
    }
,   addLog: function(_table, _transactionType, _row) {
        var log = this.newRow();
        log['TRANSACTION_ID'] = this.dataBase.transactionId;
        log['SUB_TRANSACTION_ID'] = this.dataBase.subTransactionId;
        log['TABLE_NAME'] = _table.name;
        log['TRANSACTION_TYPE'] = _transactionType;
        if (_transactionType === toolBox.TRANSACTION_TYPE_INSERT) {
            log['BEFORE_LOG'] = null;
            log['AFTER_LOG'] = _table.cloneRow(_row);
        }
        else if (_transactionType === toolBox.TRANSACTION_TYPE_UPDATE) {
            log['BEFORE_LOG'] = _table.cloneRow(_row);
            log['AFTER_LOG'] = null;
        }
        else if (_transactionType === toolBox.TRANSACTION_TYPE_DELETE) {
            log['BEFORE_LOG'] = _table.cloneRow(_row);
            log['AFTER_LOG'] = null;
        }
        log['ROLLBACK_FLAG'] = '0';
        toolBox.addToArray(this.logs, log);
        this.dataBase.subTransactionId++;
    }
,   updateAfterLog: function(_table, _transactionType, _row) {
        var lastTransactionLogs = this.findLastTransactionLogs();
        for (var i=lastTransactionLogs.length-1;i>=0;i--) {
            if (lastTransactionLogs[i]['TABLE_NAME'] === _table.name &&
                lastTransactionLogs[i]['TRANSACTION_TYPE'] === _transactionType &&
                lastTransactionLogs[i]['AFTER_LOG'] === null) {
                lastTransactionLogs[i]['AFTER_LOG'] = _table.cloneRow(_row);
                break;
            }
        }
    }
,   findLastTransactionLogs: function() {
        var ret = new Array();
        var targetTransactoinId = '';
        for (var i=this.logs.length-1;i>=0;i--) {
            if (this.logs[i]['ROLLBACK_FLAG'] === '0') {
                if (targetTransactoinId === '') {
                    targetTransactoinId = this.logs[i]['TRANSACTION_ID'];
                }
                else {
                    if (this.logs[i]['TRANSACTION_ID'] !== targetTransactoinId) {
                        break;
                    }
                }
                toolBox.addToArray(ret, this.logs[i]);
            }
        }
        return ret;
    }
,   findLastRollBackedTransactionLogs: function() {
        var ret = new Array();
        var targetTransactoinId = '';
        for (var i=0;i<this.logs.length;i++) {
            if (this.logs[i]['ROLLBACK_FLAG'] === '1') {
                if (targetTransactoinId === '') {
                    targetTransactoinId = this.logs[i]['TRANSACTION_ID'];
                }
                else {
                    if (this.logs[i]['TRANSACTION_ID'] !== targetTransactoinId) {
                        break;
                    }
                }
                toolBox.addToArray(ret, this.logs[i]);
            }
        }
        return ret;
    }
,   deleteRollbackedTransactionLogs: function() {
        if (this.logs.length === 0) {
            return;
        }
        if (this.logs[this.logs.length-1]['ROLLBACK_FLAG'] === '0') {
            return;
        }
        var tempLogs = new Array();
        for (var i=0;i<this.logs.length;i++) {
            if (this.logs[i]['ROLLBACK_FLAG'] === '0') {
                toolBox.addToArray(tempLogs, this.logs[i]);
            }
        }
        this.logs = tempLogs;
    }
});
