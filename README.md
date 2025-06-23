# 🧘‍♂️ Anandam Wellness

Anandam Wellness is a full-stack telemedicine and dermatology consultation platform that enables users to find doctors, chat with them in real-time, and conduct secure video consultations. The platform also supports profile verification by admins and allows doctors to manage their own information.

---

## 🔗 Live Demo

🌐 [Visit Live Site](https://your-deployment-url.com)

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