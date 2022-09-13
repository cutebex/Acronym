"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = _interopRequireDefault(require("supertest"));
const _app = _interopRequireDefault(require("../app"));
const _acronymModel = _interopRequireDefault(require("../models/acronym.model"));
const _acronymRoute = _interopRequireDefault(require("../routes/acronym.route"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
afterAll(async ()=>{
    await new Promise((resolve)=>setTimeout(()=>resolve(), 500));
});
describe('[GET] /acronym/:acronym', ()=>{
    it('response statusCode 200 / findOne', ()=>{
        const userId = 1;
        const findUser = _acronymModel.default.find((user)=>user.id === userId);
        const acronymRoute = new _acronymRoute.default();
        const app = new _app.default([
            acronymRoute
        ]);
        return (0, _supertest.default)(app.getServer()).get(`${acronymRoute.path}/${userId}`).expect(200, {
            data: findUser,
            message: 'find'
        });
    });
});
describe('[POST] /acronym', ()=>{
    it('response statusCode 201 / created', async ()=>{
        const userData = {
            acronym: 'IOT',
            definition: 'Internet Of Thing'
        };
        const acronymRoute = new _acronymRoute.default();
        const app = new _app.default([
            acronymRoute
        ]);
        return (0, _supertest.default)(app.getServer()).post(`${acronymRoute.path}`).send(userData).expect(201);
    });
});
describe('[PUT] /acronym/:acronym', ()=>{
    it('response statusCode 200 / updated', async ()=>{
        const userId = 1;
        const userData = {
            acronym: 'ZZZZ',
            definition: 'test'
        };
        const acronymRoute = new _acronymRoute.default();
        const app = new _app.default([
            acronymRoute
        ]);
        return (0, _supertest.default)(app.getServer()).put(`${acronymRoute.path}/${userId}`).send(userData).expect(200);
    });
});
describe('[DELETE] /acronym/:acronym', ()=>{
    it('response statusCode 200 / deleted', ()=>{
        const userId = 1;
        const deleteUser = _acronymModel.default.filter((user)=>user.id !== userId);
        const acronymRoute = new _acronymRoute.default();
        const app = new _app.default([
            acronymRoute
        ]);
        return (0, _supertest.default)(app.getServer()).delete(`${acronymRoute.path}/${userId}`).expect(200, {
            data: deleteUser,
            message: 'deleted'
        });
    });
});

//# sourceMappingURL=acronym.test.js.map