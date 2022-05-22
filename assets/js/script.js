// let rightBtn = document.querySelector(".right")
// let leftBtn = document.querySelector(".left");
// let images = document.querySelector(".images");

// rightBtn.addEventListener("click",function(){
//    let active = document.querySelector(".active");
//     active.classList.remove("active");
//     if(active.nextElementSibling!=null){
//         active.nextElementSibling.classList.add("active");
//     }else{
//         images.firstElementChild.classList.add("active")
//     }
// })

// leftBtn.addEventListener("click",function(){
//     let active = document.querySelector(".active");
//      active.classList.remove("active");
//      if(active.previousElementSibling !=null){
//          active.previousElementSibling.classList.add("active");
//      }else{
//          images.lastElementChild.classList.add("active")
//      }
// })


let allAddBtn= document.querySelectorAll(".button")

if(localStorage.getItem("basket")==null){
    localStorage.setItem("basket", JSON.stringify([]))
}

allAddBtn.forEach(btn=>{
    btn.addEventListener("click", function(e){
        e.preventDefault();
        let Id=btn.parentElement.parentElement.getAttribute("data-id");
        let Name=btn.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        let Image= btn.parentElement.previousElementSibling.getAttribute("src");


        if(localStorage.getItem("basket")==null){
            localStorage.setItem("basket", JSON.stringify([]))
        }

        let basket=JSON.parse(localStorage.getItem("basket"));

        let existMehsul=basket.find(p=>p.id==Id);

        if(existMehsul===undefined){
            basket.push({
                id:Id,
                count:1,
                name:Name,
                image:Image,
            })
        }
        else{
            existMehsul.count++;
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        getBasketCount();

    })
});
let basketcount = document.querySelector(".basketcount");
function getBasketCount(){
    if(localStorage.getItem("basket")!=null){
        let basket = JSON.parse(localStorage.getItem("basket"));
        basketcount.innerText=basket.length;
    }
}
getBasketCount();

let table = document.querySelector(".table");
let basket = JSON.parse(localStorage.getItem("basket"));

if(basket.length !=0){
    for (const mehsul of basket) {
        let tr= document.createElement("tr");
        let tdImg=document.createElement("td");

        let img= document.createElement("img");
        img.setAttribute("src",mehsul.image);
        img.setAttribute("width","150px");
        tdImg.append(img);


        let tdName=document.createElement("td");
        tdName.innerText=mehsul.name;

        let tdCount= document.createElement("td");
        tdCount.innerText=mehsul.count;

        let tdIcon = document.createElement("td");
            tdIcon.innerHTML = ' <i class="fa-solid fa-trash"></i>';

            tdIcon.addEventListener("click", function () {
                tr.remove();
            })
        tr.append(tdImg, tdName, tdCount, tdIcon);
        table.lastElementChild.append(tr);
    }
}
else{
    table.previousElementSibling.classList.remove("d-none");
}
       


