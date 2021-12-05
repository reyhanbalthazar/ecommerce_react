import React from "react";
import { API_URL } from "../helper";
import { Container, Table, Button, Modal, ModalHeader, Input, Col, Row, ButtonGroup, InputGroupText, Label, Form, FormGroup } from "reactstrap";
import { updateUserCart } from '../redux/actions'
import { connect } from "react-redux";
import axios from 'axios';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            paymentItem: [900000, 700000],
            totalPayment: 0,
        }
    }

    componentDidMount() {
        this.printTotalPayment()
    }

    onBtInc = (index) => {
        this.props.cart[index].qty += 1
        this.props.cart[index].totalHarga += this.props.cart[index].harga
        console.log("qty", this.props.cart[index].totalHarga)
        axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, { cart: this.props.cart })
            .then((res) => {
                this.props.updateUserCart(res.data.cart)
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtDec = (index) => {
        if (this.props.cart[index].qty > 1) {
            this.props.cart[index].qty -= 1
            this.props.cart[index].totalHarga -= this.props.cart[index].harga
            console.log("qty", this.props.cart[index].qty)
            axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, { cart: this.props.cart })
                .then((res) => {
                    this.props.updateUserCart(res.data.cart)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    onBtRemove = (index) => {
        this.props.cart.splice(index, 1)
        axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, { cart: this.props.cart })
            .then((res) => {
                this.props.updateUserCart(res.data.cart)
            }).catch((err) => {
                console.log(err)
            })

    }

    printTotalPayment = () => {
        let total = this.state.totalPayment
        this.props.cart.forEach((val) => {
            total += val.totalHarga
        });
        return this.setState({ totalPayment: total })
    }

    printCart = () => {
        return this.props.cart.map((value, index) => {
            return (
                <div>
                    <div className="d-flex row">
                        <div className="row shadow mb-5 bg-white rounded" >
                            <div className="col-md-3">
                                <img src={value.images} height="200px" />
                            </div>
                            <div className="col-md-2" style={{ margin: "auto" }}>
                                <h4>{value.nama}</h4>
                                <h5>Rp. {value.harga.toLocaleString()}</h5>
                            </div>
                            <div className="col-md-1" style={{ margin: "auto" }}>
                                <h5>{value.type}</h5>
                            </div>
                            <div className="col-md-2" style={{ margin: "auto" }}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                        <span className="material-icons" style={{ cursor: 'pointer', marginRight: "10px" }} onClick={() => this.onBtDec(index)}>
                                            -
                                        </span>
                                        <Input placeholder="qty" value={value.qty} style={{ width: "50px", display: 'inline-block', textAlign: 'center' }} />
                                        <span className="material-icons" style={{ cursor: 'pointer', marginLeft: "10px" }} onClick={() => this.onBtInc(index)}>
                                            +
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-2" style={{ margin: "auto" }}>
                                <div>
                                    <h4>Rp {(value.totalHarga).toLocaleString()}</h4>
                                </div>
                            </div>
                            <div className="col-md-2" style={{ margin: "auto" }}>
                                <Button onClick={() => this.onBtRemove(index)}>REMOVE</Button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
    }

    totalPayment = () => {
        let total = 0
        this.props.cart.forEach((val) => {
            total += val.totalHarga
        });
        return <h4 style={{ fontWeight: "bolder" }}>Rp {(total).toLocaleString()}</h4>
    }

    render() {
        return (
            <div>
                <h1>Keranjang Belanja</h1>
                <div className="row">
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-7">
                        {this.printCart()}
                    </div>
                    <div className="col-md-3">
                        <div className="shadow mb-5 bg-white rounded" style={{ marginLeft: "30px", paddingBottom: "80px", paddingTop: "40px" }} >
                            <div>
                                <h4>TOTAL PAYMENT</h4>
                            </div>
                            <div>
                                {this.totalPayment()}
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
                                <Button style={{ float: "right", marginRight: "20px", marginTop: "20px" }}>Checkout</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">

                    </div>
                </div>
            </div>
        );
    }
}


const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { updateUserCart })(CartPage);