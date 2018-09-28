//server.js
'use strict'

//first we import our dependencies…
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var user = 'consultantspmeoutaouais';
var password = 'Be473918$';

//and create our instances
var app = express();
var router = express.Router();
//var sendgrid = require('sendgrid')(user,key);

var SendGrid = require('sendgrid-nodejs').SendGrid;
var sendgrid = new SendGrid(user, key);

const sgMail = require('@sendgrid/mail');

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

// db config
//mongoose.connect('mongodb://cpo_user:12344321@ds115866.mlab.com:15866/mern');

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/mail')

    //retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Comment.find(function(err, comments) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(comments)
        });
    })

    //post new comment to the database
    .post(function(req, res) {

        console.log('req.body',req.body);

        if (
            req.body.captcha === undefined ||
            req.body.captcha === '' ||
            req.body.captcha === null
        ) {
            console.log('captcha not valid');
            return res.json({'success':false, "msg":"Please select captcha"})
        }

        console.log('req.body.captcha',req.body.captcha);
        
        const secretKey = '6LfRiWsUAAAAALi3ErxshSQju5W3VUVZxvA98Z_B';
    
        const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
    
        request(verifyUrl, (err,response,body) => {
            body = JSON.parse(body);
            console.log(body);
            
            // if not successful
            if (body.success !== undefined && !body.success) {
                console.log('verification not successful');
                return res.json({'success':false,'msg':'Failed captcha verification'});
            }
            // if successful
            

            console.log('******************************************************');
            console.log('********************** sendgrid **********************');
            console.log('******************************************************');
            
            console.log(req.body);

            let table = '';
            
            req.body.qa.map( (row, index) => {
                var acc = '';
                //row.a.map((o)=>{acc+=','+o})
                table += '<tr key={index}><td>' + row.q + '</td><td>' + row.a + '</td></tr>';
                //console.log('table',table);
            });

            console.log('req.body.qa',req.body.qa);
            
            const msg = {
                //to: 'benoit.bellefontaine@canada.ca',
                to: 'consultantspmeoutaouais@gmail.com',
                //to: 'benoit.bellefontaine@gmail.com',
                from: 'noreply@consultantspmeoutaouais.ca', 
                subject: 'Courriel du site consultantspmeoutaouais.ca',
                text: 'nom source: ' + req.body.name + '\nadresse courriel source: ' + req.body.email + 
                '\ntexte source: ' + req.body.text,
                html: 
                    '<head><style>td,th{padding:5px;border-bottom:1px solid #ddd;}' + 
                    'tr:hover {background-color: #f5f5f5;}</style></head>' +
                    '<body><div style="width:1000%;margin:0 auto">' +
                        '<table>' +
                        '<tr><td style="border-right:1px solid #f5f5f5"><strong>nom:</strong></td><td>' + req.body.name + '</td></tr>' +
                        '<tr><td style="border-right:1px solid #f5f5f5"><strong>adresse courriel:</strong></td><td>' + req.body.email + '</td></tr>' +
                        '<tr><td style="border-right:1px solid #f5f5f5"><strong>téléphone:</strong></td><td>' + req.body.tel + '</td></tr>' +
                        '<tr><td style="border-right:1px solid #f5f5f5"><strong>message:</strong></td><td>'+ req.body.text + '</td></tr>' +
                        '</table></div><hr/>' +
                        '<div style="width:100%;text-align:left"><table><tr><th>Questions</th><th>Réponses</th></tr>' + table + '</table></div>' +
                    '</div></body>'
            };
            sgMail.send(msg, function(err, json) {
                if (err) { 
                    console.log('error sending email');
                    return res.send('error sending email'); 
                }
                console.log('email sent successfully to ' + msg.to);
                //res.send('email sent successfully to ' + msg.to);
            });

            console.log('verification successful');
            return res.json({'success':true,'msg':'Captcha passed'});

        })
        
    });
    
//Use our router configuration when we call /api
app.use('/api', router);

// This will handle 404 requests.
app.use("*",function(req,res) {
  res.status(404).sendFile(__dirname + '/public/404.html');
})

//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});
