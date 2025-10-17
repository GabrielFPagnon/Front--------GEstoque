const BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3000';

async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path.startsWith('/') ? path : '/' + path}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const fetchOptions = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    credentials: options.credentials || 'include',
    body: options.body && typeof options.body === 'object' ? JSON.stringify(options.body) : options.body || undefined,
    mode: options.mode || 'cors',
    cache: options.cache || 'no-cache',
    ...options.fetchOverrides,
  };

  try {
    const res = await fetch(url, fetchOptions);
    const contentType = res.headers.get('content-type') || '';

    let data = null;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const err = new Error(data?.message || res.statusText || 'Erro na requisição');
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export { apiFetch, BASE };
