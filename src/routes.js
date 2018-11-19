//import {} from ''

const errorLoading = (err) => {
    console.error('Failed')
}

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default)
}

export default function createRoutes (store) {

    return [
        {
            path: '/',
            name: 'home',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('./modules/Connected animation with ReactMotion and Redux/HomePage')
                ]);
                const renderRoute = loadModule(cb);
                importModules.then( ([component]) => {
                    renderRoute(component)
                });
                importModules.catch(errorLoading);
            }
        },{
            path: '/',
            name: 'item',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('./modules/Connected animation with ReactMotion and Redux/ItemPage')
                ]);
                const renderRoute = loadModule(cb);
                importModules.then( ([component]) => {
                    renderRoute(component)
                });
                importModules.catch(errorLoading);
            }
        }
    ]
}