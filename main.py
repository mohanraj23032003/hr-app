from fastapi import FastAPI, Depends, HTTPException,Query
# from datetime import datetime, timedelta
# from jose import JWTError, jwt
# from passlib.context import CryptContext
# from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session,joinedload
from database import SessionLocal, engine
import database_models
from models import (
    DepartmentCreate,
    DepartmentResponse,
    EmployeeCreate,
    EmployeeResponse,
    PayrollCreate,
    PayrollResponse,
    EmployeeUserCreate
)
from fastapi.staticfiles import StaticFiles
from fastapi import Header
from auth import get_current_user
from database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from auth import *

app = FastAPI()

app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")



# -----------------------
# CORS
# -----------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Create Tables
# -----------------------

database_models.Base.metadata.create_all(bind=engine)


# -----------------------
# DB Dependency
# -----------------------

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# -----------------------
# Root
# -----------------------



@app.get("/")
def index():
    return {"message": "FastAPI Is Running"}


# def get_current_role(role: str = Header(...)):
#     return role

# def require_roles(allowed_roles: list[str]):
#     def role_checker(role: str = Depends(get_current_role)):
#         if role not in allowed_roles:
#             raise HTTPException(status_code=403, detail="Access denied")
#     return role_checker


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(get_db)):

    user = db.query(database_models.User)\
        .filter(database_models.User.username == form_data.username)\
        .first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})

    return {"access_token": token, "token_type": "bearer", "role": user.role}

@app.get("/users")
def get_users(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403)

    return db.query(database_models.User).all()

# ======================================================
# DEPARTMENT CRUD
# ======================================================

@app.post("/departments", response_model=DepartmentResponse)
def create_department(dept: DepartmentCreate, db: Session = Depends(get_db)):
    db_dept = database_models.Department(**dept.model_dump())
    db.add(db_dept)
    db.commit()
    db.refresh(db_dept)
    return db_dept


@app.get("/departments", response_model=list[DepartmentResponse])
def get_departments(db: Session = Depends(get_db)):
    return db.query(database_models.Department).all()


@app.get("/departments/{id}", response_model=DepartmentResponse)
def get_department(id: int, db: Session = Depends(get_db)):
    dept = db.query(database_models.Department).filter(
        database_models.Department.id == id
    ).first()

    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    return dept

@app.put("/departments/{id}", response_model=DepartmentResponse)
def update_department(id: int, updated_dept: DepartmentCreate, db: Session = Depends(get_db)):
    
    dept = db.query(database_models.Department).filter(
        database_models.Department.id == id
    ).first()

    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    dept.name = updated_dept.name
    dept.description = updated_dept.description

    db.commit()
    db.refresh(dept)

    return dept


@app.delete("/departments/{id}")
def delete_department(id: int, db: Session = Depends(get_db)):
    dept = db.query(database_models.Department).filter(
        database_models.Department.id == id
    ).first()

    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    db.delete(dept)
    db.commit()
    return {"message": "Department deleted successfully"}


# ======================================================
# EMPLOYEE CRUD
# ======================================================

@app.post("/employees", response_model=EmployeeResponse)
def create_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    db_emp = database_models.Employee(**emp.model_dump())
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp


# @app.get("/employees", response_model=list[EmployeeResponse])
# def get_employees(db: Session = Depends(get_db)):
#     return db.query(database_models.Employee).all()


# @app.get("/employees", response_model=list[EmployeeResponse])
# def get_employees(
#     page: int = Query(1, ge=1),
#     size: int = Query(10, le=100),
#     db: Session = Depends(get_db)
# ):
#     skip = (page - 1) * size

#     employees = db.query(database_models.Employee)\
#         .options(joinedload(database_models.Employee.department))\
#         .filter(database_models.Employee.is_deleted == False)\
#         .offset(skip)\
#         .limit(size)\
#         .all()

#     return employees

# @app.get("/employees")
# def get_employees(
#     page: int = Query(1, ge=1),
#     size: int = Query(10, le=100),
#     db: Session = Depends(get_db)
# ):
#     skip = (page - 1) * size

