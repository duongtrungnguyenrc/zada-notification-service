import { Controller, Get, Req, Res } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Request, Response } from "express";

import { MailService } from "./mailer.service";
import { NewAccountData } from "./types";

@Controller()
export class MailerController {
  constructor(private readonly mailService: MailService) {}

  @Get("/test")
  getTestTemplates(@Res() res: Response, @Req() req: Request) {
    res.render("reset-password", {
      // language: req.headers["x-lang"],
      userName: "Nguyen dep trai",
    });
  }

  @MessagePattern("noti.new-account")
  sendNewAccountEmail(data: NewAccountData) {
    return this.mailService.sendNewAccountEmail(data);
  }
}
