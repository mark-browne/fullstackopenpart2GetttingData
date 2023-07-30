import axios from 'axios'

const getAll = () => {
   return axios.get('http://localhost:3001/persons')
}

const addPerson = (person) =>{
   return axios
   .post('http://localhost:3001/persons',person)
 }

 const deleteRecord = (id) =>{
  return axios.delete('http://localhost:3001/persons/'+id)
}

export default {
   getAll,
   addPerson,
   deleteRecord
}