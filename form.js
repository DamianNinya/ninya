document.getElementById("aar-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Create the AAR object from form values
    const aarReport = {
      mission_name: document.getElementById("mission_name").value,
      team_leader: document.getElementById("team_leader").value,
      enemy_kills: document.getElementById("enemy_kills").value,
      casualties: document.getElementById("casualties").value,
      technicals: document.getElementById("technicals").value,
      hvts_killed: document.getElementById("hvts_killed").value,
      steps: document.getElementById("steps").value.split("|").map(step => step.trim())
    };
  
    // Retrieve existing reports from localStorage or initialize an empty array
    let reports = JSON.parse(localStorage.getItem("aarReports")) || [];
    reports.push(aarReport);
    localStorage.setItem("aarReports", JSON.stringify(reports));
  
    alert("AAR Submitted and saved!");
  
    // Optionally clear the form after submission
    document.getElementById("aar-form").reset();
  });
  