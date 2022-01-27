import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { connect } from 'react-redux';
import { loginAction, getProductsAction, keepAction, getBrandCategory } from './redux/actions';

import ProductManagement from './component/ProductManagement';
import NavbarComponent from './component/Navbar';
import Form from './component/Form';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import HistoryPage from './pages/HistoryPage';
import TransactionAdminPage from './pages/TransactionManagement';

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
    this.props.getBrandCategory()
  }

  keepLogin = async () => {
    try {
      let res = await this.props.keepAction()
        this.setState({ loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

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
            this.props.role === "user" ?
              <>
                <Route path="/cart-user" element={<CartPage />} />
                <Route path="/history-user" element={<HistoryPage />} />
              </>
              :
              this.props.role === "admin" ?
                <>
                  <Route path="/productmanagement" element={<ProductManagement />} />
                  <Route path="/transactionmanagement" element={<TransactionAdminPage />} />
                </>
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

export default connect(mapToProps, { loginAction, getProductsAction, keepAction, getBrandCategory  })(App);
