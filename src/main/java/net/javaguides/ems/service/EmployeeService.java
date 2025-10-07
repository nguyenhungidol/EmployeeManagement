package net.javaguides.ems.service;

import java.util.ArrayList;
import java.util.List;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entities.Employee;
import org.springframework.stereotype.Service;

public interface EmployeeService {
  EmployeeDto createEmployee(EmployeeDto employeeDto);
  EmployeeDto getEmployeeById(Long id);
  List<EmployeeDto> getAllEmployees();
  EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto);
}
