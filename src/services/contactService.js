import emailjs from '@emailjs/browser'

export const sendContactEmail = async (contactData) => {
  try {
    console.log('Contact Data:', contactData)
    
    const emailParams = {
      from_name: contactData.name,
      from_phone: contactData.phone,
      message: contactData.message,
      contact_date: new Date().toLocaleString()
    }

    console.log('Email Params:', emailParams)

    const response = await emailjs.send(
      'service_ytw912k',
      'template_l8yfxnt',
      emailParams,
      'cetg0UbfzEvTqXBs0'
    )

    console.log('EmailJS Response:', response)
    return response
  } catch (error) {
    console.error('Error sending contact email:', error)
    throw error
  }
}
