# 🏠 Homzy — Full-Stack Property Listing Platform

## 🔹 Introduction
**Homzy** is a full-stack web application that allows users to list, browse, and manage properties. The platform provides authentication, image uploads, search filters, and real-time updates to create an interactive and seamless user experience.

---

## 🌐 Deployed Links

* Frontend: `https://sweet-meringue-710bd4.netlify.app`
* Backend: `https://homzy-backend.onrender.com/`

---

## 🚀 Features
- 📝 **Property Management:** Create, update, and delete property listings.  
- 🔍 **Browse Listings:** Users can browse homes, flats, and rental properties.  
- 📸 **Image Uploads:** Upload property images using Cloudinary.  
- 🔒 **Authentication:** Secure login/signup using JWT and bcrypt.js.  
- ⚡ **Responsive Design:** Works seamlessly on desktop and mobile devices.  
- 🔎 **Advanced Search:** Filter properties based on type, location, and price.  

---

## 🧭 Demo Flow
1. Sign up or log in.  
2. Browse or search for available properties.  
3. Create a new property listing with images.  
4. Edit or delete your own listings.  
5. Explore other listings and view property details.  

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-%23563d7c.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-%234682B3.svg?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-%2300ED64.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-FFDC00.svg?style=for-the-badge&logo=cloudinary&logoColor=black)

---

## ✅ Prerequisites
- Node.js ≥ 18 and npm ≥ 9  
- MongoDB instance (local or Atlas)  
- Cloudinary account for image uploads  
- `.env` file setup with keys:
  ```bash
  PORT=5000
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret



### Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start server
node index.js
# or with nodemon
nodemon index.js
```


### Frontend

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server (Vite default: http://localhost:5173)
npm run dev
```

---

## 👥 Contributors

* **Altamash Shaikh** — Creator & Maintainer
