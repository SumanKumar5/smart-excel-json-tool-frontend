# 🧠 Smart Excel-JSON Tool (Frontend)

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-Animation-EF6C00?logo=framer)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-Built--with-646CFF?logo=vite)](https://vitejs.dev/)
[![Live](https://img.shields.io/badge/Live-smartexceljson.me-success?logo=vercel)](https://www.smartexceljson.live/)


### ✨ Live Demo

![Smart Excel-JSON Demo](./public/demo.gif)

A modern, dark-mode enabled React frontend for the **Smart Excel-JSON Tool** — allowing seamless conversion between Excel and JSON formats with optional AI enhancement. Built to align with high visual standards like those seen on CSS Design Awards.

---

## 🌟 Features

- 🌐 **Excel → JSON** conversion (raw or AI-enhanced)
- 📄 **JSON → Excel** transformation with optional AI output styling
- 🧠 **JSON Schema Generator** using AI to analyze Excel structure
- 🎨 Dark mode support
- ⚡ Fast & animated UI using **Framer Motion**
- 🧩 Syntax highlighting via **Monaco Editor**
- 📤 File uploads & downloads (Base64 for Excel)
- 📱 Fully responsive + mobile-friendly

---

## 🧰 Tech Stack & Tools Used

### ⚛️ Frontend Framework & Core
- **React 18.3.1** with **TypeScript**
- **Vite 5.4.2** as the build tool
- **React Router DOM 6.18.0** for client-side routing

### 🎨 UI & Styling
- **Tailwind CSS 3.4.1**
- **Framer Motion**
- **Lucide React**
- `clsx` + `tailwind-merge`

### 🧠 Code Editing & JSON Visualization
- **Monaco Editor** (`@monaco-editor/react`)
- **React JSON View Lite**
- **React Syntax Highlighter**

### 📂 File Handling & Networking
- **React Dropzone**
- **Axios**

### 🎯 Additional Tooling
- **React Intersection Observer**
- **ESLint**
- **TypeScript**

---

## 🚀 Live App

🔗 **Live Frontend:** [https://www.smartexceljson.live](https://www.smartexceljson.live) 
🔗 **Backend API:** [`https://smartexceljson.me`](https://smartexceljson.me)

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── converters/        # Core logic components for each feature
│   ├── layout/            # Header, Footer, ScrollToTop
│   └── ui/                # Reusable UI components (Card, Button, Editor, etc.)
├── contexts/              # ThemeContext
├── pages/                 # Page views for routing
├── services/              # API calls (axios)
├── utils/                 # Utility functions (e.g., classNames)
├── App.tsx                # Main routing & layout
├── main.tsx               # App entry point
```

---

## 🧠 Backend API

All requests are made to: [`https://smartexceljson.me`](https://smartexceljson.me)

### `/excel-to-json`
- Method: `POST`
- Input: `.xlsx`, `.xls`, or `.xlsm`
- Query Param: `?useAI=true` (optional)
- Output: Raw and/or AI-enhanced JSON

### `/json-to-excel`
- Method: `POST`
- Input: JSON string or file
- Query Param: `?useAI=true` (optional)
- Output: Excel (.xlsx) — Base64 download

### `/generate-schema`
- Method: `POST`
- Input: Excel file
- Output: JSON Schema

---

## 📜 How to Run Locally

```bash
git clone https://github.com/SumanKumar5/smart-excel-json-tool-frontend.git
cd smart-excel-json-tool-frontend
npm install

# Create a .env file in the root with:
VITE_API_BASE_URL=https://smartexceljson.me

npm run dev
```

---

## 📄 License

MIT © 2025 [Suman Kumar](https://github.com/sumankumar)
