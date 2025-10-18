let marketplaceData = [];
let blogImage = [];
document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        url:"http://localhost:8080/api/v1/marketplace/getAll",
        method:"GET",
        dataType:"json",
        success:function (response1){
            marketplaceData = response1.data;
            console.log("response 1 is ",response1);

            $.ajax({
                url: "http://localhost:8080/api/v1/blog/getAll",
                method: "GET",
                dataType: "json",
                success:function (response2){
                    blogImage = response2.data;

                    console.log("response 2 is ",response2)
                    blogImage.forEach(blogImages=>{
                        $.ajax({
                            url:"http://localhost:8080/api/v1/library/saveImage",
                            method:"POST",
                            contentType: "application/json",
                            data: JSON.stringify(library),
                            success: () => {

                            }
                        });
                    });

                    const library = {
                        data: marketplaceData[0]?.image || null,
                        post: blogData[0]?.image || null,
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
    $.ajax({
        url:"http://localhost:8080/api/v1/library/getAll",
        method:"GET",
        dataType:"json",
        success:function (response){
            const library = response.data;
            let html = "";

            library.forEach(lib=>{
                console.log("image 1 is ",lib.data);
                console.log("image 2 is ",lib.post);
                html += `
                    <div class = "library-card">
                        <img src="${lib.data || 'https://via.placeholder.com/300x200'}">
                    </div>
                `;
            });
            $('#image').html(html);
        }
    });

});