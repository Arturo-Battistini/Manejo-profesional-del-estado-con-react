import React, { useEffect, useState } from 'react'

  const SECURITY_CODE = 'paradigma';

  export const UseState = ({name}) => {


  const [state , setState] = useState({
    value:'',
    error:false,
    loading: false,
    validation: false,
    confirmDelete: false,
    goBack:false
  })

  useEffect( () =>{
    
    if(state.loading){
      setTimeout( () => {
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            loading:false,
            validation:true,
          })
        }else{
          setState({
            ...state, 
            value:'',
            loading:false,
            error: true,})
        }
      },1000)
    }

  },[state.loading]
  )
  
/* Manejadores del estado */
  const handleValidation = () =>{
    setState({
      ...state,
      loading:true,
      error:false,
    })
  }
  const handleGoBack = () =>{
    setState({
      value:'',
      error:false,
      loading: false,
      validation: false,
      confirmDelete: false,
      goBack:false
    })
  }
  const handleConfirmDelete = () =>{
    setState({
      ...state, confirmDelete:true
    })
  }

  return (
    <div className='use'>

    {state.confirmDelete ?
      <div> <h2> {name} Ha sido eliminado</h2> </div> 
      :
      <>
      <h2>Eliminar {name}</h2>
        {state.validation ? 'El codigo es Correcto que desea hacer?' :  <p>Por favor escribe el codigo de seguridad que quieres comprobar o eliminar</p>}
      </> 
    }
    
      {state.error && (
        <p>Error: el codigo es incorrecto vuelve a intentarlo</p>
        )
      }

      {state.loading && (
        <p> Cargando...</p>
      )}

    {state.validation || state.loading ? null : 
      <input 
        placeholder='Codigo de seguridad'
        value={state.value}
        onChange={(event) => {
          setState({value:event.target.value})
        } }
      />}
    {state.validation ? 
        <div className='button-gap'>
          {state.confirmDelete ? <button onClick={ handleGoBack()}>Arrepentido? recupera {name}</button> : 
            <>
              <button onClick={() => handleConfirmDelete()}>Eliminar</button>
              <button onClick={() => handleGoBack()}>Volver</button>
            </>}

        </div> 
      : 
      state.loading?  null : <button onClick={ () => handleValidation()}>Comprobar</button>
    }

    </div>
  )
}
