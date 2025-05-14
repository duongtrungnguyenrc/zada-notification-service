import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import * as path from "path";

import { MailModule } from "~mailer";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "i18n"),
        watch: true,
      },
      resolvers: [
        {
          use: QueryResolver,
          options: ["lang"],
        },
        AcceptLanguageResolver,
        new HeaderResolver(["x-lang"]),
      ],
    }),
    MailModule,
  ],
})
export class AppModule {}
