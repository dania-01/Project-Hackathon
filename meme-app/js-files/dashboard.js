
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { app } from "../firebase/firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

  const userEmail = document.getElementById("userEmail");
  const userName = document.getElementById("userName");
  const voteCount = document.getElementById("voteCount");
  const commentCount = document.getElementById("commentCount");
  const userRank = document.getElementById("userRank");

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.innerText = user.email;
      userName.innerText = user.displayName || "Warrior001";

      voteCount.innerText = randomInt(100, 1000);
      commentCount.innerText = randomInt(5, 100);
      userRank.innerText = `#${randomInt(1, 999)}`;

    } else {
      window.location.href = "../index.html";
    }
  });

  document.getElementById("showStatsBtn").addEventListener("click", () => {
    const engagement = randomInt(50, 100);
    const memesPosted = randomInt(1, 50);
    const savedMemes = randomInt(0, 40);
    const hoursSpent = randomInt(1, 100);
    const humorScore = randomInt(60, 100);
    const badges = ["🔥 Meme Lord", "😎 Chill Creator", "🧠 Think Tank", "🤣 Laugh Reactor"];
    const badge = badges[randomInt(0, badges.length - 1)];

    Swal.fire({
      title: "📈 Advanced Meme Stats",
      html: `
      <div style="font-size: 1.2rem; text-align: left;">
        <b>Engagement:</b> ${engagement}%<br>
        <b>Memes Posted:</b> ${memesPosted}<br>
        <b>Saved Memes:</b> ${savedMemes}<br>
        <b>Hours Spent:</b> ${hoursSpent}<br>
        <b>Humor Score:</b> ${humorScore}/100<br>
        <b>Badge:</b> <span style="color:white">${badge}</span>
      </div>
    `,
      background: "#0d0d2b",
      color: "#fff",
      confirmButtonColor: "#ff00cc",
      confirmButtonText: "Chillax"
    });
  });
  window.onload = () => {
    fetch("https://meme-api.com/gimme")
      .then(res => res.json())
      .then(data => {
        document.getElementById("memeImage").src = data.url;
      }).catch(() => {
        Swal.fire("Oops", "Couldn't load meme!", "error");
      });
  }
  window.logout = function () {
    auth.signOut().then(() => {
      window.location.href = "../html-files/index.html"; // ✅ send to login page
    }).catch(error => {
      Swal.fire("Error", error.message, "error");
    });
  };
});