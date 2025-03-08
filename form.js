import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

// Wait for the DOM to load before interacting with it
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitAAR");
    if (!submitButton) {
        console.error("Error: 'submitAAR' element not found.");
        return;
    }

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
