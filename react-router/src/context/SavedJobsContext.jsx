import { createContext, useContext, useState } from 'react'

const SavedJobsContext = createContext()

export const SavedJobsProvider = ({ children }) => {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('devboard_saved') || '[]')
    } catch {
      return []
    }
  })

  async function getJobs(){
      const res = await server.get('/jobs', {
        params: { ids: savedIds.join(',') }
      })
      return res.data
  }

  function toggle(id) {
    console.log('toggle called with id:', id)
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('devboard_saved', JSON.stringify(next))
      console.log('savedIds updated to:', next)
      return next
    })
  }

  function isSaved(id) {
    return savedIds.includes(id)
  }

  return (
    <SavedJobsContext.Provider value={{ savedIds, toggle, isSaved, getJobs }}>
      {children}
    </SavedJobsContext.Provider>
  )
}

export const useSavedJobs = () =>{
  return useContext(SavedJobsContext)
}