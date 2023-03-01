export const getComponentTemplate = ({
  useCss = false,
  useJavascript = false,
}) => `import styles from "./{{COMPONENT_NAME}}.module.${
  useCss ? "css" : "scss"
}";
${
  useJavascript
    ? ""
    : `
interface Props {
  children: React.ReactNode;
}
`
}
const {{COMPONENT_NAME}} = (${
  useJavascript ? "{ children }" : "{ children }: Props"
}) => {
  return <div className={styles.main}>{{COMPONENT_NAME}} works!</div>;
};

export default {{COMPONENT_NAME}};
`;

export const stylesTemplate = `.main {
}
`;

export const indexTemplate = `import {{COMPONENT_NAME}} from "./{{COMPONENT_NAME}}";

export default {{COMPONENT_NAME}};
`;
