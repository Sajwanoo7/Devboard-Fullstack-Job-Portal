require('dotenv').config()
const mongoose = require('mongoose')
const Job = require('../models/Job')

const jobs = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Stripe',
    location: 'Remote',
    salary: '$150k – $180k',
    type: 'Full-time',
    tags: ['React', 'TypeScript', 'GraphQL'],
    description: 'Build the interfaces that millions of developers use every day.',
    requirements: ['5+ years React', 'TypeScript expert', 'GraphQL experience'],
    color: 'bg-indigo-500',
    slug: 'senior-frontend-engineer-stripe',
  },
  {
    title: 'Backend Engineer',
    company: 'Vercel',
    location: 'San Francisco, CA',
    salary: '$130k – $160k',
    type: 'Full-time',
    tags: ['Node.js', 'Go', 'PostgreSQL'],
    description: 'Scale the infrastructure powering Next.js deployments worldwide.',
    requirements: ['Node.js or Go', '3+ years backend', 'Distributed systems'],
    color: 'bg-blue-500',
    slug: 'backend-engineer-vercel',
  },
  {
    title: 'Full Stack Developer',
    company: 'Linear',
    location: 'Remote',
    salary: '$120k – $150k',
    type: 'Full-time',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    description: 'Help build the issue tracker beloved by top engineering teams.',
    requirements: ['React + Node full stack', 'PostgreSQL', 'Real-time features'],
    color: 'bg-purple-500',
    slug: 'full-stack-developer-linear',
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  await Job.deleteMany({})
  await Job.insertMany(jobs)
  console.log('Seeded', jobs.length, 'jobs')
  process.exit(0)
}

seed();