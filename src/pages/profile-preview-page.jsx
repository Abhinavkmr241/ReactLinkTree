import React, { Component } from 'react';
import {Col, Container, Row, Button, Label, Card, CardBody} from 'reactstrap';

class ProfilePreview extends Component {
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
                <CardBody>
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{display: 'none'}} />
                      <img alt="" className="" src={'assets/img/user-img-default.png'} />
                    </Label>
                    <h5>@johndoe</h5>
                  </div>
                  
                  <div className="mt-4">
                    <Button className="btnOrange">
                      LinkedIn
                    </Button>
                    <Button className="btnOrange">
                      Facebook
                    </Button>
                    <Button className="btnOrange">
                      Instagram
                    </Button>
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

export default ProfilePreview;
