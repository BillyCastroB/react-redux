import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { obtenerProductos } from '../actions/productoActions'
import { Producto } from './Producto'
export const Productos = () => {
  const dispatch = useDispatch(  )

  useEffect( ()=>{
    const cargarProductos = ()=> dispatch( obtenerProductos() )
    cargarProductos()
  }, [] )

  const productos = useSelector( state => state.productos.productos );
  const error = useSelector(state => state.productos.error);
  const cargando = useSelector(state => state.productos.loading);

  return (
    <>
        <h2 className='text-center my-5'>Listado de Productos</h2>
        { error ? <p className='alert alert-danger font-weight-bold mt-4 text-center '> hubo un error </p> : null }
        { cargando ? <p className='text-center'> Cargando... </p> : null }
        <table className='table table-striped'>
            <thead className='bg-primary table-dark'>
                <tr>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No hay productos</td>
            </tr>
          ) : (
                  productos.map(producto=>(
                    <Producto
                      key={producto.id}
                      producto={producto}  
                    />
                  ))
                ) }
            </tbody>
        </table>
    </>
  )
}
