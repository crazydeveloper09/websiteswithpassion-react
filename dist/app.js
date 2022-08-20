"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("./models/user"));
const about_1 = __importDefault(require("./routes/about"));
const achievement_1 = __importDefault(require("./routes/achievement"));
const announcement_1 = __importDefault(require("./routes/announcement"));
const category_1 = __importDefault(require("./routes/category"));
const comment_1 = __importDefault(require("./routes/comment"));
const index_1 = __importDefault(require("./routes/index"));
const orders_1 = __importDefault(require("./routes/orders"));
const project_1 = __importDefault(require("./routes/project"));
const service_1 = __importDefault(require("./routes/service"));
const technology_1 = __importDefault(require("./routes/technology"));
const passport_local_1 = require("passport-local");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const i18n_1 = __importDefault(require("i18n"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
require('dotenv').config();
// Connecting to database
mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@websites-with-passion.x2c9m.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true });
// App configuration
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false
}));
app.use((0, cors_1.default)({ origin: 'https://silly-wiles-dbbbf9.netlify.app', credentials: true }));
i18n_1.default.configure({
    locales: ["en", "de", "pl"],
    register: global,
    defaultLocale: 'en',
    directory: __dirname + '/locales',
});
app.use(i18n_1.default.init);
app.use(require("express-session")({
    secret: "heheszki",
    resave: true,
    saveUninitialized: true
}));
app.use((0, cookie_parser_1.default)("heheszki"));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.Strategy(user_1.default.authenticate()));
passport_1.default.serializeUser(user_1.default.serializeUser());
passport_1.default.deserializeUser(user_1.default.deserializeUser());
app.use(index_1.default);
app.use("/website-orders", orders_1.default);
app.use("/projects", project_1.default);
app.use("/projects/category", category_1.default);
app.use("/projects/:project_id/reviews", comment_1.default);
app.use("/about", about_1.default);
app.use("/about/:user_id/achievements", achievement_1.default);
app.use("/about/:user_id/services", service_1.default);
app.use("/about/:user_id/technologies", technology_1.default);
app.use("/announcements", announcement_1.default);
app.listen(process.env.PORT);
