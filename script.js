const userInputArray = [];
const generateButton = document.getElementById("generate-comic");
const comicStrip = document.getElementById("comic-strip");

generateButton.addEventListener("click", () => {
    userInputArray.length = 0; // Clear the array
    for (let i = 1; i <= 10; i++) {
        const inputField = document.getElementById(`input-${i}`);
        const userInput = inputField.value;
        console.log(userInput);
        if (userInput != "") {
            userInputArray.push(userInput);
        }
       
    }
    if (userInputArray.length == 10) {
         for (let i = 1; i <= 10; i++) {
           const comicPanel = document.getElementById(`img${i}`);
           comicPanel.setAttribute("width", "100%");
           comicPanel.setAttribute("height", "100%");
           comicPanel.src = "./loading_colorful.gif";
          
         }
       generateComicStrip();
    } else {
        alert("Please fill out all fields before submitting.");
     }
});
async function query(data) {
	const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept": "image/png",
				"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
async function generateComicStrip() {
    // comicStrip.innerHTML = ""; // Clear previous comic strip
    if (userInputArray.length < 10) { }
    else {
        let i = 1;
        for (const userInput of userInputArray) {
            console.log(`Loading ${i}`);
            const comicPanel = document.getElementById(`img${i}`);
            comicPanel.src = "./loading_circle_strip.gif";
            const image = await query({ "inputs": userInput }); 

            comicPanel.setAttribute("width", "100%");
            comicPanel.setAttribute("height", "100%");
            comicPanel.src = URL.createObjectURL(image);
            comicPanel.alt = userInput;
            i++;
        }
    }
}
