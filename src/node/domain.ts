import * as esLint from './eslint';

const EXTENSION_NAME = 'quadre-eslint';
const domainName = EXTENSION_NAME;

let domainManager: any;

exports.init = (_domainManager: any) => {
  domainManager = _domainManager;

  if (!domainManager.hasDomain(domainName)) {
    domainManager.registerDomain(domainName, { major: 0, minor: 1 });
  }

  domainManager.registerCommand(
    domainName,
    'lintFile', // command name
    esLint.lintFile, // handler function
    true, // is async
    'lint given file with eslint', // description
    [
      { name: 'projectRoot', type: 'string' },
      { name: 'fullPath', type: 'string' },
      { name: 'text', type: 'string' },
      { name: 'useLocalESLint', type: 'boolean' }
    ], [
      { name: 'report', type: 'object' }
    ]
  );

  domainManager.registerCommand(
    domainName,
    'fixFile',
    esLint.fixFile,
    true,
    'Fixes the current file using the ESLint auto-fixing feature',
    [
      { name: 'projectRoot', type: 'string' },
      { name: 'fullPath', type: 'string' },
      { name: 'text', type: 'string' }
    ]
  );

};
