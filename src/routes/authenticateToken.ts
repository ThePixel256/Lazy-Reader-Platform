import { NextFunction,Response,Request} from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req:Request, res:Response, next:NextFunction)=>{
    const authHeader = req.headers['authorization'];

    if (authHeader != undefined && authHeader.startsWith('Bearer')) {
        try {
            const token = authHeader.slice(7)
            const decoded = jwt.verify(token, process.env.SECRET_KEY || "skdiifr145s5h8jotzl127msd") as { userId: number };
            (req as any).userId = decoded.userId;
            next();
        } catch (error) {
            res.status(403).json({ error: 'Invalid token' });
        }
    } else{
        res.status(401).json({
            msg:`No token provided`
        })
    }
}

export default authenticateToken