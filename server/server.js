require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = userResult.rows[0];

  console.log(user)

  if (!user) return res.status(401).json({ message: "User not found" });

//   const validPassword = await bcrypt.compare(password, user.password);

  if (user.password !== password) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
//   console.log(res)
});

app.get("/api/popups", async (req, res) => {
  try {
    const result = await pool.query("SELECT selector, content, display_order FROM popups");
    res.json({ steps: result.rows });
    console.log(result.rows)
  } catch (error) {
    console.error("Error fetching tour steps:", error);
    res.status(500).json({ error: "Failed to fetch tour steps" });
  }
});

// Protected Route
app.get("/api/dashboard", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "Protected data", user });
  });
});

// export async function GET() {
//   console.log("test")
//   try {
//     const result = await sql`SELECT selector, content FROM popups`; 
//     return NextResponse.json({ steps: result.rows });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch steps" }, { status: 500 });
//   }
// }


app.listen(5000, () => console.log("Server running on http://localhost:5000"));