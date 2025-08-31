### 리액트 라우터 돔

#### loader

```javascript
{
//router.js
path: “seoul",
element: <Seoul />,
loader: async () => {
return fetchCityWeather('Seoul')
}
```

각 라우트는 렌더링하기 전에 라우트 요소에 데이터를 제공하기 위해 "로더" 함수를 정의할 수
있습니다.

#### useLoaderData

```javascript
import { useLoaderData } from "react-router-dom";
const Seoul = () => {
  const data = useLoaderData();
  return (
    <div className="layout-detail">
      <p>{data.city}</p>
    </div>
  );
};
export default Seoul;
```

useLoaderData 훅은 라우터 loader에 반환되는 값을 제공합니다

#### useNavigate

```javascript
const navigate = useNavigate()
const onClick = () => {
navigate(‘/seoul’)
}
```

useNavigate 훅은 프로그래밍 방식으로 페이지를 이동시킬 때 사용됩니다. 이 훅은 함수를 반
환하며, 해당 함수를 호출함으로써 페이지 이동을 수행할 수 있습니다

#### useLocation

```javascript
const location = useLocation();
location.hash;
location.key;
location.pathname;
location.search;
location.state;
```

useLocation 훅은 현재 브라우저 주소와 관련된 정보를 가져오는 데 사용됩니다.
이 훅을 사용하면 현재 URL의 경로(path), 검색 쿼리(query), 해시(hash), 상태(state) 등을
알 수 있습니다.

#### API 에서 받은 데이터

주소로 쓸때 공백이 있을 수도 있으니 잘 확인
