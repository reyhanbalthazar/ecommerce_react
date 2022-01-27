import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, Input, InputGroup, Label } from 'reactstrap'
import { connect } from 'react-redux'
import { getProductsAction } from '../redux/actions';
import { Link } from 'react-router-dom';

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }
    }

    printProducts = () => {
        let { page } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-2">
                <Card className="shadow p-3 mb-5 bg-white rounded">
                    <Link to={`/product-detail?idproduct=${value.idproduct}`}>
                        <CardImg top
                            src={value.images[0].url}
                            width="100%"
                            alt={`${value.name}`}
                        />
                        <CardBody>
                            <CardTitle tag="h5" >{value.name}</CardTitle>
                            <CardTitle tag="h5" >Rp. {value.price.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / 8); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page === i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })} >
                {i + 1}
            </Button>)
        }
        return btn
    }

    btSearch = () => {
        this.props.getProductsAction({
            name: this.inSearchName.value,
            minimum: this.inSearchMinimum.value,
            maximum: this.inSearchMaximum.value
        })
        this.setState({ page: 1 })
    }

    btReset = () => {
        this.props.getProductsAction()
        this.inSearchName.value = ""
        this.inSearchMinimum.value = null
        this.inSearchMaximum.value = null
    }

    btRemove = () => {

    }

    btSort = () => {
        console.log(this.inSearchSort.value)
        if (this.inSearchSort.value === "price-asc") {
            this.props.getProductsAction({
                hargaAsc: this.inSearchSort.value
            })
        } else if (this.inSearchSort.value === "price-desc") {
            this.props.getProductsAction({
                hargaDesc: this.inSearchSort.value
            })
        } else if (this.inSearchSort.value === "name-asc") {
            this.props.getProductsAction({
                namaAsc: this.inSearchSort.value
            })
        } else if (this.inSearchSort.value === "name-desc") {
            this.props.getProductsAction({
                namaDesc: this.inSearchSort.value
            })
        } else {
            this.props.getProductsAction()
        }
    }

    render() {
        return (
            <div className="pt-5">
                {console.log("this.props.productsList", this.props.productsList)}
                <div className="container">
                    <div className="row">
                        <div className="row md-5">
                            <div className="p-5 shadow p-3 mb-5 bg-white rounded">
                                <div className="d-flex ">
                                    <Label>Nama</Label>
                                    <Label className="col-6">Harga</Label>
                                    <Label className="col-6">Sort</Label>
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <InputGroup style={{ width: "350px", float: "left" }}>
                                        <Input type="text" id="text" placeholder="Cari Produk"
                                            innerRef={(element) => this.inSearchName = element} />
                                    </InputGroup>

                                    <InputGroup style={{ width: "350px", marginLeft: "1vw" }}>
                                        <Input type="number" id="minimum" placeholder="Minimum"
                                            innerRef={(element) => this.inSearchMinimum = element} />
                                    </InputGroup>
                                    <InputGroup style={{ width: "350px", marginRight: "1vw" }}>
                                        <Input type="number" id="maximum" placeholder="Maximum"
                                            innerRef={(element) => this.inSearchMaximum = element} />
                                    </InputGroup>

                                    <Input type="select" style={{ width: "250px", float: "right" }} innerRef={(element) => this.inSearchSort = element}>
                                        <option value="price-asc">Harga Asc</option>
                                        <option value="price-desc">Harga Desc</option>
                                        <option value="name-asc">A-Z</option>
                                        <option value="name-desc">Z-A</option>
                                        <option value="idproduct-asc">Reset</option>
                                    </Input>
                                    <Button color="primary" onClick={this.btSort}>Sort</Button>
                                </div>
                                <div style={{ float: "right", marginTop: "5px" }}>
                                    <Button outline color="warning" onClick={this.btReset}>Reset</Button>
                                    <Button color="primary" onClick={this.btSearch}>Filter</Button>
                                </div>
                            </div>
                            {this.printProducts()}
                        </div>
                    </div>
                    <div>
                        <ButtonGroup>
                            {this.printBtPagination()}
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productsReducer }) => {
    console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction })(ProductsPage);