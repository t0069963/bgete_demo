var mysql = require('mysql');
var conf = require('../conf');

var connection = mysql.createConnection(conf.db);
var sql = '';

module.exports = {
    items: function (req, callback) {
        sql = 'SELECT * FROM totaltable';
        return connection.query(sql, callback);
    },
    item: function (req, callback) {
        sql = mysql.format('SELECT * FROM totaltable WHERE id = ?', [req.params.id]);//SELECT * FROM accounts WHERE id = ? accounts�Otable
        return connection.query(sql, callback);
    },
    add: function (req, callback) {
        sql = mysql.format('INSERT INTO totaltable SET ?', req.body);
        return connection.query(sql, callback);
    },
    delete: function (req, callback) {
        sql = mysql.format('DELETE FROM totaltable WHERE id = ?', [req.params.id]);
        return connection.query(sql, callback);
    },
    put: function (req, callback) {
        // �ϥ� SQL ����\���{��Ʀ^�u�A�]���O���R����Ʀb�s�W�A�B Key �ȶ��ۦP�A�p�R����o�{�n�s�W����Ʀ��~�A�h�ϥ� rollback() �^�u
        connection.beginTransaction(function (err) {
            if (err) throw err;

            sql = mysql.format('DELETE FROM totaltable WHERE id = ?', [req.params.id]);

            connection.query(sql, function (err, results, fields) {
                // SQL DELETE ���\ results.affectedRows �|��^ 1�A�Ϥ� 0
                if (results.affectedRows) {
                    req.body.id = req.params.id;
                    sql = mysql.format('INSERT INTO totaltable SET ?', req.body);

                    connection.query(sql, function (err, results, fields) {
                        // �ШD�����T
                        if (err) {
                            connection.rollback(function () {
                                callback(err, 400);
                            });
                        } else {
                            connection.commit(function (err) {
                                if (err) callback(err, 400);

                                callback(err, 200);
                            });
                        }
                    });
                } else {
                    // ���w���귽�w���s�b
                    callback(err, 410);
                }
            });
        });
    },
    patch: function (req, callback) {
        sql = mysql.format('UPDATE totaltable SET ? WHERE id = ?', [req.body, req.params.id]);
        return connection.query(sql, callback);
    }
};