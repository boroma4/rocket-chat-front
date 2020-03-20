export const BackendLink = process.env.REACT_APP_APILINK;
export const TokenSignature = process.env.REACT_APP_TOKEN_SIGNATURE;
export const AESKEY = process.env.REACT_APP_AESKEY;
export const AESIV = process.env.REACT_APP_AESIV;
export const GAMECODE = '#GAME#';

export const SettingsList = ['Audio','Add Contact','My Account','Logout'];
export const SongList = ['witcher','drStone'];
export const PasswordStrLevels = [{str:'weak',color:'red'},{str:'weakish',color:'darkorange'},{str:'medium',color:'#E1CB0C'},{str:'okay',color:'springgreen'},{str:'strong',color:'green'}];

export const ROUTES = ['/faq','/release','/vsuccess','/vfailed'];

export const FAQDATA = [{question:'Q: What do I do here?',answer:'A: You send messages to other people, could you imagine!!!'},
    {question:'Q: How to get started?',answer:'A: Please register, then add other people and talk to them as much as you want. Please mind the warning above when you submit any data.'},
    {question:'Q: Who are the creators of this miracle?',answer:'A: Bohdan Boss and Artem Daddy :))'},
    {question:'Q: What are future plans for this project?',answer:'A: Show WhatsApp and Telegram how to make good apps...'},
    {question:'Q: Why can I not send emoji without text on PC?',answer:'A: This is a known issue and might be fixed later, hold tight!'},
    {question:'Q: Are my messages 100% secure?',answer:'A: Let\'s say sending credit card details is not a good idea, but gossips are totally fine.'},
    {question:'Q: How can I suggest improvements?',answer:'A: Just start a chat with one of the Creators and show us your ideas.'},
    {question:'Q: Lorem Ipsum?',answer:'A: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}

    ];

export const RELEASEDATA = [
    {version: 'v0.3.5',changes: ['Introduced new in-chat gaming platform and added tic-tac-toe']},
    {version: 'v0.3.4',changes: ['Further improved chat window UI']},
    {version: 'v0.3.3',changes: ['Improved user status detection']},
    {version: 'v0.3.2',changes: ['Improved chat window UI and built-in emoji']},
    {version: 'v0.3.1',changes: ['Fix login and cookie related bugs']},
    {version: 'v0.3',changes: ['Security updates','Notification settings','More efficient live communication',
            'Email verification','Login with Google','Bugfixes and other minor improvements','Semi-advanced security for messages', 'Added cookies support']},

    {version: 'v0.2.1',changes: ['Bugfixes and UI improvements']},
    {version: 'v0.2',changes: ['Chats are sorted based on last message','Automatic reconnection in case of disconnect',
            'Online/Offline status of users with notifications','Account settings with live update','Emoji for desktop users','Bugfixes and other minor improvements']},
    {version:'v0.1',changes:['Registration/Login','Live messages','Message history is saved and is reloaded on login','Can add others to contact list','Audio settings']},
    ];
