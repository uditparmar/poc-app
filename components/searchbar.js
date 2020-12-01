import {
  Row,
  Col,
  Container,
} from "react-bootstrap";

export default function InputSearchBar({ Component, pageProps, searchFilter }) {
  return (
    <Container className="mt-3 mt-5 pt-4" fluid>
      <Row>
        <Col className="lighGreyBG" sm={12}>
          <div className="form-group pt-3 input_container has-search">
            <span className="input_img">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-search"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              className="form-control input-search-bar"
              placeholder="Search for any job, title, keywords or company"
              onChange={async (e) => await searchFilter(e)}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
