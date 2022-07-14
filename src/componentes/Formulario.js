import React, {Fragment,useState} from 'react';
import { calcularTotal } from '../helpers';


const Formulario = ({cantidad, guardarCantidad, plazo, guardarPlazo,total, guardarTotal, guardarCargando}) => {

    //definir state
    const [error, guardarError] = useState(false);

    const leerCantidad = (e) => {
       guardarCantidad(parseInt(e.target.value));
    }

    const CalcularPrestamo = (e) => {
        e.preventDefault();
        
        //validar
        if(cantidad === 0 || plazo === ''){
            guardarError(true);
            return;
        }

        //eleminar el error
        guardarError(false);

        //habilitar sppiner
        guardarCargando(true)

        setTimeout(() => {
            //Cotizacion
            const total = calcularTotal(cantidad,plazo);
            guardarTotal(total);

            //deshabilitar el spinner
            guardarCargando(false)
        },3000)

        
    }

    return ( 
        <Fragment>
            <form onSubmit={ CalcularPrestamo }>
                <div className="row">
                    <div>
                        <label>Cantidad Prestamos</label>
                        <input
                            className="u-full-width"
                            type="number"
                            placeholder="Ejemplo 3000"
                            onChange={leerCantidad}
                        />
                    </div>
                    <div>
                        <label>Plazo para Pagar</label>
                        <select 
                            className="u-full-width"
                            onChange = { e => guardarPlazo (parseInt(e.target.value))}
                        >
                            <option value="">Seleccionar</option>
                            <option value="3">3</option>
                            <option value="6">6</option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Calcular" className="button-primary u-full-width"></input>
                    </div>
                </div>
            </form>

            { (error) ? <p className="error">Todos los campos son obligatorios</p> : null }
            
        </Fragment>
       
     );
}
 
export default Formulario;