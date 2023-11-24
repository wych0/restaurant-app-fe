export const badgeClasses = (condition: any): string => {
  switch (condition) {
    case 'PENDING':
      return 'bg-warning';
    case 'COMPLETED':
      return 'text-bg-success';
    case 'CANCELLED':
      return 'text-bg-danger';
    case false:
      return 'text-bg-danger';
    case true:
      return 'text-bg-success';
    default:
      return 'text-bg-primary';
  }
};
