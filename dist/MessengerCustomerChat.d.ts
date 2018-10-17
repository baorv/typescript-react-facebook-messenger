import * as React from "react";
export interface MessengerCustomerChatProps {
    pageId: string;
    appId: string;
    shouldShowDialog?: boolean;
    htmlRef?: string;
    minimized?: boolean;
    themeColor?: string;
    loggedInGreeting?: string;
    loggedOutGreeting?: string;
    greetingDialogDisplay?: "show" | "hide" | "fade";
    greetingDialogDelay?: number;
    autoLogAppEvents?: boolean;
    xfbml?: boolean;
    version?: string;
    language?: string;
    onCustomerChatDialogShow?: () => {};
    onCustomerChatDialogHide?: () => {};
}
export interface MessengerCustomerChatStates {
    fbLoaded: boolean;
    shouldShowDialog: boolean;
}
export default class MessengerCustomerChat extends React.Component<MessengerCustomerChatProps, MessengerCustomerChatStates> {
    static defaultProps: {
        shouldShowDialog: boolean;
        autoLogAppEvents: boolean;
        xfbml: boolean;
        version: string;
        language: string;
    };
    constructor(props: MessengerCustomerChatProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: MessengerCustomerChatProps): void;
    setFbAsyncInit(): void;
    loadSDKAsynchronously(): void;
    removeFacebookSDK(): void;
    reloadSDKAsynchronously(): void;
    controlPlugin(): void;
    subscribeEvents(): void;
    createMarkup(): {
        __html: string;
    };
    render(): JSX.Element;
}
