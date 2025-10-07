package net.javaguides.ems.controller;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entities.Employee;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {
  private final EmployeeService employeeService;

  // Build Add Employee Rest API
  @PostMapping
  public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
    EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
    return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
  }

  // Build GET Employee Rest API
  @GetMapping("{id}")
  public ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") Long id){
    EmployeeDto employeeDto = employeeService.getEmployeeById(id);
    return ResponseEntity.ok(employeeDto);
  }

  @GetMapping
  public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
    return ResponseEntity.ok(employeeService.getAllEmployees());
  }
}
