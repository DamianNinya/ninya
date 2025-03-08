document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("aar-list");
    let reports = JSON.parse(localStorage.getItem("aarReports")) || [];
  
    if (reports.length === 0) {
      list.innerHTML = "<li>No reports available.</li>";
    } else {
      reports.forEach(aar => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${aar.mission_name}</strong> - ${aar.team_leader}<br>
                        Enemy Kills: ${aar.enemy_kills}, Technicals Destroyed: ${aar.technicals}, HVTs Killed: ${aar.hvts_killed}<br>
                        Casualties: ${aar.casualties}<br>
                        Mission Steps: ${aar.steps.join(", ")}`;
        list.appendChild(li);
      });
    }
  });
  