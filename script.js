const modalOverlay = document.getElementById("modal-overlay");
const modalMessage = document.getElementById("modal-message");
const modalYesBtn = document.getElementById("modal-yes");
const modalNoBtn = document.getElementById("modal-no");

let modalConfirmCallback = null;

function showModal(message, onConfirm) {
  modalMessage.textContent = message;
  modalOverlay.classList.remove("hidden");

  modalConfirmCallback = () => {
    onConfirm();
    hideModal();
  };
}

function hideModal() {
  modalOverlay.classList.add("hidden");
  modalConfirmCallback = null;
}

modalYesBtn.addEventListener("click", () => {
  if (modalConfirmCallback) modalConfirmCallback();
});

modalNoBtn.addEventListener("click", hideModal);

let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

const form = document.getElementById('student-form');
const messageEl = document.getElementById('message');
const cancelEditBtn = document.getElementById('cancel-edit');
const editControls = document.getElementById('edit-controls');
const submitBtn = form.querySelector('button[type="submit"]');

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
  const student = students[index];
  showModal(
    `🗑️ Voulez-vous vraiment supprimer ${student.firstname} ${student.lastname} ?`,
    () => {
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      showMessage("Étudiant supprimé !");
      renderTable();
    }
  );
}



function editStudent(index) {
  const student = students[index];
  showModal(
    `✏️ Voulez-vous modifier les infos de ${student.firstname} ${student.lastname} ?`,
    () => {
      document.getElementById('lastname').value = student.lastname;
      document.getElementById('firstname').value = student.firstname;
      document.getElementById('age').value = student.age;
      document.getElementById('course').value = student.course;
      editIndex = index;

      submitBtn.textContent = "Modifier";
      editControls.style.display = "block";
    }
  );
}



cancelEditBtn.addEventListener('click', () => {
  form.reset();
  editIndex = null;
  submitBtn.textContent = "Ajouter";
  editControls.style.display = "none";
  messageEl.textContent = "";
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const lastname = document.getElementById('lastname').value.trim();
  const firstname = document.getElementById('firstname').value.trim();
  const age = document.getElementById('age').value.trim();
  const course = document.getElementById('course').value.trim();

  if (lastname && firstname && age && course) {
    const student = { lastname, firstname, age, course };

    if (editIndex !== null) {
      students[editIndex] = student;
      showMessage("✅ Étudiant modifié !");
      editIndex = null;
      submitBtn.textContent = "Ajouter";
      editControls.style.display = "none";
    } else {
      students.push(student);
      showMessage("✅ Étudiant ajouté !");
    }

    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    form.reset();
  }
});

function showMessage(text) {
  messageEl.textContent = text;
  setTimeout(() => {
    messageEl.textContent = "";
  }, 3000);
}

renderTable();
