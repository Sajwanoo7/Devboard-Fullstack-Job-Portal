import {useEffect, useState} from 'react'
import axios from 'axios';



const Posts = () => {
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      // convert this code into async await syntax
      // bcz asyn returns a promise and useEffect does not expect a promise, so we need to wrap the async function inside useEffect and call it immediately
      useEffect (() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
          } catch (err) {
            console.log(err);
            setError('Failed to fetch posts');
            setLoading(false);
          }
        };

        fetchPosts();
      },[]) 
    

      if(error) {
        return <div className="text-red-500 text-center py-20">{error}</div>
      }

       if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

       return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="bg-white border border-gray-100 rounded-xl p-5 mb-3">
          <h2 className="font-semibold text-gray-800 mb-1">{post.title}</h2>
          <p className="text-sm text-gray-500">{post.body}</p>
        </div>
      ))}
    </div>
  )

}

export default Posts;