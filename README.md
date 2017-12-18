# nodeService

这主要是一些常用工具,比如：svgToPng,svgToJpg,pngTpSvg,fontToSvg

## 需要软件

imagemagick (convert png to ppm)

potrace (convert ppm to svg)

## 启动
```
git clone
cd your/path/floder
npm install
npm install pm2 -g
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
```
router:127.0.0.1:3000/tools/svgToImages
method:POST
params:
        svgPath svg的绝对地址
        outPutFileName 输出文件的文件名称（不包括扩展名）
        outPutFloder 输出的要转换图片的文件夹
        type 输出文件的文件类型（仅支持jpg与png）
        width svg的宽度，例如300
        height svg的高度，例如300
        convertQuality 转换图片的质量，例如100%（以百分号结尾）
```

- [ ] font转path

## 计划

> 2017年12月19日：看来不用等到我考完试了，一会就能把它写完，等我写完，会将这个写成一个公用接口，供需要的人使用，会使用redis做中间件，然后客户端准备使用go提供api，转换的就是用nodejs来做处理服务。

> 2017年12月13日：需要等我的考试完成后（抽空就会写），需要的相应扩展包已经放到package.json中，如有兴趣，可以自行查阅相应资料。

## 联系

<a href="https://weibo.com/zmisgod">@zmisgod</a>

<a href="https://zmis.me">zmis.me新博客</a>
