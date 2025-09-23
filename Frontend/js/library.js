document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        url:"http://localhost:8080/api/v1/marketplace/getAll",
        method:"GET",
        dataType:"json",
        success:function (response1){
            $.ajax({
                url: "http://localhost:8080/api/v1/blog/getAll",
                method: "GET",
                dataType: "json",
                success:function (response2){
                    const library = {
                        data : response1.data,
                        post : response2.data,
                    }
                    $.ajax({
                       url:"http://localhost:8080/api/v1/library/saveImage",
                       method:"POST",
                        contentType: "application/json",
                        data: JSON.stringify(library),
                        success: () => {

                        }
                    });

                }
            });

        }
    });
});