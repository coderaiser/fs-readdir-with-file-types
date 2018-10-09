fs-readdir-with-file-types [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]
=========
Node.js v10.11.0 [fsPromises.readdir](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fspromises_readdir_path_options) [ponyfill](https://ponyfill.com) of `withFileTypes` option.

`options.withFileTypes` is always set to true and result contain objects similar to [fs.Dirent](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_class_fs_dirent).

## Install

```
npm i fs-readdir-with-file-types
```

## API

- `path` `<string> | <Buffer> | <URL>`

Resolves: <fs.Dirent[]>

Example:

```js
const readdir = require('fs-readdir-with-file-types');

async () => {
    await readdirSync('.');
}();

// returns on node v10.10
Dirent { name: 'LICENSE', [Symbol(type)]: 1 },
Dirent { name: 'README.md', [Symbol(type)]: 1 },
Dirent { name: 'index.js', [Symbol(type)]: 1 },

// returns on node < v10.10
{ name: 'LICENSE',
isBlockDevice: [Function: bound ],
isCharacterDevice: [Function: bound ],
isDirectory: [Function: bound ],
isFIFO: [Function: bound ],
isFile: [Function: bound ],
isSocket: [Function: bound ],
isSymbolicLink: [Function: bound ] },

{ name: 'README.md',
isBlockDevice: [Function: bound ],
isCharacterDevice: [Function: bound ],
isDirectory: [Function: bound ],
isFIFO: [Function: bound ],
isFile: [Function: bound ],
isSocket: [Function: bound ],
isSymbolicLink: [Function: bound ] },

{ name: 'index.js',
isBlockDevice: [Function: bound ],
isCharacterDevice: [Function: bound ],
isDirectory: [Function: bound ],
isFIFO: [Function: bound ],
isFile: [Function: bound ],
isSocket: [Function: bound ],
isSymbolicLink: [Function: bound ] }
```

If you do not want to use `promises` or `async-await` use `callbackify`:

```js
const {callbackify} = require('util');
const readdir = callbackify(require('fs-readdir-with-file-types'));

readdir('.', (e, dirents) => {
    console.log(e, dirents);
});
```

## Related

- [fs-copy-file](https://github.com/coderaiser/fs-copy-file "fs-copy-file") - Asynchronously copies src to dest.
- [fs-copy-file-sync](https://github.com/coderaiser/fs-copy-file-sync "fs-copy-file-sync") - Synchronously copies src to dest.
- [fs-readdir-sync-with-file-types](https://github.com/coderaiser/fs-readdir-sync-with-file-types "fs-readdir-sync-with-file-types") - Synchronously readdir with file types.

## License
MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/fs-readdir-with-file-types.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/fs-readdir-with-file-types/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/fs-readdir-with-file-types.svg?style=flat&longCache=true
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat&longCache=true
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/fs-readdir-with-file-types/badge.svg?branch=master&service=github
[NPMURL]:                   https://npmjs.org/package/fs-readdir-with-file-types "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/fs-readdir-with-file-types  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/fs-readdir-with-file-types "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]:              https://coveralls.io/github/coderaiser/fs-readdir-with-file-types?branch=master

