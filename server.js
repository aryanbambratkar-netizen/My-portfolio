const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Serve your portfolio files
app.use(express.static(__dirname));

// Explicitly send index.html when visiting /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Test backend API
app.get("/api/about", (req, res) => {
    res.json({
        name: "Aryan Bambratkar",
        role: "Computer Technology Student",
        location: "Nagpur"
    });
});
app.use(express.json());

app.post("/api/contact", (req, res) => {

    const { name, email, message } = req.body;

    console.log("----- New Contact Message -----");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.json({
        success: true,
        message: "Your message was received!"
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
