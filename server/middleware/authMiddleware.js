import jwt from 'jsonwebtoken';

export function protect(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Not authorized. Missing token.' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = {
      userId: decoded.userId,
      isAdmin: Boolean(decoded.isAdmin),
    };
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Not authorized. Invalid token.' });
  }
}
