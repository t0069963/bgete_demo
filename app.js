var bodyparser = require('body-parser');    // �ѪR HTTP �ШD�D�骺�����n��
var express = require('express');
var cors = require("cors")

var conf = require('./conf');
var functions = require('./functions');
var accounts = require('./routes/accounts');
var totaltable = require('./routes/totaltable');
var Department_Description = require('./routes/Department_Description');
var authority_description = require('./routes/authority_description');
var Handername_Form = require('./routes/Handername_Form');
var Repair_Form = require('./routes/Repair_Form');
var P_Form = require('./routes/P_Form');
/*var path = require('path');*/

var app = express();

// �ϥ� bodyparser.json() �N HTTP �ШD��k POST�BDELETE�BPUT �M PATCH�A��b HTTP �D�� (body) �o�e���ѼƦs��b req.body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors())
app.use(functions.passwdCrypto);





app.use('/accounts', accounts);
app.use('/totaltable', totaltable);
app.use('/Department_Description', Department_Description);
app.use('/authority_description', authority_description);
app.use('/Handername_Form', Handername_Form);
app.use('/Repair_Form', Repair_Form);
app.use('/P_Form', P_Form);
/*app.use(express.static(path.join(__dirname, 'img')));*/

app.listen(conf.port, function () {
    console.log('app listening on port ' + conf.port + '!');
});