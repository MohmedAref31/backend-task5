let form = document.getElementById("form");
let inp = document.getElementById("inp");
let dataShow= document.querySelectorAll(".show p");

console.log(dataShow)

form.addEventListener("submit",(e)=>{
    e.preventDefault()
 
    if(inp.value !== ''){

        new Promise((resolve, reject) => {
            fetch("http://localhost:3000/weatherApi?location=" + inp.value)
                .then(res=>res.json())
                .then(data=>resolve(data))
                .catch((e)=>reject(e))
        }).then((data)=>{
            console.log(data)
            dataShow[3].innerHTML = ''
                dataShow[0].innerHTML = '';
                dataShow[1].innerHTML = '';
                dataShow[2].innerHTML = '';
            if(data.error){
                dataShow[3].innerHTML = data.error
                
            }else{
                
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        dataShow[0].innerHTML= data.country;
                        resolve()
                    }, 0);
                }).then(()=>{
                    setTimeout(() => {
                        dataShow[1].innerHTML= data.location[0]+" , "+ data.location[1];
                    }, 500);
                }).then(()=>{
                    setTimeout(() => {
                        dataShow[2].innerHTML= data.temp+" "+ data.text;
                    }, 1000);
                })
            }
        }).catch(e=>console.log(e))

        inp.value=''
    }
})



