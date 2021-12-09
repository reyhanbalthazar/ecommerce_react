import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import ModalTransaksi from '../component/ModalTransaksi';
class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: [],
            openModal: false,
            detail: {},
            selectedIdx: null
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData(){
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ transaksi: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtCancel = (id) => {
        axios.patch(`${API_URL}/userTransactions/${id}`,{
            status:"Pesanan Batal"
        }).then((res)=> {
            console.log(res)   
            this.getData()   
            this.setState({openModal:false})      
        }).catch((err)=> {
            console.log(err)
        })
    }

    printHistory = () => {
        return this.state.transaksi.map((value, index) => {
            let badgeColor = value.status.includes("Pesanan Batal")?"danger":"warning"
            return <div className="shadow p-3 rounded">
                <div className="shadow-sm p-2">
                    <span>{value.date} <Badge color={badgeColor}>{value.status}</Badge> </span>
                    <b style={{ marginLeft: 20 }}>{value.invoice}</b>
                </div>
                <div className="row p-3">
                    <div className="col-md-1">
                        <img src={value.detail[0].images} width="100%" />
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
                    <Button color="danger" onClick={() => this.onBtCancel(value.id)}>Batalkan Pesanan</Button>
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
                {/* Modal Transaksi */}
                <ModalTransaksi
                    dataTransaksi={this.state.detail}
                    onBtCancel={this.onBtCancel}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                />
                <h1>History Transaction page user</h1>
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

export default connect(mapToProps)(HistoryPage);