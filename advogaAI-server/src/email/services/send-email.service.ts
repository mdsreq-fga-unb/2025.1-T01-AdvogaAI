// src/email.service.ts

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class SendEmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(data: SendEmailDto) {
    try {
      let botaoHtml = '';

      if (data.textoBotao && data.linkBotao) {
        botaoHtml = `
        <a href="${data.linkBotao}" target="_blank" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; font-weight: bold;">
          ${data.textoBotao}
        </a>
      `;
      }
      await this.mailerService.sendMail({
        to: data.emailDestino,
        subject: data.assunto,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
          <h1 style="color: #0d2c4f; margin: 0;">AdvogaAI</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #007bff;">${data.titulo}</h2>
          <p>Olá, ${data.nomeUsuario},</p>
          <p>${data.corpo}</p>
          <p style="margin-top: 30px;">Se você não solicitou este email, por favor, ignore-o.</p>
          ${botaoHtml ? `<div style="text-align: center;">${botaoHtml}</div>` : ''}
          <p>Atenciosamente,<br>Equipe AdvogaAI</p>
        </div>
        <div style="background-color: #f4f4f4; color: #888; padding: 10px; text-align: center; font-size: 12px;">
          <p>© ${new Date().getFullYear()} AdvogaAI. Todos os direitos reservados.</p>
        </div>
      </div>
        `,
      });
      return { success: true, message: 'Email enviado com sucesso!' };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Falha ao enviar o email.');
    }
  }
}
