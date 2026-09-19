#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { translate } = require('./lib/translate');

const EKSTENSI = ['.aceh', '.as'];

function cariFileAceh(dir) {
  let hasil = [];
  const daftar = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of daftar) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === 'node_modules' || item.name.startsWith('.')) continue;
      hasil = hasil.concat(cariFileAceh(fullPath));
    } else if (EKSTENSI.includes(path.extname(item.name))) {
      hasil.push(fullPath);
    }
  }
  return hasil;
}

function jalankanFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: file tidak ditemukan -> ${filePath}`);
    process.exit(1);
  }
  const source = fs.readFileSync(filePath, 'utf-8');
  const jsCode = translate(source);

  // Jalankan langsung memakai Node.js Module system,
  // supaya require/console/dsb tersedia normal.
  const Module = require('module');
  const m = new Module(filePath, module.parent);
  m.filename = filePath;
  m.paths = Module._nodeModulePaths(path.dirname(filePath));
  try {
    m._compile(jsCode, filePath);
  } catch (err) {
    console.error('Terjadi error saat menjalankan AcehScript:');
    console.error(err);
    process.exit(1);
  }
}

function buildFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf-8');
  const jsCode = translate(source);
  const outPath = filePath.replace(/\.(aceh|as)$/, '.js');
  fs.writeFileSync(outPath, jsCode, 'utf-8');
  console.log(`Berhasil dibuild: ${filePath} -> ${outPath}`);
}

function buildDir(dir) {
  const files = cariFileAceh(dir);
  if (files.length === 0) {
    console.log('Tidak ada file .aceh atau .as ditemukan di folder ini.');
    return;
  }
  files.forEach(buildFile);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Cara pakai:');
    console.log('  acehskrip <file>.aceh        # menjalankan file');
    console.log('  acehskrip <file>.as          # menjalankan file');
    console.log('  acehskrip --dir <folder>     # build semua file .aceh/.as di folder');
    process.exit(0);
  }

  if (args[0] === '--dir') {
    const target = args[1] || '.';
    buildDir(path.resolve(target));
    return;
  }

  const filePath = path.resolve(args[0]);
  const ext = path.extname(filePath);
  if (!EKSTENSI.includes(ext)) {
    console.error(`Error: ekstensi file harus .aceh atau .as (dapat: ${ext})`);
    process.exit(1);
  }
  jalankanFile(filePath);
}

main();
