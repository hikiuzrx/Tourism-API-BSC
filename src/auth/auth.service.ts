import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AgenceService } from 'src/agence/agence.service';
import { AubergeService } from 'src/auberge/auberge.service';
import { ClubService } from 'src/club/club.service';
import { UserService } from 'src/user/user.service';
import { User, Agence, Auberge, Club, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'

type UserPayload = {
  id: number;
  role: 'user';
};

type ClubPayload = {
  id: number;
  role: 'club';
};

type AubergePayload = {
  id: number;
  role: 'auberge';
};

type AgencePayload = {
  id: number;
  role: 'agence';
};
type publicUser = Omit<User,'password'>
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly clubService: ClubService,
    private readonly agenceService: AgenceService,
    private readonly aubergeService: AubergeService,
  ) {}

  // Placeholder for user registration logic
  async userRegistration(userData:Prisma.UserCreateInput) {
    const user:User = await this.userService.registerUser(userData)
    const payload :UserPayload = {id:user.userId,role:'user'}
    const {accessToken,refreshToken} = await this.generateTokens(payload)
    const {password,...publicUser} = user
    return {publicUser,refreshToken,accessToken}
  }
  async clubRegistration(clubData:Prisma.ClubCreateInput){
    const club:Club = await this.clubService.create(clubData)
    const payload :ClubPayload = {id:club.clubId,role:'club'}
    const {accessToken,refreshToken} = await this.generateTokens(payload)
    const {password,...publicClub} = club
    return {publicClub,refreshToken,accessToken}
  }
  async aubergeRegistration(clubData:Prisma.AubergeCreateInput){
    const auberge:Auberge = await this.aubergeService.create(clubData)
    const payload :AubergePayload = {id:auberge.aubergeId,role:'auberge'}
    const {accessToken,refreshToken} = await this.generateTokens(payload)
    const {password,...publicAuberge} = auberge
    return {publicAuberge,refreshToken,accessToken}
  }
  async agenceRegistration(agenceData:Prisma.AgenceCreateInput){
    const agence:Agence = await this.agenceService.create(agenceData)
    const payload :AgencePayload = {id:agence.agenceId,role:'agence'}
    const {accessToken,refreshToken} = await this.generateTokens(payload)
    const {password,...publicAgence} = agence
    return {publicAgence,refreshToken,accessToken}
  }
  async userLogin(email:string,pass:string){
    const user:User = await this.userService.retrieveUserByEmail(email)
    if(!user){
      throw new NotFoundException('no user with this email')
    }
    const auth = await this.userService.comparePassword(user,pass)
    if(!auth){
      throw new UnauthorizedException('wrong password')
    }
    const payload:UserPayload ={id:user.userId,role:'user'}
    const {accessToken,refreshToken } = await this.generateTokens(payload)
    const {password,...publicUser} = user
    return {publicUser,accessToken,refreshToken}
  }

  async clubLogin(email:string,pass:string){
    const club:Club = await this.clubService.retrieveUserByEmail(email)
    if(!club){
      throw new NotFoundException('no club with this email')
    }
    const auth = await this.clubService.comparePassword(club,pass)
    if(!auth){
      throw new UnauthorizedException('wrong password')
    }
    const payload:ClubPayload ={id:club.clubId,role:'club'}
    const {accessToken,refreshToken } = await this.generateTokens(payload)
    const {password,...publicClub} = club
    return {publicClub,accessToken,refreshToken}

  }
   
  async aubergeLogin(email: string, pass: string) {
    const auberge: Auberge = await this.aubergeService.retrieveUserByEmail(email);
    
    if (!auberge) {
      throw new NotFoundException('No user found with this email');
    }
    
    const isPasswordValid = await bcrypt.compare(pass, auberge.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload: AubergePayload = { id: auberge.aubergeId, role: 'auberge' };
  
    const tokens = await this.generateTokens(payload);
  
    // Ensure tokens are returned
    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      throw new InternalServerErrorException('Token generation failed');
    }
  
    const { accessToken, refreshToken } = tokens;
    
    // Exclude password from the returned auberge data
    const { password, ...publicAuberge } = auberge;
  
    return { publicAuberge, accessToken, refreshToken };
  }
  
  
 async AgenceLogin(email:string,pass:string){
    const agence:Agence = await this.agenceService.retrieveUserByEmail(email)
    if(!agence){
      throw new NotFoundException('no agence with this email')
    }
    const auth = await this.agenceService.comparePassword(agence,pass)
    if(!auth){
      throw new UnauthorizedException('wrong password here')
    }
    const payload:AgencePayload ={id:agence.agenceId,role:'agence'}
    const {accessToken,refreshToken } = await this.generateTokens(payload)
    const {password,...publicAgence} = agence
    return {publicAgence,accessToken,refreshToken}
  }

  async generateTokens<T extends { id: number; role: string }>(user: T) {
    let payload: UserPayload | ClubPayload | AgencePayload | AubergePayload;

    // Build payload based on user role
    switch (user.role) {
      case 'user':
        payload = { id: user.id, role: 'user' };
        break;
      case 'club':
        payload = { id: user.id, role: 'club' };
        break;
      case 'auberge':
        payload = { id: user.id, role: 'auberge' };
        break;
      case 'agence':
        payload = { id: user.id, role: 'agence' };
        break;
      default:
        throw new Error(`Invalid user role: ${user.role}`);
    }

    // Generate Access Token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m', // Short expiry for access token
    });

    // Generate Refresh Token
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // Longer expiry for refresh token
    });

    return { accessToken, refreshToken };
  }

  /**
   * Validate Access Token
   */
  async validateAccessToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  /**
   * Validate Refresh Token
   */
  async validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}