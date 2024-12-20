import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CreateAgenceDto, } from 'src/agence/dto/create-agence.dto';
import { CreateUserDto } from './create-user.dto';
import { CreateAubergeDto } from 'src/auberge/auberge-dto.dto/auberge-creation.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
