$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        $.ajax({
            url: `http://localhost:8080/api/computers/${id}`,
            method: "GET",
            success: function(computer) {
                $("#computerId").text(computer.id);
                $("#computerCode").text(computer.code);
                $("#computerName").text(computer.name);
                $("#computerProducer").text(computer.producer);

                // Kiểm tra nếu type tồn tại trước khi truy cập thuộc tính name
                $("#computerType").text(computer.type && computer.type.name ? computer.type.name : "Unknown");
            },
            error: function(xhr, status, error) {
                console.error("Error fetching computer details:", xhr.responseText);
                alert("Failed to load computer details! " + xhr.responseText);
            }
        });
    } else {
        alert("Invalid computer ID!");
    }
});
