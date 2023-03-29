import React, { useState } from "react";
import { useAuth } from "./context/Context";
import { FormProvider, useForm } from "react-hook-form";
import { formataCartao } from "../utils/scripts";
import { Button, Dropdown } from 'flowbite-react';
import Cid from "../utils/cidade.json"
import { tabela } from "../utils/tabelaDist"
import { custo } from "../utils/scripts"

//Minha ideia original era utilizar Cid.map mas não consegui!
//Adicionar um Alert!
const Cidade = () => {
  const [partida, setPartida] = useState('Cidade');
  const [destino, setDestino] = useState('Cidade');
  const [caminhao, setCaminhao] = useState('Caminhão');
  const [abertoP, setAbertoP] = useState(false);
  const [abertoD, setAbertoD] = useState(false);
  const [abertoC, setAbertoC] = useState(false);
  const [cidade1, setCidade1] = useState();
  const [cidade2, setCidade2] = useState();
  const [result, setResult] = useState();

  const AberturaP = () => {
    if (abertoP == true) {
      setAbertoP(false)
    } else {
      setAbertoP(true)
    }
  }
  const AberturaD = () => {
    if (abertoD == true) {
      setAbertoD(false)
    } else {
      setAbertoD(true)
    }
  }
  const AberturaC = () => {
    if (abertoC == true) {
      setAbertoC(false)
    } else {
      setAbertoC(true)
    }
  }
  const definiçãoPartida = (C) => {
    setAbertoP(false)
    setPartida(C)
  }
  const definiçãoDestino = (C) => {
    setAbertoD(false)
    setDestino(C)
  }
  const definiçãoCaminhao = (C) => {
    setAbertoC(false)
    setCaminhao(C)
  }
  const onSubmit = async () => {
    if(partida == destino){
      console.log("Você escolheu a mesma cidade! Por favor escolha novamente!")
    }
    else {
      try{Cid.map((item)=>{
        if (item.nome == partida) {setCidade1(item._id);console.log(item._id)}
      })
      Cid.map((item)=>{
        if (item.nome == destino) {setCidade2(item._id);console.log(item._id)}
      })
      //erro de undefined
      const distancia = tabela(cidade1,cidade2);
      console.log(distancia);
      const final = custo(distancia,caminhao)
      console.log(final)
      console.log('De ',partida,' para ',destino,', utilizando um caminhão de ',caminhao,' porte, a distância é de ,',distancia,' km e o custo será de R$ ',final,'.')
    }
    catch {
      if (undefined) { setError(true)}
    }
    }
  }
    return (
      <>
        <form action="" className="rounded-md shadow-sm block mx-4 justify-between items-center max-w-screen-xl px-4 md:px-6 py-2.5 my-4"  role="group">
          <div className="inline-flex w-full ">
            <div className="block mb-2 mx-4">
              <button type="button" onClick={AberturaP} className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 mx-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                {partida}
                <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {abertoP == true ?
                <div className="flex z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1 text-center w-full justify-center" role="none">
                    <button type="button" onClick={e => definiçãoPartida("ARACAJU")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">ARACAJU</button>
                    <button type="button" onClick={e => definiçãoPartida("BELEM")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">BELEM</button>
                    <button type="button" onClick={e => definiçãoPartida("BELO HORIZONTE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">BELO HORIZONTE</button>
                    <button type="button" onClick={e => definiçãoPartida("BRASILIA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">BRASILIA</button>
                    <button type="button" onClick={e => definiçãoPartida("CAMPO GRANDE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">CAMPO GRANDE</button>
                    <button type="button" onClick={e => definiçãoPartida("CUIABA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">CUIABA</button>
                    <button type="button" onClick={e => definiçãoPartida("CURITIBA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">CURITIBA</button>
                    <button type="button" onClick={e => definiçãoPartida("FLORIANOPOLIS")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">FLORIANOPOLIS</button>
                    <button type="button" onClick={e => definiçãoPartida("FORTALEZA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">FORTALEZA</button>
                    <button type="button" onClick={e => definiçãoPartida("GOIANIA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">GOIANIA</button>
                    <button type="button" onClick={e => definiçãoPartida("JOAO PESSOA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">JOAO PESSOA</button>
                    <button type="button" onClick={e => definiçãoPartida("MACEIO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">MACEIO</button>
                    <button type="button" onClick={e => definiçãoPartida("MANAUS")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">MANAUS</button>
                    <button type="button" onClick={e => definiçãoPartida("NATAL")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">NATAL</button>
                    <button type="button" onClick={e => definiçãoPartida("PORTO ALEGRE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">PORTO ALEGRE</button>
                    <button type="button" onClick={e => definiçãoPartida("PORTO VELHO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">PORTO VELHO</button>
                    <button type="button" onClick={e => definiçãoPartida("RECIFE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">RECIFE</button>
                    <button type="button" onClick={e => definiçãoPartida("RIO BRANCO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">RIO BRANCO</button>
                    <button type="button" onClick={e => definiçãoPartida("RIO DE JANEIRO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">RIO DE JANEIRO</button>
                    <button type="button" onClick={e => definiçãoPartida("SALVADOR")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">SALVADOR</button>
                    <button type="button" onClick={e => definiçãoPartida("SAO LUIS")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">SAO LUIS</button>
                    <button type="button" onClick={e => definiçãoPartida("SAO PAULO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">SAO PAULO</button>
                    <button type="button" onClick={e => definiçãoPartida("TERESINA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">TERESINA</button>
                    <button type="button" onClick={e => definiçãoPartida("VITORIA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">VITORIA</button>
                  </div>
                </div> : ''}
            </div>
            <div className="block mb-2 mx-4">
              <button type="button" onClick={AberturaD} className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 mx-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {destino}
                <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {abertoD == true ?
                <div className="flex z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1 text-center w-full justify-center" role="none">
                    <button type="button" onClick={e => definiçãoDestino("ARACAJU")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">ARACAJU</button>
                    <button type="button" onClick={e => definiçãoDestino("BELEM")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">BELEM</button>
                    <button type="button" onClick={e => definiçãoDestino("BELO HORIZONTE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">BELO HORIZONTE</button>                    <button type="button" onClick={e => definiçãoDestino("BRASILIA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">BRASILIA</button>
                    <button type="button" onClick={e => definiçãoDestino("CAMPO GRANDE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">CAMPO GRANDE</button>
                    <button type="button" onClick={e => definiçãoDestino("CUIABA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">CUIABA</button>
                    <button type="button" onClick={e => definiçãoDestino("CURITIBA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">CURITIBA</button>
                    <button type="button" onClick={e => definiçãoDestino("FLORIANOPOLIS")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">FLORIANOPOLIS</button>
                    <button type="button" onClick={e => definiçãoDestino("FORTALEZA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">FORTALEZA</button>
                    <button type="button" onClick={e => definiçãoDestino("GOIANIA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">GOIANIA</button>
                    <button type="button" onClick={e => definiçãoDestino("JOAO PESSOA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">JOAO PESSOA</button>
                    <button type="button" onClick={e => definiçãoDestino("MACEIO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">MACEIO</button>
                    <button type="button" onClick={e => definiçãoDestino("MANAUS")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">MANAUS</button>
                    <button type="button" onClick={e => definiçãoDestino("NATAL")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">NATAL</button>
                    <button type="button" onClick={e => definiçãoDestino("PORTO ALEGRE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">PORTO ALEGRE</button>
                    <button type="button" onClick={e => definiçãoDestino("PORTO VELHO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">PORTO VELHO</button>
                    <button type="button" onClick={e => definiçãoDestino("RECIFE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">RECIFE</button>
                    <button type="button" onClick={e => definiçãoDestino("RIO BRANCO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">RIO BRANCO</button>
                    <button type="button" onClick={e => definiçãoDestino("RIO DE JANEIRO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">RIO DE JANEIRO</button>
                    <button type="button" onClick={e => definiçãoDestino("SALVADOR")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">SALVADOR</button>
                    <button type="button" onClick={e => definiçãoDestino("SAO LUIS")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">SAO LUIS</button>
                    <button type="button" onClick={e => definiçãoDestino("SAO PAULO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">SAO PAULO</button>
                    <button type="button" onClick={e => definiçãoDestino("TERESINA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">TERESINA</button>
                    <button type="button" onClick={e => definiçãoDestino("VITORIA")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">VITORIA</button>
                    </div>
                </div> : ''}
            </div>
            <div className="block mb-2 mx-4">
              <button type="button" onClick={AberturaC} className="inline-flex w-full  justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {caminhao}
                <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {abertoC == true ?
                <div className="flex z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1 text-center w-full justify-center" role="none">
                    <button type="button" onClick={e => definiçãoCaminhao("PEQUENO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">PEQUENO</button>
                    <button type="button" onClick={e => definiçãoCaminhao("MÉDIO")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">MÉDIO</button>
                    <button type="button" onClick={e => definiçãoCaminhao("GRANDE")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">GRANDE</button>
                    </div>
                </div> : ''}
            </div>
          </div>
          <button type="button" onClick={() => onSubmit()} className="flex h-12 text-center w-full justify-center  bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition">
            <p className="capitalize text-white font-normal">Calcular</p>
          </button>
        </form>
      </>
    )
  }

export default Cidade;