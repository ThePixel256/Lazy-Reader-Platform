import {TokenService} from "../../../tokens/jwt/services/TokenService";

export class RequestAuthorizationMiddleware {
    constructor(private readonly tokenService: TokenService) {}

    handle = async (req: any, res: any, next: any) => {
        const publicPaths = ['/api-docs', '/api-docs/swagger-ui.css', '/api/v1/authentication/sign-in', '/api/v1/authentication/sign-up'];
        if (req.allowAnonymous || publicPaths.includes(req.path)) {
            console.log(`Skipping authorization for path: ${req.path}`);
            return next();
        }

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Missing token" });
        }
        try {
            const isValid = await this.tokenService.validateToken(token);
            if (!isValid) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            next();
        } catch (error) {
            console.error("Authorization error:", error);
            res.status(401).json({ message: "Unauthorized" });
        }
    };
}