import clienteAxios from "../config/axios";
import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR, COMENZAR_DESCARGA_PRODUCTOS, COMENZAR_DESCARGA_EXITO, COMENZAR_DESCARGA_ERROR, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_ELIMINADO_EXITO, PRODUCTO_ELIMINADO_ERROR, OBTENER_PRODUCTO_EDITAR, COMENZAR_EDICION_PRODUCTO, PRODUCTO_EDITADO_EXITO  } from "../types/types";
import Swal from 'sweetalert2';
export const crearNuevoProducto = (producto)=>{
    return async (dispatch)=>{
        dispatch( agregarProducto() )
        try {
            await clienteAxios.post('/productos', producto);
            dispatch( agregarProductoExito(producto) )
            Swal.fire(
                'Correcto',
                'Se agrego correctamente',
                'success'
            )
        } catch (error) {
            dispatch( agregarProductoError(true) )
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intentelo de nuevo'
            })
        }

    };
}

const agregarProducto= ()=>({
    type: AGREGAR_PRODUCTO,
})


const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = (estado)=>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


export const obtenerProductos = ()=>{
    return async (dispatch)=>{
        dispatch( descargarProductos() )
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargarProductosExitosa( respuesta.data ) )
        } catch (error) {
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = ()=>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = (respuesta)=>({
    type: COMENZAR_DESCARGA_EXITO,
    payload: respuesta
})
const descargaProductosError = ()=>({
    type: COMENZAR_DESCARGA_ERROR,
    payload: true   
})


export const borrarProducto = id =>{
    return async (dispatch)=>{
        dispatch( obtenerProductoEliminar(id) )

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() ) 
            Swal.fire({
                title: "Eliminado!",
                text: "El producto se elimnino correctamente",
                icon: "success"
              });
        } catch (error) {
            dispatch( eliminarPRoductoError() )

        }

    }
}

const obtenerProductoEliminar = id=>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = ()=>({
    type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarPRoductoError = ()=>({
    type: PRODUCTO_ELIMINADO_ERROR
})

export const obtenerProductoEditar = (producto)=>{
    return (dispatch)=>{
        dispatch( obtenerProductoAction(producto) )
    }
}

const obtenerProductoAction = (producto)=>({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export const editarProductoAction = (producto)=>{
    return async (dispatch)=>{
        dispatch( editar() )
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch( editarProductoExito(producto) )
        } catch (error) {
            
        }
    }
}

const editar = ()=>({
    type: COMENZAR_EDICION_PRODUCTO
})
const editarProductoExito = producto =>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})







