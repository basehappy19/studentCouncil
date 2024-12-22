const fs = require('fs');
const path = require('path');

const GenerateAccessControl = () => {
    const routesDir = path.join(__dirname, '../Routes');
    const accessControlFile = path.join(__dirname, '../Middlewares/AccessControl.json');

    let accessControl = { routes: [] };

    if (fs.existsSync(accessControlFile)) {
        accessControl = JSON.parse(fs.readFileSync(accessControlFile, 'utf-8'));
    }

    if (!Array.isArray(accessControl.routes)) {
        accessControl.routes = [];
    }

    const routeFiles = fs.readdirSync(routesDir).filter(file => file !== 'index.js');
    const routePathsInRoutes = [];

    routeFiles.forEach(file => {
        const filePath = path.join(routesDir, file);
        const routeModule = require(filePath);

        if (routeModule.stack) {
            routeModule.stack.forEach(layer => {
                if (layer.route) {
                    const routePath = layer.route.path;
                    routePathsInRoutes.push(routePath);
                }
            });
        }
    });

    accessControl.routes = accessControl.routes.filter(route => routePathsInRoutes.includes(route.path));

    fs.writeFileSync(accessControlFile, JSON.stringify(accessControl, null, 4), 'utf-8');
    console.log('AccessControl.json has been generated/updated.');
}

GenerateAccessControl();

module.exports = GenerateAccessControl;
