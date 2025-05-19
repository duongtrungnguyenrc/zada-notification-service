import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { createNestroApplication } from "@duongtrungnguyen/nestro";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

async function bootstrap() {
  const configService: ConfigService = new ConfigService();

  const app = await createNestroApplication(AppModule, {
    server: {
      host: configService.getOrThrow<string>("NESTRO_HOST"),
      port: configService.getOrThrow<number>("NESTRO_PORT"),
    },
    client: {
      name: configService.getOrThrow<string>("SERVICE_NAME"),
      host: configService.getOrThrow<string>("SERVICE_HOST"),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [configService.get<string>("NATS_URL")],
    },
  });

  app.startAllMicroservices();
  await app.listen();
}
bootstrap();
