# 🧘‍♂️ Anandam Wellness

Anandam Wellness is a full-stack telemedicine and dermatology consultation platform that enables users to find doctors, chat with them in real-time, and conduct secure video consultations. The platform also supports profile verification by admins and allows doctors to manage their own information.

---

## 🔗 Live Demo

🌐 [Visit Live Site](https://your-deployment-url.com)

---

## 💬 How to Use the Platform

This platform connects patients with verified doctors for real-time consultations via **chat** and **video call**. It also includes **Razorpay** payment integration and prescription sharing.

> ⚡ **Note:** The real-time chat and video functionality is powered by a separate **dedicated Socket.IO server**, which is hosted independently and maintained in [this separate GitHub repository](https://github.com/your-username/anandam-socket-server).

---

### 👨‍⚕️ Doctor Flow

1. Register or Login as a **Doctor**.
2. Complete your **Doctor Profile** by filling in:
   - Full name
   - Specialization
   - Years of experience
   - Consultation fee
   - Profile photo
3. Click **"Save"** – your profile will be submitted to the **Admin** for verification.
4. After admin approval, your profile becomes **visible to patients**.
5. When a patient books a consultation:
   - You'll be notified.
   - You can open the **chat page** and begin consultation.
   - Optionally, you can start a **video call** directly from the chat.
6. After diagnosis, you can fill out a **prescription form** which generates a downloadable prescription image.

---

### 🧑‍💻 Patient Flow

1. Register or Login as a **Patient**.
2. Explore available doctors using filters for:
   - **Expertise**
   - **Location**
   - **Name Search**
3. Click on a doctor to view their profile and click **"Book Appointment"**.
4. Complete the **secure payment** via Razorpay.
5. You are redirected to the **chat page** with the selected doctor.
6. From the chat page, you can:
   - Exchange text messages.
   - View and download **prescriptions**.
   - Join a **video consultation** when prompted.

---

### 🧠 Behind the Scenes

- The platform uses **WebSockets** (Socket.IO) for real-time chat & video calls.
- A separate backend socket server handles all socket communication:
  - **Join rooms**
  - **Exchange messages**
  - **Video call signaling**
- Socket server repo: [👉 View Socket Server Code](https://github.com/your-username/anandam-socket-server)
- Backend built with:
  - **MongoDB**
  - **Express**
  - **Next.js App Router**
  - **Tailwind CSS** for frontend styling
  - **Cloudinary** for image uploads



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
