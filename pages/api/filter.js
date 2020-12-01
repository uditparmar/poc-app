import jobs from "../../data/jobs.json";
import {
  isArray as _isArray,
  isObject as _isObject,
  isEmpty as _isEmpty,
  isEqual as _isEqual,
  orderBy as _orderBy,
  mapValues as _mapValues,
  map as _map,
  forEach as _forEach,
  sumBy as _sumBy,
} from "lodash";

export default (req, res) => {
  let jobData = [...jobs];
  const query = req.query;

  res.statusCode = 200;
  res.json(filterJobs(query, jobData));
};

function filterJobs(query, jobs) {
  const filterByQuery = {
    searchString: query.search,
    job_type: query.jobType,
    department: query.department,
    experience: query.experience,
    work_schedule: query.work_schedule,
  };

  let sort = query.sortBy || "";
  let order = query.orderBy;

  const filteredJobs = doFilter(filterByQuery, jobs);
  const sortedJobs = doSort(sort, order, filteredJobs);

  return {
    items: sortedJobs,
    totalJobs: _sumBy(sortedJobs, (jobItem) => jobItem["items"].length),
  };

  function filterByJobType(filterparam, jobs) {
    let listOfJobs = [];
    const filteredJobs = jobs.map((item) => {
      const findString = item["items"].filter((subItem) => {
        const filterValue = filterparam.split(",");
        return filterValue.find((jobVal) => {
          return _isEqual(
            subItem["job_type"].toLowerCase(),
            jobVal.toLowerCase()
          );
        });
      });
      if (!_isEmpty(findString)) {
        listOfJobs.push({
          ...item,
          total_jobs_in_hospital: findString.length,
          items: findString,
        });
      }
    });
    return listOfJobs;
  }

  function filterByExperience(filterparam, jobs) {
    let listOfJobs = [];
    const filteredJobs = jobs.map((item) => {
      const findString = item["items"].filter((subItem) => {
        const filterValue = filterparam.split(",");
        return filterValue.find((jobVal) => {
          return _isEqual(
            subItem["experience"].toLowerCase(),
            jobVal.toLowerCase()
          );
        });
      });
      if (!_isEmpty(findString)) {
        listOfJobs.push({
          ...item,
          total_jobs_in_hospital: findString.length,
          items: findString,
        });
      }
    });
    return listOfJobs;
  }

  function filterByWorkSchedule(filterparam, filterJob) {
    let listOfJobs = [];
    const filteredJobs = filterJob.map((item) => {
      const findString = item["items"].filter((subItem) => {
        const filterValue = filterparam.split(",");
        return filterValue.find((jobVal) => {
          return _isEqual(
            subItem["work_schedule"].toLowerCase(),
            jobVal.toLowerCase()
          );
        });
      });
      if (!_isEmpty(findString)) {
        listOfJobs.push({
          ...item,
          total_jobs_in_hospital: findString.length,
          items: findString,
        });
      }
    });
    return listOfJobs;
  }

  function filterByDepartment(filterparam, jobs) {
    let listOfJobs = [];
    const filteredJobs = jobs.map((item) => {
      const findString = item["items"].filter((subItem) => {
        const findDepartmentString = subItem["department"].find(
          (departmentItem) => {
            const filterValue = filterparam.split(",");
            return filterValue.find((jobVal) => {
              return _isEqual(
                departmentItem.toLowerCase(),
                jobVal.toLowerCase()
              );
            });
          }
        );
        if (findDepartmentString) {
          return true;
        } else {
          return false;
        }
      });
      if (!_isEmpty(findString)) {
        listOfJobs.push({
          ...item,
          total_jobs_in_hospital: findString.length,
          items: findString,
        });
      }
    });
    return listOfJobs;
  }

  function filterBySearchString(filterparam, jobs) {
    const lowercasedJob = filterparam.toLowerCase().trim();
    let filterBy = jobs;
    if (lowercasedJob === "") return jobs;
    else {
      const filteredJobs = jobs.filter((item) => {
        return Object.keys(item).some((key) => {
          if (!_isArray(item[key])) {
            return item[key].toString().toLowerCase().includes(lowercasedJob);
          } else {
            const findString = item[key].filter((subItem) => {
              return Object.keys(subItem).some((ky) => {
                if (!_isArray(subItem[ky])) {
                  if (
                    subItem[ky].toString().toLowerCase().includes(lowercasedJob)
                  ) {
                  }
                  return subItem[ky]
                    .toString()
                    .toLowerCase()
                    .includes(lowercasedJob);
                } else {
                  return subItem[ky].find((arrayFieldValue) =>
                    arrayFieldValue
                      .toString()
                      .toLowerCase()
                      .includes(lowercasedJob)
                  );
                }
              });
            });
            if (!_isEmpty(findString)) {
              return true;
            } else {
              return false;
            }
          }
        });
      });
      return filteredJobs;
    }
  }

  function doFilter(filterParam, jobList) {
    let filterJobObj = [...jobs];
    _forEach(filterParam, (filterVal, key) => {
      if (key === "searchString" && !_isEmpty(filterVal)) {
        filterJobObj = filterBySearchString(filterParam.searchString, [
          ...filterJobObj,
        ]);
      }
      if (key === "job_type" && !_isEmpty(filterVal)) {
        filterJobObj = filterByJobType(filterVal, [...filterJobObj]);
      }
      if (key === "experience" && !_isEmpty(filterVal)) {
        filterJobObj = filterByExperience(filterVal, [...filterJobObj]);
      }
      if (key === "work_schedule" && !_isEmpty(filterVal)) {
        filterJobObj = filterByWorkSchedule(filterVal, [...filterJobObj]);
      }
      if (key === "department" && !_isEmpty(filterVal)) {
        filterJobObj = filterByDepartment(filterVal, [...filterJobObj]);
      }
    });

    return [...filterJobObj];
  }

  function doSort(sortBy, orderBy, jobs) {
    if (!_isEmpty(sortBy) && !_isEmpty(orderBy)) {
      if (sortBy === "department") {
        _forEach(jobs, (value) => {
          _forEach(value.items, (departmentList) => {
            if (orderBy === "asc") {
              departmentList.department = departmentList.department.sort(
                function (a, b) {
                  return a - b;
                }
              );
            } else if (orderBy === "desc") {
              departmentList.department = departmentList.department.sort(
                function (a, b) {
                  return b - a;
                }
              );
            }
          });
        });
        jobs = _orderBy(jobs, `items[0].department`, `${orderBy}`);
      } else if (sortBy === "required_skills") {
        _forEach(jobs, (value) => {
          _forEach(value.items, (requiredSkills) => {
            if (orderBy === "asc") {
              requiredSkills.required_skills = requiredSkills.required_skills.sort(
                function (a, b) {
                  return a - b;
                }
              );
            } else if (orderBy === "desc") {
              requiredSkills.required_skills = requiredSkills.required_skills.sort(
                function (a, b) {
                  return b - a;
                }
              );
            }
          });
        });
        jobs = _orderBy(jobs, `items[0].required_skills`, `${orderBy}`);
      } else {
        _forEach(jobs, (value) => {
          value.items = _orderBy(value["items"], `${sortBy}`, `${orderBy}`);
        });
        jobs = _orderBy(jobs, `items[0][${sortBy}]`, `${orderBy}`);
      }
    }
    return jobs;
  }
}
