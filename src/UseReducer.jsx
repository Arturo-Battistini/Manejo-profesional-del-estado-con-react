import React, { useEffect, useReducer, useState } from 'react'
const SECURITY_CODE = 'paradigma';

export const UseReducer = ({name}) => {

  const [state , dispatch] = useReducer(reducer,initialState)
  useEffect( () =>{
    
    if(state.loading){
      setTimeout( () => {
        if (state.value === SECURITY_CODE) {
          dispatch({type: actionTypes.pass})
        }
        else{
          dispatch({type: actionTypes.error})
        }
      },1000)
    }

  },[state.loading]
  )

  return (
    <section className='reducer'>
      <div>
        {/* confirmamos el parrafo depende la accion */}

        {state.confirmDelete ? <h2> {name} Ha sido eliminado</h2> : 
        <>
          <h2>Eliminar {name}</h2>
          {state.validation ? 'El codigo es Correcto que desea hacer?' :  <p>Por favor escribe el codigo de seguridad que quieres comprobar o eliminar</p>}
        </>
        }

        {/* Error al comprobar codigo de seguridad */}

        {state.error && (
          <p className='error'>Error: el codigo es incorrecto vuelve a intentarlo</p>
        )}

        {/* sino Cargando...*/}

        {state.loading && (
        <p> Cargando...</p>
        )}

      </div>

      {state.validation || state.loading ? null : 
      <input 
        placeholder='Codigo de seguridad'
        value={state.value}
        onChange={(event) => {
          dispatch({type: actionTypes.write, payload: event.target.value })
        } }
      />}

      {state.validation ? 
        <div className='button-gap'>
          {state.confirmDelete ? <button onClick={() => dispatch({type:actionTypes.goBack})}>Arrepentido? recupera {name}</button> : 
            <>
              <button onClick={() => dispatch({type:actionTypes.confirmDelete})}>Eliminar</button>
              <button onClick={() => dispatch({type:actionTypes.goBack})}>Volver</button>
            </>}

        </div> 
      : 
      state.loading?  null : <button onClick={ () => dispatch({type:actionTypes.validation})}>Comprobar</button>
    }
    </section>
    
  )
}



const initialState ={
  value:'',
  error:false,
  loading: false,
  validation: false,
  confirmDelete: false,
  goBack:false

}

/* Action types */
const actionTypes = {
  error:'ERROR',
  pass:'PASS',
  write:'WRITE',
  validation:'VALIDATION',
  confirmDelete:'CONFIRM_DELETE',
  goBack:'GOBACK',
}
const reducer = ( state, action ) => {

  switch(action.type){
    case actionTypes.error:
      return{
        ...state, 
        value:'',
        loading:false,
        error: true,
      }
    case actionTypes.pass:
      return{
        ...state,
        loading:false,
        validation:true,
      }
    case actionTypes.write:
      return{
        ...state, 
        value:action.payload
      }
    case actionTypes.validation:
      return{
        ...state,
        loading:true,
        error:false,
      }
    case actionTypes.confirmDelete:
      return{
        ...state, 
        confirmDelete:true
      }
    case actionTypes.goBack:
      return{
        ...initialState
      }
  }

}