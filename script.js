document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("farmer-form");
  const weatherInfo = document.getElementById("weather-info");
  const cropInfo = document.getElementById("crop-info");
  const cropImage = document.getElementById("crop-image");
  const suitabilityInfo = document.getElementById("suitability-info");
  const plantingAdvice = document.getElementById("planting-advice");
  const API_URL = "https://cropzy-backend-3.onrender.com"
  
  // Crop details including images and descriptions
  const cropDetails = {
    rice: {
      image: "assessets/image/paddy.webp", 
      details: "Rice is a water-intensive crop that thrives in warm, flooded fields.",
      waterLevel: "High",
      soilType: "Clay or loamy soil with good water retention.",
      humidity: "70% to 90%",
      season: "Summer",
      minTemperature: 20,
      maxTemperature: 35,
      diseases: "Bacterial blight: Use resistant varieties and copper fungicides.",
      fertilizer: "Apply NPK fertilizers."
    },
    wheat: {
      image: "assessets/image/wheat.webp",
      details: "Wheat grows best in temperate climates with moderate water needs.",
      waterLevel: "Moderate",
      soilType: "Well-drained loamy soil.",
      humidity: "50% to 70%",
      season: "Spring and Fall",
      minTemperature: 10,
      maxTemperature: 25,
      diseases: "Rust: Use resistant varieties and fungicides.",
      fertilizer: "Apply NPK fertilizers."
    },
    maize: {
      image: "assessets/image/maize.jpg",
      details: "Maize prefers warmer climates and well-drained soil.",
      waterLevel: "Moderate to High",
      soilType: "Fertile, well-drained soil.",
      humidity: "60% to 80%",
      season: "Summer",
      minTemperature: 15,
      maxTemperature: 30,
      diseases: "Corn blight: Use resistant varieties and fungicides.",
      fertilizer: "Apply NPK fertilizers."
    },
    soybeans: {
      image: "assessets/image/soybean.webp",
      details: "Soybeans are nitrogen-fixing and need well-drained soil.",
      waterLevel: "Moderate",
      soilType: "Loamy or sandy soil.",
      humidity: "60% to 80%",
      season: "Summer",
      minTemperature: 10,
      maxTemperature: 30,
      diseases: "Frogeye leaf spot: Use resistant varieties and fungicides.",
      fertilizer: "Apply NPK fertilizers."
    },
    potatoes: {
      image: "assessets/image/potato.jpg",
      details: "Potatoes need cool climates and sandy loam soil.",
      waterLevel: "Moderate",
      soilType: "Loose, well-drained sandy soil.",
      humidity: "60% to 70%",
      season: "Spring",
      minTemperature: 5,
      maxTemperature: 20,
      diseases: "Late blight: Use resistant varieties and fungicides.",
      fertilizer: "Apply NPK fertilizers."
    },
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    const location = document.getElementById("location").value; // Get the location from input
    const crop = document.getElementById("crop").value; // Get the selected crop

    try {
      // Make a request to the backend API
      const response = await fetch(`${API_URL}?location=${encodeURIComponent(location)}&crop=${encodeURIComponent(crop)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch insights");
      }

      const data = await response.json(); // Parse the JSON response

      // Display weather information
      weatherInfo.textContent = `Weather: ${data.weather}, Temperature: ${data.temperature}°C in ${data.location}.`;

      // Display crop details and image
      cropInfo.textContent = cropDetails[crop].details; // Get crop details from the object
      cropImage.src = cropDetails[crop].image; // Set the image source
      cropImage.alt = `${crop} image`; // Set alt text for the image

      // Add suitability information
      const suitabilityInfoText = `
        <strong>Water Level:</strong> ${cropDetails[crop].waterLevel}<br />
        <strong>Soil Type:</strong> ${cropDetails[crop].soilType}<br />
        <strong>Humidity:</strong> ${cropDetails[crop].humidity}<br />
        <strong>Suitable Season:</strong> ${cropDetails[crop].season}
      `;
      suitabilityInfo.innerHTML = suitabilityInfoText; // Populate suitability info

      // Check if it's a good time to plant
      const currentTemperature = data.temperature; // Current temperature from API
      const minTemperature = cropDetails[crop].minTemperature;
      const maxTemperature = cropDetails[crop].maxTemperature;

      // Determine if the conditions are suitable for planting
      let isSuitable = true;
      let reasons = [];

      // Check temperature suitability
      if (currentTemperature < minTemperature) {
        isSuitable = false;
        reasons.push(`Current temperature is too low. Ideal is between ${minTemperature}°C and ${maxTemperature}°C.`);
      } else if (currentTemperature > maxTemperature) {
        isSuitable = false;
        reasons.push(`Current temperature is too high. Ideal is between ${minTemperature}°C and ${maxTemperature}°C.`);
      }

      // Assuming humidity is provided from the API response
      const currentHumidity = data.humidity; 
      const idealHumidityRange = cropDetails[crop].humidity.split(" to ").map(h => parseInt(h));
      if (currentHumidity < idealHumidityRange[0] || currentHumidity > idealHumidityRange[1]) {
        isSuitable = false;
        reasons.push(`Current humidity (${currentHumidity}%) is outside the ideal range of ${cropDetails[crop].humidity}.`);
      }

      // Check soil type (assuming soil type can be fetched or predefined)
      const currentSoilType = "loamy"; // Example soil type, modify as needed
      const requiredSoilType = cropDetails[crop].soilType.toLowerCase().includes("loamy") ? "loamy" : cropDetails[crop].soilType.toLowerCase();
      
      // Check if the required soil type is present in the current soil type
      if (!currentSoilType.includes(requiredSoilType)) {
        isSuitable = false;
        reasons.push(`Current soil type (${currentSoilType}) is not suitable. It should be ${cropDetails[crop].soilType}.`);
      }

      // Display planting advice
      if (isSuitable) {
        plantingAdvice.textContent = `It is a good time to plant ${crop}.`;
      } else {
        plantingAdvice.textContent = `It is not a good time to plant ${crop}. ${reasons.join("<br>")}`;
      }

      // Display diseases and remedies
      const diseasesInfo = `
        <strong>Diseases:</strong> ${cropDetails[crop].diseases}<br />
        <strong>Recommended Fertilizer:</strong> ${cropDetails[crop].fertilizer}
      `;
      suitabilityInfo.innerHTML += `<br />${diseasesInfo}`; // Add diseases info

    } catch (error) {
      console.error("Error:", error);
      weatherInfo.textContent = "Error fetching weather data.";
      cropInfo.textContent = ""; // Clear previous crop info
      cropImage.src = ""; // Clear previous image
      suitabilityInfo.innerHTML = ""; // Clear previous suitability info
      plantingAdvice.textContent = ""; // Clear previous planting advice
    }
  });
});
