var DataBase = function(){this.initialize.apply(this, arguments);}
DataBase.prototype = toolBox.extend(new BaseObject(), {
    transactionId       : null
,   subTransactionId    : 0
,   redoLog             : null
,   tables              : null
,   initialize: function() {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'DataBase';
        this.tables = new Array();
        this.redoLog = new RedoLog(this)
        this.transactionId = toolBox.createUniqueKey();
        this.subTransactionId = 1;
    }
,   destroy: function() {
        this.tables.length = 0;
        this.tables = null;
        this.alive = false;
    }
,   addTable: function(_table) {
        this.tables[_table.name] = _table;
    }
,   beginTransaction: function() {
        this.redoLog.deleteRollbackedTransactionLogs();
    }
,   commit: function() {
        this.resetTransaction();
    }
,   rollBackLastTransaction: function() {
        var logs = this.redoLog.findLastTransactionLogs();
        var rollbackedTables = new Array();
        if (logs.length > 0) {
            var log = null;
            var table = null;
            //先にUPDATEとDELETEのロールバック（UPDATEで固定KeyIndexが必要）
            for (var i=0;i<logs.length;i++) {
                log = logs[i];
                table = this.tables[log['TABLE_NAME']];
                if (log['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_UPDATE) {
                    table.rows[table.keyIndex[table.getKeyValue(log['AFTER_LOG'])]] = table.cloneRow(log['BEFORE_LOG']);
                    log['ROLLBACK_FLAG'] = '1';
                    toolBox.addToArrayIfNotExists(rollbackedTables, table);
                }
                else if (log['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_DELETE) {
                    toolBox.addToArray(table.rows, table.cloneRow(log['BEFORE_LOG']));
                    log['ROLLBACK_FLAG'] = '1';
                    toolBox.addToArrayIfNotExists(rollbackedTables, table);
                }
            }
            //次にINSERTのロールバック（KeyIndexが変わるため）
            for (var i=0;i<logs.length;i++) {
                log = logs[i];
                table = this.tables[log['TABLE_NAME']];
                if (log['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_INSERT) {
                    var r = table.rows[table.keyIndex[table.getKeyValue(log['AFTER_LOG'])]];
                    table.rows = toolBox.arrayWithout(table.rows, r);
                    log['ROLLBACK_FLAG'] = '1';
                    toolBox.addToArrayIfNotExists(rollbackedTables, table);
                }
            }
        }
        for (var i=0;i<rollbackedTables.length;i++) {
            rollbackedTables[i].rebuildKeyIndex();
        }
        this.resetTransaction();
    }
,   redoLastRollbackedTransaction: function() {
        var logs = this.redoLog.findLastRollBackedTransactionLogs();
        var redoTables = new Array();
        if (logs.length > 0) {
            var log = null;
            var table = null;
            //先にUPDATEとDELETEのREDO（UPDATEで固定KeyIndexが必要）
            for (var i=0;i<logs.length;i++) {
                log = logs[i];
                table = this.tables[log['TABLE_NAME']];
                if (log['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_INSERT) {
                    toolBox.addToArray(table.rows, table.cloneRow(log['AFTER_LOG']));
                    log['ROLLBACK_FLAG'] = '0';
                    toolBox.addToArrayIfNotExists(redoTables, table);
                }
                else if (log['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_UPDATE) {
                    table.rows[table.keyIndex[table.getKeyValue(log['BEFORE_LOG'])]] = table.cloneRow(log['AFTER_LOG']);
                    log['ROLLBACK_FLAG'] = '0';
                    toolBox.addToArrayIfNotExists(redoTables, table);
                }
            }
            //次にINSERTのREDO（KeyIndexが変わるため）
            for (var i=0;i<logs.length;i++) {
                log = logs[i];
                table = this.tables[log['TABLE_NAME']];
                if (log['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_DELETE) {
                    var r = table.rows[table.keyIndex[table.getKeyValue(log['BEFORE_LOG'])]];
                    table.rows = toolBox.arrayWithout(table.rows, r);
                    log['ROLLBACK_FLAG'] = '0';
                    toolBox.addToArrayIfNotExists(redoTables, table);
                }
            }
        }
        for (var i=0;i<redoTables.length;i++) {
            redoTables[i].rebuildKeyIndex();
        }
        this.resetTransaction();
    }
,   resetTransaction: function() {
        this.transactionId = toolBox.createUniqueKey();
        this.subTransactionId = 1;
        this.redoLog.rebuildKeyIndex();
    }
});
