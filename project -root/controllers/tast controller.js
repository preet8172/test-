const Task = require("../models/task.model");


// ==========================================
// CREATE TASK
// POST /tasks
// ==========================================

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate
    } = req.body;

    // Check title uniqueness
    const existingTask = await Task.findOne({ title });

    if (existingTask) {
      return res.status(409).json({
        message: "Task title already exists"
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate: dueDate || null,
      isCompleted: false,
      completionDate: null
    });

    return res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task",
      error: error.message
    });
  }
};


// ==========================================
// GET ALL TASKS
// GET /tasks
// ==========================================

const getTasks = async (req, res) => {
  try {
    const { priority, status } = req.query;

    const filter = {};

    // Filter by priority
    if (priority) {
      if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
          message: "Invalid priority"
        });
      }

      filter.priority = priority;
    }

    // Filter by status
    if (status) {
      if (status === "completed") {
        filter.isCompleted = true;
      } 
      else if (status === "pending") {
        filter.isCompleted = false;
      } 
      else {
        return res.status(400).json({
          message: "Status must be completed or pending"
        });
      }
    }

    const tasks = await Task.find(filter);

    return res.status(200).json({
      count: tasks.length,
      tasks
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to get tasks",
      error: error.message
    });
  }
};


// ==========================================
// UPDATE TASK
// PATCH /tasks/:id
// ==========================================

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      priority,
      isCompleted
    } = req.body;

    const updateData = {};

    // -------------------------------
    // TITLE
    // -------------------------------

    if (title !== undefined) {
      const existingTask = await Task.findOne({
        title,
        _id: { $ne: id }
      });

      if (existingTask) {
        return res.status(409).json({
          message: "Task title already exists"
        });
      }

      updateData.title = title;
    }


    // -------------------------------
    // DESCRIPTION
    // -------------------------------

    if (description !== undefined) {
      updateData.description = description;
    }


    // -------------------------------
    // PRIORITY
    // -------------------------------

    if (priority !== undefined) {

      if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
          message: "Priority must be low, medium, or high"
        });
      }

      updateData.priority = priority;
    }


    // -------------------------------
    // COMPLETION
    // -------------------------------

    if (isCompleted !== undefined) {

      updateData.isCompleted = isCompleted;

      if (isCompleted === true) {
        updateData.completionDate = new Date();
      }

      if (isCompleted === false) {
        updateData.completionDate = null;
      }
    }


    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (error) {

    return res.status(500).json({
      message: "Failed to update task",
      error: error.message
    });

  }
};


// ==========================================
// DELETE TASKS
// DELETE /tasks?priority=high
// ==========================================

const deleteTasks = async (req, res) => {
  try {

    const { priority } = req.query;

    // Priority required
    if (!priority) {
      return res.status(400).json({
        message: "Priority is required"
      });
    }


    // Validate priority
    if (!["low", "medium", "high"].includes(priority)) {
      return res.status(400).json({
        message: "Invalid priority"
      });
    }


    // Bulk delete
    const result = await Task.deleteMany({
      priority
    });


    return res.status(200).json({
      message: "Tasks deleted successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {

    return res.status(500).json({
      message: "Failed to delete tasks",
      error: error.message
    });

  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTasks
};