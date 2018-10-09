'use strict';

const fs = require('fs');
const {reRequire} = require('mock-require');

const test = require('tape');

test('readdir withFileTypes: not supported', async (t) => {
    const {readdir} = fs;
    
    fs.readdir = (path, options, cb) => {
        readdir(path, cb);
    };
    
    const read = reRequire('.');
    const names = await read('.');
    
    fs.readdir = readdir;
    
    t.equal(typeof names[0], 'object', 'should return array of objects');
    t.end();
});

test('readdir withFileTypes: empty', async (t) => {
    const {readdir} = fs;
    
    fs.readdir = (path, options, fn) => {
        fn(null, []);
    };
    
    const read = reRequire('.');
    const names = await read('.');
    
    fs.readdir = readdir;
    
    t.deepEqual(names, [], 'should equal');
    t.end();
});

test('readdir withFileTypes: supported', async (t) => {
    const read = reRequire('.');
    const names = await read('.');
    
    t.equal(typeof names[0], 'object', 'should return array of objects');
    t.end();
});

