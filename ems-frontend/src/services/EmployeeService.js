import axoios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employees";

export const getEmployees = () => {
  return axoios.get(EMPLOYEE_API_BASE_URL);
};

export const getEmployeeById = (id) => {
  return axoios.get(EMPLOYEE_API_BASE_URL + "/" + id);
};

export const addEmployee = (employee) => {
  return axoios.post(EMPLOYEE_API_BASE_URL, employee);
};

export const updateEmployee = (id, employee) => {
  return axoios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee);
};

export const deleteEmployee = (id) => {
  return axoios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
};
