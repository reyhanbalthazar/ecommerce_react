import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import ModalTransaksi from '../component/ModalTransaksi';

class TransactionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: [],
            openModal: false,
            detail: {},
            selectedIdx: null,
            status: ["Semua", "Menunggu Konfirmasi", "Terima Pesanan", "Pesanan Batal"],
            statusIdx: 0
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        axios.get(`${API_URL}/userTransactions`)
            .then((res) => {
                console.log(res.data)
                this.setState({ transaksi: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtConfirm = (id, confirm) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, {
            status: confirm
        }).then((res) => {
            console.log(res)
            this.getData()
            this.setState({ openModal: false })
        }).catch((err) => {
            console.log(err)
        })
    }

    getTransaksiFilter = (status, statusActive) => {
        axios.get(`${API_URL}/userTransactions${statusActive > 0 ? `?status=${status}` : ""}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ transaksi: res.data, statusIdx: statusActive })
            }).catch((err) => {
                console.log(err)
            })
    }

    printHistory = () => {
        return this.state.transaksi.map((value, index) => {

            let badgeColor = value.status.includes("Batal") ? "danger" : value.status.includes("Terima") ? "success" : "warning"

            return <div className="shadow p-3 rounded">
                <div className="shadow-sm p-2">
                    <span style={{ float: "left" }}>{value.date} <Badge color={badgeColor}>{value.status}</Badge> </span>
                    <b >{value.invoice}</b>
                    <span style={{ float: "right" }}> User : {value.username}</span>
                </div>
                <div className="row p-3">
                    <div className="col-md-1">
                        <img src={value.detail[0].images} width="100%" alt='...' />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                        <h4 style={{ fontWeight: "bolder" }}>{value.detail[0].nama}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>
                        {
                            value.detail.length > 1 ?
                                <a className="text-muted" style={{ cursor: "pointer" }}>+{value.detail.length - 1} Produk Lainnya</a>
                                : <p> </p>
                        }
                    </div>
                    <div className="col-md-4">
                        <p className="text-muted">Total Belanja</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.totalPayment.toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <Button color="danger" outline type="button" onClick={() => this.onBtConfirm(value.id, "Pesanan Batal")}>Batalkan Pesanan</Button>
                    <Button color="success" onClick={() => this.onBtConfirm(value.id, "Terima Pesanan")}>Terima Pesanan</Button>
                    <Button color="primary"
                        outline style={{ border: "none" }}
                        onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}>
                        Lihat Detail Produk
                    </Button>
                </div>
            </div>
        })
    }

    render() {
        return (
            <div className="container p-5">
                {
                    <ModalTransaksi
                        dataTransaksi={this.state.detail}
                        onBtCancel={this.onBtCancel}
                        openModal={this.state.openModal}
                        toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                    />
                }
                <h1 className="mb-4">History Transaction page admin</h1>
                <div className="d-flex justify-content-evenly">
                    {
                        this.state.status.map((value, index) => {
                            return <Button outline
                                color={this.state.statusIdx === index ? "primary" : "secondary"}
                                style={{ border: "none", width: "100%", borderBottom: this.state.statusIdx === index && "3px solid #0984E3" }}
                                type='button'
                                onClick={()=> this.getTransaksiFilter(value, index)}
                                >
                                <h6 style={{ fontWeight: "bold" }}>{value}</h6>
                            </Button>
                        })
                    }
                </div>
                {this.printHistory()}
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id,
        role: state.userReducer.role,
        cart: state.userReducer.cart
    }
}

export default connect(mapToProps)(TransactionManagement);