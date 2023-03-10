import React from 'react'
import './modal.css'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Modal = ({isModalOpen, setIsModalOpen, newtodoId}) => {
    const navigate = useNavigate()

    const deleteTodo = async () => {
        const resp = await axios.delete(`/api/deletetodo/${newtodoId}`) 

        console.log(resp);
        setIsModalOpen(false)

        navigate('/')
    }

  return (
    <div className='modal-container'>
      <div className='modal'>
        <h3>Are You Sure?</h3>
        <div className='modal-btn-container'>
            <button className='modal-cancel-btn'
            onClick={() => {
                setIsModalOpen(false)
            }}
            >Cancel</button>
            <button  className='modal-confirm-btn'
            onClick={()=>{
                deleteTodo()
            }}
            >Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
