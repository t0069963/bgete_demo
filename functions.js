var crypto = require('crypto'); // �[�ѱK�n�� (���ؼҲ�)
var conf = require('./conf');

module.exports = {
    // �N����K�X�[�K
    passwdCrypto: function (req, res, next) {
        if (req.body.password) {
            req.body.password = crypto.createHash('md5')
                .update(req.body.password + conf.salt)
                .digest('hex');
        }

        next();
    }
};