import { useParams, useNavigate, Link } from 'react-router-dom'
import { companies } from '../data/companies'
import { jobs } from '../data/jobs'

export default function CompanyDetail() {
  const { slug } = useParams()        // slug is a string — no Number() needed
  const navigate = useNavigate()
  const company = companies.find(c => c.slug === slug)
  const openRoles = jobs.filter(j => j.companySlug === slug)

  if (!company) return <p>Company not found.</p>

  return (
    <div className="max-w-2xl">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 mb-6">← Back</button>
      <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
      <p className="text-gray-600 mb-8">{company.description}</p>
      <h2 className="font-semibold mb-4">Open Roles ({openRoles.length})</h2>
      {openRoles.map(job => (
        <Link key={job.id} to={`/jobs/${job.id}`}
          className="block border rounded-xl px-5 py-4 mb-3 hover:border-indigo-200">
          <p className="font-medium">{job.title}</p>
          <p className="text-sm text-gray-500">{job.location} · {job.salary}</p>
        </Link>
      ))}
    </div>
  )
}