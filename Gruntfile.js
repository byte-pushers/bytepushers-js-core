module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ["build/jsdoc", "build/bytepushers-common-js.js", "build/bytepushers-common-js.min.js"],
            release: {
                options: {
                    force: true
                },
                src: ['jsdoc/**', 'bytepushers-common-js.js', 'bytepushers-common-js.min.js']
            },
        },
        jshint: {
            options: {
                undef: false,
                unused: false,
                nonbsp: true/*,
                reporter: require('jshint-stylish')*/
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
            build: {
                files: [{expanded: true, src: ['src/main/javascript/*.js'], dest: 'build/', filter: 'isFile'}]
            },
            release: {
                files: [{expand: true, cwd: 'dist/', src: ['**'], dest: ''}]
            }
        },
        uglify: {
            build_min: {
                options: {
                    mangle: true
                },
                files: {
                    'dist/<%= pkg.name %>.min.js': ['build/src/main/javascript/software.bytepushers.*.js']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: ['build/src/main/javascript/software.bytepushers.*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        release: {
            options: {
                commitMessage: 'release <%= version %>',
                tagMessage: 'version <%= version %>',
                github: {

                    repo: 'byte-pushers/bytepushers-common-js',
                    accessTokenVar: 'GITHUB_ACCESS_TOKE_'
                }
            }
        }
    });

    var build = grunt.option('target') || 'build';
    var release = grunt.option('target') || 'release';
    var karma_server = grunt.option('target') || 'server';
    var karma_ci = grunt.option('target') || 'ci';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean:' + build, 'validate', 'test', 'package']);

    grunt.registerTask('validate', ['jshint', 'jslint']);
    grunt.registerTask('test', ['test-karma-ci']);
    grunt.registerTask('test-karma', ['karma:' + karma_server]);
    grunt.registerTask('test-karma-ci', ['karma:' + karma_ci]);
    grunt.registerTask('package', ['copy:' + build, 'uglify', 'concat']);
    grunt.registerTask('deploy', ['copy:' + release, 'release', 'clean:' + release]);
};