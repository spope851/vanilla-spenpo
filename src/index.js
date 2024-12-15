import './styles.css';
import Sven from './utils/sven.js';
import { App } from './app.js';

Sven.createRoot(document.getElementById('vanilla-spenpo-root'));

Sven.render({ tag: App })
