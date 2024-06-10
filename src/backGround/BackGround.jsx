import React from 'react'

const BackGround = () => {
    return (
        <div style={
            {
                backgroundImage: 'url(../../../public/bg.jpg)', // URL de la imagen de fondo
                backgroundSize: 'cover', // Ajusta la imagen para que cubra todo el contenedor
                backgroundPosition: 'fixed', // Centra la imagen
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
            }}> </div >
    )
}

export default BackGround