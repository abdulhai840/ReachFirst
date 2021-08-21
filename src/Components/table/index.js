import React,{useState,useEffect} from 'react'
import {Table} from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import {delJob} from "../../redux/formSlice" 

export default function Index() {
  
  const {jobs} = useSelector((state) => state.form)
  const dispatch = useDispatch()
  const [myJobs , setMyJobs] = useState([])
  useEffect(() => {
   setMyJobs(jobs)
   localStorage.clear()
   // eslint-disable-next-line
  }, [])
  
const handleDel = (del) => {
  const tempJobs = jobs;
  const afterDelJobs = tempJobs.filter((job) => {
    return job.lookingFor !==  del
  }) 
  dispatch(delJob(afterDelJobs))
  setMyJobs(afterDelJobs)

}
const handleEdit = () => {

}
  const handleChange = (event) => {
    const {value} = event.target
    if(!value) {
    return  setMyJobs(jobs)
    } 
    const filterJobs = myJobs && myJobs?.filter((job) => {
      return  job?.lookingFor?.includes(value)
    })
    setMyJobs(filterJobs)
  }
 
    return (
      <>
      <input type="text" className="w-100 border rounded mt-5 p-3" placeholder="Search job" onChange={handleChange} /> 
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Experience</th>
            <th>Education</th>
          </tr>
        </thead>
        <tbody>
          {myJobs && myJobs.map((job) => {
            return(
              <tr>
              <td>{job.lookingFor}</td>
              <td>{job.experience}</td>
              <td>{job.education}</td>
              <td class="del" onClick={() =>handleDel(job.lookingFor)}>Delete</td>
              <td class="edit" onClick={() => handleEdit(job.lookingFor)}>Edit</td>
            </tr>
            )
          })}
        </tbody>
      </Table>

      </>
    )
}
