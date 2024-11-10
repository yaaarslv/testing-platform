const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: 'env/.env' });

export class Email {
    private readonly testingPlatformEmail: string;
    private readonly testingPlatformPassword: string;

    constructor() {
        this.testingPlatformEmail = process.env.EMAIL;
        this.testingPlatformPassword = process.env.EMAIL_PASSWORD;
    }

    async sendMail(subject: string, recipient: string, text: string) {
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.yandex.ru',
                port: 587,
                secure: false,
                auth: {
                    user: this.testingPlatformEmail,
                    pass: this.testingPlatformPassword
                }
            });

            let info = await transporter.sendMail({
                from: this.testingPlatformEmail,
                to: recipient,
                subject: subject,
                text: text
            });

            console.log("Письмо успешно отправлено");
        } catch (error) {
            console.error("Ошибка: Невозможно отправить сообщение. Подробности:");
            console.log(error);
        }
    }
}


