import { Link } from 'react-router-dom'
import { companies } from '../data/companies'
import { jobs } from '../data/jobs'

const Companies = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Companies</h1>
      <p className="text-gray-500 text-sm mb-8">Explore teams that are actively hiring.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {companies.map(co => { // iterate over the companies and show them in a card format
          const openRoles = jobs.filter(j => j.companySlug === co.slug).length
          return (
            <Link
              key={co.slug}
              to={`/companies/${co.slug}`}
              className="bg-white border border-gray-100 rounded-xl p-6 hover:border-indigo-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 ${co.color} rounded-xl flex items-center justify-center text-white font-black text-2xl shrink-0`}>
                  {co.name[0]}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {co.name}
                  </h2>
                  <p className="text-sm text-gray-500">{co.industry} · {co.location}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                {co.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>👥 {co.size}</span>
                  <span>📅 Founded {co.founded}</span>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium">
                  {openRoles} open role{openRoles !== 1 ? 's' : ''}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Companies
