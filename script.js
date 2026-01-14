// Validación contraseña fuerte
function validarContraseña(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

// Registro de usuario
const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const country = document.getElementById('country').value;

    if(!validarContraseña(password)){
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }

    // Guardar usuario en localStorage (simula base de datos)
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({username,email,password,role,country});
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registro exitoso!");
    registerForm.reset();
  });
}

// Denuncias internas
const reportForm = document.getElementById('reportForm');
if(reportForm){
  reportForm.addEventListener('submit', function(e){
    e.preventDefault();
    const reportText = document.getElementById('reportText').value;

    let reports = JSON.parse(localStorage.getItem('reports') || '[]');
    reports.push({text: reportText, date: new Date()});
    localStorage.setItem('reports', JSON.stringify(reports));

    alert("Denuncia enviada, solo visible para administrador.");
    reportForm.reset();
  });
}

// Mostrar denuncias en admin
const reportsList = document.getElementById('reportsList');
if(reportsList){
  let reports = JSON.parse(localStorage.getItem('reports') || '[]');
  if(reports.length > 0){
    reportsList.innerHTML = "";
    reports.forEach((r,i)=>{
      reportsList.innerHTML += `<p>${i+1}. ${r.text} (${r.date})</p>`;
    });
  }
}
