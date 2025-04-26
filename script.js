const isUnderMaintenance = true; // toggle to true for maintenance mode

window.addEventListener('DOMContentLoaded', () => {
    if (isUnderMaintenance) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h1 style="color: #d4af37; font-size: 2rem;">⚠️ SORRY, WE ARE CURRENTLY UNDER MAINTENANCE ⚠️</h1>
                    <div class="discord-widget">
                    <iframe src="https://discord.com/widget?id=1348898559436787792&theme=dark"
                            allowtransparency="true"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
                    </iframe>
                    </div>
            </div>
        `;
    }
});
