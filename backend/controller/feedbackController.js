const Place = require('../Model/placeModel'); // Import the Place model
const User = require('../Model/userModel'); // Import the User model

const addFeedback = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the authenticated user
        const { placeId, comment,image } = req.body; // Destructure placeId and comment directly

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the place exists
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        // Create feedback object
        const feedbackEntry = {
            user: userId,
            comment,
            image
        };

        // Add feedback to the place
        place.feedback.push(feedbackEntry);

        // Update the number of feedback for the place
        place.numberOfFeedback = place.numberOfFeedback+1;

        // Save the updated place with feedback
        await place.save();

        res.status(201).json({ message: 'Feedback added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addFeedback };