#     total = db.query(database_models.Employee)\
#         .filter(database_models.Employee.is_deleted == False)\
#         .count()

#     employees = db.query(database_models.Employee)\
#         .filter(database_models.Employee.is_deleted == False)\
#         .offset(skip)\
#         .limit(size)\
#         .all()

#     return {
#         "total": total,
#         "page": page,
#         "size": size,
#         "data": employees
#     }

@app.get("/employees")
def get_employees(
    page: int = Query(1, ge=1),
    size: int = Query(10, le=100),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * size

    query = db.query(database_models.Employee)\
        .options(joinedload(database_models.Employee.department))\
        .filter(database_models.Employee.is_deleted == False)

    total = query.count()

    employees = query.offset(skip).limit(size).all()

    return {
        "total": total,
        "page": page,
        "size": size,
        "data": employees
    }


@app.get("/employees/{id}", response_model=EmployeeResponse)
def get_employee(id: int, db: Session = Depends(get_db)):
    emp = db.query(database_models.Employee).filter(
        database_models.Employee.id == id
    ).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    return emp


@app.put("/employees/{id}", response_model=EmployeeResponse)
def update_employee(id: int, updated_emp: EmployeeCreate, db: Session = Depends(get_db)):

    emp = db.query(database_models.Employee).filter(
        database_models.Employee.id == id
    ).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    emp.name = updated_emp.name
    emp.email = updated_emp.email
    emp.address = updated_emp.address
    emp.contact_no = updated_emp.contact_no
    emp.dept_id = updated_emp.dept_id

    db.commit()
    db.refresh(emp)

    return emp


# @app.delete("/employees/{id}")
# def delete_employee(id: int, db: Session = Depends(get_db)):
#     emp = db.query(database_models.Employee).filter(
#         database_models.Employee.id == id
#     ).first()

#     if not emp:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     db.delete(emp)
#     db.commit()
#     return {"message": "Employee deleted successfully"}

# @app.delete("/employees/{id}",status_code=204,dependencies=[Depends(require_roles(["admin", "hr"]))])
# def delete_employee(id: int, db: Session = Depends(get_db)):
#     emp = db.query(database_models.Employee).filter(
#         database_models.Employee.id == id
#     ).first()

#     if not emp:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     # db.delete(emp)
#     db.commit()

# @app.delete(
#     "/employees/{id}",
#     status_code=204,
#     # dependencies=[Depends(require_roles(["admin", "hr"]))]
# )
# def delete_employee(id: int, db: Session = Depends(get_db)):
#     emp = db.query(database_models.Employee).filter(
#         database_models.Employee.id == id,
#         database_models.Employee.is_deleted == False
#     ).first()

#     if not emp:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     emp.is_deleted = True
#     # db.delete(emp)
#     db.commit()


@app.delete("/employees/{id}", status_code=204)
def delete_employee(
    id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    if current_user.role not in ["admin", "hr"]:
        raise HTTPException(status_code=403, detail="Not allowed")

    emp = db.query(database_models.Employee).filter(
        database_models.Employee.id == id,
        database_models.Employee.is_deleted == False
    ).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    emp.is_deleted = True
    db.commit()


# def require_admin(role: str = Depends(get_current_role)):
#     if role != "admin":
#         raise HTTPException(status_code=403, detail="Admin access required")

# def require_roles(allowed_roles: list[str]):
#     def role_checker(role: str = Depends(get_current_role)):
#         if role not in allowed_roles:
#             raise HTTPException(status_code=403, detail="Access denied")
#     return role_checker


# ======================================================
# Payroll CRUD
# ======================================================


# @app.post("/Payrolls/", response_model=PayrollResponse)
# def create_payroll(payroll: PayrollCreate, db: Session = Depends(get_db)):

#     net_salary = payroll.gross_salary - payroll.deductions

#     new_payroll = payroll(
#         gross_salary=payroll.gross_salary,
#         deductions=payroll.deductions,
#         net_salary=net_salary,
#         emp_id=payroll.emp_id
#     )

#     db.add(new_payroll)
#     db.commit()
#     db.refresh(new_payroll)

#     return new_payroll



@app.post("/payrolls/")
def create_payroll(payroll: PayrollCreate, db: Session = Depends(get_db)):

    deductions = payroll.deductions or 0
    net_salary = payroll.gross_salary - deductions

    new_payroll = database_models.Payroll(
        gross_salary=payroll.gross_salary,
        deductions=deductions,
        net_salary=net_salary,
        emp_id=payroll.emp_id
    )

    db.add(new_payroll)
    db.commit()
    db.refresh(new_payroll)

    return new_payroll

# @app.get("/Payrolls/", response_model=list[PayrollResponse])
# def get_all_payroll(db: Session = Depends(get_db)):
#     return db.query(Payroll).all()


@app.get("/payrolls/", response_model=list[PayrollResponse])
def get_all_payroll(db: Session = Depends(get_db)):
    return db.query(database_models.Payroll).all()



@app.put("/payrolls/{id}", response_model=PayrollResponse)
def update_payroll(id: int, updated_data: PayrollCreate, db: Session = Depends(get_db)):

    payroll = db.query(database_models.Payroll).filter(database_models.Payroll.id == id).first()

    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")

    payroll.gross_salary = updated_data.gross_salary
    payroll.deductions = updated_data.deductions
    payroll.net_salary = updated_data.gross_salary - updated_data.deductions
    payroll.emp_id = updated_data.emp_id

    db.commit()
    db.refresh(payroll)

    return payroll

@app.delete("/payrolls/{id}")
def delete_payroll(id: int, db: Session = Depends(get_db)):
    payroll = db.query(database_models.Payroll).filter(database_models.Payroll.id == id).first()

    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")

    db.delete(payroll)
    db.commit()

    return {"message": "Payroll deleted successfully"}

# Proffesional Way

# # from sqlalchemy import event

# @event.listens_for(Payroll, "before_insert")
# def calculate_net_salary(mapper, connection, target):
#     target.net_salary = target.gross_salary - (target.deductions or 0)

# @event.listens_for(Payroll, "before_update")
# def calculate_net_salary_update(mapper, connection, target):
#     # target.net_salary = target.gross_salary - (target.deductions or 0)

@app.get("/dashboard-stats")
def get_dashboard_stats(db: Session = Depends(get_db)):

    total_employees = db.query(database_models.Employee).count()
    total_departments = db.query(database_models.Department).count()
    total_payrolls = db.query(database_models.Payroll).count()

    highest_salary = db.query(database_models.Payroll)\
        .order_by(database_models.Payroll.net_salary.desc())\
        .first()

    return {
        "total_employees": total_employees,
        "total_departments": total_departments,
        "total_payrolls": total_payrolls,
        "highest_salary": highest_salary.net_salary if highest_salary else 0
    }

@app.post("/create-admin")
def create_admin(db: Session = Depends(get_db)):

    existing = db.query(database_models.User)\
        .filter(database_models.User.username == "admin")\
        .first()

    if existing:
        return {"message": "Admin already exists"}

    hashed_password = hash_password("admin123")

    admin = database_models.User(
        username="admin",
        password=hashed_password,
        role="admin"
    )

    db.add(admin)
    db.commit()

    return {"message": "Admin created successfully"}

@app.post("/create-employee-user")
def create_employee_user(
    data: EmployeeUserCreate,
    db: Session = Depends(get_db)
):

    emp = db.query(database_models.Employee)\
        .filter(database_models.Employee.id == data.employee_id)\
        .first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    hashed_password = hash_password("emp123")

    user = database_models.User(
        username=emp.name.lower(),
        password=hashed_password,
        role="employee",
        employee_id=emp.id
    )

    db.add(user)
    db.commit()

    return {"message": "Employee user created"}

@app.get("/my-profile")
def get_my_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user.role != "employee":
        raise HTTPException(status_code=403)

    employee = db.query(database_models.Employee).filter(
        database_models.Employee.id == current_user.employee_id
    ).first()

    return employee

# username = "admin"
# password = "admin123"
# role = "admin"