# RenameWave
[![React](https://img.shields.io/badge/Frontend-React-%2361DAFB?logo=react&logoColor=white)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-%23339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/API-Express-%23000000?logo=express&logoColor=white)](https://expressjs.com)
[![Supabase](https://img.shields.io/badge/Database-Supabase-%2347A248?logo=mongodb&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/UI-TailwindCSS-%2306B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-%23007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-%232671E5?logo=githubactions&logoColor=white)](https://docs.github.com/en/actions)

RenameWave is a powerful and intuitive SAAS application designed to help you rename multiple files in bulk effortlessly. Save time and organize your digital assets with just a few clicks using our smart renaming rules and user-friendly interface.

## Key Features

*   **Batch File Renaming:** Upload and rename hundreds of files at once.
*   **Flexible Renaming Rules:**
    *   Add Prefixes/Suffixes
    *   Replace Text
    *   Sequential Numbering (custom start, step, and digit padding)
    *   Add Dates (various formats, prefix/suffix position)
*   **Real-time Preview:** Instantly see how your filenames will change before applying.
*   **Rule Presets:** Save and load your favorite renaming configurations for quick reuse.
*   **Secure User Authentication:** Sign in with Google, powered by Supabase.
*   **Credit-Based System:** Purchase credits for renaming operations via Razorpay.
*   **Transaction History:** Keep track of your credit usage and purchases.
*   **Download Options:** Download individually renamed files or as a single ZIP archive.
*   **Responsive Design:** Works seamlessly on desktop devices.
*   **(Coming Soon) Cloud Storage Integration:** Rename files directly from services like Google Drive, Dropbox, etc.

## How It Works

1.  **Upload Files:** Drag and drop your files or select them from your computer.
2.  **Define Rules:** Create custom renaming rules (e.g., add prefix/suffix, replace text, insert numbers/dates) or apply a saved preset.
3.  **Preview & Rename:** See a live preview of the new filenames. Once satisfied, apply the rules. Credits will be deducted based on the number of files processed.
4.  **Download:** Download your newly renamed files, either individually or as a ZIP archive.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
*   **Backend:** Node.js, Express.js
*   **Authentication & Database:** Supabase
*   **Payments:** Razorpay
*   **Core Libraries:** `axios`, `jszip`, `lucide-react` (icons), `react-dropzone`, `react-hot-toast`, `react-router-dom`, `uuid`

## Project Structure

The project is organized into a frontend application and a backend server:
```
└── rename-saas/
    ├── public/                 # Static assets (e.g., logo.png)
    ├── src/                    # Frontend source code (React, TypeScript)
    │   ├── components/         # Reusable UI components (auth, rename logic)
    │   ├── context/            # React Context API (e.g., authContext)
    │   ├── layout/             # Main layout components (Header, Footer)
    │   ├── lib/                # Client-side libraries (Supabase client, location utils)
    │   ├── pages/              # Page components for different routes
    │   ├── @types/             # Custom type definitions
    │   ├── App.tsx             # Main application component with routing
    │   ├── main.tsx            # Application entry point
    │   └── index.css           # Global styles and Tailwind directives
    ├── eslint.config.js        # ESLint configuration
    ├── index.html              # Main HTML file for Vite
    ├── package.json            # Project dependencies and scripts
    ├── server.cjs              # Backend Express server (handles payments, presets, credits)
    ├── tsconfig.json           # Root TypeScript configuration
    ├── tsconfig.app.json       # TypeScript configuration for the app
    ├── tsconfig.node.json      # TypeScript configuration for Node.js parts (like vite.config.ts)
    └── vite.config.ts          # Vite bundler configuration
```

## Getting Started

**Prerequisites:**
*   Node.js (v18 or later recommended)
*   npm (comes with Node.js) or yarn

**1. Clone the repository:**
```bash
git clone https://github.com/NostraPredator-dev/Rename-SAAS.git
cd Rename-SAAS
```

**2. Install dependencies:**
```bash
npm install
```
or
```bash
yarn install
```

**3. Set up Environment Variables:**
Create a `.env` file in the root of the project and add the following environment variables. You will need to obtain these keys from your Supabase project and Razorpay dashboard.

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay Configuration
VITE_RZRPY_KEY=your_razorpay_key_id
VITE_RZRPY_SECRET=your_razorpay_key_secret
```

**4. Running the Application:**

*   **Backend Server:**
    Open a terminal in the project root and run:
    ```bash
    node server.cjs
    ```
    The backend server will start, typically on `http://localhost:3000` (as specified in `server.cjs`).

*   **Frontend Development Server:**
    Open another terminal in the project root and run:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    This will start the Vite development server, usually accessible at `http://localhost:5173`. Open this URL in your browser.

## Available Scripts

*   `npm run dev`: Starts the Vite frontend development server with HMR.
*   `npm run build`: Compiles TypeScript and builds the frontend application for production into the `dist` folder.
*   `npm run lint`: Lints the codebase using ESLint to check for code quality and style issues.
*   `npm run preview`: Serves the production build locally to preview the application as it would appear in production.
