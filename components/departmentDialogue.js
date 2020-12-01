import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { isEqual as _isEqual, map as _map } from "lodash";
import { useState, useEffect } from "react";

export default function DepartmentDialogue({
  show,
  onClick,
  departmentList,
  searchDeoartmentList,
  filterKey,
  departmentFilterValue,
  addDepartmentFilter
}) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => onClick()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {_map(departmentList, (department, index) => (
              <Col xs={12} lg={4} key={index}>
                <span
                  className={`menuLink  ${
                    departmentFilterValue.find((jFilter) =>
                      _isEqual(jFilter, department.key)
                    ) && "text-primary"
                  }
              `}
                  onClick={() => {
                    addDepartmentFilter(department.key);
                  }}
                >
                  {department.key}
                </span>
                &nbsp;
                <span className="light-grey-text">{department.doc_count}</span>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            searchDeoartmentList();
            onClick();
          }}
        >
          Apply
        </Button>
        <Button onClick={onClick}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
