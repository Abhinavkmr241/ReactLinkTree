import { ADD_USERDATA, REMOVE_USERDATA, ADD_USER_AVATAR, ADD_USER_THEME } from '../actions';

const userData = {
    userName: '',
    token: '',
    isActive: false,
    avatarLink: '',
    template: ''
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
                isActive: true,
                avatarLink: '',
                template: ''
            }
            break;
        }
        case ADD_USER_AVATAR: {
            newState.avatarLink = action.payload.avatarLink;
            break;
        }
        case ADD_USER_THEME: {
            newState.template = action.payload.template;
            break;
        }
        case REMOVE_USERDATA: {
            newState = {
                userName: '',
                token: '',
                isActive: false,
                _id: '',
                avatarLink: '',
                template: ''
            }
            break;
        }
        default: {
        }
    }
    return newState;
}
