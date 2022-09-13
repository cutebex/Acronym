"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _acronymController = _interopRequireDefault(require("../controllers/acronym.controller"));
const _usersDto = require("../dtos/users.dto");
const _validationMiddleware = _interopRequireDefault(require("../middlewares/validation.middleware"));
const _authMiddleware = _interopRequireDefault(require("../middlewares/auth.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AcronymRoute = class AcronymRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.acronymController.getDataByFilter);
        this.router.post(`${this.path}`, (0, _validationMiddleware.default)(_usersDto.CreateDataDto, 'params'), this.acronymController.createData);
        this.router.put(`${this.path}/:acronym`, _authMiddleware.default, this.acronymController.updateData);
        this.router.delete(`${this.path}/:acronym`, this.acronymController.deleteData);
    }
    constructor(){
        this.path = '/acronym';
        this.router = (0, _express.Router)();
        this.acronymController = new _acronymController.default();
        this.initializeRoutes();
    }
};
const _default = AcronymRoute;

//# sourceMappingURL=acronym.route.js.map