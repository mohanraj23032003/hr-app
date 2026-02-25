from pydantic import BaseModel, EmailStr
from typing import List
from sqlalchemy import Enum
import enum


# -------------------------
# Department Schemas
# -------------------------

class DepartmentBase(BaseModel):
    name: str
    description: str


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentResponse(DepartmentBase):
    id: int

    class Config:
        from_attributes = True


# -------------------------
# Employee Schemas
# -------------------------

class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    address: str
    contact_no: str


class EmployeeCreate(EmployeeBase):
    dept_id: int


class EmployeeResponse(EmployeeBase):
    id: int
    dept_id: int

    class Config:
        from_attributes = True


# -------------------------
# Employee Schemas
# -------------------------

class PayrollCreate(BaseModel):
    gross_salary: float
    deductions: float = 0
    emp_id: int


class PayrollResponse(BaseModel):
    id: int
    gross_salary: float
    deductions: float
    net_salary: float
    emp_id: int

    class Config:
        from_attributes = True



class RoleEnum(str, enum.Enum):
    admin = "admin"
    hr = "hr"
    employee = "employee"

class EmployeeUserCreate(BaseModel):
    employee_id: int