module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    watch:
      compass:
        files: '**/*.scss'
        tasks: ['compass', 'autoprefixer']
      coffee:
        files: '**/*.coffee'
        tasks: ['coffee']

    compass:
      build:
        options:
          config: 'config.rb'
          trace: true

    autoprefixer:
      build:
        options:
          browsers: ['last 2 versions']
        files:
          'css/groundwork.css': ['css/groundwork.css']

    coffee:
      individual:
        expand: true
        cwd: 'src/coffee'
        src: ['components/*.coffee', 'plugins/*.coffee']
        dest: 'js'
        ext: '.js'
      concatenated:
        options:
          join: true
        files:
          "js/groundwork.all.js": ["src/coffee/components/*.coffee", "src/coffee/plugins/*.coffee"]

    uglify:
      minify:
        files:
          'js/groundwork.all.js': ['js/groundwork.all.js']

    cssmin:
      minify:
        expand: true
        cwd: 'css/'
        src: ['*.css', '!*.min.css']
        dest: 'css/'
        ext: '.css'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-autoprefixer'

  grunt.registerTask 'default',           ['build']
  grunt.registerTask 'build',             ['compass', 'autoprefixer', 'coffee', 'cssmin', 'uglify']
