import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { PrismaClient } from '@prisma/client';

import { ApiModule } from 'apps/api/src/api.module';

import { PrismaModule } from 'apps/prisma/assets/prisma.module';

import { UsersRepository } from 'apps/account/src/users/repositories/users.repository';

import { mockTestAdminToken } from '../constants/mock-token.constant';
import { MOCK_REGISTRATION } from '../constants/mock-registration.constant';

describe('ApiAuthController (e2e)', () => {
  const prisma = new PrismaClient();

  let app: INestApplication;
  let usersRepository: UsersRepository;
  let loggedUserEmail: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);

    await app.init();
  });

  it('/auth/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(MOCK_REGISTRATION)
      .expect(201);

    expect(response.body.email).toBeDefined();

    loggedUserEmail = response.body.email;
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(MOCK_REGISTRATION)
      .expect(201);

    expect(response.body.access_token).toBeDefined();
  });

  it('/users/:id (DELETE)', async () => {
    const user = await usersRepository.findUserBy({
      where: { email: loggedUserEmail },
    });

    await request(app.getHttpServer())
      .delete('/users/' + user.id)
      .set('Authorization', `Bearer ${mockTestAdminToken}`)
      .send(MOCK_REGISTRATION)
      .expect(200);
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
