import {UserCommandService} from "../../application/internal/commandservices/UserCommandService";
import {Router} from "express";
import {SignInResource} from "./resources/SignInResource";
import {SignInCommandFromResourceAssembler} from "./transform/SignInCommandFromResourceAssembler";
import {AuthenticatedUserResourceFromEntityAssembler} from "./transform/AuthenticatedUserResourceFromEntityAssembler";
import {SignUpResource} from "./resources/SignUpResource";
import {SignUpCommandFromResourceAssembler} from "./transform/SignUpCommandFromResourceAssembler";

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
         *     description: Verifies the user credentials and returns an authentication token.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *                 description: The username of the user.
         *                 example: john_doe
         *               password:
         *                 type: string
         *                 description: The password of the user.
         *                 example: securepassword123
         *     responses:
         *       200:
         *         description: User authenticated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: number
         *                   description: User ID.
         *                   example: 1
         *                 username:
         *                   type: string
         *                   description: The username of the user.
         *                   example: john_doe
         *                 token:
         *                   type: string
         *                   description: Authentication token.
         *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
         *       400:
         *         description: Bad request. Invalid input data.
         *       401:
         *         description: Unauthorized. Invalid credentials.
         */
        this.router.post('/sign-in', this.signIn.bind(this));

        /**
         * @swagger
         * /api/v1/authentication/sign-up:
         *   post:
         *     summary: Register a new user
         *     tags: [Authentication]
         *     description: Creates a new user in the system.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *                 description: The username of the user.
         *                 example: john_doe
         *               password:
         *                 type: string
         *                 description: The password of the user.
         *                 minLength: 8
         *                 example: securepassword123
         *     responses:
         *       201:
         *         description: User created successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: number
         *                   description: User ID.
         *                   example: 1
         *                 username:
         *                   type: string
         *                   description: The username of the user.
         *                   example: john_doe
         *                 token:
         *                   type: string
         *                   description: Authentication token.
         *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
         *       400:
         *         description: Bad request. Invalid input data.
         */
        this.router.post('/sign-up', this.signUp.bind(this));
    }

    public getRoutes() {
        return this.router;
    }

    async signIn(req: any, res: any) {
        try {
            const resource: SignInResource = req.body;
            const command = SignInCommandFromResourceAssembler.toCommandFromResource(resource);
            const authenticatedUser = await this.userCommandService.signIn(command);
            const authenticatedUserResource = AuthenticatedUserResourceFromEntityAssembler.toResourceFromEntity(authenticatedUser);
            res.status(200).json(authenticatedUserResource);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }

    async signUp(req: any, res: any) {
        try {
            const resource: SignUpResource = req.body;
            const signUpCommand = SignUpCommandFromResourceAssembler.toCommandFromResource(resource);
            const authenticatedUser = await this.userCommandService.signUp(signUpCommand);
            const authenticatedUserResource = AuthenticatedUserResourceFromEntityAssembler.toResourceFromEntity(authenticatedUser);
            res.status(200).send(authenticatedUserResource);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }
}