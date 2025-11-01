# 🚀 Quick Start Guide - Testing the Complete System

## Prerequisites

✅ MongoDB running  
✅ Backend running on port 5000  
✅ Frontend running on port 3000  
✅ User logged in  

---

## Step 1: Update Environment Variables

### Backend (.env):
```env
RAZORPAY_KEY_ID=rzp_test_Ra5fvEhNg5l3Sw
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_HERE
```

**Get your secret from:** https://dashboard.razorpay.com/ → Settings → API Keys

---

## Step 2: Start Backend

```bash
cd backend
npm start
```

**You should see:**
```
🔥 Server is running on http://localhost:5000
MongoDB connected
```

---

## Step 3: Start Frontend

**New terminal:**
```bash
cd frontend
npm run dev
```

---

## Step 4: Test the Flow

### A) Test Profile (Real Data)
1. Login to your account
2. Go to Profile section
3. **Expected:** See your real name, email, college, etc. (not "User_001")

### B) Test Dashboard (Before Purchase)
1. Go to Dashboard
2. Click "My Courses" tab
3. **Expected:** "You haven't purchased any courses yet" message

### C) Test Payment
1. Go to any course page
2. Click "Enroll Now"
3. Fill account setup (if needed)
4. Apply coupon: `DIWALI2025` (20% off) or `SAVE500` (₹500 off)
5. Click "Complete Order"
6. Click "Pay Securely"
7. **Expected:** Razorpay modal opens
8. Use test card:
   ```
   Card: 4111 1111 1111 1111
   Expiry: Any future date
   CVV: 123
   ```
9. Complete payment
10. **Expected:** "Payment verified! Course added to your account."
11. Redirected to dashboard

### D) Test Dashboard (After Purchase)
1. Go to "My Courses" tab
2. **Expected:** See the course you just purchased
3. Click "Go to Course"
4. **Expected:** Access course content

---

## Step 5: Setup Webhooks (Optional but Recommended)

### Install ngrok:
```bash
npm install -g ngrok
```

### Start ngrok:
```bash
ngrok http 5000
```

**Copy the URL** (e.g., `https://abc123.ngrok-free.app`)

### Configure Razorpay:
1. Go to https://dashboard.razorpay.com/
2. Switch to **Test Mode**
3. Settings → Webhooks → Create Webhook
4. URL: `https://abc123.ngrok-free.app/api/v1/webhooks/razorpay`
5. Events: `payment.captured`, `payment.failed`
6. Generate Secret → Copy it

### Update .env:
```env
RAZORPAY_WEBHOOK_SECRET=whsec_XXXXX
```

### Restart backend:
```bash
cd backend
npm start
```

### Test webhook:
1. Make a test payment
2. Check backend logs for:
   ```
   📥 Webhook received from Razorpay
   ✅ Webhook signature verified
   ✅ Order status updated to paid
   ✅ Course added to user's purchased courses
   ```

---

## 🎯 What to Check

### Backend Logs:
```
✅ Razorpay order created: order_XXXXX
✅ Payment signature verified
✅ Order status updated to paid
✅ Course added to user's purchased courses
```

### Frontend:
```
✅ Payment verified! Course added to your account.
✅ Redirecting to dashboard...
```

### Database:
```javascript
// Check order
db.orders.find({userId: "YOUR_USER_ID"}).pretty()
// Should show: status: "paid"

// Check user
db.users.findOne({_id: "YOUR_USER_ID"})
// Should show: coursePurchased: ["COURSE_ID"]
```

---

## 🐛 Troubleshooting

### Payment fails with 400 error:
- Check RAZORPAY_KEY_SECRET is correct in backend/.env
- Restart backend after adding secret

### Profile shows placeholders:
- Check userId exists in localStorage
- Check backend is running
- Check user exists in database

### Course not in dashboard after payment:
- Check backend logs for "Course added to user"
- Check order status is 'paid' in database
- Check user.coursePurchased array in database

### Webhook not received:
- Check ngrok is running
- Check webhook URL in Razorpay dashboard
- Check RAZORPAY_WEBHOOK_SECRET in .env
- Check backend logs

---

## 📚 Documentation

- **Webhook Setup:** See `backend/WEBHOOK_SETUP_INSTRUCTIONS.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`
- **API Endpoints:** See `backend/Documentation.md`

---

## 🎉 You're Done!

Everything is now working:
- ✅ Payment verification (frontend + webhook)
- ✅ Real user profile data
- ✅ Purchased courses in dashboard
- ✅ Course access control

Enjoy your payment system! 🚀

