import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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
    const aarForm = document.getElementById("aar-form");
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("loginButton");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    if (!submitButton || !loginButton || !aarForm) {
        console.error("Error: missing elements.");
        return;
    }

    // Check if the user is logged in
    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in, enable AAR form submission
            aarForm.style.display = "block";  // Show form
            loginForm.style.display = "none";  // Hide login form
        } else {
            // User is signed out, show login form
            aarForm.style.display = "none";
            loginForm.style.display = "block";
        }
    });

    // Submit AAR form
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get input values
        const missionName = document.getElementById("mission_name").value;
        const teamLeader = document.getElementById("team_leader").value;
        const casualties = document.getElementById("casualties").value;
        const enemyKills = document.getElementById("enemy_kills").value;
        const technicals = document.getElementById("technicals").value;
        const hvtsKilled = document.getElementById("hvts_killed").value;
        const steps = document.getElementById("steps").value;

        // Save the AAR data
        addDoc(collection(db, "AARs"), {
            mission_name: missionName,
            team_leader: teamLeader,
            casualties: casualties,
            enemy_kills: enemyKills,
            technicals: technicals,
            hvts_killed: hvtsKilled,
            steps: steps,
            timestamp: new Date()
        }).then(() => {
            alert("AAR submitted successfully!");
            aarForm.reset(); // Reset the form after submission
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
    });

    // Handle login
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        const email = loginEmail.value;
        const password = loginPassword.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                alert("Login successful!");
                loginForm.style.display = "none";  // Hide login form
                aarForm.style.display = "block";  // Show AAR form
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error: " + errorMessage);
            });
    });
});

// Function to validate number inputs
function validateNumberInput(input) {
    const value = input.value;
    if (value < 0) {
        input.value = 0;
    } else if (value > 999) {
        input.value = 999;
    }
}
