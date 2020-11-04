import { ADD_USERDATA, REMOVE_USERDATA, ADD_USER_AVATAR, ADD_USER_THEME } from './action-types';

export const addUser = (user) => {
    return {
        type: ADD_USERDATA,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USERDATA
    }
}

export const addUserAvatar = (avatarLink) => {
    return {
        type: ADD_USER_AVATAR,
        payload: {
            avatarLink
        }
    }
}

export const addUserTheme = (template) => {
    return {
        type: ADD_USER_THEME,
        payload: {
            template
        }
    }
}