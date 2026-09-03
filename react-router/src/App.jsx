import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Jobs from './pages/Jobs';
import Companies from './pages/Companies';
import JobDetails from './pages/JobDetails';
import CompanyDetail from './pages/CompanyDetail'
import Saved from './pages/Saved';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} /> 
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:slug" element={<CompanyDetail />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/new" element={<NewPost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;