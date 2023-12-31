/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
// import { extname } from 'path';

const RESOURCE_FILE_EXTENSIONS = ['.ico', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.css', '.js', '.json'];

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
const splitDeviceRe = /^([a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?([\s\S]*?)$/;
// Regex to split the tail part of the above into [*, dir, basename, ext]
const splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\/]+?|)(\.[^./\\]*|))(?:[\\/]*)$/;

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename: string) {
  // Separate device+slash from tail
  const result = splitDeviceRe.exec(filename),
    device = (result?.[1] || '') + (result?.[2] || ''),
    tail = result?.[3] || '';
  // Split the tail into dir, basename and extension
  const result2 = splitTailRe.exec(tail),
    dir = result2?.[1],
    basename = result2?.[2],
    ext = result2?.[3];
  return [device, dir, basename, ext];
}

function extname(path: string) {
  return win32SplitPath(path)[3];
};


function isResourceFile(filePath: string): boolean {
  const extension = extname(filePath)?.toLowerCase();

  return extension ? RESOURCE_FILE_EXTENSIONS.includes(extension) : false;
}

declare const self: ServiceWorkerGlobalScope;

interface IRouteMatchCallbackProps {
  request?: Request;
  url?: URL;
}

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: IRouteMatchCallbackProps) => {
    // If this isn't a navigation, skip.
    if (request?.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url?.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url?.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  // ({ url }: IRouteMatchCallbackProps) => url?.origin === self.location.origin && isResourceFile(url.pathname), // url.pathname.endsWith('.png'),
  ({ url }: IRouteMatchCallbackProps) => url && isResourceFile(url.pathname),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
