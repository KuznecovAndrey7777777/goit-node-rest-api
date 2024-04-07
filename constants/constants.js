export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const phoneRegexp = /^(\+?\d{1,3}\s?)?((\(\d{3}\))|\d{3})[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/;

export const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;