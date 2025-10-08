import { useState, useEffect } from "react";
import { getEmployees } from "../services/EmployeeService";
import { deleteEmployee } from "../services/EmployeeService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    getEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddEmployee = () => {
    window.location.href = "/addemployee";
  };

  const updateEmployee = (id) => {
    window.location.href = `/updateemployee/${id}`;
  };

  const removeEmployee = (id) => {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center my-3 fw-bold fs-2">Employees List</h2>
      <button className="btn btn-primary mb-2" onClick={handleAddEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-light fw-semibold fs-5 text-dark">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={() => removeEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
