import React, { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../components/firebase"
import { doc, setDoc } from "firebase/firestore";

const Cadastro = () => {
  const [cidades, setCidades] = useState([]);
  const [partida, setPartida] = useState('');
  const [destino, setDestino] = useState('');
  const [produtos, setProdutos] = useState('');
  const [pesoTotal, setPesoTotal] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');
  // const [cargo, setCargo] = useState('Cargo');
  // const [aberto, setAberto] = useState(false);
  const [erro, setErro] = useState('');

  // const router = useRouter();

  // const Abertura = () => {
  //   if (aberto == true) {
  //     setAberto(false)
  //   } else {
  //     setAberto(true)
  //   }
  // }
  // const definiçãoCargo = (C) => {
  //   setAberto(false)
  //   setCargo(C)
  // }
  const onSubmit = async () => {
    try {
      if (!cidades || !partida || !destino ||  !produtos || !pesoTotal) {
        setErro('Por favor preencha todos os campos')
      } 
      else {
        const cidadeObj = { 
          partida: partida,
          destino: destino,
          produtos: produtos,
          pesoTotal: pesoTotal,
        };
        const docRef = doc(db,'Dell','' + partida + ' - ' + destino)//.withConverter(taskConverter)
        await setDoc(docRef, cidadeObj) //sobrescreve!! {[taskObject.content]:taskObject},{merge:true} //,[taskObject.content]),taskObject
          .then(() => {
            setCidades([cidadeObj, ...cidades]);
            console.log(cidades)
          });
      }
    } catch (erro) {
      console.log(erro)
    }
  }

  return (
    <div className="p-4">
      <div className="sign-up-form container  mx-auto w-96 s  border-2  border-gray-400">
        <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">Cadastro</h2>
        <form action="" className="w-80 mx-auto pb-12 px-4">
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
              Partida
              </label>
            </div>

            <input
              value={partida}
              onChange={e => setPartida(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />

          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
              Destino
              </label>
            </div>

            <input
              value={destino}
              onChange={e => setDestino(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />

          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Lista de Produtos
              </label>
            </div>

            <input
              value={produtos}
              onChange={e => setProdutos(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
              Peso Total das mercadorias
              </label>
            </div>

            <input
              value={pesoTotal}
              onChange={e => setPesoTotal(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />

          </div>


          {
            erro == '' ? "" : <div className="w-full bg-red-600 rounded-md  p-4 mt-3 opacity-80">
              <p className="text-white">{erro}</p>
            </div>
          }


          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={() => onSubmit()}
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >

              <p className="capitalize text-white font-normal">Enviar</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;