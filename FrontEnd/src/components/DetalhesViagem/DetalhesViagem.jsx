import React from 'react'

export  function DetalhesViagem({setDetalhesViagem}) {
  return (
    <div>DetalhesViagem
        <button onClick={()=> setDetalhesViagem(false)}>Voltar</button>
    </div>
  )
}
