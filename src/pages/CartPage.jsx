import React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
        }
    }

    onBtDec = () => {
        if (this.state.qty > 1) {
            this.setState({ qty: this.state.qty -= 1 })
        }
    }

    onBtInc = () => {
        this.setState({ qty: this.state.qty += 1 })
    }

    printCart = () => {
        return this.props.cart.map((value, index) => {
            return (
                <div>
                    <div className="d-flex row">
                        <div className="shadow mb-5 bg-white rounded d-flex" >
                            <div style={{ margin: "auto", marginLeft: "50px" }}>
                                <img src={value.images} height="200px" />
                            </div>
                            <div className="container" style={{ margin: "auto" }}>
                                <h4>{value.nama}</h4>
                                <h5>Rp. {value.harga}</h5>
                            </div>
                            <div className="container" style={{ margin: "auto" }}>
                                <h5>{value.type}</h5>
                            </div>
                            <div className="container" style={{ margin: "auto" }}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                        <span className="material-icons" style={{ cursor: 'pointer', marginRight: "10px" }} onClick={this.onBtDec}>
                                            -
                                        </span>
                                        <Input size="sm" placeholder="qty" value={this.state.qty} style={{ width: "100px", display: 'inline-block' }} />
                                        <span className="material-icons" style={{ cursor: 'pointer', marginLeft: "10px" }} onClick={this.onBtInc}>
                                            +
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="container d-flex" style={{ margin: "auto" }}>
                                <div>
                                    <h5>Rp. {value.harga * this.state.qty}</h5>
                                </div>
                            </div>
                            <div className="container d-flex" style={{ margin: "auto" }}>
                                <Button>REMOVE</Button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Keranjang Belanja</h1>
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-7">
                        {this.printCart()}
                    </div>
                    <div className="col-3">
                        <div className="shadow mb-5 bg-white rounded" style={{ marginLeft: "30px", paddingBottom: "80px", paddingTop:"40px" }} >
                            <div>
                                <h4>TOTAL PAYMENT</h4>
                            </div>
                            <div>
                                <h5>Rp. TOTAL</h5>
                            </div>
                            <div className="">
                                <div>
                                    <label>Biaya Pengiriman</label>
                                </div>
                                <div>
                                    <input></input>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <label>Notes</label>
                                </div>
                                <div>
                                    <textarea></textarea>
                                </div>
                            </div>
                            <div>
                                <Button style={{ float: "right", marginRight: "20px", marginTop:"20px" }}>Checkout</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">

                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart
    }
}

export default connect(mapToProps)(CartPage);