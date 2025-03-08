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

// Form submission handler
document.getElementById("submitAAR").addEventListener("click", async (e) => {
    e.preventDefault();

    // Collect form values
    const missionName = document.getElementById("missionName").value.trim();
    const author = document.getElementById("author").value.trim();
    const missionSteps = document.getElementById("missionSteps").value.split("\n").map(step => step.trim()).filter(step => step);
    const notes = document.getElementById("notes").value.trim();
    
    const enemyKills = document.getElementById("enemyKills").value.trim();
    const hvtsKilled = document.getElementById("hvtsKilled").value.trim();
    const technicalsDestroyed = document.getElementById("technicalsDestroyed").value.trim();

    const isMissionSuccessful = document.querySelector('input[name="missionStatus"]:checked').value === "successful";
    
    // Collect PMC names and their statuses
    const pmcs = Array.from(document.querySelectorAll(".pmc")).map(pmc => ({
        name: pmc.querySelector(".pmc-name").value,
        status: pmc.querySelector(".pmc-status").value
    }));

    // Dynamic fields (hostages, bombs, secured intel)
    const hasHostages = document.getElementById("hasHostages").checked;
    const hasBombs = document.getElementById("hasBombs").checked;
    const hasSecuredIntel = document.getElementById("hasSecuredIntel").checked;

    if (!missionName || !author || missionSteps.length === 0) {
        alert("Please fill out all required fields.");
        return;
    }

    try {
        // Submit AAR data
        await addDoc(collection(db, "AARs"), {
            missionName,
            author,
            missionSteps,
            notes,
            enemyKills,
            hvtsKilled,
            technicalsDestroyed,
            missionStatus: isMissionSuccessful,
            pmcs,
            hasHostages,
            hasBombs,
            hasSecuredIntel,
            timestamp: new Date()
        });

        alert("AAR submitted successfully!");
        document.getElementById("AARForm").reset();
    } catch (error) {
        console.error("Error adding AAR:", error);
        alert("Failed to submit AAR.");
    }
});

// Hide/Show dynamic elements based on mission details
document.getElementById("hasHostages").addEventListener("change", function() {
    const hostageFields = document.querySelectorAll(".hostage-fields");
    hostageFields.forEach(field => {
        field.style.display = this.checked ? "block" : "none";
    });
});

document.getElementById("hasBombs").addEventListener("change", function() {
    const bombFields = document.querySelectorAll(".bomb-fields");
    bombFields.forEach(field => {
        field.style.display = this.checked ? "block" : "none";
    });
});

document.getElementById("hasSecuredIntel").addEventListener("change", function() {
    const intelFields = document.querySelectorAll(".intel-fields");
    intelFields.forEach(field => {
        field.style.display = this.checked ? "block" : "none";
    });
});
