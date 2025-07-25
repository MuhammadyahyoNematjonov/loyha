import { EverificationTypes } from "src/common/types/verification";

export function getMessages(type:EverificationTypes,otp:string){

    switch (type) {
        case EverificationTypes.REGISTER:
            return `Fixoo platformasida telefoningizni o'zgartirish uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
        case EverificationTypes.RESET_PASSWORD:
            return `Fixoo platformasida parolingizni tiklash uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
        case EverificationTypes.EDIT_PHONE:
            return `Fixoo platformasida telefoningizni o'zgartirish uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
    }

}