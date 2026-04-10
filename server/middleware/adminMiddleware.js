export function requireAdmin(request, response, next) {
  if (!request.user?.isAdmin) {
    return response.status(403).json({ message: 'Admin access is required.' });
  }

  return next();
}
