"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _httpException = require("../exceptions/HttpException");
const _acronymModel = _interopRequireDefault(require("../models/acronym.model"));
const _util = require("../utils/util");
const _fs = _interopRequireDefault(require("fs"));
const _path = _interopRequireDefault(require("path"));
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
let AcronymService = class AcronymService {
    async findDataByFilter(from, limit, search) {
        if (limit < 1 || from < 0) {
            throw new _httpException.HttpException(400, 'Invalid Params');
        }
        const findData = this.acronym;
        if (!findData) throw new _httpException.HttpException(409, "Data doesn't exist");
        if (search === 'undefined') {
            return findData.slice(from - 1, from + limit - 1);
        } else {
            const findAcronyms = this.acronym.filter((acronym)=>{
                const key = Object.keys(acronym)[0];
                if (key.search(search) !== -1 || acronym[key].search(search) !== -1) {
                    return acronym;
                }
            });
            return findAcronyms.slice(from - 1, from + limit - 1);
        }
    }
    async createData(data) {
        this.acronym.map((key)=>{
            if (Object.keys(key)[0] === data.acronym) {
                throw new _httpException.HttpException(409, 'Data already exist');
            }
        });
        const createUserData = _objectSpread({}, data);
        this.acronym.push({
            [data.acronym]: data.definition
        });
        const newData = JSON.stringify(this.acronym);
        _fs.default.writeFile(_path.default.join(process.cwd() + '/acronym.json'), newData, 'utf8', function(err) {
            if (err) {
                console.log('An error occured while writing JSON Object to File.');
                return console.log(err);
            }
            console.log('JSON file has been saved.');
        });
        return createUserData;
    }
    async updateData(acronym, definition) {
        if ((0, _util.isEmpty)(definition)) throw new _httpException.HttpException(400, 'definition is empty');
        const newArr = [];
        this.acronym.map((key)=>{
            if (Object.keys(key)[0] === acronym) {
                newArr.push(definition);
            }
        });
        if (newArr.length === 0) {
            throw new _httpException.HttpException(409, "Acronym doesn't exist");
        }
        const newData = [];
        this.acronym.map((key)=>{
            if (Object.keys(key)[0] === acronym) {
                newData.push({
                    [Object.keys(key)[0]]: definition
                });
            } else {
                newData.push({
                    [Object.keys(key)[0]]: key[Object.keys(key)[0]]
                });
            }
        });
        _fs.default.writeFile(_path.default.join(process.cwd() + '/acronym.json'), JSON.stringify(newData), 'utf8', function(err) {
            if (err) {
                console.log('An error occured while writing JSON Object to File.');
                return console.log(err);
            }
            console.log('JSON file has been saved.');
        });
        return newArr;
    }
    async deleteData(acronym) {
        const newArr = [];
        this.acronym.map((key)=>{
            if (Object.keys(key)[0] === acronym) {
                newArr.push(acronym);
            }
        });
        if (newArr.length === 0) {
            throw new _httpException.HttpException(409, "Acronym doesn't exist");
        }
        const newData = [];
        this.acronym.map((key)=>{
            if (Object.keys(key)[0] !== acronym) {
                newData.push({
                    [Object.keys(key)[0]]: key[Object.keys(key)[0]]
                });
            }
        });
        _fs.default.writeFile(_path.default.join(process.cwd() + '/acronym.json'), JSON.stringify(newData), 'utf8', function(err) {
            if (err) {
                console.log('An error occured while writing JSON Object to File.');
                return console.log(err);
            }
            console.log('JSON file has been saved.');
        });
        return newArr;
    }
    constructor(){
        this.acronym = _acronymModel.default.readFile();
    }
};
const _default = AcronymService;

//# sourceMappingURL=acronym.service.js.map