import { SafeString } from "handlebars";

export interface SMSPayload {
    mobile_phone:string;
    message:string;
    from:string
    callback_url:string
}

export interface SMSSendResponce{
    id:string;
    status:string;
    message:string
}