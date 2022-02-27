const mongoose = require("mongoose");

// const Task = mongoose.model('Task', {
//   isCompleted: {
//     type: Boolean,
//     default: false
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   }
// });

const taskSchema = new mongoose.Schema({
  isCompleted: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;