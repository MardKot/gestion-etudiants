let students = JSON.parse(localStorage.getItem('students')) || [];

function renderTable() {
  const tbody = document.querySelector('#student-table tbody');
  tbody.innerHTML = '';

  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
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
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const course = document.getElementById('course').value.trim();

  if (name && age && course) {
    students.push({ name, age, course });
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    this.reset();
  }
});

renderTable();

