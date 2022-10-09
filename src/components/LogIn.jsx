import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export function LogIn(){

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const [msg, setMsg] = useState('')

    function handleSubmit(e){
        e.preventDefault()

        if(!input.email && !input.password){
            setMsg('No ingresaste datos')
        }else if(!input.email){
            setMsg('No ingresaste tu usuario o email.')
        }else if(!input.password){
            setMsg('No ingresaste la contraseña')
        }else{
            setMsg('')
            console.log('Iniciado sesion...')
        }
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div gap={2} className="col-md-5 mx-auto mt-5 container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <input 
                        className='form-control' 
                        name='email' 
                        value={input.email} 
                        type="text" 
                        placeholder="Ingresa tu email"
                        onChange={handleChange}
                    />
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <input 
                        className='form-control' 
                        name='password' 
                        value={input.password} 
                        type="password" 
                        placeholder="******"
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Form.Text className="text-muted mt-5">
                    Todavia no estas registrado? Hacelo <Link to='/sign-up'>Aca</Link>
            </Form.Text>
        </div>
    )
}

export default LogIn