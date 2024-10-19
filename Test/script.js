document.getElementById('search-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const userInfoDiv = document.getElementById('user-info');
    
    // Clear previous results
    userInfoDiv.innerHTML = '';

    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(data => {
                // Create user info elements
                const userHTML = `
                    <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="100">
                    <h2>${data.login}</h2>
                    <p>${data.bio || 'No bio available'}</p>
                    <p>Public Repositories: ${data.public_repos}</p>
                    <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
                `;
                userInfoDiv.innerHTML = userHTML;
            })
            .catch(error => {
                userInfoDiv.innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        userInfoDiv.innerHTML = '<p>Please enter a username.</p>';
    }
});
