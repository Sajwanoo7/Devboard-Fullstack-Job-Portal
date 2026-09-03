import { Link } from 'react-router-dom'
import { jobs } from '../data/jobs'
import useSavedJobStore from '../store/savedJobStore'

const JobCard = ({ job }) => {
  const isSaved = useSavedJobStore((state) => state.isSaved(job.id))
  const toggle = useSavedJobStore((state) => state.toggle)
  const {getJobs} = useSavedJobStore(state => state)

  const data = getJobs(); //

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-10 h-10 ${job.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
          {job.company[0]}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">{job.title}</h2>
          <p className="text-sm text-indigo-600">{job.company}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">📍 {job.location} · 💰 {job.salary}</p>
      <div className="flex items-center justify-between">
        <Link to={`/jobs/${job.id}`} className="text-sm font-medium text-indigo-600">
          View details →
        </Link>
        <button
          onClick={() => toggle(job.id)}
          className={`text-xl transition-all hover:scale-110 ${isSaved ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
        >
          {isSaved ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}

const Jobs = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Open Positions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  )
}

export default Jobs