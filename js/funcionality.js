let buton = document.getElementById('buton');
let butonAgain = document.getElementById('butonAgain');

function showAlert(){

    Swal.fire({
        title: "Error",
        text: "Choose the Correct Date",
        imageUrl : "../assets/img/error_35.png",
        customClass:{
            confirmButton: 'my-custom-button'
        }
    });
}


buton.addEventListener('click', function(){

  let inputDate = document.getElementById("inputDate").value; // value es para que tome el valor del input
  let resultAgeDays = document.getElementById("resultAgeDays");
  let resultAge = document.getElementById("resultAge");
  /*
  Esto es en caso de Si estás obteniendo una fecha en otro formato y necesitas convertirla
  
  function parseDate(inputDate){
    
    let [month,day,year] = inputDate.split('/');
    return ${year}-${month}-${day};
  }
  
  let birthDate = new Date(parseDate(inputDate))
  ()*/

  if(!inputDate){
    showAlert();
    resultAge.innerHTML = "";
    resultAgeDays.innerHTML = "";
    return;
  }
    

  let birthDate = new Date(inputDate);
  let now = new Date();

  let year = now.getFullYear() - birthDate.getFullYear();
  let month = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  // Ajuste para meses negativos
  if (month < 0) {
    year--;
    month += 12;
  }

  // Ajuste para días negativos
  if (days < 0) {
    month--;
    let lastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Último día del mes anterior
    days += lastMonth.getDate();
  }

  // Mostrar la edad en años, meses y días
  resultAge.innerHTML = `Age : ${year}, Months : ${month}, Days : ${days}`;
  
  // Función de días vividos, excluyendo el día actual si la fecha es reciente
  function dayTotal(now, birthDate) {

    let birthDays = now - birthDate;
    // Restamos un día si la fecha es reciente para no contar el día actual
    return Math.floor(birthDays / (1000 * 60 * 60 * 24)) ;
  
  }

  let dayLived = dayTotal(now, birthDate);
  resultAgeDays.innerHTML = `Days Lived : ${dayLived}`;
  
  if(year >= 0) showGeneration(year);

})

// Parametro year en showGeneration(year): Ahora la función showGeneration recibe year como parámetro.
function showGeneration(year){

  let generation = {
    alpha   : {min : 0,  max:11,  title: "Generation Alpha",  text:"The current generation, born into a fully digitalized world, with immediate access to technology from a young age.",                          imageUrl : "../assets/img/GenerationAlpha.png"},
    z       : {min : 12, max:27,  title: "Generation Z",      text:"The first generation of digital natives, growing up with the internet and mobile devices, known for valuing diversity and social awareness",  imageUrl : "../assets/img/GenerationZ.png"},
    y       : {min : 28, max:43,  title: "Generation Y",      text:"Born in the digital and internet age, known for their tech skills and emphasis on work-life balance.",                                        imageUrl : "../assets/img/GenerationY.png"},
    x       : {min : 44, max:59,  title: "Generation X",      text:"Grew up during significant cultural changes and are known for being more skeptical and independent.",                                         imageUrl : "../assets/img/GenerationX.png"},
    boomers : {min : 60, max:78,  title: "Baby Boomers",      text:"Born during the economic boom following World War II, they are named after the 'Baby Boom' spike in birth rates after the war.",              imageUrl : "../assets/img/babyBoomers.png"},
    silent  : {min : 79, max:96,  title: "Silent Generation", text:"Lived through the Great Depression and World War II; known for traditional values and a strong work ethic.",                                  imageUrl : "../assets/img/silentGeneration.png"},
  }

  for (let gen in generation) {
    let {min, max, title, text, imageUrl} = generation[gen];
    
    if (year >= min && year <= max) {
      Swal.fire({
        title,
        text,
        imageUrl,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: title,
        customClass: { confirmButton: 'my-custom-button' }
      });    
      break;
    }
  }
}

butonAgain.addEventListener('click', function(){
  
  let inputDate = document.getElementById("inputDate").value; // value es para que tome el valor del input
  let resultAgeDays = document.getElementById("resultAgeDays");
  let resultAge = document.getElementById("resultAge");

  inputDate.value = "";
  resultAge.innerHTML = "";
  resultAgeDays.innerHTML = "";
})




