
// Hàm domID:
function domID(id) {
    return document.querySelector(id)
}

// Lấy product dựa vào id
this.getProductById = function (id){
    var promise = axios({
        url: `https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/${id}`,
        method: "GET",
	});
    return promise;
}

// Get phone list:
function getPhoneList() {
    var promise = axios({
        url: 'https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product',
        method: "GET",
    })

    promise
        .then(function (result) {
            var phone = result.data;
            renderUI(phone);
        })

        .catch(function (err) {
            console.log(err)
        })
}

// Hàm render UI:
function renderUI(arr) {
    var HTMLContent = '';
    for (var i = 0; i < arr.length; i++) {
        var phone = arr[i];
        HTMLContent += `<tr>
                    <td class="col-1">${i+1}</td>
                    <td class="col-1">${phone.name}</td>
                    <td class="col-2">
                        ${new Intl.NumberFormat('en-US').format(phone.price)} <span>USD</span>
                    </td>
                    <td class="col-1">${phone.screen}</td>
                    <td class="col-2">
                        <img style='max-width: 150px' src="${phone.img}" alt="...">
                    </td>
                    <td class="col-2">${phone.desc}</td>
                    <td class="col-1">${phone.type}</td>
                    <td class="col-2">
                        <button 
                            class="btn btn-success"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onclick="updatePhone(${phone.id})"
                        >
                        Edit
                        </button>

                        <button 
                            class="btn btn-danger"
                            data-toggle="modal"
                            data-target="#modelConfirmDelete"
                            onclick="getIDPhone(${phone.id})"                            
                        >
                        Delete
                        </button>
                    </td>
                </tr>`
    }
    domID('#tbodyFood').innerHTML = HTMLContent;
}

// Gọi hàm getPhoneList ra => để khi web lên, tự động in ra giao diện
getPhoneList()

// Ẩn nút cập nhật và hiện nút thêm khi ấn btnThem:
domID('#btnThem').onclick = function () {
    domID('#btnCapNhat').style.display = 'none';
    domID('#btnThemDT').style.display = 'inline-block';
}

// Lấy thông tin từ user:
function layThongTinPhone() {

    // Lấy từ input:
    var name = domID('#tenSP').value;
    var price = domID('#giaSP').value;
    var screen = domID('#screen').value;
    var picture = domID('#hinhAnh').value;
    var desc = domID('#moTa').value;
    var type = domID('#loaiSP').value;

    // Tạo đối tượng phone từ lớp đối tượng Phone:
    var phone = new Phone(name, price, screen, img, desc, type);

    // Validation:
    var isValid = true;

    // ---- Kiểm tra name:
    isValid &= kiemTraChieuDaiChuoi(
        phone.name,
        1,
        undefined,
        '#spanTenSP',
        'Tên không được để trống'
    )

    // ---- Kiểm tra giá:
    isValid &= kiemTraChieuDaiChuoi(
        phone.price,
        1,
        undefined,
        '#spanGiaSP',
        'Giá không được để trống'
    ) && kiemTraDinhDangChuoi(
        phone.price,
        /^[0-9]+$/,
        '#spanGiaSP',
        'Giá phải là số'
    ) && kiemTraGiaTriChuoi(
        phone.price,
        1000,
        50000,
        '#spanGiaSP',
        'Giá phải từ 1 đến 50 nghìn đô'
    )

    // Kiểm tra màn hình:
    isValid &= kiemTraChieuDaiChuoi(
        phone.screen,
        1,
        undefined,
        '#spanScreen',
        'Màn hình không được để trống'
    )

    // Kiểm tra loại điện thoại:
    isValid &= kiemTraSelect(
        phone.type,
        '#spanLoaiSP',
        'Bạn chưa chọn loại điện thoại'
    )

    // Kiểm tra Link hình ảnh:
    isValid &= kiemTraChieuDaiChuoi(
        phone.img,
        1,
        undefined,
        '#spanHinhAnh',
        'Hình ảnh không được để trống'
    )

    // Kiểm tra mô tả:
    isValid &= kiemTraChieuDaiChuoi(
        phone.desc,
        1,
        undefined,
        '#spanMoTa',
        'Mô tả không được để trống'
    )
    return isValid ? phone : undefined;
    
}

// Thêm điện thoại:
domID('#btnThemDT').onclick = function () {
    // Lấy thông tin từ user:
    var phone = layThongTinPhone();

    if (phone) {
        // Đưa dữ liệu lấy từ input lên server:
        var promise = axios({
            url: 'https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product',
            method: 'POST',
            data: phone,
        })
        
        // Thông báo thêm ĐT thành công:
        $('.themThanhCong').toast('show')

        promise
            .then(function () {
                // Gọi lại ra giao diện:
                getPhoneList();

    
                // Đóng model sau khi thêm thành công:
                domID('#btnClose').click();
            })
    
            .catch(function () {
                alert('Tạo thất bại')
            })
    }
}

