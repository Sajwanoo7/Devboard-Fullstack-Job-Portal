import { Link } from 'react-router-dom'
import { jobs } from '../data/jobs'
import useSavedJobStore from '../store/savedJobStore'

const  Saved = () =>  {
  const savedIds = useSavedJobStore((state) => state.savedIds)
  const toggle = useSavedJobStore((state) => state.toggle) // list of saved jobs
  const savedJobs = jobs.filter(j => savedIds.includes(j.id)) // traverse the list of all jobs to findout which jobs are saved by the user and create a new list of those jobs

  if (savedJobs.length === 0) {
    return (
      <div className="text-center mt-24">
        <p className="text-5xl mb-5">🔖</p>
        <h1 className="text-xl font-bold text-gray-700 mb-2">No saved jobs yet</h1>
        <p className="text-gray-400 mb-6">Hit the ♡ on any job to save it here.</p>
        <Link
          to="/jobs"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Browse Jobs
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Saved Jobs</h1>
      <p className="text-gray-500 text-sm mb-8">{savedJobs.length} saved position{savedJobs.length !== 1 ? 's' : ''}</p>

      <div className="space-y-3">
        {savedJobs.map(job => (
          <div
            key={job.id}
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-indigo-100 transition-all"
          >
            <div className={`w-10 h-10 ${job.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0`}>
              {job.company[0]}
            </div>

            <div className="flex-1 min-w-0">
              <Link
                to={`/jobs/${job.id}`}
                className="font-medium text-gray-800 hover:text-indigo-600 transition-colors"
              >
                {job.title}
              </Link>
              <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm text-gray-600 font-medium hidden sm:block">{job.salary}</span>
              <Link
                to={`/apply/${job.id}`}
                className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Apply
              </Link>
              <button
                onClick={() => toggle(job.id)}
                title="Remove from saved"
                className="text-red-400 hover:text-red-600 transition-colors text-xl"
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default Saved;