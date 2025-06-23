# 🧘‍♂️ Anandam Wellness

Anandam Wellness is a full-stack telemedicine and dermatology consultation platform that enables users to find doctors, chat with them in real-time, and conduct secure video consultations. The platform also supports profile verification by admins and allows doctors to manage their own information.

---

## 🔗 Live Demo

🌐 [Visit Live Site](https://your-deployment-url.com)

---

## 💬 How to Use the Platform

### ✅ Doctor Flow

1. Register/Login as a **Doctor**.
2. Fill in your **profile details** – including name, specialization, experience, photo, and availability.
3. Submit your profile for **admin verification**.
4. Once verified by the admin, your profile will be live on the platform.
5. Patients can now **book consultations** with you.
6. After payment, you’ll be able to:
   - **Chat** with the patient in real-time.
   - **Initiate or accept video calls**.
   - **Generate and send prescriptions**.

### 👤 Patient Flow

1. Register/Login as a **Patient**.
2. Browse the list of **verified doctors** by specialization, location, or name.
3. Choose a doctor and click **"Book Appointment"**.
4. Complete payment securely via **Razorpay**.
5. After payment, you'll be redirected to a **chat room** with the doctor.
6. You can:
   - **Chat** in real-time with the doctor.
   - **Join a video consultation** when the doctor initiates a call.
   - **Receive prescriptions or medical advice** in the chat.


---
## 📌 Features

- 🔐 **Authentication** with NextAuth (Doctors & Patients)
- 🧑‍⚕️ **Doctor Profile Management** with admin approval flow
- 💬 **Real-time Chat** using Socket.IO
- 🎥 **Video Calling** with WebRTC (SimplePeer)
- 📁 **Cloud Storage** for media (Cloudinary)
- 📋 **Prescription Upload** with screenshot-to-image capture
- 🔍 **Doctor Search & Filter** by expertise & location
- 💳 **Secure Payment** with Razorpay (Post-payment chat unlock)
- 📃 **Responsive UI** using Tailwind CSS
- 🌙 Always in **Dark Mode**

---

## 🛠️ Tech Stack

### Frontend:
- [Next.js (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO Client](https://socket.io/)
- [SimplePeer (WebRTC)](https://github.com/feross/simple-peer)
- [NextAuth](https://next-auth.js.org/)
- [Cloudinary](https://cloudinary.com/)

### Backend:
- [Node.js](https://nodejs.org/)
- [Express (Socket Server)](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Socket.IO Server](https://socket.io/)
- [Razorpay API](https://razorpay.com/)

---

## 🖥️ Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/anandam-wellness.git
cd anandam-wellness
```

## 2. Install All Dependencies
 
```bash
npm install
```

## 3. Create Environment Variables

```bash
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 4. Start the Development Server

```bash
npm run dev
```





## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
