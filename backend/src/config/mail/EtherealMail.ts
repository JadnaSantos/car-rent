import nodemailer from 'nodemailer';
import { HandlebarsMailTemplate } from './HandlebarsMailTemplate';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface IEmailContact {
  username: string;
}

interface ISendEmail {
  to: IEmailContact;
  subject: string;
  from?: IEmailContact;
  templateData: IParseMailTemplate;
}

class EtherealMail {
  static async sendMail({
    to,
    templateData,
    from,
    subject,
  }: ISendEmail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.username || 'Equipe Car Rent',
        address: from?.username || 'equipe@car-rent.com.br',
      },
      to: {
        name: to.username,
        address: to.username,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMail };
