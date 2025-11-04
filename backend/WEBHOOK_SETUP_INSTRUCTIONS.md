# 🔔 Razorpay Webhook Setup Instructions

## Overview
Webhooks ensure payment confirmation even if the user closes their browser. You have **TWO methods** of payment verification working together:

1. **Frontend Callback** - Immediate verification when payment succeeds
2. **Webhooks** - Backup verification (handles edge cases)

---

## 📋 Prerequisites

Before setting up webhooks, make sure you have:

✅ Valid Razorpay Test/Live credentials in `backend/.env`:
```env
RAZORPAY_KEY_ID=rzp_test_XXXXX
RAZORPAY_KEY_SECRET=your_key_secret
```

✅ Backend server running on `localhost:5000`

---

## 🚀 Method 1: Using ngrok (Recommended for Testing)

### Step 1: Install ngrok

**Option A: Download from website**
1. Go to https://ngrok.com/download
2. Download for Windows
3. Extract the ZIP file
4. Move `ngrok.exe` to a folder (e.g., `C:\ngrok\`)

**Option B: Install via npm**
```bash
npm install -g ngrok
```

### Step 2: Start Your Backend Server

Open PowerShell/Command Prompt:
```bash
cd E:\PRATIK\building_bharat_internship\new\building_bharat\backend
npm start
```

Keep this terminal running.

### Step 3: Start ngrok Tunnel

Open a **NEW** PowerShell/Command Prompt:
```bash
ngrok http 5000
```

You'll see output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:5000
```

**IMPORTANT:** Copy the `https://abc123.ngrok-free.app` URL (yours will be different)

### Step 4: Configure Razorpay Dashboard

1. Go to https://dashboard.razorpay.com/
2. **Switch to Test Mode** (toggle at top-left)
3. Go to **Settings** → **Webhooks**
4. Click **"+ New Webhook"** or **"Create Webhook"**

Fill in these details:

**Webhook URL:**
```
https://abc123.ngrok-free.app/api/v1/webhooks/razorpay
```
(Replace `abc123.ngrok-free.app` with YOUR ngrok URL)

**Active Events:** Select these events:
- ✅ `payment.captured`
- ✅ `payment.failed`

**Secret:** 
- Click **"Generate Secret"**
- Copy the secret (it looks like: `whsec_XXXXXXXXXXX`)

Click **"Create Webhook"**

### Step 5: Add Webhook Secret to .env

Edit `backend/.env` and add:
```env
RAZORPAY_WEBHOOK_SECRET=whsec_XXXXXXXXXXX
```
(Use the secret you copied from Razorpay)

### Step 6: Restart Backend

Stop the backend server (Ctrl+C) and restart:
```bash
npm start
```

### Step 7: Test the Webhook

1. Make a test payment on your frontend
2. Check backend logs for:
   ```
   📥 Webhook received from Razorpay
   ✅ Webhook signature verified
   ✅ Order status updated to paid
   ✅ Course added to user's purchased courses
   ```

3. Check Razorpay Dashboard:
   - Settings → Webhooks → Your webhook
   - Click on it to see delivery logs

---

## 🔄 Method 2: Using Razorpay CLI (Alternative)

```bash
# Install
npm install -g razorpay-cli

# Start webhook forwarding
razorpay webhooks listen --port 5000 --path /api/v1/webhooks/razorpay
```

Then follow Steps 4-7 from Method 1.

---

## 🏭 Production Setup (When Deploying)

### For Heroku/Vercel/AWS:

1. Deploy your backend to production
2. Get your production URL (e.g., `https://api.buildingbharat.com`)
3. Go to Razorpay Dashboard → **Switch to Live Mode**
4. Settings → Webhooks → Create New Webhook
5. Webhook URL: `https://api.buildingbharat.com/api/v1/webhooks/razorpay`
6. Generate Live Secret and add to production `.env`
7. Restart production server

---

## ✅ Verification Checklist

Test both payment flows:

### Test 1: Normal Flow (Frontend Callback)
1. ✅ User completes payment
2. ✅ Razorpay modal closes
3. ✅ Frontend calls `/verify-payment`
4. ✅ Order status changes to 'paid'
5. ✅ Course added to user
6. ✅ User redirected to dashboard

### Test 2: Webhook Flow (Backup)
1. ✅ Simulate payment (use Razorpay test cards)
2. ✅ Check backend logs for webhook receipt
3. ✅ Verify order status updated
4. ✅ Verify course added to user

---

## 🐛 Troubleshooting

### Issue: "Invalid signature" in webhook logs

**Solution:**
- Check that `RAZORPAY_WEBHOOK_SECRET` in `.env` matches Razorpay Dashboard
- Restart backend server after adding secret

### Issue: Webhook not received

**Solution:**
- Check ngrok is running: `ngrok http 5000`
- Check ngrok URL is correct in Razorpay Dashboard
- Check backend route is `/api/v1/webhooks/razorpay`
- Check firewall isn't blocking ngrok

### Issue: ngrok URL changes on restart

**Solution:**
- Free ngrok gives random URLs
- Either update Razorpay webhook URL each time
- Or upgrade to ngrok paid plan for static URLs

### Issue: Payment succeeds but course not added

**Solution:**
- Check both backend logs and Razorpay webhook logs
- Verify `coursePurchased` field exists in User model
- Check User ID is valid in order

---

## 📊 Webhook Payload Example

When Razorpay sends a webhook, it looks like this:

```json
{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_XXXXX",
        "order_id": "order_XXXXX",
        "amount": 559900,
        "currency": "INR",
        "status": "captured",
        "method": "card"
      }
    }
  }
}
```

Your backend at `/api/v1/webhooks/razorpay`:
1. Verifies the signature
2. Extracts order_id
3. Updates order status to 'paid'
4. Adds course to user

---

## 🎯 Summary

**For Development (Localhost):**
- Use ngrok to expose localhost
- Test Mode keys
- Free ngrok with changing URLs

**For Production:**
- Use actual domain (HTTPS required)
- Live Mode keys  
- Static webhook URL

**Both environments need:**
- ✅ RAZORPAY_KEY_ID
- ✅ RAZORPAY_KEY_SECRET  
- ✅ RAZORPAY_WEBHOOK_SECRET

---

## 📞 Need Help?

If webhooks aren't working:
1. Check backend logs: `cd backend && npm start`
2. Check ngrok logs in its terminal
3. Check Razorpay Dashboard → Webhooks → Logs
4. Frontend callback STILL works even if webhook fails!

---

**You're all set! 🎉**

The payment system now has:
- ✅ Frontend verification (primary)
- ✅ Webhook verification (backup)  
- ✅ Course access control
- ✅ Order tracking

