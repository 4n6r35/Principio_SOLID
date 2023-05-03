import { Router } from "express";
import PostgresRepository from "../repositories/PostgresRepository.repository";
import DataBase from "../database/database.db";
import { UserUseCase } from "../../application/User.UseCase";
import UserController from "../controller/User.controller";

const router = Router()

/**
 * Iniciar Repositorio
 */

const postgresRepository = new PostgresRepository(DataBase.getInstace())

/**
 * Iniciar casos de uso
 */
const userUseCase = new UserUseCase(postgresRepository)

/**
 * Inciar Basic Controller
 */
const userController = new UserController(userUseCase)

router.get(
    '/get-users',
    userController.getDataUsers
);

router.get(
    '/get-user',
    userController.getDataUserById
);

router.post(
    '/create-user',
    userController.createUser
);

router.put(
    '/update-user',
    userController.updateUser
)

router.delete(
    '/delete-user',
    userController.deleteUser
)

export default router