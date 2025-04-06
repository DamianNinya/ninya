document.addEventListener("DOMContentLoaded", function() {
    var coll = document.querySelectorAll(".collapsible");

    coll.forEach(function(btn) {
        var content = btn.nextElementSibling;

        // Ensure all sections are closed on page load
        content.style.maxHeight = null;
        content.style.paddingTop = "0";
        content.style.paddingBottom = "0";

        btn.addEventListener("click", function() {
            this.classList.toggle("active");

            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Close smoothly
                content.style.paddingTop = "0"; 
                content.style.paddingBottom = "0"; 
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Open smoothly
                content.style.paddingTop = "10px"; 
                content.style.paddingBottom = "10px"; 
            }
        });
    });
});
