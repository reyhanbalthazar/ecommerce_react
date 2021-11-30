import React from 'react';
import './App.css';
import Form from './component/Form';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductManagement from './component/ProductManagement';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAction, getProductsAction } from './redux/actions';
import ProductsPage from './pages/ProductsPage';
import { API_URL } from './helper';
import ProductDetail from './pages/ProductDetail';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.keepLogin()
    this.getProducts()
  }

  keepLogin = () => {
    let local = JSON.parse(localStorage.getItem("data"));
    if (local) {
      axios.get(`${API_URL}/dataUser?email=${local.email}&password${local.password}`)
        .then((res) => {
          console.log("keepLogin berhasil ==>", res.data)
          this.setState({ loading: false })
          this.props.loginAction(res.data[0])
        }).catch((err) => {
          console.log(err)
        })
    } else {
      this.setState({ loading: false })
    }
  }

  getProducts = () => {
    axios.get(`${API_URL}/products`)
      .then((response) => {
        this.props.getProductsAction(response.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/productmanagement" element={<ProductManagement />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product-detail" element={<ProductDetail />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { loginAction, getProductsAction })(App);
