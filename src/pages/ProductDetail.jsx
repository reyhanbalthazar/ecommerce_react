import axios from 'axios';
import React from 'react';
import { Button, Collapse, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { API_URL } from '../helper';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false,
            qty: 1,
            selectedType: {},
            toastOpen:false
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log(response.data)
                this.setState({ detail: response.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderImages = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1 shadow bg-white rounded" src={item}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }}
                />
            )
        })
    }

    onBtDec = () => {
        if (this.state.qty > 1) {
            this.setState({ qty: this.state.qty -= 1 })
        }
    }

    onBtInc = () => {
        if(this.state.selectedType.qty){
            if (this.state.qty < this.state.selectedType.qty) {
                this.setState({ qty: this.state.qty += 1 })
            } else {
                this.setState({toastOpen:!this.state.toastOpen})
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", left:10 }}>
                        <ToastHeader icon="warning"
                            toggle={() => this.setState({ toastOpen: false })}>
                            Add to cart warning
                        </ToastHeader>
                        <ToastBody>
                            Stok produk tidak cukup
                        </ToastBody>
                    </Toast>
                </div>
                <div className="container row p-5 m-auto shadow bg-white rounded mt-4">
                    {
                        this.state.detail.id &&
                        <>
                            <div className="col-md-1">
                                {this.renderImages()}
                            </div>
                            <div className="col-md-7 text-center">
                                <img className="shadow-sm bg-white rounded" src={this.state.detail.images[this.state.thumbnail]} width="80%" />
                            </div>
                            <div className="col-md-4">
                                <div style={{ borderBottom: '1.5px solid gray' }}>
                                    <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.nama}</h4>
                                    <h6 className="text-mute">{this.state.detail.kategori}</h6>
                                    <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.harga.toLocaleString()}</h2>
                                </div>
                                <div style={{ borderBottom: '1.5px solid gray' }}>
                                    <div
                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => this.setState({ openType: !this.state.openType })}>
                                        Type: {this.state.selectedType.type}</div>
                                    <Collapse isOpen={this.state.openType}>
                                        {
                                            this.state.detail.stock.map((item, index) => {
                                                return (
                                                    <div>
                                                        <Button outline color="secondary" size="sm"
                                                            style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                            onClick={() => this.setState({ selectedType: item, qty: 1 })}
                                                        > {item.type} : {item.qty}</Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </div>
                                <p className="my-3" style={{ textAlign: "justify" }}>
                                    {this.state.detail.deskripsi}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span>Jumlah :</span>
                                    <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                        <span className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onBtDec}>
                                            remove
                                        </span>
                                        <Input size="sm" placeholder="qty" value={this.state.qty} style={{ width: "40%", display: 'inline-block' }} />
                                        <span className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onBtInc}>
                                            add
                                        </span>
                                    </span>
                                </div>
                                <Button type="button" color="warning" style={{ width: '100%' }} onClick={this.onBtAddToCart}>Add to cart</Button>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default ProductDetail;

// import axios from 'axios';
// import React from 'react';
// import { API_URL } from '../helper';
// import { Button, CardBody, Input, UncontrolledCollapse, Card, Collapse, Toast, ToastHeader, ToastBody } from 'reactstrap';


// class ProductDetail extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             detailProduct: [],
//             thumbnailIdx: null,
//             selectedIdx: null,
//             counter: 0,
//             thumbnail: 0,
//             openType: false,
//             qty: 1,
//             selectedType: {},
//             toastOpen: false
//         }
//     }

//     componentDidMount() {
//         console.log("CEK URL DETAIL PAGE : ", window.location)
//         axios.get(`${API_URL}/products${window.location.search}`)
//             .then((response) => {
//                 console.log(response.data)
//                 this.setState({ detailProduct: response.data })
//                 console.log(this.state.qty)
//                 console.log(this.state.counter)
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }

//     handleInput = (value, propState) => {
//         console.log(value, propState)
//         this.setState({ [propState]: value })
//     }

//     increment = () => {
//         if (this.state.selectedType.qty) {
//             if (this.state.qty < this.state.selectedType.qty) {
//                 this.setState({ qty: this.state.qty += 1 })
//             } else {
//                 this.setState({ toastOpen: !this.state.toastOpen })
//             }
//         }
//         // this.setState({
//         //     counter: this.state.counter + 1
//         // });
//     }

//     decrement = () => {
//         this.setState({
//             counter: this.state.counter - 1
//         });
//     }

//     printDetail = () => {
//         return this.state.detailProduct.map((value, idx) => {
//             return (
//                 <div className="d-flex">
//                     <div className="col m-3 border">
//                         {value.images.map((val, index) => {
//                             return <img src={val} width="100px" className="row m-3 border border-danger" alt={value.nama + idx}
//                                 onClick={() => this.setState({ thumbnailIdx: index, selectedIdx: idx })} />
//                         })}
//                     </div>
//                     <div className="border m-3">
//                         {
//                             this.state.selectedIdx == idx ?
//                                 <img src={value.images[this.state.thumbnailIdx]} width="600rem" alt={value.nama + idx} />
//                                 :
//                                 <img src={value.images[0]} width="600rem" alt={value.nama + idx} />
//                         }
//                     </div>
//                     <div className="container border m-3">
//                         <div className="row m-3 border">
//                             <h2>{value.nama}</h2>
//                         </div>
//                         <div className="row">
//                             <h3>{value.kategori}</h3>
//                         </div>
//                         <div className="row m-3">
//                             <h4>Rp. {value.harga}</h4>
//                         </div>
//                         <div className="row m-3">
//                             <div style={{ borderBottom: '1.5px solid gray' }}>
//                                 <div
//                                     style={{ cursor: 'pointer', fontWeight: 'bold' }}
//                                     onClick={() => this.setState({ openType: !this.state.openType })}>
//                                     Type: {this.state.selectedType.type} {this.state.selectedType.qty}
//                                 </div>
//                                 <Collapse isOpen={this.state.openType}>
//                                     {
//                                         value.stock.map((item, index) => {
//                                             return (
//                                                 <div>
//                                                     <Button outline color="secondary" size="sm"
//                                                         style={{ width: '100%', border: 'none', textAlign: 'left' }}
//                                                         onClick={() => this.setState({ selectedType: item, qty: 1 })}
//                                                     > {item.type} : {item.qty}</Button>
//                                                 </div>
//                                             )
//                                         })
//                                     }
//                                 </Collapse>
//                             </div>
//                         </div>
//                         <div className="row m-3">
//                             <p>{value.deskripsi}</p>
//                         </div>
//                         <div className="d-flex justify-content-between m-3">
//                             <div>
//                                 Jumlah :
//                             </div>
//                             <div>
//                                 <Button onClick={this.decrement}>-</Button>
//                                 <Input size="sm" placeholder="qty" value={this.state.counter} style={{ width: "40%", display: 'inline-block' }} />
//                                 <Button onClick={this.increment}>+</Button>
//                             </div>
//                         </div>
//                         <div className="border" >
//                             <Button>Add To Cart</Button>
//                         </div>
//                     </div>
//                 </div>
//             )
//         })
//     }

//     render() {
//         return (
//             <div className="rounded shadow container container-fluid d-flex justify-content-evenly mt-5">
//                 <div>
//                     <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", left: 10 }}>
//                         <ToastHeader icon="warning"
//                             toggle={() => this.setState({ toastOpen: false })}>
//                             Add to cart waning
//                         </ToastHeader>
//                         <ToastBody>
//                             Stok produk tidak cukup
//                         </ToastBody>
//                     </Toast>
//                 </div>
//                 <div>
//                     {this.printDetail()}
//                 </div>
//                 <div id="image">

//                 </div>
//                 <div className="px-5">

//                 </div>
//             </div>
//         );
//     }
// }

// export default ProductDetail;