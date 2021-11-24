import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        return (
            <div>
                <Button className="btn btn-warning" type="button" data-toggle="modal" data-target="#detailModal" color="danger" onClick={this.toggle}>
                    Detail
                </Button>
                <Modal id="detailModal" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Detail Product
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="nama-produk">Nama Product</Label>
                            <Input type="text" className="form-control" id="nama-produk" defaultValue={this.props.nama} onChange={(event) => this.handleInput(event.target.value, "namaProdukModal")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="deskripsi-produk">Deskripsi Produk</Label>
                            <Input type="text" id="deskripsi-produk" defaultValue={this.props.deskripsi}onChange={(event) => this.handleInput(event.target.value, "deskripsiProdukModal")} />
                        </FormGroup>
                        <FormGroup className="d-flex">
                            <FormGroup className="m-1">
                                <Label for="brand-produk">Brand</Label>
                                <Input type="text" id="brand-produk" defaultValue={this.props.brand} onChange={(event) => this.handleInput(event.target.value, "brandProdukModal")} />
                            </FormGroup>
                            <FormGroup className="m-1">
                                <Label for="kategori-produk">Kategori</Label>
                                <Input type="text" id="kategori-produk" defaultValue={this.props.kategori} onChange={(event) => this.handleInput(event.target.value, "kategoriProdukModal")} />
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga-produk">Harga</Label>
                            <Input type="number" id="harga-produk" defaultValue={this.props.harga} onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                        </FormGroup>
                        <Label>Stock</Label>
                        <FormGroup className="d-flex">
                            <FormGroup className="m-1">
                                <Input type="number" id="harga-produk" onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                            </FormGroup>
                            <FormGroup className="m-1">
                                <Input type="number" id="harga-produk" onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                            </FormGroup>
                            <FormGroup className="m-1">
                                <Button>Delete</Button>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="images-produk">Images</Label>
                            <Input type="text" id="images-produk" onChange={(event) => this.handleInput(event.target.value, "imagesProdukModal")} />
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
            </div>
        );
    }
}

export default ModalDetail;