
export function generateOtp() {

    return String(Math.floor(10000 + Math.random() * 90000))
}