// GitHub repository information
const repoOwner = "DamianNinya";
const repoName = "ninya";
const filePath = "aar_data.json";
const token = "your_personal_access_token";  // Replace with your actual token

// Function to load AAR data
async function loadAARs() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    
    try {
        // Fetch the file content from GitHub
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const fileData = await response.json();
        const decodedContent = JSON.parse(decodeURIComponent(escape(atob(fileData.content))));

        const aarList = document.getElementById("aar-list");
        if (!aarList) {
            console.error("Error: 'aar-list' element not found.");
            return;
        }

        aarList.innerHTML = ""; // Clear existing content

        decodedContent.forEach((aar) => {
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

document.addEventListener("DOMContentLoaded", loadAARs);
