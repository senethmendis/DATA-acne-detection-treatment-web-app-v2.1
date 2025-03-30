# Acne Detection Web Application

This is a **Next.js** project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This web application utilizes AI-powered **computer vision** to detect acne severity from face images and provides personalized treatment recommendations.

## Features
- **AI-Powered Acne Detection**: Upload an image, and the AI will analyze acne severity.
- **Personalized Skincare Recommendations**: Get tailored treatment suggestions based on acne type.
- **Progress Tracking**: Monitor changes in acne conditions over time.
- **Educational Content**: Access expert skincare advice and DIY home remedies.

## Getting Started

To set up and run the development environment, follow these steps:

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm, yarn, or pnpm as a package manager
- A Next.js-compatible environment

### Installation
Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-username/acne-detection-app.git
cd acne-detection-app

# Install dependencies
npm install  # or yarn install or pnpm install
```

### Running the Development Server
Start the development server:

```bash
npm run dev  # or yarn dev or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

## Folder Structure

```
├── .next/              # Build output
├── app/                # Main application folder
├── assets/             # Static assets
├── components/         # UI Components
├── constants/          # Global constants
├── context/            # React context providers
├── firebase/           # Firebase configuration and services
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API handlers
├── node_modules/       # Dependencies
├── public/             # Static assets
├── utils/              # Helper functions
├── .env                # Environment variables
├── .gitignore          # Files to ignore in Git
├── components.json     # Component metadata
├── cors.json           # CORS configuration
├── eslint.config.mjs   # ESLint configuration
├── jsconfig.json       # JS configuration
├── next.config.mjs     # Next.js configuration
├── package-lock.json   # Lockfile for dependencies
├── package.json        # Project metadata and dependencies
├── postcss.config.mjs  # PostCSS configuration
├── README.md           # Project documentation
├── tailwind.config.mjs # Tailwind CSS configuration
```

## Deployment

To deploy the application, use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

```bash
vercel deploy
```

For more details, refer to the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).

## Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS, Shadcn.ui
- **Backend**: Python Flask API
- **Machine Learning**: YOLOv8 for acne detection
- **Database**:  Firebase (if needed for storing user data)
- **Deployment**: Vercel

## Learn More
To learn more about Next.js, check out:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Contributing
If you'd like to contribute, please fork the repository and submit a pull request with your changes. Feedback and contributions are welcome!

## License
This project is licensed under the **MIT License**.

---
**Author:** Seneth Mendis Kumarasingha

**GitHub:** [Your GitHub Profile]([https://github.com/your-username](https://github.com/senethmendis))

