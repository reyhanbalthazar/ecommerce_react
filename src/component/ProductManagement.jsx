import React from 'react';
import axios from 'axios';
import TableData from './TableData';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIdx: null,
            products: [],
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.getData();
    }

    btDetail = (idx) => {
        this.setState({ selectedIdx: idx })
    }

    getData = () => {
        axios.get(`http://localhost:2000/products/`)
            .then((response) => {
                console.log(response.data)
                this.setState({ products: response.data })
            }).catch((err) => {
                console.log(err)
            })
    }
    
   

    printTable = () => {
       
        return this.state.products.map((value, idx) => {
            return (
                <tr>
                    <td>{value.id}</td>
                    <td>{value.nama}</td>
                    <td>{value.brand}</td>
                    <td>{value.kategori}</td>
                    <td><img alt="..." width="100px" src={value.images[idx]} /></td>
                    <td>{value.harga}</td>
                    <td>
                        <Button className="btn" type="button" data-toggle="modal" data-target="#detailModal" color="info" onClick={this.toggle}>
                            Detail
                        </Button>
                        <Modal id="detailModal" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>
                                Detail Product
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="nama-produk">Nama Product</Label>
                                    <Input type="text" className="form-control" id="nama-produk" defaultValue={value.nama} onChange={(event) => this.handleInput(event.target.value, "namaProdukModal")} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="deskripsi-produk">Deskripsi Produk</Label>
                                    <Input type="text" id="deskripsi-produk" defaultValue={value.deskripsi} onChange={(event) => this.handleInput(event.target.value, "deskripsiProdukModal")} />
                                </FormGroup>
                                <FormGroup className="d-flex">
                                    <FormGroup className="m-1">
                                        <Label for="brand-produk">Brand</Label>
                                        <Input type="text" id="brand-produk" defaultValue={value.brand} onChange={(event) => this.handleInput(event.target.value, "brandProdukModal")} />
                                    </FormGroup>
                                    <FormGroup className="m-1">
                                        <Label for="kategori-produk">Kategori</Label>
                                        <Input type="text" id="kategori-produk" defaultValue={value.kategori} onChange={(event) => this.handleInput(event.target.value, "kategoriProdukModal")} />
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="harga-produk">Harga</Label>
                                    <Input type="number" id="harga-produk" defaultValue={value.harga} onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                                </FormGroup>
                                <Label>Stock</Label>
                                <FormGroup className="d-flex">
                                    <FormGroup className="m-1">
                                        <Input type="text" id="harga-produk" defaultValue={value.stock[0].type} onChange={(event) => this.handleInput(event.target.value, "stockTypeProdukModal")} />
                                        <Input type="text" id="harga-produk" defaultValue={value.stock[1].type} onChange={(event) => this.handleInput(event.target.value, "stockTypeProdukModal")} />
                                    </FormGroup>
                                    <FormGroup className="m-1">
                                        <Input type="number" id="harga-produk" defaultValue={value.stock[0].qty} onChange={(event) => this.handleInput(event.target.value, "stockQtyProdukModal")} />
                                        <Input type="number" id="harga-produk" defaultValue={value.stock[1].qty} onChange={(event) => this.handleInput(event.target.value, "stockQtyProdukModal")} />
                                    </FormGroup>
                                    <FormGroup className="m-1">
                                        <Button>Delete</Button>
                                        <Button>Delete</Button>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="images-produk">Images</Label>
                                    <Input type="text" id="images-produk" defaultValue={value.images[0]} onChange={(event) => this.handleInput(event.target.value, "imagesProdukModal")} />
                                    <Input type="text" id="images-produk" defaultValue={value.images[1]} onChange={(event) => this.handleInput(event.target.value, "imagesProdukModal")} />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle} >
                                    Edit
                                </Button>
                                {' '}
                                <Button onClick={this.toggle}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>
                        {/* <button className="btn btn-warning" type="button" data-toggle="modal" data-target="#detailModal" onClick={() => this.btDetail(idx)}>Detail</button> */}
                        <button>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <div>
                    <TableData cetak={this.printTable()} />
                    {/* {
                        this.state.products.length > 0 && this.state.selectedIdx != null ?
                            <ModalDetail
                                nama={this.state.products[this.state.selectedIdx].nama}
                                deskripsi={this.state.products[this.state.selectedIdx].deskripsi}
                                brand={this.state.products[this.state.selectedIdx].brand}
                                kategori={this.state.products[this.state.selectedIdx].kategori}
                                harga={this.state.products[this.state.selectedIdx].harga}
                                stock={this.state.products[this.state.selectedIdx].stock}
                                images={this.state.products[this.state.selectedIdx].images}
                                idx={this.state.selectedIdx.idx}
                            /> : null
                    } */}
                </div>
            </div>
        );
    }
}

export default ProductManagement;