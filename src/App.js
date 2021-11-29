
import React from 'react';
import './App.css';
import Form from './component/Form';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductManagement from './component/ProductManagement';
import axios from 'axios';
import { connect } from 'react-redux'
import { loginAction } from './redux/actions'

const API_URL ="http://localhost:2000"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = () => {
    let local = JSON.parse(localStorage.getItem("data"));
    if (local){
      axios.get(`${API_URL}/dataUser?email=${local.email}&password${local.password}`)
        .then((res) => {
          console.log("keepLogin berhasil ==>", res.data)
          this.props.loginAction(res.data[0])
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/productmanagement" element={<ProductManagement />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { loginAction })(App);
