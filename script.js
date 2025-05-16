// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== EVENT HANDLING SECTION ====================
    
    // 1. Button Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    let clickCount = 0;
    
    clickBtn.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 1) {
            clickOutput.textContent = "Nice click! Try clicking again!";
        } else if (clickCount <= 5) {
            clickOutput.textContent = `You've clicked ${clickCount} times. Keep going!`;
        } else {
            clickOutput.textContent = `Wow! ${clickCount} clicks! You really like clicking, don't you?`;
        }
        
        // Add a brief animation effect
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 500);
    });
    
    // 2. Hover Effects
    const hoverBox = document.getElementById('hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Mouse entered the box! Feel the power!";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Mouse left the box. Come back soon!";
    });
    
    // 3. Keypress Detection
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    
    keyInput.addEventListener('keyup', function(event) {
        keyOutput.textContent = `Key pressed: "${event.key}" (Key code: ${event.keyCode})`;
        
        // Add some fun reactions to certain keys
        if (event.key === 'Enter') {
            keyOutput.textContent += " - You pressed Enter! Form submission, anyone?";
        } else if (event.key === ' ') {
            keyOutput.textContent += " - Space: the final frontier!";
        } else if (event.key === 'Escape') {
            keyOutput.textContent += " - Trying to escape? There's no escape from JavaScript!";
        }
    });
    
    // 4. Secret Action (Double-click)
    const secretBox = document.getElementById('secret-box');
    const secretOutput = document.getElementById('secret-output');
    
    secretBox.addEventListener('dblclick', function() {
        // Create a rainbow effect
        const originalBg = this.style.backgroundColor;
        const colors = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];
        let colorIndex = 0;
        
        secretOutput.textContent = "🎉 SECRET UNLOCKED! Rainbow mode activated!";
        
        const rainbowInterval = setInterval(() => {
            this.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 200);
        
        // Stop the rainbow effect after a few seconds
        setTimeout(() => {
            clearInterval(rainbowInterval);
            this.style.backgroundColor = originalBg;
            secretOutput.textContent = "Secret rainbow mode deactivated. Double-click again to see it!";
        }, 3000);
    });
    
    // ==================== INTERACTIVE ELEMENTS SECTION ====================
    
    // 1. Color Changer
    const colorBtns = document.querySelectorAll('.color-btn');
    const colorDisplay = document.getElementById('color-display');
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            colorDisplay.style.backgroundColor = color;
            colorDisplay.style.color = '#fff';
            colorDisplay.textContent = `Color changed to ${this.textContent}!`;
            
            // Add a transition effect
            colorDisplay.style.transition = 'background-color 0.5s ease';
        });
    });
    
    // 2. Image Gallery
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.thumb');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Get the source from data attribute and update main image
            const imgSrc = this.getAttribute('data-src');
            
            // Add a fade-out effect
            mainImage.style.opacity = '0';
            
            // Change the image after fade-out
            setTimeout(() => {
                mainImage.src = imgSrc;
                // Fade in
                mainImage.style.opacity = '1';
            }, 300);
        });
    });
    
    // Set the first thumbnail as active by default
    thumbs[0].classList.add('active');
    
    // Add transition to main image for smooth fade effect
    mainImage.style.transition = 'opacity 0.3s ease';
    
    // 3. Tabbed Content
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ==================== FORM VALIDATION SECTION ====================
    
    const form = document.getElementById('validation-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const formStatus = document.getElementById('form-status');
    
    // Password requirement elements
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqLowercase = document.getElementById('req-lowercase');
    const reqNumber = document.getElementById('req-number');
    
    // Real-time username validation
    username.addEventListener('input', function() {
        const feedback = this.nextElementSibling;
        
        if (this.value.trim() === '') {
            feedback.textContent = 'Username is required';
            feedback.className = 'feedback error';
        } else if (this.value.length < 3) {
            feedback.textContent = 'Username must be at least 3 characters';
            feedback.className = 'feedback error';
        } else {
            feedback.textContent = 'Username looks good!';
            feedback.className = 'feedback success';
        }
    });
    
    // Real-time email validation
    email.addEventListener('input', function() {
        const feedback = this.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            feedback.textContent = 'Email is required';
            feedback.className = 'feedback error';
        } else if (!emailRegex.test(this.value)) {
            feedback.textContent = 'Please enter a valid email address';
            feedback.className = 'feedback error';
        } else {
            feedback.textContent = 'Email looks good!';
            feedback.className = 'feedback success';
        }
    });
    
    // Real-time password validation with requirements list
    password.addEventListener('input', function() {
        const feedback = this.nextElementSibling;
        const passwordValue = this.value;
        
        // Check for empty password
        if (passwordValue.trim() === '') {
            feedback.textContent = 'Password is required';
            feedback.className = 'feedback error';
        } else {
            // Update visual requirements list
            const hasLength = passwordValue.length >= 8;
            const hasUppercase = /[A-Z]/.test(passwordValue);
            const hasLowercase = /[a-z]/.test(passwordValue);
            const hasNumber = /[0-9]/.test(passwordValue);
            
            // Update each requirement visually
            toggleRequirement(reqLength, hasLength);
            toggleRequirement(reqUppercase, hasUppercase);
            toggleRequirement(reqLowercase, hasLowercase);
            toggleRequirement(reqNumber, hasNumber);
            
            // Check overall password validity
            if (hasLength && hasUppercase && hasLowercase && hasNumber) {
                feedback.textContent = 'Password meets all requirements!';
                feedback.className = 'feedback success';
            } else {
                feedback.textContent = 'Password does not meet all requirements';
                feedback.className = 'feedback error';
            }
        }
        
        // Check password confirmation match if it has a value
        if (confirmPassword.value) {
            validatePasswordConfirmation();
        }
    });
    
    // Helper function to toggle requirement visual state
    function toggleRequirement(element, valid) {
        if (valid) {
            element.classList.add('valid');
            element.innerHTML = `✅ ${element.textContent}`;
        } else {
            element.classList.remove('valid');
            element.innerHTML = element.textContent.replace('✅ ', '');
        }
    }
    
    // Real-time password confirmation validation
    confirmPassword.addEventListener('input', validatePasswordConfirmation);
    
    function validatePasswordConfirmation() {
        const feedback = confirmPassword.nextElementSibling;
        
        if (confirmPassword.value === '') {
            feedback.textContent = 'Please confirm your password';
            feedback.className = 'feedback error';
        } else if (confirmPassword.value !== password.value) {
            feedback.textContent = 'Passwords do not match';
            feedback.className = 'feedback error';
        } else {
            feedback.textContent = 'Passwords match!';
            feedback.className = 'feedback success';
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if all fields are valid
        const usernameValid = username.value.trim() !== '' && username.value.length >= 3;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        
        const passwordValue = password.value;
        const passwordValid = 
            passwordValue.length >= 8 && 
            /[A-Z]/.test(passwordValue) && 
            /[a-z]/.test(passwordValue) && 
            /[0-9]/.test(passwordValue);
        
        const confirmValid = confirmPassword.value === password.value;
        
        if (usernameValid && emailValid && passwordValid && confirmValid) {
            // Success - all fields are valid
            formStatus.textContent = 'Form submitted successfully! 🎉';
            formStatus.className = 'form-status success';
            
            // Reset form after successful submission (in a real app, you'd send data to a server)
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.feedback').forEach(f => {
                    f.textContent = '';
                    f.className = 'feedback';
                });
                
                // Reset password requirements visual state
                reqLength.classList.remove('valid');
                reqUppercase.classList.remove('valid');
                reqLowercase.classList.remove('valid');
                reqNumber.classList.remove('valid');
                
                reqLength.textContent = reqLength.textContent.replace('✅ ', '');
                reqUppercase.textContent = reqUppercase.textContent.replace('✅ ', '');
                reqLowercase.textContent = reqLowercase.textContent.replace('✅ ', '');
                reqNumber.textContent = reqNumber.textContent.replace('✅ ', '');
                
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                });
            }
            });
        });
        // ==================== END OF SCRIPT ====================