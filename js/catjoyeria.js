
const itemsCont1 = document.getElementById("list-items1");
const itemsCont2 = document.getElementById("list-items2");
const itemsCont3 = document.getElementById("list-items3");
let compra=[];

function addItem(div, item){
    const itemHTML = `<div class="card" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top" alt="image">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5> 
                <p class="card-text">${item.description.slice(0,20)}...<br>
                <strong>$ ${item.precio} (MXN)</strong></p>   
                <button type="button" class="btn" data-toggle="modal" data-target="#modalItem_${item.id}">
                 Ver más 
                </button>
                <a href="#" class="btn btnAdd">Añadir a carrito</a> 
            </div> 
        </div> 
        <br/>
        <!-- Modal -->
<div class="modal fade" id="modalItem_${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${item.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      ${item.description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>`
    div.innerHTML += itemHTML;
}

window.addEventListener("DOMContentLoaded", function () {
    getData();  
    if (localStorage.getItem("carrito")) {
        compra = JSON.parse(localStorage.getItem("carrito"))
    } 
  })
  
  
  const getData = () =>{
      let promise = fetch("http://127.0.0.1:5500/data.json",{
        method:"GET"
      });//fetch
      promise.then( (response) => {
              response.json().then((data)=>{
                      console.log(data);
                     data.forEach(element => {
                      if (element.id.charAt(0)==2){
                            if (element.id.charAt(3)%3==0) {
                                  addItem(itemsCont1, element)
                            } else if (element.id.charAt(3)%3==1){
                                  addItem(itemsCont2, element)
                            } else {
                                  addItem(itemsCont3, element)
                            }
                      }//if alebrijes id start=1
                      
                    }); //forEach
              }).catch( (error) =>{
                console.error(error);
            });
        }).catch((error) =>{
          alert("Error en la solicitud " + error);
      });
        
  }//getData

  itemsCont1.addEventListener("click", function(e){
    e.preventDefault();
    add(e);
  })
  
  itemsCont2.addEventListener("click", function(e){
    e.preventDefault();
    add(e);
  })
  
  itemsCont3.addEventListener("click", function(e){
    e.preventDefault();
    add(e);
  })
  /* añadir a Carrito */
  
  function add(e) {
    if (e.target.classList.contains("btnAdd")){
        objeto = e.target.parentElement;
        let item = {nombre: "", precio:"", cantidad: 1, id: ""}
  
        item.nombre = objeto.querySelector("h5").textContent
        item.precio = parseInt(objeto.querySelector("strong").textContent.split(" ")[1])
  
        //Traer valor de id//
        item.id = parseInt(objeto.querySelector(".btn").dataset.target.slice(11,15))
  
        if (compra.length!=0) {
            compra.forEach(elem =>{
                if(parseInt(elem.id) === item.id){
                    item.cantidad = elem.cantidad+1
                    let index = compra.indexOf(elem)
                    compra.splice(index,1)
                }
            })            
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu compra se ha añadido a carrito',
          showConfirmButton: false,
          timer: 1500,
          background: '#282F36', 
          color: '#C2943F'
        })
          compra.push(item)
          
          localStorage.setItem("carrito", JSON.stringify(compra))
  
    }//if para que aplique únicamente a botón
    
  }//add