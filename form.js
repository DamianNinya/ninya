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
    const formElements = document.querySelectorAll("#aar-form input, #aar-form textarea");
    const maintenanceMessage = document.createElement("div");

    // Set the maintenance message
    maintenanceMessage.classList.add("maintenance-message");
    maintenanceMessage.innerHTML = "<strong>Warning:</strong> After Action Reports are currently down for maintenance. Please try again later.";
    
    // Display the maintenance message and hide the form
    document.querySelector("main").appendChild(maintenanceMessage);
    document.getElementById("aar-form").style.display = "none";

    // Disable the submit button
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";

    // Disable all input elements
    formElements.forEach(element => {
        element.disabled = true;
    });
});
