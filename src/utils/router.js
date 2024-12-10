const Router = {
    currentPath: window.location.pathname,
    subscribers: [], // Components to notify on navigation
  
    // Navigate to a new path
    navigate(path) {
      this.currentPath = path;
      updateURL(path);
      this.notifySubscribers();
    },
  
    // Subscribe a component to updates
    subscribe(callback) {
      this.subscribers.push(callback);
    },
  
    // Notify subscribers of changes
    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.currentPath));
    }
}

const updateURL = (pathName) => {
    var newurl = window.location.protocol + "//" + window.location.host + pathName;
    window.history.pushState({path:newurl},'',newurl);
}

export {
    Router
}