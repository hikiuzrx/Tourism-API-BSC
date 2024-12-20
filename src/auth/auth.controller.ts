
import { Controller, Post, Body, Res, InternalServerErrorException, BadRequestException} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAgenceDto } from 'src/agence/dto/create-agence.dto';
import { CreateAubergeDto } from 'src/auberge/auberge-dto.dto/auberge-creation.dto';
import { CreateClubDto } from './create-club.dto';
import { CreateUserDto } from './create-user.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user-login')
  @ApiOperation({ summary: 'The login logic' })
  @ApiResponse({ status: 200, description: 'user logged in successfully' })
  async login(
    @Res() res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const { email, password } = body;
    if(!email ||!password){
     throw new BadRequestException('email is required')
    }
    const authenticationData = await this.authService.userLogin(
      email,
      password,
    );

    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const results = {
     publicUser:authenticationData.publicUser,
     accessToken: authenticationData.accessToken,
    };
    res.json({results}) ;
  }
  @Post('club-login')
  @ApiOperation({ summary: 'The login logic' })
  @ApiResponse({ status: 200, description: 'user logged in successfully' })
  async clublogin(
    @Res() res: Response,
    @Body() body: { email: string; password: string },
  ) {


    const { email, password } = body;
    if(!email ||!password){
     throw new BadRequestException('email is required')
    }
    const authenticationData = await this.authService.clubLogin(
      email,
      password,
    );

    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const results = {
     publicUser:authenticationData.publicClub,
     accessToken: authenticationData.accessToken,
    };
    res.json({results});
  }
  @Post('agence-login')
  @ApiOperation({ summary: 'The login logic' })
  @ApiResponse({ status: 200, description: 'user logged in successfully' })
  async agencelogin(
    @Res() res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const { email, password } = body;
    if(!email ||!password){
     throw new BadRequestException('email is required')
    }
    const authenticationData = await this.authService.AgenceLogin(
      email,
      password,
    );

    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const results = {
     publicUser:authenticationData.publicAgence,
     accessToken: authenticationData.accessToken,
    };
    res.json({results}) 
  }
  @Post('auberge-login')
  @ApiOperation({ summary: 'The login logic' })
  @ApiResponse({ status: 200, description: 'user logged in successfully' })
  async aubergelogin(
    @Res() res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const { email, password } = body;
    if(!email ||!password){
     throw new BadRequestException('email is required')
    }
    const authenticationData = await this.authService.aubergeLogin(
      email,
      password,
    );

    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const results = {
     publicUser:authenticationData.publicAuberge,
     accessToken: authenticationData.accessToken,
    };
     res.json({results});
  }



  @Post('user-register')
  @ApiOperation({ summary: 'The sign-up logic' })
  @ApiResponse({ status: 200, description: 'user signed up successfully' })
  async userRegister(
    @Res() res: Response,
    @Body() userData: CreateUserDto,
  ) {
    const authenticationData = await this.authService.userRegistration(userData);
    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const results = {
      publicUser:authenticationData.publicUser,
      accessToken: authenticationData.accessToken,
    };
    res.json({results});
  }
  @Post('club-register')
  @ApiOperation({ summary: 'The sign-up logic' })
  @ApiResponse({ status: 200, description: 'user signed up successfully' })
  async clubRegister(
    @Res() res: Response,
    @Body() userData:CreateClubDto,
  ) {
    const authenticationData = await this.authService.clubRegistration(userData);
    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const results = {
      publicClub:authenticationData.publicClub,
      accessToken: authenticationData.accessToken,
    };
    res.json({results});
  }
  @Post('auberge-register')
  @ApiOperation({ summary: 'The sign-up logic' })
  @ApiResponse({ status: 200, description: 'user signed up successfully' })
  async aubergeRegister(
    @Res() res: Response,
    @Body() userData: CreateAubergeDto,
  ) {
    const authenticationData = await this.authService.aubergeRegistration(userData);
    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const results = {
      publicClub:authenticationData.publicAuberge,
      accessToken: authenticationData.accessToken,
    };
     res.json({results}) ;
  }
  @Post('agence-register')
  @ApiOperation({ summary: 'The sign-up logic' })
  @ApiResponse({ status: 200, description: 'user signed up successfully' })
  async agenceRegister(
    @Res() res: Response,
    @Body() userData:CreateAgenceDto,
  ) {
    const authenticationData = await this.authService.agenceRegistration(userData);
    res.cookie('refreshToken', authenticationData.refreshToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Use HTTPS (set to `false` for local dev)
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const results = {
      publicClub:authenticationData.publicAgence,
      accessToken: authenticationData.accessToken,
    };
    res.json({results});
  }
}