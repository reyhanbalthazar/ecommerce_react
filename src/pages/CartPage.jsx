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
            ongkir: 0
        }
    }

    componentDidMount() {
        this.printTotalPayment()
    }

    onBtInc = (index) => {
        this.props.cart[index].qty += 1
        this.props.cart[index].totalHarga += this.props.cart[index].harga
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
        } else {
            this.props.cart.splice(index, 1)
        }
        // console.log("qty", this.props.cart[index].qty)
        axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, { cart: this.props.cart })
            .then((res) => {
                this.props.updateUserCart(res.data.cart)
            }).catch((err) => {
                console.log(err)
            })
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
        return total + this.state.ongkir
    }

    onBtCheckout = () => {
        let date = new Date()
        axios.post(`${API_URL}/userTransactions`, {
            iduser: this.props.iduser,
            username: this.props.username,
            invoice: `#INV${date.getTime()}`,
            date: date.toLocaleString(),
            notes: this.notes.value,
            totalPayment: this.totalPayment(),
            ongkir: parseInt(this.state.ongkir),
            detail: [...this.props.cart],
            status: "Menunggu Konfirmasi"
        }).then((res) => {
            this.props.updateUserCart([], this.props.iduser)
            this.setState({ ongkir: 0 })
        }).catch((err) => {
            console.log(err)
        })
        // const d = new Date();
        // let data = {
        //     iduser: this.props.iduser,
        //     username: this.props.username,
        //     invoice: `#INV${d.getTime()}`,
        //     date : d.toLocaleDateString(),
        //     totalPayment: this.totalPayment() + parseInt(this.ongkir.value),
        //     detail: this.props.cart,
        //     notes: this.notes.value,
        //     status: "Menunggu Konfirmasi"
        // }
        // console.log("Checkout", data)
        // axios.post(`${API_URL}/userTransactions`, data)
        //     .then((res) => {

        //     }).catch((err) => {
        //         console.log(err)
        //     })
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
                                <h4 style={{ fontWeight: "bolder" }}>Rp {(this.totalPayment()).toLocaleString()}</h4>
                            </div>
                            <div className="">
                                <div>
                                    <label>Biaya Pengiriman</label>
                                </div>
                                <div>
                                    <Input type="text" id="ongkir" defaultValue="0" onChange={(e) => this.setState({ ongkir: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <label>Notes</label>
                                </div>
                                <div>
                                    <Input type="textarea" id="notes"  innerRef={elemen => this.notes = elemen} />
                                </div>
                            </div>
                            <div>
                                <Button style={{ float: "right", marginRight: "20px", marginTop: "20px" }} onClick={this.onBtCheckout}>Checkout</Button>
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
        iduser: state.userReducer.id,
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { updateUserCart })(CartPage);