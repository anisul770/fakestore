const loadAllProduct = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => displayProduct(data));
};

const displayProduct = (products)=>{
    const productContainer = document.getElementById("product-container");
    products.forEach(product=>{
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <img class="card-img" src=${product.image}  alt="">
        <h5>${product.title.slice(0,10)}...</h5>
        <h3>Price : ${product.price}$</h3>
        <p>${product.description.slice(0,50)}</p>
        <div>
        <button onclick="singleProduct(${product.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        <button class="btn btn-primary" onclick="handleAddToCart('${product.title.slice(0,12)}',${product.price})">ADD TO CART</button>
        </div>
        `;
        productContainer.appendChild(div);
    });
};

// let count = 0;

const handleAddToCart = (name,price) => {
    const container = document.getElementById("cart-main-container");
    if(document.getElementById("count").innerText<12){
        const div = document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML = `
        <p>${name}</p>
        <h3 class="price">${price}$</h3>
    `;
    container.appendChild(div);
    UpdateTotal();
    }
    else{
        alert(`Can't add more than 12 items`)
    }
}

const UpdateTotal = ()=>{
    const allPrice = document.getElementsByClassName("price");
    let count = 0,item=0;
    for(const element of allPrice){
        count = count+parseFloat(element.innerText);
        item++;
    }
    document.getElementById("total").innerText=count.toFixed(2)+" ("+item.toString()+" items)";
    document.getElementById("count").innerText=item;
}

const singleProduct = (id)=>{
    // fetch('https://fakestoreapi.com/products/'+id).then(res=>res.json()).then(data => console.log(data));
    fetch(`https://fakestoreapi.com/products/${id}`).then(res=>res.json()).then(data => showSingle(data));

}

const showSingle = (data)=>{
    console.log(data);
    const headTitle = document.getElementById("exampleModalLabel");
    headTitle.innerText = `${data.title}`;
    const MainBody = document.getElementById("modal-body");
    MainBody.innerHTML=`
        <img src=${data.image} class="card-img" alt="">
        <p>${data.description}</p>
        <h3>Price : ${data.price}$</h3>
    `;
    const ModalFooter = document.getElementById("modal-footer");
    ModalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"  onclick="handleAddToCart('${data.title.slice(0,12)}',${data.price})">ADD TO CART</button>
    `;
}




loadAllProduct();