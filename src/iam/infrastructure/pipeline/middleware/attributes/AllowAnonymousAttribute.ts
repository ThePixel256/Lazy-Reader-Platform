export class AllowAnonymousAttribute {
    static apply(req: any, res: any, next: any) {
        req.allowAnonymous = true;
        next();
    }
}