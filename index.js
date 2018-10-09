'use strict';

const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const currify = require('currify');

const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);
const getDirEnt = currify(_getDirEnt);

const isString = (a) => typeof a === 'string';

module.exports = async (dir) => {
    const names = await readdir(dir, {
        withFileTypes: true,
    });
    
    if (!names.length)
        return [];
    
    if (!isString(names[0]))
        return names;
    
    return await getAllDirEnts(dir, names);
};

async function getAllDirEnts(dir, names) {
    const promises = names.map(getDirEnt(dir));
    
    return Promise.all(promises);
}

async function _getDirEnt(dir, name) {
    const fullPath = path.join(dir, name);
    const stat = await lstat(fullPath);
    
    const {
        isBlockDevice,
        isCharacterDevice,
        isDirectory,
        isFIFO,
        isFile,
        isSocket,
        isSymbolicLink,
    } = stat;
    
    return {
        name,
        isBlockDevice: isBlockDevice.bind(stat),
        isCharacterDevice: isCharacterDevice.bind(stat),
        isDirectory: isDirectory.bind(stat),
        isFIFO: isFIFO.bind(stat),
        isFile: isFile.bind(stat),
        isSocket: isSocket.bind(stat),
        isSymbolicLink: isSymbolicLink.bind(stat),
    };
}

