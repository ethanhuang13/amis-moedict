let moedictDesktop = {};
if (window) {
  if (window.moedictDesktop) {
    moedictDesktop = window.moedictDesktop;
  } else {
    window.moedictDesktop = moedictDesktop;
  }
}
export { moedictDesktop };

let isMoedictDesktop = false;
if (window && window.moedictDesktop) {
  window.isMoedictDesktop = isMoedictDesktop = true;
}
export { isMoedictDesktop };

let currentId = null;

export function getCurrentId() {
  return currentId;
}

export function setCurrentId(id) {
  return currentId = id;
}

export const replace = function(...args) {
  return ''.replace.call(...args);
}

export function http(path) {
  let httpMap = {
    a: '203146b5091e8f0aafda-15d41c68795720c6e932125f5ace0c70.ssl.cf1.rackcdn.com',
    h: 'a7ff62cf9d5b13408e72-351edcddf20c69da65316dd74d25951e.ssl.cf1.rackcdn.com',
    t: '1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com',
    'stroke-json': '829091573dd46381a321-9e8a43b8d3436eaf4353af683c892840.ssl.cf1.rackcdn.com',
    stroke: '/626a26a628fa127d6a25-47cac8eba79cfb787dbcc3e49a1a65f1.ssl.cf1.rackcdn.com',
  };
  if (isMoedictDesktop) {
    for (const k in moedictDesktop.voices) {
      const v = moedictDesktop.voices[k];
      httpMap[k] = v;
    }
  }

  let protocol = 'http';
  if (!isMoedictDesktop) {
    protocol = 'https';
  }
  if (!(path.match(/^([^.]+)\.[^\/]+/)[1] in moedictDesktop.voices)) {
    protocol = 'https';
  }

  return `${protocol}://${ path.replace( /^([^.]+)\.[^\/]+/, (xs, x) => httpMap[x] || xs ) }`
}
