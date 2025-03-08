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

    const missionName = document.getElementById("missionName").value.trim();
    const author = document.getElementById("author").value.trim();
    const missionSteps = document.getElementById("missionSteps").value.split("\n").map(step => step.trim()).filter(step => step);
    const notes = document.getElementById("notes").value.trim();

    if (!missionName || !author || missionSteps.length === 0) {
        alert("Please fill out all required fields.");
        return;
    }

    try {
        await addDoc(collection(db, "AARs"), {
            missionName,
            author,
            missionSteps,
            notes,
            timestamp: new Date()
        });

        alert("AAR submitted successfully!");
        document.getElementById("AARForm").reset();
    } catch (error) {
        console.error("Error adding AAR:", error);
        alert("Failed to submit AAR.");
    }
});
