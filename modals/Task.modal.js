import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Please provide a task name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a task description'],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please assign this task to a user'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must be created by an admin'],
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
