  document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blog-form');
    const blogsContainer = document.getElementById('blogs');
  
    // Fetch and display blogs
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const blogs = await res.json();
      blogsContainer.innerHTML = blogs.map(blog => `
        <div class="blog" data-id="${blog.id}">
          <h2>${blog.title}</h2>
          <h3>${blog.author}</h3>
          <p>${blog.content}</p>
          <button class="toggle-comments">Minimize</button>
          <div class="comments">
            <form class="comment-form">
              <input type="hidden" name="blogId" value="${blog.id}">
              <input type="text" name="text" placeholder="Your comment" required>
              <button type="submit">Add Comment</button>
            </form>
            ${blog.Comments.map(comment => `
              <div class="comment" data-id="${comment.id}">
                <p>${comment.text}</p>
                <button class="delete-comment">Delete</button>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    };
  
    // Add blog
    blogForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(blogForm);
      const data = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content')
      };
      await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      blogForm.reset();
      fetchBlogs();
    });
  
    // Handle comments and toggle
    blogsContainer.addEventListener('click', async (e) => {
      if (e.target.classList.contains('toggle-comments')) {
        const comments = e.target.nextElementSibling;
        comments.classList.toggle('hidden');
        e.target.textContent = comments.classList.contains('hidden') ? 'Maximize' : 'Minimize';
      } else if (e.target.classList.contains('delete-comment')) {
        const commentId = e.target.closest('.comment').dataset.id;
        await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
        fetchBlogs();
      }
    });
  
    // Add comment
    blogsContainer.addEventListener('submit', async (e) => {
      if (e.target.classList.contains('comment-form')) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {
          blogId: formData.get('blogId'),
          text: formData.get('text')
        };
        await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        fetchBlogs();
      }
    });
  
    // Initial fetch
    fetchBlogs();
  });
  