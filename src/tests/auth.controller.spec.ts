import { JwtServiceMock } from './mocks/jwt.service.mock';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { AuthController } from '../auth/auth.controller';
import { UsersService } from '../common/core/users.service';
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';

jest.mock('../auth/auth.service');
jest.mock('../common/core/users.service');

describe('AuthController', () => {
  let authService: AuthService = new AuthService(null, null);
  let authCtrl: AuthController;
  let jwtServiceMock: JwtServiceMock;

  beforeAll(async () => {
    jwtServiceMock = new JwtServiceMock({});
    const module = await Test.createTestingModule({
      imports: [PassportModule.register({
        defaultStrategy: 'jwt',
      })],
      controllers: [AuthController],
      providers: [UsersService,
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: 'UserRepository',
          useValue: {
            findOne: () => {
              return 'user';
            },
          },
        }],
    }).compile();

    authCtrl = module.get<AuthController>(AuthController);
  });

  it('should call AuthService signIn method', async () => {
    const user = new UserLoginDTO();
    jest.spyOn(authService, 'signIn').mockImplementation(() => {
      return 'token';
    });
    await authCtrl.sign(user);
    expect(authService.signIn).toHaveBeenCalledTimes(1);
  });

  it('should call AuthService signIn method', async () => {
    // Arrange
    const userService = new UsersService(null);
    const authenticationService = new AuthService(userService, null);
    const ctrl = new AuthController(authenticationService, userService);
    const user = new UserLoginDTO();

    jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
      return 'token';
    });

    // Act
    await ctrl.sign(user);

    // Assert
    expect(authenticationService.signIn).toHaveBeenCalledTimes(1);
  });
});
