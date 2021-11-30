import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    printProducts = () => {
        let { page } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-2">
                <Card>
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

    render() {
        return (
            <div className="pt-5">
                <div className="container">
                    <div style={{ display: "block" }}>
                        <Input type="select" style={{ width: "250px", float: "right" }}>
                            <option value="harga-asc">Harga Asc</option>
                            <option value="harga-desc">Harga Desc</option>
                            <option value="nama-asc">A-Z</option>
                            <option value="nama-desc">Z-A</option>
                            <option value="id-asc">Reset</option>
                        </Input>
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

export default connect(mapToProps)(ProductsPage);