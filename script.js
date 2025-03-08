import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const aarList = document.getElementById("aarList");

async function loadAARs() {
    try {
        const querySnapshot = await getDocs(collection(db, "AARs"));
        aarList.innerHTML = ""; // Clear existing content

        querySnapshot.forEach((doc) => {
            const aar = doc.data();
            const listItem = document.createElement("div");
            listItem.classList.add("aar-entry");
            listItem.innerHTML = `
                <h3>${aar.missionName} <span>by ${aar.author}</span></h3>
                <ul>
                    ${aar.missionSteps.map(step => `<li>${step}</li>`).join("")}
                </ul>
                <p><strong>Notes:</strong> ${aar.notes || "No additional notes"}</p>
            `;
            aarList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error loading AARs:", error);
    }
}

// Load AARs when the page loads
document.addEventListener("DOMContentLoaded", loadAARs);
