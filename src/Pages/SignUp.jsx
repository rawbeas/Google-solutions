import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const FormContainer = styled(motion.div)`
  background: linear-gradient(135deg, #6f86d6, #48c6ef);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

const Button = styled(motion.button)`
  background-color: #4caf50;
  color: white;
  padding: 0.8rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
    transition-duration: .3s ease-in-out
`;

const SignUp = () => {
    const [formData, setFormData] = useState({
      name:"",
      email:"",
      password:"",
      role:"Athlete"
    })
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost500/api/users/signup",formData)
            alert(res.data.message)
        }
        catch(error){
            console.log(error)
            alert("Error signing up")
        }
    }
    return (<FormContainer initial={{opacity:.2}} animate={{opacity:.9}} transition={{duration:.7}}>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
            <Label>Name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required/>
            <Label>Password</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required/>
            <Label>Role</Label>
            <Select name="role" value={formData.role} onChange={handleChange}>
                <option value="Athlete">Athlete</option>
                <option value="Doctor">Doctor</option>
                <option value="Coach">Coach</option>
            </Select>
            <Button type="submit" whileHover={{scale:.9}}>Sign Up</Button>
        </form>
    </FormContainer>)
}
export default SignUp;


