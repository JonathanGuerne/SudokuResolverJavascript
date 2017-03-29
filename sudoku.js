function tableCreate() {
    let taille= (window.innerHeight-300)/9;
    let body = document.getElementsByTagName('body')[0];
    let tbl = document.createElement('table');
    tbl.style.fontFamily = 'Courier';
    tbl.style.fontSize = taille-5 + "px";
    tbl.style.textAlign = 'center';

    tbl.style.borderCollapse='collapse';
    tbl.setAttribute('border', '1');
    let tbdy = document.createElement('tbody');
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let td = document.createElement('td');
            td.style.width = taille + "px";
            td.style.height = taille + "px";
            td.style.maxWidth = taille + "px";
            td.style.maxHeight = taille + "px";

            td.style.padding="0px";
            td.style.margin="0px";
            if(i%3==0){
                td.style.borderTop="3px solid black";
            }
            if(i%3==2){
                td.style.borderBottom="3px solid black";
            }
            if(j%3==0){
                td.style.borderLeft="3px solid black";
            }
            if(j%3==2){
                td.style.borderRight="3px solid black";
            }
            //td.appendChild(document.createTextNode('\u0020'))
            tr.appendChild(td)

            let div = document.createElement('div');
            div.setAttribute('contenteditable','true');

            div.style.width = taille + "px";
            div.style.height = taille + "px";
            div.style.maxWidth = taille + "px";
            div.style.maxHeight = taille + "px";
            div.setAttribute('id',i+'-'+j);
            div.style.padding="0px";
            div.style.margin="0px";
            //div.innerText="-";
            td.appendChild(div);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}

async function resolveSudoku(){
    //Premier remplissage
    verificationLigneColonneGroupe();

    let nbZero=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let value = document.getElementById(i+'-'+j).innerText;
            if(value==0){nbZero++;}
        }
    }


    document.getElementById("erreur").innerText="Fin";
    console.log("Fin");
}

function verificationLigneColonneGroupe(){
    let changement=true;

    //Récupère le nombre de case vide
    while(changement){
        changement=false;
        console.log("New cycle");
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let value = document.getElementById(i+'-'+j).innerText;
                if(!Number(value) || value==0){
                    let possibilite=[];
                    let nombrePossibilite=0;
                    let valeurSiSeulPossible=0;

                    for(let k=0;k<=9;k++){
                        possibilite[k]=0;
                    }

                    //Regarde les possibilites sur la ligne
                    for(let ligne=0;ligne<9;ligne++){
                        let valueTest = document.getElementById(ligne+'-'+j).innerText;
                        if(Number(valueTest) && valueTest!=0){
                            possibilite[valueTest]++;
                        }
                    }

                    //Regarde les possibilités sur la colonne
                    for(let colonne=0;colonne<9;colonne++){
                        let valueTest = document.getElementById(i+'-'+colonne).innerText;
                        if(Number(valueTest) && valueTest!=0){
                            possibilite[valueTest]++;
                        }
                    }

                    //Regarde les possibilites dans le meme groupe
                    let groupeLigne=parseInt(i/3);
                    let groupeColonne=parseInt(j/3);
                    for(let ligne = 3*groupeLigne; ligne < 3*groupeLigne+3; ligne++){
                        for (let colonne = 3*groupeColonne; colonne < 3*groupeColonne+3; colonne++) {
                            let valueTest = document.getElementById(ligne+'-'+colonne).innerText;
                            if(Number(valueTest) && valueTest!=0){
                                possibilite[valueTest]++;
                            }
                        }
                    }

                    for(let k=1; k<=9; k++)
                    {
                        if(possibilite[k]==0){
                            nombrePossibilite++;
                            valeurSiSeulPossible=k;
                        }
                    }
                    if(nombrePossibilite==1){
                        document.getElementById(i+'-'+j).innerText=valeurSiSeulPossible;
                        changement=true;
                        console.log(possibilite);
                        //await sleep(2000);
                        console.log("Suite...");
                    }
                }
            }
        }
    }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
