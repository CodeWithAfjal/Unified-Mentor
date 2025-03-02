// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register User
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Registered successfully!');
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Login User
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Login successful!');
      // Redirect to categories section after login
      window.location.href = "#categories";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Fetch Business Categories from Firebase
const loadCategories = async () => {
  const categoriesRef = db.collection('categories');
  const snapshot = await categoriesRef.get();
  const categoryList = document.getElementById('category-list');
  
  snapshot.forEach(doc => {
    const category = doc.data();
    const div = document.createElement('div');
    div.className = 'category';
    div.textContent = category.name;
    categoryList.appendChild(div);
  });
};

// Call loadCategories when the page is ready
document.addEventListener('DOMContentLoaded', loadCategories);
