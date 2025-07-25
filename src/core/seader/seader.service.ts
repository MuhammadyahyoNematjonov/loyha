import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from "bcrypt"

@Injectable()
export class SeaderService implements OnModuleInit {

    private loger = new Logger("Seader")

    constructor(private prisma:PrismaService){}


    async onModuleInit() {
                 
        await this.CreateSuperadmin()
    }

    async CreateSuperadmin() {
      let password = await bcrypt.hash("12345678",10)
        await this.prisma.users.createMany({
          data: [
            {
              fullName: 'Ali Valiyev',
              password,
              phone: '+998900000000',
              role: UserRole.STUDENT,
              image: 'default.png',
            },
            {
              fullName: 'Faxriddin Asqaraliyev',
              password,
              phone: '+998903641207',
              role: UserRole.ADMIN,
              image: 'default.png',
            },
           
          ],
          skipDuplicates: true,
        });
       
        this.loger.log("Admin va User yaratildi.")
      }
}
