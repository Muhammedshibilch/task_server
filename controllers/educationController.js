const educations = require('../model/educationModel');

exports.addEducationController = async (req, res) => {
  console.log("Inside addEducationController");
  const userId = req.userId; // Ensure this is correctly set by jwtMiddleware
  console.log('User ID:', userId);
  console.log('Request Body:', req.body);

  const { collegeName, university, degree, course, studentStatus, startedDate, endDate, cgpa } = req.body;

  try {
    const existingEducation = await educations.findOne({ degree, userId });
    if (existingEducation) {
      return res.status(400).json({ message: "Education Already exists... Please upload another!!" });
    }

    const newEducation = new educations({
      collegeName,
      university,
      degree,
      course,
      studentStatus,
      startedDate,
      endDate,
      cgpa,
      userId,
    });

    await newEducation.save();
    res.status(200).json(newEducation);
  } catch (err) {
    console.error('Error in addEducationController:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};





// ✅ Get all education details
exports.getAllEducationController = async (req, res) => {
    console.log("Inside getAllEducationController");
    
    try {
        const userId = req.userId; // Assuming authentication middleware sets req.userId
        const educationData = await educations.find({ userId });

        if (educationData.length === 0) {
            return res.status(404).json({ message: "No education details found!" });
        }

        res.status(200).json(educationData);
    } catch (error) {
        console.error("Error fetching education details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
