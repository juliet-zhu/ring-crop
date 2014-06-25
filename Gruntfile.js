// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dev: 'dev',
        pub: 'pub'

    };


    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            // js: {
            //     files: ['<%= config.app %>/scripts/{,*/}*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         livereload: true
            //     }
            // },
            // gruntfile: {
            //     files: ['Gruntfile.js'],
            //     tasks: ['default']
            // },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.styl'],
                tasks: ['stylus']
            },
            livereload:{
                options:{
                    livereload:true
                },
                files:['<%= config.app %>/**','!<%= config.app %>/bower_components/**']
            },
            jade:{
                files:'<%= config.app %>/**/*.jade',
                tasks:['jade']
            },
            copy:{
                files:['<%= config.app %>/**','!**/*.jade','!**/*.styl','!<%= config.app %>/bower_components/**'],
                tasks:['copy']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    base:'dev',
                    open:true
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            pub: {
                options: {
                    base: '<%= config.pub %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dev %>/*',
                        '!<%= config.dev %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js'
            ]
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.pub %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/scripts/scripts.js': [
        //                 '<%= config.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dev %>',
                    src: [
                        '**',
                        '!templates',
                        '!**/*.jade',
                        '!**/*.styl',
                        '!bower_components/**',
                        '!styles/inc'
                    ]
                }]
            }
        },
        stylus:{
            options:{
                compress:false
            },
            dev:{
                files:[{
                  expand:true,
                  cwd:'<%= config.app %>/styles',
                  src:['**/*.styl','!inc/**'],
                  dest:'<%= config.dev %>/styles',
                  ext:'.css'
                }]
            }
        },
        jade:{
          dev:{
            options:{
              pretty:true
            },
            files:[{
              expand: true,
              cwd:'app',
              src:['**/*.jade','!templates/*.jade'],
              dest:'dev',
              ext:'.html'
            }]
          }
        },
        uglify:{
          options:{
            mangle:false
          },
          pub:{
            files:{
            'pub/js/components/components.min.js':['pub/js/components/components.js']
            } 
          }   
        },
        concurrent:{
            server:['copy','jade:dev','stylus:dev'],
            dev:['jade','stylus']
        }
    });
    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'clean:dev',//should have concurrent:server after this task
            'copy',
            'jade:dev',
            'stylus:dev',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server'
            ]);
        }
    });

    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',//should have concurrent:dev after this task
        'jade',
        'stylus'
    ]);

    grunt.registerTask('default', ['dev']);

};
