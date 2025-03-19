function addType() {
    let typeName = $("#typeName").val().trim();
    if (typeName === "") {
        alert("Please enter a type name!");
        return;
    }

    $.ajax({
        url: "http://localhost:8080/api/types",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: typeName }),
        success: function () {
            alert("Type added successfully!");
            window.location.href = "types-list.html"; // Redirect to list page
        },
        error: function () {
            alert("Failed to add new type!");
        }
    });
}