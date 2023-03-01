#! /usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { camelCase } from "camel-case";
import {
  getComponentTemplate,
  indexTemplate,
  stylesTemplate,
} from "./templates";

interface CreateBoilerplateFileProps {
  fullPath: string;
  componentName: string;
  template: string;
}

const createBoilerplateFile = ({
  fullPath,
  componentName,
  template,
}: CreateBoilerplateFileProps) => {
  writeFileSync(
    fullPath,
    template.replace(/{{COMPONENT_NAME}}/g, componentName)
  );
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
    path[path.length - 1] = camelCase(path.at(-1)!);

    let componentName = camelCase(path.at(-1)!);
    if (!componentName) {
      return;
    }
    componentName =
      componentName.charAt(0).toUpperCase() + componentName.substring(1);

    path[path.length - 1] = componentName;

    const fullRelativePath = path.reduce((pathName, name) => {
      const folder = `${pathName}${name}/`;
      if (!existsSync(folder)) {
        mkdirSync(folder);
      }
      return folder;
    }, "");

    createBoilerplateFile({
      componentName,
      template: getComponentTemplate({ useCss, useJavascript }),
      fullPath: `./${fullRelativePath}${componentName}.${
        useJavascript ? "js" : "tsx"
      }`,
    });

    createBoilerplateFile({
      componentName,
      template: stylesTemplate,
      fullPath: `./${fullRelativePath}${componentName}.module.${
        useCss ? "css" : "scss"
      }`,
    });

    createBoilerplateFile({
      componentName,
      template: indexTemplate,
      fullPath: `./${fullRelativePath}index.${useJavascript ? "js" : "ts"}`,
    });
  }
})();
