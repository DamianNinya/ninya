import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaMD90W7Itw3suZEypxyOGTEYo5kr4_mE",
    authDomain: "black-viper-b4ab5.firebaseapp.com",
    projectId: "black-viper-b4ab5",
    storageBucket: "black-viper-b4ab5.firebasestorage.app",
    messagingSenderId: "118509311014",
    appId: "1:118509311014:web:0d77172cafb407b47bc2e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Wait for the DOM to load before interacting with it
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitAAR");
    const loginButton = document.getElementById("loginButton");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const aarForm = document.getElementById("aar-form");
    const loginForm = document.getElementById("login-form");

    if (!submitButton || !loginButton || !aarForm || !loginForm) {
        console.error("Error: missing elements.");
        return;
    }

    // Check if the user is logged in
    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in, show the AAR form
            aarForm.style.display = "block";  // Show form
            loginForm.style.display = "none";  // Hide login
        } else {
            // User is not signed in, show the login form
            aarForm.style.display = "none";  // Hide form
            loginForm.style.display = "block";  // Show login form
        }
    });

    // Handle login
    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Logged in successfully!");
            } catch (error) {
                console.error("Error logging in:", error);
                alert("Failed to log in. Please check your credentials.");
            }
        } else {
            alert("Please enter both email and password.");
        }
    });

    // Handle AAR form submission (only allowed if logged in)
    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const missionName = document.getElementById("mission_name").value.trim();
        const teamLeader = document.getElementById("team_leader").value.trim();
        const enemyKills = document.getElementById("enemy_kills").value.trim();
        const casualties = document.getElementById("casualties").value.trim();
        const technicals = document.getElementById("technicals").value.trim();
        const hvtsKilled = document.getElementById("hvts_killed").value.trim();
        const steps = document.getElementById("steps").value.trim().split("|").map(step => step.trim()).filter(step => step);

        if (!missionName || !teamLeader || !enemyKills || !technicals || !steps.length) {
            alert("Please fill out all required fields.");
            return;
        }

        try {
            await addDoc(collection(db, "AARs"), {
                missionName,
                author: teamLeader,
                missionSteps: steps,
                notes: casualties || "No additional notes",
                enemyKills: enemyKills,
                technicalsDestroyed: technicals,
                hvtsKilled: hvtsKilled,
                timestamp: new Date()
            });

            alert("AAR submitted successfully!");
            document.getElementById("aar-form").reset();
        } catch (error) {
            console.error("Error adding AAR:", error);
            alert("Failed to submit AAR.");
        }
    });
});
