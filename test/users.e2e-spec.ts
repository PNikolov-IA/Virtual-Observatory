import { DatabaseModule } from './utils/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ConfigModule } from '../src/config/config.module';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { CoreModule } from '../src/common/core/core.module';
import { TestUtils } from './utils/test.utils';

describe('UsersController (e2e)', async () => {
  let app: INestApplication;
  let testUtils: TestUtils;

  beforeEach(async () => {
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
  });

  afterEach(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  it('/users (GET)', () => {
    // Generate you jwt in https://jwt.io/
    return request(app.getHttpServer())
      .get('/users')
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVsZXJpa2FjYWRlbXkuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU0NDcwMjMwM30.glxj_C0JFmXDjRBdBTbfXfP1eIBdWYNIE4C-NlITA3c', { type: 'bearer' })
      .expect(200)
      .expect('[{"id":1,"email":"test@telerikacademy.com","password":"$2b$10$Gl4kSdKlZP79VNd9RUWTke4XYcW5WUvkTjw3blSZyWBnsCNB7XU9W","avatarUrl":"public\\\\images\\\\default.png","isAdmin":true}]');
  });
});
