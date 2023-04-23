const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const FLUMAN1 = document.getElementById('fluMan1');
const FLUMAN2 = document.getElementById('fluMan2');
CALCULAR.addEventListener('click', () => {
  const DATO = document.getElementById('peso').value
  //validamos que se cargue un dato:
  if (DATO > 0) {
    ERROR.style.display = 'none';
    if(DATO <= 30){
      let flujo = calcFlujo1(DATO).toFixed(2);
      let mantenimiento = (flujo * 1.5).toFixed(2);
      FLU.innerHTML = flujo + ' cc/hr';
      MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
      FLU.style.display = 'block';
      MAN.style.display = 'block';
    }else{
      let flujos = calcFlujo2(DATO).map(f => f.toFixed(2));
      let mantenimientos = flujos.map(f => {return (f * 1.5).toFixed(2)});
      FLUMAN1.innerHTML = `Opcion 1: ${flujos[0]}cc/h   m+m/2 : ${mantenimientos[0]}cc/h`;
      FLUMAN2.innerHTML = `Opcion 2: ${flujos[1]}cc/h   m+m/2 : ${mantenimientos[1]}cc/h`
      FLUMAN1.style.display = 'block';
      FLUMAN2.style.display = 'block';
    }
  } else {
    ERROR.style.display = 'block';
    FLU.style.display = 'none';
    MAN.style.display = 'none';
  }
})

function calcFlujo1(peso) {//Método Holliday-Segar: Para pesos menores o iguales a 30
  let hBasal = peso <= 10 ? 100 * peso :
               peso <= 20 ? 100*10 + 50*(peso - 10):
                            100 * 10 + 50 * 10 + (peso - 20) * 20;
  return hBasal/24; //Retornamos el flujo
}

function calcFlujo2(peso) {//Método de superficie corporal
  let supCorporal = ((peso*4)+7)/(peso*90);
  return [supCorporal*1500/24, supCorporal*2000/24];
}
