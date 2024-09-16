const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config({ path: 'env/.env' });

// Здесь вы можете загрузить ключ из переменных окружения или файла
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

export class CodeLinkService {
    static async encrypt(text: string): Promise<string> {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }

    static async decrypt(encryptedText: string): Promise<object> {
        const [ivHex, encrypted] = encryptedText.split(':');
        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }

    static async generateInviteLink(role: number, actorId: number, orgName: string, isActive: boolean) {
        const params = JSON.stringify({ role, actorId, orgName, isActive });
        return this.encrypt(params); // Возвращаем зашифрованные параметры
    }
}
