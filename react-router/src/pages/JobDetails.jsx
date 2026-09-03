import { useParams, Link, useNavigate } from 'react-router-dom'
import { jobs } from '../data/jobs'
import { useSavedJobs } from '../context/SavedJobsContext' 

 const  JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSaved, toggle } = useSavedJobs()
  const job = jobs.find(j => j.id === Number(id))

  // how every
  if (!job) {
    return (
      <div className="text-center mt-16">
        <p className="text-gray-500 text-lg mb-4">Job not found.</p>
        <Link to="/jobs" className="text-indigo-600 hover:underline">← Back to jobs</Link>
      </div>
    )
  }

  const saved = isSaved(job.id)
  const related = jobs.filter(j => j.companySlug === job.companySlug && j.id !== job.id)

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 ${job.color} rounded-xl flex items-center justify-center text-white font-black text-2xl shrink-0`}>
            {job.company[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
              <button
                onClick={() => toggle(job.id)}
                title={saved ? 'Remove from saved' : 'Save job'}
                className={`text-2xl transition-transform hover:scale-110 ${saved ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
              >
                {saved ? '♥' : '♡'}
              </button>
            </div>
            <Link
              to={`/companies/${job.companySlug}`}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
            >
              {job.company}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5 pl-18">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">{job.type}</span>
          <span>🕐 Posted {job.posted}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <h2 className="font-semibold text-gray-800 mb-2">About the Role</h2>
        <p className="text-gray-600 leading-relaxed mb-8">{job.description}</p>

        {/* <div className="flex gap-3">
          <Link
            to={`/apply/${job.id}`}
            className="flex-1 text-center bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Apply Now
          </Link>
          <button
            onClick={() => toggle(job.id)}
            className={`px-4 py-2.5 rounded-lg border font-medium text-sm transition-colors ${
              saved
                ? 'border-red-200 text-red-500 hover:bg-red-50'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {saved ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      */}
      </div>

      {/* More from this company */}
      {related.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            More from {job.company}
          </h2>
          <div className="space-y-2">
            {related.map(r => (
              <Link
                key={r.id}
                to={`/jobs/${r.id}`}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-indigo-200 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors text-sm">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-400">{r.location} · {r.type}</p>
                </div>
                <span className="text-sm text-gray-500">{r.salary}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetail;

