import React from 'react'
import { Row, Col, Badge, Modal, Form, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faTrash} from '@fortawesome/free-solid-svg-icons';

const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga, hapusPesanan }) => {
    if (keranjangDetail) {
        return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{keranjangDetail.product.nama}  {" "}
                            <strong>
                                (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                        </strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Total Harga: </Form.Label>
                                <p>
                                (Rp. {numberWithCommas(totalHarga)})
                                </p>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Jumlah:  </Form.Label> <br />
                                <Button variant="primary" size="sm" className="mr-2" onClick={() => tambah()}> 
                                <FontAwesomeIcon icon={faPlus}/> 
                                </Button>
                                <strong>{jumlah}</strong>
                                <Button variant="primary" size="sm" className="ml-2" onClick={() => kurang()}> 
                                <FontAwesomeIcon icon={faMinus}/> 
                                </Button>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Keterangan: </Form.Label>
                                <Form.Control as="textarea" rows={3} name="keterangan" placeholder="contoh: Pedas, Nasi Setengah" value={keterangan} onChange={(event) => changeHandler(event)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Simpan
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                            <FontAwesomeIcon icon={faTrash}/> Hapus Pesanan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } else {
        return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Kosong!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Kosong!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                       </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default ModalKeranjang
