export function custo(distancia, caminhao) {
    if (caminhao == 'PEQUENO') {
        return distancia * 4.87;
    }
    else {
        if (caminhao == "MÉDIO"){
            return distancia * 11.92;
        }
        else {
            return distancia * 27.44;
        }
    }
}