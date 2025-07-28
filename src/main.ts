import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { MessageModule } from './message.module';
async function bootstrap() {
  const app = await NestFactory.create(MessageModule);
  const config = new DocumentBuilder()
    .setTitle('nano Sms Api')
    .setDescription('The sms API description')
    .setVersion('1.0')
    .addTag('nano sms')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: documentFactory,
      },
    }),
  );
  await app
    .listen(process.env.PORT || 3000)
    .then(() =>
      console.log(
        `\n App listen to http://localhost:${process.env.PORT || '3000'} `,
      ),
    );
}
bootstrap();
