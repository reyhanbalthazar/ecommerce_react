import React from 'react';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container mt-3" >
                    <h1 className="display-4">Pilihan Masuk</h1>
                    <p className="lead">Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat memiliki akun IKEA</p>
                    <hr className="my-4" />          
            </div>
        );
    }
}

export default Title;