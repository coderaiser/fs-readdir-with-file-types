'use strict';

const fs = require('fs');
const {promisify} = require('util');

const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

const isString = (a) => typeof a === 'string';

module.exports = async (path) => {
    const names = await readdir(path, {
        withFileTypes: true,
    });
    
    if (!names.length)
        return [];
    
    if (!isString(names[0]))
        return names;
    
    return await getAllDirEnts(names);
};

async function getAllDirEnts(names) {
    const result = [];
    
    for (const name of names) {
        result.push(await getDirEnt(name));
    }
    
    return result;
}

async function getDirEnt(name) {
    const stat = await lstat(name);
    
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

