// Function to load an external HTML file into a container
function loadComponent(path, containerId) {
  fetch(`${path}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${path}.html: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(containerId).innerHTML = html;

      // Load CSS file
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = `${path}.css`;
      document.head.appendChild(cssLink);

      // Load JavaScript file
      const script = document.createElement("script");
      script.src = `${path}.js`;
      document.body.appendChild(script);
    })
    .catch((error) => console.error(error));
}

// Load Navbar and Hero Section
loadComponent("Component/nav/nav", "nav");
loadComponent("Component/hero/hero", "hero");
