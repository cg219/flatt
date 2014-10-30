var path = require("path");

module.exports = function(grunty){

  var bowerScripts = [];
  var uglifyScripts = ["js/main.js"];

  grunty.initConfig({
    pkg: grunty.file.readJSON("package.json"),
    less: {
      all: {
        options: {
          paths: ["public/css"]
        },
        files: {
          "css/styles.css" : "less/styles.less"
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      libs: {
        files: {
          "js/min/main.min.js" : uglifyScripts
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      scripts: {
        files: ["js/*.js"],
        tasks: ["uglify:libs"]
      },
      css: {
        files: ["less/*"],
        tasks: ["less"]
      }
    },
    focus: {
      all: {
        include: ["scripts", "css"]
      }
    }

  })

  grunty.loadNpmTasks("grunt-contrib-clean");
  grunty.loadNpmTasks("grunt-contrib-copy");
  grunty.loadNpmTasks("grunt-contrib-cssmin");
  grunty.loadNpmTasks("grunt-contrib-uglify");
  grunty.loadNpmTasks("grunt-contrib-watch");
  grunty.loadNpmTasks("grunt-contrib-less");
  grunty.loadNpmTasks("grunt-contrib-jade");
  grunty.loadNpmTasks("grunt-focus");

  grunty.registerTask("default", ["focus:all"]);
}
