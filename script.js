const firebaseConfig = {
  apiKey: "AIzaSyCdqoh7xK23P1LmMjYlRalehsbSEw_qTrg",
  authDomain: "memebattle-fe1b6.firebaseapp.com",
  projectId: "memebattle-fe1b6",
  storageBucket: "memebattle-fe1b6.appspot.com",
  messagingSenderId: "160315390218",
  appId: "1:160315390218:web:5b4c3c37bcce9f371262f3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const leaderboardList = document.getElementById("leaderboardList");
const topUserBox      = document.getElementById("topUserBox");
const searchBox       = document.getElementById("searchBox");
const refreshBtn      = document.getElementById("refreshBtn");

function renderLeaderboard(data) {
  leaderboardList.innerHTML = "";
  if (data.length > 0) {
    const top = data[0];
    topUserBox.innerHTML = `👑 Top Liked User: <strong>${top.username}</strong> with <strong>${top.totalLikes}</strong> likes! 🎉`;
    topUserBox.style.display = "block";
  }
  data.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "entry";
    if (index === 0) div.classList.add("celebrate-gold");
    else if (index === 1) div.classList.add("celebrate-silver");
    else if (index === 2) div.classList.add("celebrate-bronze");
    div.innerHTML = `
      <div class="left">
        <span class="rank">${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}</span>
        <img class="avatar" src="https://api.dicebear.com/7.x/thumbs/svg?seed=${entry.userId}" alt="avatar">
        ${index < 3 ? '<div class="crown-icon">👑</div>' : ''}
        <span class="name">${entry.username}</span>
      </div>
      <div class="likes">👍 <span>${entry.totalLikes}</span></div>
    `;
    div.addEventListener("click", () => {
      Swal.fire({
        title: `${entry.username}'s Stats`,
        html: `<p><strong>Total Likes:</strong> ${entry.totalLikes}</p><p><strong>User ID:</strong> ${entry.userId}</p>`,
        icon: 'info',
        background: '#222',
        color: '#fff',
        confirmButtonColor: '#0ff'
      });
    });
    leaderboardList.appendChild(div);
  });
}

async function fetchLeaderboard(showAlert = false) {
  try {
    const snap = await db.collection("memes").get();
    const map = {};
    snap.forEach(docSnap => {
      const d = docSnap.data();
      const uid = d.userId || 'anon';
      if (!map[uid]) map[uid] = { userId: uid, username: d.username || 'Unknown', totalLikes: 0 };
      map[uid].totalLikes += d.likes || 0;
    });
    const sorted = Object.values(map).sort((a, b) => b.totalLikes - a.totalLikes).slice(0, 10);
    const padded = Array.from({ length: 10 }, (_, i) => sorted[i] || { userId: `ph${i}`, username: "N/A", totalLikes: 0 });
    renderLeaderboard(padded);
    await db.collection("leaderboard").doc("top10").set({ users: padded });
    if (showAlert) Swal.fire({ icon: 'info', title: 'Leaderboard Updated!', timer: 1500, showConfirmButton: false });
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.message });
  }
}

searchBox.addEventListener("input", () => {
  const q = searchBox.value.toLowerCase();
  document.querySelectorAll(".entry").forEach(el => {
    const name = el.querySelector(".name").textContent.toLowerCase();
    el.style.display = name.includes(q) ? "flex" : "none";
  });
});
refreshBtn.addEventListener("click", () => fetchLeaderboard(true));

fetchLeaderboard();
