#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const camel_case_1 = require("camel-case");
const templates_1 = require("./templates");
const createBoilerplateFile = ({ fullPath, componentName, template, }) => {
    (0, fs_1.writeFileSync)(fullPath, template.replace(/{{COMPONENT_NAME}}/g, componentName));
};
(() => {
    const [, , action, type, name, ...rest] = process.argv;
    const useJavascript = rest.includes("--js") || rest.includes("js");
    const useCss = rest.includes("--css") || rest.includes("css");
    const ACTIONS = {
        GENERATE: ["g", "generate"],
    };
    const TYPES = {
        COMPONENT: ["c", "component"],
    };
    if (ACTIONS.GENERATE.includes(action) && TYPES.COMPONENT.includes(type)) {
        const path = name.split("/");
        path[path.length - 1] = (0, camel_case_1.camelCase)(path.at(-1));
        let componentName = (0, camel_case_1.camelCase)(path.at(-1));
        if (!componentName) {
            return;
        }
        componentName =
            componentName.charAt(0).toUpperCase() + componentName.substring(1);
        path[path.length - 1] = componentName;
        const fullRelativePath = path.reduce((pathName, name) => {
            const folder = `${pathName}${name}/`;
            if (!(0, fs_1.existsSync)(folder)) {
                (0, fs_1.mkdirSync)(folder);
            }
            return folder;
        }, "");
        createBoilerplateFile({
            componentName,
            template: (0, templates_1.getComponentTemplate)({ useCss, useJavascript }),
            fullPath: `./${fullRelativePath}${componentName}.${useJavascript ? "js" : "tsx"}`,
        });
        createBoilerplateFile({
            componentName,
            template: templates_1.stylesTemplate,
            fullPath: `./${fullRelativePath}${componentName}.module.${useCss ? "css" : "scss"}`,
        });
        createBoilerplateFile({
            componentName,
            template: templates_1.indexTemplate,
            fullPath: `./${fullRelativePath}index.${useJavascript ? "js" : "ts"}`,
        });
    }
})();
