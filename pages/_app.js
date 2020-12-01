import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import {
  get as _get,
  map as _map,
  isEmpty as _isEmpty,
  isEqual as _isEqual,
} from "lodash";

import { useState, useEffect } from "react";
import withQuery from "with-query";
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

import "../styles/sidebar.css";
import "../styles/customStyle.css";
import JobList from "../components/jobList";
import InputSearchBar from "../components/searchbar";
import Footer from "./layouts/footer";
import DepartmentDialogue from "../components/departmentDialogue";

const url = "https://poc-app.vercel.app"

export default function MyApp({ Component, pageProps }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState({ sortBy: "", orderBy: "" });
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState([]);
  const [workScheduleFilter, setWorkScheduleFilter] = useState([]);
  const [showDepartmentDialogue, setShowDepartmentDialogue] = useState(false);

  const sortList = async (key, order) => {
    const request = await fetch(
      withQuery(`${url}/api/filter`, {
        search: filterValue,
        jobType: jobTypeFilter.toString(),
        department: departmentFilter.toString(),
        experience: experienceFilter.toString(),
        work_schedule: workScheduleFilter.toString(),
        sortBy: key,
        orderBy: order,
      })
    );
    const json = await request.json();
    setJobs(json.items);
    setTotalJobs(json.totalJobs);
    setSortValue({ sortBy: key, orderBy: order });
  };

  const searchFilter = async (e) => {
    const searchString = e.target.value;
    const request = await fetch(
      withQuery(`${url}/api/filter`, {
        search: searchString,
        jobType: jobTypeFilter.toString(),
        department: departmentFilter.toString(),
        experience: experienceFilter.toString(),
        work_schedule: workScheduleFilter.toString(),
        sortBy: _get(sortValue, "sortBy", ""),
        orderBy: _get(sortValue, "orderBy", ""),
      })
    );
    const json = await request.json();
    console.log("got respons", json);
    setFilterValue(searchString);
    setTotalJobs(json.totalJobs);
    setJobs(json.items);
  };

  useEffect(async () => {
    const filterTypes = await fetch(`${url}/api/job`);
    const request = await fetch(
      withQuery(`${url}/api/filter`, {
        search: "",
        sortBy: "",
        orderBy: "",
        jobType: [],
        department: [],
        experience: [],
        work_schedule: [],
      })
    );
    const jsonJobs = await request.json();
    const jsonFilterTypes = await filterTypes.json();
    setJobs(jsonJobs.items);
    setTotalJobs(jsonJobs.totalJobs);
    setFilters(jsonFilterTypes.filters);
  }, []);

  const addDepartmentFilter = (departmentFilterValue) => {
    const filterString = [...departmentFilter];
    const indexOfElement = filterString.findIndex((val) => val === departmentFilterValue);
    if (indexOfElement === -1) {
      filterString.push(departmentFilterValue);
    } else {
      filterString.splice(indexOfElement, 1);
    }
    setDepartmentFilter(filterString)
  };

  const searchDeoartmentList = async () => {
    // const filterString =
    //   departmentFilter === departmentFilterString ? "" : departmentFilterString;
    const request = await fetch(
      withQuery(`${url}/api/filter`, {
        search: filterValue,
        jobType: jobTypeFilter.toString(),
        department: departmentFilter.toString(),
        experience: experienceFilter.toString(),
        work_schedule: workScheduleFilter.toString(),
        sortBy: _get(sortValue, "sortBy", ""),
        orderBy: _get(sortValue, "orderBy", ""),
      })
    );
    const json = await request.json();
    // setDepartmentFilter(filterString);
    setTotalJobs(json.totalJobs);
    setJobs(json.items);
  };

  return (
    <div className="lighGreyBG">
      <Header />
      <InputSearchBar searchFilter={searchFilter} />
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Card className="mx-auto mt-2 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">JOB TYPE</strong>
              <ListGroup variant="flush">
                {_map(_get(filters, "job_type", []), (filter, indx) => (
                  <div key={indx}>
                    <ListGroup.Item className="border-0 pt-0 pb-1">
                      <span
                        className={`menuLink ${
                          jobTypeFilter.find((jFilter) =>
                            _isEqual(jFilter, filter.key)
                          ) && "text-primary"
                        }`}
                        onClick={async () => {
                          const filterString = [...jobTypeFilter];
                          const indexOfElement = filterString.findIndex(
                            (val) => val === filter.key
                          );
                          if (indexOfElement === -1) {
                            filterString.push(filter.key);
                          } else {
                            filterString.splice(indexOfElement, 1);
                          }
                          const request = await fetch(
                            withQuery(`${url}/api/filter`, {
                              search: filterValue,
                              jobType: filterString.toString(),
                              department: departmentFilter.toString(),
                              experience: experienceFilter.toString(),
                              work_schedule: workScheduleFilter.toString(),
                              sortBy: _get(sortValue, "sortBy", ""),
                              orderBy: _get(sortValue, "orderBy", ""),
                            })
                          );
                          const json = await request.json();
                          setJobTypeFilter(filterString);
                          setTotalJobs(json.totalJobs);
                          setJobs(json.items);
                        }}
                      >
                        {filter.key}
                      </span>{" "}
                      <span className="light-grey-text">
                        {filter.doc_count}
                      </span>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card>
            <Card className="mx-auto mt-3 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">DEPARTMENT</strong>
              <DepartmentDialogue
                departmentList={_get(filters, "department", [])}
                show={showDepartmentDialogue}
                onClick={() => setShowDepartmentDialogue(false)}
                searchDeoartmentList={searchDeoartmentList}
                departmentFilterValue={departmentFilter}
                addDepartmentFilter={addDepartmentFilter}
              />
              <ListGroup variant="flush">
                {_map(
                  _get(filters, "department", []).slice(0, 10),
                  (filter, indx) => (
                    <div key={indx}>
                      <ListGroup.Item className="border-0 border-0 pt-0 pb-1">
                        <span
                          className={`menuLink ${
                            departmentFilter.find((jFilter) =>
                              _isEqual(jFilter, filter.key)
                            ) && "text-primary"
                          }`}
                          onClick={async () => {
                            const filterString = [...departmentFilter];
                            const indexOfElement = filterString.findIndex(
                              (val) => val === filter.key
                            );
                            if (indexOfElement === -1) {
                              filterString.push(filter.key);
                            } else {
                              filterString.splice(indexOfElement, 1);
                            }
                            const request = await fetch(
                              withQuery("/api/filter", {
                                search: filterValue,
                                jobType: jobTypeFilter.toString(),
                                department: filterString.toString(),
                                experience: experienceFilter.toString(),
                                work_schedule: workScheduleFilter.toString(),
                                sortBy: _get(sortValue, "sortBy", ""),
                                orderBy: _get(sortValue, "orderBy", ""),
                              })
                            );
                            const json = await request.json();
                            setDepartmentFilter(filterString);
                            setTotalJobs(json.totalJobs);
                            setJobs(json.items);
                          }}
                        >
                          {filter.key}
                        </span>
                        <span className="light-grey-text">
                          &nbsp;{filter.doc_count}
                        </span>
                      </ListGroup.Item>
                    </div>
                  )
                )}
                <ListGroup.Item className="border-0 border-0 pt-0 pb-1">
                  <span
                    className="menuLink text-primary"
                    onClick={() => setShowDepartmentDialogue(true)}
                  >
                    Show more
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="mx-auto mt-3 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">WORK SCHEDULE</strong>
              <ListGroup variant="flush">
                {_map(_get(filters, "work_schedule", []), (filter, indx) => (
                  <div key={indx}>
                    <ListGroup.Item className="border-0 border-0 pt-0 pb-1">
                      <span
                        className={`menuLink ${
                          workScheduleFilter.find((jFilter) =>
                            _isEqual(jFilter, filter.key)
                          ) && "text-primary"
                        }`}
                        onClick={async () => {
                          const filterString = [...workScheduleFilter];
                          const indexOfElement = filterString.findIndex(
                            (val) => val === filter.key
                          );
                          if (indexOfElement === -1) {
                            filterString.push(filter.key);
                          } else {
                            filterString.splice(indexOfElement, 1);
                          }
                          const request = await fetch(
                            withQuery(`${url}/api/filter`, {
                              search: filterValue,
                              jobType: jobTypeFilter.toString(),
                              department: departmentFilter.toString(),
                              experience: experienceFilter.toString(),
                              work_schedule: filterString.toString(),
                              sortBy: _get(sortValue, "sortBy", ""),
                              orderBy: _get(sortValue, "orderBy", ""),
                            })
                          );
                          const json = await request.json();
                          setWorkScheduleFilter(filterString);
                          setTotalJobs(json.totalJobs);
                          setJobs(json.items);
                        }}
                      >
                        {filter.key}
                      </span>
                      <span className="light-grey-text">
                        {filter.doc_count}
                      </span>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card>
            <Card className="mx-auto mt-3 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">EXPERIENCE</strong>
              <ListGroup variant="flush">
                {_map(_get(filters, "experience", []), (filter, indx) => (
                  <div key={indx}>
                    <ListGroup.Item className="border-0 border-0 pt-0 pb-1">
                      <span
                        className={`menuLink ${
                          experienceFilter.find((jFilter) =>
                            _isEqual(jFilter, filter.key)
                          ) && "text-primary"
                        }`}
                        onClick={async () => {
                          const filterString = [...experienceFilter];
                          const indexOfElement = filterString.findIndex(
                            (val) => val === filter.key
                          );
                          if (indexOfElement === -1) {
                            filterString.push(filter.key);
                          } else {
                            filterString.splice(indexOfElement, 1);
                          }
                          const request = await fetch(
                            withQuery(`${url}/api/filter`, {
                              search: filterValue,
                              jobType: jobTypeFilter.toString(),
                              department: departmentFilter.toString(),
                              experience: filterString.toString(),
                              work_schedule: workScheduleFilter.toString(),
                              sortBy: _get(sortValue, "sortBy", ""),
                              orderBy: _get(sortValue, "orderBy", ""),
                            })
                          );
                          const json = await request.json();
                          setExperienceFilter(filterString);
                          setTotalJobs(json.totalJobs);
                          setJobs(json.items);
                        }}
                      >
                        {filter.key}
                      </span>
                      <span className="light-grey-text">
                        {filter.doc_count}
                      </span>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col className="mt-2 mb-3" sm={8}>
            <JobList jobs={jobs} sortList={sortList} totalJobs={totalJobs} />
          </Col>
        </Row>
      </Container>
      <Card>
        <Footer />
      </Card>
    </div>
  );
}
