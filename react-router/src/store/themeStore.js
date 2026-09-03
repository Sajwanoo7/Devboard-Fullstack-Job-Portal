import {create} from 'zustand';

const useThemeStore = create(set => ({ // this store has two things theme,toggleTheme and toggleTheme is a function that updates the theme value in the store
  theme: 'light',
  toggleTheme: () => set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}));

export default useThemeStore;