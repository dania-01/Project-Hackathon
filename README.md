# MemeHub 😎🔥

MemeHub is a vibrant, full-featured meme-sharing platform built using HTML, JavaScript, Bootstrap, SweetAlert, and Firebase. It supports meme creation, community interaction, and leaderboard tracking, offering an engaging experience for meme lovers.

---

## 🚀 Features

- 🔐 **Authentication**  
  - Sign in with Google  
  - Sign in using email/phone credentials  
  - Test credentials:
    - **Email**: `danikhan0412@gmail.com`  
    - **Password**: `1234567`  

- 🖼️ **Create Meme**
  - Upload your meme image
  - Add captions
  - Save directly to Firebase Cloud Storage

- 🏠 **Dashboard**
  - View trending memes
  - Upvote/downvote
  - Comment and share memes
  - Report inappropriate content
  - User profile with stats and meme feed

- 📈 **Leaderboard**
  - Displays top meme creators based on upvotes
  - Crowns and animated effects for top users

- 🧰 **Custom Dashboard**
  - Personalized user experience with stats
  - Real-time Firestore updates
  - Animated, vibrant UI

---

## 🛠️ Tech Stack

- **Frontend**
  - HTML5
  - JavaScript (Modular Firebase SDK)
  - Bootstrap 5
  - SweetAlert 2
  - CSS (custom styles)

- **Backend & Services**
  - **Firebase**
    - Authentication (Google, Email/Phone)
    - Firestore Database (posts, votes, comments)
    - Firebase Storage (meme uploads)

---

## 📁 Project Structure

meme-app/
│
├── assets/
│ └── css-files/
│ ├── create-meme.css
│ ├── dashboard.css
│ ├── home.css
│ └── styles.css
│
├── firebase/
│ └── firebase-config.js
│
├── html-files/
│ ├── index.html
│ ├── dashboard.html
│ ├── create-meme.html
│ ├── trendingPage.html
│ ├── search.html
│ └── about.html
│
├── js-files/
│ ├── login.js
│ ├── dashboard.js
│ ├── create-meme.js
│ ├── home.js
│ └── nav.js
│
└── Readme.md


---

## 🧪 How to Run

1. Clone the repository or download the folder.
2. Open `index.html` in any modern browser.
3. Make sure Firebase project is correctly configured in `firebase-config.js`.
4. Use live server (e.g. VSCode Live Server) for best performance.

---

## 👨‍💻 Author

- **Dania Khan** – [daniakhan0412@gmail.com](mailto:daniakhan0412@gmail.com)

---

## 📢 Notes

- All meme content is stored and fetched dynamically using Firestore and Firebase Storage.
- You can expand the project by integrating more meme sources or adding AI-generated meme captions.

---

## ⭐️ Show Your Support

If you liked the project, consider giving it a star ⭐ and sharing it with your friends!

