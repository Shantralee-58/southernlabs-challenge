const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Read DB safely
function readDB() {
    try {
        const raw = fs.readFileSync(dbPath, "utf8");
        const data = JSON.parse(raw || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// Write DB safely
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Submit endpoint
app.post("/submit", async (req, res) => {
    const { email, level, passed, duration } = req.body;
    const data = readDB();
    const submission = { id: uuidv4(), email, level, passed, duration, time: new Date() };
    data.push(submission);
    writeDB(data);

    // Send email to student + admin
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // replace with your SMTP
        port: 587,
        secure: false,
        auth: { user: "idah@southernlabs.com", pass: "yourpassword" }
    });

    const message = {
        from: "idah@southernlabs.com",
        to: `${email},idah@southernlabs.com`,
        subject: `SouthernLabs Level ${level} ${passed ? "Passed ✅" : "Failed ❌"}`,
        text: `Hello!\n\nLevel: ${level}\nResult: ${passed ? "Passed ✅" : "Failed ❌"}\nDuration: ${duration} seconds\n\nKeep learning!`
    };

    transporter.sendMail(message).catch(console.log);

    res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

