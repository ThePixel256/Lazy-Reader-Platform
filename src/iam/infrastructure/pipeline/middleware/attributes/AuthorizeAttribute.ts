import {TokenService} from "../../../tokens/jwt/services/TokenService";

export class AuthorizeAttribute {
    constructor(private readonly tokenService: TokenService) {}

    handle = async (req: any, res: any, next: any) => {
        if (req.allowAnonymous) {
            console.log("Skipping authorization for anonymous route");
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