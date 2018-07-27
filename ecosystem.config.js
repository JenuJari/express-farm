module.exports = {
  apps : [{
    name      : 'express_farm',
    script    : 'bin/www',
    watch: ["views", "repos", "routes", "models", "app.js"],
    ignore_watch : ["node_modules", "front_end"],
    watch_options: {
        usePolling: true,
        interval: 500,
    },
    env: {
      PORT: 3000,
      NODE_ENV: 'development'
    },
    env_production : {
      PORT: 8080,
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
