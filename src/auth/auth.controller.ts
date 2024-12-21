import { Controller, Post, Body, Res, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateAgenceDto } from 'src/agence/dto/create-agence.dto';
import { CreateAubergeDto } from 'src/auberge/auberge-dto.dto/auberge-creation.dto';
import { CreateClubDto } from './create-club.dto';
import { CreateUserDto } from './create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user-login')
  @ApiOperation({ summary: 'Log in as a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request: Missing email or password' })
  @ApiBody({
    description: 'Login payload for users',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  async login(
    @Res() res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const authenticationData = await this.authService.userLogin(email, password);

    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      results: {
        publicUser: authenticationData.publicUser,
        accessToken: authenticationData.accessToken,
      },
    });
  }

  @Post('club-login')
  @ApiOperation({ summary: 'Log in as a club' })
  @ApiResponse({ status: 200, description: 'Club logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request: Missing email or password' })
  @ApiBody({
    description: 'Login payload for clubs',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'club@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  async clublogin(
    @Res() res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const authenticationData = await this.authService.clubLogin(email, password);

    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      results: {
        publicUser: authenticationData.publicClub,
        accessToken: authenticationData.accessToken,
      },
    });
  }

  @Post('user-register')
  @ApiOperation({ summary: 'Register as a user' })
  @ApiResponse({ status: 200, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation error' })
  @ApiBody({ type: CreateUserDto, description: 'User registration payload' })
  async userRegister(
    @Res() res: Response,
    @Body() userData: CreateUserDto,
  ) {
    const authenticationData = await this.authService.userRegistration(userData);
    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      results: {
        publicUser: authenticationData.publicUser,
        accessToken: authenticationData.accessToken,
      },
    });
  }

  @Post('club-register')
  @ApiOperation({ summary: 'Register as a club' })
  @ApiResponse({ status: 200, description: 'Club registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation error' })
  @ApiBody({ type: CreateClubDto, description: 'Club registration payload' })
  async clubRegister(
    @Res() res: Response,
    @Body() userData: CreateClubDto,
  ) {
    const authenticationData = await this.authService.clubRegistration(userData);
    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      results: {
        publicClub: authenticationData.publicClub,
        accessToken: authenticationData.accessToken,
      },
    });
  }

  // Add similar Swagger decorators for other methods
}
