import {Router} from "express";
import {ProfileCommandService} from "../../application/internal/commandservices/ProfileCommandService";
import {ProfileQueryService} from "../../application/internal/queryservices/ProfileQueryService";
import {ProfileResourceFromEntityAssembler} from "./transform/ProfileResourceFromEntityAssembler";
import {GetProfileByUserIdQuery} from "../../domain/model/queries/GetProfileByUserIdQuery";

export class ProfileController {
    private readonly router: Router;

    constructor(private readonly profileCommandService: ProfileCommandService, private readonly profileQueryService: ProfileQueryService) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * /api/v1/profiles:
         *   get:
         *     summary: Get a profile by user ID
         *     tags: [Profiles]
         *     description: Retrieve a profile by its user ID.
         *     parameters:
         *       - in: query
         *         name: userId
         *         required: true
         *         schema:
         *           type: integer
         *         description: The user ID of the profile to retrieve.
         *     responses:
         *       200:
         *         description: Profile retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ProfileResource'
         *       400:
         *         description: Bad Request.
         *       404:
         *         description: Profile not found.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.get('', this.getProfileByUserId.bind(this));
    }

    public getRoutes() {
        return this.router;
    }

    async getProfileByUserId(req: any, res: any) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                res.status(400).json({error: 'Bad Request', details: 'Missing user ID'});
                return;
            }
            const getProfileByUserId = new GetProfileByUserIdQuery(userId);
            const profile = await this.profileQueryService.getProfileByUserId(getProfileByUserId);
            if (!profile) {
                res.status(404).json({error: 'Profile not found', details: `Profile with user ID ${userId} not found`});
                return;
            }
            const profileResource = ProfileResourceFromEntityAssembler.toResourceFromEntity(profile);
            res.status(200).send(profileResource);
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }
}