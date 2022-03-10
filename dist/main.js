"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error']
    });
    await app.listen(3000);
}
bootstrap().catch(err => console.log(err));
//# sourceMappingURL=main.js.map