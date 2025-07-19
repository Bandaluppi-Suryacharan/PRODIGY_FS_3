const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/order", auth, (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: "Address is required." });
  }

  // You can store order in DB if needed here
  res.status(200).json({
    message: "Order placed successfully",
    user: userId,
    address,
    status: "On the Way",
  });
});

module.exports = router;
