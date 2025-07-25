import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Yaroqli JWT refresh token',
  })
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
