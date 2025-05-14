import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

import { NewAccountData } from "./types";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly i18nService: I18nService,
  ) {}

  async sendNewAccountEmail(data: NewAccountData) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: this.i18nService.t("templates.newAccount.subject"),
      template: "new-account",
      context: {
        userName: data.userName,
        logoUrl: "",
        welcomeImageUrl: "",
        shopUrl: "",
        profileUrl: "",
        reportUrl: "",
      },
    });
  }
}
