import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from "axios";

function SignUp(){


    const [errorMsg, setErrorMsg] = useState('')

    const [input, setInput] = useState({
        email: '',
        user: '',
        password: '',
        repassword: ''
    })

    const [errors, setErrors] = useState({});

    function validate(input){
        let errors = {}

        if (!input.email){
            errors.email = "Se requiere un email    "
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.email))errors.email = "El email es invalido";
        
        if (!input.user) {
            errors.user = "Se requiere nombre de usuario"
        }else if(input.user.length < 6){
            errors.user = 'El nombre de usuario debe contener 6 letras o más'
        }

        if(input.password.length < 8){
            errors.password = 'Su contraseña es muy corta, debe contener mas de 8 caracteres.'
        }

        if(input.password !== input.repassword){
            errors.repassword = 'Las contraseñas no son identicas.'
        }

        return errors
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })

        setErrors(
            validate({
            ...input,
            [e.target.name]:e.target.value
            }
            )
        )
    }

    async function handleSubmit(e){
        e.preventDefault()

        if (Object.keys(errors).length === 0 && input.email){
            let info = await axios.post("/authentication/register", input);
            setErrorMsg(info.data)
            alert('Has sido registrado.')
        }else{
            console.log('No entro')
        }
    }

    return (
        <div gap={2} className="col-md-5 mx-auto mt-5 container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    
                    <input 
                        className="form-control" 
                        name='email' 
                        value={input.email} 
                        type="email" 
                        placeholder="Ingresa tu email"
                        onChange={handleChange} 
                    />

                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <input
                        className="form-control" 
                        name='user' 
                        value={input.user} 
                        type="text" 
                        placeholder="Ingresa tu usuario"
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Reingresar contraseña</Form.Label>
                    <Form.Control
                        className='form-control'
                        name='repassword' 
                        value={input.repassword} 
                        type="password" 
                        placeholder="******"
                        onChange={handleChange}
                    />
                </Form.Group>
                
                

                <Button variant="primary" type="submit">
                    Registrarme
                </Button>
            </Form>

            

            <Form.Text className="text-muted mt-5">
                <Link to='/'>Ya tengo una cuenta</Link>
            </Form.Text>
        </div>
    )
}

export default SignUp;