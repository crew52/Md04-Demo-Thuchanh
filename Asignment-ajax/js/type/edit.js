$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const typeId = urlParams.get('id');
    if (typeId) {
        loadType(typeId);
    }
});

function loadType(id) {
    $.ajax({
        url: `http://localhost:8080/api/types/${id}`,
        method: "GET",
        success: function (type) {
            $("#typeId").val(type.id);
            $("#typeName").val(type.name);
        },
        error: function () {
            alert("Failed to load type details!");
        }
    });
}

function updateType() {
    let typeId = $("#typeId").val();
    let typeName = $("#typeName").val().trim();

    if (typeName === "") {
        alert("Please enter a type name!");
        return;
    }

    $.ajax({
        url: `http://localhost:8080/api/types/${typeId}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ name: typeName }),
        success: function () {
            alert("Type updated successfully!");
            window.location.href = "types-list.html"; // Redirect to list page
        },
        error: function () {
            alert("Failed to update type!");
        }
    });
}