// Lấy id điện thoại muốn xóa:

var idPhoneDelete = -1;

function getIDPhone(id) {
    idPhoneDelete = id;
}

// Xóa điện thoại:
domID('#btnConfirmDelete').onclick = function () {
    deletePhone(idPhoneDelete)
    // Thông báo thêm ĐT thành công:
    $('.xoaThanhCong').toast('show')
}

function deletePhone(idPhone) {
    var promise = axios({
        url: `https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/${idPhone}`,
        method: 'DELETE'
    })

    promise
        .then(function () {
            // Gọi lại ra giao diện:
            getPhoneList();
        })

        .catch(function () {
            alert('Xóa thất bại');
        })
}

// Tạo biến lấy id phone update:
var idPhoneUpdate = '';

// Update điện thoại - Show lên UI dữ liệu cần update:
function updatePhone(idPhone) {

    // Hiện nút cập nhật và ẩn nút thêm:
    domID('#btnCapNhat').style.display = 'inline-block';
    domID('#btnThemDT').style.display = 'none';

    // Lấy dữ liệu từ server về đưa lên UI:
    var promise = axios({
        url: `https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/${idPhone}`,
        method: 'GET'
    })

    promise
        .then(function (result) {
            var phone = result.data;

            // Lấy ID của phone update để sử dụng đưa ngược lại lên server:
            idPhoneUpdate = phone.id;

            // dom và show UI:
            domID('#tenSP').value = phone.name;
            domID('#giaSP').value = phone.price;
            domID('#screen').value = phone.screen;
            domID('#hinhAnh').value = phone.img;
            domID('#moTa').value = phone.desc;
            domID('#loaiSP').value = phone.type;
        })

        .catch(function () {
            alert('Update thất bại')
        })
}

// Update điện thoại - Chỉnh sửa và cập nhật lại lên server:
domID('#btnCapNhat').onclick = function () {
    // Lấy thông tin sau edit:
    var phoneEdit = layThongTinPhone();

    if (phoneEdit) {
        // Đưa thông tin sau edit lên server:
        var promise = axios({
            url: `https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/${idPhoneUpdate}`,
            method: 'PUT',
            data: phoneEdit,
        })

        // Thông báo thêm ĐT thành công:
        $('.capNhatThanhCong').toast('show')
    
        promise
            .then(function () {
                getPhoneList()
    
                // Đóng model sau khi update xong:
                domID('#btnClose').click();
            })
    
            .catch(function () {
                alert('Update thất bại')
            })
    }
}

// Reset ô input sau khi đóng:
domID('#btnClose').onclick = function () {
    // Reset input sau khi đóng:
    domID('#phoneForm').reset();

    // Reset validation sau khi đóng:
    domID('#spanTenSP').innerHTML = '';
    domID('#spanGiaSP').innerHTML = '';
    domID('#spanScreen').innerHTML = '';
    domID('#spanLoaiSP').innerHTML = '';
    domID('#spanhinhAnh').innerHTML = '';
    domID('#spaMoTa').innerHTML = '';
}

// Tạo hàm tìm điện thoại:
domID('#searchName').addEventListener('keyup', function () {
    var valueSearch = domID('#searchName').value.toLowerCase();
    var arrSearch = [];

    // Lấy dữ liệu từ server về:
    var promise = axios({
        url: 'https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product',
        method: 'GET'
    })

    promise
        .then(function (result) {
            var phone = result.data;
            for (var i = 0; i < phone.length; i++) {
                var namePhone = phone[i].name.toLowerCase();
                if (namePhone.indexOf(valueSearch) !== -1) {
                    arrSearch.push(phone[i])
                }
            }
            renderUI(arrSearch);
        })

        .catch(function () {
            alert('Search thất bại')
        })
})

// Sắp xếp theo giá tiền:
domID('#xepLoai').onchange = function () {
    // Lấy dữ liệu từ server về:
    var promise = axios({
        url: 'https://64b5010ef3dbab5a95c67b83.mockapi.io/api/product/',
        method: 'GET'
    })

    promise
        .then(function (result) {
            var phone = result.data;
            var arrSapXep = [];

            if (domID('#xepLoai').value === 'giamDan') {
                arrSapXep = phone.sort(function (a, b) {
                    return b.price - a.price
                })
            
            } else if (domID('#xepLoai').value === 'tangDan') {
                arrSapXep = phone.sort(function (a, b) {
                    return a.price - b.price
                })
              
            } else {
               arrSapXep = phone;
            }

            renderUI(arrSapXep);
        })

        .catch(function () {
            alert('Sắp xếp thất bại')
        })
}




