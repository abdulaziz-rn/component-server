require('dotenv/config');

const express = require('express');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');
const appRootPath = require('app-root-path');

const { ethers } = require('ethers');
const mocks = path.resolve(`${appRootPath}`, './components');

const serveTranspiledFile = wallet => async (req, res, next) => {
  try {
    const { params } = req;
    const { wormhole } = params;
    const file = path.resolve(mocks, wormhole);
    if (!fs.existsSync(file)) {
      throw new Error(`Unable to find ${file}`);
    }
    let src;
    if (path.extname(wormhole) === '.tsx') {
      src = child_process.execSync(
        `npx babel --presets=@babel/preset-env,@babel/preset-react,@babel/preset-typescript ${wormhole}`,
        { cwd: `${mocks}` },
      ).toString();
    } else {
      src = child_process.execSync(
        `npx babel --presets=@babel/preset-env,@babel/preset-react ${wormhole}`,
        { cwd: `${mocks}` },
      ).toString();
    }
    // const src = child_process.execSync(
    //   `npx babel --presets=@babel/preset-env,@babel/preset-react ${wormhole}`,
    //   { cwd: `${mocks}` },
    // ).toString();
    
    const signature = await wallet.signMessage(src);
    return res
      .status(200)
      .set({ 'X-Csrf-Token': signature })
      .send(src);
  } catch (e) {
    return next(e);
  }
};

// New Route Handler
const serveLocalFile = (req, res, next) => {
  try {
    const { wormhole } = req.params;
    const file = path.resolve(mocks, wormhole);
    if (!fs.existsSync(file)) {
      throw new Error(`Unable to find ${file}`);
    }
    return res.sendFile(file);
  } catch (e) {
    return next(e);
  }
};

(async () => {
  const { PORT, SIGNER_MNEMONIC } = process.env;
  const wallet = await ethers.Wallet.fromMnemonic(SIGNER_MNEMONIC);
  await new Promise(
    resolve => express()
      .get('/components/:wormhole', serveTranspiledFile(wallet))
      .listen(PORT, resolve),
    
    // resolve => express()
    //   .get('/components/:wormhole', serveLocalFile)
    //   .listen(PORT, resolve),
  );
  console.clear();
  console.log(chalk.white.bold`🕳️ 🐛 Wormholes are being served!`);
  console.log('Note, request latency will be increased since files will be lazily recompiled on every request.');
  console.log(chalk.green.bold`Port: ${PORT}`);
})();


// for serving compiled files
// resolve => express()
// .get('/components/:wormhole', serveLocalFile)
// .listen(PORT, resolve),