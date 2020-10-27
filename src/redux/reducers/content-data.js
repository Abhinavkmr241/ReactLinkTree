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
                if (key.content._id === action.payload.content._id) {
                    if (action.payload.content.type === "title") {
                        key.content.title = action.payload.content.value
                    } else if (action.payload.content.type === "type") {
                        key.content.url = action.payload.content.value
                    } else if (action.payload.content.type === "status") {
                        key.status = action.payload.content.value
                    }
                }
            })
            break;
        }
        case REMOVE_CONTENT: {
            newState.contents = newState.contents.filter(key => key.content._id !== action.payload._id)
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