    document.addEventListener('DOMContentLoaded', function() {
        // DOM Elements
        const adminPanel = document.getElementById('adminPanel');
        const toggleAdminBtn = document.getElementById('toggleAdmin');
        const blogForm = document.getElementById('blogForm');
        const blogPosts = document.getElementById('blogPosts');
        const recentPosts = document.getElementById('recentPosts');

        // Toggle Admin Panel
        toggleAdminBtn.addEventListener('click', function () {
            adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
        });


        // Sample blog posts data
        let posts = [
            {
                id: 1,
                title: "Discovering a Victorian Era Locket",
                author: "Eleanor West",
                date: "June 12, 2023",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                content: "I recently came across a beautiful Victorian era locket at a small estate sale. The craftsmanship is extraordinary, with intricate floral patterns engraved on the front. Inside, I found two tiny photographs that appear to be from the late 1800s. The locket is made of 9-carat gold and has a delicate chain that's still intact after all these years.",
                category: "Jewelry",
                likes: 12,
                comments: [
                    {
                        user: "Margaret",
                        text: "The locket discovery is fascinating! Any updates on identifying the photographs?",
                        date: "June 14, 2023"
                    },
                    {
                        user: "Charles",
                        text: "What technique did you use to clean it without damaging the piece?",
                        date: "June 13, 2023"
                    }
                ]
            },
            {
                id: 2,
                title: "Restoring a 19th Century Writing Desk",
                author: "Thomas Reed",
                date: "May 28, 2023",
                image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                content: "After months of careful restoration, the 19th century writing desk I acquired last year is finally complete. The mahogany wood had been damaged by water, but with patience and the right techniques, I was able to bring back its original beauty while preserving its historical integrity. The brass fittings were carefully polished and the leather writing surface was professionally restored.",
                category: "Furniture",
                likes: 8,
                comments: [
                    {
                        user: "AntiqueLover",
                        text: "Amazing work! How long did the restoration process take?",
                        date: "May 30, 2023"
                    }
                ]
            }
        ];

        // Initialize the blog
        function initBlog() {
            // Load posts from local storage if available
            const savedPosts = localStorage.getItem('antiqueBlogPosts');
            if (savedPosts) {
                posts = JSON.parse(savedPosts);
            }

            renderPosts();
            updateRecentPosts();
        }

        // Render all posts
        function renderPosts() {
            blogPosts.innerHTML = '';

            posts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.classList.add('post');
                postEl.innerHTML = `
                        <div class="post-header">
                            <h3 class="post-title">${post.title}</h3>
                            <span class="post-meta">${post.date} • ${post.category}</span>
                        </div>
                        ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
                        <div class="post-content">
                            <p>${post.content}</p>
                        </div>
                        <div class="post-meta">Posted by: ${post.author}</div>
                        <div class="post-actions">
                            <button class="action-btn like-btn" data-id="${post.id}">
                                <i class="fas fa-heart"></i> Like <span class="like-count">${post.likes}</span>
                            </button>
                            <button class="action-btn comment-btn" data-id="${post.id}">
                                <i class="fas fa-comment"></i> Comment
                            </button>
                            <button class="action-btn share-btn" data-id="${post.id}">
                                <i class="fas fa-share"></i> Share
                            </button>
                        </div>
                        <div class="comments-section">
                            <h4>Comments (${post.comments.length})</h4>
                            ${post.comments.map(comment => `
                                <div class="comment">
                                    <div class="comment-header">
                                        <span class="comment-author">${comment.user}</span>
                                        <span class="comment-date">${comment.date}</span>
                                    </div>
                                    <p>${comment.text}</p>
                                </div>
                            `).join('')}
                            <div class="add-comment">
                                <div class="comment-form">
                                    <input type="text" class="comment-input" placeholder="Add a comment..." data-id="${post.id}">
                                    <button class="comment-submit" data-id="${post.id}">Post</button>
                                </div>
                            </div>
                        </div>
                    `;

                blogPosts.appendChild(postEl);
            });

            // Add event listeners for buttons
            document.querySelectorAll('.like-btn').forEach(btn => {
                btn.addEventListener('click', handleLike);
            });

            document.querySelectorAll('.comment-submit').forEach(btn => {
                btn.addEventListener('click', handleComment);
            });

            document.querySelectorAll('.share-btn').forEach(btn => {
                btn.addEventListener('click', handleShare);
            });
        }

        // Update recent posts list
        function updateRecentPosts() {
            recentPosts.innerHTML = '';

            // Show latest 3 posts
            const recent = [...posts].sort((a, b) => b.id - a.id).slice(0, 3);

            recent.forEach(post => {
                const li = document.createElement('li');
                li.textContent = post.title;
                recentPosts.appendChild(li);
            });
        }

        // Handle like button click
        function handleLike(e) {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            const post = posts.find(p => p.id === postId);

            if (post) {
                post.likes++;
                localStorage.setItem('antiqueBlogPosts', JSON.stringify(posts));
                renderPosts();
            }
        }

        // Handle comment submission
        function handleComment(e) {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            const post = posts.find(p => p.id === postId);
            const commentInput = document.querySelector(`.comment-input[data-id="${postId}"]`);
            const commentText = commentInput.value.trim();

            if (post && commentText) {
                const now = new Date();
                const dateStr = now.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                post.comments.push({
                    user: "Guest",
                    text: commentText,
                    date: dateStr
                });

                localStorage.setItem('antiqueBlogPosts', JSON.stringify(posts));
                commentInput.value = '';
                renderPosts();
            }
        }

        // Handle share button click
        function handleShare(e) {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            const post = posts.find(p => p.id === postId);

            if (post) {
                alert(`Share this post: ${post.title}\nURL: https://your-antiques-site.com/blog/${postId}`);
                // In a real implementation, this would use the Web Share API or social media links
            }
        }

        // Handle new post form submission
        blogForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const title = document.getElementById('postTitle').value;
            const image = document.getElementById('postImage').value;
            const category = document.getElementById('postCategory').value;
            const content = document.getElementById('postContent').value;

            // Create new post object
            const newPost = {
                id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
                title,
                author: "Admin",
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                image,
                content,
                category,
                likes: 0,
                comments: []
            };

            // Add to posts array
            posts.unshift(newPost);

            // Save to local storage
            localStorage.setItem('antiqueBlogPosts', JSON.stringify(posts));

            // Update UI
            renderPosts();
            updateRecentPosts();

            // Reset form
            blogForm.reset();

            // Show success message
            Swal.fire({
                title: "Post published successfully!",
                icon: "success",
            })
        });

        // Initialize the blog
        initBlog();


        $('#publishPost').on('click', function () {
            const blog = {
                title: $('#postTitle').val(),
                image: $('#postImage').val(),
                category: $('#postCategory').val(),
                content: $('#postContent').val(),
            };
            $.ajax({
                url: "http://localhost:8080/api/v1/blog/savePost",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(blog),
                success: () => {
                    Swal.fire({
                        title: "Product Save and Publish Successfully",
                        icon: "success",
                    })
                }
            });
        });
    });