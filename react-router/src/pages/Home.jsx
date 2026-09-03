import { Link } from 'react-router-dom'
import { jobs } from '../data/jobs'
import { companies } from '../data/companies'

const remoteCount = jobs.filter(j => j.location.toLowerCase().includes('remote')).length

const Home = () => {
    return (
        <div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white text-center py-20 px-8 mb-8">
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
          Now Hiring
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          Find your next<br />frontend role
        </h1>
        <p className="text-indigo-200 text-lg mb-8 max-w-md mx-auto">
          Curated React and frontend jobs from the best product companies.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/jobs"
            className="bg-white text-indigo-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow"
          >
            Browse {jobs.length} Open Roles
          </Link>
          <Link
            to="/companies"
            className="bg-white/10 border border-white/30 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition-colors"
          >
            View Companies
          </Link>
        </div>
        </div>

        {/*stats*/}
        <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Open Roles', value: jobs.length },
          { label: 'Companies', value: companies.length },
           { label: 'Remote Positions', value: remoteCount },
        ].map(stat => ( // 3 labels for each label we have a div with the value and the label
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-3xl font-black text-indigo-600 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/*recently posted jobs*/}
        <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Recently Posted</h2>
          <Link to="/jobs" className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {jobs.slice(0, 4).map(job => (
            <Link // if this was real MFU logic
              key={job.id}
              to={`/jobs/${job.id}`}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-indigo-200 hover:shadow-sm transition-all group"
            >
              <div className={`w-10 h-10 ${job.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {job.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors truncate">
                  {job.title}
                </p>
                <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-gray-700">{job.salary}</p>
                <p className="text-xs text-gray-400">{job.posted}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

     {/*companies*/}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Featured Companies</h2>
          <Link to="/companies" className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {companies.map(co => (
            <Link
              key={co.slug}
              to={`/companies/${co.slug}`}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center gap-3 hover:border-indigo-200 hover:shadow-sm transition-all group text-center"
            >
              <div className={`w-12 h-12 ${co.color} rounded-xl flex items-center justify-center text-white font-black text-xl`}>
                {co.name[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors text-sm">
                  {co.name}
                </p>
                <p className="text-xs text-gray-400">{co.industry}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
        </div>
    );
}

export default Home;