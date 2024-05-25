const Notification = require("../models/notification");
const jwt = require("jsonwebtoken");

exports.getNotifications = async (req, res) => {
/*     const { email } = req.body; // Assuming email is passed as a URL parameter*/   
    const authHeader  = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decoded.user.email;
    console.log(decoded);

    const page = parseInt(req.query.page, 10) || 1; // Page number, default is 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Number of items per page, default is 10

    try {
        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;

        // Find notifications and apply pagination
        const notifications = await Notification.find({ email: email })
                                                .skip(skip)
                                                .limit(pageSize)
                                                .exec();

        // Count the total number of documents for the user, to calculate total pages
        const total = await Notification.countDocuments({ email: email });

        if (!notifications.length) {
            return res.status(404).send({ message: "No notifications found for this user." });
        }

        // Send the paginated list of notifications and pagination details
        res.status(200).send({
            message: "Notifications retrieved successfully",
            notifications: notifications,
            currentPage: page,
            totalPages: Math.ceil(total / pageSize),
            totalNotifications: total
        });
    } catch (error) {
        console.error("Error retrieving notifications:", error);
        res.status(500).send({ message: "Server error" });
    }
};


exports.postNotification = async (req, res, next) => {
    Notification.create(req.body)
      .then((Notification) => res.status(200).json(Notification))
      .catch((err) => res.status(500).json({ message: err.message }));
};