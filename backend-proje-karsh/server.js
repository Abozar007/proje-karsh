const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./authMiddleware");


const app = express();
const PORT =  process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "abozar12345";
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URIل, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String, 
  phone: String,   
  }, {timestamps: true});
  
const User = mongoose.model("User", userSchema);

// ثبت‌نام
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ورود
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "This is a protected profile route",
      userId: user._id,
      name: user.name,
      email: user.email,
      address: user.address || "",
      phone: user.phone || "",
      joinDate: user.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error getting profile" });
  }
});
//update
app.put("/profile", verifyToken, async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email, address, phone },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating profile" });
  }
});

// راه‌اندازی سرور
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
