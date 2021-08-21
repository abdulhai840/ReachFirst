import React,{useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./stepper-form.module.css";


export default function Step2() {

    const [step2Data, setStep2Data] = useState({hourlyRate: "", satrtDate: "", careerLevel: "", gender: "", equiqSpecification: "" })
    // eslint-disable-next-line
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (event, value) => {
        const eventArray = event.target.id.split("-")
        const [id] = eventArray
        if(id) setStep2Data((prevState)=> ({...prevState, [id]: value || event.target.value})) 
    }
    useEffect(() => {
        if(step2Data.hourlyRate) {
         localStorage.setItem("step2Data", JSON.stringify(step2Data))
        }
    }, [step2Data])

    useEffect(() => {
        
        const savedData = JSON.parse(localStorage.getItem("step2Data"))
        if(savedData){
             const {hourlyRate: hr , satrtDate: sd , careerLevel: cl , gender: g , equiqSpecification: eq } = savedData
            setStep2Data((prevState)=> ({...prevState, "hourlyRate": hr, "satrtDate": sd, "careerLevel": cl, "gender": g, "equiqSpecification": eq})) 
        }
       
    }, [])
    // eslint-disable-next-line
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    return (
        <Container className="mt-5 px-0">
        <Row>
            <Col xs={6}>
            <Autocomplete
             onChange={(event, value) => handleChange(event, value)}
             value={step2Data.hourlyRate}
                id="hourlyRate"
                options={hr}
                getOptionLabel={(option) => option}
                renderInput={(params) =>   <TextField {...params}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="hourlyRate"
                    label="Hourly rate"
                    variant="outlined"
                />}
                />
            </Col>
            <Col xs={6}>
            <TextField
                onChange={(event, value) => handleChange(event,value )}
                id="satrtDate"
                type="date"
                value={step2Data.satrtDate}
                className={styles.startDate}
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
            />
            </Col>
            <Col xs={6} className="mt-5">
            <Autocomplete
             onChange={(event, value) => handleChange(event, value)}
             value={step2Data.careerLevel}
                id="careerLevel"
                options={cl}
                getOptionLabel={(option) => option}
                renderInput={(params) =>   <TextField {...params}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="careerLevel"
                    label="Careel level"
                    variant="outlined"
                />}
                />
            </Col>
            <Col xs={6} className="mt-5">
            <Autocomplete
             onChange={(event, value) => handleChange(event, value)}
             value={step2Data.gender}
                id="gender"
                options={gen}
                getOptionLabel={(option) => option}
                renderInput={(params) =>   <TextField {...params}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="gender"
                    label="Gender"
                    variant="outlined"
                />}
                />
            </Col>
            <Col xs={12} className="mt-5">
            <TextField
                onChange={(event, value) => handleChange(event,value )}
                value={step2Data.equiqSpecification}
                className={styles.descripition}
                required
                multiline
                rows={5}
                InputLabelProps={{
                    shrink: true,
                }}
                id="equiqSpecification-outlined"
                label="Equipment specification"
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


const hr = ["5$", "10$", "15$" ,"20$", "25$"];
const cl = ["junior","medium","senior"];
const gen = ["Male", "Female"];
