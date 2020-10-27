import React, { Component } from 'react';
import { Col, Container, Row, Button, Card, CardBody, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { findPage, createFirstContent, callEditContent } from '../http/http-calls';
import { connect } from "react-redux";
import { addContent, editContent, removeContent, addId, deleteItem } from "../redux/actions/content-data";
import { Redirect } from "react-router-dom";

class Links extends Component {
  state = {
    modals: [
      false,
      false
    ],
    content: {
      title: '',
      url: ''
    }
  }

  componentDidMount() {
    findPage().then(res => {
      if (res.page.contents.length) {
        let contentList = res.page.contents;
        let content = {
          content: contentList[0]
        }
        console.log(content)
        this.props.addContent(content);
        this.props.addId(res.page.id);
      } else {
        // this.props.deleteItem();
      }
    });
  }

  _toggleModal = index => {
    const { modals } = this.state;
    modals[index] = !modals[index];
    this.setState({
      modals
    })
  }

  _handleOnChange = (field, value) => {
    const { content } = this.state;
    content[field] = value;
    this.setState({ content });
  }

  _addContent = () => {
    if (!this.props.contentData.contents.length) {
      const contentData = {
        contents: [{
          content: {
            title: this.state.content.title,
            url: this.state.content.url
          },
          contentType: "socialLink",
          subContentType: "facebook"
        }]
      }
      createFirstContent(contentData).then(res => {
        if (!res.error) {
          const content = {
            content: res.page.contents[0]
          }
          this.props.addContent(content);
          this.props.addId(res.page.id);
          this.setState({
            content: {
              title: '',
              url: ''
            }
          });
        }
      })
    } else {
      const contents = this.props.contentData.contents;
      const contentData = [...contents, {
        content: {
          title: this.state.content.title,
          url: this.state.content.url
        },
        contentType: "socialLink",
        subContentType: "facebook"
      }];
      const obj = {
        contents: contentData
      }
      callEditContent(obj, this.props.contentData.id).then(res => {
        const lastContent = res.page.contents[res.page.contents.length - 1];
        const content = {
          content: lastContent
        }
        this.props.addContent(content);
      });
    }
    this._toggleModal(1);
  }

  _handleToggle = (value, id) => {
    if (value.checked) {
      const obj = {
        content: {
          _id: id,
          type: 'status',
          value: true
        }
      }
      this.props.editContent(obj);
      console.log(this.props.contentData.contents);
    } else {
      const obj = {
        content: {
          _id: id,
          type: 'status',
          value: false
        }
      }
      this.props.editContent(obj);
      console.log(this.props.contentData.contents);
    }
  }

  render() {
    return (
      <div className="app flex-row animated fadeIn innerPagesBg">
        <Container>
          <Row>
            <Col md="12">
              <div className="addedLinksWrapper">
                <div className="d-flex justify-content-between align-items-center my-3">
                  <h4 className="pg-title">Links</h4>

                  <Button className="addBtn" onClick={() => this._toggleModal(1)}>
                    <i className="fa fa-plus mr-1"></i> Add New Link
                  </Button>
                </div>

                <Card className="userDetails mb-4">
                  <CardBody>
                    {this.props.contentData.contents.map(content => (
                      <div className="addedLinksWrap">
                        <div className="moveLink">
                          <i className="fa fa-ellipsis-v"></i>
                        </div>
                        <div className="addedLinkDetails">
                          <h5>{content.content.title}</h5>
                          <p>{content.content.url}</p>
                          <div className="actionBtnWrap" key={content._id}>
                            <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="" className="disableLink"
                              onClick={(e) => this._handleToggle(e.target, content._id)}
                            />

                            <Button className="delLinkBtn">
                              <i className="fa fa-pencil"></i>
                            </Button>
                            <Button className="delLinkBtn" onClick={() => this._toggleModal(2)}>
                              <i className="fa fa-trash-o text-danger"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </div>

              <div className="profilePreviewWrap">
                <Button className="shareProfileBtn">
                  Share
                </Button>

                <div className="profilePreview">
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{ display: 'none' }} />
                      <img alt="" className="" src={'assets/img/user-img-default.png'} />
                    </Label>
                    <h5>{"@" + this.props.userData.userName}</h5>
                  </div>

                  <div className="mt-4">
                    {this.props.contentData.contents.map(key => {
                      if (key.status) {
                        return (
                          <Button className="btnOrange" onClick={() => <Redirect to="/login" />} >
                            {key.content.title}
                          </Button>
                        )}
                    })}
                  </div>
                </div> {/* profilePreview */}
              </div>
            </Col>
          </Row>

          {/* Modal for showing "Create New Link" */}
          <Modal isOpen={this.state.modals[1]} toggle={() => this._toggleModal(1)} className="modal-dialog-centered">
            <ModalHeader toggle={() => this._toggleModal(1)}>Add New Link</ModalHeader>
            <ModalBody className="modalContent">
              <FormGroup>
                <Label>Title</Label>
                <Input type="text" placeholder="Enter Title"
                  value={this.state.content.title}
                  onChange={(e) => this._handleOnChange("title", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>URL</Label>
                <Input type="text" placeholder="Enter URL"
                  value={this.state.content.url}
                  onChange={(e) => this._handleOnChange("url", e.target.value)}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button className="modalBtnCancel" toggle={() => this._toggleModal(1)}
                onClick={() => this._toggleModal(1)}
              >
                Cancel
              </Button>
              <Button className="modalBtnSave" toggle={() => this._toggleModal(1)}
                onClick={() => this._addContent()}
              >
                Create
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal for deleting an exisiting Link */}
          <Modal isOpen={this.state.modals[2]} toggle={() => this._toggleModal(2)} className="modal-dialog-centered">
            <ModalHeader toggle={() => this._toggleModal(2)}>Delete Link</ModalHeader>
            <ModalBody className="modalContent text-center">
              <h5 className="mt-3 px-4" style={{ fontWeight: 400 }}>Are you sure you want to delete this Link? This cannot be undone.</h5>
            </ModalBody>
            <ModalFooter>
              <Button className="modalBtnCancel" toggle={() => this._toggleModal(2)}>
                Cancel
              </Button>
              <Button className="modalBtnSave" toggle={() => this._toggleModal(2)}>
                Delete
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentData: state.contentData,
    userData: state.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContent: (content) => dispatch(addContent(content)),
    removeContent: (_id) => dispatch(removeContent(_id)),
    editContent: (content) => dispatch(editContent(content)),
    addId: (_id) => dispatch(addId(_id)),
    deleteItem: () => dispatch(deleteItem())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Links);
// export default Links;
