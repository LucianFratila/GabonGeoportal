import create from 'zustand'

const useStore = create(set => ({
    concessionVisibiliy: false,
    changeConcessionVisibility: () => set(state => ({ concessionVisibiliy: !state.concessionVisibiliy })),
  }));

export default useStore