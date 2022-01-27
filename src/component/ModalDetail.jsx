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
        if (this.props.detailProduk.stocks) {
            return this.props.detailProduk.stocks.map((item, index) => {
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
                return <Input disabled={!this.state.edit} type="text" defaultValue={item.url} placeholder={`Images-${index + 1}`} onChange={(e) => this.handleImages(e, index)} />
            })
        }
    }

    btSave = () => {
        let data = {
            name: this.inNama.value,
            idbrand: this.inBrand.value,
            idcategory: this.inKategori.value,
            description: this.inDeskripsi.value,
            price: this.inHarga.value,

            stocks: this.state.stock.length == 0 ? this.props.detailProduk.stocks : this.state.stock,
            images: this.state.images.length == 0 ? this.props.detailProduk.images : this.state.images
        }
        console.log("TESTING SAVE : ", data)
        axios.patch(`${API_URL}/products/${this.props.detailProduk.idproduct}`, data)
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
        temp[index].url = e.target.value
        this.setState({ images: temp })
    }

    handleType = (e, index) => {
        let temp = [...this.props.detailProduk.stocks];
        temp[index].type = e.target.value
        this.setState({ stock: temp })
    }
    handleStock = (e, index) => {
        let temp = [...this.props.detailProduk.stocks];
        temp[index].qty = e.target.value
        this.setState({ stock: temp })
    }

    render() {
        console.log("detailprod", this.props.detailProduk)
        let { idbrand, idcategory, name, description, brand_name, category, price } = this.props.detailProduk
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Detail Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input disabled={!this.state.edit} type="text" id="textNama" defaultValue={name} innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input disabled={!this.state.edit} type="text" defaultValue={description} id="textDes" innerRef={elemen => this.inDeskripsi = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="selectBrand">Brand</Label>
                                <Input type="select" id="selectBrand" innerRef={elemen => this.inBrand = elemen} defaultValue={brand_name}>
                                    <option value={idbrand}>{brand_name}</option>
                                    {
                                        this.props.brandList.map((val, index) => {
                                            if (idbrand != val.idbrand) {
                                                return <option value={val.idbrand} key={val.idbrand}>{val.brand}</option>
                                            }
                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textKategori">Kategori</Label>
                                <Input type="select" id="selectCategory" innerRef={elemen => this.inKategori = elemen} defaultValue={category}>
                                    <option value={idcategory} >{category}</option>
                                    {
                                        this.props.categoryList.map((val, index) => {
                                            if (idcategory != val.idcategory){
                                                return <option value={val.idcategory} key={val.idcategory}>{val.category}</option>
                                            }
                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="textHarga">Harga</Label>
                        <Input disabled={!this.state.edit} type="number" defaultValue={price} id="textHarga" innerRef={elemen => this.inHarga = elemen} />
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

const mapToProps = ({ productsReducer }) => {
    return {
        brandList: productsReducer.brand,
        categoryList: productsReducer.category
    }
}

export default connect(mapToProps, { getProductsAction })(ModalEditProduct);