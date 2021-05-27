var express = require('express');
var authority_description = require('../models/authority_description');

var router = express.Router();

// ��� /accounts �ШD
router.route('/')
    // ���o�Ҧ��귽
    .get(function (req, res) {
        authority_description.items(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            // �S�������w���귽
            if (!results.length) {
                res.sendStatus(404);
                return;
            }

            res.json(results);
        });
    })
    // �s�W�@���귽
    .post(function (req, res) {

        authority_description.add(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            // �s���귽�w�إ� (�^���s�W�귽�� id)
            res.status(201).json(results.insertId);
        });
    });

// ����p /accounts/1 �ШD
router.route('/:Authority')
    // ���o���w���@���귽
    .get(function (req, res) {
        authority_description.item(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.length) {
                res.sendStatus(404);
                return;
            }

            res.json(results);
        });
    })
    // �R�����w���@���귽
    .delete(function (req, res) {
        authority_description.delete(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            // ���w���귽�w���s�b
            // SQL DELETE ���\ results.affectedRows �|��^ 1�A�Ϥ� 0
            if (!results.affectedRows) {
                res.sendStatus(410);
                return;
            }

            // �S�����e (���\)
            res.sendStatus(204);
        });
    })
    // �л\���w���@���귽
    .put(function (req, res) {
        authority_description.put(req, function (err, results) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (results === 410) {
                res.sendStatus(410);
                return;
            }

            authority_description.item(req, function (err, results, fields) {
                res.json(results);
            });
        });
    })
    // ��s���w���@���귽 (������s)
    .patch(function (req, res) {
        authority_description.patch(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.affectedRows) {
                res.sendStatus(410);
                return;
            }

            // response �Q��s���귽���A���] request �D�骺��줣�]�t id�A�]���ݦۦ�[�J
            req.body.Authority = req.params.Authority;
            res.json([req.body]);
        });
    });

module.exports = router;