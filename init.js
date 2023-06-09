#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 获取使用该npm包的项目的根目录路径
const projectRoot = path.resolve(process.cwd(), '');
console.log('projectRoot', projectRoot)
// 获取使用该npm包的项目的package.json文件路径
const packagePath = path.join(projectRoot, 'package.json');
console.log('packagePath', packagePath)
// 读取package.json文件内容
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// 将你的命令添加到项目的package.json文件的"scripts"属性中
if (!packageData.scripts) packageData.scripts = [];
packageData.scripts['dev'] = "tsup-node --watch --onSuccess \"node dist/main.js\"";

// 写回package.json文件
fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));

const tsup_config_ts = `
import { defineConfig } from 'tsup';
export default defineConfig({
    entry: ['main.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
})`
fs.writeFileSync(path.join(projectRoot, 'tsup.config.ts'), tsup_config_ts);