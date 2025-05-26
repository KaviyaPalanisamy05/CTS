console.log("Welcome to the Community Portal");

window.addEventListener('load', () => {
    alert("Page fully loaded! Welcome to our Community Event Portal.");
    updateUI();
});

// Event class
class Event {
    constructor(name, date, category, location, maxSeats) {
        this.name = name;
        this.date = date;
        this.category = category;
        this.location = location;
        this.maxSeats = maxSeats;
        this.availableSeats = maxSeats;
        this.registrations = [];
    }

    checkAvailability() {
        return this.availableSeats > 0 && new Date(this.date) > new Date();
    }

    registerUser(user) {
        if (this.checkAvailability()) {
            this.registrations.push(user);
            this.availableSeats--;
            return true;
        }
        return false;
    }
}

// Initial events
let events = [
    new Event("Jazz Night", "2025-12-15", "music", "Community Center", 100),
    new Event("Baking Workshop", "2025-11-20", "workshop", "Local Bakery", 15),
    new Event("Basketball Tournament", "2025-12-10", "sports", "High School Gym", 50),
    new Event("Art Exhibition", "2025-11-25", "art", "Gallery Downtown", 200)
];

// Add event
function addEvent(name, date, category, location, maxSeats) {
    const newEvent = new Event(name, date, category, location, maxSeats);
    events.push(newEvent);
    updateUI();
    return newEvent;
}

// Register user
function registerUser(eventName, userName, userEmail) {
    const event = events.find(e => e.name === eventName);
    if (event && event.registerUser({ name: userName, email: userEmail })) {
        alert("Registration successful!");
        updateUI();
    } else {
        alert("Registration failed. No seats or event has passed.");
    }
}

// Update UI
function updateUI() {
    const eventsList = document.getElementById('eventsList');
    const selectedEvent = document.getElementById('selectedEvent');
    eventsList.innerHTML = '';
    selectedEvent.innerHTML = '';

    events.forEach(event => {
        if (event.checkAvailability()) {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Seats:</strong> ${event.availableSeats}/${event.maxSeats}</p>
            `;
            eventsList.appendChild(card);

            const option = document.createElement('option');
            option.value = event.name;
            option.textContent = event.name;
            selectedEvent.appendChild(option);
        }
    });
}

// Handle form submissions
document.getElementById('eventForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const category = document.getElementById('eventCategory').value;
    const location = document.getElementById('eventLocation').value;
    const maxSeats = parseInt(document.getElementById('eventSeats').value);

    addEvent(name, date, category, location, maxSeats);
    e.target.reset();
});

document.getElementById('registrationForm').addEventListener('submit', e => {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const selected = document.getElementById('selectedEvent').value;

    registerUser(selected, userName, userEmail);
    e.target.reset();
});

// Filter and search
$('#searchInput, #categoryFilter').on('input change', () => {
    const searchTerm = $('#searchInput').val().toLowerCase();
    const category = $('#categoryFilter').val();

    const filtered = events.filter(event =>
        event.checkAvailability() &&
        (category === 'all' || event.category === category) &&
        event.name.toLowerCase().includes(searchTerm)
    );

    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    filtered.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Seats:</strong> ${event.availableSeats}/${event.maxSeats}</p>
        `;
        eventsList.appendChild(card);
    });
});
