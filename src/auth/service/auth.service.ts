import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result; // Return user data without password
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id, role: user.role }; // Create JWT payload
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }), // Sign and return JWT
    };
  }
}
