This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# ImageLibrary

a frontend to https://github.com/erpe/image_service_go



mount the app with all clients accessable

```
<div id='IMAGE-LIBRARY-ADMIN'
  data-config='[{"client": "otherclient", "formats":  [{"name":"article","width":300,"height":150,"format":"jpeg"}]},{ "client": "myClientName","formats": [{"name":"article","width":300,"height":150,"format":"jpeg"},{"name":"thumb", "width":50, "height":50,"format":"jpeg"}] }]'
  data-token='123456'
  data-api-url='http://localhost:3010'>
</div>
```

or mount for a specific lient

```
<div id='IMAGE-LIBRARY-APP'
  data-formats='[{"name":"article","width":300,"height":150,"format":"jpeg"},{"name":"thumb", "width":50, "height":50,"format":"jpeg"}]'
  data-client='myClientName'
  data-token='123456'
  data-api-url='http://localhost:3010'>
</div>
```
