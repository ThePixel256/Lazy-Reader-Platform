import {Router} from "express";
import {ProfileCommandService} from "../../application/internal/commandservices/ProfileCommandService";
import {ProfileQueryService} from "../../application/internal/queryservices/ProfileQueryService";
import {ProfileResourceFromEntityAssembler} from "./transform/ProfileResourceFromEntityAssembler";
import {GetProfileByUserIdQuery} from "../../domain/model/queries/GetProfileByUserIdQuery";
import {GetAllProfilesQuery} from "../../domain/model/queries/GetAllProfilesQuery";

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
         *     summary: Get profiles
         *     tags: [Profiles]
         *     description: Retrieve all profiles or a specific profile by its user ID.
         *     parameters:
         *       - in: query
         *         name: userId
         *         schema:
         *           type: integer
         *         required: false
         *         description: The user ID of the profile to retrieve.
         *     responses:
         *       200:
         *         description: List of profiles or a specific profile retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               oneOf:
         *                 - type: array
         *                   items:
         *                     $ref: '#/components/schemas/ProfileResource'
         *                 - $ref: '#/components/schemas/ProfileResource'
         *       400:
         *         description: Bad Request. Missing or invalid parameters.
         *       404:
         *         description: Profile not found.
         *       500:
         *         description: Internal Server Error.
         */
        this.router.get('', this.getProfiles.bind(this));
    }

    public getRoutes() {
        return this.router;
    }

    async getProfiles(req: any, res: any) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                const getAllProfilesQuery = new GetAllProfilesQuery();
                const profiles = await this.profileQueryService.getAllProfiles(getAllProfilesQuery);
                const profileResources = profiles.map(profile => ProfileResourceFromEntityAssembler.toResourceFromEntity(profile));
                res.status(200).send(profileResources);
            } else {
                const getProfileByUserId = new GetProfileByUserIdQuery(userId);
                const profile = await this.profileQueryService.getProfileByUserId(getProfileByUserId);
                if (!profile) {
                    res.status(404).json({error: 'Profile not found', details: `Profile with user ID ${userId} not found`});
                    return;
                }
                const profileResource = ProfileResourceFromEntityAssembler.toResourceFromEntity(profile);
                res.status(200).send(profileResource);
            }
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            res.status(500).json({error: 'Internal Server Error', details: err.message});
        }
    }
}