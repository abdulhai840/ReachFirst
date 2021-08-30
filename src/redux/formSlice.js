import { createSlice } from '@reduxjs/toolkit'


export const formSlice = createSlice({
  name: 'form',
  initialState: {
    jobs:[],
    notification: []
  },
  reducers: {
    addJob: (state, action) => {
      // eslint-disable-next-line
      const {step1, step2, step3} = action.payload
      const job = {
        lookingFor: step1.lookingFor, experience: step1.experience,  education: step1.education,  skills: step1.skills, description: step1.description,
        hourlyRate: step2.hourlyRate, careerLevel: step2.careerLevel,  satrtDate: step2.satrtDate,  gender: step2.gender, equiqSpecification: step2.equiqSpecification,
        // selectedDays: [...step3.days], selectedTimes: [...step3.daysTime]
      }

      state.jobs.push(job)
     
    },
    delJob: (state, action) => {
      state.jobs = [...action.payload]
    },
    addNotification: (state, action) => {
      const notif = {
        title: action.payload.step1.lookingFor,
        message:action.payload.step1.description, 
      }
      state.notification.push(notif)
    },
   
  },
})

export const { addJob,delJob, addNotification } = formSlice.actions

export default formSlice.reducer