require('dotenv').config();
// const aws = require('aws-sdk')
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const mainCtrl = require('./Controllers/mainCtrl');
const authCtrl = require('./Controllers/authCtrl');

const {SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    // S3_BUCKET,
    // AWS_ACCESS_KEY_ID,
    // AWS_SECRET_ACCESS_KEY,
} = process.env

const app =express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 21}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db ALL GOOD')
})

// aws.config = {
//     region: 'us-east-2',
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY
// }

//Authorization 
app.post('/auth/register',  authCtrl.register);
app.post('/auth/Login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/me', authCtrl.logMeIn);

//User endpoints
app.put('/api/profile/:id', mainCtrl.editProfile);

app.listen(SERVER_PORT, () => console.log('Good Vibes on 5050'))