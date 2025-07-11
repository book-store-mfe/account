const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'account',

  exposes: {
    './AccountForm': './src/app/components/account-form/account-form.component.ts',
    './LoginComponent': './src/app/components/login/login.component.ts',
    './routes': './src/app/app.routes.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    "@bookstore-app/shared-lib": { singleton: true, strictVersion: false, requiredVersion: '~0.0.1' }
  },

});
