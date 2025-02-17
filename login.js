const users = [
    {id: "12346", password: "password123", hasvoted: false},
    { id: "6789", password: "password456", hasVoted: false },
];

// Store voted users in localStorage to persist across sessions
const votedUsers = JSON.parse(localStorage.getItem('votedUsers')) || [];

// Restore voted status from localStorage
votedUsers.forEach(votedUserId => {
    const user = users.find(u => u.id === votedUserId);
    if (user) {
        user.hasVoted = true;
    }
});

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", () => {
    const studentId = document.getElementById("student-id").value;
    const password = document.getElementById("password").value;

    const user = users.find(
        u => u.id === studentId && u.password === password
    );

    if (user) {
        if (user.hasVoted) {
            document.getElementById("login-error").textContent = "You have already voted and cannot login again.";
            document.getElementById("login-error").style.display = "block";
            return;
        }
        document.getElementById("login-section").style.display = "none";
        document.getElementById("voting-section").style.display = "block";
    } else {
        document.getElementById("login-error").textContent = "Invalid credentials. Please try again.";
        document.getElementById("login-error").style.display = "block";
    }
});

let votedFor = null;

function voteForCandidate(candidate) {
    if (votedFor === null) {
        votedFor = candidate;
        alert(`Your vote for Candidate ${candidate} has been successful.`);
        
        // Mark the current user as voted
        const currentUserId = document.getElementById("student-id").value;
        const currentUser = users.find(u => u.id === currentUserId);
        if (currentUser) {
            currentUser.hasVoted = true;
            
            // Store voted user in localStorage
            votedUsers.push(currentUserId);
            localStorage.setItem('votedUsers', JSON.stringify(votedUsers));
        }

        document.querySelectorAll('.vote-button').forEach(button => {
            button.classList.add('voted');
            button.disabled = true;
        });

        // Automatically logout after 3 seconds
        setTimeout(() => {
            document.getElementById("voting-section").style.display = "none";
            document.getElementById("login-section").style.display = "block";
            document.getElementById("student-id").value = "";
            document.getElementById("password").value = "";
            alert("You have been logged out. Thank you for voting!");
        }, 3000);
    } else {
        alert('You have already voted. You cannot vote again.');
    }
}

function searchCandidate() {
    const searchTerm = document.getElementById('candidateSearch').value.toLowerCase();
    const candidates = document.querySelectorAll('.candidate');
    
    candidates.forEach(candidate => {
        const candidateName = candidate.querySelector('h3').textContent.toLowerCase();
        if (candidateName.includes(searchTerm)) {
            candidate.style.display = 'block';
        } else {
            candidate.style.display = 'none';
        }
    });
}
