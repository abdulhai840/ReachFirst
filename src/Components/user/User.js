import React,{useState,useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./user.css"
import axios from "axios"

export default function User() {

    const [id, setId] = useState()
    const [name, setName] = useState()
    const [userName, setUserName] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        saveUser()
    }
    const handleChange = (event) => {
      const {name, value} = event.target
      if(name === "name") setName(value)
      if(name === "userName") setUserName(value)
      if(name === "id") setId(value)
      
    }
    const getData = () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(
          (res) => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
      }

    useEffect(() => {
        getData()
    }, [])

   
      const saveUser = () => {
          axios.post("https://jsonplaceholder.typicode.com/users", {name: name, username: userName, id: id})
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
      
    return (
        <Container>
            <Row >
                <Col className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <input type="text" class="input" name="id"  placeholder="Id" onChange={handleChange} />
                    <input type="text" class="input" name="name" placeholder="Name" onChange={handleChange} />
                    <input type="text" class="input" name="userName" placeholder="User Name" onChange={handleChange} />
                    <button type="submit" class="button"> save</button>
                </form>
                </Col>
            </Row>
        </Container>
    )
}
