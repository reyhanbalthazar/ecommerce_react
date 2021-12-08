import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Card } from 'reactstrap'


const ModalTransaksi = (props) => {

    const totalQty = () => {
        let total = 0
        props.cart.forEach((val) => {
            total += val.qty
        });
        return total
    }

    const printDetailProduk = () => {
        return props.dataTransaksi.detail.map((value, index) => {
            return (
                <Card>
                    <div className="row">
                        <div className="col-md-2">
                            <img style={{margin:"auto", display:"block"}} src={props.dataTransaksi.detail[index].images} width="100%" />
                        </div>
                        <div className="col-md-6">
                            {/* NAMA, QTY, dan HARGA per pcs */}
                            <p style={{ fontWeight: "bold" }}>{props.dataTransaksi.detail[index].nama}</p>
                            <p className="text-muted">{value.qty} x Rp. {props.dataTransaksi.detail[index].harga.toLocaleString()}</p>
                        </div>
                        <div className="col-md-4">
                            {/* TOTAL HARGA */}
                            <p>Total Harga</p>
                            <p style={{ fontWeight: "bold" }}>Rp. {props.dataTransaksi.detail[index].totalHarga.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
            )
        })
    }


    return (
        <Modal isOpen={props.openModal}
            toggle={props.toggleModal} size="lg">
            <ModalHeader className="d-block shadow-sm">
                <span className="material-icons" style={{ float: "right" }}>
                    close
                </span>
                <div style={{ textAlign: "center" }} >
                    <h4 style={{ fontWeight: "700" }}>Detail Transaksi</h4>
                </div>
            </ModalHeader>
            <ModalBody>
                {
                    props.dataTransaksi.detail ?
                        <div className="row">
                            <div className="col-md-8 pt-2 px-0" style={{ backgroundColor: "#F3F4F5" }}>
                                <Card className="px-4 rounded" style={{ border: "none" }}>
                                    <p style={{ fontWeight: "bold" }}>{props.dataTransaksi.status}</p>
                                    <span className="d-flex justify-content-between">
                                        <p>No. Invoice</p>
                                        <p style={{ fontWeight: "bold", color: "#3498db" }}>{props.dataTransaksi.invoice}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Tanggal Pembelian</p>
                                        <p>{props.dataTransaksi.date}</p>
                                    </span>
                                </Card>
                                <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                                    <p style={{ fontWeight: "bold" }}>Detail Produk</p>
                                    {printDetailProduk()}
                                </Card>
                                <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                                    <p style={{ fontWeight: "bold" }}>Rincian Pembayaran</p>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Harga barang {totalQty()}</p>
                                        <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. {((props.dataTransaksi.totalPayment) - (props.dataTransaksi.ongkir)).toLocaleString()}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Ongkos Kirim</p>
                                        <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. {props.dataTransaksi.ongkir.toLocaleString()}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Bayar</p>
                                        <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp.  {props.dataTransaksi.totalPayment.toLocaleString()}</p>
                                    </span>
                                </Card>
                            </div>
                            <div className="col-md-4 p-3">
                                <Button outline size="lg" className="my-2" style={{ width: "100%" }}>Chat Penjual</Button>
                                <Button outline size="lg" style={{ width: "100%" }}>Bantuan</Button>
                            </div>
                        </div>
                        : <p>No Data</p>
                }
            </ModalBody>
        </Modal >
    )
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart
    }
}


export default connect(mapToProps)(ModalTransaksi) ;