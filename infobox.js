        /*Show/Hide Info-box*/
        
        function toggleInfo() {
            var infoBox = document.getElementsByClassName("info-box")[0];
            if (infoBox.style.display === "block" || infoBox.style.display === "") {
                infoBox.style.display = "none";
            } else {
                infoBox.style.display = "block";
            }
        }