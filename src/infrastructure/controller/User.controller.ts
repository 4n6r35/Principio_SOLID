import { Request, Response } from "express";
import { UserUseCase } from "../../application/User.UseCase";
import { UserDuplicateValues } from "../../domain/Exceptions/User.exeption";





class UserController {
    constructor(private userUseCase: UserUseCase) { }

    public getDataUsers = async (req: Request, res: Response) => {
        try {
            let dataUsers = await this.userUseCase.getDataUser();
            return res.json({
                ok: true,
                data: dataUsers
            })
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'No se han podido cargar los Usurios registrados en este momento'
            })
        }
    }

    public getDataUserById = async (req: Request, res: Response) => {
        try {
            const { id_user = null } = req.query as any
            const response = await this.userUseCase.getDataUserById({ id_user })
            return res.json({
                ok: true,
                data: response
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                ok: false,
                msg: 'Ha ocurrido un error al momento de obtener este usuario, Trabajamos en la solucion, intentalo mas tarde',
            })
        }
    }

    public createUser = async (req: Request, res: Response) => {
        const data = req.body;
        try {
            const response = await this.userUseCase.createUser(data)
            return res.json({
                data: response
            })
        } catch (error) {
            if (error instanceof UserDuplicateValues) {
                return res.status(400).json({
                    ok: false,
                    message: error.message,
                    data: null
                })
            }

            return res.status(500).json({
                ok: false,
                msg: 'Se ha producido un error',
                data: null
            })
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        const data = req.body
        try {
            const response = await this.userUseCase.updatedUser(data)
            return res.json({
                data: response
            })
        } catch (error) {
            if (error instanceof UserDuplicateValues) {
                return res.status(400).json({
                    ok: false,
                    message: error.message,
                    data: null
                })
            }

            return res.status(500).json({
                ok: false,
                message: 'Se ha producido un error',
                data: null
            })
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const { id_user = null } = req.query as any
            const response = await this.userUseCase.deletedUser({ id_user })
            return res.json({
                ok: true,
                data: response
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                ok: false,
                msg: 'Se ha producido un error al momento de eliminar el usuario',
            })
        }
    }

}

export default UserController