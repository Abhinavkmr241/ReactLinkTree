import React, { Component } from 'react';
import { Col, Container, Row, Button, Card, CardBody, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { findPage, createFirstContent, callEditContent } from '../http/http-calls';
import { connect } from "react-redux";
import { addContent, editContent, removeContent, addId, deleteItem } from "../redux/actions/content-data";
import { Redirect } from "react-router-dom";
import Content from './content-page';

class Links extends Component {
  state = {
    modal: false,
    content: {
      title: '',
      url: ''
    }
  }

  componentDidMount() {
    findPage().then(res => {
      console.log(res);
      if (res.page.contents.length) {
        let contentList = res.page.contents;
        for (let i = 0; i < contentList.length; i++) {
          this.props.addContent(contentList[i]);
        }
        this.props.addId(res.page.id);
      } else {
        this.props.deleteItem();
      }
    });
  }

  _toggleModal = () => {
    const newModal = !this.state.modal;
    this.setState({
      modal: newModal
    });
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
    this.setState({
      content: {
        title: '',
        url: ''
      }
    })
    this._toggleModal();
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

                  <Button className="addBtn" onClick={() => this._toggleModal()}>
                    <i className="fa fa-plus mr-1"></i> Add New Link
                  </Button>
                </div>

                <Card className="userDetails mb-4">
                  <CardBody>
                    {this.props.contentData.contents.map(content => (
                      <Content content={content} id={content._id} key={content._id} />
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
          <Modal isOpen={this.state.modal} toggle={() => this._toggleModal()} className="modal-dialog-centered">
            <ModalHeader toggle={() => this._toggleModal()}>Add New Link</ModalHeader>
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
              <Button className="modalBtnCancel" toggle={() => this._toggleModal()}
                onClick={() => this._toggleModal(1)}
              >
                Cancel
              </Button>
              <Button className="modalBtnSave" toggle={() => this._toggleModal()}
                onClick={() => this._addContent()}
              >
                Create
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
