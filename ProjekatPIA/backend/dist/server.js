"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_router_1 = __importDefault(require("./routers/korisnik.router"));
const klijent_router_1 = __importDefault(require("./routers/klijent.router"));
const agencija_router_1 = __importDefault(require("./routers/agencija.router"));
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//to podencijalno treba promeniti na localhost:
mongoose_1.default.connect('mongodb://127.0.0.1:27017/ProjekatPIA');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/korisnik', korisnik_router_1.default);
router.use('/klijent', klijent_router_1.default);
router.use('/agencija', agencija_router_1.default);
router.use('/admin', admin_router_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map