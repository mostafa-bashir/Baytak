# Baytak

**Baytak** is a modern web application designed to manage and showcase various projects with a user-friendly interface. It features a clean navbar with the branding **"Baytak"** and presents project details in a horizontal slider format, using reusable components for efficient UI rendering.

---

## 📑 Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## 📘 Project Overview

Baytak is developed as a project portfolio and management platform. It fetches project data from a **NestJS backend API** and displays each project's units in a horizontal slider. The UI is built with **React** and **Ant Design** to ensure a smooth and visually appealing experience.

---

## ✨ Features

- Responsive navbar with **"Baytak"** branding  
- Fetch projects from `/projects` API endpoint  
- Display each project's units in horizontal sliders  
- Reusable `UnitCard` component for unit rendering  
- Smooth and intuitive UI using Ant Design components  
- **Search history management using cookies**  
- **API rate limiting with Throttler in NestJS for security**  
- **JWT-based secured admin panel access (NestJS auth)**  
- **Personalized recommendation system for users**

---

## 🛠️ Tech Stack

- **Frontend:** React, Next.js  
- **Backend:** NestJS (Node.js framework)  
- **UI Library:** Ant Design  
- **API Calls:** Fetch / Axios  
- **Styling:** CSS / Styled Components / Less  
- **Security & Auth:** JWT, Throttler (NestJS)  
- **Storage:** Cookies for client-side history tracking

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/baytak.git
```
Navigate to the project directory:
```
cd baytak
```
```
npm install
```
Start the development server:
```
npm run dev
```

🚀 Usage
Visit the app at http://localhost:3000

The navbar will display only the "Baytak" label

Projects are fetched from the /projects API endpoint (served by the NestJS backend)

Scroll horizontally to explore project units displayed using the UnitCard component
```
/baytak
 ├─ /components       # Reusable UI components (e.g., UnitCard, Navbar)
 ├─ /pages            # Next.js pages (e.g., /projects)
 ├─ /public           # Static assets
 ├─ /styles           # CSS or styling files
 ├─ /utils            # Utility functions (API calls, helpers)
 └─ package.json      # Project dependencies and scripts
```

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.
