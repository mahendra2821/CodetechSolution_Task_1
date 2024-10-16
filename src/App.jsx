import React from 'react'

import {useState , useEffect} from 'react'
import List from './components/List'
import './App.css'
import Alert from './components/Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem("list") 
  if(list) {
    return (list = JSON.parse(localStorage.getItem("list")))
  }
  else {
    return [] 
  }

}
 
function App() {

  const [name , setName] = useState('')
  const [list , setList] = useState(getLocalStorage())
  const [isEditing , setEditing] = useState(false)
  const [editId , setEditId] = useState(null)
  const [alert , setAlert] = useState({show:false, msg: "", type: ""});

  useEffect(() => {
    localStorage.setItem("list" , JSON.stringify(list)) 

  },[list])


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAlert(true, "danger" , "Please Enter value")
    }
    else if(name && isEditing) {
      setList(
        list.map((item) => {
          if(item.id === editId) {
            return {...item , title: name}
          }
          return item
        })
      )
      setName("") 
      setEditId(null) 
      setEditing(false) 
      showAlert(true, "sucess" , "value Changes")
    }
    else {
      showAlert(true , "success" , "item Added to the List") 
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list , newItem]) 
      setName("")
    }
  }
  const showAlert = (show = false , type="" , msg= "") =>{
    setAlert({show, type, msg})
  }

  const removeItem = (id) => {
    showAlert(true , "danger" , "Items Removed") 
    setList(list.filter((item) => item.id !== id)) 

  }
  const editItem = (id) => { 
    const editItem = list.find((item) => item.id === id) 
    setEditing(true) 
    setEditId(id)
    setName(editItem.title)
  }
  const clearList = () => {
    showAlert(true , "danger" , "EmptyList") 
    setList([])
  } 



  return (
  <>
  <section className='section-center'>
    <form onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeALert={showAlert} list={list} />} 


      <h3 style={{marginBottom: '1.5rem' , textAlign: 'center'}} >
        Todo List 
      </h3>

      <div className='mb-3 form'>
        <input 
        type='text'
        className='form-control'
        placeholder='e.g. Bread'
        onChange={(e) => setName(e.target.value)} 
        value={name} 
        /> 
        <button type="submit" className='btn btn-success button1'>
          {isEditing ? "Edit" : "Submit"}
        </button>
      </div>
    </form>
    {list.length > 0 && (
      <div style={{marginTop: '2rem'}}>

        <List className="delete-btn" items={list} removeItem={removeItem} editItem={editItem}/> 
        <div className='text-center'>
          <button className='btn btn-warning' onClick={clearList}>Clear Items</button>
        </div>
      </div>
  
    )
  }
  </section>
  
  </>
    
  
  )
}


export default App