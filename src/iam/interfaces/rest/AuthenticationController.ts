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
         *     description: Authenticate a user and return a token.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/SignInResource'
         *     responses:
         *       200:
         *         description: User authenticated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/AuthenticatedUserResource'
         *       400:
         *         description: Bad Request.
         *       401:
         *         description: Unauthorized.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.post('/sign-in', this.signIn.bind(this));

        /**
         * @swagger
         * /api/v1/authentication/sign-up:
         *   post:
         *     summary: Register a new user
         *     tags: [Authentication]
         *     description: Register a new user and create a profile.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/SignUpResource'
         *     responses:
         *       201:
         *         description: User registered successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/AuthenticatedUserResource'
         *       400:
         *         description: Bad Request.
         *       500:
         *         description: Internal Server Error.
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