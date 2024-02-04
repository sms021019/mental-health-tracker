const User = require("../models/user"); // Import your User model

const createUser = async (req, res) => {
  console.log("CREATING USER");
  const {
    firstname,
    lastname,
    email,
    pwd,
    gender,
    age,
    marriageStatus,
    ethnicity,
    occupation,
    pronoun,
  } = req.body;

  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      firstname,
      lastname,
      email,
      pwd,
      gender,
      age,
      marriageStatus,
      ethnicity,
      occupation,
      pronoun,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the newly created user
    res.json(savedUser);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  // Logic to get a user goes here
  const userId = req.params.id;
  console.log("GETTING A USER: ", userId);

  try {
    // Fetch the user from the database by ID
    const fetchedUser = await User.findById(userId);

    if (!fetchedUser) {
      // If user not found
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the fetched user
    res.json(fetchedUser);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  // Logic to update a user goes here
  const userId = req.params.id;
  const {
    firstname,
    lastname,
    email,
    pwd,
    gender,
    age,
    marriageStatus,
    ethnicity,
    occupation,
    pronoun,
    userData,
  } = req.body;

  console.log("UPDATING USER: ", userId);

  try {
    // Find the user by ID
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user properties
    userToUpdate.firstname = firstname || userToUpdate.firstname;
    userToUpdate.lastname = lastname || userToUpdate.lastname;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.pwd = pwd || userToUpdate.pwd;
    userToUpdate.gender = gender || userToUpdate.gender;
    userToUpdate.age = age || userToUpdate.age;
    userToUpdate.marriageStatus = marriageStatus || userToUpdate.marriageStatus;
    userToUpdate.ethnicity = ethnicity || userToUpdate.ethnicity;
    userToUpdate.occupation = occupation || userToUpdate.occupation;
    userToUpdate.pronoun = pronoun || userToUpdate.pronoun;
    userToUpdate.userData = userData || userToUpdate.userData;

    console.log("userData: ", userData);

    // Save the updated user to the database
    const updatedUser = await userToUpdate.save();

    // Respond with the updated user
    res.json(updatedUser);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  console.log("GETTING ALL USERS");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  console.log("USER LOGIN");

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    if (password !== user.pwd) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token for authentication
    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    const token = user._id;

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  getUser: getUser,
  getAllUsers: getAllUsers,
  loginUser: loginUser,
};
