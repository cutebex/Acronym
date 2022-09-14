"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _acronymService = _interopRequireDefault(require("../services/acronym.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AcronymController = class AcronymController {
    constructor(){
        this.acronymService = new _acronymService.default();
        this.getDataByFilter = async (req, res, next)=>{
            try {
                const from = Number(req.query.from);
                const limit = Number(req.query.limit);
                const search = String(req.query.search);
                const findOneUserData = await this.acronymService.findDataByFilter(from, limit, search);
                res.status(200).json({
                    data: findOneUserData,
                    message: 'find'
                });
            } catch (error) {
                next(error);
            }
        };
        this.createData = async (req, res, next)=>{
            try {
                const userData = req.body;
                console.log('create ', userData);
                const createUserData = await this.acronymService.createData(userData);
                res.status(201).json({
                    data: createUserData,
                    message: 'created'
                });
            } catch (error) {
                next(error);
            }
        };
        this.updateData = async (req, res, next)=>{
            try {
                const acronym = req.params.acronym;
                const definition = req.body.definition;
                const updateUserData = await this.acronymService.updateData(acronym, definition);
                res.status(200).json({
                    data: updateUserData,
                    message: 'updated'
                });
            } catch (error) {
                next(error);
            }
        };
        this.deleteData = async (req, res, next)=>{
            try {
                const acronym = req.params.acronym;
                console.log(req.params);
                const deleteUserData = await this.acronymService.deleteData(acronym);
                res.status(200).json({
                    data: deleteUserData,
                    message: 'deleted'
                });
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = AcronymController;

//# sourceMappingURL=acronym.controller.js.map