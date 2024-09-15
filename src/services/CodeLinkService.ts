import { ERole } from '../models/ERole';

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Генерируем ключ (должен быть сохранен для дешифровки)
const iv = crypto.randomBytes(16); // Инициализационный вектор

export class CodeLinkService {
    static async encrypt(text: string): Promise<string> {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }

    static async decrypt(encryptedText: string): Promise<string> {
        const [ivHex, encrypted] = encryptedText.split(':');
        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }

    static async generateInviteLink(role: ERole, actorId: number, orgName: string, isActive: boolean) {
        const params = JSON.stringify({ role, actorId, orgName, isActive });
        return this.encrypt(params); // Возвращаем зашифрованные параметры
    }
}