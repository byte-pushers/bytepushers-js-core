module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                undef: false,
                unused: false,
                nonbsp: true
            },
            files: ['Gruntfile.js', 'src/**/*.js']
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
    /*
     default task
     run: $ grunt
    */

    grunt.registerTask('custom', 'My "custom" task.', function() {
        grunt.log.writeln('Successfully running my "' + this.name + '" task.');

        grunt.task.run('bar');
        grunt.task.run(['foo']);

        if(true){
            grunt.log.error('There was an error(not!).');
        }
    });

    grunt.registerTask('bar', 'My "bar" task.', function() {
        grunt.log.writeln('BAR.');
    });

    grunt.registerTask('foo', 'My "foo" task.', function() {
        grunt.task.requires('bar');
        grunt.log.writeln('FOO.');
    });
};