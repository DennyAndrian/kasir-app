import React, { Component } from 'react'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import axios from 'axios';
import {API_URL} from '../utils/constants';


export default class TotalBayar extends Component {
    
    submitTotalBayar = (TotalBayar) => {
        const pesanan = {
            total_bayar : TotalBayar,
            menus : this.props.keranjangs
        }

        axios
        .post(API_URL+"pesanans", pesanan)
        .then((res)=> {
            this.props.history.push('/sukses')
        })
    }
    render() {
        const TotalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <>
            
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h4>Total Harga :<strong className="float-right mr-2">Rp. {numberWithCommas(TotalBayar)}</strong></h4>
                        <Button variant="dark" block className="mb-2 mt-4 mr-2" size="lg" onClick={() => this.submitTotalBayar(TotalBayar)}>
                            <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h4>Total Harga :<strong className="float-right mr-2">Rp. {numberWithCommas(TotalBayar)}</strong></h4>
                        <Button variant="dark" block className="mb-2 mt-4 mr-2" size="lg" onClick={() => this.submitTotalBayar(TotalBayar)}>
                            <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
            </>
        )
    }
}
