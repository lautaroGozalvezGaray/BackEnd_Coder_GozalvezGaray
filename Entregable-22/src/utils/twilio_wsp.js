const twilio = require('twilio')

require('dotenv').config()

const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_TOKEN = process.env.TWILIO_TOKEN

const client = twilio(TWILIO_SID, TWILIO_TOKEN)

export const sendWhatsApp = async (user, prods, total, phone) => {
    const options = {
        body: `${user},.\n Productos: ${prods}\n Total: $${total}`,
        //mediaUrl: ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${phone}`
    }

    try {
        const message = await client.messages.create(options)
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}