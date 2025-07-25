import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { SMSSendResponce } from "../types/sms.send.status";
const dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class SmsService{

private readonly TOKEN = process.env.SMS_TOKEN
private readonly $from = process.env.SMS_FROM
private readonly URL = process.env.SMS_URL
private readonly USERNAME = process.env.SMS_USERNAME
private readonly CALLBACK_URL= process.env.SMS_CALLBACK_URL

private $axios = axios.create({
    baseURL:this.URL
})

public async sendSms(message:string,to:string){
    try {
        console.log("ss");
        console.log(this.TOKEN,this.USERNAME);

        
        const {data} = await this.$axios.post<{data:{token:string}}>('/auth/login',
        {
            email:this.USERNAME,
            password:this.TOKEN
        },
        

        )
        
        console.log(data);
        
        await this.$axios.post<SMSSendResponce>('/message/sms/send',
            {
                from:this.$from,
                message,
                mobile_phone:to.replace(/[\\s+]/g,''),
                callback_url:this.CALLBACK_URL
            },

            {

                headers:{
                    Authorization:'Bearer ' + data.data.token
                }
            }

        )
        return true

    } catch (error) {
        console.log(error.message);
        
        throw new HttpException("SMS Service: " + error.response.statusText,error.response.status || HttpStatus.BAD_REQUEST)
    }
}

}