export const createAuthVoiceCommands = (formState, actions) => {
  const { 
    setField, 
    submitForm, 
    clearField,
    navigate 
  } = actions;

  return {
    // Field commands
    'set name': (name) => {
      setField('name', name);
      return `Name set to ${name}`;
    },
    
    'set email': (email) => {
      setField('email', email);
      return `Email set to ${email}`;
    },
    
    'set phone': (phone) => {
      setField('phone', phone);
      return `Phone set to ${phone}`;
    },
    
    'set password': (password) => {
      setField('password', password);
      return "Password set";
    },
    
    // Navigation for auth pages
    'go to login': () => {
      navigate('/login');
      return "Going to login";
    },
    
    'go to signup': () => {
      navigate('/signup');
      return "Going to sign up";
    },
    
    'go to forgot password': () => {
      navigate('/forgot-password');
      return "Going to forgot password";
    },
    
    // Form actions
    'submit': () => {
      submitForm();
      return "Submitting form";
    },
    
    'clear': () => {
      clearField();
      return "Field cleared";
    },
    
    'clear all': () => {
      // Clear all fields
      ['name', 'email', 'phone', 'password'].forEach(field => {
        setField(field, '');
      });
      return "All fields cleared";
    },
    
    // Help
    'auth help': () => {
      return "Say: set name [name], set email [email], set phone [phone], submit, or clear";
    }
  };
};