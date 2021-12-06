import React from 'react';
import './App.css';
import Form from './component/Form';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductManagement from './component/ProductManagement';

import { connect } from 'react-redux';
import { loginAction, getProductsAction } from './redux/actions';
import ProductsPage from './pages/ProductsPage';

import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.keepLogin()
    this.props.getProductsAction()
  }

  keepLogin = async () => {
    try {
      let local = localStorage.getItem("data");
      if (local) {
        // re-assign variable local dengan JSON parse
        local = JSON.parse(local)
        let res = await this.props.loginAction(local.email, local.password)
        if (res.success) {
          this.setState({ loading: false })
        }
      } else {
        this.setState({ loading: false })
      }
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  // keepLogin = () => {
  //   let local = JSON.parse(localStorage.getItem("data"));
  //   if (local) {
  //     axios.get(`${API_URL}/dataUser?email=${local.email}&password${local.password}`)
  //       .then((res) => {
  //         console.log("keepLogin berhasil ==>", res.data)
  //         this.setState({ loading: false })
  //         this.props.loginAction(res.data[0])
  //       }).catch((err) => {
  //         console.log(err)
  //       })
  //   } else {
  //     this.setState({ loading: false })
  //   }
  // }

  // getProducts = async () => {
  //   try {
  //     let local = localStorage.getItem("data");
  //     if (local) {
  //       local = JSON.parse(local)
  //       let res = await this.props.getProductsAction()
  //       if (res.success) {
  //         this.setState({ loading: false })
  //       }
  //     } else {
  //       this.setState({ loading: false })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   // axios.get(`${API_URL}/products`)
  //   //   .then((response) => {
  //   //     this.props.getProductsAction(response.data)
  //   //   }).catch((err) => {
  //   //     console.log(err)
  //   //   })
  // }

  render() {
    return (
      <div className="App">
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          {
            this.props.role == "user" ?
              <Route path="/cart-user" element={<CartPage />} />
              :
              this.props.role == "admin" ?
                <Route path="/productmanagement" element={<ProductManagement />} />
                :
                <Route path="*" element={<NotFound />} />
              }
              <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapToProps, { loginAction, getProductsAction })(App);
