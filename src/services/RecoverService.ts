import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recover } from "../entities/Recover";

export class RecoverService {
    constructor(@InjectRepository(Recover) private recoverRepository: Repository<Recover>) {
    }

    async create(recipient: string, uuid: string): Promise<boolean> {
        const recover = await this.recoverRepository.findOneBy({ email: recipient });

        if (recover === null) {
            await this.recoverRepository.save({
                email: recipient,
                uuid: uuid
            });
        } else {
            recover.uuid = uuid;
            await this.recoverRepository.save(recover);
        }

        return true;
    }

    async delete(recipient: string): Promise<boolean> {
        await this.recoverRepository.delete({ email: recipient });
        return true;
    }

    async checkRecoverLink(link: string): Promise<string | null> {
        const recover = await this.recoverRepository.findOneBy({ uuid: link });
        return recover === null ? "false" : recover.email;
    }
}
