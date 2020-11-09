import React, { Component } from 'react';
import { Col, Container, Row, Button, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, } from 'reactstrap';
import { connect } from "react-redux";
import { uploadCloudinary, updateUserData } from '../http/http-calls';
import { addUserAvatar, addUserTheme } from '../redux/actions/user-data';
import config from '../config';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class Appearance extends Component {

	state = {
		modal: false,
		src: null,
		crop: {
			unit: '%',
			width: 30,
			aspect: 9 / 9,
		},
		croppedImageUrl: null
	}

	_toggleModal = () => {
		let { modal, src, crop, croppedImageUrl } = this.state;
		modal = !modal;
		src = null;
		croppedImageUrl = null;
		crop = {
			unit: '%',
			width: 30,
			aspect: 9 / 9,
		};
		this.setState({ modal, src, crop, croppedImageUrl });
	}

	_selectedTheme = (theme) => {
		let obj = {
			template: theme
		}
		updateUserData(obj).then(res => {
			if (!res.error) {
				console.log(res);
				this.props.addUserTheme(res.user.template);
			}
		}).catch(err => console.log(err));
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

	// for image uploading
	onSelectFile = e => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () =>
				this.setState({ src: reader.result })
			);
			reader.readAsDataURL(e.target.files[0]);
		}
		this._toggleModal();
	};

	onImageLoaded = image => {
		this.imageRef = image;
	};

	onCropComplete = crop => {
		this.makeClientCrop(crop);
	};

	onCropChange = (crop) => {
		this.setState({ crop });
	};

	async makeClientCrop(crop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(
				this.imageRef,
				crop,
				'newFile.jpeg'
			);
			this.setState({ croppedImageUrl });
		}
	}

	getCroppedImg(image, crop, fileName) {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		return new Promise((resolve) => {
			canvas.toBlob(blob => {
				if (!blob) {
					console.error('Canvas is empty');
					return;
				}
				blob.name = fileName;
				resolve(blob);
			}, 'image/jpeg', 1);
		});
	}

	_uploadImage = () => {
		const fd = new FormData();
		fd.append('file', this.state.croppedImageUrl);
		uploadCloudinary(fd).then(res => {
			if (!res.error) {
				const obj = {
					avatarLink: res.url
				}
				updateUserData(obj).then(res => {
					if (!res.error) {
						this.props.addUserAvatar(res.user.avatarLink);
					}
				}).catch(err => console.log(err));
			}
		}).catch(err => console.log(err));
		this._toggleModal();
	}

	render() {
		const { crop, croppedImageUrl, src } = this.state;

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
										<h4 style={{ fontWeight: 600, marginBottom: 0 }}>Profile</h4>
										<div className="text-center">
											<Label className="btn uploadBtnProfile">
												<input type="file" style={{ display: 'none' }} onChange={this.onSelectFile} />
												{this.props.userData.avatarLink ?
													<img src={this.props.userData.avatarLink} alt="chosen" style={{ height: '100px', width: '100px' }} />
													: <img alt="" className="" src={'assets/img/user-img-default.png'} />
												}
												<i className="fa fa-pencil uploadIcon"></i>
											</Label>
										</div>
									</CardBody>
								</Card>

								<Card className="userDetails mb-4">
									<CardBody>
										<h4 style={{ fontWeight: 600, marginBottom: 0 }}>Themes</h4>
										<Row>
											<Col md={6} lg={4}>
												<Button className={this.props.userData.template === "Light" ? "selectTheme themeSeleted" : "selectTheme"}
												 onClick={() => this._selectedTheme("Light")}>
													<div className="themeLight">
														<div className="themeLightBtn"></div>
														<div className="themeLightBtn"></div>
														<div className="themeLightBtn"></div>
													</div>
												</Button>
												<p className="themeName">Light</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className={this.props.userData.template === "Dark" ? "selectTheme themeSeleted" : "selectTheme"}
												 onClick={() => this._selectedTheme("Dark")}>
													<div className="themeDark">
														<div className="themeDarkBtn"></div>
														<div className="themeDarkBtn"></div>
														<div className="themeDarkBtn"></div>
													</div>
												</Button>
												<p className="themeName">Dark</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className={this.props.userData.template === "Scooter" ? "selectTheme themeSeleted" : "selectTheme"}
												 onClick={() => this._selectedTheme("Scooter")}>
													<div className="themeScooter">
														<div className="themeScooterBtn"></div>
														<div className="themeScooterBtn"></div>
														<div className="themeScooterBtn"></div>
													</div>
												</Button>
												<p className="themeName">Scooter</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className={this.props.userData.template === "Leaf" ? "selectTheme themeSeleted" : "selectTheme"}
												 onClick={() => this._selectedTheme("Leaf")}>
													<div className="themeLeaf">
														<div className="themeLeafBtn"></div>
														<div className="themeLeafBtn"></div>
														<div className="themeLeafBtn"></div>
													</div>
												</Button>
												<p className="themeName">Leaf</p>
											</Col>
											<Col md={6} lg={4}>
												<Button className={this.props.userData.template === "Moon" ? "selectTheme themeSeleted" : "selectTheme"}
												 onClick={() => this._selectedTheme("Moon")}>
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
								{/* <Button className="shareProfileBtn">
									Share
                				</Button> */}
								{/* change the theme class name accordingly, default is previewLight */}
								<div className={`profilePreview ${this._themeClassSelector(this.props.userData.template)}`} >
									<div className="text-center">
										<Label className="btn uploadBtnProfile">
											{/* <input type="file" style={{ display: 'none' }} onChange={(e) => this._uploadImage(e)} /> */}
											{this.props.userData.avatarLink ?
												<img src={this.props.userData.avatarLink} alt="chosen" style={{ height: '100px', width: '100px' }} />
												: <img alt="" className="" src={'assets/img/user-img-default.png'} />
											}
										</Label>
										{/* use class text-white in Dark and Scooter theme*/}
										<h5 className={this._textClassSelector(this.props.userData.template)}>{"@" + this.props.userData.userName}</h5>
									</div>

									<div className="mt-4">
										{/* change the button class name accordingly */}
										{this.props.contentData.contents.map(key => {
											if (key.status) {
												return (
													<Button className={this._btnClassSelector(this.props.userData.template)} onClick={() => window.open(`${key.content.url}`, "_blank")}>
														{key.content.title}
													</Button>
												)
											}
										})}
									</div>
								</div> {/* profilePreview */}
							</div>

							{/* Modal for showing Image preview */}
							<Modal isOpen={this.state.modal} toggle={() => this._toggleModal()} className="modal-dialog-centered">
								<ModalHeader toggle={() => this._toggleModal()}>Crop Image</ModalHeader>
								<ModalBody className="modalContent">
									<FormGroup>
										{src && (
											<ReactCrop
												src={src}
												crop={crop}
												ruleOfThirds
												onImageLoaded={this.onImageLoaded}
												onComplete={this.onCropComplete}
												onChange={this.onCropChange}
											/>
										)}
									</FormGroup>
								</ModalBody>
								<ModalFooter>
									<Button className="modalBtnCancel" toggle={() => this._toggleModal()}
										onClick={() => this._toggleModal()}
									>
										Cancel
              						</Button>
									<Button className="modalBtnSave" onClick={() => this._uploadImage()}>
										Save
									</Button>
								</ModalFooter>
							</Modal>
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

const mapDispatchToProps = (dispatch) => {
	return {
		addUserAvatar: (avatarLink) => dispatch(addUserAvatar(avatarLink)),
		addUserTheme: (template) => dispatch(addUserTheme(template))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Appearance);
