import { useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { LOGIN_USER } from '../gqlopertions/mutations'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const [signinUser,{data,loading,error}]=useMutation(LOGIN_USER)

    if(loading) return <h1>loading</h1>
    if(data){
        localStorage.setItem("token",data.user.token)
        console.log("role",data.user.role) 
        if (data.user.role === 'admin') {
            navigate('/admindashboard');
        } else {
            navigate('/userdashboard');     
        }
        // navigate('/');
    }
    
    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        signinUser({
            variables :{
                userSignin:formData
            }
        }
        )
    }
    return (
        <div className="container my-container">
        {
            error && <div className='red card-panel'>{error.message}</div>
        }

            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="email"
                 placeholder="email"
                 name="email"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="password"
                 placeholder="password"
                 name="password"
                 onChange={handleChange}
                 required
                 />
                 <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
        </div>
    )
}