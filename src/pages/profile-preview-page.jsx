import React, { Component } from 'react';
import { Col, Container, Row, Button, Label, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import config from '../config';

class ProfilePreview extends Component {

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
          <Row className="justify-content-center">
            <Col md="10" xl="8">
              <div className="d-flex justify-content-start align-items-center my-3">
                <h4 className="pg-title">Profile</h4>
              </div>

              <Card className="userDetails mb-4">
                <CardBody className={this._themeClassSelector(this.props.userData.template)}>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
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

export default connect(mapStateToProps)(ProfilePreview);
