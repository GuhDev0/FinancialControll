import { MyJwtPayload } from "../../model/myJwt";

declare module "express-serve-static-core"{
    interface Request {
        user?: MyJwtPayload;
    }
}