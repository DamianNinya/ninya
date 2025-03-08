// Utility function to fetch the GitHub token from environment variables (Example only; adjust as needed for your setup)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "removed";  // Make sure to set the token in environment variables

const GITHUB_API_URL = "https://api.github.com";
const REPO = "DamianNinya/ninya";
const FILE_PATH = "aar_data.json";
const BRANCH = "main"; // Change if using another branch

// Utility function to update the JSON file on GitHub
async function updateAARData(newData) {
    try {
        // Step 1: Fetch the existing JSON file from GitHub
        const response = await fetch(`${GITHUB_API_URL}/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json",
            }
        });

        // Check if the response is not OK (failed to fetch)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch file: ${response.statusText}. ${errorData.message}`);
        }

        const fileData = await response.json();
        const sha = fileData.sha; // We need the sha to update the file

        // Step 2: Prepare the data to be updated
        const updatedData = {
            ...newData,
        };

        // Step 3: Commit the changes back to GitHub
        const commitResponse = await fetch(`${GITHUB_API_URL}/repos/${REPO}/contents/${FILE_PATH}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json",
            },
            body: JSON.stringify({
                message: "Update AAR data",
                committer: {
                    name: "Black-Viper Bot", // Adjust the name as needed
                    email: "your-email@example.com" // Adjust the email as needed
                },
                content: btoa(JSON.stringify(updatedData)), // Convert the JSON data to base64
                sha: sha, // Attach the sha of the existing file
            })
        });

        // Check if commit response is not OK (failed to update)
        if (!commitResponse.ok) {
            const commitErrorData = await commitResponse.json();
            throw new Error(`Failed to update file: ${commitResponse.statusText}. ${commitErrorData.message}`);
        }

        const commitData = await commitResponse.json();
        console.log("AAR data committed successfully:", commitData);
        alert("AAR submitted successfully!");
    } catch (error) {
        console.error("Error updating AAR data:", error);
        alert("Failed to submit AAR.");
    }
}

// Wait for the DOM to load before interacting with it
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitAAR");
    if (!submitButton) {
        console.error("Error: 'submitAAR' element not found.");
        return;
    }

    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const missionName = document.getElementById("mission_name").value.trim();
        const teamLeader = document.getElementById("team_leader").value.trim();
        const enemyKills = document.getElementById("enemy_kills").value.trim();
        const casualties = document.getElementById("casualties").value.trim();
        const technicals = document.getElementById("technicals").value.trim();
        const hvtsKilled = document.getElementById("hvts_killed").value.trim();
        const steps = document.getElementById("steps").value.trim().split("|").map(step => step.trim()).filter(step => step);

        if (!missionName || !teamLeader || !enemyKills || !technicals || !steps.length) {
            alert("Please fill out all required fields.");
            return;
        }

        const newAARData = {
            missionName,
            author: teamLeader,
            missionSteps: steps,
            notes: casualties || "No additional notes",
            enemyKills: enemyKills,
            technicalsDestroyed: technicals,
            hvtsKilled: hvtsKilled,
            timestamp: new Date().toISOString(),
        };

        // Call the update function
        await updateAARData(newAARData);

        // Reset the form
        document.getElementById("aar-form").reset();
    });
});
