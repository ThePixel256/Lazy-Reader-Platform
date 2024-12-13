import {ITokenService} from "../../../../application/internal/outboundservices/ITokenService";
import {Nullable} from "../../../../../shared/domain/types/Nullable";
import {TokenSettings} from "../configuration/TokenSettings";
import {User} from "../../../../domain/model/aggregates/User";
import jwt, {JwtPayload, SignOptions, VerifyOptions} from "jsonwebtoken";

export class TokenService implements ITokenService{
    private readonly tokenSettings: TokenSettings;

    constructor(tokenSettings: TokenSettings) {
        this.tokenSettings = tokenSettings;
    }

    generateToken(user: User): string {
        const secret = this.tokenSettings.secret;
        const payload = {
            sid: user.id.toString(),
            name: user.username,
        };
        const options: SignOptions = {
            expiresIn: "7d",
        };
        return jwt.sign(payload, secret, options);
    }

    async validateToken(token: string): Promise<Nullable<number>> {
        if (!token) return null;
        try {
            const secret = this.tokenSettings.secret;
            const options: VerifyOptions = {
                algorithms: ["HS256"],
            };
            const decoded = jwt.verify(token, secret, options) as JwtPayload;
            if (decoded && typeof decoded.sid === "string") {
                return parseInt(decoded.sid);
            }
            return null;
        } catch (error) {
            console.error("Token validation error:", error);
            return null;
        }
    }
}