function nextScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Lost & Found
document.addEventListener("DOMContentLoaded", () => {
    const lostForm = document.getElementById('lostForm');
    if (lostForm) {
        lostForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const item = e.target[0].value;
            const location = e.target[1].value;
            const desc = e.target[2].value;
            const div = document.createElement('div');
            div.textContent = `${item} (${location}) - ${desc}`;
            document.getElementById('lostList').appendChild(div);
            e.target.reset();
        });
    }

    const plannerForm = document.getElementById('plannerForm');
    if (plannerForm) {
        plannerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const subject = e.target[0].value;
            const time = e.target[1].value;
            const li = document.createElement('li');
            li.textContent = `${time} → ${subject}`;
            document.getElementById('plannerView').appendChild(li);
            e.target.reset();
        });
    }
});
// Add Lost & Found item to backend
document.getElementById('lostForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const item = {
        name: e.target[0].value,
        location: e.target[1].value,
        description: e.target[2].value
    };
    await fetch("http://localhost:5000/lostfound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });
    loadItems();
    e.target.reset();
});

// Load Lost & Found items
async function loadItems() {
    const res = await fetch("http://localhost:5000/lostfound");
    const data = await res.json();
    document.getElementById("lostList").innerHTML =
        data.map(d => `<div>${d.name} (${d.location}) - ${d.description}</div>`).join("");
}
loadItems();

// Study Planner
document.getElementById('plannerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const plan = {
        subject: e.target[0].value,
        time: e.target[1].value
    };
    await fetch("http://localhost:5000/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan)
    });
    loadPlans();
    e.target.reset();
});

async function loadPlans() {
    const res = await fetch("http://localhost:5000/planner");
    const data = await res.json();
    document.getElementById("plannerView").innerHTML =
        data.map(p => `<li>${p.time} → ${p.subject}</li>`).join("");
}
loadPlans();
