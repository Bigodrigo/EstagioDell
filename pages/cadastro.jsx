import ProtectedRoute from "../components/ProtectedRoute";
import React, { useState } from "react";
import { db } from "../components/firebase"
import { doc, setDoc } from "firebase/firestore";
import Cid from "../utils/cidade.json"
import { tabela } from "../utils/tabelaDist"
import { custoArray, nCaminhao, formataData } from "../utils/scripts"

function Cadastro () {
    //percebi q os números com 0.x não mostram só 2 algorismos!
    //ia usar dentro dos inputs onChange para digitar, mas encontrei um problema, vou deixar assim por enquanto!
    //não vou conseguir deixar os trechos editáveis, como o exemplo onde são retirados x produtos e segue para a próx parada!
    //faltou refatorar tanto os componentes selecionáveis da home quanto as funções scripts! Muito código q pode ser mais clean
    const [cidades, setCidades] = useState([]);
    const [cidade, setCidade] = useState('');
    const [partida, setPartida] = useState('');
    const [destino, setDestino] = useState('');
    const [cidade1, setCidade1] = useState();
    const [cidade2, setCidade2] = useState();
    const [dist, setDist] = useState();
    const [caminhao, setCaminhao] = useState();
    const [celular, setCelular] = useState(0);
    const [geladeira, setGeladeira] = useState(0);
    const [freezer, setFreezer] = useState(0);
    const [cadeira, setCadeira] = useState(0);
    const [luminaria, setLuminaria] = useState(0);
    const [lavadora, setLavadora] = useState(0);
    const [pesoTotal, setPesoTotal] = useState(0);
    const [custoTotal, setCustoTotal] = useState(0); 

    const refresh = async () => {
        try {
            const partM = partida.toUpperCase()
            //console.log(partM)
            const destM = destino.toUpperCase()
            //console.log(destM)
            //caminhão por enquanto vou fazer só do menor para o maior, faltaria um ajuste aqui
            if (celular && geladeira && freezer && cadeira && luminaria && lavadora == 0) {
                console.log("Você não selecionou nenhum produto!")
            }
            else {
                let pT = celular * 0.5 + geladeira * 60 + freezer * 100 + cadeira * 5 + luminaria * 0.8 + lavadora * 100;
                //const pT = 1800;
                setPesoTotal(pT)
                //console.log(pesoTotal)
                //console.log(pT)
                const numC = nCaminhao(pT);
                setCaminhao(numC)
                //console.log(numC)
                Cid.map((item)=>{
                    if (item.nome == partM) {setCidade1(item._id);console.log(item._id)}
                  })
                  Cid.map((item)=>{
                    if (item.nome == destM) {setCidade2(item._id);console.log(item._id)}
                  })
                  //erro de undefined
                  const distancia = tabela(cidade1,cidade2);
                  setDist(distancia)
                  //console.log(distancia);
                  const final = custoArray(distancia,numC)
                  setCustoTotal(final)
                  //console.log(final)
                  console.log('De ',partM,' para ',destM,', utilizando ',numC[0],' caminhões de grande porte ',numC[1],' de médio e ',numC[2],' de pequeno porte, a distância é de ,',distancia,' km e o custo será de R$ ',final,'.')
            }

        } catch (erro) {
            console.log(erro)
          }
    }

    const onSubmit = async () => {
        try {
          if ( !partida || !destino  || !pesoTotal) {
            setErro('Por favor preencha todos os campos')
          } 
          else {//alterar documento!
            const cidadeObj = { 
              partida: partida,
              destino: destino,
              celular: celular,
              geladeira: geladeira,
              freezer: freezer,
              cadeira: cadeira,
              luminaria: luminaria,
              lavadora: lavadora,
              pesoTotal: pesoTotal,
              custoTotal: custoTotal,
              frotaCaminhao: caminhao,
              distancia: dist,
              enviadoEm: new Date().toLocaleString(),
            };
            const docRef = doc(db,'Dell',formataData(cidadeObj.enviadoEm))//.withConverter(taskConverter)
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
        <ProtectedRoute>
            <p>Para cadastrar uma simulação preencha os campos clique em atualizar e então CADASTRAR!</p>        
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 ">
                                Campos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Informações
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Distancia (km) ou Peso (kg)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Cidade Partida
                            </th>
                            <td className="px-6 py-4">
                                <input value={partida} onChange={e => setPartida(e.target.value)}/>
                            </td>
                            <td className="px-6 py-4">
                                0.00 km
                            </td>
                        </tr>
                        {cidades.length !== 0 ? ( //componente para criar vários trechos
                         <>
                            {cidades.map((item,index)=>{
                                <div key={item.index}>
                                    <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="inline-flex place-items-center">
                                            <p>Parada Intermediária</p>
                                            <button onClick={()=>setCidades(celular-1)}>-</button>
                                            <button onClick={()=>{cidades.push(cidade);console.log(cidade,'sing');console.log(cidades,'plu')}}>+</button>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <input value={cidade} onChange={e => setCidade(e.target.value)}/>
                                    </td>
                                    <td className="px-6 py-4">
                                        Alterar
                                    </td>
                                    </tr>
                                </div>
                            })}
                         </>   
                        ) : (
                            <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="inline-flex place-items-center">
                                    <p>Parada Intermediária</p>
                                    <button onClick={()=>setCidades(celular-1)}>-</button>
                                    <button onClick={()=>{cidades.push(cidade);console.log(cidade,'sing');console.log(cidades,'plu')}}>+</button>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <input value={cidade} onChange={e => setCidade(e.target.value)}/>
                            </td>
                            <td className="px-6 py-4">
                                Alterar
                            </td>
                            </tr>
                        )}
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Cidade Destino
                            </th>
                            <td className="px-6 py-4">
                                <input value={destino} onChange={e => setDestino(e.target.value)}/>
                            </td>
                            <td className="px-6 py-4">
                                Alterar
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Celular
                            </th>
                            <td className="px-6 py-4">
                                <div className="inline-flex place-items-center">
                                    <button onClick={()=>setCelular(celular-1)}>-</button>
                                    <input placeholder={celular} className="w-10 text-center"></input>
                                    <button onClick={()=>setCelular(celular+1)}>+</button>
                                    <p>unidades</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="inline-flex place-items-center">
                                    <p>{celular * 0.5}</p>
                                    <p> kg</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Geladeira
                            </th>
                            <td className="px-6 py-4">
                                <div className="inline-flex place-items-center">
                                <button onClick={()=>setGeladeira(geladeira-1)}>-</button>
                                    <input placeholder={geladeira} className="w-10 text-center"></input>
                                    <button onClick={()=>setGeladeira(geladeira+1)}>+</button>
                                    <p>unidades</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="inline-flex place-items-center">
                                    <p>{geladeira * 60}</p>
                                    <p> kg</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Freezer
                            </th>
                            <td className="px-6 py-4">
                                <div className="inline-flex place-items-center">
                                <button onClick={()=>setFreezer(freezer-1)}>-</button>
                                    <input placeholder={freezer} className="w-10 text-center"></input>
                                    <button onClick={()=>setFreezer(freezer+1)}>+</button>
                                    <p>unidades</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="inline-flex place-items-center">
                                    <p>{freezer * 100}</p>
                                    <p> kg</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Cadeira
                            </th>
                            <td className="px-6 py-4">
                                <div className="inline-flex place-items-center">
                                <button onClick={()=>setCadeira(cadeira-1)}>-</button>
                                    <input placeholder={cadeira} className="w-10 text-center"></input>
                                    <button onClick={()=>setCadeira(cadeira+1)}>+</button>
                                    <p>unidades</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="inline-flex place-items-center">
                                    <p>{cadeira * 5}</p>
                                    <p> kg</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Luminária
                            </th>
                            <td className="px-6 py-4">
                                <div className="inline-flex place-items-center">
                                <button onClick={()=>setLuminaria(luminaria-1)}>-</button>
                                    <input placeholder={luminaria} className="w-10 text-center"></input>
                                    <button onClick={()=>setLuminaria(luminaria+1)}>+</button>
                                    <p>unidades</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="inline-flex place-items-center">
                                    <p>{luminaria * 0.8}</p>
                                    <p> kg</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Lavadora de Roupa
                            </th>
                            <td className="px-6 py-4">
                                <div className="inline-flex place-items-center">
                                <button onClick={()=>setLavadora(lavadora-1)}>-</button>
                                    <input placeholder={lavadora} className="w-10 text-center"></input>
                                    <button onClick={()=>setLavadora(lavadora+1)}>+</button>
                                    <p>unidades</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="inline-flex place-items-center">
                                    <p>{lavadora * 100}</p>
                                    <p> kg</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot className="bg-white dark:bg-gray-700">
                        <tr className="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" className="px-6 py-3 text-base">Total</th>
                            <td className="px-6 py-3"><button onClick={() => refresh()}>Atualizar</button></td>
                            <td className="px-6 py-3">{custoTotal}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="flex justify-center pt-8">
                    <button
                    type="button"
                    onClick={() => onSubmit()}
                    className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}>

                      <p className="capitalize text-white font-normal">CADASTRAR</p>
                    </button>
                </div>
            </div>
        </ProtectedRoute>
  );
};

export default Cadastro;