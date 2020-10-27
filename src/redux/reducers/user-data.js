import { ADD_USERDATA, REMOVE_USERDATA } from '../actions';

const userData = {
    userName: '',
    token: '',
    isActive: false
}

export const userDataReducer = (
    state = userData,
    action
) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_USERDATA: {
            newState = {
                userName: action.payload.user.userName,
                token: action.payload.user.token,
                isActive: true
            }
            break;
        }
        case REMOVE_USERDATA: {
            newState = {
                userName: '',
                token: '',
                isActive: false
            }
            break;
        }
        default: {
        }
    }
    return newState;
}
