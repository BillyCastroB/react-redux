import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { borrarProducto, obtenerProductoEditar } from '../actions/productoActions'


export const Producto = ({producto}) => {
    const navigate = useNavigate();
    const { nombre, precio, id } = producto
    const dispatch = useDispatch();

    const confirmarEliminar = id=>{

      Swal.fire({
        title: "¿Estas seguro de eliminar?",
        text: "Un producto que se elimina no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch( borrarProducto(id) )
        }
      });
    }

    const redireccionarEdicion = producto =>{
      dispatch( obtenerProductoEditar(producto) )
      navigate(`/productos/editar/${producto.id}`)
    }

  return (
    <tr>
        <td>{nombre}</td>
        <td>{precio}</td>
        <td className='acciones'>
            <button onClick={ () => redireccionarEdicion(producto) } className='btn btn-primary mr-2'>Editar</button>
            <button onClick={ ()=>confirmarEliminar(id) } type='button' className='btn btn-danger'>Eliminar</button>
        </td>
    </tr>
  )
}
