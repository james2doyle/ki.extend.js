module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n * <%= pkg.name %> - <%= pkg.description %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
      ' * Released under <%= _.pluck(pkg.licenses, "type").join(", ") %> license\n */\n'
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [
        'build/parts/header.js',
        'build/parts/each.js',
        'build/parts/classes.js',
        'build/parts/append-prepend.js',
        'build/parts/hide-show.js',
        'build/parts/attr.js',
        'build/parts/before-after.js',
        'build/parts/css.js',
        'build/parts/first-last-get.js',
        'build/parts/html-text.js',
        'build/parts/parent.js',
        'build/parts/remove.js',
        'build/parts/trim.js',
        'build/parts/trigger.js',
        'build/parts/is.js',
        'build/parts/arrays.js',
        'build/parts/stop.js',
        // 'build/parts/ajax.js',
        'build/parts/ajax-deferred.js',
        'build/ki-deferred-js/deferred.js',
        'build/parts/footer.js'
        ],
        dest: 'ki.extend.js',
      },
    },
    uglify: {
      normal: {
        files: {
          'ki.extend.min.js': ['ki.extend.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);
};
