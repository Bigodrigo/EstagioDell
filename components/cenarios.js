import React, { useState } from "react";
import { useCon } from "./context/Context";

const Cenarios = () => {
  const [show, setShow] = useState(false)
    return (
      <div>
        <p>Cenário 1: A empresa TikStop deseja transportar o total de 300 celulares, 50
            geladeiras, 70 freezers e 2000 luminárias. O transporte deverá partir da cidade
            de Porto Alegre, com parada em Florianópolis onde serão descarregados 25
            geladeiras, 50 freezers e 100 celulares. O restante da carga seguirá até a
            cidade de Curitiba.
        </p>
        <p>Cenário 2: A empresa LeMour deseja transportar o total de 500 celulares, 100
            geladeiras, 200 freezers, 98 cadeiras. O transporte deverá partir da cidade de
            Maceió, com parada em Goiânia onde serão descarregados 90 geladeiras, 200
            freezers e 20 celulares. O restante da carga seguirá até São Paulo.
        </p>
      </div>
    )
  }

export default Cenarios;