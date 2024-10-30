import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import icon from "../assets/iconapp.svg";
import { API } from "../config/api";

export default function AddPages() {
  const [form, setForm] = useState({
    noreg: "",
    name: "",
    address: "",
    brand: "",
    years: "",
    capacity: "",
    colour: "",
    fuel: "",
  });

  const [error, setError] = useState(""); // State for error handling

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      setError(""); // Reset error state before submitting

      const response = await API.post("/kendaraan", form);

      // Assuming response contains a message if there is an error
      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("Data berhasil tersimpan");
      }
    } catch (error) {
      console.log(error);
      setError("Nomor register sudah ada "); // Generic error message
    }
  });

  return (
    <div>
      <Container className="mt-3 opacity-75">
        <h3>
          <span>
            <img src={icon} style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi Data Kendaraan
        </h3>
        <h5 className="my-3">Tambah Data Kendaraan</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. Register Kendaraan</Form.Label>
                    <Form.Control
                      type="text"
                      id="noreg"
                      name="noreg"
                      onChange={handleChange}
                      required
                      isInvalid={!!error} // Mark as invalid if there's an error
                    />
                    <Form.Control.Feedback type="invalid">
                      {error} {/* Display the error message */}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Pemilik</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Merk Kendaraan</Form.Label>
                    <Form.Control
                      type="text"
                      id="brand"
                      name="brand"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat Pemilik Kendaraan</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      id="address"
                      name="address"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tahun Pembuatan</Form.Label>
                    <Form.Control
                      type="number"
                      id="years"
                      name="years"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Kapasitas Silinder</Form.Label>
                    <Form.Control
                      type="number"
                      id="capacity"
                      name="capacity"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Warna Kendaraan</Form.Label>
                    <select
                      className="form-select"
                      name="colour"
                      id="colour"
                      onChange={handleChange}
                      required
                    >
                      <option disabled>Pilih Warna Kendaraan</option>
                      <option value="Merah">Merah</option>
                      <option value="Hitam">Hitam</option>
                      <option value="Biru">Biru</option>
                      <option value="Abu-abu">Abu-abu</option>
                      <option value="Hijau">Hijau</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bahan Bakar</Form.Label>
                    <select
                      className="form-select"
                      name="fuel"
                      id="fuel"
                      onChange={handleChange}
                      required
                    >
                      <option disabled>Pilih Bahan Bakar</option>
                      <option value="Solar">Solar</option>
                      <option value="Bensin">Bensin</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Simpan
              </Button>
              <Link to={"/"}>
                <Button
                  variant="secondary"
                  className="ms-2"
                  style={{ width: "100px" }}
                >
                  Kembali
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
