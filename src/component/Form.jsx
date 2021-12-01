import React from 'react';
import axios from 'axios';
import { Button, Container, FormGroup, Input, InputGroup, InputGroupText, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { loginAction } from '../redux/actions';
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

const API_URL = "http://localhost:2000"

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            dataUser: [],
            logPassShow: "Show",
            logPassType: "password",
            regPassShow: "Show",
            regPassType: "password",
            toastOpen: false,
            toastHeader: "",
            toastMessage: "",
            toastIcon: ""
        }
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`${API_URL}/dataUser`)
            .then((response) => {
                console.log(response.data)
                this.setState({ dataUser: response.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    btRegis = () => {
        if (this.usernameRegis.value === "" || this.emailRegis.value === "" || this.passwordRegis.value === "" || this.confPasswordRegis === "") {
            this.setState({
                toastOpen: true,
                toastHeader: "Register Warning",
                toastIcon: "warning",
                toastMessage: "Isi semua form"
            })
        } else {
            if (this.passwordRegis.value === this.confPasswordRegis.value) {
                if (this.emailRegis.value.includes("@")) {
                    axios.post(`${API_URL}/dataUser`, {
                        username: this.usernameRegis.value,
                        email: this.emailRegis.value,
                        password: this.passwordRegis.value,
                        role: "user",
                        status: "Active"
                    }).then((response) => {
                        this.setState({
                            toastOpen: true,
                            toastHeader: "Register Status",
                            toastIcon: "success",
                            toastMessage: "Registrasi Berhasil ✅"
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Warning",
                        toastIcon: "warning",
                        toastMessage: "Email salah"
                    })
                }
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Register Warning",
                    toastIcon: "warning",
                    toastMessage: "Password tidak sesuai"
                })
            }
        }
    }

    btMasuk = () => {
        this.props.loginAction(this.state.emailLogin, this.passwordLogin.value)
    }


    btShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: "Hide",
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: "Show",
                logPassType: "password"
            })
        }
    }

    btShowPassRegis = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: "Hide",
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: "Show",
                regPassType: "password"
            })
        }
    }

    render() {
        if (this.props.iduser) {
            // redirect ke page yang dituju
            return <Navigate to="/" />
        }
        return (
            <Container className="p-5">
                <div>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed" }}>
                        <ToastHeader icon={this.state.toastIcon}
                            toggle={() => this.setState({ toastOpen: false })}>
                            {this.state.toastHeader}
                        </ToastHeader>
                        <ToastBody>
                            {this.state.toastMessage}
                        </ToastBody>
                    </Toast>
                </div>
                <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Pilihan Masuk</h2>
                <p className="text-center">Masuk dan selesaikan pesanan dengan data diri anda atau daftar untuk menikmati semua layanan</p>
                <div className="row">
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan masuk ke akun anda</h3>
                        {/* FORM LOGIN */}
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email Anda"
                                onChange={(event) => this.handleInput(event.target.value, "emailLogin")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.logPassType} id="textPassword" placeholder="Masukkan Password Anda"
                                    innerRef={(element) => this.passwordLogin = element} onChange={(event) => this.handleInput(event.target.value, "passwordLogin")} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassLogin}>
                                    {this.state.logPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btMasuk}>Masuk</Button>
                    </div>
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan buat akun anda</h3>
                        {/* FORM REGIST */}
                        <FormGroup>
                            <Label for="textUsername">Username</Label>
                            <Input type="text" id="textUsername" placeholder="Masukkan Username Anda"
                                innerRef={(element) => this.usernameRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email Anda"
                                innerRef={(element) => this.emailRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Masukkan Password Anda"
                                    innerRef={(element) => this.passwordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Konfirmasi Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Konfirmasi Password Anda"
                                    innerRef={(element) => this.confPasswordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btRegis}>Daftar</Button>
                    </div>
                </div>
            </Container>
        );
    }



    // render() {
    //     return (
    //         <div className="m-3 row">
    //             {/* FORM LOGIN */}
    //             <div id="form-login" className="col-6">
    //                 <h3>Silahkan masuk ke akun anda</h3>
    //                 <form>
    //                     <div className="form-group m-2">
    //                         <label>Email</label>
    //                         <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => this.handleInput(event.target.value, "emailLogin")} />
    //                     </div>
    //                     <div className="form-group m-2">
    //                         <label>Password</label>
    //                         <div className="input-group mb-3">
    //                             <input type={this.state.logPassType} className="form-control" placeholder="Password" onChange={(event) => this.handleInput(event.target.value, "passwordLogin")} />
    //                             <div className="input-group-append">
    //                                 <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.showHidePasswordLogin}>Show</button>
    //                             </div>
    //                         </div>
    //                         {/* <input type="password" className="form-control" placeholder="Password" onChange={(event) => this.handleInput(event.target.value, "passwordLogin")} /> */}
    //                     </div>
    //                     <button type="button" className="btn btn-primary m-2" style={{ width: "47vw" }} onClick={this.btMasuk}>Masuk</button>
    //                 </form>
    //             </div>
    //             {/* END OF FORM LOGIN */}
    //             {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
    //             {/* FORM REGIST */}
    //             <div id="form-regist" className="col-6">
    //                 <h3>Silahkan buat akun anda</h3>
    //                 <form>
    //                     <div className="form-group m-2">
    //                         <label>Username</label>
    //                         <input type="text" className="form-control" placeholder="Enter username" aria-label="username" onChange={(event) => this.handleInput(event.target.value, "usernameregist")} />
    //                     </div>
    //                     <div className="form-group m-2">
    //                         <label>Email</label>
    //                         <input type="email" className="form-control" placeholder="Enter email" aria-label="email" onChange={(event) => this.handleInput(event.target.value, "emailregist")} />
    //                     </div>
    //                     <div className="form-group m-2">
    //                         <label>Password</label>
    //                         <div className="input-group mb-3">
    //                             <input type={this.state.regPassType} className="form-control" placeholder="Password" onChange={(event) => this.handleInput(event.target.value, "passwordregist")} />
    //                             <div className="input-group-append">
    //                                 <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.showHidePasswordRegist}>Show</button>
    //                             </div>
    //                         </div>
    //                         {/* <input type="password" className="form-control" placeholder="Password" aria-label="password" onChange={(event) => this.handleInput(event.target.value, "password")} /> */}
    //                     </div>
    //                     <div className="form-group m-2">
    //                         <label>Confirmation Password</label>

    //                         <input type="password" className="form-control" placeholder="Confirm Password" onChange={(event) => this.handleInput(event.target.value, "confpassword")} />
    //                     </div>
    //                     <button type="button" className="btn btn-primary m-2" style={{ width: "47vw" }} onClick={this.btRegist}>Daftar</button>
    //                 </form>
    //             </div>
    //             {/* END OF FORM REGIST */}
    //         </div>
    //     );
    // }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { loginAction })(Form);