"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexTemplate = exports.stylesTemplate = exports.getComponentTemplate = void 0;
const getComponentTemplate = ({ useCss = false, useJavascript = false, }) => `import styles from "./{{COMPONENT_NAME}}.module.${useCss ? "css" : "scss"}";
${useJavascript
    ? ""
    : `
interface Props {
  children: React.ReactNode;
}
`}
const {{COMPONENT_NAME}} = (${useJavascript ? "{ children }" : "{ children }: Props"}) => {
  return <div className={styles.main}>{{COMPONENT_NAME}} works!</div>;
};

export default {{COMPONENT_NAME}};
`;
exports.getComponentTemplate = getComponentTemplate;
exports.stylesTemplate = `.main {
}
`;
exports.indexTemplate = `import {{COMPONENT_NAME}} from "./{{COMPONENT_NAME}}";

export default {{COMPONENT_NAME}};
`;
