"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const PORT = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error']
    });
    app.enableCors({
        origin: '*'
    });
    console.log(`APPLICATION HAS START ${PORT}`);
    await app.listen(PORT);
}
bootstrap().catch(err => {
    console.log(err.message);
    console.log("aqavaaaar");
});
//# sourceMappingURL=main.js.map