 import { auth } from "../firebase/firebase-config.js";  // Adjust path as needed
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const authSection = document.getElementById("authSection");
  const userSection = document.getElementById("userSection");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      authSection.style.display = "none";
      userSection.style.display = "inline-flex";
    } else {
      // User is NOT logged in
      authSection.style.display = "inline-flex";
      userSection.style.display = "none";
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          localStorage.clear();  // optional, if you store anything
          window.location.href = "login.html";
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    });
  }
});