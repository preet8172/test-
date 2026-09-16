const validateTask = (req, res, next) => {
  const { title, description, priority } = req.body;

  // Check required fields
  if (!title || !description || !priority) {
    return res.status(400).json({
      message: "Incomplete Data Received"
    });
  }

  // Check priority
  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium, or high"
    });
  }

  // Continue to controller
  next();
};

 module.exports = {
  validateTask
};