var productNameInput = document.getElementById("productName"); 
var productPriceInput = document.getElementById("productPrice"); 
var productCategoryInput = document.getElementById("productCategory"); 
var productDescripionInput = document.getElementById("productDescription");
var productFileInput = document.getElementById("productFile"); 

var searchInput = document.getElementById("searchInput");

var currentIndex= 0;
var productList = []; 





if (localStorage.getItem("productConatiner") !== null){
 productList= JSON.parse(localStorage.getItem("productConatiner"))
  displayData()
}





// function
// add function (first)
function addProduct() {
  if(validateName() &&validatePrice()&&validateCategory()&&validateDescription()){

    var product = {
      name: productNameInput.value, // take value in this input
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescripionInput.value,
      image: productFileInput.files[0] ? `image/${productFileInput.files[0]?.name}`: "image/three.jpg",
    };
    productList.push(product);
  localStorage.setItem("productConatiner",JSON.stringify(productList)) 
  
    displayData()
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Add Product successfully"
    }); 
    clearData(); 
  }
  else{
    Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "Can't Add Product",
      confirmButtonColor: "#d33",
    });
  }
}




// clear function (second)
function clearData() {
  productNameInput.value = "";  // clear input 
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescripionInput.value = "";
  productFileInput.value = "";

  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescripionInput.classList.remove("is-valid");

}


// display function (third)
function displayData(){
    var container="";
    for (var i = 0; i < productList.length; i++) {
              container+=`
               <div class="col-md-3 ">
          <div class="card ">
            <img height="200px" src="${productList[i].image}" class="card-img-top"
              alt="" />
            <div class="card-body">
              <h3 class="card-title h6">Name :${productList[i].name}</h3>  
              <div class="d-flex flex-column gap-2">
                <span class="card-text">Price : ${productList[i].price} </span>
                <span class="card-text">productCategory : ${productList[i].category}</span>
                <span class="card-text">productDescription : ${productList[i].description}</span>
              </div>
            </div>
            <div class="card-footer text-center">
              <button class="btn btn-warning"   onclick="setUpdateValue(${i})">UPDATE <i class="fa-solid fa-pen-to-square"></i></button>
              <button  onclick="deleteItem(${i})"  class="btn btn-outline-danger">DELETE <i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>    
              ` 
    }
    document.getElementById("rowData").innerHTML=container;
}


// delete function (4)

function deleteItem(index){
productList.splice( index ,   1)
localStorage.setItem("productConatiner", JSON.stringify(productList))
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  ProgressBarColor: true,
 
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
    
  }
  
  

});
Toast.fire({
  icon: "error",
  title: "Delete Product successfully"
}); 
displayData()
}


function searchItem(){
 var term =searchInput.value;
 var container ="";
 for (var i = 0; i < productList.length; i++) {
 if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
  container+=`
  <div class="col-md-3 ">
<div class="card ">
<img src="${productList[i].image}" class="card-img-top"
 alt="" />
<div class="card-body">
 <h3 class="card-title h6">Name :${productList[i].name}</h3>  
 <div class="d-flex flex-column gap-2">
   <span class="card-text">Price : ${productList[i].price} </span>
   <span class="card-text">productCategory : ${productList[i].category}</span>
   <span class="card-text">productDescription : ${productList[i].description}</span>
 </div>
</div>
<div class="card-footer text-center">
 <button class="btn btn-warning" onclick="setUpdateValue(${i})" >UPDATE <i class="fa-solid fa-pen-to-square"></i></button>
 <button  onclick="deleteItem(${i})"  class="btn btn-outline-danger">DELETE <i class="fa-solid fa-trash"></i></button>
</div>
</div>
</div>    
 ` 
 }
}
 
 document.getElementById("rowData").innerHTML=container
  
}


function validateName(){
  var regex =/^[A-Za-z0-9\s\-_]+$/
  var term = productNameInput.value
  if (regex.test(term)) {
    productNameInput.classList.add("is-valid")
    productNameInput.classList.remove("is-invalid")
    document.getElementById("msgName").classList.add("d-none")
    return true
  }
  
  else{
    
    
    productNameInput.classList.add("is-invalid")
    productNameInput.classList.remove("is-valid")
    document.getElementById("msgName").classList.remove("d-none")
    return false
  }
}

function validatePrice(){
  var regex =/^\$?\d+(\.\d{1,2})?$/
  var term = productPriceInput.value
  if (regex.test(term)) {
    productPriceInput.classList.add("is-valid")
    productPriceInput.classList.remove("is-invalid")
    document.getElementById("msgPrice").classList.add("d-none")
    return true
  }
  
  else{
    productPriceInput.classList.add("is-invalid")
    productPriceInput.classList.remove("is-valid")
    document.getElementById("msgPrice").classList.remove("d-none")
    return false
  }
}
function validateCategory(){
  var regex = /^(Tv|Mobile|Screen)$/i;
  var term = productCategoryInput.value
  if (regex.test(term)) {
    productCategoryInput.classList.add("is-valid")
    productCategoryInput.classList.remove("is-invalid")
    document.getElementById("msgCategory").classList.add("d-none")
    return true
  }
  
  else{
    
    
    productCategoryInput.classList.add("is-invalid")
    productCategoryInput.classList.remove("is-valid")
    document.getElementById("msgCategory").classList.remove("d-none")
    return false
  }
}
function validateDescription(){
  var regex = /^[A-Za-z0-9\s,.\-!?()&/;:"'<>|]+$/;
  var term = productDescripionInput.value
  if (regex.test(term)) {
    productDescripionInput.classList.add("is-valid")
    productDescripionInput.classList.remove("is-invalid")
    document.getElementById("msgDescription").classList.add("d-none")
    return true
  }
  
  else{
    
    
    productDescripionInput.classList.add("is-invalid")
    productDescripionInput.classList.remove("is-valid")
    document.getElementById("msgDescription").classList.remove("d-none")
    return false
  }
}


function setUpdateValue(index){
  currentIndex=index
productNameInput.value=productList[index].name;
productPriceInput.value=productList[index].price;
productCategoryInput.value=productList[index].category;
productDescripionInput.value=productList[index].description;
// productFileInput.files=productList[index].image;

document.getElementById("update").classList.remove("d-none")
document.getElementById("add").classList.add("d-none")



}
function UpdateValue(){

  if(validateName() &&validatePrice()&&validateCategory()&&validateDescription()){
  var product = {
    name: productNameInput.value, // take value in this input
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescripionInput.value,
    image: productFileInput.files[0] ? `image/${productFileInput.files[0]?.name}`: "image/three.jpg",
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Update Product successfully"
  }); 


  productList.splice(currentIndex, 1  ,product );
  localStorage.setItem("productConatiner",JSON.stringify(productList))
displayData()
  clearData()
  document.getElementById("update").classList.add("d-none")
document.getElementById("add").classList.remove("d-none")
  }

}