# nodeService

这主要是一些常用工具

## 需要软件

convert (convert png to ppm)
potrace (convert ppm to svg)

## 启动
```
git clone
cd your/path/floder
npm install
pm2 start bin/www
```

pm2的相关命令自己Google

## 接口列表

- [x] png转svg路径(path)
```
router:127.0.0.1:3000/tools/pngToSvg
method:POST
params:
img_url 图片url，例如https://d30y9cdsu7xlg0.cloudfront.net/png/120046-200.png
width svg的宽度，例如300
height svg的高度，例如300
```

- [x] svg转jpg、png图片

- [x] font转path


## 计划

需要等我的考试完成后（抽空就会写），需要的相应扩展包已经放到package.json中，如有兴趣，可以自行查阅相应资料。
