import express from 'express';
import "dotenv/config";
import Hello from './hello.js';
import Lab5 from './lab5.js';
import cors from 'cors';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import UserRoutes from './users/routes.js';
import mongoose from 'mongoose';
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb+srv://yachenyin820:zzw15122910279@cluster0.pqiauoo.mongodb.net/kanbas?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_STRING)
const app = express()
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(
  session(sessionOptions)
);

app.use(express.json());
Lab5(app)
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Hello(app)
app.listen(process.env.PORT || 4000);