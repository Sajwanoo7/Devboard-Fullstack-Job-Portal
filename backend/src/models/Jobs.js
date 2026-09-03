const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,   
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: Number,
        required: true,
    },
     type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
    default: 'Full-time',
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);





// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   salary: { type: String, required: true },
//   type: {
//     type: String,
//     enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
//     default: 'Full-time',
//   },
//   tags: [String],
//   description: String,
//   requirements: [String],
//   color: String,
//   slug: { type: String, unique: true },
// }, { timestamps: true })
