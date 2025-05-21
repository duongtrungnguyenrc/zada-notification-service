import { MessagePattern } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";

import { NewAccountData, ResetPasswordData, VerifyAccountData } from "./types";
import { MailService } from "./mailer.service";

@Controller()
export class MailerController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern("noti.email.new-account")
  sendNewAccountEmail(data: NewAccountData) {
    return this.mailService.sendNewAccountEmail(data);
  }

  @MessagePattern("noti.email.verify-account")
  sendVerifyAccountEmail(data: VerifyAccountData) {
    return this.mailService.sendVerifyAccountEmail(data);
  }

  @MessagePattern("noti.email.reset-password")
  sendResetPasswordEmail(data: ResetPasswordData) {
    return this.mailService.sendResetPasswordEmail(data);
  }
}
