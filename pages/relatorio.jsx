//Esta página é um teste/exemplo, ao se conectar pela página de login, vc tem acesso a todos os usuários do banco!
import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { collection, getDocs, query, collectionGroup } from "firebase/firestore";
import { db } from "../components/firebase"

function Relatorio ({cidades}) {
  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto">
        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-bold">Relatório dos Cadastros!</h2>
          <ul>
          {cidades.map((cidade) => 
              (<li key={cidade.id} className="text-center p-2">
                <h2>{cidade.partida} - {cidade.destino}</h2>
                <h3 className="text-2xl font-semibold">Produtos:</h3>
                  <ul>
                    <li>Celular: {cidade.celular}</li>
                    <li>Geladeira: {cidade.geladeira}</li>
                    <li>Freezer: {cidade.freezer}</li>   
                    <li>Cadeira: {cidade.cadeira}</li>   
                    <li>Luminaria: {cidade.luminaria}</li>   
                    <li>Lavadora: {cidade.lavadora}</li>       
                  </ul>
                  <h3 className="text-2xl font-semibold">Custos:</h3>
                  <ul>
                    <li>Total: {cidade.custoTotal}</li>
                    <li>Quantos produtos: ({cidade.celular}+{cidade.geladeira}+{cidade.freezer}+{cidade.cadeira}+{cidade.luminaria}+{cidade.lavadora})</li>
                    <li>Distancia total: {cidade.distancia}</li>     
                  </ul>  
                </li>)
          )}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export async function getStaticProps() {
  const q = query(collectionGroup(db,'Dell'));
  const querySnapshot = await getDocs(q);
  const cidades = [];
  querySnapshot.forEach((doc) => {
      let r = doc.data()
      const cidadeObj = { 
        partida: r.partida,
        destino: r.destino,
        celular: r.celular,
        geladeira: r.geladeira,
        freezer: r.freezer,
        cadeira: r.cadeira,
        luminaria: r.luminaria,
        lavadora: r.lavadora,
        pesoTotal: r.pesoTotal,
        custoTotal: r.custoTotal,
        frotaCaminhao: r.frotaCaminhao,
        distancia: r.distancia,
        enviadoEm: r.enviadoEm,
        id: doc.id,
      };
      cidades.push(cidadeObj);
  });
  
  return {
    props: {
      cidades,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

export default Relatorio;