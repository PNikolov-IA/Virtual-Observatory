import { DatabaseModule } from './utils/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ConfigModule } from '../src/config/config.module';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { CoreModule } from '../src/common/core/core.module';
import { TestUtils } from './utils/test.utils';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../src/config/config.service';
import { AuthService } from '../src/auth/auth.service';
import { JwtStrategy } from '../src/auth/strategy/jwt.strategy';
import { AuthController } from '../src/auth/auth.controller';

describe('AuthController (e2e)', async () => {
  let app: INestApplication;
  let testUtils: TestUtils;

  beforeEach(async (done) => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule,
        AuthModule,
        DatabaseModule,
        UsersModule,
        CoreModule,
      ],
      providers: [
        TestUtils,
      ],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    testUtils = app.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    done();
  });

  afterEach(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  it('/auth/login (POST) success', async () => {

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@telerikacademy.com', password: 'A@0aaa' })
      .expect(201);
  });

  it('/auth/login (POST) wrong credentials with wrong username', async () => {

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test1@telerikacademy.com', password: 'A@0aaa' })
      .expect(400)
      .expect({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Wrong credentials!',
      });
  });

  it('/auth/login (POST) wrong credentials with wrong password', async () => {

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@telerikacademy.com', password: 'A@1aaa' })
      .expect(400)
      .expect({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Wrong credentials!',
      });
  });
});
