// add new
$(document).ready(function () {
    loadTypes();
    $("#addComputer").click(function (event) {
        event.preventDefault(); // 🚀 Ngăn trang bị reload
        addNewProduct();
    });
});

function loadTypes() {
    $.ajax({
        url: "http://localhost:8080/api/types",
        method: "GET",
        success: function (types) {
            types.forEach(type => {
                $("#typeSelect").append(`<option value="${type.id}">${type.name}</option>`);
            });
        },
        error: function () {
            alert("Failed to load types!");
        }
    });
}

function addNewProduct() {
    let code = $("#code").val().trim();
    let name = $("#name").val().trim();
    let producer = $("#producer").val().trim();
    let typeId = parseInt($("#type").val());

    // Xóa thông báo lỗi cũ
    $(".error-message").remove();

    let productData = {
        code: code,
        name: name,
        producer: producer,
        type: { id: typeId }
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/computers",
        contentType: "application/json",
        data: JSON.stringify(productData),
        success: function () {
            alert("Sản phẩm đã thêm thành công!");
            window.location.href = "computer-list.html";
        },
        error: function (xhr) {
            console.error("Error:", xhr.responseText);
            try {
                let errorResponse = JSON.parse(xhr.responseText);
                if (errorResponse.errors && errorResponse.errors.length > 0) {
                    errorResponse.errors.forEach(error => {
                        let [field, message] = error.split(": ");
                        displayError(field, message);
                    });
                } else {
                    alert("Có lỗi xảy ra khi thêm sản phẩm.");
                }
            } catch (e) {
                alert("Lỗi không xác định!");
            }
        }
    });
}

// 🛠 Hàm hiển thị lỗi dưới input
function displayError(field, message) {
    let fieldId = field === "name" ? "#name"
        : field === "code" ? "#code"
            : field === "producer" ? "#producer"
                : null;

    if (fieldId) {
        $(fieldId).after(`<p class="error-message" style="color:red;">${message}</p>`);
    }
}


// xử lý type (lấy danh sách)
document.addEventListener("DOMContentLoaded", function () {
    loadProductTypes();
});

function loadProductTypes() {
    fetch("http://localhost:8080/api/types") // Đổi thành API của bạn
        .then(response => response.json())
        .then(data => {
            let typeSelect = document.getElementById("type");
            typeSelect.innerHTML = ""; // Xóa nội dung cũ

            data.forEach(type => {
                let option = document.createElement("option");
                option.value = type.id;
                option.textContent = type.name;
                typeSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading product types:", error));
}
