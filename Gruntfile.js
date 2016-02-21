module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/main/javascript/software.bytepushers*.js'],
                dest: 'dist/built.js'
            }
        },
        clean: {
            build: ["build"],
            release: ["dist"]
        },
        jshint: {
            options: {
                undef: false,
                unused: false,
                nonbsp: true
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
            unit: {
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
                    'dist/<%= pkg.name %>.min.js': ['build/src/main/javascript/*.js']
                }
            },
            build: {
                options: {
                    beautify: true
                },
                files: {
                    'dist/<%= pkg.name %>.js': ['build/src/main/javascript/*.js']
                }
            }
        }
    });

    var clean_build = grunt.option('target') || 'build';
    var karma_unit = grunt.option('target') || 'unit';
    var karma_ci = grunt.option('target') || 'ci';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean:' + clean_build, 'lint', 'test', 'package']);

    grunt.registerTask('lint', ['jshint', 'jslint']);
    grunt.registerTask('test', ['karma:' + karma_unit]);
    grunt.registerTask('test_ci', ['karma:' + karma_ci]);
    grunt.registerTask('package', ['copy', 'jsdoc', 'uglify']);
};