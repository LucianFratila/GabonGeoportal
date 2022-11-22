import create from 'zustand'

const useStore = create(set => ({
    concessionVisibiliy: false,
    changeConcessionVisibility: () => set(state => ({ concessionVisibiliy: !state.concessionVisibiliy })),
    ///Map Search////
    mainMapSearchToggle:false,
    changeMainMapSearchToggle: () => set(state => ({ mainMapSearchToggle: !state.mainMapSearchToggle })),
    changeMainMapSearchToggleFalse: () => set(state => ({ mainMapSearchToggle: false }))
    
    
  }));

export default useStore