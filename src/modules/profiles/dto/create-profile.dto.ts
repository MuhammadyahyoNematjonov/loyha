import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator"

export class ProfileUpdateDto {
    
    @IsOptional()
    @ApiPropertyOptional({example:"Nematjonov Muhammadyahyo"})
    @IsString()
    fullName?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({example:"Nematjonov Muhammadyahyo"})
    image?:string


}

export class PhoneUpdateDto {
  
    @ApiProperty({ example: "123456", description: "SMS orqali yuborilgan OTP kodi" })
    @IsNotEmpty()
    @IsString()
    otp: string;
  
    @ApiProperty({ example: "+998883730331", description: "Yangi telefon raqami" })
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone: string;
  }



  export class LastActivityDto {
    @ApiProperty()
    @IsString()
    url: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    courseId: string;
  
    @ApiProperty()
    @IsUUID()
    lessonId: string;
  
    @ApiProperty()
    @IsUUID()
    groupId: string;
  }


  export class UpdatePasswordDto {
    @ApiProperty()
    @IsString()
    oldPassword: string;
  
    @ApiProperty()
    @IsString()
    newPassword: string;
  }
  