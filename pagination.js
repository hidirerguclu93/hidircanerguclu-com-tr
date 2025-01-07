document.addEventListener("DOMContentLoaded", function() {
    const postsPerPage = 3;
    const blogSection = document.querySelector("#blog");
    const posts = Array.from(blogSection.getElementsByClassName("post"));
    const paginationContainer = document.querySelector(".pagination");

    function displayPage(page) {
        blogSection.innerHTML = "";
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = posts.slice(start, end);

        pagePosts.forEach(post => blogSection.appendChild(post));
        updatePagination(page);
    }

    function updatePagination(currentPage) {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(posts.length / postsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add("disabled");
            }
            button.addEventListener("click", () => displayPage(i));
            paginationContainer.appendChild(button);
        }
    }

    displayPage(1);
});
