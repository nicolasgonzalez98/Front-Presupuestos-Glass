import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import useLocalStorage from '../hooks/use-localstorage';

export function LogIn(){

    const navigate = useNavigate()

    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const [id_user, setIdUser] = useLocalStorage('id_user', 0)

    const [msg, setMsg] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        
        if(!input.username && !input.password){
            setMsg('No ingresaste datos')
        }else if(!input.username){
            setMsg('No ingresaste tu usuario o email.')
        }else if(!input.password){
            setMsg('No ingresaste la contraseña')
        }else{
            setMsg('')
            
            let is_authorized = await axios.get("/is_online");

            if (is_authorized.data) {
                setMsg("Ya estas registrado");
            }else{
                
                const login = await axios({
                    method: "post",
                    url: "authentication/login",
                    data: input,
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                    withCredentials: true,
                })
                
                .then((res) => {
                    console.log(res)
                    return res.data;
                })
                .catch((error) => console.log(error));
                
                let { log_in, id } = login

                setIdUser(id)
                navigate('/budget')
                
            }
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
                    <Form.Label>Usuario</Form.Label>
                    <input 
                        className='form-control' 
                        name='username' 
                        value={input.username} 
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