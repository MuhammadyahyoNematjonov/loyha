import {JwtSignOptions } from "@nestjs/jwt";
import dotenv from "dotenv/config"


export const JwtAccesToken:JwtSignOptions = {
    secret:process.env.Jwt_Acc,
    expiresIn:process.env.Jwt_Acc_in
}

export const JwtRefreshToken:JwtSignOptions = {
    secret:process.env.Jwt_Ref,
    expiresIn:process.env.Jwt_Ref_in
}


