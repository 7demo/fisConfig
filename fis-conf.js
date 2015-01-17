//资源合并  注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple'); 
//开始该配置，自动引用新资源，比如以下配置，则在引用lib.js 并放在页面后面 命令参数为 -p
fis.config.set('pack',{  //该配置进行合并的人工干预——开始此配置，使用-p参数，则会把js文件合并输出到输出文件夹下pkg/lib.js 中
    'public/js/lib.js':[
        '/lib/js/**.js'
    ],
    'public/css/lib1.css':[
        '/lib/css/web/lib1/**.scss'
    ],
    'public/css/lib2.css':[
        '/lib/css/web/lib2/**.scss'
    ]
});

 //对资源进行自动合并,主要针对多个css合成一个css
fis.config.set('settings.postpackager.simple.autoCombine', true);
//进行雪碧图的合并
fis.config.set('roadmap.path', [{
    reg: '**.scss',
    useSprite: true
}]);
fis.config.set('settings.spriter.csssprites.margin', 20);

 
//scss后缀的文件，用fis-parser-sass插件编译
fis.config.set('modules.parser.scss', 'sass');
//scss文件产出为css文件
fis.config.set('roadmap.ext.scss', 'css');

//发布文件路径
fis.config.merge({
    project : { 
        exclude : /\/view\/(.*\.php)$/i  //排除文件
    },
    modules:{
        parser:{
            scss:['sass']
        }
    },
    settings:{
        parser:{
            scss:{outputStyle:'compact'}
        }
    },
    roadmap : {
        // domain : {
        //     //所有css文件添加http://localhost:8080作为域名
        //     '**.css' : 'http://localhost:8080'
        // },
        ext:{
            scss:'css'
        },
        path : [
            {
                //所有的web js文件
                reg : /\/lib\/js\/(.*\.js)$/i,
                //发布到/public/js/xxx目录下
                release : '/public/js/$&',
                //访问url是/public/js/xxx
                url: '/public/js/$1'
            },
            {
                //所有的css文件
                // reg : '**.scss',
                reg : /\/lib\/css\/(.*\.scss)$/i,
                //发布到/Public/css/xxx目录下
                release : '/public/css/$1',
                //访问url是/Public/css/xxx
                url: '/public/css/$1'
            },
            {
                //所有image目录下的.png，.gif文件
                reg : /\/lib\/images\/(.*\.(?:png|gif|jpe?g))/i,
                //发布到/images/xxx目录下
                release : '/public/images/$1',
                url: '/public/images/$1'
            },
            {
                //所有html页面
                reg : /\/view\/(.*\.html)$/i,
                //发布到/static/pic/xxx目录下
                release : '/application/views/$1'
                //访问url是/oo/static/baidu/xxx
            }
        ]
    }
});