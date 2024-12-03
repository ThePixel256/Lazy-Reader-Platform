import { Request, Response, RequestHandler } from "express"
import bcrypt from 'bcrypt'
import { User } from "../models/user"
import { Op } from "sequelize"
import jwt from "jsonwebtoken"

export const register: RequestHandler = async (req:Request, res:Response) => {

    const{name,lastname,password,email,dni} = req.body

    const user = await User.findOne({where:{[Op.or]:{email:email, dni:dni}}})

    if (user) {
        res.status(400).json({
            msg:`Ya existe el correo`
        })
        return
    }

    const passwordHash = await bcrypt.hash(password,10)

    try {
        User.create({
            name:name,
            lastname:lastname,
            email:email,
            password:passwordHash,
            dni:dni,
            status:1,
        })

        res.json({
            msg:`User ${name} ${lastname} Creacion de usuario correcto ^_^`
        })
    } catch (error) {
        res.status(400).json({
            msg:`Existe un error al crear el usuario  ${name} ${lastname}.`
        })
    }
}

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user: any = await User.findOne({ where: { email } });

        if (!user) {
            res.status(400).json({
                msg: `Usuario no existente con el Email: ${email}`,
            });
            return;
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            res.status(400).json({
                msg: `Contraseña incorrecta.`,
            });
            return;
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.SECRET_KEY || 'skdiifr145s5h8jotzl127msd',
            { expiresIn: '1h' }
        );

        res.json({
            token,
            userId: user.id,
            username: user.name
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            msg: 'Error en el servidor durante el inicio de sesión',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
