module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development : {
                files:{
                    './dev/styles/main.css' : './source/styles/main.less'
                }
            },
            production:{
                options:{
                    compress:true,
                },
                files:{
                    './dist/styles/main.min.css':'./source/styles/main.less'
                }
            },
        },
        watch:{
            less:{  //assim que se ativa a função watch do less pelo grunt
                files: ['./source/styles/**/*.less'],
                tasks: ['less:development']
            },   //em files colocamos as pastas e arquivos que serão acompanhadas as alterações
                //1 '*' significa que é qualquer arquivo, 2 '*' significa que é qualquer pasta
                //em tasks colocamos as tarefas que serão executadas quando houver alguma modificação
            html:{
                files:['source/index.html'],
                tasks:['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [{
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',
                        replacement: '../source/scripts/main.js'
                    }
                ]
                },
                files: [
                    {src: 'source/index.html', dest: 'dev/index.html'}
                ]
            },
            dist: {
                options: {
                    patterns: [{
                        match: 'ENDERECO_DO_CSS',
                        replacement: 'styles/main.min.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',
                        replacement: 'scripts/main.min.js'
                    }
                ]
                },
                files: [
                        {src: 'source/index.html', dest: 'prebuild/index.html'}
                    ]
            }
        },
        htmlmin: {
            dist:{
                options:{
                    removeComents: true,
                    collapseWhitespace: true,
                    conservativeCollapse: false
                },
                files:{
                    'dist/index.html':'prebuild/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js':'source/scripts/main.js'
                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production','replace:dist','htmlmin:dist',  'clean', 'uglify'])
    }