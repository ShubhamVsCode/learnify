"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./lib/db"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', user_route_1.default);
app.get('/info', (req, res) => {
    res.json({ msg: 'Backend is Running Successfully!' });
});
app.listen(PORT, () => {
    (0, db_1.default)();
    console.log('App listening on port 4000!');
});
