/*global describe:false, it:false, beforeEach:false, afterEach:false*/

let kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest'),
    path = require('path'),
    spec = require('../lib/spec');


describe('/', function () {

    let app, mock;


    beforeEach((done) => {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.resolve(__dirname, '..'),
            onconfig: spec().onconfig
        }));

        mock = app.listen(1337);

    });


    afterEach( (done) =>{
        mock.close(done);
    });


    it('should say "Welcome to the Kraken Store."', (done) =>{
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Welcome to the Kraken Store\./)
            .end(function (err, res) {
                done(err);
            });
    });

});
