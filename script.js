const API_URL = "https://api.dicebear.com/7.x/initials/svg?seed=";

function runMatch() {
    const name = document.getElementById("devName").value.trim();
    const tech = document.getElementById("techStack").value; // Récupère la valeur du dropdown

    if (!name || !tech) {
        alert("Please enter your name and choose your crush! 🎬");
        return;
    }

    // UI Switch
    document.getElementById("casting-section").style.display = "none";
    document.getElementById("result-section").classList.remove("hidden");

    // Avatar generation
    document.getElementById("avatar-user").src = `${API_URL}${name}&backgroundColor=1a1a1a&textColor=d4af37`;
    document.getElementById("avatar-tech").src = `${API_URL}${tech}&backgroundColor=720e1e&textColor=f4f1ea`;

    // Algorithm (Hash based on name + tech)
    const combined = (name + tech).toLowerCase();
    let score = 0;
    for (let i = 0; i < combined.length; i++) {
        score += combined.charCodeAt(i);
    }
    score = score % 101;

    // Animate Score
    animateValue("score-display", 0, score, 2000);

    // Generate Dating Feedback
    generateDatingFeedback(score, tech);
}

function generateDatingFeedback(score, techName) {
    const title = document.getElementById("match-title");
    const desc = document.getElementById("match-desc");

    if (score > 90) {
        title.innerText = "🔥 POWER COUPLE";
        desc.innerText = `It's a match! You and ${techName} are merging without conflicts. Production ready immediately.`;
        lancerConfettis(['#d4af37', '#720e1e']);
    } else if (score > 70) {
        title.innerText = "❤️ SOLID RELATIONSHIP";
        desc.innerText = `Stable build. ${techName} might have some quirks, but the chemistry is definitely there.`;
        lancerConfettis(['#d4af37']);
    } else if (score > 40) {
        title.innerText = "💔 IT'S COMPLICATED";
        desc.innerText = `Lot of legacy issues here. You and ${techName} need serious refactoring therapy.`;
    } else {
        title.innerText = "🚩 TOXIC RELATIONSHIP";
        desc.innerText = `Red flags everywhere! ${techName} is ghosting you. Run git reset --hard and find someone else.`;
    }
}

function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    
    let timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current + "%";
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function resetTest() {
    location.reload();
}

function lancerConfettis(colors) {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'] 
    });
}