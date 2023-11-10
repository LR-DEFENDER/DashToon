const userInputArray = [];
const generateButton = document.getElementById("generate-comic");
const comicStrip = document.getElementById("comic-strip");

generateButton.addEventListener("click", () => {
    userInputArray.length = 0; // Clear the array
    for (let i = 1; i <= 10; i++) {
        const comicPanel = document.getElementById(`img${i}`);
        comicPanel.setAttribute("width","25%");
        comicPanel.setAttribute("height", "25%");
        comicPanel.src = "./Hourglass.gif";
        const inputField = document.getElementById(`input-${i}`);
        const userInput = inputField.value;
        console.log(userInput);
        userInputArray.push(userInput);
    }
    // generateComicStripWithLoadingIcons();
    generateComicStrip();
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
    let i = 1;
    for (const userInput of userInputArray) {
        console.log(`Loading ${i}`);
        const comicPanel = document.getElementById(`img${i}`);
        comicPanel.src="./ZZ5H.gif"
        const image = await query({ "inputs": userInput }); // Call the query function
        
        // Create an image element for each panel of the comic
        // const comicPanel = document.createElement("img");
        comicPanel.setAttribute("width","100%");
        comicPanel.setAttribute("height", "100%");
        comicPanel.src = URL.createObjectURL(image);
        comicPanel.alt = userInput; // Set alt text to the user's input
        
        // Append the image to the comic strip
        //comicStrip.appendChild(comicPanel);
        i++;
    }
}

// function generateComicStripWithLoadingIcons() {
//     comicStrip.innerHTML = ""; // Clear previous comic strip

//     for (let i = 0; i < 10; i++) {
//         // Create an image element for each panel with a loading icon
//         const comicPanel = document.createElement("img");
//         comicPanel.src = 'loading-icon.gif'; // Replace 'loading-icon.gif' with your loading icon URL
//         comicPanel.alt = 'Loading...';

//         // Append the image to the comic strip
//         comicStrip.appendChild(comicPanel);
       

//         // Generate image for the panel
//         generateImageForPanel(comicPanel, userInputArray[i], i);
//     }
// }
// function generateComicStripWithLoadingIcons() {
//   comicStrip.innerHTML = ""; // Clear previous comic strip

//   for (let i = 0; i < 10; i++) {
//     const inputField = document.getElementById(`input-${i + 1}`);
//     const userInput = inputField.value.trim(); // Get input text and remove leading/trailing spaces

//     if (userInput === "") {
//       // Handle empty input and highlight the empty input container
//       inputField.classList.add("empty-input");
//       return; // Stop generating the comic strip if any input is empty
//     } else {
//       // Create an empty image container with a loading icon
//       inputField.classList.remove("empty-input"); // Remove highlight
//       const comicPanel = document.createElement("img");
//       comicPanel.src = "loading-icon.gif"; // Replace 'loading-icon.gif' with your loading icon URL
//       comicPanel.alt = "Loading...";

//       // Append the image container to the comic strip
//       comicStrip.appendChild(comicPanel);
//     }
//   }
//}

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