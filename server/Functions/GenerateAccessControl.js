const fs = require('fs');
const path = require('path');

const GenerateAccessControl = () => {
    const routesDir = path.join(__dirname, '../Routes');
    const accessControlFile = path.join(__dirname, '../Middlewares/AccessControl.json');

    let accessControl = { routes: [] };

    // Load existing access control file
    if (fs.existsSync(accessControlFile)) {
        accessControl = JSON.parse(fs.readFileSync(accessControlFile, 'utf-8'));
    }

    if (!Array.isArray(accessControl.routes)) {
        accessControl.routes = [];
    }

    const routeFiles = fs.readdirSync(routesDir).filter(file => file !== 'index.js');
    const routeDefinitions = [];

    // Extract routes from files
    routeFiles.forEach(file => {
        const filePath = path.join(routesDir, file);
        const routeModule = require(filePath);

        if (routeModule.stack) {
            routeModule.stack.forEach(layer => {
                if (layer.route) {
                    const routeDefinition = {
                        path: layer.route.path,
                        method: Object.keys(layer.route.methods)[0]?.toUpperCase() || 'GET', // Default to GET
                        requiresAuth: false, // Default to false
                        allowedAccessIds: [] // Default to empty
                    };
                    routeDefinitions.push(routeDefinition);
                }
            });
        }
    });

    // Remove unused routes
    accessControl.routes = accessControl.routes.filter(route =>
        routeDefinitions.some(def => def.path === route.path)
    );

    // Add new routes
    routeDefinitions.forEach(routeDef => {
        if (!accessControl.routes.some(route => route.path === routeDef.path)) {
            accessControl.routes.push(routeDef);
        }
    });

    // Write updated access control to file
    fs.writeFileSync(accessControlFile, JSON.stringify(accessControl, null, 4), 'utf-8');
    console.log('AccessControl.json has been generated/updated.');
};

GenerateAccessControl();

module.exports = GenerateAccessControl;
