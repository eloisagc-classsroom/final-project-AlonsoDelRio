import { useState } from "react"

const ConfigActual = ({config}) => {
    const lastConfig = config[config.length - 1]
    return (
        <div className="md:w-1/2 lg:w-3/5 mt-10">
            <h2 className="font-black text-emerald-800 text-2xl text-center">Datos Actuales</h2>

            <div className="m-3 bg-amber-300 shadow-lg px-5 py-10 rounded-lg">
                <p className="font-bold text-emerald-600 text-xl">% Humedad Relativa: {' '}
                    <span className="font-black">{lastConfig.humedadRelativa}</span>
                </p>
                <p className="font-bold text-emerald-600 text-xl">% Humedad en tierra: {' '}
                    <span className="font-black">{lastConfig.humedadTierra}</span>
                </p>
                <p className="font-bold text-emerald-600 text-xl">% Luz: {' '}
                    <span className="font-black">{lastConfig.luz}</span>
                </p>
                <p className="font-bold text-emerald-600 text-xl">Bomba Activa: {' '}
                    <span className="font-black">{lastConfig.bomba}</span>
                </p>
            </div>
        </div>
    )
}