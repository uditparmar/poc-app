import { useState } from "react";
import { get as _get, map as _map } from "lodash";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
import moment from "moment";
import {
  InputGroup,
  FormControl,
  Row,
  Col,
  Card,
  ListGroup,
  Container,
  Accordion,
  Button,
} from "react-bootstrap";
import Avatar from "react-avatar";

export default function JobList({ Component, jobs, sortList, totalJobs }) {
  const [sortFields, setSortFields] = useState({ sortBy: "", orderBy: "" });

  const sortJobs = (sortVal) => {
    const stateSortVal = _get(sortFields, "sortBy", "");
    const stateOrder = _get(sortFields, "orderBy", "");
    let orderBy = "";
    if (stateSortVal === sortVal) {
      if (stateOrder === "") {
        orderBy = "asc";
      }
      if (stateOrder === "asc") {
        orderBy = "desc";
      }
      if (stateOrder === "desc") {
        orderBy = "";
      }
    } else {
      orderBy = "asc";
    }
    const sortValue = {
      sortBy: sortVal,
      orderBy: orderBy,
    };
    sortList(sortVal, orderBy);
    setSortFields(sortValue);
  };

  return (
    <div>
      <Card className="card1">
        <div className="col-lg-12 border-1 pt-4 pb-4">
          <Row>
            <Col className="col ml-20">
              {/* <strong>7,753</strong> Total job postings */}
              <strong>{totalJobs}</strong> Total job postings
            </Col>
            <Col>
              <div className="float-right">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <span className="light-grey-text">Sort By</span>
                  </li>
                  <li className="list-inline-item">
                    <span
                      className="menuLink"
                      onClick={() => sortJobs("address")}
                    >
                      Location
                      {sortFields.sortBy === "address" &&
                      sortFields.orderBy === "asc" ? (
                        <ArrowUp />
                      ) : (
                        ""
                      )}
                      {sortFields.sortBy === "address" &&
                      sortFields.orderBy === "desc" ? (
                        <ArrowDown />
                      ) : (
                        ""
                      )}
                    </span>
                  </li>
                  <li className="list-inline-item">
                    <span
                      className="menuLink"
                      onClick={() => sortJobs("job_title")}
                    >
                      Role
                    </span>
                    {sortFields.sortBy === "job_title" &&
                    sortFields.orderBy === "asc" ? (
                      <ArrowUp />
                    ) : (
                      ""
                    )}
                    {sortFields.sortBy === "job_title" &&
                    sortFields.orderBy === "desc" ? (
                      <ArrowDown />
                    ) : (
                      ""
                    )}
                  </li>
                  <li className="list-inline-item">
                    {" "}
                    <span
                      className="menuLink"
                      onClick={() => sortJobs("department")}
                    >
                      Department
                    </span>
                    {sortFields.sortBy === "department" &&
                    sortFields.orderBy === "asc" ? (
                      <ArrowUp />
                    ) : (
                      ""
                    )}
                    {sortFields.sortBy === "department" &&
                    sortFields.orderBy === "desc" ? (
                      <ArrowDown />
                    ) : (
                      ""
                    )}
                  </li>
                  <li className="list-inline-item">
                    <span
                      className="menuLink"
                      onClick={() => sortJobs("required_skills")}
                    >
                      Education
                    </span>
                    {sortFields.sortBy === "required_skills" &&
                    sortFields.orderBy === "asc" ? (
                      <ArrowUp />
                    ) : (
                      ""
                    )}
                    {sortFields.sortBy === "required_skills" &&
                    sortFields.orderBy === "desc" ? (
                      <ArrowDown />
                    ) : (
                      ""
                    )}
                  </li>
                  <li className="list-inline-item">
                    <span
                      className="menuLink"
                      onClick={() => sortJobs("experience")}
                    >
                      Experiance
                    </span>
                    {sortFields.sortBy === "experience" &&
                    sortFields.orderBy === "asc" ? (
                      <ArrowUp />
                    ) : (
                      ""
                    )}
                    {sortFields.sortBy === "experience" &&
                    sortFields.orderBy === "desc" ? (
                      <ArrowDown />
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      {_map(jobs, (job, index) => (
        <div key={index}>
          <Accordion>
            <Card className="card">
              <Card.Header className="bg-white">
                <Accordion.Toggle
                  className="text-left text-dark text-decoration-none custom-btn"
                  as={Button}
                  variant="link"
                  eventKey={index + 1}
                >
                  <div className="d-flex">
                    <div className="p-2 flex-shrink-1">
                      <Avatar
                        name={job.name}
                        maxInitials={2}
                        color="#C0C0C0"
                        size={40}
                        round="10px"
                        textSizeRatio={2}
                      />
                    </div>
                    <div className="p-2 w-100">
                      {_get(job, "items.length", 0)} jobs for {job.name}
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index + 1}>
                <div>
                  {_map(_get(job, "items", []), (jobItem, ky) => (
                    <div key={ky}>
                      <Accordion>
                        <Accordion.Toggle
                          className="text-dark text-decoration-none custom-btn card-padding card-margin-bottom"
                          as={Button}
                          variant="link"
                          eventKey={ky + 1}
                        >
                          <Card.Body className="padding-left125" key={ky}>
                            <div>
                              <div className="text-left">
                                <strong className="ml-2">
                                  {jobItem.job_title}
                                </strong>
                              </div>
                              <div className="d-flex">
                                <div className="p-2 text-left flex-fill">
                                  {jobItem.job_type} | $
                                  {jobItem.salary_range[0]} - $
                                  {jobItem.salary_range[1]} an hour |{" "}
                                  {jobItem.address}
                                </div>
                                <div className="p-2 flex-fill  text-right">
                                  {moment
                                    .utc(jobItem.created)
                                    .local()
                                    .startOf("seconds")
                                    .fromNow()}
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={ky + 1}>
                          <Card.Body className="margin-125">
                            <Row className="pb-2 text-left">
                              {" "}
                              <Col sm={2}>Department:</Col>
                              <Col sm={7}>{jobItem.department.toString()}</Col>
                              <Col sm={3}></Col>
                            </Row>
                            <Row className="pb-2 text-left">
                              {" "}
                              <Col sm={2}>Hours/Shift:</Col>
                              <Col
                                sm={7}
                              >{`${jobItem.hours} hours ${jobItem.work_schedule}`}</Col>
                              <Col sm={3}></Col>
                            </Row>
                            <Row className="pb-2 text-left">
                              {" "}
                              <Col sm={2}>Summary:</Col>
                              <Col sm={7}>{jobItem.description}</Col>
                              <Col sm={3}>
                                <div>
                                  <div className="mb-1">
                                    <Button className="w-120" variant="primary">
                                      Job details
                                    </Button>
                                  </div>
                                  <div>
                                    <Button
                                      className="w-120"
                                      variant="outline-primary"
                                    >
                                      Save job
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Accordion>
                    </div>
                  ))}
                </div>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
