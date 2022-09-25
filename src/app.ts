import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import User from './models/user';
import aboutRoutes from './routes/about';
import achievementRoutes from './routes/achievement';
import announcementRoutes from './routes/announcement';
import categoryRoutes from './routes/category';
import commentRoutes from './routes/comment';
import indexRoutes from './routes/index';
import ordersRoutes from './routes/orders';
import projectRoutes from './routes/project';
import serviceRoutes from './routes/service';
import technologyRoutes from './routes/technology'
import { Strategy as LocalStrategy } from 'passport-local';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import i18n from 'i18n';
import cors from 'cors';

const app = express();

require('dotenv').config();

// Connecting to database
mongoose.connect(process.env.DATABASE_URL!, {useNewUrlParser: true});

// App configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.use(cors({ origin: 'https://www.websiteswithpassion.pl', credentials: true }));
i18n.configure({
    locales: ["en", "de", "pl"],
   	register: global,
	defaultLocale: 'en',
    directory: __dirname + '/locales',
})

app.use(i18n.init);


app.use(require("express-session")({
    secret: "heheszki",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("heheszki"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use("/website-orders", ordersRoutes)
app.use("/projects", projectRoutes)
app.use("/projects/category", categoryRoutes)
app.use("/projects/:project_id/reviews", commentRoutes)
app.use("/about", aboutRoutes)
app.use("/about/:user_id/achievements", achievementRoutes)
app.use("/about/:user_id/services", serviceRoutes)
app.use("/about/:user_id/technologies", technologyRoutes)
app.use("/announcements", announcementRoutes);


app.listen(process.env.PORT);