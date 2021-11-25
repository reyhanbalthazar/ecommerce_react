import React from 'react';
import axios from 'axios';

import ModalDetail from './ModalDetail'
import { productAction } from '../redux/actions';
import { connect } from 'react-redux'

import { Button, Table } from 'reactstrap';

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIdx: null,
            products: [],
            modalEditOpen: false,
            detailProduk: {}
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
                        {/* <TableData cetak={this.printTable()} /> */}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default connect(null, { productAction })(ProductManagement);