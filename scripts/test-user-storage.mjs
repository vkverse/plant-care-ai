import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const values = new Map();
const cache = new Map();
const environment = { NODE_ENV: "development", AUTH_MODE: "demo" };
const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const loadedModule = { exports: {} };
  const output = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(output, { module: loadedModule, exports: loadedModule.exports, localStorage: storage, process: { env: environment },
    require: name => name === "server-only" ? {} : load(path.join(path.dirname(file), `${name}.ts`)),
  });
  cache.set(file, loadedModule.exports);
  return loadedModule.exports;
}

const { createLocalPlantRepository } = load("src/infrastructure/demo-plant-repository.ts");
const alex = createLocalPlantRepository("demo-alex");
const sam = createLocalPlantRepository("demo-sam");
const plant = { id: "12345678-1234-1234-1234-123456789abc", name: "Sample",
  context: { light: "Low light", soil: "Still wet" }, completed: [], savedAt: new Date().toISOString() };
await alex.save(plant);
assert.equal((await alex.list()).length, 1);
assert.equal((await sam.list()).length, 0);
await sam.save({ ...plant, name: "Sam's sample" });
assert.equal((await alex.list())[0].name, "Sample");
await alex.save({ ...plant, completed: ["soil"] });
assert.equal((await alex.list()).length, 1);
assert.equal((await createLocalPlantRepository("demo-alex").list())[0].completed[0], "soil");
await assert.rejects(() => alex.save({ ...plant, completed: ["invalid"] }));
values.set("sprout.plants.v2.demo-alex", "broken");
await assert.rejects(() => alex.save(plant));
assert.equal(values.get("sprout.plants.v2.demo-alex"), "broken");
const { demoEnabled } = load("src/infrastructure/auth/config.ts");
assert.equal(demoEnabled(), true);
environment.NODE_ENV = "production";
assert.equal(demoEnabled(), false);
environment.NODE_ENV = "development";
environment.AUTH_MODE = "workos";
assert.equal(demoEnabled(), false);
console.log("PASS: profile isolation, persistence, validation, corrupt storage, production demo guard");
