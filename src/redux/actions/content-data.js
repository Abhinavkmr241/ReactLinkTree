import { ADD_CONTENT, EDIT_CONTENT, REMOVE_CONTENT, ADD_ID, DELETE_ITEM } from './action-types';

export const addContent = (content) => {
    return {
        type: ADD_CONTENT,
        payload: content
    }
}

export const editContent = (content) => {
    return {
        type: EDIT_CONTENT,
        payload: content
    }
}

export const removeContent = (_id) => {
    return {
        type: REMOVE_CONTENT,
        payload: {
            _id
        }
    }
}

export const addId = (_id) => {
    return {
        type: ADD_ID,
        payload: {
            _id
        }
    }
}

export const deleteItem = () => {
    return {
        type: DELETE_ITEM
    }
}