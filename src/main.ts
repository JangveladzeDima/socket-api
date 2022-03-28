import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const PORT = process.env.PORT || 3000

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error']
    });
    app.enableCors({
        origin: '*'
    })
    console.log(`APPLICATION HAS START ${PORT}`)
    await app.listen(PORT);
}

bootstrap().catch(err => {
    console.log(err.message)
});
