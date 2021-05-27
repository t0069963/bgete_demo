var mysql = require('mysql');
var conf = require('../conf');

var connection = mysql.createConnection(conf.db);
var sql = '';

module.exports = {
    items: function (req, callback) {
        sql = 'SELECT * FROM authority_description';
        return connection.query(sql, callback);
    },
    item: function (req, callback) {
        sql = mysql.format('SELECT * FROM authority_description WHERE Authority = ?', [req.params.Authority]);//SELECT * FROM accounts WHERE id = ? accounts�Otable
        return connection.query(sql, callback);
    },
    add: function (req, callback) {
        sql = mysql.format('INSERT INTO authority_description SET ?', req.body);
        return connection.query(sql, callback);
    },
    delete: function (req, callback) {
        sql = mysql.format('DELETE FROM authority_description WHERE Authority = ?', [req.params.Authority]);
        return connection.query(sql, callback);
    },
    put: function (req, callback) {
        // �ϥ� SQL ����\���{��Ʀ^�u�A�]���O���R����Ʀb�s�W�A�B Key �ȶ��ۦP�A�p�R����o�{�n�s�W����Ʀ��~�A�h�ϥ� rollback() �^�u
        connection.beginTransaction(function (err) {
            if (err) throw err;

            sql = mysql.format('DELETE FROM authority_description WHERE Authority = ?', [req.params.Authority]);

            connection.query(sql, function (err, results, fields) {
                // SQL DELETE ���\ results.affectedRows �|��^ 1�A�Ϥ� 0
                if (results.affectedRows) {
                    req.body.Authority = req.params.Authority;
                    sql = mysql.format('INSERT INTO authority_description SET ?', req.body);

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
        sql = mysql.format('UPDATE authority_description SET ? WHERE Authority = ?', [req.body, req.params.Authority]);
        return connection.query(sql, callback);
    }
};