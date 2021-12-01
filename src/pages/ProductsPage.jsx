import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, Input, InputGroup, InputGroupText, Label } from 'reactstrap'
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
                    <Link to={`/product-detail?id=${value.id}`}>
                        <CardImg top
                            src={value.images[0]}
                            width="100%"
                            alt={`${value.nama}-${index}`}
                        />
                        <CardBody>
                            <CardTitle tag="h5" >{value.nama}</CardTitle>
                            <CardTitle tag="h5" >Rp. {value.harga.toLocaleString()}</CardTitle>
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
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })} >
                {i + 1}
            </Button>)
        }
        return btn
    }

    btSearch = () => {
        this.props.getProductsAction(this.inSearchName.value, this.inSearchMinimum.value, this.inSearchMaximum.value)
        this.setState({ page: 1 })
    }

    btReset =()=>{
        this.props.getProductsAction()
        this.inSearchName.value=""
        this.inSearchMinimum.value=null
        this.inSearchMaximum.value=null
    }

    render() {
        return (
            <div className="pt-5">
                <div className="container">
                    <div className="p-5 shadow p-3 mb-5 bg-white rounded">
                        <div className="d-flex ">
                            <Label>Nama</Label>
                            <Label className="col-7">Harga</Label>
                            <Label className="col-6">Sort</Label>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <InputGroup style={{ width: "350px" }}>
                                <Input type="text" id="text" placeholder="Cari Produk"
                                    innerRef={(element) => this.inSearchName = element} />
                            </InputGroup>

                            <InputGroup style={{ width: "350px", marginLeft: "100px" }}>
                                <Input type="number" id="minimum" placeholder="Minimum"
                                    innerRef={(element) => this.inSearchMinimum = element} />
                            </InputGroup>
                            <InputGroup style={{ width: "350px", marginRight: "100px" }}>
                                <Input type="number" id="maximum" placeholder="Maximum"
                                    innerRef={(element) => this.inSearchMaximum = element} />
                            </InputGroup>

                            <Input type="select" style={{ width: "250px", float: "right" }}>
                                <option value="harga-asc">Harga Asc</option>
                                <option value="harga-desc">Harga Desc</option>
                                <option value="nama-asc">A-Z</option>
                                <option value="nama-desc">Z-A</option>
                                <option value="id-asc">Reset</option>
                            </Input>
                        </div>
                        <div style={{ float: "right", marginTop: "5px" }}>
                            <Button outline color="warning" onClick={this.btReset}>Reset</Button>
                            <Button color="primary" onClick={this.btSearch}>Filter</Button>
                        </div>
                    </div>
                    <div className="row">
                        {this.printProducts()}
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