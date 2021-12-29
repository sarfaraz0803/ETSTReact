import axios from "axios";

const MANAGER_API_URL = 'http://localhost:8764/manager'
const EMPLOYEE_API_URL = 'http://localhost:8763/employeeProfile'

class Service{

    // Manager API
    managerLogin(loginData){
        return axios.post(MANAGER_API_URL+'/login',loginData)
    }

    managerLogout(){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.post('/logout')
    }

    addNewAccount(account){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.post('/addAccount',account)
            
    }

    getAllAccounts(){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.get('/getAllAccounts')
    }

    //Not Working
    getAccountById(id){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        //const reqHeaders = {"Content-Type": "application/json",'Access-Control-Allow-Origin': '*','UserId':`${store.userId}`,'Authorization':`${store.token}`}
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`, AccessControlAlllowOrigin :'*'}})
        return authAxios.get(`/getAllAccounts/${id}`)
        //
    }

    updateAccountById(id,account){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.put(`/updateAccountById/${id}`,account)
    }

    deleteAccount(id){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.delete(`/deleteAccount/${id}`)
    }

    assignTask(empDetail){
        const task = empDetail.task
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.put(`/assignTask/${empDetail.id}/${empDetail.date}`,task)
    }

    getAllTimeSheetById(id){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.get(`/getTimeSheetById/${id}`)
    }

    getOneSheet(empDetail){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.get(`/getOneSheet/${empDetail.id}/${empDetail.date}`)
    }

    updateTask(taskDetail){
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.put(`/updateTask`,taskDetail)
    }

    deleteTask(taskDetail){
        const {empId, date, taskId} = taskDetail
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        const authAxios = axios.create({baseURL:MANAGER_API_URL,headers:{UserId:`${store.userId}`,Authorization:`${store.token}`}})
        return authAxios.delete(`/deleteTask/${empId}/${date}/${taskId}`)
    }



    //  Employee API

    employeeLogin(empLoginData){
        return axios.post(EMPLOYEE_API_URL+'/login',empLoginData)
    }

    employeeLogout(){
        const empStore = JSON.parse(localStorage.getItem('EmployeeCredentials'))
        const empAxios = axios.create({baseURL:EMPLOYEE_API_URL,headers:{UserId:`${empStore.account._id}`,Authorization:`${empStore.token}`}})
        return empAxios.post('/logout')
    }

    //Not Working
    empUpdate(employeeUpdateData){
        const empStore = JSON.parse(localStorage.getItem('EmployeeCredentials'))
        const empAxios = axios.create({baseURL:EMPLOYEE_API_URL,headers:{UserId:`${empStore.account._id}`,Authorization:`${empStore.token}`,AccessControlAllowOrigin:'*'}})
        //return empAxios.post('/updateAccount',employeeUpdateData)
    }

}

export default new Service();