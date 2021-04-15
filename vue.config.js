module.exports = {
    pages: {
        /*index: {
          // entry for the page
          entry: './src/pages/demo/main.js',
          publicPath: '/',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'Demo',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },*/
        index: {
          // entry for the page
          entry: './src/pages/login/main.js',
          publicPath: '/',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OmniAIO',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        tasks: { // tasks set back to index
          // entry for the page
          entry: './src/pages/tasks/main.js',
          publicPath: '/tasks',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OmniAIO - Tasks',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'tasks']
        },
        proxies: {
          // entry for the page
          entry: './src/pages/proxies/main.js',
          publicPath: '/proxies',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OmniAIO - Proxies',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'proxies']
        },
        accounts: {
          // entry for the page
          entry: './src/pages/accounts/main.js',
          publicPath: '/accounts',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OmniAIO - Accounts',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'accounts']
        },
        activity: {
          // entry for the page
          entry: './src/pages/activity/main.js',
          publicPath: '/activity',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OmniAIO - Activity',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'activity']
        },
        profiles: {
          // entry for the page
          entry: './src/pages/profiles/main.js',
          publicPath: '/profiles',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OmniAIO - Profiles',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'profiles']
        },
        settings: {
          // entry for the page
          entry: './src/pages/settings/main.js',
          publicPath: '/settings',
          // the source template
          template: 'public/index.html',
          // when using title option,
          // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OmniAIO - Settings',
          // chunks to include on this page, by default includes
          // extracted common chunks and vendor chunks.
          chunks: ['chunk-vendors', 'chunk-common', 'settings']
        }
      }
}