let students = JSON.parse(localStorage.getItem('students')) || [];

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
      <td><button class="delete-btn" onclick="deleteStudent(${index})">Supprimer</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  renderTable();
}

document.getElementById('student-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const lastname = document.getElementById('lastname').value.trim();
  const firstname = document.getElementById('firstname').value.trim();
  const age = document.getElementById('age').value.trim();
  const course = document.getElementById('course').value.trim();

  if (lastname && firstname && age && course) {
    students.push({ lastname, firstname, age, course });
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    this.reset();
  }
});

renderTable();
