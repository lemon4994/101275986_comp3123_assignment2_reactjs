import axios from 'axios';

const SignUpLink = async (form) => {
    try {
      const response = await axios.post(`http://localhost:3010/api/v1/user/signup`, {
        username: form.username,
        email: form.email,
        password: form.password,
    })
      return response.data
    } catch (error) {
      console.error('Signup Error:', error.response ? error.response.data : error.message);
    }
  }

  const LogInLink = async (form) => {
    console.log("test")
    try {
        const response = await axios.post('http://localhost:3010/api/v1/user/login', {
            username: form.username,
            password: form.password,
        });
        return response;
    } catch (error) {
        console.error('Login Error:', error.response ? error.response.data : error.message);
    }
};

  const EmployeeListLink = async () => {
    try {
      const response = await axios.get(`http://localhost:3010/api/v1/emp/employees`)
      return response.data
    } catch (error) {
      console.error('Employee List Error:', error.response ? error.response.data : error.message);
    }
  }

  const CreateEmployeeLink = async (form) => {
    try {

      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        position: form.position,
        salary: form.salary,
        date_of_joining: form.date_of_joining,
        department: form.department,
      }
      if (form.date_of_joining) {
        payload.date_of_joining = form.date_of_joining;
      }
      const response = await axios.post(`http://localhost:3010/api/v1/emp/employees`, payload)
      return response
    } catch (error) {
      console.error('Create Employee Error:', error.response ? error.response.data : error.message);
    }
  }

  const FindEmployeeByIDLink = async (form) => {
    try {
      const response = await axios.get(`http://localhost:3010/api/v1/emp/employees/${form}`)
      return response.data
    } catch (error) {
      console.error('Find Employee Error:', error.response ? error.response.data : error.message);
    }
  }

  const UpdateEmployeeLink = async (form) => {
    try {
      const response = await axios.put(`http://localhost:3010/api/v1/emp/employees/${form.employeeId}`, {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        position: form.position,
        salary: form.salary,
        department: form.department,
      })
      return response
    } catch (error) { console.error('Update Employee Error:', error.response ? error.response.data : error.message); }
  }

  const DeleteEmployeeLink = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3010/api/v1/emp/employees/${id}`)
      return response
    } catch (error) {
      console.error('Delete Employee Error:', error.response ? error.response.data : error.message);
    }
  }
  
  export { SignUpLink };

  export { LogInLink };

  export { EmployeeListLink };

  export { CreateEmployeeLink };

  export { FindEmployeeByIDLink };

  export { UpdateEmployeeLink };

  export { DeleteEmployeeLink };