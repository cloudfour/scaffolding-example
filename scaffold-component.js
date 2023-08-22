// We're using ES module imports but you could do the same with Node's `require`.
import { writeFileSync, mkdirSync, existsSync } from "fs";

console.log(process.argv);

// Find the flag starting with our flag name
const nameFlag = process.argv.find((arg) => arg.startsWith("--name="));
// Handle a missing flag.
if (!nameFlag) {
  throw new Error("Please pass in a component name using the `--name` flag");
}
// Split the string at the question mark
const flagPieces = nameFlag.split("=");
// Use the piece after the question mark as our name.
const componentName = flagPieces[1];
// You can tweak the path to better match your project's structure.
// All directories in this path must already exist.
const componentsPath = "./src/components/";

const directoryPath = `${componentsPath}${componentName}`;

// Throw an error if a directory with this name already exists.
if (existsSync(directoryPath)) {
  throw new Error(
    `A component directory named ${componentName} already exists`
  );
}

// Make the directory
mkdirSync(directoryPath);

writeFileSync(
  `${directoryPath}/${componentName}.tsx`,
  `
import './${componentName}.scss';

export const ${componentName} = () => (
  <div>I'm a ${componentName} component!</div>
);
`.trim()
);

writeFileSync(`${directoryPath}/${componentName}.scss`, "");

writeFileSync(
  `${directoryPath}/${componentName}.test.ts`,
  `
test('This is an example test that should be populated or removed before merging.', () => {
  expect(sum(1, 2)).toBe(3);
});
`.trim()
);

writeFileSync(
  `${directoryPath}/${componentName}.stories.mdx`,
  `
import { Canvas, Meta, Story } from '@storybook/addon-docs';
import { ${componentName} } from './${componentName}.tsx';

<Meta title="Components/${componentName}" />

# ${componentName}

<Canvas>
  <Story name="Basic Usage">
    <${componentName} />
  </Story>
</Canvas>
`.trim()
);
