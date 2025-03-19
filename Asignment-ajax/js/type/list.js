
$(document).ready(function () {
    loadTypes();
});

function loadTypes() {
    $.ajax({
        url: "http://localhost:8080/api/types",
        method: "GET",
        success: function (types) {
            let tableBody = $("#typesTableBody");
            tableBody.empty();
            types.forEach(type => {
                tableBody.append(`
                            <tr>
                                <td>${type.id}</td>
                                <td>${type.name}</td>
                                <td>
                                    <button class="edit-btn" onclick="editType(${type.id})">Edit</button>
                                    <button class="delete-btn" onclick="deleteType(${type.id})">Delete</button>
                                </td>
                            </tr>
                        `);
            });
        },
        error: function () {
            alert("Failed to load computer types!");
        }
    });
}

function editType(id) {
    window.location.href = `edit-type.html?id=${id}`;
}

function deleteType(id) {
    if (confirm("Are you sure you want to delete this type?")) {
        $.ajax({
            url: `http://localhost:8080/api/types/${id}`,
            method: "DELETE",
            success: function () {
                alert("Type deleted successfully!");
                loadTypes(); // Reload danh sách sau khi xóa
            },
            error: function () {
                alert("Failed to delete type!");
            }
        });
    }
}