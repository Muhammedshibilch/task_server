const users = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, number, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json("User already exists... Please login.");
        }

        // ✅ Hash password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new users({
            username, 
            email, 
            number, 
            password: hashedPassword,  // ✅ Store the hashed password
            dob: "", gender: "", aadhar: "", address: "", state: "", district: "", pincode: "", parentName: ""
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json("Server Error");
    }
};






exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    
    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            console.log("User not found!");
            return res.status(404).json("User not found! Please register.");
        }

        console.log(`User found: ${existingUser.email}`);

        // ✅ Check if stored password is hashed
        if (!existingUser.password.startsWith("$2b$")) {
            console.log("Stored password is not hashed! Re-registering is required.");
            return res.status(500).json("Server Error: Stored password is not hashed. Please register again.");
        }

        // ✅ Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            console.log("Password mismatch!");
            return res.status(401).json("Invalid email or password.");
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWTPASSWORD,
            { expiresIn: "1h" }
        );

        console.log("Login successful!");
        res.status(200).json({
            message: "Login successful!",
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                number: existingUser.number,
            },
            token
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json("Internal Server Error.");
    }
};


// Update User
exports.editUserController = async (req, res) => {
    console.log("Inside editUserController");
    const userId = req.userId; // JWT decoded userId
    const { username, email, number, dob, gender, aadhar, address, state, district, pincode, parentName } = req.body;
    
    try {
      const updatedUser = await users.findByIdAndUpdate(
        { _id: userId }, // Update user by their ID
        {
          username, email, number, dob, gender, aadhar, address, state, district, pincode, parentName
        },
        { new: true } // Return the updated user
      );
  
      res.status(200).json(updatedUser); // Return updated user
    } catch (err) {
      res.status(401).json({ message: "Error updating user", error: err });
    }
  };

  
//   get userdetails
// Get User Profile
exports.getUserProfile = async (req, res) => {
    const userId = req.userId; // From jwtMiddleware
    try {
        const user = await users.findById(userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send the full user profile
        res.status(200).json({
            username: user.username,
            email: user.email,
            number: user.number,
            dob: user.dob,       // Date of Birth
            gender: user.gender, // Gender
            aadhar: user.aadhar, // Aadhar
            address: user.address // Address
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
