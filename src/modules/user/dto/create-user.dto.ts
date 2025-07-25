import {ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class MentorsAllDto{

    @ApiPropertyOptional({example:"1",description:"nechinchi page ga o'tish"})
    @IsOptional()
    @Type(()=> Number)
    offset?:number

    
    @ApiPropertyOptional({example:"10",description:"nechta mentor chiqarish"})
    @IsOptional()
    @Type(() =>Number)
    limit?:number

    
    @ApiPropertyOptional({example:"about",description:"qidirish uchun"})
    @IsOptional()
    @IsString()
    search?:string

    
    @ApiPropertyOptional({example:"+998903641207",description:"telefon nomer"})
    @IsOptional()
    @IsString()
    phone?:String

    @ApiPropertyOptional({example:"Faxriddin Asqaraliyev",description:"ism familiya kirish"})
    @IsOptional()
    @IsString()
    fullName?:string

}






export class UsersAllDto{

    @ApiPropertyOptional({example:"1",description:"nechinchi page ga o'tish"})
    @IsOptional()
    @Type(()=> Number)
    offset?:number

    
    @ApiPropertyOptional({example:"10",description:"nechta mentor chiqarish"})
    @IsOptional()
    @Type(() =>Number)
    limit?:number

    
    @ApiPropertyOptional({example:"about",description:"qidirish uchun"})
    @IsOptional()
    @IsString()
    search?:string

    
    @ApiPropertyOptional({example:"+998903641207",description:"telefon nomer"})
    @IsOptional()
    @IsString()
    phone?:String

    @ApiPropertyOptional({example:"Faxriddin Asqaraliyev",description:"ism familiya kirish"})
    @IsOptional()
    @IsString()
    fullName?:string

}


