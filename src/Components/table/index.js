import React, { useState, useEffect } from 'react'
import { Table } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import { delJob } from "../../redux/formSlice"
import { makeStyles } from '@material-ui/core/styles';
import { addJob } from "../../redux/formSlice"
import Modal from '@material-ui/core/Modal';
import { TextField } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Index() {

  const [formdata, setformdata] = React.useState([]);
  const [lookingFor, setlookingFor] = React.useState([]);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { jobs } = useSelector((state) => state.form)
  const dispatch = useDispatch()
  const [myJobs, setMyJobs] = useState([])
  useEffect(() => {
    setMyJobs(jobs)
    // alert(JSON.stringify(jobs))
    setformdata(jobs[0]?.experience)
    setlookingFor(jobs[0]?.lookingFor)
    localStorage.clear()
    // eslint-disable-next-line
  }, [])

  const handleDel = (del) => {
    const tempJobs = jobs;
    const afterDelJobs = tempJobs.filter((job) => {
      return job.lookingFor !== del
    })
    dispatch(delJob(afterDelJobs))
    setMyJobs(afterDelJobs)

  }
  const handleEdit = (event, value) => {
    const updated = {
      step1: {
        lookingFor: lookingFor, experience: formdata, education: jobs[0]?.education, skills: jobs[0]?.skills, description: jobs[0]?.description,
      },
      step2: {
        hourlyRate: jobs[1]?.hourlyRate, careerLevel: jobs[1]?.careerLevel, satrtDate: jobs[1]?.satrtDate, gender: jobs[1]?.gender, equiqSpecification: jobs[1]?.equiqSpecification,
      },
      // step3: {
      //   selectedDays: [...jobs[2]?.days], selectedTimes: [...jobs[2]?.daysTime]
      // }
    }
    dispatch(addJob(updated)) 
    handleClose()
  }
  // useEffect(() => {
  //   if (step1Data.lookingFor) {
  //     localStorage.setItem("step1Data", JSON.stringify(step1Data))
  //   }
  // }, [step1Data])

  const handleChange = (event) => {
    const { value } = event.target
    if (!value) {
      return setMyJobs(jobs)
    }
    const filterJobs = myJobs && myJobs?.filter((job) => {
      return job?.lookingFor?.includes(value)
    })
    setMyJobs(filterJobs)
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Form</h2>
      {myJobs && myJobs.map((job) => {
        return (
          <>
            <TextField id="Looking For" label="Looking For" variant="outlined" className="pt-3 col-12"
              value={lookingFor} name="lookingFor" onChange={(e) => setlookingFor(e.target.value)} />

            <TextField id="Experience" className="pt-3 col-12" label="Experience" variant="outlined"
              value={formdata} name="experience" onChange={(e) => setformdata(e.target.value)} />

            {/* <TextField id="Skills" className="pt-3 col-12" label="Skills" variant="outlined"
              value={job.skills} name="skills" onChange={handleEdit} />

            <TextField id="Hourly Rate" className="pt-3 col-12" label="Hourly Rate" variant="outlined"
              value={job.hourlyRate} name="hourly_rate" onChange={handleEdit} />

            <TextField id="Career Level" className="pt-3 col-12" label="Career Level" variant="outlined"
              value={job.careerLevel} name="careerLevel" onChange={handleEdit} /> */}
            <button onClick={handleEdit}>Edit</button> 
          </>
        )
      })
      }
    </div>
  );
  return (
    <>
      <input type="text" className="w-100 border rounded mt-5 p-3" placeholder="Search job" onChange={handleChange} />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Experience</th>
            <th>Education</th>
            <th>Skills</th>
            <th>Hourly Rate</th>
            <th>Career Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myJobs && myJobs.map((job) => {
            return (
              <tr>
                <td>{job.lookingFor}</td>
                <td>{job.experience}</td>
                <td>{job.education}</td>
                <td>{job.skills}</td>
                <td>{job.hourlyRate}</td>
                <td>{job.careerLevel}</td>
                <td>
                  {/* <button className="edit border-0 btn-primary" onClick={() => handleEdit(job.lookingFor)}>Edit</button> */}
                  <button type="button" className="edit border-0 btn-primary" onClick={() => handleOpen(job.lookingFor)}>
                    Edit
                  </button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body}
                  </Modal>
                  <button className="del border-0 btn-danger ml-2" onClick={() => handleDel(job.lookingFor)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </>
  )
}
