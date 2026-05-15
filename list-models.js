async function listModels() {
    const apiKey = "AIzaSyAI2OAMTkojHjaWErwRrcIZcwAXU16qrXQ";
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                console.log(`- ${m.name}`);
            });
        } else {
            console.log("No models found or error:", JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error listing models:", error.message);
    }
}

listModels();
