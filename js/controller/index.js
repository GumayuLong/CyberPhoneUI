var api = new Service();
var arrProduct = [];

function getEle(id){
    return document.getElementById(id);
};

function getListProduct(){
    // pending
    getEle("loader").style.display = "block";

    var promise = api.getListProductApi();
    promise
        .then(function(result){
            // console.log(result.data);
            renderUI(result.data);
            getEle("loader").style.display = "none";
            arrProduct = result.data;
        })
        .catch(function(err){
            console.log(err);
        })
    
}
getListProduct();

function renderUI(data){
    var content = "";
    for (var i = 0; i < data.length; i++){
        var product = data[i];
        content += `
        <div class="col-12 col-md-6 col-lg-4">
                    <div class="card cardPhone">
                        <img src="${product.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h3 class="cardPhone__title">${product.name}</h3>
                                    <p class="cardPhone__text">${product.desc}</p>
                                </div>
                                <div>
                                    <h3 class="cardPhone__title">$${product.price}</h3>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="cardPhone__rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div>
                                    <button class="btnPhone-shadow"><i class="fa fa-shopping-cart"></i> Buy Now</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        `;
    }
    getEle("productList").innerHTML = content;
};

getEle("loaiSP").onchange = () => {
    var type = getEle("loaiSP").value;
    function fillterData(data){
        var data = arrProduct.filter((element) => {
			if (type === "all") {
				return true;
			}

			return element.type === type;
		});

		return data;
    };
    var phoneType = fillterData(arrProduct);
    // console.log(phoneType);
    renderUI(phoneType);
}

