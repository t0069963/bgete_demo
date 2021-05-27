module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'accounts'
    },
    port: 3000,
    // 自訂密碼的加鹽
    salt: '@2#!A9x?3'
};
//新版mysql需要執行下面
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'