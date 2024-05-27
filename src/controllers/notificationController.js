const Notification = require("../models/notification");
const jwt = require("jsonwebtoken");

exports.getNotifications = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decoded.user.email;
    console.log("Decoded email:", email);

    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    try {
        const skip = (page - 1) * pageSize;
        const notifications = await Notification.find({ email: email })
                                                .skip(skip)
                                                .limit(pageSize)
                                                .exec();
        const total = await Notification.countDocuments({ email: email });

        if (!notifications.length) {
            return res.status(404).send({ message: "No notifications found for this user." });
        }

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
    console.log("Received notification data:", req.body);
    Notification.create(req.body)
      .then((notification) => res.status(200).json(notification))
      .catch((err) => res.status(500).json({ message: err.message }));
};
