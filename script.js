let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null; // Pour savoir si on modifie ou on ajoute

function renderTable() {
  const tbody = document.querySelector('#student-table tbody');
  tbody.innerHTML = '';

  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.lastname}</td>
      <td>${student.firstname}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>
        <button class="delete-btn" onclick="deleteStudent(${index})">Supprimer</button>
        <button class="edit-btn" onclick="editStudent(${index})">Modifier</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  renderTable();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById('lastname').value = student.lastname;
  document.getElementById('firstname').value = student.firstname;
  document.getElementById('age').value = student.age;
  document.getElementById('course').value = student.course;
  editIndex = index; // On retient qu'on est en mode modification
}

document.getElementById('student-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const lastname = document.getElementById('lastname').value.trim();
  const firstname = document.getElementById('firstname').value.trim();
  const age = document.getElementById('age').value.trim();
  const course = document.getElementById('course').value.trim();

  if (lastname && firstname && age && course) {
    const student = { lastname, firstname, age, course };

    if (editIndex !== null) {
      students[editIndex] = student;
      editIndex = null;
    } else {
      students.push(student);
    }

    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    this.reset();
  }
});

renderTable();
