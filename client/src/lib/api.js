function normalizeApiBaseUrl(value) {
  const fallbackBaseUrl = '/api';

  if (!value) {
    return fallbackBaseUrl;
  }

  try {
    const parsedUrl = new URL(value, window.location.origin);
    const apiRootIndex = parsedUrl.pathname.indexOf('/api');

    if (apiRootIndex === -1) {
      return `${parsedUrl.origin}${parsedUrl.pathname.replace(/\/+$/, '')}` || fallbackBaseUrl;
    }

    const apiPath = parsedUrl.pathname.slice(apiRootIndex).split('/').slice(0, 2).join('/');
    const normalizedPath = apiPath || fallbackBaseUrl;

    return parsedUrl.origin === window.location.origin
      ? normalizedPath
      : `${parsedUrl.origin}${normalizedPath}`;
  } catch {
    const trimmedValue = value.trim().replace(/\/+$/, '');
    const apiRootIndex = trimmedValue.indexOf('/api');

    if (apiRootIndex === -1) {
      return trimmedValue || fallbackBaseUrl;
    }

    return trimmedValue.slice(apiRootIndex).split('/').slice(0, 2).join('/') || fallbackBaseUrl;
  }
}

function isLoopbackHostname(hostname) {
  return ['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostname);
}

function isSameDevOrigin(parsedUrl) {
  const currentUrl = new URL(window.location.origin);

  if (parsedUrl.origin === currentUrl.origin) {
    return true;
  }

  return (
    parsedUrl.protocol === currentUrl.protocol &&
    parsedUrl.port === currentUrl.port &&
    isLoopbackHostname(parsedUrl.hostname) &&
    isLoopbackHostname(currentUrl.hostname)
  );
}

function buildApiUrl(path) {
  const normalizedBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  try {
    const parsedBaseUrl = new URL(normalizedBaseUrl, window.location.origin);
    const apiUrl = `${parsedBaseUrl.origin}${parsedBaseUrl.pathname.replace(/\/+$/, '')}${normalizedPath}`;

    if (isSameDevOrigin(parsedBaseUrl)) {
      return `${parsedBaseUrl.pathname.replace(/\/+$/, '')}${normalizedPath}`;
    }

    return apiUrl;
  } catch {
    return `${normalizedBaseUrl.replace(/\/+$/, '')}${normalizedPath}`;
  }
}

export async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  const requestUrl = buildApiUrl(path);

  let response;

  try {
    response = await fetch(requestUrl, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch (error) {
    throw new Error(
      'Cannot reach the backend server. Start `npm run server` and make sure MongoDB is running.',
    );
  }

  const rawBody = await response.text().catch(() => '');
  let data = {};

  if (rawBody) {
    try {
      data = JSON.parse(rawBody);
    } catch (error) {
      data = { message: rawBody };
    }
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        `Request failed with status ${response.status} from ${response.url || requestUrl}.`,
    );
  }

  return data;
}
