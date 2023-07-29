import axios from 'axios'

const getAll = () => {
   return axios.get('http://localhost:3001/persons')
}

const updateBackend = (person) =>{
   axios
   .post('http://localhost:3001/persons',person)
   .then(response => {
     console.log(response.data)
   })
   .catch(error => {
     console.log(error)
   })
 }

 const deleteRecord = (id) =>{
  return axios.delete('http://localhost:3001/persons/'+id)
}

export default {
   getAll,
   updateBackend,
   deleteRecord
}