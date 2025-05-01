import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process'

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

const SPEC_PATH = './shared/generated/api/spec/'

export class Swagger {
  app: INestApplication<any>
  config: Omit<OpenAPIObject, "paths">
  document: OpenAPIObject

  constructor(app: INestApplication<any>) {
    this.app = app;

    this.config = new DocumentBuilder()
      .setTitle('Druzhinarus Chatbot REST API')
      .setDescription('API specification')
      .setVersion('0.1.0')
      .addServer('http://localhost:7000/api', "Dev Server")
      .build()

    this.document = SwaggerModule.createDocument(app, this.config, {
      operationIdFactory: (_, method) => method
    });
  }

  setup() {
    SwaggerModule.setup('/docs/api', this.app, this.document);
  }

  async generate() {
    await writeSpecification(this.document)
    await generateClients()
  }
}

async function writeSpecification(spec: OpenAPIObject) {
  if (!fs.existsSync(SPEC_PATH)) {
    fs.mkdirSync(SPEC_PATH, { recursive: true });
  }

  fs.writeFileSync(path.join(SPEC_PATH, "openapi.json"), JSON.stringify(spec))
}

async function generateClients() {
  execSync('npm run openapi:generate')
}
