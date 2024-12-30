const studentForm = document.getElementById('studentForm');
const successMessage = document.getElementById('successMessage');

studentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {
        studentName: document.getElementById('student-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        parentName: document.getElementById('parent-name').value,
        parentPhone: document.getElementById('parent-phone').value,
        parentEmail: document.getElementById('parent-email').value,
        relationship: getSelectedRelationship()                                              
    };

    fetch('/register', {                                                                      
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'                                               
        },
        body: JSON.stringify(formData)                                                        
    })
    .then(response => response.text())                                                       
    .then(data => {
        successMessage.style.display = 'block';
        console.log(data);
    })
    .catch(error => console.error('Error:', error));                                         
});

function getSelectedRelationship() {
    const relationshipRadios = document.querySelectorAll('input[name="relationship"]');
    for (const radio of relationshipRadios) {                                                 
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}





