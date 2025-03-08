<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Black Viper AAR</title>
  <link rel="stylesheet" href="styles.css" />
  <style>
    /* Adjust styles for tabs to match your global CSS */
    .tabs {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      background-color: #1e1e1e;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    .tab {
      padding: 15px 20px;
      color: #e0e0e0;
      cursor: pointer;
      text-align: center;
      font-weight: bold;
      background-color: #2c2c2c;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }
    .tab:hover {
      background-color: #64b5f6;
    }
    .tab.active {
      background-color: #64b5f6;
      color: #121212;
    }
    .tab-content {
      display: none;
      padding: 20px;
      background-color: #2c2c2c;
      border-radius: 8px;
      margin-top: 20px;
    }
    .tab-content.active {
      display: block;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    table, th, td {
      border: 1px solid #444;
    }
    th, td {
      padding: 10px;
      text-align: center;
    }
    th {
      background-color: #333;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to Black Viper After-Action Reports</h1>
  </header>
  <nav>
    <a href="aar_list.html">View AARs</a>
    <a href="form.html">Submit AAR</a>
  </nav>

  <!-- Tab navigation -->
  <div class="tabs">
    <div class="tab active" id="pmcTab">PMC Member List</div>
    <div class="tab" id="dressCodeTab">Dress Code</div>
    <div class="tab" id="weaponsLoadoutTab">Weapons Loadout</div>
    <div class="tab" id="utilityLoadoutTab">Utility Loadout</div>
  </div>

  <!-- Tab content -->
  <div class="tab-content active" id="pmcMemberList">
    <h2>PMC Member List</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Callsign</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alex.xx366</td>
          <td>01 (Actual)</td>
          <td>Commander</td>
        </tr>
        <tr>
          <td>mosescatholica</td>
          <td>SNAKE (Actual)</td>
          <td>Commander</td>
        </tr>
        <tr>
          <td>betterpupplex</td>
          <td>Hawk</td>
          <td>Private/Assault</td>
        </tr>
        <tr>
          <td>Ninya</td>
          <td>Hitman</td>
          <td>Private/Medic</td>
        </tr>
        <tr>
          <td>Penguin</td>
          <td>Penguin</td>
          <td>N/A</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="tab-content" id="dressCode">
    <h2>Dress Code</h2>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Outfit Style</th>
          <th>Plate Carrier</th>
          <th>Outfit Color</th>
          <th>Accessories Color</th>
          <th>Face</th>
          <th>Eyewear</th>
          <th>Headwear</th>
          <th>Gloves</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Private to Staff Sergeant</td>
          <td>Military Long Sleeve & Tucked</td>
          <td>Plate Carrier 2</td>
          <td>Multi Camo Black</td>
          <td>Grey/Black</td>
          <td>Masked</td>
          <td>Tinted Goggles</td>
          <td>Helmet Quad NVG Camo</td>
          <td>Covered</td>
        </tr>
        <tr>
          <td>Sergeant First Class to Commander</td>
          <td>Military Tucked/Rolled</td>
          <td>Plate Carrier 2</td>
          <td>Multi Camo Black</td>
          <td>Grey/Black</td>
          <td>Masked</td>
          <td>Tinted Goggles</td>
          <td>Helmet Quad NVG Camo</td>
          <td>Covered</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="tab-content" id="weaponsLoadout">
    <h2>Weapons Loadout</h2>
    <table>
      <thead>
        <tr>
          <th>Role</th>
          <th>Primary</th>
          <th>Sight</th>
          <th>Grip</th>
          <th>Offset Sight</th>
          <th>Muzzle</th>
          <th>Secondary</th>
          <th>Secondary Sight</th>
          <th>Secondary Muzzle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Assault</td>
          <td>M4A1 Classic</td>
          <td>1-3x Holosight</td>
          <td>Optional</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
          <td>G18C</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
        </tr>
        <tr>
          <td>Breacher</td>
          <td>M4A1 Classic</td>
          <td>1-3x Holosight</td>
          <td>Optional</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
          <td>G18C</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
        </tr>
        <tr>
          <td>Medic</td>
          <td>M4A1 Classic</td>
          <td>1-3x Holosight</td>
          <td>Optional</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
          <td>G18C</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
        </tr>
        <tr>
          <td>Pointman</td>
          <td>M4A1 Classic</td>
          <td>1-3x Holosight</td>
          <td>Optional</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
          <td>G18C</td>
          <td>Optional</td>
          <td>Muzzle 02</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="tab-content" id="utilityLoadout">
    <h2>Utility Loadout</h2>
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Utility 1</th>
          <th>Utility 2</th>
          <th>Shoulder Utility</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Assault</td>
          <td>Flash-Bangs</td>
          <td>Syringes</td>
          <td>Shotgun</td>
        </tr>
        <tr>
          <td>Breacher</td>
          <td>Breach Charges</td>
          <td>Flash-Bangs</td>
          <td>Breach Shotgun</td>
        </tr>
        <tr>
          <td>Medic</td>
          <td>Syringes</td>
          <td>Syringes</td>
          <td>None</td>
        </tr>
        <tr>
          <td>Pointman</td>
          <td>Flash-Bangs</td>
          <td>Smoke Grenade</td>
          <td>Snake Camera</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    // Switch tabs functionality
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.id.replace('Tab', '')).classList.add('active');
      });
    });
  </script>
</body>
</html>
