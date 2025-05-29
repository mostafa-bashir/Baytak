Baytak
Baytak is a modern web application designed to manage and showcase various projects with a user-friendly interface. It features a clean navbar with the branding "Baytak" and presents project details in a horizontal slider format, using reusable components for efficient UI rendering.

Table of Contents
Project Overview

Features

Tech Stack

Installation

Usage

Folder Structure

Contributing

License

Contact

Project Overview
Baytak is developed as a project portfolio and management platform. It fetches project data from a backend API and displays each project's units in a horizontal slider. The UI is built with React and Ant Design to ensure a smooth and visually appealing experience.

Features
Responsive navbar with "Baytak" branding

Fetch projects from /projects API endpoint

Display projects with horizontal sliders for their units

Use of reusable UnitCard component for unit representation

Smooth and intuitive UI with Ant Design components

Tech Stack
Frontend: React, Next.js

UI Library: Ant Design

API Calls: Fetch / Axios (depending on implementation)

Styling: CSS / Styled Components / Less (adjust based on your setup)

Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/baytak.git
Navigate to the project directory

bash
Copy
Edit
cd baytak
Install dependencies

bash
Copy
Edit
npm install
Start the development server

bash
Copy
Edit
npm run dev
Usage
Access the app at http://localhost:3000

The navbar shows only the "Baytak" label

Projects are fetched from the /projects API endpoint

Scroll horizontally to view project units displayed by the UnitCard component

Folder Structure
bash
Copy
Edit
/baytak
 ├─ /components       # Reusable UI components (e.g., UnitCard, Navbar)
 ├─ /pages            # Next.js pages (e.g., /projects)
 ├─ /public           # Static assets
 ├─ /styles           # CSS or styling files
 ├─ /utils            # Utility functions (API calls, helpers)
 └─ package.json      # Project dependencies and scripts
Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.
