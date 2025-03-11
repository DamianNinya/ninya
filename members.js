document.addEventListener("DOMContentLoaded", function() {
    // Hardcoded profiles data for testing (this would be dynamic in a real scenario)
    const profiles = [
      {
        username: 'username1',
        rank: 'Commander',
        image: 'Members/username1/commander.png'
      },
      {
        username: 'username2',
        rank: 'Private',
        image: 'Members/username2/private.gif'
      },
      {
        username: 'username3',
        rank: 'Private First Class',
        image: 'Members/username3/private-first-class.png'
      }
      // Add more profiles as necessary
    ];
  
    const profileContainer = document.getElementById('profile-container');
  
    // Loop through each profile and create the profile card
    profiles.forEach(profile => {
      const profileCard = document.createElement('div');
      profileCard.classList.add('profile-card');
  
      profileCard.innerHTML = `
        <img src="${profile.image}" alt="${profile.username}'s profile picture" />
        <div class="username">${profile.username}</div>
        <div class="rank">${profile.rank}</div>
      `;
  
      profileContainer.appendChild(profileCard);
    });
  });
  