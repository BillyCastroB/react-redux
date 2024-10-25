import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useNavigate } from 'react-router-dom';

export const EditarProducto = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Obtener el producto a editar del state de Redux
    const producto = useSelector(state => state.productos.productoEditar);

    // Estado local para manejar los campos del formulario
    const [product, setProduct] = useState({
        nombre: '',
        precio: ''
    });

    // Cargar el producto en el estado local cuando se monta el componente
    useEffect(() => {
        if (producto) {
            setProduct(producto); // Actualizar el estado local con el producto a editar
        }
    }, [producto]);

    // Extraer los valores del producto
    const { nombre, precio } = product;

    // Función para manejar el envío del formulario
    const submitEditarFormulario = (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (nombre.trim() === '' || precio <= 0) {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Despachar la acción de editar el producto
        dispatch(editarProductoAction(product));

        // Redirigir después de guardar
        navigate('/');
    };

    // Función para manejar los cambios en el formulario
    const onChangeFormulario = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Editar Producto
                        </h2>
                        <form onSubmit={submitEditarFormulario} className='form-group'>
                            <div className='form-group'>
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text"
                                    className='form-control'
                                    placeholder='Nombre Producto'
                                    name='nombre'
                                    value={nombre}
                                    onChange={onChangeFormulario} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="">Precio Producto</label>
                                <input 
                                    type="number"
                                    className='form-control'
                                    placeholder='Precio Producto'
                                    name='precio'
                                    value={precio}
                                    onChange={onChangeFormulario} />
                            </div>
                            <button 
                                type='submit' 
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
