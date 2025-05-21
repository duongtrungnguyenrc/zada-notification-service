import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

import { NewAccountData, ResetPasswordData, VerifyAccountData } from "./types";

@Injectable()
export class MailService {
  private clientBaseUrl: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly i18nService: I18nService,
    private readonly configService: ConfigService,
  ) {
    this.clientBaseUrl = this.configService.getOrThrow("CLIENT_BASE_URL");
  }

  async sendNewAccountEmail(data: NewAccountData) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: this.i18nService.t("templates.new-account.subject"),
      template: "new-account",
      context: {
        userName: data.userName,
        logoUrl: "",
        welcomeImageUrl: "",
        sellerUrl: "",
        profileUrl: "",
        reportUrl: "",
      },
    });
  }

  async sendResetPasswordEmail(data: ResetPasswordData) {
    const verifyAccountPath = this.configService.getOrThrow("RESET_PASSWORD_PATH");

    await this.mailerService.sendMail({
      to: data.email,
      subject: this.i18nService.t("templates.reset-password.subject"),
      template: "reset-password",
      context: {
        userName: data.fullName,
        otp: data.otp,
        resetUrl: `${this.clientBaseUrl}/${verifyAccountPath}?sid=${data.sessionId}`,
        logoUrl: "",
      },
    });
  }

  async sendVerifyAccountEmail(data: VerifyAccountData) {
    const verifyAccountPath = this.configService.getOrThrow("VERIFY_ACCOUNT_PATH");

    await this.mailerService.sendMail({
      to: data.email,
      subject: this.i18nService.t("templates.verify-account.subject"),
      template: "verify-account",
      context: {
        userName: data.fullName,
        otp: data.otp,
        verifyUrl: `${this.clientBaseUrl}/${verifyAccountPath}?sid=${data.sessionId}`,
        logoUrl: "",
      },
    });
  }
}
