document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const satisfactionInput = document.querySelector('input[name="satisfaction"]:checked');
    const satisfactionLevel = satisfactionInput ? satisfactionInput.value : null; // Get satisfaction level or null if not selected

    // Check if satisfaction level is selected
    if (!satisfactionLevel) {
        document.getElementById('feedbackMessage').innerText = 'Please select a satisfaction level.';
        return;
    }

    // Create feedback object
    const feedback = {
        name: name,
        email: email,
        satisfaction: satisfactionLevel,
        message: message
    };

    // Retrieve feedbacks from local storage
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    // Add new feedback to array
    feedbacks.push(feedback);

    // Save updated feedbacks array to local storage
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    // Show success message
    document.getElementById('feedbackMessage').innerText = 'Thank you for your feedback!';

    // Clear form
    document.getElementById('feedbackForm').reset();

    // Log the current feedbacks in local storage
    console.log(JSON.parse(localStorage.getItem('feedbacks')));
});
