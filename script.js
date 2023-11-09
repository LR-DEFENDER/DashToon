const userInputArray = [];
const generateButton = document.getElementById("generate-comic");
const comicStrip = document.getElementById("comic-strip");

generateButton.addEventListener("click", () => {
    userInputArray.length = 0; // Clear the array
    for (let i = 1; i <= 10; i++) {
       const inputField = document.getElementById(`input-${i}`);
        const userInput = inputField.value;
        console.log(userInput);
        userInputArray.push(userInput);
    }
    generateComicStripWithLoadingIcons();
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
    comicStrip.innerHTML = ""; // Clear previous comic strip

    for (const userInput of userInputArray) {
        const image = await query({ "inputs": userInput }); // Call the query function

        // Create an image element for each panel of the comic
        const comicPanel = document.createElement("img");
        comicPanel.src = URL.createObjectURL(image);
        comicPanel.alt = userInput; // Set alt text to the user's input

        // Append the image to the comic strip
        comicStrip.appendChild(comicPanel);
    }
}

function generateComicStripWithLoadingIcons() {
    comicStrip.innerHTML = ""; // Clear previous comic strip

    for (let i = 0; i < 10; i++) {
        // Create an image element for each panel with a loading icon
        const comicPanel = document.createElement("img");
        comicPanel.src = 'loading-icon.gif'; // Replace 'loading-icon.gif' with your loading icon URL
        comicPanel.alt = 'Loading...';

        // Append the image to the comic strip
        comicStrip.appendChild(comicPanel);
       

        // Generate image for the panel
        generateImageForPanel(comicPanel, userInputArray[i], i);
    }
}

// Function to generate image for a panel
async function generateImageForPanel(comicPanel, userInput, panelIndex) {
    const image = await query({ "inputs": userInput });

    // Replace the loading icon with the actual image
    comicPanel.src = URL.createObjectURL(image);
    comicPanel.alt = userInput;
    if (panelIndex === 9) {
        // Do something when the comic strip is fully loaded
    }
}