# Building Bharat

A modern web application built with Next.js frontend and express.js backend, featuring a beautiful homepage with animated hero sections.



## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git**

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd building_bharat
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
cd frontend
npm install
```

#### Backend Dependencies
```bash
cd ../backend
npm install
```

### 3. Run the Application

#### Start the Backend Server
```bash
# From the backend directory
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

#### Start the Frontend Development Server
```bash
# From the frontend directory (in a new terminal)
cd frontend
npm run dev
```
The frontend will start on `http://localhost:3000`

## Development

### Frontend (Next.js)

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v3
- **Components**: shadcn/ui components
- **Animations**: Framer Motion
- **Language**: TypeScript

#### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend (Node.js)

- **Runtime**: Node.js
- **Server**: Express.js
- **Package Manager**: npm

#### Available Scripts
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
```

## 🌐 Environment Variables

### Frontend
No environment variables are required for basic functionality.

### Backend
Create a `.env` file in the backend directory if needed:
```env
PORT=5000
NODE_ENV=development
```

## Features

- **Cross-Platform Design** – Works seamlessly on **web and mobile browsers**
- **Responsive Layout** – Optimized for all screen sizes, from **phones to desktops**
- **Modern UI/UX** – Clean, professional interface across devices
- **Smooth Animations** – Web-based animations *(Framer Motion / CSS / Web Animations API)* optimized for mobile performance
- **TypeScript** – Type-safe development across the project
- **Tailwind CSS** – Utility-first styling for consistent design across platforms

## 📚 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **nodemon** - Development server

## 🤝 Contributing

1. Fork the repository
2. work on dev branch: `git checkout dev`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin dev`
6. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Coding! 🚀**
