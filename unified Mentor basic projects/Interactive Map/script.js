// Initializing the map using Leaflet.js
const map = L.map('map').setView([51.505, -0.09], 13);  // Default center and zoom level

// Adding OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example Locations (Markers)
const locations = [
  {
    name: "Central Park",
    description: "A large public park in New York City.",
    coordinates: [40.785091, -73.968285],
    category: "Park"
  },
  {
    name: "Eiffel Tower",
    description: "A wrought-iron lattice tower on the Champ de Mars in Paris.",
    coordinates: [48.8584, 2.2945],
    category: "Landmark"
  },
  {
    name: "Louvre Museum",
    description: "The world's largest art museum and a historic monument in Paris.",
    coordinates: [48.8606, 2.3376],
    category: "Museum"
  },
  {
    name: "Tokyo Tower",
    description: "A communications and observation tower in Tokyo.",
    coordinates: [35.6586, 139.7454],
    category: "Landmark"
  },
  {
    name: "Grand Canyon",
    description: "A famous canyon in the United States.",
    coordinates: [36.1069, -112.1129],
    category: "Natural Wonder"
  }
];

// Function to add markers to the map
locations.forEach(location => {
  const marker = L.marker(location.coordinates).addTo(map);
  marker.bindPopup(`
    <strong>${location.name}</strong><br>
    ${location.description}
  `);
});

// Search functionality
document.getElementById('search-btn').addEventListener('click', function () {
  const searchQuery = document.getElementById('search-bar').value.toLowerCase();
  const foundLocation = locations.find(loc =>
    loc.name.toLowerCase().includes(searchQuery)
  );
  
  if (foundLocation) {
    map.setView(foundLocation.coordinates, 13);
    L.marker(foundLocation.coordinates).addTo(map)
      .bindPopup(`
        <strong>${foundLocation.name}</strong><br>
        ${foundLocation.description}
      `).openPopup();
  } else {
    alert("Location not found!");
  }
});

// Make the map responsive
window.addEventListener('resize', function () {
  map.invalidateSize();
});
