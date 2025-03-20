## Three.js 연동하기

이미지를 mesh에 입히기  

```javascript
const loadImages = async () => {
    const images = [...document.querySelectorAll('main .content img')];

    const fetchImages = images.map((image) => new Promise((resolve, reject) => {
        image.onload = resolve(image);
        image.onerror = reject;
    }))

    const loadedImages = await Promise.all(fetchImages);

     return loadedImages;
}
```
배열로 감싸서 사용  

three.js 에서 mesh를 만들 때  material에 텍스처 이미지를 정확히 입히기 위해서는 이미지가 로드된 상태여야 한다. (이미지의 위치, 높이, 이런 데이터를 정확히 가져와 만들 수 있음)  

create 함수랑 initialize 함수도 async, await  수정 