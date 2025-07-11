const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'account',

  exposes: {
    './AccountForm': './src/app/components/account-form/account-form.component.ts',
    './routes': './src/app/app.routes.ts',
    "./ProfileState": './src/app/profile-state.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
