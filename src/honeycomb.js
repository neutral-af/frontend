export function trackEvent (name, data) {
  if (!process.env.VUE_APP_HONEYCOMB_PUBLIC_KEY) {
    return Promise.resolve()
  }

  const event = {
    name,
    service_name: 'web-frontend',
    ...window && { user_agent: window.navigator.userAgent },
    ...data
  }

  return fetch('https://api.honeycomb.io/1/events/' + encodeURIComponent('carbonara-backend'), {
    method: 'POST',
    headers: {
      'X-Honeycomb-Team': process.env.VUE_APP_HONEYCOMB_PUBLIC_KEY
    },
    body: JSON.stringify(event)
  })
}
