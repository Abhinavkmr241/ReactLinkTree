import React, { Component } from 'react';
import { Col, Container, Row, Button, Card, CardBody, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { findPage, createFirstContent, callEditContent, findUser } from '../http/http-calls';
import { connect } from "react-redux";
import { addContent, editContent, removeContent, addId, deleteItem } from "../redux/actions/content-data";
import { addUserAvatar, addUserTheme } from "../redux/actions/user-data";
import { Redirect } from "react-router-dom";
import Content from './content-page';
import config from '../config';

class Links extends Component {
  state = {
    modal: false,
    content: {
      title: '',
      url: ''
    },
    isDirty: {
      title: false,
      url: false
    },
    errors: {}
  }

  componentDidMount() {
    findPage().then(res => {
      console.log("first response :- ",res);
      if ((res.page.contents !== null)&&(res.page.contents !== undefined)) {
        if (!this.props.contentData.contents.length) {
          for (let i = 0; i < res.page.contents.length; i++) {
            let content = {
              content: res.page.contents[i]
            }
            this.props.addContent(content);
          }
        }
      }
    });
    findUser().then(res => {
      if (!res.error) {
        this.props.addUserAvatar(res.user.avatarLink);
        if ((res.user.template !== null)&&(res.user.template !== undefined) ) {
          this.props.addUserTheme(res.user.template);
        } else {
          this.props.addUserTheme("Light");
        }
      }
    })
  }

  _toggleModal = () => {
    const newModal = !this.state.modal;
    this.setState({
      modal: newModal,
      content: {
        title: '',
        url: ''
      },
      isDirty: {
        title: false,
        url: false
      },
      errors: {}
    });
  }

  _handleOnChange = (field, value) => {
    const { content, isDirty } = this.state;
    content[field] = value;
    isDirty[field] = true;
    this.setState({ content, isDirty }, () => {
      this._validateContent();
    });
  }

  _validateContent = () => {
    const { content, isDirty, errors } = this.state;
    Object.keys(content).forEach((each) => {
      if (each === "title" && isDirty.title) {
        if (!content.title.trim().length) {
          errors[each] = "*Required";
        } else {
          delete errors[each];
          isDirty.title = false;
        }
      } else if (each === "url" && isDirty.url) {
        if (!content.url.trim().length) {
          errors[each] = "*Required";
        } else if (content.url.trim().length &&
          !content.url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
        ) {
          errors[each] = "Not a proper URL format";
        } else {
          delete errors[each];
          isDirty.url = false;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  _addContent = () => {
    let isDirty = {
      title: true,
      url: true
    }
    this.setState({ isDirty }, () => {
      let errors = this._validateContent();
      if (!errors) {
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
        this._toggleModal();
      }
    });
  }

  _themeClassSelector = (template) => {
    let themeClass = '';
    switch (template) {
      case "Dark": {
        themeClass = config.THEMES.Dark.themeClass;
        break;
      }
      case "Scooter": {
        themeClass = config.THEMES.Scooter.themeClass;
        break;
      }
      case "Leaf": {
        themeClass = config.THEMES.Leaf.themeClass
        break;
      }
      case "Moon": {
        themeClass = config.THEMES.Moon.themeClass;
        break;
      }
      case "Light": {
        themeClass = config.THEMES.Light.themeClass;
        break;
      }
    }
    return themeClass;
  }

  _btnClassSelector = (template) => {
    let btnClass = '';
    switch (template) {
      case "Dark": {
        btnClass = config.THEMES.Dark.btnClass;
        break;
      }
      case "Scooter": {
        btnClass = config.THEMES.Scooter.btnClass;
        break;
      }
      case "Leaf": {
        btnClass = config.THEMES.Leaf.btnClass
        break;
      }
      case "Moon": {
        btnClass = config.THEMES.Moon.btnClass;
        break;
      }
      case "Light": {
        btnClass = config.THEMES.Light.btnClass;
        break;
      }
    }
    return btnClass;
  }

  _textClassSelector = (template) => {
    let textClass = '';
    if (template === "Dark" || template === "Scooter") {
      textClass = config.THEMES.Dark.textClass;
    } else {
      textClass = config.THEMES.Light.textClass;
    }
    return textClass;
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
                <Button className="shareProfileBtn"
                  onClick={() => this.props.history.push(`/profile/${this.props.userData.userName}`)}
                >
                  Share
                </Button>

                <div className={`profilePreview ${this._themeClassSelector(this.props.userData.template)}`}>
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      {/* <input type="file" style={{ display: 'none' }} /> */}
                      {this.props.userData.avatarLink ?
                        <img src={this.props.userData.avatarLink} alt="chosen" style={{ height: '100px', width: '100px' }} />
                        : <img alt="" className="" src={'assets/img/user-img-default.png'} />
                      }
                    </Label>
                    <h5 className={this._textClassSelector(this.props.userData.template)}>{"@" + this.props.userData.userName}</h5>
                  </div>

                  <div className="mt-4">
                    {this.props.contentData.contents.map(key => {
                      if (key.status) {
                        return (
                          <Button className={this._btnClassSelector(this.props.userData.template)}
                            onClick={() => window.open(`${key.content.url}`, "_blank")}
                          >
                            {key.content.title}
                          </Button>
                        )
                      }
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
                {this.state.errors && (
                  <small style={{ color: "red" }}>{this.state.errors.title}</small>
                )}
              </FormGroup>
              <FormGroup>
                <Label>URL</Label>
                <Input type="text" placeholder="Enter URL"
                  value={this.state.content.url}
                  onChange={(e) => this._handleOnChange("url", e.target.value)}
                />
                {this.state.errors && (
                  <small style={{ color: "red" }}>{this.state.errors.url}</small>
                )}
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
    deleteItem: () => dispatch(deleteItem()),
    addUserAvatar: (avatarLink) => dispatch(addUserAvatar(avatarLink)),
    addUserTheme: (template) => dispatch(addUserTheme(template))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Links);
