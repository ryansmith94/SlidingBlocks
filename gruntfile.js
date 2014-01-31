module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            build: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['**/*.scss'],
                    dest: '',
                    ext: '.css',
                    filter: function (filepath) {
                        var ignore = {
                            'variables.scss': true
                        };
                        return !ignore[filepath.split('/').pop()];
                    }
                }]
            },
            all: {}
        },
        jade: {
            options: {
                pretty: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['**/*.jade'],
                    dest: '',
                    ext: '.html'
                }]
            },
            all: {}
        },
        coffee: {
            build: {
                expand: true,
                cwd: '',
                src: ['**/*.coffee'],
                dest: '',
                ext: '.js'
            },
            all: {}
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass:build'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade:build'],
                options: {
                    spawn: false
                }
            },
            coffee: {
                files: ['**/*.coffee'],
                tasks: ['coffee:build'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the required plugins.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // Tasks.
    grunt.registerTask('default', ['sass', 'jade', 'coffee']);
};
