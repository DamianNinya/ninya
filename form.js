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

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitAAR");
    if (!submitButton) {
        console.error("Error: 'submitAAR' element not found.");
        return;
    }

    // List of number fields to enforce limits
    const numberFields = ["enemy_kills", "technicals", "hvts_killed"];

    numberFields.forEach((id) => {
        let input = document.getElementById(id);

        // Prevent typing more than 3 digits
        input.addEventListener("input", function () {
            if (this.value.length > 3) {
                this.value = this.value.slice(0, 3);
            }
        });

        // Prevent pasting large numbers
        input.addEventListener("paste", function (event) {
            event.preventDefault();
            let pasteData = (event.clipboardData || window.clipboardData).getData("text");
            if (!isNaN(pasteData)) {
                this.value = pasteData.slice(0, 3); // Only allow first 3 digits
            }
        });
    });

    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const missionName = document.getElementById("mission_name").value.trim();
        const teamLeader = document.getElementById("team_leader").value.trim();
        let enemyKills = document.getElementById("enemy_kills").value.trim();
        const casualties = document.getElementById("casualties").value.trim();
        let technicals = document.getElementById("technicals").value.trim();
        let hvtsKilled = document.getElementById("hvts_killed").value.trim();
        const steps = document.getElementById("steps").value.trim().split("|").map(step => step.trim()).filter(step => step);

        // Convert number values to integers, default to 0 if empty
        enemyKills = parseInt(enemyKills, 10) || 0;
        technicals = parseInt(technicals, 10) || 0;
        hvtsKilled = parseInt(hvtsKilled, 10) || 0;

        // Prevent numbers above 999
        if (enemyKills > 999 || technicals > 999 || hvtsKilled > 999) {
            alert("Numbers must be between 0 and 999.");
            return;
        }

        if (!missionName || !teamLeader || !steps.length) {
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
