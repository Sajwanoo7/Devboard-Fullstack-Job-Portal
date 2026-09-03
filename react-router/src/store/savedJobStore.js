import { create } from 'zustand';

const useSavedJobStore = create((set, get) => ({
  savedIds: JSON.parse(localStorage.getItem('devboard_saved') || '[]'),

  toggle: (id) => {
    const next = get().savedIds.includes(id)
      ? get().savedIds.filter((x) => x !== id)
      : [...get().savedIds, id]
    localStorage.setItem('devboard_saved', JSON.stringify(next))
    set({ savedIds: next })
  },

  isSaved: (id) => get().savedIds.includes(id),
}));

export default useSavedJobStore;