import React,{useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./stepper-form.module.css"

export default function Step1({step}) {

    const [step1Data, setStep1Data] = useState({lookingFor: "", experience: "", education: "", skills: "", description: "" })

    const handleChange = (event, value) => {
        const eventArray = event.target.id.split("-")
        const [id] = eventArray
        if(id) setStep1Data((prevState)=> ({...prevState, [id]: value || event.target.value})) 
    }
    useEffect(() => {
        if(step1Data.lookingFor) {
         localStorage.setItem("step1Data", JSON.stringify(step1Data))
        }
    }, [step1Data])

    useEffect(() => {
        
        const savedData = JSON.parse(localStorage.getItem("step1Data"))
        if(savedData){
            // eslint-disable-next-line
             const {lookingFor: lookingFor , experience: experience , education: education , skills: sk , description: des } = savedData
             // eslint-disable-next-line
            setStep1Data((prevState)=> ({...prevState, "lookingFor": lookingFor, "experience": experience, "education": education, "skills": sk, "description": des})) 
        }
       
    }, [])
    
    return (
        <Container className="mt-5 px-0">
            <Row>
                <Col xs={6}>
                <Autocomplete
                    onChange={(event, value) => handleChange(event, value)}
                    id="lookingFor"
                    options={jobs}
                    value={step1Data.lookingFor}
                    getOptionLabel={(option) => option}
                    renderInput={(params) =>   <TextField {...params}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="outlined-required"
                        label="Looking For"
                        variant="outlined"
                    />}
                    />
                </Col>
                <Col xs={6}>
                <Autocomplete
                    value={step1Data.experience}
                    onChange={(event, value) => handleChange(event, value)}
                    id="experience"
                    options={experience}
                    getOptionLabel={(option) => option}
                    renderInput={(params) =>   <TextField {...params}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="outlined-required"
                        label="Experience"
                        variant="outlined"
                    />}
                    />
                </Col>
                <Col xs={6} className="mt-5">
                <Autocomplete
                    value={step1Data.education}
                    onChange={(event, value) => handleChange(event, value)}
                    id="education"
                    options={education}
                    getOptionLabel={(option) => option}
                    renderInput={(params) =>   <TextField {...params}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="outlined-required"
                        label="Education"
                        variant="outlined"
                    />}
                    />
                </Col>
                <Col xs={12} className="mt-5">
                <Autocomplete
                    value={step1Data.skills}
                    onChange={(event, value) => handleChange(event, value)}
                    id="skills"
                    options={skill}
                    getOptionLabel={(option) => option}
                    renderInput={(params) =>   <TextField {...params}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="outlined-required"
                        label="Skills"
                        variant="outlined"
                    />}
                    />
                </Col>
                <Col xs={12} className="mt-5">
                <TextField
                    onChange={(event, value) => handleChange(event,value )}
                    className={styles.descripition}
                    required
                    multiline
                    rows={5}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="description-outlined"
                    label="Descripition"
                    value={step1Data.description}
                    variant="outlined"
                    />
                </Col>

                <Col>
                    <p className={styles.fileUploadLabel}>And if there is any inspiration</p>
                    <button type="file" className={styles.fileUploadBtn}>GO TO SELECT TEMPLATE</button>
                </Col>
            </Row>
        </Container>
    )
}

const jobs = ["React Js", "Node js", "OS"]
const skill = ["React", "Node", "SRE"]
const experience = ["1", "2", "3", "4", "5"]
const education = ["BS", "MS", "PhD"]

