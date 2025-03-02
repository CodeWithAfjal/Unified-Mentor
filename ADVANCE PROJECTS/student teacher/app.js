// Register a new user (student or teacher)
function register() {
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const name = document.getElementById('name').value;
  const department = document.getElementById('department').value;
  const subject = document.getElementById('subject').value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          db.collection('users').doc(user.uid).set({
              name: name,
              department: department,
              subject: subject || '',
              role: subject ? 'teacher' : 'student'
          }).then(() => {
              window.location.href = 'dashboard.html';
          });
      })
      .catch((error) => {
          alert(error.message);
      });
}

// Login function
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          window.location.href = 'dashboard.html';
      })
      .catch((error) => {
          alert(error.message);
      });
}

// Logout function
function logout() {
  auth.signOut()
      .then(() => {
          window.location.href = 'index.html';
      })
      .catch((error) => {
          alert(error.message);
      });
}

// Populate teacher list for appointment booking
function searchTeacher() {
  db.collection('users').where('role', '==', 'teacher').get()
      .then((querySnapshot) => {
          const teacherSelect = document.getElementById('teacher-select');
          querySnapshot.forEach((doc) => {
              const teacher = doc.data();
              const option = document.createElement('option');
              option.value = doc.id;
              option.textContent = teacher.name;
              teacherSelect.appendChild(option);
          });
      });
}

// Book an appointment
function bookAppointment() {
  const teacherId = document.getElementById('teacher-select').value;
  const appointmentTime = document.getElementById('appointment-time').value;
  const message = document.getElementById('message').value;

  db.collection('appointments').add({
      studentId: auth.currentUser.uid,
      teacherId: teacherId,
      appointmentTime: appointmentTime,
      message: message,
      status: 'pending'
  }).then(() => {
      alert('Appointment booked successfully!');
  }).catch((error) => {
      alert(error.message);
  });
}
