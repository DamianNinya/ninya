document.addEventListener("DOMContentLoaded", () => {
    const aarList = document.getElementById("aar-list");
    
    // Display the maintenance message and hide the AAR list
    const maintenanceMessage = document.createElement("div");
    maintenanceMessage.classList.add("maintenance-message");
    maintenanceMessage.innerHTML = "<strong>Warning:</strong> After Action Reports are currently down for maintenance. Please try again later.";

    document.querySelector("main").appendChild(maintenanceMessage);
    aarList.style.display = "none"; // Ensure the AAR list is hidden
});
