import '../App.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Hasil, ListCategories, Menunya } from '../Components';
import React, { Component } from 'react'
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      CategoryPick: 'Makanan',
      keranjangs: []
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.CategoryPick)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      });

      this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if(this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //     .get(API_URL + "keranjangs")
  //     .then((res) => {
  //       const keranjangs = res.data;
  //       this.setState({ keranjangs });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeCategory = (value) => {
    this.setState({ CategoryPick: value, menus: [] }
    )
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      });
  }

  masukKeranjang = (value) => {

    axios
    .get(API_URL + "keranjangs?product.id=" + value.id)
    .then(res => {
      if(res.data.length === 0) {
        const keranjang = {
          jumlahh: 1,
          total_harga: value.harga,
          product: value
        }
        axios
          .post(API_URL + "keranjangs", keranjang)
          .then(res => {
            this.getListKeranjang();
            swal({
              title: "Sukses!",
              text: "Sukses masuk keranjang " + keranjang.product.nama,
              icon: "success",
              button: false,
              timer: 1000,
            });
          })
          .catch(err => {
            console.log(err);
          });
      }else {
        const keranjang = {
          jumlahh: res.data[0].jumlahh+1,
          total_harga: res.data[0].total_harga+value.harga,
          product: value
        };

        axios
          .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
          .then(res => {
            swal({
              title: "Sukses!",
              text: "Sukses masuk keranjang " + keranjang.product.nama,
              icon: "success",
              button: false,
            });
          })
          .catch(err => {
            console.log(err);
          });

      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  render() {
    const { menus, CategoryPick, keranjangs } = this.state;
    return (
      <div>

        <div className="mt-4">
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} CategoryPick={CategoryPick} />
              <Col className="mt-2">
                <h4>Daftar Produk</h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus && menus.map((menu) => (
                    <Menunya menu={menu} key={menu.id} masukKeranjang={this.masukKeranjang} />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}