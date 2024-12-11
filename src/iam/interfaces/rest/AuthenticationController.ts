import {UserCommandService} from "../../application/internal/commandservices/UserCommandService";
import {Router} from "express";

export class AuthenticationController{
    private readonly router: Router;

    constructor(private readonly userCommandService: UserCommandService) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * /api/v1/authentication/sign-in:
         *   post:
         *     summary: Authenticate a user
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *                 description: The username of the user
         *               password:
         *                 type: string
         *                 description: The password of the user
         *     responses:
         *       200:
         *         description: User authenticated successfully
         *       400:
         *         description: Bad request
         *       401:
         *         description: Unauthorized
         */
        this.router.post('/sign-in', this.signIn.bind(this));

        /**
         * @swagger
         * /api/v1/authentication/sign-up:
         *   post:
         *     summary: Register a new user
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *                 description: The username of the user
         *               password:
         *                 type: string
         *                 description: The password of the user
         *                 minLength: 8
         *     responses:
         *       201:
         *         description: User created successfully
         *       400:
         *         description: Bad request
         */
        this.router.post('/sign-up', this.signUp.bind(this));
    }

    public getRoutes() {
        return this.router;
    }

    async signIn(req: any, res: any) {
        try {
            const user = await this.userCommandService.signIn(req.body);
            res.status(200).json(user);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }

    async signUp(req: any, res: any) {
        try {
            const user = await this.userCommandService.signUp(req.body);
            res.status(200).send(user);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }
}