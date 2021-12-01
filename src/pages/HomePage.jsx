import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Carousel, CarouselIndicators, CarouselItem, CarouselCaption, CarouselControl, UncontrolledCarousel } from 'reactstrap'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getData()
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

    printCarousel = () => {
        return (
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1633114127824-14b3207d7d74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://images.unsplash.com/photo-1633113088983-12fb3b2fe0ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://images.unsplash.com/photo-1633114129669-78b1ff09902b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        )
    }

    printFeaturette = () => {
        return this.state.products.map((value, idx) => {
            return (
                <div>
                    {/*  FEATURETTE 1 */}
                    <div className="row featurette" style={{ backgroundColor: "transparent", display: "flex", marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}>
                        <div className="col-md-7" style={{ margin: "auto" }}>
                            <div className="col-12" style={{ margin: "auto" }}>
                                <h1 className="display-4 ">{value.nama}</h1>
                            </div>
                            <div className="col-12" style={{ margin: "auto" }}>
                                <p className="lead">{value.deskripsi}</p>
                            </div>
                            <div className="col-12" style={{ margin: "auto" }}>
                                <h1 className="display-4 ">Rp. {value.harga}</h1>
                            </div>
                        </div>
                        <div className="col-md-5" style={{ marginRight: "auto" }}>
                            <img width="500px" height="500px" src={value.images[0]} />
                        </div>
                    </div>
                    {/*  END OF FEATURETTE 1 */}
                    <hr style={{ marginTop: "20px", color: '#000000', backgroundColor: '#000000', height: .5, borderColor: '#000000' }} />
                    {/*  FEATURETTE 2 */}
                    {/* <div className="row featurette" style={{ backgroundColor: "transparent", display: "flex", marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}>

                        <div className="col-md-7 order-md-2" style={{ margin: "auto" }}>
                            <div className="col-12">
                                <h1 className="display-4">Oh yeah, it’s that good. See for yourself.</h1>
                            </div>
                            <div className="col-12">
                                <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                            </div>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <img width="500px" height="500px" src="https://images.unsplash.com/photo-1529524987368-af489318987c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MXgxfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </div> */}
                    {/*  END OF FEATURETTE 2 */}
                    <hr style={{ marginTop: "20px", color: '#000000', backgroundColor: '#000000', height: .5, borderColor: '#000000' }} />
                    {/*  FEATURETTE 3 */}
                    {/* <div className="row featurette" style={{ backgroundColor: "transparent", display: "flex", marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}>

                        <div className="col-md-7" style={{ margin: "auto" }}>
                            <div className="col-12" style={{ margin: "auto" }}>
                                <h1 className="display-4">And lastly, this one. Checkmate.</h1>
                            </div>
                            <div className="col-12" style={{ margin: "auto" }}>
                                <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                            </div>
                        </div>
                        <div className="col-md-5" style={{ marginRight: "auto" }}>
                            <img width="500px" height="500px" src="https://images.unsplash.com/photo-1529524987368-af489318987c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MXgxfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    </div> */}
                    {/*  END OF FEATURETTE 3 */}
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div>
                    {this.printCarousel()}
                </div>
                <div>
                    {this.printFeaturette()}
                </div>
            </div>
        );
    }
}



export default connect()(HomePage);