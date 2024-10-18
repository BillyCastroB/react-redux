import React from 'react'
import { Link }  from 'react-router-dom';
export const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-beetwen'>
        <div className='container'>
            <h1 className=''>
                <Link to={'/'} className='text-light'>
                    React - Redux - Rest API - Axios
                </Link>
            </h1>
        </div>
        <Link className='btn btn-danger nuevo-post d-block d-md-inline-block' to={"/productos/nuevo"}>Agregar Producto</Link>
    </nav>
  )
}
