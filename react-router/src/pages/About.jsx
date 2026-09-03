import { Link } from 'react-router-dom'

const routerConcepts = [
  {
    concept: 'BrowserRouter',
    path: null,
    description: 'Wraps the whole app. Intercepts URL changes so React handles navigation instead of the browser.',
  },
  {
    concept: 'Route + Outlet (Layout)',
    path: null,
    description: 'The Navbar lives in a Layout route. <Outlet /> renders the matched child — no duplication across pages.',
  },
  {
    concept: 'Dynamic Route — :id',
    path: '/jobs/1',
    description: 'useParams() reads the :id segment. /jobs/1, /jobs/2, /jobs/3 all use the same component.',
  },
  {
    concept: 'Dynamic Route — :slug',
    path: '/companies/stripe',
    description: 'Same pattern with a slug instead of a numeric ID. /companies/stripe vs /companies/figma.',
  },
  {
    concept: 'useSearchParams',
    path: '/jobs?q=react&type=Full-time',
    description: 'The Jobs search bar writes to the URL. Filters are shareable — paste the URL and the search is preserved.',
  },
  {
    concept: 'useNavigate(-1)',
    path: null,
    description: 'The Back button on Job Detail and Company Detail uses navigate(-1) — equivalent to the browser\'s back button.',
  },
  {
    concept: 'NavLink active styling',
    path: null,
    description: 'The navbar links use NavLink with a className function that receives { isActive } to highlight the current page.',
  },
  {
    concept: '404 Catch-all',
    path: '/anything-random',
    description: 'A <Route path="*"> catches every unmatched URL and renders the NotFound page.',
  },
]

export default function About() {
  return (
    <div className="max-w-2xl">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-2xl text-white p-10 mb-10">
        <h1 className="text-3xl font-black mb-3">About DevBoard</h1>
        <p className="text-indigo-200 leading-relaxed">
          DevBoard is a teaching project built to demonstrate React Router v6 and controlled forms with Tailwind CSS.
          Every page you navigate to in this app illustrates a different routing concept.
        </p>
      </div>

      {/* React Router concepts */}
      <h2 className="text-lg font-semibold text-gray-800 mb-5">React Router concepts in this app</h2>

      <div className="space-y-3 mb-10">
        {routerConcepts.map(item => (
          <div key={item.concept} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="font-semibold text-gray-800 text-sm">{item.concept}</p>
              {item.path && (
                <Link
                  to={item.path}
                  className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-mono hover:bg-indigo-100 transition-colors shrink-0"
                >
                  {item.path}
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Tech Stack</h2>
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'React 18', desc: 'UI library' },
          { name: 'React Router 6', desc: 'Routing' },
          { name: 'Tailwind CSS', desc: 'Styling' },
          { name: 'Vite', desc: 'Build tool' },
          { name: 'localStorage', desc: 'Persistence' },
          { name: 'useSearchParams', desc: 'URL state' },
        ].map(tech => (
          <div key={tech.name} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <p className="font-semibold text-gray-800 text-sm">{tech.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{tech.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
