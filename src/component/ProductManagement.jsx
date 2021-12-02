import React from 'react';
import axios from 'axios';

import ModalDetail from './ModalDetail'
import { getProductsAction } from '../redux/actions';
import { connect } from 'react-redux'

import { Button, ButtonGroup, Table, Input, InputGroup, Label } from 'reactstrap';
import ModalAdd from './ModalAdd';

import { API_URL } from '../helper';


class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIdx: null,
            products: [],
            modalEditOpen: false,
            modalAddOpen: false,
            detailProduk: {},
            thumbnailIdx: null,
            page: 1,
            selectedPage: 4
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
                this.props.productAction(response.data[0])
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtAdd = () => {
        let data = {
            nama: this.inNama.value,
            brand: this.inBrand.value,
            deskripsi: this.inDeskripsi.value,
            kategori: this.inKategori.value,
            harga: parseInt(this.inHarga.value),
            stock: this.state.stock,
            images: this.state.images
        }
        console.log(this.state.images)
        if (data.nama == "" || data.brand == "" || data.deskripsi == "" || data.kategori == "" || data.stock.length == 0 || data.images.length == 0) {
            alert("Isi semua form")
        } else {
            axios.post(API_URL + '/products', data)
                .then(res => {
                    console.log(res.data)
                    this.props.getData()
                    alert('Add Product Success')
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    onBtDelete = (id) => {
        axios.delete(`${API_URL}/products/${id}`)
            .then((res) => {
                this.props.getProductsAction();
            }).catch((err) => {
                console.log(err)
            })
    }

    printBtPagination = () => {
        let btn = []
        let { selectedPage } = this.state
        for (let i = 0; i < Math.ceil(this.props.productsList.length / (selectedPage)); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })} >
                {i + 1}
            </Button>)
        }
        return btn
    }

    printTable = () => {
        let { page, selectedPage} = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * (selectedPage) : page - 1, page * (selectedPage)).map((value, idx) => {
            return (
                <tr>
                    <td>{page > 1 ? (page - 1) * selectedPage + idx + 1 : idx + 1}</td>
                    <td>{value.nama}</td>
                    <td>{value.brand}</td>
                    <td>{value.kategori}</td>
                    <td style={{ width: '20vw', textAlign: 'center' }}>
                        {
                            this.state.selectedIdx == idx ?
                                <img src={value.images[this.state.thumbnailIdx]} width="100px" alt={value.nama + idx} />
                                :
                                <img src={value.images[0]} width="100px" alt={value.nama + idx} />
                        }
                        <div>
                            {value.images.map((val, index) => {
                                return <img src={val} width="50px" alt={value.nama + idx}
                                    onClick={() => this.setState({ thumbnailIdx: index, selectedIdx: idx })} />
                            })}
                        </div>
                    </td>
                    <td>{value.harga.toLocaleString()}</td>
                    <td>
                        <Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: value, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button>
                        <Button size="sm" color="danger" onClick={() => this.onBtDelete(value.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    onChangePage = (event) => {
        console.log(event.target.value);
        this.setState({ selectedPage: parseInt(event.target.value) })
    }

    btSearch = () => {
        this.props.getProductsAction(this.inSearchName.value, this.inSearchMinimum.value, this.inSearchMaximum.value)
        this.setState({ page: 1 })
    }

    btReset = () => {
        this.props.getProductsAction()
        this.inSearchName.value = ""
        this.inSearchMinimum.value = null
        this.inSearchMaximum.value = null
    }

    btSort = () => {
        console.log(this.inSearchSort.value)
        if (this.inSearchSort.value == "harga-asc") {
            this.props.getProductsAction({
                hargaAsc: this.inSearchSort.value
            })
        } else if (this.inSearchSort.value == "harga-desc") {
            this.props.getProductsAction({
                hargaDesc: this.inSearchSort.value
            })
        } else if (this.inSearchSort.value == "nama-asc") {
            this.props.getProductsAction({
                namaAsc: this.inSearchSort.value
            })
        } else if (this.inSearchSort.value == "nama-desc") {
            this.props.getProductsAction({
                namaDesc: this.inSearchSort.value
            })
        } else {
            this.props.getProductsAction()
        }
    }

    render() {
        return (
            <div>
                <ModalDetail
                    modalOpen={this.state.modalEditOpen}
                    detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })}
                />
                <ModalAdd
                    modalOpen={this.state.modalAddOpen}
                    btClose={() => this.setState({ modalAddOpen: !this.state.modalAddOpen })}
                    getData={this.getData}
                />
                <div className="row d-flex pt-5">
                    <div className="col-1">

                    </div>
                    <div className="col-md-3 p-5 shadow mb-5 bg-white rounded" style={{ height: "500px" }}>
                        <div>
                            <Button style={{ width: "100%" }} type="button" size="md" color="info" onClick={() => this.setState({ modalAddOpen: !this.state.modalAddOpen })}>ADD</Button>
                            <div className="" style={{ marginTop: "10px" }}>
                                <Label>Nama</Label>
                                <InputGroup style={{ width: "100%" }}>
                                    <Input type="text" id="text" placeholder="Cari Produk"
                                        innerRef={(element) => this.inSearchName = element} />
                                </InputGroup>
                            </div>
                            <div className="" style={{ marginTop: "10px" }}>
                                <Label className="col-6">Harga</Label>
                                <InputGroup style={{ width: "100%" }}>
                                    <Input type="number" id="minimum" placeholder="Minimum"
                                        innerRef={(element) => this.inSearchMinimum = element} />
                                </InputGroup>
                                <InputGroup style={{ width: "100%" }}>
                                    <Input type="number" id="maximum" placeholder="Maximum"
                                        innerRef={(element) => this.inSearchMaximum = element} />
                                </InputGroup>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <Label className="col-6">Sort</Label>
                                <Input type="select" style={{ width: "100%" }} innerRef={(element) => this.inSearchSort = element}>
                                    <option value="harga-asc">Harga Asc</option>
                                    <option value="harga-desc">Harga Desc</option>
                                    <option value="nama-asc">A-Z</option>
                                    <option value="nama-desc">Z-A</option>
                                    <option value="id-asc">Reset</option>
                                </Input>
                                <Button style={{ marginTop: "10px" }} color="primary" onClick={this.btSort}>Sort</Button>
                            </div>
                        </div>
                        <div style={{ marginTop: "5px", float: "right" }}>
                            <Button outline color="warning" onClick={this.btReset}>Reset</Button>
                            <Button color="primary" onClick={this.btSearch}>Filter</Button>
                        </div>
                    </div>

                    <div className="col-md-9 shadow mb-5 bg-white rounded" style={{ width: "60vw" }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Kategori</th>
                                    <th scope="col">Gambar</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printTable()}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-1">

                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Input type="select" style={{ width: "80px" }} onChange={this.onChangePage}>
                        <option>SHOW PER PAGE</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                    </Input>
                    <ButtonGroup>
                        {this.printBtPagination()}
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        productsList: state.productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction })(ProductManagement);