import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy {

private loger = new Logger("Database")

    onModuleInit() {
        
        try {
            this.$connect()
            this.loger.log("Database connect...")
        } catch (error) {
            this.loger.log("Database disconnect")
            console.log(error.message);
            process.exit(1)
            
        }
    }

    onModuleDestroy() {
        
        try {
            this.loger.log("Database disconnect")
            process.exit(1)
        } catch (error) {
            this.loger.log("Database disconnect")
            console.log(error.message);
            process.exit(1)
        }
    }
}
