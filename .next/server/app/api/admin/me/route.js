"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/me/route";
exports.ids = ["app/api/admin/me/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fme%2Froute&page=%2Fapi%2Fadmin%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fme%2Froute.ts&appDir=D%3A%5Croyal-auto-collision%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Croyal-auto-collision&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fme%2Froute&page=%2Fapi%2Fadmin%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fme%2Froute.ts&appDir=D%3A%5Croyal-auto-collision%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Croyal-auto-collision&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_royal_auto_collision_app_api_admin_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/me/route.ts */ \"(rsc)/./app/api/admin/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/me/route\",\n        pathname: \"/api/admin/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/me/route\"\n    },\n    resolvedPagePath: \"D:\\\\royal-auto-collision\\\\app\\\\api\\\\admin\\\\me\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_royal_auto_collision_app_api_admin_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/me/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNC4yLjMzX3JlYWN0LWRvbUAxOC4zLjFfcmVhY3RAMTguMy4xX19yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyLmpzP25hbWU9YXBwJTJGYXBpJTJGYWRtaW4lMkZtZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZtZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGbWUlMkZyb3V0ZS50cyZhcHBEaXI9RCUzQSU1Q3JveWFsLWF1dG8tY29sbGlzaW9uJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDcm95YWwtYXV0by1jb2xsaXNpb24maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ087QUFDcEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3lhbC1hdXRvLWNvbGxpc2lvbi8/Mzk3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxyb3lhbC1hdXRvLWNvbGxpc2lvblxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXG1lXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9tZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL21lXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9tZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkQ6XFxcXHJveWFsLWF1dG8tY29sbGlzaW9uXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcbWVcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FkbWluL21lL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fme%2Froute&page=%2Fapi%2Fadmin%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fme%2Froute.ts&appDir=D%3A%5Croyal-auto-collision%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Croyal-auto-collision&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/me/route.ts":
/*!***********************************!*\
  !*** ./app/api/admin/me/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _lib_models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/models/User */ \"(rsc)/./lib/models/User.ts\");\n\n\n\n\nasync function GET(req) {\n    try {\n        const payload = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.requireAdmin)(req);\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__.dbConnect)();\n        const user = await _lib_models_User__WEBPACK_IMPORTED_MODULE_3__.User.findById(payload.sub).select(\"email role createdAt\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(user);\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: e.message || \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL21lL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXdEO0FBQ2Q7QUFDQTtBQUNEO0FBRWxDLGVBQWVJLElBQUlDLEdBQWdCO0lBQ3hDLElBQUk7UUFDRixNQUFNQyxVQUFVTCx1REFBWUEsQ0FBQ0k7UUFDN0IsTUFBTUgsdURBQVNBO1FBQ2YsTUFBTUssT0FBTyxNQUFNSixrREFBSUEsQ0FBQ0ssUUFBUSxDQUFDRixRQUFRRyxHQUFHLEVBQUVDLE1BQU0sQ0FBQztRQUNyRCxPQUFPVixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDSjtJQUMzQixFQUFFLE9BQU9LLEdBQVE7UUFDZixPQUFPWixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQUVFLFNBQVNELEVBQUVDLE9BQU8sSUFBSTtRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25GO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3lhbC1hdXRvLWNvbGxpc2lvbi8uL2FwcC9hcGkvYWRtaW4vbWUvcm91dGUudHM/MGE5ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHJlcXVpcmVBZG1pbiB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XHJcbmltcG9ydCB7IGRiQ29ubmVjdCB9IGZyb20gXCJAL2xpYi9tb25nb2RiXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiQC9saWIvbW9kZWxzL1VzZXJcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gcmVxdWlyZUFkbWluKHJlcSk7XHJcbiAgICBhd2FpdCBkYkNvbm5lY3QoKTtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHBheWxvYWQuc3ViKS5zZWxlY3QoXCJlbWFpbCByb2xlIGNyZWF0ZWRBdFwiKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1c2VyKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IGUubWVzc2FnZSB8fCBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJyZXF1aXJlQWRtaW4iLCJkYkNvbm5lY3QiLCJVc2VyIiwiR0VUIiwicmVxIiwicGF5bG9hZCIsInVzZXIiLCJmaW5kQnlJZCIsInN1YiIsInNlbGVjdCIsImpzb24iLCJlIiwibWVzc2FnZSIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   requireAdmin: () => (/* binding */ requireAdmin),\n/* harmony export */   signJwt: () => (/* binding */ signJwt),\n/* harmony export */   verifyJwt: () => (/* binding */ verifyJwt)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"\";\nfunction signJwt(payload, expiresIn = \"7d\") {\n    if (!JWT_SECRET) throw new Error(\"JWT_SECRET is missing. Set it in your .env file.\");\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {\n        expiresIn\n    });\n}\nfunction verifyJwt(token) {\n    try {\n        if (!JWT_SECRET) throw new Error(\"JWT_SECRET is missing\");\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n    } catch  {\n        return null;\n    }\n}\nfunction requireAdmin(req) {\n    const auth = req.headers.get(\"authorization\") || \"\";\n    const token = auth.startsWith(\"Bearer \") ? auth.slice(7) : null;\n    if (!token) throw new Error(\"Missing token\");\n    const payload = verifyJwt(token);\n    if (!payload || payload.role !== \"admin\") throw new Error(\"Unauthorized\");\n    return payload;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUErQjtBQUcvQixNQUFNQyxhQUFhLFFBQVNFLEdBQUcsQ0FBQ0YsVUFBVSxJQUEyQjtBQUk5RCxTQUFTRyxRQUFRQyxPQUFtQixFQUFFQyxZQUFZLElBQUk7SUFDM0QsSUFBSSxDQUFDTCxZQUFZLE1BQU0sSUFBSU0sTUFBTTtJQUNqQyxPQUFPUCx3REFBUSxDQUFDSyxTQUFTSixZQUFZO1FBQUVLO0lBQVU7QUFDbkQ7QUFFTyxTQUFTRyxVQUFVQyxLQUFhO0lBQ3JDLElBQUk7UUFDRixJQUFJLENBQUNULFlBQVksTUFBTSxJQUFJTSxNQUFNO1FBQ2pDLE9BQU9QLDBEQUFVLENBQUNVLE9BQU9UO0lBQzNCLEVBQ0EsT0FBTTtRQUFFLE9BQU87SUFBTTtBQUN2QjtBQUVPLFNBQVNXLGFBQWFDLEdBQWdCO0lBQzNDLE1BQU1DLE9BQU9ELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG9CQUFvQjtJQUNqRCxNQUFNTixRQUFRSSxLQUFLRyxVQUFVLENBQUMsYUFBYUgsS0FBS0ksS0FBSyxDQUFDLEtBQUs7SUFDM0QsSUFBSSxDQUFDUixPQUFPLE1BQU0sSUFBSUgsTUFBTTtJQUM1QixNQUFNRixVQUFVSSxVQUFVQztJQUMxQixJQUFJLENBQUNMLFdBQVdBLFFBQVFjLElBQUksS0FBSyxTQUFTLE1BQU0sSUFBSVosTUFBTTtJQUMxRCxPQUFPRjtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm95YWwtYXV0by1jb2xsaXNpb24vLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuY29uc3QgSldUX1NFQ1JFVCA9IChwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgfHwgXCJcIjtcblxyXG5leHBvcnQgdHlwZSBKd3RQYXlsb2FkID0geyBzdWI6IHN0cmluZzsgZW1haWw6IHN0cmluZzsgcm9sZTogXCJhZG1pblwiIHwgXCJ1c2VyXCIgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25Kd3QocGF5bG9hZDogSnd0UGF5bG9hZCwgZXhwaXJlc0luID0gXCI3ZFwiKSB7XG4gIGlmICghSldUX1NFQ1JFVCkgdGhyb3cgbmV3IEVycm9yKFwiSldUX1NFQ1JFVCBpcyBtaXNzaW5nLiBTZXQgaXQgaW4geW91ciAuZW52IGZpbGUuXCIpO1xuICByZXR1cm4gand0LnNpZ24ocGF5bG9hZCwgSldUX1NFQ1JFVCwgeyBleHBpcmVzSW4gfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlKd3QodG9rZW46IHN0cmluZyk6IEp3dFBheWxvYWQgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBpZiAoIUpXVF9TRUNSRVQpIHRocm93IG5ldyBFcnJvcihcIkpXVF9TRUNSRVQgaXMgbWlzc2luZ1wiKTtcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCkgYXMgSnd0UGF5bG9hZDtcbiAgfVxuICBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlQWRtaW4ocmVxOiBOZXh0UmVxdWVzdCk6IEp3dFBheWxvYWQge1xuICBjb25zdCBhdXRoID0gcmVxLmhlYWRlcnMuZ2V0KFwiYXV0aG9yaXphdGlvblwiKSB8fCBcIlwiO1xuICBjb25zdCB0b2tlbiA9IGF1dGguc3RhcnRzV2l0aChcIkJlYXJlciBcIikgPyBhdXRoLnNsaWNlKDcpIDogbnVsbDtcbiAgaWYgKCF0b2tlbikgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyB0b2tlblwiKTtcbiAgY29uc3QgcGF5bG9hZCA9IHZlcmlmeUp3dCh0b2tlbik7XG4gIGlmICghcGF5bG9hZCB8fCBwYXlsb2FkLnJvbGUgIT09IFwiYWRtaW5cIikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICByZXR1cm4gcGF5bG9hZDtcbn1cbiJdLCJuYW1lcyI6WyJqd3QiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsInNpZ25Kd3QiLCJwYXlsb2FkIiwiZXhwaXJlc0luIiwiRXJyb3IiLCJzaWduIiwidmVyaWZ5Snd0IiwidG9rZW4iLCJ2ZXJpZnkiLCJyZXF1aXJlQWRtaW4iLCJyZXEiLCJhdXRoIiwiaGVhZGVycyIsImdldCIsInN0YXJ0c1dpdGgiLCJzbGljZSIsInJvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/models/User.ts":
/*!****************************!*\
  !*** ./lib/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true,\n        trim: true\n    },\n    passwordHash: {\n        type: String,\n        required: true\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"user\"\n        ],\n        default: \"user\"\n    }\n}, {\n    timestamps: true\n});\n// Always reuse existing model if it was compiled already\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGFBQWEsSUFBSUQsd0RBQWUsQ0FDcEM7SUFDRUcsT0FBTztRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLFFBQVE7UUFBTUMsV0FBVztRQUFNQyxNQUFNO0lBQUs7SUFDakZDLGNBQWM7UUFBRU4sTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQzdDSyxNQUFNO1FBQUVQLE1BQU1DO1FBQVFPLE1BQU07WUFBQztZQUFTO1NBQU87UUFBRUMsU0FBUztJQUFPO0FBQ2pFLEdBQ0E7SUFBRUMsWUFBWTtBQUFLO0FBR3JCLHlEQUF5RDtBQUNsRCxNQUFNQyxPQUNYLHdEQUFnQixDQUFDQSxJQUFJLElBQ3JCZixxREFBYyxDQUFDLFFBQVFDLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3lhbC1hdXRvLWNvbGxpc2lvbi8uL2xpYi9tb2RlbHMvVXNlci50cz9iNGFiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gIHtcclxuICAgIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSwgbG93ZXJjYXNlOiB0cnVlLCB0cmltOiB0cnVlIH0sXHJcbiAgICBwYXNzd29yZEhhc2g6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgcm9sZTogeyB0eXBlOiBTdHJpbmcsIGVudW06IFtcImFkbWluXCIsIFwidXNlclwiXSwgZGVmYXVsdDogXCJ1c2VyXCIgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG4vLyBBbHdheXMgcmV1c2UgZXhpc3RpbmcgbW9kZWwgaWYgaXQgd2FzIGNvbXBpbGVkIGFscmVhZHlcclxuZXhwb3J0IGNvbnN0IFVzZXIgPVxyXG4gIChtb25nb29zZS5tb2RlbHMuVXNlciBhcyBtb25nb29zZS5Nb2RlbDxhbnk+KSB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsKFwiVXNlclwiLCBVc2VyU2NoZW1hKTtcclxuXHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJlbWFpbCIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInVuaXF1ZSIsImxvd2VyY2FzZSIsInRyaW0iLCJwYXNzd29yZEhhc2giLCJyb2xlIiwiZW51bSIsImRlZmF1bHQiLCJ0aW1lc3RhbXBzIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/User.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dbConnect: () => (/* binding */ dbConnect)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nlet cached = global.mongoose;\nif (!cached) cached = global.mongoose = {\n    conn: null,\n    promise: null\n};\nasync function dbConnect() {\n    if (!MONGODB_URI) {\n        throw new Error(\"MONGODB_URI is missing. Set it in your .env file.\");\n    }\n    if (cached.conn) return cached.conn;\n    if (!cached.promise) {\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            dbName: \"royal_auto_collision\"\n        }).then((m)=>m);\n    }\n    cached.conn = await cached.promise;\n    return cached.conn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRTNDLElBQUlHLFNBQVMsT0FBZ0JKLFFBQVE7QUFLckMsSUFBSSxDQUFDSSxRQUFRQSxTQUFTLE9BQWdCSixRQUFRLEdBQUc7SUFBRU0sTUFBTTtJQUFNQyxTQUFTO0FBQUs7QUFFdEUsZUFBZUM7SUFDcEIsSUFBSSxDQUFDUCxhQUFhO1FBQ2hCLE1BQU0sSUFBSVEsTUFBTTtJQUNsQjtJQUNBLElBQUlMLE9BQU9FLElBQUksRUFBRSxPQUFPRixPQUFPRSxJQUFJO0lBQ25DLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ25CSCxPQUFPRyxPQUFPLEdBQUdQLHVEQUNQLENBQUNDLGFBQWE7WUFBRVUsUUFBUTtRQUF1QixHQUN0REMsSUFBSSxDQUFDLENBQUNDLElBQU1BO0lBQ2pCO0lBQ0FULE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ2xDLE9BQU9ILE9BQU9FLElBQUk7QUFDcEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3lhbC1hdXRvLWNvbGxpc2lvbi8uL2xpYi9tb25nb2RiLnRzPzA1YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcblxyXG5sZXQgY2FjaGVkID0gKGdsb2JhbCBhcyBhbnkpLm1vbmdvb3NlIGFzIHtcclxuICBjb25uOiB0eXBlb2YgbW9uZ29vc2UgfCBudWxsO1xyXG4gIHByb21pc2U6IFByb21pc2U8dHlwZW9mIG1vbmdvb3NlPiB8IG51bGw7XHJcbn07XHJcblxyXG5pZiAoIWNhY2hlZCkgY2FjaGVkID0gKGdsb2JhbCBhcyBhbnkpLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGJDb25uZWN0KCkge1xuICBpZiAoIU1PTkdPREJfVVJJKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTU9OR09EQl9VUkkgaXMgbWlzc2luZy4gU2V0IGl0IGluIHlvdXIgLmVudiBmaWxlLlwiKTtcbiAgfVxuICBpZiAoY2FjaGVkLmNvbm4pIHJldHVybiBjYWNoZWQuY29ubjtcbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2VcbiAgICAgIC5jb25uZWN0KE1PTkdPREJfVVJJLCB7IGRiTmFtZTogXCJyb3lhbF9hdXRvX2NvbGxpc2lvblwiIH0pXG4gICAgICAudGhlbigobSkgPT4gbSk7XG4gIH1cbiAgY2FjaGVkLmNvbm4gPSBhd2FpdCBjYWNoZWQucHJvbWlzZTtcbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJFcnJvciIsImNvbm5lY3QiLCJkYk5hbWUiLCJ0aGVuIiwibSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/semver@7.7.3","vendor-chunks/jsonwebtoken@9.0.2","vendor-chunks/jws@3.2.2","vendor-chunks/ecdsa-sig-formatter@1.0.11","vendor-chunks/safe-buffer@5.2.1","vendor-chunks/ms@2.1.3","vendor-chunks/lodash.once@4.1.1","vendor-chunks/lodash.isstring@4.0.1","vendor-chunks/lodash.isplainobject@4.0.6","vendor-chunks/lodash.isnumber@3.0.3","vendor-chunks/lodash.isinteger@4.0.4","vendor-chunks/lodash.isboolean@3.0.3","vendor-chunks/lodash.includes@4.3.0","vendor-chunks/jwa@1.4.2","vendor-chunks/buffer-equal-constant-time@1.0.1"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@14.2.33_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fme%2Froute&page=%2Fapi%2Fadmin%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fme%2Froute.ts&appDir=D%3A%5Croyal-auto-collision%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Croyal-auto-collision&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();