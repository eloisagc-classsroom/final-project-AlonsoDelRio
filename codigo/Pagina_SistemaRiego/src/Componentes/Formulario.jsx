import { useState } from "react";
import Error from "./Error";

const Formulario = ({config, setConfig}) => {

    //Variables del formulario
    const [humedadRelativa, setHumedadRelativa] = useState('');
    const [humedadTierra, setHumedadTierra] = useState('');
    const [luz, setLuz] = useState('');
    const [bomba, setBomba] = useState('');
    

    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        //Validacion de Formulario
        if([ humedadRelativa, humedadTierra, luz, bomba].includes('')){
            console.log('Hay almenos un campo vacio')
            setError(true)
            return;
        }

        setError(false)

        //Creamos un objeto de config
        const configuracion = {
            humedadRelativa,
            humedadTierra,
            luz,
            bomba,
        }

        //Guardamos el registro
        setConfig([...config, configuracion])

        //Reiniciar Formulario
        setHumedadRelativa('')
        setHumedadTierra('')
        setLuz('')
        setBomba('')
    }
    
    return(
        <div className="md:w-1/2 lg:w-2/5 mt-10">
            <h2 className="font-black text-emerald-800 text-2xl text-center"> Configuracion del sistema de riego</h2>

            <form onSubmit={handleSubmit} className="bg-amber-300 shadow-md rounded-lg py-10 px-5 mb-10 m-3">
                {error && <Error><p>Todos los campos son obligatorios</p></Error>}
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold">Porcentaje Humedad</label>
                    <input 
                        id="humedadRelativa"
                        type = "text"
                        placeholder="Humedad"
                        value={humedadRelativa}
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        onChange={(e) => setHumedadRelativa(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold">Humedad en tierra</label>
                    <input 
                        id="humedadTierra"
                        type = "text"
                        placeholder="Porcentaje de humedad en tierra"
                        value={humedadTierra}
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        onChange={(e) => setHumedadTierra(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold">Porcentaje de Luz</label>
                    <input 
                        id="luz"
                        type = "text"
                        placeholder="Porcentaje de Luz"
                        value={luz}
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        onChange={(e) => setLuz(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold">Bomba Activa</label>
                    <input 
                        id="bomba"
                        type = "text"
                        placeholder="Activar/Desactivar"
                        value={bomba}
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        onChange={(e) => setBomba(e.target.value)}
                    />
                </div>
                
                <input 
                    type="submit"
                    className="bg-emerald-600 w-full p-3 text-white uppercase font-bold rounded-md 
                    hover:bg-emerald-700 cursor-pointer transition-all"
                />
            </form>
        </div>
    )
}

export default Formulario;