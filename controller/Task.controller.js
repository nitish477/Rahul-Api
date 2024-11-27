import Task from './../modals/Task.modal.js';
import User from './../modals/User.modal.js';

export const createTask = async (req, res) => {
  const { taskName, description, assignedTo, status, createdBy } = req.body;

  try {
    const member = await User.findById(assignedTo);
    if (!member) {
      return res.status(400).json({ message: 'Assigned user not found' });
    }

    const task = await Task.create({
      taskName,
      description,
      assignedTo,
      status,
      createdBy, // Ensure to pass `createdBy` from the request body
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ assignedTo: userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status || task.status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

