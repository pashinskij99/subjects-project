import ACTIONS from '../../constants';

export const smallCarousel = (state = null, action) => {
    const {type, payload} = action
    
    if(type === ACTIONS.SMALL_CAROUSEL) {
        return payload
    }
    else {
        return state
    }
}
