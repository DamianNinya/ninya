import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase Configuration
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

document.addEventListener("DOMContentLoaded", async () => {
  const aarList = document.getElementById("aar-list");

  if (!aarList) {
    console.error("Error: 'aar-list' element not found.");
    return;
  }

  async function loadAARs() {
    try {
      console.log("Fetching AARs from Firestore...");
      const querySnapshot = await getDocs(collection(db, "AARs"));
      aarList.innerHTML = ""; // Clear previous content

      if (querySnapshot.empty) {
        console.warn("No AARs found in Firestore.");
        aarList.innerHTML = "<p>No After-Action Reports found.</p>";
        return;
      }

      console.log("AAR Documents:", querySnapshot.docs.map(doc => doc.data()));

      querySnapshot.forEach((doc) => {
        const aar = doc.data();
        
        // Ensure missionSteps exists and is an array
        const missionStepsHtml = aar.missionSteps && Array.isArray(aar.missionSteps)
          ? aar.missionSteps.map(step => `<li>${step}</li>`).join("")
          : "<li>No mission steps available</li>";

        // Create AAR entry
        const listItem = document.createElement("div");
        listItem.classList.add("aar-entry");

        listItem.innerHTML = `
          <h3>${aar.missionName} <span>by ${aar.author || "Unknown"}</span></h3>
          <ul>
            <li><strong>Enemy Kills:</strong> ${aar.enemyKills ?? "N/A"}</li>
            <li><strong>HVTs Killed:</strong> ${aar.hvtsKilled ?? "N/A"}</li>
            <li><strong>Technicals Destroyed:</strong> ${aar.technicalsDestroyed ?? "N/A"}</li>
            <li><strong>Mission Steps:</strong> <ul>${missionStepsHtml}</ul></li>
            <li><strong>Notes:</strong> ${aar.notes || "No additional notes"}</li>
          </ul>
        `;

        aarList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error loading AARs:", error);
      aarList.innerHTML = "<p>Error loading After-Action Reports. Check console for details.</p>";
    }
  }

  await loadAARs();
});
