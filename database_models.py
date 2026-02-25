from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, ForeignKey,Float,Boolean,DateTime
from sqlalchemy.sql import func


Base = declarative_base()


class Department(Base):
    __tablename__ = "department"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False,index=True)
    description = Column(String, nullable=False,index=True)
    
    # employees = relationship("Employee", back_populates="department", cascade="all, delete")
    employees = relationship(
        "Employee",
        back_populates="department",
        cascade="all, delete",
        passive_deletes=True
    )


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False,index=True)
    email = Column(String, unique=True, nullable=False,index=True)
    contact_no = Column(String(25), unique=True, nullable=True,index=True)
    address = Column(String, nullable=False,index=True)
    role = Column(String, default="employee")
    is_deleted = Column(Boolean, default=False, index=True)

        # ✅ Soft delete
    is_deleted = Column(Boolean, default=False)

        # ✅ Timestamp tracking
    created_at = Column(DateTime(timezone=True), server_default=func.now())


    # dept_id = Column(Integer, ForeignKey("department.id"))

    dept_id = Column(
        Integer,
        ForeignKey("department.id", ondelete="CASCADE"),
        index=True
    )



    department = relationship("Department", back_populates="employees")
    # payrolls = relationship("Payroll", back_populates="employees")
    payrolls = relationship(
    "Payroll",
    back_populates="employee",
    cascade="all, delete"
)

class Payroll(Base):
    __tablename__="payroll"

    id=Column(Integer,primary_key=True,index=True)
    gross_salary=Column(Float,nullable=False,index=True)
    deductions=Column(Float,nullable=True,index=True)
    net_salary=Column(Float,nullable=False,index=True)


    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # emp_id=Column(Integer,ForeignKey("employees.id"))
    emp_id = Column(
        Integer,
        ForeignKey("employees.id", ondelete="CASCADE"),
        index=True
    )

    employee=relationship("Employee",back_populates="payrolls")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="employee")  # admin, hr, employee

    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=True)