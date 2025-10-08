import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: " ",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleSubmitAddorUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const employee = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      if (id) {
        updateEmployee(id, employee)
          .then(() => {
            navigate("/employees");
          })
          .catch(() => {
            console.error("Lỗi khi cập nhật nhân viên");
          });
      } else {
        addEmployee(employee)
          .then(() => {
            navigate("/employees");
          })
          .catch(() => {
            console.error("Lỗi khi thêm nhân viên");
          });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      ...errors,
    };

    if (!firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const subTitle = () => {
    if (id) {
      return <h2 className="text-center mb-4 fw-bold">Update Employee</h2>;
    } else {
      return <h2 className="text-center mb-4 fw-bold">Add New Employee</h2>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
          <div className="card shadow-lg p-4">
            <form>
              {subTitle()}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label fw-semibold">
                  First name:
                </label>
                <input
                  className={`form-control border-primary ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label fw-semibold">
                  Last name:
                </label>
                <input
                  className={`form-control border-primary ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email:
                </label>
                <input
                  className={`form-control border-primary ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmitAddorUpdate}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={() => navigate("/employees")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
