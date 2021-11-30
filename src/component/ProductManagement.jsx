import React from 'react';
import axios from 'axios';

import ModalDetail from './ModalDetail'
import { productAction } from '../redux/actions';
import { connect } from 'react-redux'

import { Button, Table } from 'reactstrap';
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
            thumbnailIdx: null
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

    printTable = () => {
        return this.state.products.map((value, idx) => {
            return (
                <tr>
                    <td>{value.id}</td>
                    <td>{value.nama}</td>
                    <td>{value.brand}</td>
                    <td>{value.kategori}</td>
                    <td style={{ width: '20vw', textAlign: 'center' }}>
                        {
                            this.state.selectedIdx == idx ?
                                <img src={value.images[this.state.thumbnailIdx]} width="200px" alt={value.nama + idx} />
                                :
                                <img src={value.images[0]} width="200px" alt={value.nama + idx} />
                        }
                        <div>
                            {value.images.map((val, index) => {
                                return <img src={val} width="100px" alt={value.nama + idx} 
                                onClick={()=> this.setState({thumbnailIdx: index, selectedIdx:idx})} />
                            })}
                        </div>
                    </td>
                    <td>{value.harga}</td>
                    <td>
                        <Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: value, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button>
                        <Button size="sm" color="danger" onClick={() => this.onBtDelete(value.idproduct)}>Delete</Button>
                    </td>
                </tr>
            )
        })
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
                <Button type="button" size="sm" color="info" onClick={() => this.setState({ modalAddOpen: !this.state.modalAddOpen })}>ADD</Button>
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
        );
    }
}

export default connect(null, { productAction })(ProductManagement);