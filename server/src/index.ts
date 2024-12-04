import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import serverless from 'serverless-http'
import * as dynamoose from "dynamoose";
import courseRoutes from "./routes/courseRoutes";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from "@clerk/express";
import userClerkRouter from "./routes/userClerkRouter";
import transationRoutes from "./routes/transationRoutes";
import userCourseProgressRoutes from './routes/userCourseProgressRoutes'
import seed from "./seed/seedDynamodb";
/* ROUTE IMPORT */


/* CONFIGURATION */

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  dynamoose.aws.ddb.local();
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(clerkMiddleware());

/* ROUTES */

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/courses", courseRoutes);
app.use("/users/clerk", requireAuth(), userClerkRouter);
app.use("/transactions", requireAuth(), transationRoutes);
app.use("/users/course-progress", requireAuth(), userCourseProgressRoutes);

/* SERVER */
const port = process.env.PORT || 3000;
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}


//AWS PRODUCTION ENVIRONMENT

const serverlessApp = serverless(app);
export const handler =async(event:any,context:any) => {
  if(event.action ==="seed"){
    await seed()
    return{
      statusCode:200,
      body:JSON.stringify({message:"Data seeded successfully"})
    };
  }else{
    return serverlessApp(event, context);
  }
}