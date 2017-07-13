# TodoMVC with Vue.js 2 + Webpack

[TodoMVC](http://todomvc.com/) implementation built to try Vue.js 2 using the [webpack-simple](https://github.com/vuejs-templates/webpack-simple) template. 

## Branches
* **master**: Basic implementation
* **bus**: Using a [central event bus](https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication)
* **vuex**: Using [Vuex](https://vuex.vuejs.org/en/)
* **Firebase**: Using [VueFire](https://github.com/vuejs/vuefire)
## Build Setup
### NPM
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
### Yarn
``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```

If you want to try the **Firebase** sample you'll need to set up the configuration values in *App.vue*:
```javascript
const firebaseConfig = {
  apiKey: "-------",
  authDomain: "-------",
  databaseURL: "-------",
  projectId: "-------",
  storageBucket: "-------",
  messagingSenderId: "-------"
}
```
with the values of your firebase app.

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
