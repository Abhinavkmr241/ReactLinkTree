import React, { useState } from 'react';
import { Button, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { EDIT_CONTENT, REMOVE_CONTENT } from '../redux/actions';
import { callEditContent } from '../http/http-calls';

export const Content = ({ content, id }) => {
    const stateDate = useSelector(state => state);
    const dispatch = useDispatch()

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [contentData, setContentData] = useState({
        title: '',
        url: '',
        errors: {}
    });

    const _handleToggle = (value, id) => {
        let payload = {
            content: {
                _id: id,
                type: "status",
                value: false
            }
        }
        if (value) {
            payload.content.value = true;
            dispatch({
                type: EDIT_CONTENT,
                payload: payload
            })
        } else {
            dispatch({
                type: EDIT_CONTENT,
                payload: payload
            })
        }
        let obj = {
            contents: stateDate.contentData.contents
        }
        callEditContent(obj, stateDate.contentData.id).then(res => {
            console.log(res);
        })
    }

    const _handleEdit = (field, value) => {
        const newContent = contentData;
        newContent[field] = value;
        if (field === "title") {
            if (!newContent.title.trim().length) {
                newContent.errors.title = "*Required";
                setContentData({
                    errors: newContent.errors
                });
            } else {
                setContentData({
                    ...contentData,
                    title: newContent.title,
                    errors: {}
                })
            }
        } else if (field === "url") {
            if (!newContent.url.trim().length) {
                newContent.errors.url = "*Required";
                setContentData({
                    errors: newContent.errors
                });
            } else if (
                newContent.url.trim().length &&
                !newContent.url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
            ) {
                newContent.errors.url = "Not a proper URL format"
            } else {
                setContentData({
                    ...contentData,
                    url: newContent.url,
                    errors: {}
                })
            }
        }
    }

    const _editContent = () => {
        let payload = {
            content: {
                _id: id,
                type: "contentData",
                title: contentData.title,
                url: contentData.url
            }
        }
        dispatch({
            type: EDIT_CONTENT,
            payload: payload
        })
        let obj = {
            contents: stateDate.contentData.contents
        }
        callEditContent(obj, stateDate.contentData.id).then(res => {
            console.log(res);
        })
        setContentData({
            title: '',
            url: '',
            errors: {}
        })
        setModal1(false);
    }

    const _deleteContent = (id) => {
        let payload = {
            _id: id
        }
        dispatch({
            type: REMOVE_CONTENT,
            payload: payload
        });
        let obj = {
            contents: stateDate.contentData.contents
        }
        setModal2(false);
        callEditContent(obj, stateDate.contentData.id).then(res => {
            console.log(res);
        })
    }

    return (
        <div className="addedLinksWrap">
            <div className="moveLink">
                <i className="fa fa-ellipsis-v"></i>
            </div>
            <div className="addedLinkDetails">
                <h5>{content.content.title}</h5>
                <p>{content.content.url}</p>
                <div className="actionBtnWrap">
                    <CustomInput key={id} type="switch" id={"exampleCustomSwitch" + id} name={"customSwitch" + id} label="" className="disableLink"
                        onChange={(e) => _handleToggle(e.target.checked, id)} checked={content.status}
                    />

                    <Button className="delLinkBtn" id={"editLinkBtn" + id} onClick={() => setModal1(true)}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                    <Button className="delLinkBtn" id={"delLinkBtn" + id} onClick={() => setModal2(true)}>
                        <i className="fa fa-trash-o text-danger"></i>
                    </Button>
                </div>
            </div>

            {/* Modal for showing "Edit Content" */}
            <Modal isOpen={modal1} id={"editModal" + id} toggle={() => setModal1(false)} className="modal-dialog-centered">
                <ModalHeader toggle={() => setModal1(false)} >Edit </ModalHeader>
                <ModalBody className="modalContent">
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Enter Title"
                            onChange={(e) => _handleEdit("title", e.target.value)}
                        />
                        {contentData.errors && (
                            <small style={{ color: "red" }}>{contentData.errors.title}</small>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>URL</Label>
                        <Input type="text" placeholder="Enter URL"
                            onChange={(e) => _handleEdit("url", e.target.value)}
                        />
                        {contentData.errors && (
                            <small style={{ color: "red" }}>{contentData.errors.url}</small>
                        )}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button className="modalBtnCancel" onClick={() => setModal1(false)}>
                        Cancel
                    </Button>
                    <Button className="modalBtnSave"
                        onClick={(e) => _editContent(e)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal for deleting an exisiting Link */}
            <Modal isOpen={modal2} toggle={() => setModal2(false)} className="modal-dialog-centered">
                <ModalHeader toggle={() => setModal2(false)}>Delete Link</ModalHeader>
                <ModalBody className="modalContent text-center">
                    <h5 className="mt-3 px-4" style={{ fontWeight: 400 }}>Are you sure you want to delete this Link? This cannot be undone.</h5>
                </ModalBody>
                <ModalFooter>
                    <Button className="modalBtnCancel" onClick={() => setModal2(false)}>
                        Cancel
              </Button>
                    <Button className="modalBtnSave" onClick={() => _deleteContent(id)}>
                        Delete
              </Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default Content;