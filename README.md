# OVERVIEW

gago-demo-token-validator 服务于demo授权验证操作.

# 使用方法

```typescript
import {validator} from "../index";

validator().then((result: boolean) => {
  console.log("验证结果", result);
});

```

# INSTALL

`npm install gago-demo-token-validator`

# TEST

`npm test`
