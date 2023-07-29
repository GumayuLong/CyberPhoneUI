function Service(){
	// Gửi request lên server
	this.getListProductApi = function () {
		var promise = axios({
			url: "https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product",
			method: "GET",
		});
		return promise;
	};

	// Thêm sản phẩm
	this.addProductApi = function (product) {
		var promise = axios({
			url: "https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product",
			method: "POST",
			data: product,
		});
		return promise;
	};

	// Xóa sản phẩm
	this.deleteProductApi = function (id) {
		var promise = axios({
			url: `https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/${id}`,
			method: "DELETE",
		});
		return promise;
	};

	// Lấy product dựa vào id
    this.getProductById = function (id){
    var promise = axios({
        url: `https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/${id}`,
        method: "GET",
	});
    return promise;
}


	// Update sản phẩm
	this.updateProductApi = function (product) {
		var promise = axios({
			url: `https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/${product.id}`,
			method: "PUT",
			data: product,
		});
		return promise;
	};
}


