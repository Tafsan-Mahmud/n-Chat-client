
export function maskEmail(email: string): string {
  // Find the index of the '@' symbol to separate the username from the domain.
  const atIndex = email.indexOf('@');
  
  // If no '@' is found, or it's at the beginning or end, return the original email.
  if (atIndex <= 1 || atIndex === email.length - 1) {
    return email;
  }

  const username = email.substring(0, atIndex);
  const domain = email.substring(atIndex);

  // If the username is 4 characters or less, just mask everything after the first character.
  if (username.length <= 4) {
    return username.charAt(0) + '****' + domain;
  }

  // Otherwise, show the first two characters, mask the middle, and show the last two.
  const firstTwoChars = username.substring(0, 2);
  const lastTwoChars = username.substring(username.length - 2);
  const maskedUsername = firstTwoChars + '****' + lastTwoChars;

  return maskedUsername + domain;
}