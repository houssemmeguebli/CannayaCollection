# EmailJS Setup Instructions

## You need to configure EmailJS with your credentials

### Step 1: Get Your EmailJS Credentials

1. Go to https://www.emailjs.com/
2. Login to your account
3. Get these values:
   - Service ID: `service_ytw912k` (you already have this)
   - Template ID: Create a new template
   - Public Key: Found in Account > API Keys

### Step 2: Create Email Template

1. Go to Email Templates in EmailJS dashboard
2. Click "Create New Template"
3. Use these template variables:

```
Subject: New Order from {{customer_name}}

Order Details:
--------------
Date: {{order_date}}

Customer Information:
Name: {{customer_name}}
Phone: {{customer_phone}}
Address: {{customer_address}}

Order Items:
{{order_items}}

Total: {{order_total}} DT
```

4. Copy the Template ID

### Step 3: Update the Code

Open `src/services/emailService.js` and replace:

```javascript
'YOUR_TEMPLATE_ID' → Your actual template ID
'YOUR_PUBLIC_KEY' → Your actual public key
'your-email@example.com' → Your email address
```

### Step 4: Test

1. Add items to cart
2. Fill checkout form
3. Click "Place Order"
4. Check your email inbox

That's it! Orders will now be sent to your email automatically.
