import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            dataUser: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:2000/dataUser/`)
            .then((response) => {
                console.log(response.data)
                this.setState({ dataUser: response.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }

    btRegist = () => {
        let { username, email, password, confpassword } = this.state
        if (password === confpassword ){
            axios.post(`http://localhost:2000/dataUser/`, {
                username, email, password, role: "User"
            }).then((response) => {
                this.getData()
                this.setState({
                    username: "",
                    email: "",
                    password: "",
                })
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert(`Password tidak sama`)
        }
    }
    
    
    btMasuk = () => {
        let {dataUser, emailLogin, passwordLogin} = this.state
        // GAGAL KALO i undefined
        // for(let i=0; i<=dataUser.length; i++){
        //     if(emailLogin === dataUser[i].email){
        //         if(passwordLogin === dataUser[i].password){
        //             alert(`berhasil login sebagai ${dataUser[i].role} ${dataUser[i].username}`)
        //         } else if (passwordLogin !== dataUser[i].password){
        //             alert(`Password Salah`)
        //         } 
        //         break;
        //     }
        // }
        let index=null;
        for(let i=0;i<dataUser.length;i++){
            if(dataUser[i].email===emailLogin && dataUser[i].password===passwordLogin){
                index = i
            }
        }
        if(index!=null){
            alert(`${dataUser[index].username}, Login Berhasil`)
            this.setState({
                emailLogin:"",
                passwordLogin:"",   
            })
        }else{
            alert("Login Gagal")
        }
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }


    render() {
        return (
            <div className="m-3 row">
                {/* FORM LOGIN */}
                <div id="form-login" className="col-6">
                    <h3>Silahkan masuk ke akun anda</h3>
                    <form>
                        <div className="form-group m-2">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => this.handleInput(event.target.value, "emailLogin")}/>
                        </div>
                        <div className="form-group m-2">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" onChange={(event) => this.handleInput(event.target.value, "passwordLogin")}/>
                        </div>
                        <button type="button" className="btn btn-primary m-2" style={{ width: "47vw" }} onClick={this.btMasuk}>Masuk</button>
                    </form>
                </div>
                {/* END OF FORM LOGIN */}
{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                {/* FORM REGIST */}
                <div id="form-regist" className="col-6">
                    <h3>Silahkan buat akun anda</h3>
                    <form>
                        <div className="form-group m-2">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter username" aria-label="username" onChange={(event) => this.handleInput(event.target.value, "username")} />
                        </div>
                        <div className="form-group m-2">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" aria-label="email" onChange={(event) => this.handleInput(event.target.value, "email")} />
                        </div>
                        <div className="form-group m-2">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" aria-label="password" onChange={(event) => this.handleInput(event.target.value, "password")} />
                        </div>
                        <div className="form-group m-2">
                            <label>Confirmation Password</label>
                            <input type="password" className="form-control" placeholder="Confirm Password" onChange={(event) => this.handleInput(event.target.value, "confpassword")}/>
                        </div>
                        <button type="button" className="btn btn-primary m-2" style={{ width: "47vw" }} onClick={this.btRegist}>Daftar</button>
                    </form>
                </div>
                {/* END OF FORM REGIST */}
            </div>
        );
    }
}

export default Form;