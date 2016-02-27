/*global describe:false, it:false, beforeEach:false, afterEach:false*/

import kraken from 'kraken-js';
import express from 'express';
import request from 'supertest';
import path from 'path';
import spec from '../lib/spec';


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
