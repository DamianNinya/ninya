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

// Wait for the DOM to load before interacting with it
document.addEventListener("DOMContentLoaded", () => {
    const aarList = document.getElementById("aar-list");
    if (!aarList) {
        console.error("Error: 'aar-list' element not found.");
        return;
    }

    async function loadAARs() {
        try {
            const querySnapshot = await getDocs(collection(db, "AARs"));
            aarList.innerHTML = ""; // Clear existing content

            querySnapshot.forEach((doc) => {
                const aar = doc.data();
                const listItem = document.createElement("div");
                listItem.classList.add("aar-entry");

                // Create the HTML for displaying the AAR's info in a compact form with a dropdown for full info
                listItem.innerHTML = `
                    <div class="aar-header">
                        <h3>${aar.missionName} by ${aar.author}</h3>
                        <button class="toggle-details">Show Details</button>
                    </div>
                    <div class="aar-summary">
                        <p><strong>Mission Status:</strong> ${aar.success ? "Successful" : "Failed"}</p>
                        <p><strong>Enemy Kills:</strong> ${aar.enemyKills}</p>
                        <p><strong>HVTs Killed:</strong> ${aar.hvtsKilled}</p>
                    </div>
                    <div class="aar-details" style="display: none;">
                        <ul>
                            <li><strong>Technicals Destroyed:</strong> ${aar.technicalsDestroyed}</li>
                            <li><strong>Mission Steps:</strong> <ul>${aar.missionSteps.map(step => `<li>${step}</li>`).join("")}</ul></li>
                            <li><strong>Notes:</strong> ${aar.notes || "No additional notes"}</li>
                        </ul>
                    </div>
                `;
                aarList.appendChild(listItem);

                // Toggle full details on click
                const toggleButton = listItem.querySelector(".toggle-details");
                const detailsDiv = listItem.querySelector(".aar-details");
                toggleButton.addEventListener("click", () => {
                    detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
                    toggleButton.textContent = detailsDiv.style.display === "none" ? "Show Details" : "Hide Details";
                });
            });
        } catch (error) {
            console.error("Error loading AARs:", error);
        }
    }

    loadAARs();
});
