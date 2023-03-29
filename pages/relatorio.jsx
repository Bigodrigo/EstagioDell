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
          <h2 className="text-2xl font-semibold">Relatório dos Cadastros!</h2>
          <ul>
          {cidades.map((cidade) => 
              (<li key={cidade.pesoTotal} className="text-center p-2">
                <p>{cidade.partida}</p>
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
        produtos: r.produtos,
        pesoTotal: r.pesoTotal,
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