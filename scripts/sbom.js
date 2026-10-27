import fs from 'fs';
console.log("📦 Generando SBOM...");
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const sbom = {
  bomFormat: "CycloneDX",
  specVersion: "1.5",
  version: 1,
  metadata: { component: { name: pkg.name, version: pkg.version } },
  components: Object.keys(pkg.dependencies || {}).map(dep => ({ type: "library", name: dep }))
};
fs.writeFileSync('security/sbom.cyclonedx.json', JSON.stringify(sbom, null, 2));
console.log("✅ SBOM generado en security/sbom.cyclonedx.json");
