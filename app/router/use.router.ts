import ControllerRota from "../controllers/controller";
import { Router } from "express";
const router = Router();
const controller = new ControllerRota();



router.post("/", controller.createUser)



router.get("/", controller.calcularGastos)

router.get("/login", controller.loginAuth)

router.get("/rotaUser", controller.authentication , controller.rotaUser)


export default router


 