import * as React from "react";

const removeElementByIds = (ids: string[]) => {
	ids.forEach((id: string) => {
		const element = document.getElementById(id);
		if (element && element.parentNode) {
			element.parentNode.removeChild(element);
		}
	});
};

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

	static defaultProps = {
		shouldShowDialog: false,
		autoLogAppEvents: true,
		xfbml: true,
		version: "2.11",
		language: "en_US"
	};

	constructor(props: MessengerCustomerChatProps) {
		super(props);
		this.state = {
			fbLoaded: false,
			shouldShowDialog: false,
		};
	}

	public componentDidMount() {
		this.setFbAsyncInit();
		this.reloadSDKAsynchronously();
	}

	public componentDidUpdate(prevProps: MessengerCustomerChatProps) {
		if (
			prevProps.pageId !== this.props.pageId ||
			prevProps.appId !== this.props.appId ||
			prevProps.shouldShowDialog !== this.props.shouldShowDialog ||
			prevProps.htmlRef !== this.props.htmlRef ||
			prevProps.minimized !== this.props.minimized ||
			prevProps.themeColor !== this.props.themeColor ||
			prevProps.loggedInGreeting !== this.props.loggedInGreeting ||
			prevProps.loggedOutGreeting !== this.props.loggedOutGreeting ||
			prevProps.greetingDialogDisplay !== this.props.greetingDialogDisplay ||
			prevProps.greetingDialogDelay !== this.props.greetingDialogDelay ||
			prevProps.autoLogAppEvents !== this.props.autoLogAppEvents ||
			prevProps.xfbml !== this.props.xfbml ||
			prevProps.version !== this.props.version ||
			prevProps.language !== this.props.language
		) {
			this.setFbAsyncInit();
			this.reloadSDKAsynchronously();
		}
	}

	public setFbAsyncInit() {
		const {appId, autoLogAppEvents, xfbml, version} = this.props;

		window.fbAsyncInit = () => {
			window.FB.init({
				appId,
				autoLogAppEvents,
				xfbml,
				version: `v${version}`,
			});

			this.setState({fbLoaded: true});
		};
	}

	public loadSDKAsynchronously() {
		const {language} = this.props;
		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.setAttribute("src", `https://connect.facebook.net/${language}/sdk/xfbml.customerchat.js`);
			fjs.parentNode.insertBefore(js, fjs);
		})(document, "script", "facebook-jssdk");
	}

	public removeFacebookSDK() {
		removeElementByIds(["facebook-jssdk", "fb-root"]);
		delete window.FB;
	}

	public reloadSDKAsynchronously() {
		this.removeFacebookSDK();
		this.loadSDKAsynchronously();
	}

	public controlPlugin() {
		const {shouldShowDialog} = this.props;

		if (shouldShowDialog) {
			window.FB.CustomerChat.showDialog();
		} else {
			window.FB.CustomerChat.hideDialog();
		}
	}

	public subscribeEvents() {
		const {onCustomerChatDialogShow, onCustomerChatDialogHide} = this.props;

		if (onCustomerChatDialogShow) {
			window.FB.Event.subscribe(
				"customerchat.dialogShow",
				onCustomerChatDialogShow
			);
		}

		if (onCustomerChatDialogHide) {
			window.FB.Event.subscribe(
				"customerchat.dialogHide",
				onCustomerChatDialogHide
			);
		}
	}

	public createMarkup() {
		const {
			pageId,
			htmlRef,
			minimized,
			themeColor,
			loggedInGreeting,
			loggedOutGreeting,
			greetingDialogDisplay,
			greetingDialogDelay,
		} = this.props;

		const refAttribute = htmlRef !== undefined ? `ref="${htmlRef}"` : "";
		const minimizedAttribute =
			minimized !== undefined ? `minimized="${minimized}"` : "";
		const themeColorAttribute =
			themeColor !== undefined ? `theme_color="${themeColor}"` : "";
		const loggedInGreetingAttribute =
			loggedInGreeting !== undefined
				? `logged_in_greeting="${loggedInGreeting}"`
				: "";
		const loggedOutGreetingAttribute =
			loggedOutGreeting !== undefined
				? `logged_out_greeting="${loggedOutGreeting}"`
				: "";
		const greetingDialogDisplayAttribute =
			greetingDialogDisplay !== undefined
				? `greeting_dialog_display="${greetingDialogDisplay}"`
				: "";
		const greetingDialogDelayAttribute =
			greetingDialogDelay !== undefined
				? `greeting_dialog_delay="${greetingDialogDelay}"`
				: "";

		return {
			__html: `<div
        class="fb-customerchat"
        page_id="${pageId}"
        ${refAttribute}
        ${minimizedAttribute}
        ${themeColorAttribute}
        ${loggedInGreetingAttribute}
        ${loggedOutGreetingAttribute}
        ${greetingDialogDisplayAttribute}
        ${greetingDialogDelayAttribute}
      ></div>`,
		};
	}

	public render() {
		const {fbLoaded, shouldShowDialog} = this.state;

		if (fbLoaded && shouldShowDialog !== this.props.shouldShowDialog) {
			document.addEventListener("DOMNodeInserted", (event: any) => {
					const element = event.target;
					if (element.className && element.className.includes("fb_dialog")) {
						this.controlPlugin();
					}
				},
				false
			);
			this.subscribeEvents();
		}
		return <div key={Date()} dangerouslySetInnerHTML={this.createMarkup()}/>;
	}
}
