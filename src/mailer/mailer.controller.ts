import { MessagePattern } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";

import { MailService } from "./mailer.service";
import { NewAccountData } from "./types";

@Controller()
export class MailerController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern("noti.email.new-account")
  sendNewAccountEmail(data: NewAccountData) {
    return this.mailService.sendNewAccountEmail(data);
  }
}
