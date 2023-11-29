import { useState } from 'react'
import './index.css'
import { UseState } from './UseState'
import { ClassState } from './ClassState'
import { UseReducer } from './UseReducer'

function App() {
  return (
    <>
     <div className='App'>
        <UseState name='UseState'/>
        <UseReducer name='UseReducer'/>
     </div>
    </>
  )
}

export default App
