import React, { Component } from 'react';
import {Col, Container, Row, Button, Card, CardBody, CustomInput, Label,} from 'reactstrap';

class Appearance extends Component {
  state = {
		modals: [
      false,
      false
	  ]
	}
	
	_toggleModal = index => {
		const { modals } = this.state;
		modals[index] = !modals[index];
		this.setState({
			modals
		})  
  }
  render() {
    return (
      <div className="app flex-row animated fadeIn innerPagesBg">
        <Container>
          <Row>
            <Col md="12">
              <div className="addedLinksWrapper">
                <div className="d-flex justify-content-start align-items-center my-3">
                  <h4 className="pg-title">Appearance</h4>
								</div>

                <Card className="userDetails mb-4">
                  <CardBody>
										<h4 style={{fontWeight: 600, marginBottom: 0}}>Profile</h4>
										<div className="text-center">
											<Label className="btn uploadBtnProfile">
												<input type="file" style={{display: 'none'}} />
												<img alt="" className="" src={'assets/img/user-img-default.png'} />
												<i className="fa fa-pencil uploadIcon"></i>
											</Label>
										</div>
                  </CardBody>
                </Card>

								<Card className="userDetails mb-4">
                  <CardBody>
										<h4 style={{fontWeight: 600, marginBottom: 0}}>Themes</h4>
										<Row>
											<Col md={6} lg={4}>
												<Button className="selectTheme themeSeleted">
													<div className="themeLight">
														<div className="themeLightBtn"></div>
														<div className="themeLightBtn"></div>
														<div className="themeLightBtn"></div>
													</div>
												</Button>
												<p className="themeName">Light</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className="selectTheme">
													<div className="themeDark">
														<div className="themeDarkBtn"></div>
														<div className="themeDarkBtn"></div>
														<div className="themeDarkBtn"></div>
													</div>
												</Button>
												<p className="themeName">Dark</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className="selectTheme">
													<div className="themeScooter">
														<div className="themeScooterBtn"></div>
														<div className="themeScooterBtn"></div>
														<div className="themeScooterBtn"></div>
													</div>
												</Button>
												<p className="themeName">Scooter</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className="selectTheme">
													<div className="themeLeaf">
														<div className="themeLeafBtn"></div>
														<div className="themeLeafBtn"></div>
														<div className="themeLeafBtn"></div>
													</div>
												</Button>
												<p className="themeName">Leaf</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className="selectTheme">
													<div className="themeMoon">
														<div className="themeMoonBtn"></div>
														<div className="themeMoonBtn"></div>
														<div className="themeMoonBtn"></div>
													</div>
												</Button>
												<p className="themeName">Moon</p>
											</Col>
										</Row>
                  </CardBody>
                </Card>
              </div>

              <div className="profilePreviewWrap">
                <Button className="shareProfileBtn">
                  Share
                </Button>
								{/* change the theme class name accordingly, default is previewLight */}
                <div className="profilePreview previewLight"> 
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{display: 'none'}} />
                      <img alt="" className="" src={'assets/img/user-img-default.png'} />
                    </Label>
										{/* use class text-white in Dark and Scooter theme*/}
                    <h5 className="text-black">@johndoe</h5>
                  </div>
                  
                  <div className="mt-4">
										{/* change the button class name accordingly */}
                    <Button className="btnOrange">
                      LinkedIn
                    </Button>
                    <Button className="btnOrange">
                      Facebook
                    </Button>
                  </div>
                </div> {/* profilePreview */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Appearance;
