const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.text()); // Parse raw text

// JSON validation function
function validateJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return { isValid: true, message: "Valid JSON" };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
}

// Home endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the JSON Validator API!",
    usage: "Send a POST request to /validate with JSON data.",
  });
});

// JSON validation endpoint
app.post("/validate", (req, res) => {
  const rawData = req.body;

  if (!rawData) {
    return res.status(400).json({ success: false, error: "No JSON data provided." });
  }

  const validationResult = validateJSON(rawData);

  if (validationResult.isValid) {
    res.json({ success: true, message: validationResult.message });
  } else {
    res.status(400).json({ success: false, error: validationResult.error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`JSON Validator API is running on http://localhost:${port}`);
}); 
  
