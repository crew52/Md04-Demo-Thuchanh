let currentPage = 0;
let pageSize = 5;
let totalPages = 1;
let searchQuery = "";
let selectedTypeId = ""; // Mặc định không lọc theo type

// Load danh sách loại máy tính để tạo dropdown filter
function loadTypes() {
    $.ajax({
        url: "http://localhost:8080/api/types",
        method: "GET",
        success: function (response) {
            $("#typeFilter").empty();
            $("#typeFilter").append('<option value="">All Types</option>'); // Lựa chọn mặc định

            response.forEach(type => {
                $("#typeFilter").append(`<option value="${type.id}">${type.name}</option>`);
            });
        },
        error: function () {
            alert("Failed to load types!");
        }
    });
}

// Load danh sách máy tính dựa trên bộ lọc
function loadComputers() {
    if (selectedTypeId) {
        url = `http://localhost:8080/api/types/view-type/${selectedTypeId}`;
    } else {
        url = searchQuery
            ? `http://localhost:8080/api/computers/search?search=${searchQuery}&page=${currentPage}&size=${pageSize}`
            : `http://localhost:8080/api/computers?page=${currentPage}&size=${pageSize}`;
    }

    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
            const computers = selectedTypeId ? response : response.content;
            totalPages = selectedTypeId ? 1 : response.totalPages; // Nếu lọc theo type, chỉ có 1 trang

            $("#computerTableBody").empty();
            computers.forEach(computer => {
                $("#computerTableBody").append(`
                    <tr>
                        <td>${computer.id}</td>
                        <td>${computer.code}</td>
                        <td>${computer.name}</td>
                        <td>${computer.producer}</td>
                        <td>${computer.type && computer.type.id ? computer.type.name : "Unknown"}</td>
                        <td>
                            <button onclick="viewDetail(${computer.id})">Detail</button>
                            <button onclick="editComputer(${computer.id})">Edit</button>
                            <button onclick="deleteComputer(${computer.id})">Delete</button>
                        </td>
                    </tr>
                `);
            });

            $("#pageInfo").text(`Page ${currentPage + 1} of ${totalPages}`);
            $("#prevPage").prop("disabled", currentPage === 0);
            $("#nextPage").prop("disabled", currentPage >= totalPages - 1);
        },
        error: function () {
            alert("Failed to load data!");
        }
    });

}

// Khi trang web load, tải danh sách loại máy và danh sách máy tính
$(document).ready(function () {
    loadTypes();
    loadComputers();

    $("#prevPage").click(function () {
        if (currentPage > 0) {
            currentPage--;
            loadComputers();
        }
    });

    $("#nextPage").click(function () {
        if (currentPage < totalPages - 1) {
            currentPage++;
            loadComputers();
        }
    });

    $("#pageSize").change(function () {
        pageSize = parseInt($(this).val());
        currentPage = 0;
        loadComputers();
    });

    $("#searchButton").click(function () {
        searchQuery = $("#searchInput").val().trim();
        currentPage = 0;
        loadComputers();
    });

    $("#searchInput").keypress(function (event) {
        if (event.which === 13) {
            $("#searchButton").click();
        }
    });

    // Khi người dùng thay đổi bộ lọc loại máy tính
    $("#typeFilter").change(function () {
        selectedTypeId = $(this).val();
        currentPage = 0;
        loadComputers();
    });
});

function deleteComputer(id) {
    if (confirm("Are you sure you want to delete this computer?")) {
        $.ajax({
            url: `http://localhost:8080/api/computers/${id}`,
            method: "DELETE",
            success: function () {
                alert("Deleted successfully!");
                loadComputers(); // Tải lại danh sách sau khi xóa
            },
            error: function () {
                alert("Failed to delete!");
            }
        });
    }
}

function viewDetail(computerId) {
    window.location.href = `computer-detail.html?id=${computerId}`;
}

function editComputer(computerId) {
    window.location.href = `edit-computer.html?id=${computerId}`;
}





