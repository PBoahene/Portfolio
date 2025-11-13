# Boahene Prince - Portfolio

A modern, fully responsive personal portfolio website showcasing web development and cybersecurity expertise. This is a school project for **MULTIMEDIA AND WEB DESIGN** course. University Of Ghana. Department of Computer Science

## 🎯 Project Overview

This portfolio demonstrates proficiency in:
- Modern web development technologies
- Responsive design principles
- Server-side functionality with serverless architecture
- Email integration and form handling
- Production deployment and optimization

## 🛠️ Tech Stack

### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **HTML5** - Semantic markup and accessibility
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **CSS3** - Modern styling with Grid and Flexbox
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **Vanilla JavaScript** - Interactive functionality
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) **Vite** - Build tool for development and production

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) **Node.js Serverless Functions** - Contact form handling
- ![Nodemailer](https://img.shields.io/badge/Nodemailer-0F1419?style=for-the-badge&logo=nodemailer&logoColor=white) **Nodemailer** - Email delivery via Gmail SMTP
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) **Vercel** - Hosting and serverless function deployment

## 📁 Project Structure

```
portfolio/
├── api/                 # Serverless functions for contact form
│   └── sendEmail-smtp.js    # Gmail SMTP email handler
├── assets/             # Static assets
│   └── images/             # Project images and icons
├── index.html          # Main portfolio page
├── style.css           # Development styles
├── style.min.css       # Production minified styles
├── script.js           # Development JavaScript
├── script.min.js       # Production minified JavaScript
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## 🚀 Features

- **Responsive Design** - Optimized for all device sizes
- **Modern UI/UX** - Clean, professional interface
- **Dark/Light Mode** - Toggle between dark and light themes
- **Contact Form** - Functional email integration with Gmail SMTP
- **Performance Optimized** - Minified assets for production
- **Accessible** - Semantic HTML and ARIA attributes
- **SEO Ready** - Meta tags and structured content

## ⚡ Quick Start

### Development
```bash
npm install
npm run dev
```
Visit `http://localhost:5173` to view the development server.

### Build for Production
```bash
npm run build
```
Generates optimized files in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

## 🌐 Live Demo

**Portfolio URL:** [https://portfolio-git-main-boahene-princes-projects.vercel.app](https://portfolio-git-main-boahene-princes-projects.vercel.app/)


```

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App Passwords
3. Use the 16-character app password in `SMTP_PASS`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel Dashboard
3. Deploy automatically on every push to main branch

### Environment Variables in Vercel
- Go to Project → Settings → Environment Variables
- Add the SMTP configuration variables listed above
- Select Production, Preview, and Development environments

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

## 🎨 Color Scheme

- **Primary:** `#2563eb` (Blue)
- **Secondary:** `#1e293b` (Dark Slate)
- **Accent:** `#f59e0b` (Amber)
- **Text:** `#0f172a` (Near Black)
- **Background:** `#ffffff` (White)

## 📝 School Project Details

- **Institution:** University of Ghana
- **Department:** Computer Science
- **Course:** Multimedia and Web Design
- **Student:** Boahene Prince
- **Focus Areas:** 
  - Responsive Web Design
  - Modern JavaScript Development
  - Serverless Architecture
  - Email Integration
  - Production Deployment
  - UI/UX Design with Dark Mode

## 🔧 Development Notes

- Uses Vite for fast development and optimized builds
- Implements modern CSS Grid and Flexbox layouts
- Vanilla JavaScript for lightweight functionality
- Serverless functions for backend functionality
- Gmail SMTP integration for contact form

## 📄 License

This project is for educational purposes as part of a Multimedia and Web Design course.

## 🤝 Contact

- **Outlook-Mail:** PBoahene007@st.ug.edu.gh
- **GitHub:** [PBoahene](https://github.com/PBoahene)
- **Portfolio:** [Live Demo](https://portfolio-git-main-boahene-princes-projects.vercel.app/)