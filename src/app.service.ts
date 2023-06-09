import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectNodemailer } from './node-mailer/nodemailer.decorator';
import { Transporter } from 'nodemailer';

@Injectable()
export class AppService {
  constructor(@InjectNodemailer('gmail') private nodemailer: Transporter) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendMail(): void {
    var minm = 100000;
    var maxm = 999999;
    var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    this.nodemailer.sendMail({
      to: 'aashishmaharjan700@gmail.com',
      from: 'aashishmaharjan700@gmail.com',
      subject: 'Verification email',
      text: 'Verification email',
      html: `<b>Your six digit code is ${code}</b>`,
    });
  }
}
