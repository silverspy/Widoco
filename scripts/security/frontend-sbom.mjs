import fs from 'node:fs';
import { randomUUID } from 'node:crypto';

// An explicit inventory of actual bundled versions, not an npm install graph.
const [inventoryPath, output] = process.argv.slice(2);
if (!inventoryPath || !output) throw new Error('Usage: node frontend-sbom.mjs INVENTORY OUTPUT');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
const components = inventory.map(({ name, version, files, note }) => ({
  type: 'library',
  'bom-ref': `pkg:npm/${name}@${version}`,
  name,
  version,
  purl: `pkg:npm/${name}@${version}`,
  properties: [
    { name: 'widoco:packaged-files', value: files.join(',') },
    ...(note ? [{ name: 'widoco:inventory-note', value: note }] : [])
  ]
}));
fs.writeFileSync(output, JSON.stringify({
  bomFormat: 'CycloneDX', specVersion: '1.5',
  serialNumber: `urn:uuid:${randomUUID()}`, version: 1,
  metadata: { timestamp: new Date().toISOString() }, components
}, null, 2));
console.log(`Recorded ${components.length} explicit packaged frontend versions`);
