# typescript-react-facebook-messenger

> Facebook Messenger for ReactJS with Typescript

[![Build Status](https://travis-ci.com/baorv/typescript-react-facebook-messenger.svg?branch=master)](https://travis-ci.com/baorv/typescript-react-facebook-messenger)
[![NPM](https://img.shields.io/npm/v/typescript-react-facebook-messenger.svg)](https://www.npmjs.com/package/typescript-react-facebook-messenger) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save typescript-react-facebook-messenger
```

## Properties

| Property                 | Data type | Required | Feature |
|--------------------------|:---------:|:--------:|:-------:|
| pageId                   |   string  |   true   |         |
| appId                    |   string  |   true   |         |
| shouldShowDialog         |  boolean  |   false  |         |
| htmlRef                  |   string  |   false  |         |
| minimized                |  boolean  |   false  |         |
| themeColor               |   string  |   false  |         |
| loggedInGreeting         |   string  |   false  |         |
| loggedOutGreeting        |   string  |   false  |         |
| greetingDialogDisplay    |   string  |   false  |         |
| greetingDialogDelay      |   number  |   false  |         |
| autoLogAppEvents         |  boolean  |   false  |         |
| xfbml                    |  boolean  |   false  |         |
| version                  |   string  |   false  |         |
| language                 |   string  |   false  |         |
| onCustomerChatDialogShow |    Func   |   false  |         |
| onCustomerChatDialogHide |    Func   |   false  |         |

## Usage

```tsx
import * as React from "react";
import {MessengerCustomerChat} from "typescript-react-facebook-messenger";

class Example extends React.Component {
  render () {
    return (
      <MessengerCustomerChat pageId="" appId=""/>
    )
  }
}
```

## License

MIT © [baorv](https://github.com/baorv)
