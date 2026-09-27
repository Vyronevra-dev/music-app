const uploadBtn = document.querySelector('.upload-btn');
const fileInput = document.getElementById('file-input');

uploadBtn.addEventListener('click', () => {
    fileInput.click();    
});

const files = [...fileInput.files];


fileInput.addEventListener('change', () => {
    const files = [...fileInput.files];
    const playlist = document.getElementById('playlist');


    files.forEach((file) => {
        const songName = file.name.replace('.mp3', '');
        const displayName = songName.length > 25 ? songName.slice(0, 25) + '...' : songName;

        const li = document.createElement('li');
        li.innerHTML = `
                    <span>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcVpp4fnbgukvB6Ll-6LekWefbMe4ApPzepTfIPtEqbg&s=10">
                    </span>
                    <span>
                        <h3>${displayName} <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical preview-icon"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></h3>
                        <p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-headset"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 14v-3a8 8 0 1 1 16 0v3" /><path d="M18 19c0 1.657 -2.686 3 -6 3" /><path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /><path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /></svg> Kanye West</p>
                    </span>
        `;
        
        playlist.appendChild(li);
    })
});

