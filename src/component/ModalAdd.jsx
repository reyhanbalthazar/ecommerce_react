import axios from 'axios';
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input, Row, Col, } from 'reactstrap';

class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputsStock: ['input-0'],
            inputsImage: [''],
            
        }
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }
    appendInputStock() {
        var newInput = `input-${this.state.inputsStock.length}`;
        this.setState(prevState => ({ inputsStock: prevState.inputsStock.concat([newInput]) }));
        console.log(this.state.inputsStock)
    }

    appendInputImages() {
        var newInput = `input-${this.state.inputsImage.length}`;
        this.setState(prevState => ({ inputsImage: prevState.inputsImage.concat([newInput]) }));
        console.log(this.state.inputsImage)
    }
    btSubmit() {
        axios.post(`http://localhost:2000/products`, {

        })
    }

    render() {
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Detail Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Produk</Label>
                        <Input type="text" id="textNama" innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input type="text" id="textDes" innerRef={elemen => this.inDeskripsi = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textBrand">Brand</Label>
                                <Input type="text" id="textBrand" innerRef={elemen => this.inBrand = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textKategori">Kategori</Label>
                                <Input type="text" id="textKategori" innerRef={elemen => this.inKategori = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="textHarga">Harga</Label>
                        <Input type="number" id="textHarga" innerRef={elemen => this.inHarga = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <div>
                            <Button onClick={() => this.appendInputStock()}>
                                Add Stock
                            </Button>
                        </div>
                        <Label>Stock</Label>
                        <Form className="d-flex">
                            <div id="dynamicInput">
                                {this.state.inputsStock.map(input => <Input key={input} placeholder="Type"/>)}
                            </div>
                            <div id="dynamicInput">
                                {this.state.inputsStock.map(input => <Input key={input} placeholder="Qty" type="number"/>)}
                            </div>
                            <div id="dynamicInput">
                                <Button>DELETE</Button>
                            </div>
                        </Form>
                    </FormGroup>
                    <FormGroup>
                        <div>
                            <Button onClick={() => this.appendInputImages()}>
                                Add Images
                            </Button>
                        </div>
                        <Label>Images</Label>
                        <Form>
                            <div id="dynamicInput">
                                {this.state.inputsImage.map(input => <Input key={input} placeholder="Images"/>)}
                            </div>
                        </Form>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary" onClick={this.btSubmit}>Save</Button>

                    <Button color="secondary" onClick={() => {
                        this.setState({ edit: !this.state.edit })
                        this.props.btClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalAdd;