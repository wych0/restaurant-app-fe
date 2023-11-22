export const badgeClasses = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'bg-warning';
    case 'COMPLETED':
      return 'text-bg-success';
    case 'CANCELLED':
      return 'text-bg-danger';
    default:
      return 'text-bg-primary';
  }
};
