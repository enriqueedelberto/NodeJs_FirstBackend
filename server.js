const express = require('express');

//Routas para methods Http
const router = express.Router();

// PErmite obtener parametros por Body o por Uri
const bodyParser = require('body-parser');

const response = require('./network/response');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);


router.get('/List', function(req, res) {
    console.log(req.headers);
    res.header({
        "custom-header": "This is my value"
    });
    // res.send('Hello world from get');

    response.success(req, res, 'lista de mensajes', 200);
});

router.post('/New', function(req, res) {
    console.log(req.query);
    if (req.query.error == 'ok') {
        response.error(req, res, 'Unexpected error', 500, 'Just an error simulation');
    }


    response.success(req, res, 'Created successfully', 201);
});

router.put('/Update', function(req, res) {

    res.send('Hello world from put');
});

router.delete('/Delete', function(req, res) {

    res.status(201).send({ msg: 'Hello world from delete', cod: "delete" });

});

app.use('/app', express.static('public'));

app.listen(3000);
console.log('listening at http://localhost:3000');