import create from 'zustand'

const useStore = create(set => ({
    storeMap:'',
    setStoreMap:()=>set(state=>({state})),
    concessionVisibiliy: false,
    changeConcessionVisibility: () => set(state => ({ concessionVisibiliy: !state.concessionVisibiliy })),
  }));

export default useStore