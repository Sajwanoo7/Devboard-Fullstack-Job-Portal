import { NavLink } from 'react-router-dom';
import useThemeStore from '../store/themeStore';
import useSavedJobStore from '../store/savedJobStore';

const links = [
  { to: '/jobs', label: 'Jobs' },
  { to: '/companies', label: 'Companies' },
  { to: '/about', label: 'About' },
  {to: '/login', label: 'Login'},
  {to: '/register', label: 'Register'},
]

const Navbar = () => {
  const savedIds = useSavedJobStore((state) => state.savedIds)
  const theme = useThemeStore(state => state.theme); // selector returns the value directly — no destructuring
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const count = savedIds.length

  console.log('rerenderrrrrr', savedIds);

  return (
    <nav className={`px-6 py-3.5 flex items-center justify-between shadow-lg ${theme === 'light' ? 'bg-indigo-700 text-white' : 'bg-gray-800 text-gray-200'}`}>
      <NavLink to="/" className="text-xl font-bold tracking-tight">
        Dev<span className="text-indigo-300">Board</span>
      </NavLink>

      <div className="flex items-center gap-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/20 text-white'
                  : theme === 'light'
                  ? 'text-indigo-200 hover:text-white hover:bg-white/10'
                  : 'text-gray-200 hover:text-white hover:bg-gray-700'  
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-white/20 text-white'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`
          }
        >
          Saved
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </NavLink>

        <button
          onClick={toggleTheme}
          className="ml-2 px-3 py-1.5 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition-colors"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar;