module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ["build"],
            release: ["dist"]
        },
        jshint: {
            options: {
                undef: false,
                unused: false,
                nonbsp: true,
                reporter: require('jshint-stylish')
            },
            files: ['src/main/javascript/**/*.js']
        },
        jslint: {
            javascript: {
                options: {
                    edition: 'latest',
                    errorsOnly: true
                },
                src: ['src/main/javascript/**/*.js']
            }
        },
        karma: {
            server: {
                configFile: 'karma.conf.js'
            },
            ci: {
                configFile: 'karma.conf.ci.js'
            }
        },
        copy: {
            main: {
                files: [{expanded: true, src: ['src/main/javascript/*.js'], dest: 'build/', filter: 'isFile'}]
            }
        },
        jsdoc: {
            dist: {
                src: ['build/src/main/javascript/*.js'],
                options: {
                    destination: 'dist/doc'
                }
            }
        },
        uglify: {
            build_min: {
                options: {
                    mangle: true
                },
                files: {
                    'dist/<%= pkg.name %>@<%= pkg.version %>.min.js': ['build/src/main/javascript/*.js']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: ['build/src/main/javascript/*.js'],
                dest: 'dist/<%= pkg.name %>@<%= pkg.version %>.js'
            }
        }
    });

    var clean_build = grunt.option('target') || 'build';
    var karma_server = grunt.option('target') || 'server';
    var karma_ci = grunt.option('target') || 'ci';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean:' + clean_build, 'validate', 'test_ci', 'package']);

    grunt.registerTask('validate', ['jshint', 'jslint']);
    grunt.registerTask('test', ['karma:' + karma_server]);
    grunt.registerTask('test_ci', ['karma:' + karma_ci]);
    grunt.registerTask('package', ['copy', 'jsdoc', 'uglify', 'concat']);
};