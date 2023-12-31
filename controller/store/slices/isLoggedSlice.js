const isLoggedSlice = (set) => ({
  isLogged: false,
  setIsLogged: () => set(() => ({ isLogged: true })),
  resetIsLogged: () => set(() => ({ isLogged: false })),
});

export default isLoggedSlice;
