import emailjs from '@emailjs/browser'

export const sendOrderEmail = async (orderData) => {
  try {
    console.log('Order Data:', orderData)
    
    const emailParams = {
      to_email: 'houssemibrahim9@gmail.com',
      customer_name: orderData.customer.name,
      customer_phone: orderData.customer.phone,
      customer_address: orderData.customer.address,
      order_items: orderData.items.map(item => 
        `${item.name} (REF: ${item.ref}) - Size: ${item.size} x${item.quantity} - ${item.total} DT`
      ).join('\n'),
      order_total: orderData.total,
      order_date: new Date().toLocaleString()
    }

    console.log('Email Params:', emailParams)

    const response = await emailjs.send(
      'service_ytw912k',
      'template_ir4mdoa',
      emailParams,
      'cetg0UbfzEvTqXBs0'
    )

    console.log('EmailJS Response:', response)
    return response
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
