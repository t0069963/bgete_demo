module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'accounts'
    },
    port: 3000,
    // �ۭq�K�X���[�Q
    salt: '@2#!A9x?3'
};
//�s��mysql�ݭn����U��
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'