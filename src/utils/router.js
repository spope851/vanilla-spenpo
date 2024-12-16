const Router = {
    currentPath: window.location.pathname,
    subscribers: {}, // Components to notify on navigation
  
    // Subscribe a component to updates
    subscribe(callback, key) {
      this.subscribers[key] = callback;
    },
  
    // Notify subscribers of changes
    notifySubscribers() {
        Object.values(this.subscribers).forEach(callback => callback(this.currentPath));
    }
}

const updateURL = (pathName) => {
    var newurl = window.location.protocol + "//" + window.location.host + pathName;
    window.history.pushState({path:newurl},'',newurl);
}

const navigate = (path) => {
  Router.currentPath = path;
  updateURL(path);
  Router.notifySubscribers();
}

export default Router
export {
    navigate
}