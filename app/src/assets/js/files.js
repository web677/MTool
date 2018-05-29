var fs = require('fs')
var path = require('path') 
var tinify = require('tinify')

tinify.key = "ECdkodKFYOkbRrA2kQMnGejXYO6ZAGn9"

const Toast = require('./toast')

export function filterFiles(files) {
    var _result = []

    if (files.length > 20){
        Toast.open('单次上传请勿超过20张图！')
        return null
    }

    for(let i= 0; i < files.length; i++) {
        let _file = files[i]

        if(_file.type.indexOf('image') === -1){
            Toast.open('目前仅支持图片格式！')
            return null
        }

        if (_file.size > 1024 * 1024 * 5){
            Toast.open('单张图不得超过5M！')
            return null
        }

        _result.push({
            size: _file.size,
            name: _file.name,
            path: _file.path,
            type: _file.type
        })
    }

    return _result
}

export async function dealFiles(files) {
    var initSize = 0;
    var resultSize = 0;

    for(let i = 0; i < files.length; i++){
        let file = files[i]
        initSize += file.size

        var filePath = file.path,
            fileDirname = path.dirname(filePath),
            fileBasename = path.basename(filePath),
            fileSourcePath = path.join(fileDirname, 'sourcet', fileBasename)

        _mkdirSync(path.join(fileDirname, 'sourcet'))
        fs.writeFileSync(fileSourcePath, fs.readFileSync(filePath))

        let source = await tinify.fromFile(filePath)
        let result = await source.toFile(filePath)
    
        resultSize += fs.statSync(filePath).size
    }

    return {
        count: files.length,
        initSize: initSize,
        resultSize: resultSize
    }
}

function _mkdirSync(path) {
    try {
        fs.mkdirSync(path)
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}

