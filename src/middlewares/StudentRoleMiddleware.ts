import { Injectable, NestMiddleware } from "@nestjs/common";
import { ERole } from "../models/ERole";

@Injectable()
export class StudentRoleMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const user = req.user;
        const role = user.role;
        if (role != ERole.Student) {
            return res.status(403).send({ message: "У вас нет прав для доступа к этому ресурсу" });
        } else {
            next();
        }
    }
}