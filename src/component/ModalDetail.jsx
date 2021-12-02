import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductsAction } from '../redux/actions'

class ModalEditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            images: [],
            edit: false
        }
    }

    printStock = () => {
        if (this.props.detailProduk.stock) {
            return this.props.detailProduk.stock.map((item, index) => {
                return <Row>
                    <Col>
                        <Input disabled={!this.state.edit} type="text" defaultValue={item.type} placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input disabled={!this.state.edit} type="number" defaultValue={item.qty} placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    printImages = () => {
        if (this.props.detailProduk.images) {
            return this.props.detailProduk.images.map((item, index) => {
                return <Input disabled={!this.state.edit} type="text" defaultValue={item} placeholder={`Images-${index + 1}`} onChange={(e) => this.handleImages(e, index)} />
            })
        }
    }

    btSave = () => {
        let data = {
            nama: this.inNama.value,
            brand: this.inBrand.value,
            kategori: this.inKategori.value,
            deskripsi: this.inDeskripsi.value,
            harga: this.inHarga.value,
            stock: this.state.stock.length == 0 ? this.props.detailProduk.stock : this.state.stock,
            images: this.state.images.length == 0 ? this.props.detailProduk.images : this.state.images
        }
        console.log("TESTING SAVE : ", data)
        axios.patch(`${API_URL}/products/${this.props.detailProduk.id}`, data)
            .then((res) => {
                this.props.getProductsAction();
                this.props.btClose()
                this.setState({ stock: [], images: [], edit: !this.state.edit })
            }).catch((err) => {
                console.log(err)
            })
    }

    handleImages = (e, index) => {
        let temp = [...this.props.detailProduk.images]
        temp[index] = e.target.value
        this.setState({ images: temp })
    }

    handleType = (e, index) => {
        let temp = [...this.props.detailProduk.stock];
        temp[index].type = e.target.value
        this.setState({ stock: temp })
    }
    handleStock = (e, index) => {
        let temp = [...this.props.detailProduk.stock];
        temp[index].stock = e.target.value
        this.setState({ stock: temp })
    }

    render() {
        let { nama, deskripsi, brand, kategori, harga } = this.props.detailProduk
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Detail Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input disabled={!this.state.edit} type="text" id="textNama" defaultValue={nama} innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input disabled={!this.state.edit} type="text" defaultValue={deskripsi} id="textDes" innerRef={elemen => this.inDeskripsi = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textBrand">Brand</Label>
                                <Input disabled={!this.state.edit} type="text" defaultValue={brand} id="textBrand" innerRef={elemen => this.inBrand = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textKategori">Kategori</Label>
                                <Input disabled={!this.state.edit} type="text" defaultValue={kategori} id="textKategori" innerRef={elemen => this.inKategori = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="textHarga">Harga</Label>
                        <Input disabled={!this.state.edit} type="number" defaultValue={harga} id="textHarga" innerRef={elemen => this.inHarga = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Stock</Label>
                        {this.printStock()}
                    </FormGroup>
                    <FormGroup>
                        <Label>Images</Label>
                        {this.printImages()}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {
                        this.state.edit ?
                            <Button type="button" color="primary" onClick={this.btSave}>Save</Button>
                            : <Button type="button" color="primary" onClick={() => this.setState({ edit: !this.state.edit })}>Edit</Button>
                    }
                    <Button color="secondary" onClick={() => {
                        this.setState({ edit: !this.state.edit })
                        this.props.btClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default connect(null, { getProductsAction })(ModalEditProduct);

// import React from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

// class ModalDetail extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             products: [],
//             modal: false
//         }
//         this.toggle = this.toggle.bind(this);
//     }
//     handleInput = (value, propState) => {
//         console.log(value, propState)
//         this.setState({ [propState]: value })
//     }
//     toggle() {
//         this.setState({
//             modal: !this.state.modal
//         });
//     }
//     render() {
//         return (
//             <div>
//                 <Button className="btn btn-warning" type="button" data-toggle="modal" data-target="#detailModal" color="danger" onClick={this.toggle}>
//                     Detail
//                 </Button>
//                 <Modal id="detailModal" isOpen={this.state.modal} toggle={this.toggle}>
//                     <ModalHeader toggle={this.toggle}>
//                         Detail Product
//                     </ModalHeader>
//                     <ModalBody>
//                         <FormGroup>
//                             <Label for="nama-produk">Nama Product</Label>
//                             <Input type="text" className="form-control" id="nama-produk" defaultValue={this.props.nama} onChange={(event) => this.handleInput(event.target.value, "namaProdukModal")} />
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="deskripsi-produk">Deskripsi Produk</Label>
//                             <Input type="text" id="deskripsi-produk" defaultValue={this.props.deskripsi}onChange={(event) => this.handleInput(event.target.value, "deskripsiProdukModal")} />
//                         </FormGroup>
//                         <FormGroup className="d-flex">
//                             <FormGroup className="m-1">
//                                 <Label for="brand-produk">Brand</Label>
//                                 <Input type="text" id="brand-produk" defaultValue={this.props.brand} onChange={(event) => this.handleInput(event.target.value, "brandProdukModal")} />
//                             </FormGroup>
//                             <FormGroup className="m-1">
//                                 <Label for="kategori-produk">Kategori</Label>
//                                 <Input type="text" id="kategori-produk" defaultValue={this.props.kategori} onChange={(event) => this.handleInput(event.target.value, "kategoriProdukModal")} />
//                             </FormGroup>
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="harga-produk">Harga</Label>
//                             <Input type="number" id="harga-produk" defaultValue={this.props.harga} onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
//                         </FormGroup>
//                         <Label>Stock</Label>
//                         <FormGroup className="d-flex">
//                             <FormGroup className="m-1">
//                                 <Input type="number" id="harga-produk" onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
//                             </FormGroup>
//                             <FormGroup className="m-1">
//                                 <Input type="number" id="harga-produk" onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
//                             </FormGroup>
//                             <FormGroup className="m-1">
//                                 <Button>Delete</Button>
//                             </FormGroup>
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="images-produk">Images</Label>
//                             <Input type="text" id="images-produk" onChange={(event) => this.handleInput(event.target.value, "imagesProdukModal")} />
//                         </FormGroup>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="primary" onClick={this.toggle} >
//                             Edit
//                         </Button>
//                         {' '}
//                         <Button onClick={this.toggle}>
//                             Close
//                         </Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         );
//     }
// }

// export default ModalDetail;