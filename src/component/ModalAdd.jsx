import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { API_URL } from '../helper';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            images: []
        }
    }

    onBtAddStock = () => {
        // let tempStock = [...this.state.stock]
        this.state.stocks.push({ id: null, type: null, qty: null })
        this.setState({ stock: this.state.stocks })
    }

    // menambah penampung data image pada state.images
    onBtAddImages = () => {
        this.state.images.push("")
        this.setState({ images: this.state.images })
    }

    printStock = () => {
        if (this.state.stocks.length > 0) {
            return this.state.stocks.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => this.onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    // render element input form image
    printImages = () => {
        if (this.state.images.length > 0) {
            return this.state.images.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Images-${index + 1}`}
                            onChange={(e) => this.handleImages(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => this.onBtDeleteImage(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    onBtDeleteStock = (index) => {
        this.state.stocks.splice(index, 1)
        this.setState({ stocks: this.state.stocks })
    }

    onBtDeleteImage = (index) => {
        this.state.images.splice(index, 1)
        this.setState({ images: this.state.images })
    }

    // Untuk set value kedalam state.images
    handleImages = (e, index) => {
        let temp = [...this.state.images]
        temp[index] = e.target.value
        this.setState({ images: temp })
    }

    handleType = (e, index) => {
        let temp = [...this.state.stocks]
        temp[index].type = e.target.value;
        this.setState({ stocks: temp })
    }

    handleStock = (e, index) => {
        let temp = [...this.state.stocks]
        temp[index].qty = parseInt(e.target.value)
        this.setState({ stocks: temp })
    }

    onBtCancel = () => {
        this.setState({ stocks: [], images: [] })
        // fungsi untuk close modal
        this.props.btClose()
    }

    btSubmit = () => {
        let data = {
            name: this.inNama.value,
            idbrand: this.inBrand.value,
            description: this.inDeskripsi.value,
            idcategory: this.inKategori.value,
            price: parseInt(this.inHarga.value),
            stocks: this.state.stocks,
            images: this.state.images
        }
        console.log(data)
        if (data.nama == "" || data.brand == "" || data.deskripsi == "" || data.kategori == "" || data.stocks.length == 0 || data.images.length == 0) {
            alert("Isi semua form")
        } else {
            axios.post(`${API_URL}/products`, data)
                .then(res => {
                    console.log(res.data)
                    this.props.getData()
                    alert('Add Product Success')
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    onBtCancel = () => {
        this.setState({ stock: [], images: [] })
        // fungsi untuk close modal
        this.props.btClose()
    }

    render() {
        console.log('ModalOpen', this.props.modalOpen)
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Add Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input type="text" id="textNama" innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input type="text" id="textDes" innerRef={elemen => this.inDeskripsi = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="selectBrand">Brand</Label>
                                <Input type="select" id="selectBrand" innerRef={elemen => this.inBrand = elemen} defaultValue={null}>
                                    <option value={null} >Choose...</option>
                                    {
                                        this.props.brandList.map((val, index) => <option value={val.idbrand} key={val.idbrand}>{val.brand}</option>)
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="textKategori">Kategori</Label>
                                <Input type="select" id="selectBrand" innerRef={elemen => this.inKategori = elemen}>
                                    <option value={null} >Choose...</option>
                                    {
                                        this.props.categoryList.map((val, index) => <option value={val.idcategory} key={val.idcategory}>{val.category}</option>)
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="textHarga">Harga</Label>
                        <Input type="number" id="textHarga" innerRef={elemen => this.inHarga = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Stock</Label>
                        <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={this.onBtAddStock}>Add Stock</Button>
                        {this.printStock()}
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Label>Images</Label>
                        <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={this.onBtAddImages} >Add Image</Button>
                        {this.printImages()}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary" onClick={this.btSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.onBtCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


const mapToProps = ({ productsReducer }) => {
    return {
        brandList: productsReducer.brand,
        categoryList: productsReducer.category
    }
}

export default connect(mapToProps)(ModalAdd);