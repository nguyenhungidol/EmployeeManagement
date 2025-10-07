package net.javaguides.ems.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entities.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // ✅ thay vì @AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository; // ✅ thêm final
  private final EmployeeMapper employeeMapper; // ✅ thêm final
  private Employee employee;

  @Override
  public EmployeeDto createEmployee(EmployeeDto employeeDto) {
    Employee employee = employeeMapper.toEmployee(employeeDto);
    Employee savedEmployee = employeeRepository.save(employee);
    return employeeMapper.toEmployeeDto(savedEmployee);
  }

  @Override
  public EmployeeDto getEmployeeById(Long id) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Employee is not exit with given id: " + id));
    return employeeMapper.toEmployeeDto(employee);
  }

  @Override
  public List<EmployeeDto> getAllEmployees() {
    List<Employee> employees = employeeRepository.findAll();

    return employees.stream()
        .map(employeeMapper::toEmployeeDto)// chuyển employee => employeeDTO
        .collect(Collectors.toList());// nhóm các employeeDTO thành 1 list
  }

  @Override
  public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Employee is not exit with given id: " + id));

    employee.setFirstName(employeeDto.getFirstName());
    employee.setLastName(employeeDto.getLastName());
    employee.setEmail(employeeDto.getEmail());

    return employeeMapper.toEmployeeDto(employeeRepository.save(employee));
  }
}