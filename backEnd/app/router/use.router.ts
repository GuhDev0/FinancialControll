import ControllerRota from "../controllers/controller";
import { Router } from "express";
const router = Router();
const controller = new ControllerRota();



router.post("/", controller.createUser)

router.get("/calcularGastos", controller.calcularGastos)

router.post("/login", controller.loginAuth)

router.get("/rotaUser", controller.authentication, controller.rotaUser)

router.post("/registraGasto" , controller.authentication , controller.registraGastos)

router.get("/resumoDosGastos",controller.authentication, controller.resumoDeGastos)




export default router


 