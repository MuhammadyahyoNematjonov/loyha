import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { CourseLevel } from "@prisma/client"
import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export class PurchasedCourseAllDto {

    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    @ApiPropertyOptional({example:1,description:"page"})
    offset?:number

    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    @ApiPropertyOptional({example:10,description:"limit"})
    limit?:number

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({example:"Backend",description:"search"})
    search?:string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({example:1,description:"page"})
    category_id?:string


    
    @IsOptional()
    @IsEnum(CourseLevel)
    @ApiPropertyOptional({example:1,description:"level",enum:CourseLevel})
    level?:string

}


export class PurchasedOneDto {

    @IsNumber()
    @ApiProperty({example:"qwwwwwwwwwssdds",description:"id"})
    id:string
    
    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    @ApiPropertyOptional({example:1,description:"page"})
    offset?:number

    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    @ApiPropertyOptional({example:10,description:"limit"})
    limit?:number

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({example:"Backend",description:"search"})
    search?:string


}

export class PurchasedCoursePaymentDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"qqaqwswweew",description:"course_id"})
    course_id:string

    @ApiProperty({example:"+998903213435"})
    @IsString()
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone:string
}