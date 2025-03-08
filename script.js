document.addEventListener("DOMContentLoaded", () => {
    fetch("aar_data.json")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("aar-list");
            data.forEach(aar => {
                const li = document.createElement("li");
                li.textContent = `${aar.mission_name} - ${aar.team_leader}`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error("Error loading AAR data:", error));
});