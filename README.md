# Sense: Feel, track and grow.

An app that connects emotions with financial decisions to help you live more consciously.

---

## Project Description

**Sense** is a web application that combines **emotional journaling** with **daily financial tracking**. Through personalized insights, AI-generated recommendations, and visual analysis, it helps identify patterns between emotional states and spending habits, supporting healthier decision-making.

---

## Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/Patopam/WebProject.git
cd WebProject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root of the project with the following variables:

```env
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""
VITE_OPENAI_API_KEY=""
VITE_PEXELS_API_KEY=""
```

### To obtain these keys, follow these steps:

1. **Create a project in [Firebase](https://console.firebase.google.com/):**

   - Enable **Authentication** using email and password.
   - Enable **Firestore Database**.
   - Go to project settings and copy the required keys.

2. **Request an API key from [OpenAI](https://platform.openai.com/account/api-keys)** to generate personalized activity recommendations.

3. **Create an account on [Pexels](https://www.pexels.com/api/)** and generate your API key to retrieve emotion-based images.

---

### 4. Start the app locally

```bash
npm run dev
```

The application will be available at: [http://localhost:5173](http://localhost:5173)

---

## Key Features

- Record daily emotions in a journal, with optional guided templates.
- Monitor daily spending.
- Set maximum spending goals by date.
- Receive AI-generated activity recommendations based on your daily emotions.
- View the relationship between emotions and spending.
- Access emotional and financial statistics over time.

---

## Technologies and Libraries Used

| Category                     | Libraries                                  |
| ---------------------------- | ------------------------------------------ |
| **Frontend**                 | React, React Router DOM, Redux Toolkit     |
| **UI/UX**                    | Material UI (MUI), PrimeReact, React Icons |
| **Data visualization**       | Recharts, MUI Charts, ECharts              |
| **Animations and carousels** | Embla Carousel, Notistack                  |
| **Date management**          | Day.js, Date-fns                           |
| **Auth & database**          | Firebase (Auth + Firestore)                |
| **External APIs**            | OpenAI API, Pexels API                     |
| **Other tools**              | Cloudinary (images), React Hot Toast       |

---

## Project Structure

```plaintext
src/
├── assets/             # Images and icons
├── components/         # Reusable UI components: cards, buttons, inputs
├── redux/              # Redux global state slices and store
│   ├── auth/               # Authentication logic
│   ├── cloudinarySlice/    # Cloudinary image state
│   ├── DataSlice/          # Journal and finance data slices
│   ├── UserSlice/          # User name and ID state
│   ├── aiStatusSlice.js    # AI response and status handling
│   └── store.js            # Redux store setup
├── routers/            # App routing and protected routes
│   └── router.jsx
├── screens/            # Main views: Dashboard, Journal, Finance, etc.
├── services/           # External integrations and backend logic
│   ├── firebase.js         # Firebase initialization
│   ├── firebaseUtils.js    # Auth and Firestore helpers
│   ├── analysisUtils.js    # Analyze emotion-finance relationships
│   ├── openaiService.js    # AI-based recommendation logic
│   └── pexelsService.js    # Fetch images by emotion from Pexels
├── utils/              # Utility functions
│   └── utils.js
├── App.jsx             # Main app component
├── main.jsx            # React entry point
├── index.css           # Global styles
```

---

## Developers

- **David Cardona Betancur**
- **María del Mar Ramírez Tabares**
- **Maira Alejandra Hurtado Martínez**

---

## License

This project was developed as part of an academic exercise for Universidad Icesi.
It is intended solely for educational and demonstrative purposes.
