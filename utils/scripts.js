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

export function custoArray(distancia, caminhao) {//Aqui também vou ter problemas pq n consegui terminar de lidar com os qocientes e restos! Mas faz sentido...
    if (caminhao[2] > 1) {
        return distancia * 4.87 * caminhao[2];
    }
    else {
        if (caminhao[1] > 1){
            return distancia * 11.92 * caminhao[1];
        }
        else {
            return distancia * 27.44 * caminhao[0];
        }
    }
}

export function nCaminhao(peso) { // nao consegui ajustar de uma forma melhor q ifs percebi que acontecem alguns erros por exemplo 8 ton!
    let cG = 0, quoG = cG, cM = cG, quoM = cG, cP = cG, quoP = cG;
    cG = peso/10000
    quoG = cG - cG%1
    if (cG > 1) {
        cM = (peso-10000*quoG)/4000
        quoM = cM - cM%1
        if (cM > 1) {
            cP = (cM*4000-4000*quoM)/1000
            quoP = cP - cP%1
                if (cP > 1) {
                    return [cG,cM,cP+1]
                }
                else {
                    return [cG,cM,1]
                }
        } 
        if (cM == 1) {
            return [cG,cM,cP]
        }
        if (cM < 1) {
            cP = (cM*4000)/1000
            quoP = cP - cP%1
            if (cP > 1) {
                return [cG,cM,cP+1]
            }
            else {
                return [cG,cM,1]
            }
        }
    }
    if (cG == 1) {
        return [cG,cM,cP]
    }
    if (cG < 1) {
        cM = peso/4000
        quoM = cM - cM%1
        if (cM > 1) {
            cP = (cM*4000-4000*quoM)/1000
            quoP = cP - cP%1
                if (cP > 1) {
                    return [cG,cM,cP+1]
                }
                else {
                    return [cG,cM,1]
                }
        } 
        if (cM == 1) {
            return [cG,cM,cP]
        }
        if (cM < 1) {
            cP = (cM*4000)/1000
            quoP = cP - cP%1
            if (cP > 1) {
                return [cG,cM,cP+1]
            }
            else {
                return [cG,cM,1]
            }
        }
    }
}

export function formataData(value) {
    const a = value.toString();
    const b = a.replaceAll('/','')
    const c = b.replace(',','')
    const d = c.replaceAll(':','')
    return d.replace(/\s/g,'')
}