import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { join } from "path";

import { MailerController } from "./mailer.controller";
import { MailService } from "./mailer.service";
import { I18nService } from "nestjs-i18n";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService, i18nService: I18nService) => {
        return {
          transport: {
            host: configService.get<string>("MAILER_HOST"),
            port: configService.get<number>("MAILER_PORT"),
            secure: false,
            auth: {
              user: configService.get<string>("MAILER_USER"),
              pass: configService.get<string>("MAILER_PASSWORD"),
            },
          },
          template: {
            dir: join(__dirname, "mailer", "../templates"),
            adapter: new HandlebarsAdapter({ t: i18nService.hbsHelper }),
          },
        };
      },
      inject: [ConfigService, I18nService],
    }),
  ],
  controllers: [MailerController],
  providers: [MailService],
  exports: [MailModule],
})
export class MailModule {}
