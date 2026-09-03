const express = require('express')
const Job = require('../models/Jobs')
const protect = require('../middleware/auth')

const router = express.Router()
// create context for jobs

router.get('/', protect, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router