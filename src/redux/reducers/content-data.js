import { ADD_CONTENT, EDIT_CONTENT, REMOVE_CONTENT, ADD_ID, DELETE_ITEM } from '../actions';

const contentData = {
    contents: [],
    id: ''
}

export const contentDataReducer = (
    state = contentData,
    action
) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_CONTENT: {
            newState.contents = [...newState.contents, action.payload.content]
            break;
        }
        case EDIT_CONTENT: {
            newState.contents.map(key => {
                if (key._id === action.payload.content._id) {
                    switch (action.payload.content.type) {
                        case "contentData": {
                            key.content.title = action.payload.content.title;
                            key.content.url = action.payload.content.url;
                            break;
                        }
                        case "status": {
                            key.status = action.payload.content.value
                        }
                    }
                }
            })
            break;
        }
        case REMOVE_CONTENT: {
            newState.contents = newState.contents.filter(key => key._id !== action.payload._id)
            break;
        }
        case ADD_ID: {
            newState.id = action.payload._id
            break;
        }
        case DELETE_ITEM: {
            newState = {
                contents: [],
                id: ''
            }
            break;
        }
        default: {
        }
    }
    return newState;
}