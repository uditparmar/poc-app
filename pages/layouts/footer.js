import { Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="pt-3 pb-3 navbar-fixed-bottom">
      <Row className="footer-row">
        <Col sm={6}>
          <div>
            <p className="font-xl">
              <b>About us</b>
            </p>
            <p>
              We are a team of nurses, doctors, technologists, and executives
              dedicated <br/>to help nurses find jobs that they love
            </p>
            <p>All copyrights &#169; reserved 2020 - Health Explore</p>
          </div>
        </Col>
        <Col sm={3}>
          <p className="font-xl">
            <b>Sitemap</b>
          </p>
          <div>Nurses</div>
          <div>Employes</div>
          <div>Social networking</div>
          <div>jobs</div>
        </Col>
        <Col sm={3}>
          <p className="font-xl">
            <b>Privacy</b>
          </p>
          <div>Privacy policy</div>
          <div>Terms of use</div>
          <div>Cookie policy</div>
        </Col>
      </Row>
    </footer>
  );
}
