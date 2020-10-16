import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge, ListGroupItem, Button, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlahh,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlahh: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }
        axios
            .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Update Pesanan",
                    text: "Sukses update pesanan " + data.product.nama,
                    icon: "success",
                    button: false,
                    timer: 1000,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    hapusPesanan = (id) => {

        this.handleClose();
        axios
            .delete(API_URL + "keranjangs/" + id)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Hapus Pesanan",
                    text: "Sukses hapus pesanan " + this.state.keranjangDetail.product.nama,
                    icon: "error",
                    button: false,
                    timer: 1000,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        const { keranjangs } = this.props;
        return (
            <Col md={3} className="mt-2">
                <h4>Hasil</h4>
                <hr />
                {keranjangs.length !== 0 && (
                <Card className="overflow-auto hasil">
                    <ListGroup variant="flush">
                        {keranjangs.map((menuKeranjang) => (
                                <ListGroupItem key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                                    <Row>
                                        <Col xs={2}>
                                            <h4>
                                                <Badge pill variant="success">
                                                    {menuKeranjang.jumlahh}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h5>{menuKeranjang.product.nama}</h5>
                                            <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-right"><p>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p></strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                ))}
                        <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
                    </ListGroup>
                </Card>
                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        );
    }
}

export default Hasil;