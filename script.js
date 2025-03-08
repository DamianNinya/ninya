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

        // Create the HTML for displaying the AAR's info
        listItem.innerHTML = `
          <h3>${aar.missionName} <span>by ${aar.author}</span></h3>
          <ul>
            <li><strong>Enemy Kills:</strong> ${aar.enemyKills}</li>
            <li><strong>HVTs Killed:</strong> ${aar.hvtsKilled}</li>
            <li><strong>Technicals Destroyed:</strong> ${aar.technicalsDestroyed}</li>
            <li><strong>Mission Steps:</strong> <ul>
                ${aar.missionSteps.map(step => `<li>${step}</li>`).join("")}
            </ul></li>
            <li><strong>Notes:</strong> ${aar.notes || "No additional notes"}</li>
          </ul>
        `;
        aarList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error loading AARs:", error);
    }
  }

  loadAARs();

  // Tab Switching Functionality
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Set the first tab as active by default
  tabs[0].classList.add('active');
  tabContents[0].classList.add('active');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(tab.id.replace('Tab', ''));
      targetContent.classList.add('active');
    });
  });
});
