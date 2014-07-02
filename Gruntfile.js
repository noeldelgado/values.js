module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'})

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            newBuild: {
                files: ["package.json"],
                tasks: ["uglify"]
            }
        },

        uglify: {
            options: {
                banner: '/* <%= pkg.name %> -v <%= pkg.version %> - <%= pkg.homepage %> - Licensed under the <%= pkg.license %> lincese */ \n',
            },
            lib: {
                src: 'source/values.js',
                dest: 'dist/values.min.js'
            }
        }
    })

   grunt.registerTask('default', ['watch'])
   grunt.registerTask('dist', ['uglify'])

}
