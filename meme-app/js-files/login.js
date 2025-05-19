import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

import { app, auth } from "../firebase/firebase-config.js";

window.toggleForms = function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("formTitle");

    const isLogin = loginForm.style.display !== "none";
    loginForm.style.display = isLogin ? "none" : "block";
    signupForm.style.display = isLogin ? "block" : "none";
    formTitle.innerText = isLogin ? "Sign Up" : "Login";
};

document.querySelectorAll(".toggle-password").forEach(toggle => {
    toggle.addEventListener("click", () => {
        const input = toggle.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        toggle.textContent = input.type === "password" ? "👁️" : "🙈";
    });
});

window.login = function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const remember = document.getElementById("rememberMe").checked;

    const persistence = remember ? browserLocalPersistence : browserSessionPersistence;

    setPersistence(auth, persistence).then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    }).then(() => {
        const loggedInUser = {
            email: email
            // add other data like username, userId etc.
        };

        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.location.href = "../html-files/home.html";
    }).catch(error => {
        Swal.fire("Error", error.message, "error");
    });
};


window.signup = function () {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match!", "warning");
        return;
    }

    const remember = document.getElementById("rememberMeSignup").checked;
    const persistence = remember ? browserLocalPersistence : browserSessionPersistence;

    setPersistence(auth, persistence).then(() => {
        return createUserWithEmailAndPassword(auth, email, password);
    }).then(() => {
        Swal.fire("Success", "Account created! Please log in.", "success");
        window.location.href = "../html-files/home.html";
        toggleForms();
    }).catch(error => {
        Swal.fire("Error", error.message, "error");
    });
};

window.forgotPassword = function () {
    const email = document.getElementById("loginEmail").value;
    if (!email) {
        Swal.fire("Warning", "Please enter your email address.", "info");
        return;
    }

    sendPasswordResetEmail(auth, email).then(() => {
        Swal.fire("Email Sent", "Check your inbox for reset link.", "success");
    }).catch(error => {
        Swal.fire("Error", error.message, "error");
    });
};

window.signInWithGoogle = function () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const loggedInUser = {
            email: result.user
            // add other data like username, userId etc.
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.location.href = "../html-files/home.html";
    }).catch(error => {
        Swal.fire("Error", error.message, "error");
    });
};

window.logout = function () {
    auth.signOut().then(() => {
        Swal.fire("Logged Out", "You have been signed out.", "success");
        window.location.href = "../index.html";
    }).catch(error => {
        Swal.fire("Error", error.message, "error");
    });
};
