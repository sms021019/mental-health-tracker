const User = require('../models/user'); // Import your User model

const createUser = async (req, res) => {
    console.log("CREATING USER");
    const { firstname, lastname, email, pwd, gender, age, marriageStatus, ethnicity, occupation, pronoun } = req.body;

    try {
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
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
            pronoun
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the newly created user
        res.json(savedUser);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the fetched user
        res.json(fetchedUser);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateUser = async (req, res) => {
    // Logic to update a user goes here
    const userId = req.params.id;
    const { username, email, password } = req.body;
    console.log("UPDATING USER: ", userId);

    try {
        // Find the user by ID
        const userToUpdate = await User.findById(userId);

        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user properties
        userToUpdate.username = username || userToUpdate.username;
        userToUpdate.email = email || userToUpdate.email;
        userToUpdate.password = password || userToUpdate.password;

        // Save the updated user to the database
        const updatedUser = await userToUpdate.save();

        // Respond with the updated user
        res.json(updatedUser);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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


module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    getUser: getUser,
    getAllUsers: getAllUsers
};