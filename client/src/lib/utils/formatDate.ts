export function formatDate(dateString: string | undefined): string {
  // Return empty string if dateString is undefined or empty
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}
