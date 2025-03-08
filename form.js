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
