import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;
  constructor(private configService: ConfigService) {
    console.log();
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: configService.get('email_server_host'),
        pass: configService.get('email_server_ak'),
      },
    });
  }
  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '系统',
        address: this.configService.get('email_server_host'),
      },
      to,
      subject,
      html,
    });
  }
}
